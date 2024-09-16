import { Button } from "../components/button.js";
import { Table } from "../components/Table.js";
import { createTodo, deleteTodo, updateTodo } from "../api/Todos.js";

export const todosPage = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "flex-col", "items-center");

  // Creando el botón que te lleva al home
  const btnHome = Button({
    text: "Home",
    classes: [
      "bg-blue-500",
      "text-white",
      "p-2",
      "rounded",
      "hover:bg-blue-600",
      "mb-4",
    ],
  });
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  // Creando el título
  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  // Creando el formulario
  const form = document.createElement("form");
  form.classList.add("flex", "flex-col", "items-center", "mb-4");

  // Campo de título
  const inputTitle = document.createElement("input");
  inputTitle.classList.add("mb-2", "p-2", "border", "rounded");
  inputTitle.placeholder = "Título de la nueva tarea";

  // Campo de Completado o no completado
  const inputCompleted = document.createElement("input");
  inputCompleted.type = "checkbox";
  inputCompleted.classList.add("mb-2", "p-2", "border", "rounded");
  const labelCompleted = document.createElement("label");
  labelCompleted.textContent = "Completado";
  labelCompleted.classList.add("mb-2", "p-2");

  // Botón para crear la Todo
  const btnCreateTodo = Button({
    text: "Crear",
    classes: [
      "bg-green-500",
      "text-white",
      "p-2",
      "rounded",
      "hover:bg-green-600",
      "mb-4",
    ],
  });

  form.appendChild(inputTitle);
  form.appendChild(labelCompleted);
  form.appendChild(inputCompleted);
  form.appendChild(btnCreateTodo);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await createTodo(inputTitle.value, inputCompleted.checked);
    loadTodos(); // Actualizar la tabla después de crear una nueva tarea
  });

  // Lo que carga en la página
  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(form);

  const tableContainer = document.createElement("div");
  container.appendChild(tableContainer);

  // Cargar las Todos
  const loadTodos = async () => {
    try {
      const response = await fetch("http://localhost:4000/todos", {
        credentials: "include",
      });
      const data = await response.json();
      tableContainer.innerHTML = "";
      const headers = [
        "ID",
        "Title",
        "Completed",
        "Owner Id",
        "Delete",
        "Update",
      ];

      const rows = data.todos.map((todo) => {
        const deleteButton = createDeleteButton(todo.id);
        const editButton = createEditButton(
          todo.id,
          todo.title,
          todo.completed
        );
        return [
          todo.id,
          todo.title,
          todo.completed ? "Sí" : "No",
          todo.owner,
          deleteButton,
          editButton,
        ];
      });

      const table = Table({ headers, data: rows });
      tableContainer.appendChild(table);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  };

  const createDeleteButton = (id) => {
    const btnDelete = Button({
      text: "Eliminar",
      classes: [
        "bg-red-500",
        "text-white",
        "p-2",
        "rounded",
        "hover:bg-red-600",
      ],
    });
    btnDelete.addEventListener("click", async () => {
      try {
        await deleteTodo(id);
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    });
    return btnDelete;
  };

  const createEditButton = (id, currentTitle, currentCompleted) => {
    const btnEdit = Button({
      text: "Editar",
      classes: [
        "bg-yellow-500",
        "text-white",
        "p-2",
        "rounded",
        "hover:bg-yellow-600",
      ],
    });
    btnEdit.addEventListener("click", () => {
      const newTitle = prompt("Nuevo título:", currentTitle);
      const newCompleted = confirm("¿Está completado?") ? true : false;
      updateTodo(id, newTitle, newCompleted).then(loadTodos); // Actualizar la tabla después de editar una tarea
    });
    return btnEdit;
  };

  loadTodos();

  return container;
};

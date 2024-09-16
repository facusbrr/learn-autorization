import { Button } from "../components/button.js";
import { Table } from "../components/Table.js";
import { createTodo, deleteTodo } from "../api/Todos.js";

export const todosPage = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "flex-col", "items-center");

  //Creando el botón que te lleva el home
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

  //Campo de titulo
  const inputTitle = document.createElement("input");
  inputTitle.classList.add("mb-2", "p-2", "border", "rounded");
  inputTitle.placeholder = "Título de la nueva tarea";
  //Campo de Completado o no completado
  const inputCompleted = document.createElement("input");
  inputCompleted.type = "checkbox";
  inputCompleted.classList.add("mb-2", "p-2", "border", "rounded");
  const labelCompleted = document.createElement("label");
  labelCompleted.textContent = "Completado";
  labelCompleted.classList.add("mb-2", "p-2");

  //Botón para crear la Todo
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
  btnCreateTodo.addEventListener("click", async () => {
    await createTodo(inputTitle.value, inputCompleted.checked);
  });

  //Lo que carga en la página
  container.appendChild(btnHome);
  container.appendChild(inputTitle);
  container.appendChild(labelCompleted);
  container.appendChild(inputCompleted);
  container.appendChild(btnCreateTodo);

  const tableContainer = document.createElement("div");
  container.appendChild(tableContainer);

  //Cargar las Todos
  const loadTodos = async () => {
    try {
      const response = await fetch("http://localhost:4000/todos", {
        credentials: "include",
      });
      const data = await response.json();
      tableContainer.innerHTML = "";
      const headers = ["ID", "Title", "Completed", "Owner Id", "Actions"];

      const rows = data.todos.map((todo) => {
        const deleteButton = createDeleteButton(todo.id);
        return [
          todo.id,
          todo.title,
          todo.completed ? "Sí" : "No",
          todo.owner,
          deleteButton,
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
    btnDelete.addEventListener("click", async (e) => {
      await deleteTodo(id);
    });
    return btnDelete;
  };
  loadTodos();
  setInterval(loadTodos, 1000);

  return container;
};

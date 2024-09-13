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
    loadTodos();
  });

  container.appendChild(btnHome);
  container.appendChild(inputTitle);
  container.appendChild(labelCompleted);
  container.appendChild(inputCompleted);
  container.appendChild(btnCreateTodo);

  const tableContainer = document.createElement("div");
  container.appendChild(tableContainer);

  const loadTodos = () => {
    fetch("http://localhost:4000/todos", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
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
        container.appendChild(table);
      });
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
      await deleteTodo(id);
      loadTodos(); // Invocar la función para actualizar la tabla
    });
    return btnDelete;
  };
  loadTodos();
  return container;
};

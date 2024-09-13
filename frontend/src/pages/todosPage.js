import { Button } from "../components/button.js";
import { Table } from "../components/Table.js";

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

  btnCreateTodo.addEventListener("click", () => {});

  container.appendChild(btnHome);

  fetch("http://localhost:4000/todos", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      const headers = ["ID", "Title", "Completed", "Owner Id"];
      const rows = data.todos.map((todo) => [
        todo.id,
        todo.title,
        todo.completed ? "Sí" : "No",
        todo.owner,
      ]);

      const table = Table({ headers, data: rows });
      container.appendChild(table);
    });
  return container;
};

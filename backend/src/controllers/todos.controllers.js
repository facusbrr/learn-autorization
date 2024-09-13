import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const user = req.user;
  const todos = database.todos.filter((todo) => todo.owner === user.id);
  res.json({ todos });
};

//Método que agrega una Todo
export const createTodo = (req, res) => {
  const { title, completed } = req.body;
  const id = database.todos.length + 1;

  // Verifica que estén todos los datos solicitados
  if (!title || completed === undefined)
    return res.status(400).send("Faltan datos");

  // Agrega el orden en el que van a ser agregados
  const todo = {
    id,
    title,
    completed,
    owner: req.user.id,
  };

  // Agrega la tarea en la base de datos
  database.todos.push(todo);

  res.json({ message: "Tarea agregada", todo });
};
//Método para eliminar una Todo
export const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = database.todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) return res.status(404).send("Tarea no encontrada");

  const todoEliminado = database.todos.splice(todoIndex, 1);
  res.json({ message: "Tarea eliminada", todoEliminado });
};

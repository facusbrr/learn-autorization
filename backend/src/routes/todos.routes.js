import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodosCtrl,
  updateTodo,
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("/", validarJwt, createTodo);
todosRouter.delete("/:id", validarJwt, deleteTodo);
todosRouter.put("/:id", validarJwt, updateTodo);

export { todosRouter };

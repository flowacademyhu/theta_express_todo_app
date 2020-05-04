import { Todo } from "../modells/todo";
import { Request, Response } from "express";

const todos: Array<Todo> = [];
let todoIndex: number = 0;

export const index = async (req: Request, res: Response) => {
  res.json(todos);
}

export const show = (req: Request,  res: Response) => {
  for (const todo of todos) {
    if (todo.id === parseInt(req.params.id)) {
      return res.json(todo);
    }
  }
  res.sendStatus(404);
};


export const create = async (req: Request,  res: Response) => { // /todos POST
  const todo: Todo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    userId: -1
  };
  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
};

export const update = (req: Request,  res: Response) => {
  for (const todo of todos) {
    if (todo.id === parseInt(req.params.id)) {
      todo.name = req.body.name;
      todo.description = req.body.description;
      todo.status = req.body.status;
      return res.status(203).json(todo);
    }
  }
  return res.status(200).json({});
};

export const destroy = (req: Request,  res: Response) => {
  for (let index = 0; index < todos.length; index++) {
    const todo = todos[index];
    if (todo.id === parseInt(req.params.id)) {
      todos.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};
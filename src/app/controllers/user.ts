import { User } from "../modells/user";
import { Request, Response } from "express";

const users: Array<User> = [];
let userIndex: number = 0;

export const create = (req: Request, res: Response) => {
  const user: User = {
    id: userIndex,
    username: req.body.username,
    email: req.body.email,
    role: 'user',
    password: req.body.password
  };
  users.push(user);
  userIndex++;
  res.status(201).json(user);
} 

export const show = (req: Request, res: Response) => {
  for(let user of users) {
    if(user.id === parseInt(req.params.id)) {
      delete user.password;
      console.log(users)
      return res.json(user);
    }
  }
  res.json({});
}

export const update = (req: Request, res: Response) => {
  for(let user of users) {
    if(user.id === parseInt(req.params.id)) {
      user.username = req.body.username ? req.body.username : user.username;
      user.email = req.body.email ? req.body.email : user.email;
      return res.json(user);
    }
  }
  res.json({});
}

export const destroy = (req: Request, res: Response) => {
  for(let i = 0; i < users.length; i++) {
    if(users[i].id === parseInt(req.params.id)) {
      users.slice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
}

export const index = (req: Request, res: Response) => {
  res.json(users);
}
import { User } from "../modells/user";
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { database } from "../../lib/database";


export const index = async (req: Request, res: Response) => {
  const users: Array<User> = await database('users').select();
  res.json(users);
}

export const show = async (req: Request, res: Response) => {
  try {
    const user: User = await database('users').select().where({ id: req.params.id }).first();
    if(user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      passwordHash,
      role: 'user'
    };
    await database('users').insert(user);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
} 

export const update = async (req: Request, res: Response) => {
  try {
    const user: User = await database('users').select().where({id: req.params.id}).first();
    if(user) {
      const user: User = {
        username: req.body.username,
        email: req.body.email
      };
      await database('users').update(user).where( {id: req.params.id});
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const user:User = await database('users').select().where( {id: req.params.id}).first();
    if(user) {
      await database('users').delete().where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

//const express = require('express');   // Javascript 
import * as express from 'express';
import { Application, Request, Response } from 'express';   
import { router } from './app/routers';

const app: Application = express();
const port = process.env.API_PORT || 3000;

const rootHandler = (req: Request, res: Response) => {
  console.log(req.params, req.query);
  //res.json({ status: 'ok', id: req.params.id });
  res.send({name: 'Poloska'})
};

app.use(express.json());
app.get('/', rootHandler);
app.use(router);

app.listen(port, () => { console.log(`Im listening on ${port}` )});

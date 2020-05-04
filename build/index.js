"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');   // Javascript 
var express_1 = __importDefault(require("express")); // Typescript import 
var app = express_1.default();
var port = process.env.API_PORT || 3000;
var todos = [];
var todoIndex = 0;
var rootHandler = function (req, res) {
    console.log(req.params, req.query);
    res.json({ status: 'ok', id: req.params.id });
};
var todoIndexHandler = function (req, res) {
    res.json(todos);
};
var todoCreateHandler = function (req, res) {
    console.log(req.body);
    var todo = {
        id: todoIndex,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        authorID: -1
    };
    todos.push(todo);
    todoIndex++;
    res.status(201).json(todo);
};
var todoShowHandler = function (req, res) {
    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
        var todo = todos_1[_i];
        if (todo.id === parseInt(req.params.id)) {
            return res.json(todo);
        }
    }
    res.json({});
};
var todoUpdateHandler = function (req, res) {
    for (var _i = 0, todos_2 = todos; _i < todos_2.length; _i++) {
        var todo = todos_2[_i];
        if (todo.id === parseInt(req.params.id)) {
            todo.name = req.body.name;
            todo.description = req.body.description;
            todo.status = req.body.status;
            return res.status(203).json(todo);
        }
    }
    return res.status(200).json({});
};
var todoDeleteHandler = function (req, res) {
    for (var index = 0; index < todos.length; index++) {
        var todo = todos[index];
        if (todo.id === parseInt(req.params.id)) {
            todos.splice(index, 1);
            return res.sendStatus(204);
        }
    }
    res.sendStatus(200);
};
app.use(express_1.default.json());
app.get('/', rootHandler);
app.get('/todos', todoIndexHandler);
app.post('/todos', todoCreateHandler); // Create
app.get('/todos/:id', todoShowHandler); // Read
app.put('/todos/:id', todoUpdateHandler); // Update
app.delete('/todos/:id', todoDeleteHandler); // Delete
app.listen(port, function () { console.log("Im listening on " + port); });

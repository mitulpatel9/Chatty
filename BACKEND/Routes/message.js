const express = require('express');
const protectedRoute = require("../Middleware/protectedRoute.js")
const { getUserAtSlidebar, sendMessages, getMessages } = require("../Controller/message.controller.js")


const Router = express.Router();


Router.get('/users', protectedRoute, getUserAtSlidebar)

Router.get('/:id', protectedRoute, getMessages);

Router.post('/send/:id', protectedRoute, sendMessages);

module.exports = Router;
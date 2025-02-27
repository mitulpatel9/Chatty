import express from "express";
import { getUserAtSlidebar, getMessages, sendMessages } from "../Controller/message.controller.js";
import protectedRoute from "../Middleware/protectedRoute.js";




const Router = express.Router();


Router.get('/users', protectedRoute, getUserAtSlidebar)

Router.get('/:id', protectedRoute, getMessages);

Router.post('/send/:id', protectedRoute, sendMessages);


export default Router
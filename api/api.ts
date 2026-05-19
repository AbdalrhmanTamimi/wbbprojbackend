import express from 'express';
import login from '../auth/login'
import Delete from "../CRUD/Delete";
import update from "../CRUD/update";
import register from "../auth/register";
import isSign from "../auth/isSign";
import read from "../CRUD/read";
import create from "../CRUD/create";
import signout from "../auth/signout";
const app = express.Router();
app.use('/login' , login)
app.use('/delete' , Delete)
app.use('/update' , update)
app.use('/read' ,  read)
app.use('/create' , create);
app.use('/register' , register)
app.use('/isSign' , isSign)
app.use('/sign-out' , signout)
export default app;
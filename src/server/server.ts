require('dotenv').config()
import type {NextFunction, Request, Response} from 'express'
const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION);

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
})

//controllers
const userRoute = require('./routes/auth');
const foodRoute = require('./routes/food')
app.use(userRoute)
app.use(foodRoute)

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`)
})
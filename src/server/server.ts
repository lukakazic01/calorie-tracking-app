import type {NextFunction, Request, Response} from 'express'
const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//controllers
const userRoute = require('./routes/auth');

mongoose.connect('mongodb://127.0.0.1:27017/calorieTrackingApp');

app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type"),
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

app.use(userRoute)

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`)
})
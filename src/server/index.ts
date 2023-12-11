const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
import type {Request, Response} from 'express'

//controllers
const userRoute = require('./routes/auth');

mongoose.connect('mongodb://127.0.0.1:27017/calorieTrackingApp');

app.use((req: Request, res: Response, next: any): void => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next();
})

app.use(userRoute)

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`)
})
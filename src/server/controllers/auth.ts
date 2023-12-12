import type { Request, Response } from "express";
import type { UserI } from "../interfaces/User";
import type {HydratedDocument} from "mongoose";
const User = require('../models/user');

module.exports = {
    register: async (req: Request, res: Response): Promise<Response> => {
        const {email, password}: UserI = req.body;
        const existentUser: HydratedDocument<UserI | null> = await User.findOne({email});
        if(existentUser) return res.status(409).send({status: 'error'})
        try {
            const user: HydratedDocument<UserI> = new User({
                email,
                password
            })
            await user.save();
            return res.status(201).send({status: 'success'});
        } catch(err) {
            return res.status(500).send({status: 'error'})
        }
    },
    login: async (req: Request, res: Response): Promise<Response> => {
        const {email, password}: UserI = req.body;
        const isRegistered: HydratedDocument<UserI | null> = await User.findOne({email, password});
        if(isRegistered) return res.status(201).send({status: 'success'})
        else return res.status(404).send({status: 'error'});
    }
}
import type { Request, Response } from "express";
import type { UserI } from "../interfaces/User";
import type {HydratedDocument} from "mongoose";
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    register: async (req: Request, res: Response): Promise<Response> => {
        const {email, password}: UserI = req.body;
        const existentUser: HydratedDocument<UserI | null> = await User.findOne({email});
        if(existentUser) return res.status(409).send({status: 'error'})
        try {
            const hashedPass: string = await bcrypt.hash(password, 10);
            const user: HydratedDocument<UserI> = new User({
                email,
                password: hashedPass
            })
            await user.save();
            return res.status(201).send({status: 'success'});
        } catch(err) {
            return res.status(500).send({status: 'error'})
        }
    },
    login: async (req: Request, res: Response): Promise<Response> => {
        const {email, password}: UserI = req.body;
        const isRegistered: HydratedDocument<UserI | null> = await User.findOne({email});
        if(!isRegistered) return res.status(404).send({status: 'error'})
        else {
            try {
                const match: boolean = await bcrypt.compare(password, isRegistered.password);
                if(match) {
                    const token: string = jwt.sign({
                        data: {name: isRegistered.email}
                    }, process.env.PRIVATE_KEY, {expiresIn: '1h'})
                    res.setHeader('Set-Cookie', `token=${token}`)
                    return res.status(201).send({status: 'success', username: isRegistered.email})
                } else return res.status(404).send({status: 'error'})
            } catch(err) {
                return res.status(404).send({status: 'error'})
            }
        }
    },
    verifyToken: async (req: Request, res: Response): Promise<Response> => {
        try {
            await jwt.verify(req.body.token, process.env.PRIVATE_KEY)
            return res.status(200).send({status: 'success', token: req.body.token})
        } catch(err) {
            return res.status(401).send({status: 'error'})
        }
    },
}

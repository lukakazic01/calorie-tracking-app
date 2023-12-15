import type { Request, Response } from "express";
import type { UserI } from "../interfaces/User";
import type {HydratedDocument} from "mongoose";
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA53VzmIVVZZWyNm266l82'
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
                const match = await bcrypt.compare(password, isRegistered.password);
                if(match) {
                    const token = jwt.sign({
                        data: {name: isRegistered.email}
                    }, KEY, {expiresIn: '120s'})
                    res.setHeader('Set-Cookie', token)
                    return res.status(201).send({status: 'success', username: isRegistered.email})
                } else return res.status(404).send({status: 'error'})
            } catch(err) {
                return res.status(404).send({status: 'error'})
            }
        }
    }
}
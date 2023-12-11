import type { Request, Response } from "express";
import type {User} from "../interfaces/User";

module.exports = {
    register: (req: Request, res: Response): void => {
        const {email, password}: User = req.body
        res.send({email, password});
    },
    login: (req: Request, res: Response): void => {
        res.send('login')
    }
}
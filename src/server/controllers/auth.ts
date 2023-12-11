import type { Request, Response } from "express";

module.exports = {
    register: (req: Request, res: Response): void => {
        res.send('sve je ok');
    },
    login: (req: Request, res: Response): void => {
        res.send('login')
    }
}
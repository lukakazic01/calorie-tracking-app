import type {Request, Response} from "express";

module.exports = {
    getFood: (req: Request, res: Response): void => {
        res.status(200).send({status: 'success'})
    }
}
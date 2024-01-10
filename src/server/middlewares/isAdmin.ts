import type {NextFunction, Request, Response} from "express";
import {jwtDecode} from "jwt-decode";
import type {IJwtPayload} from "../../models/JwtPayload";

async function isAdmin (req: Response, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const token: IJwtPayload = jwtDecode(req.get('Authorization'))
        if(token.data.role !== 'admin') return res.status(401).send({status: 'error'});
        next()
    } catch(err) {
        return res.status(500).send({status: 'error'})
    }
}

module.exports = isAdmin
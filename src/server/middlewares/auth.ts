import type {NextFunction, Request, Response} from "express";
const jwt = require('jsonwebtoken')
function validateJwt (req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const sessionToken: string | undefined = req.get('Authorization')
            jwt.verify(sessionToken, process.env.PRIVATE_KEY);
            return next();
        } catch(err) {
            return res.status(401).send({status: 'error', message: 'Invalid token'})
        }
}

module.exports = validateJwt
import type {NextFunction} from "express";
import type {AnySchema} from "yup";
import type {Request, Response} from "express";
import {ValidationError} from "yup";
import type {RegisterValidationErrorI} from '../interfaces/RegisterValidationError';

const validateSchema = (schema: AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<Response | void>  => {
        try {
            await schema.validate(req.body, {abortEarly: false})
            next();
        } catch(err) {
            if(err instanceof ValidationError) {
                return res.status(400).send({
                    status: 'error',
                    error: err.inner.map((item): RegisterValidationErrorI => {
                        return {type: item.path, message: item.message}
                    })
                })
            }
        }
    }
}

module.exports = validateSchema
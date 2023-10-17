import { NextFunction, Request, Response } from 'express'

export const logs = (req: Request, _res: Response, next: NextFunction) => {
    console.log(req.method, req.path)
    next()
}

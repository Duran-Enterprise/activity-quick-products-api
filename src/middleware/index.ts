import { NextFunction, Request, Response } from 'express'

export const logs = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.path)
    res.json({ greetings: 'Hello' })
    next()
}

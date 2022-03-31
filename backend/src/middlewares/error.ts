import { NextFunction, Response } from 'express'

function logErrors (err: Error, _req: any, _res: any, next: NextFunction) {
  console.error(err)
  next(err)
}

function errorHandler (err: Error, _req: any, res: Response, _next: NextFunction) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler (err: any, _req: any, res: Response, next: NextFunction) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

export { logErrors, errorHandler, boomErrorHandler }

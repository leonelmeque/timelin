import { NextFunction, Request, Response } from 'express';

enum MethodColors {
  GET = 'cyan',
  DELETE = 'red',
  PUT = 'yellow',
  POST = 'green',
}

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${req.method}]`[MethodColors[req.method as keyof typeof MethodColors]],
    `${req.originalUrl}`,
    `${res.statusCode}`.yellow
  );
  next();
};

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const ZodErrorValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: AnyZodObject,
) => {
  const { body } = req;
  
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  next();
};

export default ZodErrorValidation;

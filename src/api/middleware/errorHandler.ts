import type { NextFunction, Request, Response } from 'express';
import { NotFoundError, TgoApiError, TgoNetworkError, ValidationError } from '../../core/errors.js';
import { logger } from '../../core/logger.js';

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ message: 'Kaynak bulunamadi' });
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof ValidationError) {
    res.status(400).json({ message: error.message, details: error.details });
    return;
  }
  if (error instanceof NotFoundError) {
    res.status(404).json({ message: error.message });
    return;
  }
  if (error instanceof TgoApiError) {
    logger.error('TGO API hatasi', {
      operation: error.operation,
      status: error.statusCode,
      url: error.url,
    });
    res.status(error.statusCode >= 400 && error.statusCode < 600 ? error.statusCode : 502).json({
      message: error.message,
      operation: error.operation,
      tgoResponse: error.parsedBody ?? error.responseBody,
    });
    return;
  }
  if (error instanceof TgoNetworkError) {
    res.status(504).json({ message: error.message, operation: error.operation });
    return;
  }
  logger.error('Beklenmeyen hata', {
    path: req.path,
    error: error instanceof Error ? error.message : String(error),
  });
  res.status(500).json({ message: 'Beklenmeyen bir hata olustu' });
}

/** Async route handler'lardaki hatalari error middleware'e aktarir. */
export function asyncHandler(
  handler: (req: Request, res: Response) => Promise<void>,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    handler(req, res).catch(next);
  };
}

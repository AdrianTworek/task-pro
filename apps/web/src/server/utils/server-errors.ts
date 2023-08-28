import {
  CommonErrorResponse,
  ServerErrorResponse,
  ValidationErrorResponse,
} from '@/server/types/errors';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

export class ServerError extends Error {
  code: number;

  constructor({
    message,
    code = 500,
    cause,
  }: {
    message: string;
    code?: number;
    cause?: Error;
  }) {
    super(message, { cause: cause });
    this.code = code;

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export type ErrorHandlerOptions = {
  defaultErrorMessage?: string;
  defaultErrorCode?: StatusCodes;
};

export const errorHandler = (
  e: any,
  options?: ErrorHandlerOptions,
): ServerErrorResponse => {
  if (e instanceof ServerError) {
    const error: CommonErrorResponse = {
      error: {
        message: e.message,
        code: e.code,
      },
    };

    return error;
  }

  if (e instanceof ZodError) {
    console.dir(e, { depth: 10 });
    const issues = e.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    const error: ValidationErrorResponse = {
      error: {
        message: e.message,
        code: StatusCodes.BAD_REQUEST,
        issues,
      },
    };

    return error;
  }

  const error: CommonErrorResponse = {
    error: {
      message:
        options?.defaultErrorMessage ?? 'Unexpected Server Error occurred',
      code: options?.defaultErrorCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
    },
  };

  return error;
};

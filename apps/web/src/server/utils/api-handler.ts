import {
  CommonErrorResponse,
  ValidationErrorResponse,
} from '@/server/types/errors';
import { ServerError } from '@/server/utils/server-errors';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * ApiHandler is a wrapper function that wraps around all api handlers to
 * catch errors and return a response to client with error message and status code.
 *
 * If handler expects params, pass params object as the third argument, if params object
 * is not passed, it will be undefined, and ApiHandler will return Unexpected Server Error to user.
 */
export const ApiHandler = async <T extends Record<string, unknown> | undefined>(
  handler: (req: NextRequest, params: T) => Promise<NextResponse>,
  req: NextRequest,
  params?: T
) => {
  try {
    return await handler(req, params!);
  } catch (e: any) {
    console.error(e);
    if (e instanceof ServerError) {
      const errorResponse: CommonErrorResponse = {
        error: {
          code: e.code,
          message: e.message,
        },
      };

      return NextResponse.json(errorResponse, {
        status: e.code,
      });
    }

    if (e instanceof ZodError) {
      const issues = e.errors.map((err) => {
        return {
          field: err.path.join('.'),
          message: err.message,
        };
      });
      const errorResponse: ValidationErrorResponse = {
        error: {
          code: 400,
          message: 'Invalid Request',
          issues,
        },
      };

      return NextResponse.json(errorResponse, {
        status: 400,
      });
    }

    const defaultError = new ServerError({
      message: 'Unexpected Server Error occurred',
      code: 500,
      cause: e,
    });

    const defaultErrorResponse: CommonErrorResponse = {
      error: {
        code: defaultError.code,
        message: defaultError.message,
      },
    };

    return NextResponse.json(defaultErrorResponse, {
      status: 500,
    });
  }
};

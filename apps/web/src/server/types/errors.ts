import { StatusCodes } from 'http-status-codes';

export type CommonErrorResponse = {
  error: {
    code: StatusCodes;
    message: string;
  };
};

export type ValidationErrorResponse = {
  error: {
    code: StatusCodes;
    message: string;
    issues: {
      field: string;
      message: string;
    }[];
  };
};

export type ServerErrorResponse = CommonErrorResponse | ValidationErrorResponse;

export function isValidationErrorResponse(
  error: any,
): error is ValidationErrorResponse {
  return error.error && error.error.issues;
}

export function isCommonErrorResponse(
  error: any,
): error is CommonErrorResponse {
  return error.error && !error.error.issues;
}

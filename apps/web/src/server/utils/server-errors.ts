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

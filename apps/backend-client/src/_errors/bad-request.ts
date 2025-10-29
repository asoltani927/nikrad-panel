export class BadRequestError extends Error {
  constructor(
    message?: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = "BadRequestError";
    this.message = message ?? "Bad Request.";
    this.statusCode = statusCode;
  }
}

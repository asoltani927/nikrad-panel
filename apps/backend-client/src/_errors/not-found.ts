export class NotFoundError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 404
  ) {
    super(message);
    this.name = "NotFoundError";
    this.message = message ?? "Not Found.";
    this.statusCode = statusCode;
  }
}

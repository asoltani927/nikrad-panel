export class UnauthorizedError extends Error {
  constructor(
    message?: string,
    public readonly statusCode: number = 401
  ) {
    super(message);
    this.name = "UnauthorizedError";
    this.message = message ?? "Unauthorized.";
    this.statusCode = statusCode;
  }
}

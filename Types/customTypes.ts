export interface SqlError {
  code: string;
  message: string;
  errno: number;
  sqlState: string;
  sqlMessage: string;
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

export function isSqlError(error: unknown): error is SqlError {
  return (error as SqlError).code !== undefined;
}

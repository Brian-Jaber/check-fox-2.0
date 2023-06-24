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

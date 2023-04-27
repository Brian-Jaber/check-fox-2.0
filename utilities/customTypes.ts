export interface SqlError {
  code: string;
  message: string;
  errno: number;
  sqlState: string;
  sqlMessage: string;
}

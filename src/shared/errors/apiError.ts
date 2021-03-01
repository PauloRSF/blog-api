export class APIError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor (message = 'Erro interno', statusCode = 500) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

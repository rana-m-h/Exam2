export default class AppError {
  protected message: string | ValidationError[] = "";
  protected statusCode: number = 500;

  constructor(message: string | ValidationError[], statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

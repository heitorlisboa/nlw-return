type HttpErrorFields = {
  status: number;
  message: string;
};

export class HttpError extends Error {
  public status: number;

  constructor({ status, message }: HttpErrorFields) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

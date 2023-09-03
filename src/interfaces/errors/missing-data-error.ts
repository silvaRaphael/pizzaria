export class MissingDataError extends Error {
  public statusCode: number = 400;
  private fields: string = '';

  constructor(...fields: string[]) {
    super('Dados faltando');

    this.name = 'MissingDataError';
    this.fields = fields.join(', ');
    this.message = `Dados faltando, campos: ${this.fields}`;

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, MissingDataError);
  }
}

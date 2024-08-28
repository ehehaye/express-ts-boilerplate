import { BadRequestError } from 'routing-controllers';
import { ValidationError } from 'class-validator';

export class BadArgusException extends BadRequestError {
  public errors: ValidationError[];

  constructor(errors: ValidationError[] = [], message = 'Invalid arguments') {
    super(message);
    this.errors = errors;
  }

  toJson() {
    return {
      status: this.httpCode,
      errors: this.errors,
    };
  }
}

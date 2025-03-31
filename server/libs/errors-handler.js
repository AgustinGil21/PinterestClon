import { ZodError } from 'zod';

export const handleError = (res, err) => {
  return res.status(err.status).json({ message: err.message });
};

export const zodErrors = (error) => {
  if (error instanceof ZodError) {
    return {
      status: 422,
      message: 'Validation error.',
      details: error.errors.map(({ path, message }) => ({
        path: path.join('.'),
        message,
      })),
    };
  }

  return { status: 500, message: 'An unexpected error occurred.' };
};

export class ResponseErrors {
  static genericError() {
    return { status: 400, message: `Error` };
  }

  static internalErr() {
    return { status: 500, message: `Internal server error.` };
  }

  static notFound(value) {
    return { status: 404, message: `${value} not found.` };
  }

  static couldNotGet(value) {
    return { status: 400, message: `Could not get ${value}.` };
  }

  static deleteErr(value) {
    return { status: 400, message: `Could not delete ${value}.` };
  }

  static createErr(value) {
    return { status: 400, message: `Could not create ${value}.` };
  }

  static editErr(value) {
    return { status: 400, message: `Could not update ${value} data.` };
  }

  static operationErr() {
    return { status: 400, message: 'Could not complete operation.' };
  }
}

export class SchemasErrors {
  static invalidFormat(field) {
    return `Invalid ${field} format.`;
  }

  static invalidType(field, type) {
    return `${field} must be a ${type}.`;
  }

  static max(field, value) {
    return `${field} must be less than or equal to ${value} characters long.`;
  }

  static min(field, value) {
    return `${field} must be greater than or equal to ${value} characters long.`;
  }

  static required(field) {
    return `${field} is required.`;
  }

  static null(field) {
    return `${field} cannot be null.`;
  }

  static invalidValue(field, value) {
    return `${field} cannot have the value "${value}".`;
  }

  static notInEnum(field, values) {
    return `${field} must be one of the following: ${values.join(', ')}.`;
  }

  static tooSmall(field, value) {
    return `${field} must be greater than or equal to ${value}.`;
  }

  static tooLarge(field, value) {
    return `${field} must be less than or equal to ${value}.`;
  }

  static nonEmpty(field) {
    return `${field} cannot be empty.`;
  }

  static invalidLength(field, value) {
    return `${field} must have exactly ${value} characters.`;
  }

  static patternMismatch(field) {
    return `${field} has an invalid pattern.`;
  }

  static mismatch(field1, field2) {
    return `${field1} does not match ${field2}.`;
  }
}

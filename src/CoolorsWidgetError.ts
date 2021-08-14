const errorClassName = 'CoolorsWidgetError';

export class CoolorsWidgetError extends Error {
  name = errorClassName;

  constructor(message: string) {
    super(`[${errorClassName}] ${message}`);
  }
}

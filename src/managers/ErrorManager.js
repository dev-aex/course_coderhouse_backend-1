class ErrorManager extends Error {
  constructor(message, code) {
    super(message);
    this.code = code || 500;
  }
}

export default ErrorManager;

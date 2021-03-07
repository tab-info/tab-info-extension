function buildErrorMessage(_nvr: never, message?: string): string {
  if (message) {
    return `Unreachable code detected: ${message}
         Unexpected value: ${_nvr}`;
  }
  return `Unreachable code detected - Unexpected value: ${_nvr}`;
}

class UnreachableError extends Error {
  constructor(nvr: never, message?: string) {
    super(buildErrorMessage(nvr, message));
  }
}

export default UnreachableError;

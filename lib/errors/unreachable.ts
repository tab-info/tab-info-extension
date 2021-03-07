function buildErrorMessage(_nvr: never, message?: string): string {
  if (message) {
    return `Unreachable code detected: ${message}
         Unexpected value: ${_nvr}`;
  }
  return `Unreachable code detected - Unexpected value: ${_nvr}`;
}

/**
 * An error class intended for code that should not be reachable
 * acording to constraints that the type system knows about. 
 * 
 * This is particularly useful when used to implement the
 * "exhaustive switch" or "exhaustive conditional" control
 * flow patterns
 * 
 * @public
 */
class UnreachableError extends Error {
  constructor(nvr: never, message?: string) {
    super(buildErrorMessage(nvr, message));
  }
}

export default UnreachableError;

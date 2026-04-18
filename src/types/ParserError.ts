export type ParseError = {
    /** The type of error present */
    errorType: ParserErrorType,
    /** Any additional context */
    message: string,
    /** What state was present */
    artifact: string,
    /** What state was expected */
    expected: string,
    /** CSS selector or similar to find the object the error occurred on */
    elementPath: string,
    /** The HTML that was being parsed */
    html: string,
    /** Stack trace from the code that encountered an error */
    stackTrace: string,
};

export type ParserErrorType = "UnexpectedState";
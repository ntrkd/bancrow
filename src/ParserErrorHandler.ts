import { finder } from "@medv/finder";
import type { ParseError } from "./types/ParserError";
import { prettify } from 'htmlfy';

export class ParserErrorHandler {
  errors: ParseError[] = [];

  /**
   * Add a new error
   */
  newError(error: ParseError) {
    this.errors.push(error);
  }

  /**
   * Flush all the errors to the console
   */
  flush() {
    for (let e of this.errors) {
      // console.warn(this.toString(e));
      this.toConsole(e);
    }
  }

  getTotalErrors(): number {
    return this.errors.length;
  }

  /**
   * Converts a ParseError object into a string
   * @returns Stringified ParseError
   */
  toString(error: ParseError): string {
    return [
      `Error Type: ${error.errorType}`,
      `Message: ${error.message}`,
      `Artifact: ${error.received}`,
      `Expected: ${error.expected}`,
      `Element Path: ${error.elementPath}`,
      `HTML: ${error.html}`,
      `Stack Trace: ${error.stackTrace}`,
      `Page: ${error.page}`,
    ].join("\n");
  }

  toConsole(error: ParseError) {
    const labelStyle = "color: #999; font-weight: bold;";
    const valueStyle = "color: #fff;";
    const sectionStyle = "color: #4CAF50; font-weight: bold; font-size: 12px;";

    console.groupCollapsed(
      `%c⚠️ Error: ${error.errorType} — ${error.message}`,
      "color: #ff6b6b; font-weight: bold;"
    );

    console.log(`%cMessage:%c ${error.message}`, labelStyle, valueStyle);
    console.log(`%cExpected:%c ${error.expected}`, labelStyle, valueStyle);
    console.log(`%cReceived:%c ${error.received}`, labelStyle, valueStyle);
    console.log(`%cElement Path:%c ${error.elementPath}`, labelStyle, valueStyle);
    console.log(`%cPage:%c ${error.page}`, labelStyle, valueStyle);

    // Collapsible HTML section
    if (error.html) {
      console.groupCollapsed("%cHTML (click to expand)", sectionStyle);
      console.log(prettify(error.html));
      console.groupEnd();
    }

    // Collapsible stack trace
    if (error.stackTrace) {
      console.groupCollapsed("%cStack Trace (click to expand)", sectionStyle);
      console.log(error.stackTrace);
      console.groupEnd();
    }

    console.groupEnd();
  }
}
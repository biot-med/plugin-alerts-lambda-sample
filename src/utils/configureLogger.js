import { APP_NAME } from "../constants.js";

let logOptions = [
  { function: "debug", level: "DEBUG", level_value: 10000 },
  { function: "log", level: "INFO", level_value: 20000 },
  { function: "info", level: "INFO", level_value: 30000 },
  { function: "warn", level: "WARN", level_value: 40000 },
  { function: "error", level: "ERROR", level_value: 50000 },
];

/**
 * The lambdas logs must be structured in the correct format and contain a traceId, so that they are traceable on dataDog.
 * This restructures the log functions. Alternatively, you can use logging libraries (like Winston, Pino, loglevel or Npmlog)
 */

const createConsoleOverride = (
  oldConsole,
  traceId,
  level = "DEBUG",
  level_value = 10000
) => {
  return (...allArgs) => {
    const joinedMessage = allArgs
      .map((arg) => {
        const stringified = JSON.stringify(
          arg,
          (key, value) => {
            if (value instanceof Error) {
              return `${value.message?.toString()} ${value.stack?.toString()}`;
            } else {
              return value;
            }
          },
          4
        );
        return stringified;
      })
      .join(" ");
    return oldConsole(
      JSON.stringify({
        "@timestamp": new Date().toJSON(),
        message: joinedMessage,
        level: level,
        level_value: level_value,
        appName: APP_NAME || "Notification Lambda",
        traceId: traceId,
      })
    );
  };
};

/** This function overrides the console functions and formats to an object containing traceId and other required information*/

export const configureLogger = (traceId) => {
  logOptions.forEach((consoleItem) => {
    console[consoleItem.function] = createConsoleOverride(
      console[consoleItem.function],
      traceId,
      consoleItem.level,
      consoleItem.level_value
    );
  });
};

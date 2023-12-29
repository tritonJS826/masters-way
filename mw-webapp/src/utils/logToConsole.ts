/* eslint-disable no-console */

/**
 * Return in console {@link textToLog}
 */
export const logToConsole = (textToLog: string) => {
  if (process.env.IS_LOGGER_ENABLED === "true") {
    console.log(`${textToLog}`);
  } else {
    return;
  }
};

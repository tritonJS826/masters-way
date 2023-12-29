/* eslint-disable no-console */

/**
 * Return in console {@link textToLog}
 */
export const logToConsole = (textToLog: string) => {
  const time = new Date().toISOString();
  if (process.env.IS_LOGGER_ENABLED === "true") {
    console.log(`${time}: ${textToLog}`);
  } else {
    return;
  }
};

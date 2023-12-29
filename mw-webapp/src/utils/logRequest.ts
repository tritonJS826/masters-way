/* eslint-disable no-console */

/**
 * Request operations
 */
export enum RequestOperations {

  /**
   * Read operation
   */
  READ = "READ",

  /**
   * Write operation
   */
  WRITE = "WRITE",

  /**
   * Delete operation
   */
  DELETE = "DELETE",
}

/**
 * {@link logRequest} parameters
 */
type logRequestParams = {

  /**
   * Data processed by the request
   */
  data: [] | object;

  /**
   * Message's text
   */
  text: string;

  /**
   * Request operation {@link RequestOperations}
   */
  requestOperation: RequestOperations;
}

const featureFlag = process.env.LOG_FEATURE_FLAG;

/**
 * Tracks the number of reads and writes on firebase
 */
export const logRequest = (params: logRequestParams) => {
  if (featureFlag === "true") {
    Array.isArray(params.data)
      ? console.log(`${params.text} required ${params.data.length} ${params.requestOperation} operations`)
      : console.log(`${params.text} required 1 ${params.requestOperation} operations`);
  } else {
    return;
  }
};

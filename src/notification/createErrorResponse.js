import {
    API_CALL_ERROR,
    JWT_ERROR,
    NO_EVENT_ERROR,
    NO_METADATA_ERROR,
    NO_DATA_ERROR,
    TRACEPARENT_KEY,
  } from "../constants.js";
  
  import { parseTraceparentString } from "../utils/index.js";

  const createErrorResponseBody = (code, message, traceId, details = {}) => {
    return JSON.stringify({
      code,
      message,
      traceId,
      details,
    });
  };
  
  const errors = {
    [API_CALL_ERROR]: (error, traceparent, traceId) => ({
      statusCode: 500,
      headers: {
        [TRACEPARENT_KEY]: traceparent,
      },
      body: createErrorResponseBody(
        API_CALL_ERROR,
        `Call to API failed${error.cause?.message ? `: "${JSON.stringify(error.cause?.message)}"` : "."}`,
        traceId,
        {}
      ),
    }),
    [JWT_ERROR]: (error, traceparent, traceId) => ({
      statusCode: 400,
      headers: {
        [TRACEPARENT_KEY]: traceparent,
      },
      body: createErrorResponseBody(
        JWT_ERROR,
        `JWT error occurred${error.cause?.message ? `: "${JSON.stringify(error.cause?.message)}"` : "."}`,
        traceId,
        {}
      ),
    }),
    [NO_EVENT_ERROR]: (error, traceparent, traceId) => ({
      statusCode: 400,
      headers: {
        [TRACEPARENT_KEY]: traceparent,
      },
      body: createErrorResponseBody(
        NO_EVENT_ERROR,
        "No event sent",
        traceId
      ),
    }),
    [NO_METADATA_ERROR]: (error, traceparent, traceId) => ({
      statusCode: 400,
      headers: {
        [TRACEPARENT_KEY]: traceparent,
      },
      body: createErrorResponseBody(
        NO_METADATA_ERROR,
        "No metadata sent in event",
        traceId
      ),
    }),
    [NO_DATA_ERROR]: (error, traceparent, traceId) => ({
      statusCode: 400,
      headers: {
        [TRACEPARENT_KEY]: traceparent,
      },
      body: createErrorResponseBody(
        NO_DATA_ERROR,
        "No data sent in event",
        traceId
      ),
    }),
    internalServerError: (error, traceparent, traceId) => ({
      statusCode: 500,
      headers: {
        [TRACEPARENT_KEY]: traceparent,
      },
      body: createErrorResponseBody(
        "INTERNAL_SERVER_ERROR",
        "Internal server error",
        traceId
      ),
    }),
  };
  
  export const createErrorResponse = (error, traceparent) => {
    console.error("Got error: ", error);
  
    const traceId = parseTraceparentString(traceparent);
    return (
      (error && errors[error?.message]?.(error, traceparent, traceId)) ||
      errors.internalServerError(error, traceparent, traceId)
    );
  };
  
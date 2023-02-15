import {
  API_CALL_ERROR,
  JWT_ERROR,
  NO_EVENT_ERROR,
  NO_METADATA_ERROR,
  NO_DATA_ERROR,
  TRACE_ID_KEY,
} from "../constants.js";

const errors = {
  [API_CALL_ERROR]: (error, traceId) => ({
    statusCode: 500,
    headers: {
      [TRACE_ID_KEY]: traceId,
    },
    body: JSON.stringify({
      code: API_CALL_ERROR,
      message: `Call to api failed${
        error.cause?.message
          ? `: "${JSON.stringify(error.cause?.message)}"`
          : "."
      }`,
      traceId: traceId,
      details: {},
    }),
  }),
  [JWT_ERROR]: (error, traceId) => ({
    statusCode: 400,
    headers: {
      [TRACE_ID_KEY]: traceId,
    },
    body: JSON.stringify({
      code: JWT_ERROR,
      message: `JWT error occurred${
        error.cause?.message
          ? `: "${JSON.stringify(error.cause?.message)}"`
          : "."
      }`,
      traceId: traceId,
      details: {},
    }),
  }),
  [NO_EVENT_ERROR]: (error, traceId) => ({
    statusCode: 400,
    headers: {
      [TRACE_ID_KEY]: traceId,
    },
    body: JSON.stringify({
      code: NO_EVENT_ERROR,
      message: "no event sent",
      traceId: traceId,
    }),
  }),
  [NO_METADATA_ERROR]: (error, traceId) => ({
    statusCode: 400,
    headers: {
      [TRACE_ID_KEY]: traceId,
    },
    body: JSON.stringify({
      code: NO_METADATA_ERROR,
      message: "no metadata sent in event",
      traceId: traceId,
    }),
  }),
  [NO_DATA_ERROR]: (error, traceId) => ({
    statusCode: 400,
    headers: {
      [TRACE_ID_KEY]: traceId,
    },
    body: JSON.stringify({
      code: NO_DATA_ERROR,
      message: "no data sent in event",
      traceId: traceId,
    }),
  }),
  internalServerError: (error, traceId) => ({
    statusCode: 500,
    headers: {
      [TRACE_ID_KEY]: traceId,
    },
    body: JSON.stringify({
      message: "internal server error",
      traceId: traceId,
    }),
  }),
};

export const createErrorResponse = (error, traceId) => {
  console.error("Got error: ", error);
  return (
    (error && errors[error?.message]?.(error, traceId)) ||
    errors.internalServerError(error, traceId)
  );
};

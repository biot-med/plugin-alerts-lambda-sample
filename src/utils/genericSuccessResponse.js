import { TRACEPARENT_KEY } from "../constants.js";

export const genericSuccessResponse = (traceparent) => ({
  statusCode: 200,
  headers: {
    [TRACEPARENT_KEY]: traceparent,
  },
});

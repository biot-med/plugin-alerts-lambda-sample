import { BIOT_SHOULD_VALIDATE_JWT } from "./src/constants.js";

import { getTraceId, configureLogger, validateEnvironmentVariables } from "./src/utils/index.js";

import {
  authenticate,
  login,
  extractDataFromEvent,
  perform,
  createErrorResponse,
} from "./src/notification/index.js";


// The same lambda instance might run multiple times on different re-invocations.
// So this prevent certain actions on subsequent runs (like log overrides).
let isFirstRun = true;

// This is just an example!
// The structure of the event can be anything

export const handler = async (event) => {
  // The following two logs are just for debugging. You should remove them as soon as you can, the token should not be printed to logs.
  console.info("At Lambda start, got event: ", event);
  console.info("At Lambda start, extracted body: ", JSON.parse(event.body));

  let traceId = "traceId-not-set";

  validateEnvironmentVariables();

  try {
    // This extracts the data, metadata, token and traceId from the event
    // Note: Some of these properties might not be relevant for certain cases, you can remove them if they are not relevant
   
    const { data, eventToken, eventTraceId, metadata } = extractDataFromEvent(event);

    // We extract the traceId from the event
    // As a fallback, if the traceId is not included, we get a new traceId from a open BioT AIP service
    traceId = eventTraceId ?? (await getTraceId());

    // The lambda might be reinvoked several times for several consecutive requests
    // This makes sure these commands are only run in the first invocation
    if (isFirstRun) {
      // Here we are creating new logs format that follows the structure required for dataDog logs (including a traceId)
      await configureLogger(traceId);
      isFirstRun = false;
    }

    // This is the authentication process for the lambda itself
    // Note: environment variable BIOT_SHOULD_VALIDATE_JWT should be false if the lambda does not receive a token, otherwise authentication will fail the lambda
    if (BIOT_SHOULD_VALIDATE_JWT === "true") await authenticate(eventToken, traceId);

    // Here we are requesting a token for the lambda
    // It is done using a service users BIOT_SERVICE_USER_ID and BIOT_SERVICE_USER_SECRET_KEY that should be set to an environment variable
    const token = await login(traceId);

    // Some of the properties sent to perform might not be relevant, depending on the type of lambda or lambda hook used to invoke it
    const response = await perform(
      data,
      token || null,
      traceId,
      metadata || null
    );

    return response;
  } catch (error) {
    // This should return the proper error responses by the type of error that occurred
    // See the createErrorResponse function for your specific lambda usage
    return createErrorResponse(error, traceId);
  }
};
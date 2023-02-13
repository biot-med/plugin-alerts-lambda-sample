# README


# BioT's sample alert lambda sample

**This is a sample lambda that dispatches alerts**

This lambda is forked from BioT's lambda seed and it's initial flow (event parsing, login, etc.) is managed as it is in the lambda.
This initial flow is described in the "Basic code flow" section below.

### Basic code flow (see root index.js)

**These basic function flow elements are extended from BioT's general lambda seed: This is the lambdas basic flow**

The lambda uses notification services (receives hooktype `NOTIFICATION` in the event)

1. These basic functions run at the beginning of the lambda (you can change them as required):

- `extractDataFromEvent` - extract the data, metadata, traceId and token from the lambda's event.

- `traceId = eventTraceId || (await getTraceId())` - get a traceId from the event (or fallback to a traceId from a BioT service)

- `configureLogger` - creating new logs format that follows the structure required for dataDog logs (including a traceId). Environment variable BIOT_SHOULD_VALIDATE_JWT should be false if the lambda does not receive a token, otherwise authentication will fail the lambda

- `authenticate` - authenticate the token sent by the notification service.

- `login` - login the lambda (service user) and get a token

- `perform` - The `perform` functions manages the required alerts. It checks the measurements received from the event, if changes are relevant it checks for existing alerts and updates or add a new alert accordingly.

- `createErrorResponse` - This is a mapper for errors to be returned from the lambda.
  - In case of interceptors, the data structure is important (follow the data structure supplied for the interceptors in their `createErrorResponse` function.
  - If you add a new error code, add the error's code name to the constants, add the error response in `createErrorResponse`, and use `throw new error(ERROR_CODE_NAME)` where the error occur in your code.

## Environment variables

**Make sure to define these env variables in your lambda**:

- `BIOT_APP_NAME` - name of this lambda - this is for logging purposes

- `BIOT_BASE_URL` - for example https://api.int.biot-med.com

- `BIOT_JWT_PERMISSION_INTERCEPTION` or `BIOT_JWT_PERMISSION_NOTIFICATION` - permissions sent in the token.
  The default for this is a single string - `ACTION_NOTIFICATION` for notifications or `PLUGIN_INTERCEPTOR` for interceptors.

- `BIOT_SERVICE_ENVIRONMENT` - for instance "gen2int"

- `BIOT_PUBLIC_KEY` - the public key to verify the token sent by the notification service

- `BIOT_SERVICE_USER_ID` - the lambdas service users id

- `BIOT_SERVICE_USER_SECRET_KEY` - the lambdas service users secret key

- `BIOT_SHOULD_VALIDATE_JWT` - This should be false if the service does not

## Setups

_Read the comments and todos specified in the code to further understand the functions and flow._

### Pack

Use the pack in scripts folder to zip all required files to upload to the lambda
Run: `npm run zip`

### Constants

For running locally you can use the dev constants (in constants file), Just make sure the functions using those variables are changed accordingly.

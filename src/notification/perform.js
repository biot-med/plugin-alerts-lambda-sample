import { genericSuccessResponse } from "../utils/index.js";
import { getPatientAlertResponse } from "./apiCalls.js";

export const perform = async (data, token, traceId) => {
  // -----------------------------------------------------------------------------------------

  // TODO: ORI: ADD EXPLANATION HERE !

  console.log("3. Got data: " + data)

  const callExampleResponse = await getPatientAlertResponse(token, traceId);

  console.log("4. Got response: " + callExampleResponse)

  // -----------------------------------------------------------------------------------------
  return genericSuccessResponse(traceId);
};

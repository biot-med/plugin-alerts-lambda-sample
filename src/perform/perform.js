import { genericSuccessResponse } from "../utils/index.js";
import { getPatientAlertResponse } from "../BEService/apiCalls.js";

export const perform = async (data, token, traceId) => {
  // -----------------------------------------------------------------------------------------

  // TODO: ORI: ADD EXPLANATION HERE !

  console.log("3. Got data: " + data)

  // -----------------------------------------------------------------------------------------
  return genericSuccessResponse(traceId);
};

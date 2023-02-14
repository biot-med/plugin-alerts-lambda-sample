import { genericSuccessResponse } from "../utils/index.js";
import { extractEntityData } from '../utils/extractEntityData.js';
import { getAlert } from '../alertsService/alertsService.js';


export const perform = async (data, token, traceId) => {
  console.log("--------------    In perform    ---------------");

  // TODO: ORI: ADD EXPLANATION HERE !

  const { measurement, patientId } = extractEntityData(data);

  const requiredAlert = getAlert(measurement)
  
  return genericSuccessResponse(traceId);
};

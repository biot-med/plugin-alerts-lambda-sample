import { genericSuccessResponse } from "../utils/index.js";
import { extractEntityData } from '../utils/extractEntityData.js';
import { getAlert } from '../alertsService/alertsService.js';


export const perform = async (data, token, traceId) => {
  console.log("--------------    In perform    ---------------");
  
  console.log("3. Got data: " + data)

  // TODO: ORI: ADD EXPLANATION HERE !

  const { measurement, patientId } = extractEntityData(data);


  console.log("extracted measurementsBiomarker measurement ", measurement);
  console.log("extracted patientId = ", patientId);
  

  const requiredAlert = getAlert(measurement)

  console.log("extracted requiredAlert ", requiredAlert)
  console.log(requiredAlert)
  
  return genericSuccessResponse(traceId);
};

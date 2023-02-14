import { genericSuccessResponse } from "../utils/index.js";
import { extractEntityData } from '../utils/extractEntityData.js';
import { getRequiredAlert, setAlert } from '../alertsService/alertsService.js';
import { BIOT_ALERT_TEMPLATE_ID } from '../constants.js'

export const perform = async (data, token, traceId) => {
  console.log("--------------    In perform    ---------------");

  // TODO: ORI: ADD EXPLANATION HERE !

  const { measurement, patientId } = extractEntityData(data);

  const requiredAlert = getRequiredAlert(measurement)
  
  const alert = await setAlert(requiredAlert, patientId, BIOT_ALERT_TEMPLATE_ID, token, traceId)

  return genericSuccessResponse(traceId);
};

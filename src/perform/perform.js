import { genericSuccessResponse } from "../utils/index.js";
import { extractEntityMeasurements, extractEntityParentPatientId } from '../utils/extractEntityData.js';
import { generateDesiredAlert } from '../alertsService/alertsService.js';
import { BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME } from '../constants.js'


export const perform = async (data, token, traceId) => {
  console.log("--------------    In perform    ---------------");

  // TODO: ORI: ADD EXPLANATION HERE !

  const measurementsData = extractEntityMeasurements(data);
  const patientId = extractEntityParentPatientId(data);
  
  const measurement = measurementsData[BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME];

  const desiredAlert = generateDesiredAlert(measurement)
  
};

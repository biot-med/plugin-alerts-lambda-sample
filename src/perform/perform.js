import { extractEntityMeasurements, extractEntityParentPatientId } from '../utils/extractEntityData.js';
import { generateDesiredAlert } from '../alertsService/alertsService.js';

export const perform = async (data, token, traceId) => {
  console.log("--------------    In perform    ---------------");

  // TODO: ORI: ADD EXPLANATION HERE !

  const measurementsData = extractEntityMeasurements(data);
  const patientId = extractEntityParentPatientId(data);

  const desiredAlert = generateDesiredAlert(measurementsData)

  
  
};

import { generateDesiredAlert, saveAlert } from '../alertsService/alertsService.js';
import { extractEntityMeasurements, extractEntityParentPatientId } from '../utils/extractEntityData.js';

export const perform = async (data, token, traceId) => {
  console.log("--------------    In perform    ---------------");

  // TODO: ORI: ADD EXPLANATION HERE !

  const measurementsData = extractEntityMeasurements(data);
  const patientId = extractEntityParentPatientId(data);

  const desiredAlert = generateDesiredAlert(measurementsData)

  
  const alert = await saveAlert(desiredAlert, patientId, token, traceId)

  return;  
};

import { generateDesiredAlert, saveAlert } from '../alertsService/alertsService.js';
import { extractEntityMeasurements, extractEntityParentPatientId } from '../utils/extractEntityData.js';

export const perform = async (data, token, traceId) => {
  console.info("--------------    In perform    ---------------");

  const measurementsData = extractEntityMeasurements(data);

  console.info("Lambda found measurements ", measurementsData)
  
  const patientId = extractEntityParentPatientId(data);
  
  console.info("Lambda found patient id ", patientId);

  const desiredAlert = generateDesiredAlert(measurementsData);

  
  if(!!desiredAlert) {
    console.info("Lambda generated desiredAlert: ", desiredAlert)
    await saveAlert(desiredAlert, patientId, token, traceId) 
  }

  return;  
};

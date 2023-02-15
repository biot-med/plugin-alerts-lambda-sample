import { BIOT_ALERT_TEMPLATE_ID, BIOT_SEVERITY_CRITICAL_THRESHOLD, BIOT_CLEAR_THRESHOLD, SEVERITY_CLEARED_VALUE, SEVERITY_CRITICAL_VALUE, STATE_ACTIVE_VALUE, BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME } from '../constants.js'
import { getPatientAlertResponse, createPatientAlert, updatePatientAlert } from '../BEService/apiCalls.js';


export const generateDesiredAlert = (measurementsData) => {

    const measurement = measurementsData[BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME];
    
    const isAboveCritical = measurement > BIOT_SEVERITY_CRITICAL_THRESHOLD;
    const isCleared = measurement < BIOT_CLEAR_THRESHOLD;
    
    if(!isAboveCritical && !isCleared) return;

    return  {
        ...(isCleared ? {_state: SEVERITY_CLEARED_VALUE} : {}),
        ...(isAboveCritical ? {_severity: SEVERITY_CRITICAL_VALUE, _state: STATE_ACTIVE_VALUE} : {}),
        // TODO: Should _templateId be added here or in saveAlert or inside createPatientAlert ?
        _templateId: BIOT_ALERT_TEMPLATE_ID
    }
}

const isSameAlert = (requiredAlert, existingAlert) => {
  return requiredAlert._state === existingAlert._state && requiredAlert._severity === existingAlert._severity
}
/* 
const sameAlertExists = (requiredAlert, existingAlerts) => {
  existingAlerts.find(existingAlert => isSameAlert(requiredAlert))
} */

const generateGetAlertSearchRequestParams = (patientId) => ({
        filter: {
          ["_patient.id"]: {
            in: [patientId]
          },
          _templateId: {
            in: [BIOT_ALERT_TEMPLATE_ID]
          },
          _state: {
            not: SEVERITY_CLEARED_VALUE
          }
        }
})

export const saveAlert = async (requiredAlert, patientId, token, traceId) => { 
    
  const searchRequestParams = generateGetAlertSearchRequestParams(patientId);
  const existingAlerts = await getPatientAlertResponse(token, traceId, searchRequestParams);

  const existingAlert = existingAlerts[0];
  const requestBody = { ...requiredAlert };
  
  if( existingAlerts && existingAlerts.length && !isSameAlert(requiredAlert, existingAlert)) {
      console.log("existingAlerts && existingAlerts.length && !isSameAlert(requiredAlert, existingAlert) ", existingAlerts && existingAlerts.length && !isSameAlert(requiredAlert, existingAlert));
        updatePatientAlert(token, traceId, patientId, requestBody, existingAlert)
  } else if (!existingAlerts || !existingAlerts.length) {
      console.log("NO existingAlerts ", existingAlerts);
      const responseAlert = await createPatientAlert(token, traceId, patientId, requestBody); //TODO: change templateId - should be template name when there is BE support for it
  }
  return;
}
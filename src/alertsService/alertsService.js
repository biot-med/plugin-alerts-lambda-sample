import { BIOT_ALERT_TEMPLATE_ID, BIOT_SEVERITY_CRITICAL_THRESHOLD, BIOT_CLEAR_THRESHOLD, SEVERITY_CLEARED_VALUE, SEVERITY_CRITICAL_VALUE, STATE_ACTIVE_VALUE, BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME } from '../constants.js'
import { getPatientAlertResponse, createPatientAlert, updatePatientAlert } from '../BEService/apiCalls.js';


export const generateDesiredAlert = (measurementsData) => {

    const measurement = measurementsData[BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME];
    
    const isAboveCritical = measurement > BIOT_SEVERITY_CRITICAL_THRESHOLD;
    const isCleared = measurement < BIOT_CLEAR_THRESHOLD;
    
    if(!isAboveCritical && !isCleared) return;

    return  {
        ...(isCleared ? {_state: SEVERITY_CLEARED_VALUE} : {}),
        ...(isAboveCritical ? {_severity: SEVERITY_CRITICAL_VALUE, _state: STATE_ACTIVE_VALUE} : {})
    }
}

const isSameAlert = (desiredAlert, existingAlert) => {
  return desiredAlert._state === existingAlert._state && desiredAlert._severity === existingAlert._severity
}

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

export const saveAlert = async (desiredAlert, patientId, token, traceId) => { 
    
  console.info("Lambda generated desiredAlert: ", desiredAlert)

  const searchRequestParams = generateGetAlertSearchRequestParams(patientId);
  const existingAlerts = await getPatientAlertResponse(token, traceId, searchRequestParams);
  
  const existingAlert = existingAlerts?.[0];
  
  console.info("Lambda found existing alert response: ", existingAlert)


  if( existingAlert && !isSameAlert(desiredAlert, existingAlert)) {
      const responseAlert = await updatePatientAlert(token, traceId, patientId, existingAlert._id, desiredAlert)
      console.info("Lambda updated alert response: ", responseAlert)
    } else if (!existingAlert || !existingAlerts.length) {
      const responseAlert = await createPatientAlert(token, traceId, patientId, { ...desiredAlert, _templateId: BIOT_ALERT_TEMPLATE_ID }); //TODO: change templateId - should be template name when there is BE support for it
      console.info("Lambda created new alert response: ", responseAlert)
  }
  return;
}
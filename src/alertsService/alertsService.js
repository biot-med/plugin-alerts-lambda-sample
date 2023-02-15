import { BIOT_ALERT_TEMPLATE_ID, BIOT_SEVERITY_CRITICAL_THRESHOLD, BIOT_CLEAR_THRESHOLD, SEVERITY_CLEARED_VALUE, SEVERITY_CRITICAL_VALUE, STATE_ACTIVE_VALUE, BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME } from '../constants.js'
import { getPatientAlertResponse, createPatientAlert } from '../BEService/apiCalls.js';


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

const generateGetAlertSearchRequestParams = (patientId, templateId) => ({
        filter: {
          ["_patient.id"]: {
            in: [patientId]
          },
          _templateId: {
            in: [templateId]
          },
          _state: {
            not: SEVERITY_CLEARED_VALUE
          }
        }
})

export const saveAlert = async (requiredAlert, patientId, token, traceId) => { 
    const searchRequestParams = generateGetAlertSearchRequestParams(patientId, templateId);
    const existingAlerts = await getPatientAlertResponse(token, traceId, searchRequestParams);
    if( existingAlerts && existingAlerts.length ) {
        console.log("Got existingAlerts ", existingAlerts);
        //UPDATE
    } else {
        console.log("NO existingAlerts ", existingAlerts);
        // TODO: Should _templateId be added here or in getRequiredAlert or inside createPatientAlert
        const responseAlert = await createPatientAlert(token, traceId, patientId, { _templateId: BIOT_ALERT_TEMPLATE_ID, ...requiredAlert }); //TODO: change templateId - should be template name when there is BE support for it
    }

}
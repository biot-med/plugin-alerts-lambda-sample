import { BIOT_SEVERITY_CRITICAL_THRESHOLD, BIOT_CLEAR_THRESHOLD, SEVERITY_CLEARED_VALUE, SEVERITY_CRITICAL_VALUE, STATE_ACTIVE_VALUE } from '../constants.js'
import { getPatientAlertResponse } from '../BEService/apiCalls.js';


export const getRequiredAlert = (measurement) => {

    const isAboveCritical = measurement > BIOT_SEVERITY_CRITICAL_THRESHOLD;
    const isCleared = measurement < BIOT_CLEAR_THRESHOLD;
    
    if(!isAboveCritical && !isCleared) return;

    return  {
        ...(isCleared ? {_state: SEVERITY_CLEARED_VALUE} : {}),
        ...(isAboveCritical ? {_severity: SEVERITY_CRITICAL_VALUE, _state: STATE_ACTIVE_VALUE} : {})
    }
}

const createGetAlertSearchRequestParams = (patientId, templateId) => ({
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


export const setAlert = async (requiredAlert, patientId, templateId, token, traceId) => { //TODO: change templateId - should be template name when there is BE support for it
    const searchRequestParams = createGetAlertSearchRequestParams(patientId, templateId);
    const existingAlert = await getPatientAlertResponse(token, traceId, searchRequestParams);
}
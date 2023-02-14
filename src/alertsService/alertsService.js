import { BIOT_SEVERITY_CRITICAL_THRESHOLD, BIOT_CLEAR_THRESHOLD, SEVERITY_CLEARED_VALUE, SEVERITY_CRITICAL_VALUE, STATE_ACTIVE_VALUE } from '../constants.js'

export const generateDesiredAlert = (measurement) => {

    const isAboveCritical = measurement > BIOT_SEVERITY_CRITICAL_THRESHOLD;
    const isCleared = measurement < BIOT_CLEAR_THRESHOLD;
    
    if(!isAboveCritical && !isCleared) return;

    return  {
        ...(isCleared ? {_state: SEVERITY_CLEARED_VALUE} : {}),
        ...(isAboveCritical ? {_severity: SEVERITY_CRITICAL_VALUE, _state: STATE_ACTIVE_VALUE} : {})
    }
}

import { SEVERITY_CRITICAL_THRESHOLD, CLEAR_THRESHOLD, SEVERITY_CLEARED_VALUE, SEVERITY_CRITICAL_VALUE, STATE_ACTIVE_VALUE } from '../constants.js'
//TODO: Ori: add check for in variable?

export const getAlert = (measurement) => {

    const isAboveCritical = measurement > SEVERITY_CRITICAL_THRESHOLD;
    const isCleared = measurement < CLEAR_THRESHOLD;
    
    if(!isAboveCritical && !isCleared) return;

    return  {
        ...(isCleared ? {_state: SEVERITY_CLEARED_VALUE} : {}),
        ...(isAboveCritical ? {_severity: SEVERITY_CRITICAL_VALUE, _state: STATE_ACTIVE_VALUE} : {})
    }
}

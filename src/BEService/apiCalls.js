import axios from "axios";
import { API_CALL_ERROR, BIOT_BASE_URL, TRACE_ID_KEY } from "../constants.js";

 export const getPatientAlertResponse = async (newToken, traceId, searchRequestParams) => { 
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization/v1/users/patients/alerts`;
  const searchRequest = new URLSearchParams();
  searchRequest.set("searchRequest", JSON.stringify(searchRequestParams));
  try {
    const response = await axios.get(BioTApiCallUrl, {
      params: searchRequest,
      headers: { authorization: `Bearer ${newToken}`, [TRACE_ID_KEY]: traceId },
    });
    const { data } = response?.data || {};
    return data;
  } catch (error) {
    throw new Error(API_CALL_ERROR, { cause: error });
  }
};

export const createPatientAlert = async (newToken, traceId, patientId, desiredAlert) => { 
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization/v1/users/patients/${patientId}/alerts`;
  try {
    const response = await axios.post(BioTApiCallUrl, desiredAlert, {
      headers: { authorization: `Bearer ${newToken}`, [TRACE_ID_KEY]: traceId },
    });
    const { data } = response?.data || {};
    return data;
  } catch (error) {
    throw new Error(API_CALL_ERROR, { cause: error });
  }
};

export const updatePatientAlert = async (newToken, traceId, patientId, existingAlertId, desiredAlert) => { 
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization/v1/users/patients/${patientId}/alerts/${existingAlertId}`;
  try {
    const response = await axios.patch(BioTApiCallUrl, desiredAlert, {
      headers: { authorization: `Bearer ${newToken}`, [TRACE_ID_KEY]: traceId },
    });
    const { data } = response || {};
    return data;
  } catch (error) {
    throw new Error(API_CALL_ERROR, { cause: error });
  }
};
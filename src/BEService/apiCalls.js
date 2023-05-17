import axios from "axios";
import { BIOT_BASE_URL, TRACEPARENT_KEY } from "../constants.js";

 export const getPatientAlertResponse = async (newToken, traceparent, searchRequestParams) => { 
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization/v1/users/patients/alerts`;
  const searchRequest = new URLSearchParams();
  searchRequest.set("searchRequest", JSON.stringify(searchRequestParams));
  try {
    const response = await axios.get(BioTApiCallUrl, {
      params: searchRequest,
      headers: { authorization: `Bearer ${newToken}`, [TRACEPARENT_KEY]: traceparent },
    });
    const { data } = response || {};
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error?.response?.data) || error, !error?.response?.data && { cause: error })
  }
};

export const createPatientAlert = async (newToken, traceparent, patientId, desiredAlert) => { 
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization/v1/users/patients/${patientId}/alerts`;
  try {
    const response = await axios.post(BioTApiCallUrl, desiredAlert, {
      headers: { authorization: `Bearer ${newToken}`, [TRACEPARENT_KEY]: traceparent },
    });
    const { data } = response || {};
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error?.response?.data) || error, !error?.response?.data && { cause: error })
  }
};

export const updatePatientAlert = async (newToken, traceparent, patientId, existingAlertId, desiredAlert) => { 
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization/v1/users/patients/${patientId}/alerts/${existingAlertId}`;
  try {
    const response = await axios.patch(BioTApiCallUrl, desiredAlert, {
      headers: { authorization: `Bearer ${newToken}`, [TRACEPARENT_KEY]: traceparent },
    });
    const { data } = response || {};
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error?.response?.data) || error, !error?.response?.data && { cause: error })
  }
};
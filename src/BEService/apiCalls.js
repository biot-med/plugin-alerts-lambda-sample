import axios from "axios";
import { API_CALL_ERROR, BIOT_BASE_URL, TRACE_ID_KEY } from "../constants.js";

 const getPatientAlertResponseFunction = () => async (newToken, traceId, searchRequestParams) => { 
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization/v1/users/patients/alerts`;

  const searchRequest = new URLSearchParams();
  searchRequest.set("searchRequest", JSON.stringify(searchRequestParams));

  try {
    // This get request asks for patient alert from organization API
    const response = await axios.get(BioTApiCallUrl, {
      params: searchRequest,
      headers: { authorization: `Bearer ${newToken}`, [TRACE_ID_KEY]: traceId },
    });

    console.log("response ", response)
    console.log("response.data?.data ", JSON.stringify(response.data?.data))
    const { data } = response?.data || {};

    return data;
  } catch (error) {
    console.error(error)
    throw new Error(API_CALL_ERROR, { cause: error });
  }
};

const mockPatientAlertResponseFunction = () =>  async (newToken, traceId, body) => {

  console.log("on MOCK getPatientAlertResponse newToken, traceId ", newToken, traceId);
  console.log("on MOCK getPatientAlertResponse body ", JSON.stringify(body));

  try {
    // This get request asks for patient alert from organization API
    
    const response = {data: { one: "bla" }};
    
    const { data } = response?.data || {};

    return data;
  } catch (error) {
    throw new Error(API_CALL_ERROR, { cause: error });
  }
};

export const getPatientAlertResponse = process.env.NODE_ENV === "test" ? mockPatientAlertResponseFunction() : getPatientAlertResponseFunction();
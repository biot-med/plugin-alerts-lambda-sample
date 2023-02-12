import axios from "axios";
import { API_CALL_ERROR, BIOT_BASE_URL } from "../constants.js";

/** This is a call to a BioT API, it can be any call provided the lambda service user has permission */

const defFilter = { //TODO: ORI: REMOVE
  "filter": {
    "_patient.id": {
      "in": [
        "the-patient-id"
      ]
    },
    "_templateId": {
      "in": [
        "the-template-id"
      ]
    },
    "_state": {
      "not": "clear"
    }
  }
}

export const getPatientAlertResponse = async (newToken, traceId, filter = defFilter) => {
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization​/v1​/users​/patients​/alerts`;

  try {
    // This get request asks for patient alert from organization API
    const response = await axios({
      method: "get",
      url: BioTApiCallUrl,
      params: { searchRequest: { ...filter } },
      headers: { authorization: `Bearer ${newToken}`, [TRACE_ID_KEY]: traceId },
    });

    const { data } = response?.data || {};

    return data;
  } catch (error) {
    throw new Error(API_CALL_ERROR, { cause: error });
  }
};

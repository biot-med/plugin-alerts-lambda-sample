import axios from "axios";
import { BIOT_BASE_URL } from "../constants.js";

// This is a fallback to get a traceId for this lambdas uses only.
// If it does not exist, it fallbacks to get a traceId from an existing BioT API using it's healthCheck API
// The lambdas creator should implement the creation/fetching of a traceId

const API_TO_GET_TRACE_ID_FROM = `${BIOT_BASE_URL}/ums/system/healthCheck`;

export const getTraceId = async () => {
  // This tries to get the response from an existing BioT service (using it's healthCheck)
  let resTraceId;
  try {
    const response = await axios.get(API_TO_GET_TRACE_ID_FROM);
    resTraceId = response.traceId;
  } catch (error) {
    console.error("Error getting new trace id, setting to default");
  } finally {
    return resTraceId ?? "traceId_Missing";
  }
};
  
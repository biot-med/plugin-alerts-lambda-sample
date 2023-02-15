import axios from "axios";
import JWT from "jsonwebtoken";
import {
  BIOT_PUBLIC_KEY,
  JWT_ERROR,
  BIOT_JWT_PERMISSION,
  BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY,
  TRACE_ID_KEY,
} from "../constants.js";

export const authenticate = async (token, traceId) => {
  try {
    // This validates the token sent by the notification service
    const jwtData = await JWT.verify(token, BIOT_PUBLIC_KEY, {
      algorithms: ["RS512"],
    });
    // This checks the token's permission

    if (BIOT_JWT_PERMISSION) {
      if (!jwtData.scopes?.includes(BIOT_JWT_PERMISSION)) {
        throw new Error(
          `JWT does not have the required permissions. Missing: ${BIOT_JWT_PERMISSION}`
        );
      }
    }
  } catch (error) {
    throw new Error(JWT_ERROR, { cause: error });
  }
};

export const login = async (traceId) => {
  if (!BIOT_BASE_URL) throw new Error("No BIOT_BASE_URL");
  if (!BIOT_SERVICE_USER_ID) throw new Error("No BIOT_SERVICE_USER_ID");
  if (!BIOT_SERVICE_USER_SECRET_KEY) throw new Error("No BIOT_SERVICE_USER_SECRET_KEY");

  const url = `${BIOT_BASE_URL}/ums/v2/services/accessToken`;
  const response = await axios.post(
    url,
    {
      id: BIOT_SERVICE_USER_ID,
      secretKey: BIOT_SERVICE_USER_SECRET_KEY,
    },
    {
      headers: {
        [TRACE_ID_KEY]: traceId,
      },
    }
  );

  return response.data.accessToken;
};

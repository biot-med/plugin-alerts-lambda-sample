import axios from "axios";
import JWT from "jsonwebtoken";
import {
  BIOT_PUBLIC_KEY,
  BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY,
  TRACEPARENT_KEY,
} from "../constants.js";


export const login = async (traceparent) => {
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
        [TRACEPARENT_KEY]: traceparent,
      },
    }
  );

  return response.data.accessToken;
};

export const checkJWT = async (token, requiredPermission) => {
  // This validates the token sent by the notification service
  const jwtData = await JWT.verify(token, BIOT_PUBLIC_KEY, {
    algorithms: ["RS512"],
  });
  
  if (!requiredPermission) return;
  // TODO: If you need to, update this function to add other permissions to be checked in the JWT
      
  // Checks the required permission in the token
  if (!jwtData.scopes?.includes(requiredPermission)) {
    throw new Error(
      `JWT does not have the required permissions. Missing: ${requiredPermission}`
    );
  }

  return;
}

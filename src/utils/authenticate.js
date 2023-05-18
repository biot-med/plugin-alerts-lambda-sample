import axios from "axios";
import JWT from "jsonwebtoken";
import {
  BIOT_PUBLIC_KEY,
  JWT_ERROR,
  BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY,
  TRACEPARENT_KEY,
} from "../constants.js";

export const authenticate = async (token) => {
  try {
        /** 
     * This validates the token sent by the notification service and checks the required permission
     * 
     * This implementation checks JWT_PERMISSION from constants.js.
     * You can define it in your plugin's environment variables, see constants.js
     * */
      checkJWT(token, JWT_PERMISSION);
  } catch (error) {
    throw new Error(JWT_ERROR, { cause: error });
  }
};

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
}

import {
    JWT_ERROR,
    HOOKTYPE_PERMISSIONS,
  } from "../constants.js";
  import { checkJWT } from "../utils/authenticate.js";
  export const authenticate = async (token) => {
    try {
      
      const requiredPermission = HOOKTYPE_PERMISSIONS.notification;
      // This validates the token sent by the notification service and checks the required permission
      checkJWT(token, requiredPermission);
    } catch (error) {
      throw new Error(JWT_ERROR, { cause: error });
    }
  };
  
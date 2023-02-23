const exists = value => value !== undefined && value !== null;

export const validateEnvironmentVariables = () => {

    const requiredEnvironmentVariables = {
        BIOT_PUBLIC_KEY: process.env.BIOT_PUBLIC_KEY,
        BIOT_JWT_PERMISSION_NOTIFICATION: process.env.BIOT_JWT_PERMISSION_NOTIFICATION || process.env.BIOT_JWT_PERMISSION_INTERCEPTION,
        BIOT_APP_NAME: process.env.BIOT_APP_NAME,
        BIOT_BASE_URL: process.env.BIOT_BASE_URL,
        BIOT_SERVICE_USER_ID: process.env.BIOT_SERVICE_USER_ID,
        BIOT_SERVICE_USER_SECRET_KEY: process.env.BIOT_SERVICE_USER_SECRET_KEY,
        BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME: process.env.BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME,
        BIOT_SEVERITY_CRITICAL_THRESHOLD: process.env.BIOT_SEVERITY_CRITICAL_THRESHOLD,
        BIOT_CLEAR_THRESHOLD: process.env.BIOT_CLEAR_THRESHOLD,
        BIOT_ALERT_TEMPLATE_ID: process.env.BIOT_ALERT_TEMPLATE_ID
    };

    const missingVars = Object.entries(requiredEnvironmentVariables).flatMap(([envVarName, envVarValue]) => exists(envVarValue) ? [] : String(envVarName));
    
    if(missingVars?.length) {
        console.error(`Missing environment variables : ${missingVars.join(", ")}`)
    }
    
}
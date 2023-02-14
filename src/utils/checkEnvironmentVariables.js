const exists = value => value !== undefined && value !== null;

export const checkEnvironmentVariables = () => {

    const requiredEnvironmentVariables = [
        process.env.BIOT_PUBLIC_KEY,
        process.env.BIOT_JWT_PERMISSION_NOTIFICATION || process.env.BIOT_JWT_PERMISSION_INTERCEPTION,
        process.env.BIOT_APP_NAME,
        process.env.BIOT_BASE_URL,
        process.env.BIOT_SERVICE_USER_ID,
        process.env.BIOT_SERVICE_USER_SECRET_KEY,
        process.env.BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME,
        process.env.BIOT_SEVERITY_CRITICAL_THRESHOLD,
        process.env.BIOT_CLEAR_THRESHOLD,
        process.env.BIOT_ALERT_TEMPLATE_ID
    ];

    requiredEnvironmentVariables.forEach(envVar => !exists(envVar) && console.error("Missing environment variable"))

}
import { BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME } from '../constants.js'

export const extractEntityData = (data) => {
    const measurementsData = data.entity.data;
    const metadata = data.entity.metadata;
    const measurement = measurementsData[BIOT_BIOMARKER_ATTRIBUTE_JSON_NAME];
    const patientId = metadata.patientId;
    return {measurement, patientId};
}
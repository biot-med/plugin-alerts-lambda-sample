import { BIOMARKER_ATTRIBUTE_JSON_NAME } from '../constants.js' //TODO: Ori: add check for in variable?

export const extractEntityData = (data) => {
    console.log("A1 data.entity.data", data.entity.data)
    const measurementsData = data.entity.data;
    console.log("A2 data.entity.metadata", data.entity.metadata)
    const metadata = data.entity.metadata;
    const measurement = measurementsData[BIOMARKER_ATTRIBUTE_JSON_NAME];
    const patientId = metadata.patientId;
    return {measurement, patientId};
}

export const extractEntityMeasurements = (data) => {
    return data.entity.data;
}

export const extractEntityParentPatientId = (data) => {
    const metadata = data.entity.metadata;
    return metadata.patientId;
}
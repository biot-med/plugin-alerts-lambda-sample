import {
  NO_EVENT_ERROR,
  NO_METADATA_ERROR,
  NO_DATA_ERROR,
} from "../constants.js";

export const extractDataFromEvent = (event) => {
  if (!event?.body) throw new Error(NO_EVENT_ERROR);

  const parsedEvent = JSON.parse(event.body);

  if (!parsedEvent.metadata) throw new Error(NO_METADATA_ERROR);
  if (!parsedEvent.data) throw new Error(NO_DATA_ERROR);
  if (!parsedEvent.jwt) throw new Error(NO_DATA_ERROR);

  return {
    metadata: parsedEvent.metadata || parsedEvent.null,
    data: parsedEvent.data || null,
    eventToken: parsedEvent.jwt || null,
    eventTraceId: parsedEvent.metadata?.traceId || null,
  };
};

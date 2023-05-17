import {
  NO_EVENT_ERROR,
  NO_METADATA_ERROR,
  NO_DATA_ERROR,
} from "../constants.js";

export const extractDataFromEvent = (event) => {
  if (!event?.body) throw new Error(NO_EVENT_ERROR);

  const eventHeaders = event.headers;
  const parsedEventBody = JSON.parse(event.body);
  const eventTraceparent = eventHeaders[TRACEPARENT_KEY] || null;

  if (!parsedEventBody.metadata) throw new Error(NO_METADATA_ERROR);
  if (!parsedEventBody.data) throw new Error(NO_DATA_ERROR);
  if (!parsedEventBody.jwt) throw new Error(NO_DATA_ERROR);

  return {
    metadata: parsedEventBody.metadata || parsedEventBody.null,
    data: parsedEventBody.data || null,
    eventToken: parsedEventBody.jwt || null,
    eventTraceparent: eventTraceparent,
  };
};

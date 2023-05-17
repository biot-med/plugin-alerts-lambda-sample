import TraceParent from "traceparent";
import crypto from 'crypto';

// This is a fallback incase there was no traceparent.
// If it does not exist, it creates a traceparent as a fallback.
// The lambdas creator should implement the creation/fetching of a traceId

export const createTraceparent = () => {
  const version = Buffer.alloc(1).toString('hex');
  const traceId = crypto.randomBytes(16).toString('hex');
  const id = crypto.randomBytes(8).toString('hex');
  const flags = '01';

  return `${version}-${traceId}-${id}-${flags}`;
}

export const parseTraceparentString = (traceparent) => {
  return TraceParent.fromString(traceparent).traceId;
}

  
export const createError = (error) => {
  console.error("Got error: ", error, ". error message: ", error?.message || "", ". error.cause: ", error?.cause?.message);
};

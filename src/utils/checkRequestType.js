export const requestTypes = Object.freeze({
  NOTIFICATION: "NOTIFICATION",
  INTERCEPTOR_PRE: "INTERCEPTOR_PRE",
  INTERCEPTOR_POST: "INTERCEPTOR_POST",
  INTERCEPTOR_POST_ENTITY: "INTERCEPTOR_POST_ENTITY",
  NONSPECIFIC: "NONSPECIFIC",
});

export const checkRequestType = (event) => {

  // This creates a case-insensitive search for the hooktype by first searching the key in the headers
  const hooktypeKey = Object.keys(event?.headers)?.find(key => key.toLowerCase() === 'hooktype');
  
  if (hooktypeKey && requestTypes[event.headers?.[hooktypeKey]]) {
    return requestTypes[event.headers?.[hooktypeKey]];
  } else {
    console.warn("No hooktype provided");
    return requestTypes.NONSPECIFIC;
  }
};

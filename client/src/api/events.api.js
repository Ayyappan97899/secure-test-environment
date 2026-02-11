import API from "./axios";

export const batchLogEvents = (payload) => API.post("/events/batch", payload);

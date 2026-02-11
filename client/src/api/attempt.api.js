import API from "./axios";

/**
 * Start new assessment attempt
 */
export const startAttempt = async () => {
  const response = await API.post("/attempt/start");
  return response.data;
};

/**
 * Submit assessment attempt
 */
export const submitAttempt = async (payload) => {
  const { attemptId, answer } = payload;
  const response = await API.post(`/attempt/submit/${attemptId}`, { answer });
  return response.data;
};

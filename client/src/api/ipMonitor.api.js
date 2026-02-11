import API from "./axios";

export const checkIp = async (attemptId) => {
  const response = await API.post("/ip/check", { attemptId });
  return response.data;
};

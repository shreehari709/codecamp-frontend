import api from "./api";

export const createClass = async (payload) => {
  const { data } = await api.post(
    "/classes",
    payload
  );

  return data;
};

export const getClasses = async () => {
  const { data } = await api.get(
    "/classes"
  );

  return data;
};

export const joinClass = async (
  classCode
) => {
  const { data } = await api.post(
    "/classes/join",
    { classCode }
  );

  return data;
};
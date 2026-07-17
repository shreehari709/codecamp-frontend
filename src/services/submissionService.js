import api from "./api";

export const getSubmissions =
  async () => {
    const { data } =
      await api.get(
        "/submissions"
      );

    return data;
  };

export const reviewSubmission =
  async (payload) => {
    const { data } =
      await api.put(
        "/submissions/review",
        payload
      );

    return data;
  };

  export const getMySubmissions =
async () => {

  const { data } =
    await api.get(
      "/submissions/my"
    );

  return data;
};
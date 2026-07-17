import api from "./api";

export const getLeetcodeStats =
  async (username) => {

    const { data } =
      await api.get(
        `/leetcode/${username}`
      );

    return data;
  };
import api from "./api";

export const loginUser =
  async (formData) => {
    const { data } =
      await api.post(
        "/auth/login",
        formData
      );

    return data;
  };

export const registerUser =
  async (formData) => {
    const { data } =
      await api.post(
        "/auth/register",
        formData
      );

    return data;
  };
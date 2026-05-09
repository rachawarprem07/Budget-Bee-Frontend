import api from "./client";

interface LoginPayload {
    email:string;
    password:string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/api/v1/auth/login", data);
  return response.data;
};



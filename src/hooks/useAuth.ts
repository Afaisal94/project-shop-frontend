import axios, { AxiosResponse } from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${BaseApiUrl}/login`, {
    email,
    password,
  });
  return response.data;
};

const registerUser = async (name: string, email: string, password: string) => {
  const response: AxiosResponse<any> = await axios.post<any>(
    `${BaseApiUrl}/register`,
    {
      name,
      email,
      password,
    }
  );
  return response.data;
};

export { loginUser, registerUser };

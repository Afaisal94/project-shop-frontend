import axios from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

const getUsers = async () => {
  const { data } = await axios.get<User[]>(`${BaseApiUrl}/users`);
  return data;
};

const getUserById = async (id: number) => {
  const { data } = await axios.get<User>(`${BaseApiUrl}/users/${id}`);
  return data;
};

export { getUsers, getUserById };

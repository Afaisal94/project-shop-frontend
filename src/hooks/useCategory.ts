import axios from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

type Category = {
  id?: number;
  name: string;
};

const getCategories = async () => {
  const { data } = await axios.get<Category[]>(`${BaseApiUrl}/categories`);
  return data;
};

const getCategoryById = async (id: number) => {
  const { data } = await axios.get<Category>(`${BaseApiUrl}/categories/${id}`);
  return data;
};

const createCategory = async (newItem: Category) => {
  const { data } = await axios.post<Category>(
    `${BaseApiUrl}/categories`,
    newItem
  );
  return data;
};

const updateCategory = async (id: number, name: string) => {
  await axios.patch<Category>(`${BaseApiUrl}/categories/${id}`, { name });
  return id;
};

const deleteCategory = async (id: number) => {
  await axios.delete<Category>(`${BaseApiUrl}/categories/${id}`);
  return id;
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

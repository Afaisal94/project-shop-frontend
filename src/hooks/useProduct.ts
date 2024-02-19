import axios from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

type Product = {
  id?: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  category?: any;
};

const getProducts = async () => {
  const { data } = await axios.get<Product[]>(`${BaseApiUrl}/products`);
  return data;
};

const getProductById = async (id: number) => {
  const { data } = await axios.get<Product>(`${BaseApiUrl}/products/${id}`);
  return data;
};

const getProductsByCategoryId = async (id: number) => {
  const { data } = await axios.get<Product>(
    `${BaseApiUrl}/products/categoryId/${id}`
  );
  return data;
};

const createProduct = async (newItem: Product) => {
  const { data } = await axios.post(`${BaseApiUrl}/products`, newItem, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return data;
};

const updateProduct = async (id: number, newItem: Product) => {
  const { data } = await axios.post(`${BaseApiUrl}/products/${id}`, newItem, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return data.data;
};

const deleteProduct = async (id: number) => {
  await axios.delete(`${BaseApiUrl}/products/${id}`);
  return id;
};

export {
  getProducts,
  getProductById,
  getProductsByCategoryId,
  createProduct,
  updateProduct,
  deleteProduct,
};

import axios, { AxiosResponse } from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

type Cart = {
  id?: number;
  userId: number;
  productId: number;
  quantity: number;
  user: any;
  product: any;
};

const getCarts = async (id: number) => {
  const response: AxiosResponse<Cart[]> = await axios.get<Cart[]>(
    `${BaseApiUrl}/carts/userId/${id}`
  );
  return response.data;
};

const addToCart = async (userId: number, productId: number) => {
  const quantity = 1;
  const response: AxiosResponse<Cart> = await axios.post<Cart>(
    `${BaseApiUrl}/carts`,
    {
      userId,
      productId,
      quantity,
    }
  );
  return response.data;
};

// const checkCart = async (user, product) => {
//   const response = await axios.get(
//     `${BaseApiUrl}/carts?userId=${user}&productId=${product}`
//   );
//   return response.data.docs;
// };

const updateCart = async (id: number, quantity: number) => {
  const response: AxiosResponse<Cart> = await axios.patch<Cart>(
    `${BaseApiUrl}/carts/${id}`,
    {
      quantity,
    }
  );
  return response.data;
};

const getTotalItems = async (userId: number) => {
  const response: AxiosResponse<any> = await axios.get<any>(
    `${BaseApiUrl}/carts/userId/${userId}`
  );
  const totalItems = response.data.reduce(function (result: any, item: Cart) {
    return result + item.quantity;
  }, 0);
  return totalItems;
};

const incrementQty = async (id: number, quantity: number) => {
  quantity = quantity + 1;
  const response: AxiosResponse<Cart> = await axios.patch<Cart>(
    `${BaseApiUrl}/carts/quantity/${id}`,
    {
      quantity,
    }
  );
  return response.data;
};

const decrementQty = async (id: number, quantity: number) => {
  quantity = quantity - 1;
  const response: AxiosResponse<Cart> = await axios.patch<Cart>(
    `${BaseApiUrl}/carts/quantity/${id}`,
    {
      quantity,
    }
  );
  return response.data;
};

const deleteCart = async (id: number) => {
  await axios.delete(`${BaseApiUrl}/carts/${id}`);
  return id;
};

const getTotalPrice = async (userId: number) => {
  const response: AxiosResponse<any> = await axios.get(`${BaseApiUrl}/carts/userId/${userId}`);
  const totalPrice = response.data.reduce(function (result: any, item: Cart) {
    return result + item.quantity * item.product.price;
  }, 0);
  return totalPrice;
};

const deleteCartByUserId = async (userId: number) => {
  await axios.delete(`${BaseApiUrl}/carts/userId/${userId}`);
  return userId;
};

export {
  getCarts,
  addToCart,
  updateCart,
  getTotalItems,
  incrementQty,
  decrementQty,
  deleteCart,
  getTotalPrice,
  deleteCartByUserId,
};

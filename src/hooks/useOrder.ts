import axios, { AxiosResponse } from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

type Order = {
  id?: number;
  orderCode: string;
  orderDate: string;
  paymentStatus: string;
  totalPrice: number;
  userId: number;
  user: any;
};

const getOrders = async () => {
  const response: AxiosResponse<Order[]> = await axios.get<Order[]>(
    `${BaseApiUrl}/orders`
  );
  return response.data;
};

const getOrderById = async (id: number) => {
  const response: AxiosResponse<Order> = await axios.get<Order>(
    `${BaseApiUrl}/orders/${id}`
  );
  return response.data;
};

const getOrdersByUserId = async (id: number) => {
  const response: AxiosResponse<any> = await axios.get<any>(
    `${BaseApiUrl}/orders/userId/${id}`
  );
  return response.data;
};

const createOrder = async (newItem: any) => {
  const response: AxiosResponse<Order> = await axios.post<Order>(
    `${BaseApiUrl}/orders`,
    newItem
  );
  return response.data;
};

const updateOrder = async (id: number, newItem: Order) => {
  await axios.put(`${BaseApiUrl}/orders/${id}`, newItem);
  return id;
};

const deleteOrder = async (id: number) => {
  await axios.delete(`${BaseApiUrl}/orders/${id}`);
  return id;
};

const getPaymentByOrderId = async (id: number) => {
  const response: AxiosResponse<any> = await axios.get<any>(
    `${BaseApiUrl}/orders/payment/${id}`
  );
  return response.data;
};

export { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, getPaymentByOrderId, getOrdersByUserId };

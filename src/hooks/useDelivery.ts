import axios, { AxiosResponse } from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

type Delivery = {
  id?: number;
  name: string;
  phone: string;
  address: string;
  orderId: number;
  order: any;
};

const getDelivery = async () => {
  const response: AxiosResponse<Delivery[]> = await axios.get<Delivery[]>(
    `${BaseApiUrl}/deliveries`
  );
  return response.data;
};

const getDeliveryById = async (id: number) => {
  const response: AxiosResponse<Delivery> = await axios.get<Delivery>(
    `${BaseApiUrl}/deliveries/${id}`
  );
  return response.data;
};

const createDelivery = async (newItem: any) => {
  const response: AxiosResponse<any> = await axios.post<any>(
    `${BaseApiUrl}/deliveries`,
    newItem
  );
  return response.data;
};

const updateDelivery = async (id: number, newItem: Delivery) => {
  await axios.put(`${BaseApiUrl}/deliveries/${id}`, newItem);
  return id;
};

const deleteDelivery = async (id: number) => {
  await axios.delete(`${BaseApiUrl}/deliveries/${id}`);
  return id;
};

export { getDelivery, getDeliveryById, createDelivery, updateDelivery, deleteDelivery };

import axios, { AxiosResponse } from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

type Detail = {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  orderId: number;
  order: any;
};

const getDetails = async () => {
  const response: AxiosResponse<Detail[]> = await axios.get<Detail[]>(
    `${BaseApiUrl}/details`
  );
  return response.data;
};

const getDetailById = async (id: number) => {
  const response: AxiosResponse<Detail> = await axios.get<Detail>(
    `${BaseApiUrl}/details/${id}`
  );
  return response.data;
};

const createDetail = async (newItem: any) => {
  const response: AxiosResponse<any> = await axios.post<any>(
    `${BaseApiUrl}/details`,
    newItem
  );
  return response.data;
};

const updateDetail = async (id: number, newItem: Detail) => {
  await axios.put(`${BaseApiUrl}/details/${id}`, newItem);
  return id;
};

const deleteDetail = async (id: number) => {
  await axios.delete(`${BaseApiUrl}/details/${id}`);
  return id;
};

export { getDetails, getDetailById, createDetail, updateDetail, deleteDetail };

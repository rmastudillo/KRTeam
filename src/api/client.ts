import { API_HOST } from "@/utils/constants";
import axios from "axios";

export const client = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setClientToken = (token: string) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

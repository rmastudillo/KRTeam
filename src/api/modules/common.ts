import { client } from "@/api/client";

export const healthCheck = () => client.get("/health-check");

export const getUserInfo = async () => client.get("/users/me");

export const getBooking = async () => client.get("/reservations/user/me");

export const postBooking = async (data: any, localId: number) =>
  client.post(`/reservations/restobar/${localId}`, data);

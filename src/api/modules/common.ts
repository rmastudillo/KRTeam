import { client } from "@/api/client";

export const healthCheck = () => client.get("/health-check");

// Users

export const getUsers = async () => client.get("/api/v1/users");

export const postUser = async (data: any) => client.post("/api/v1/users", data);

// User me

export const getUserInfo = async () => client.get("/api/v1/users/me");

export const putUserInfo = async (data: any) => client.put("/api/v1/users/me", data);

export const deleteUser = async () => client.delete("/api/v1/users/me");

// User by id

export const getUserById = async (user_id: number) =>
  client.get(`/api/v1/users/${user_id}`);

export const putUserById = async (user_id: number, data: any) =>
  client.put(`/api/v1/users/${user_id}`, data);

export const deleteUserById = async (user_id: number) =>
  client.delete(`/api/v1/users/${user_id}`);

// Restobars

export const getRestobars = async () => client.get("/api/v1/restobars/");

export const postRestobar = async (data: any) =>
  client.post("/api/v1/restobars/", data);

// Restobar by id

export const getRestobarById = async (restobar_id: number) =>
  client.get(`/api/v1/restobars/${restobar_id}`);

export const deleteRestobarById = async (restobar_id: number) =>
  client.delete(`/api/v1/restobars/${restobar_id}`);

export const patchRestobarById = async (restobar_id: number, data: any) =>
  client.put(`/api/v1/restobars/${restobar_id}`, data);

export const patchRestobarByIdMenu = async (restobar_id: number, data: any) =>
  client.put(`/api/v1/restobars/${restobar_id}/menu`, data);

// Restobar requests

export const getRestobarRequests = async () =>
  client.get("/api/v1/restobars_requests/");

export const postRestobarRequest = async (data: any) =>
  client.post("/api/v1/restobars_requests/", data);

export const patchRestobarRequest = async (data: any, id: number) =>
  client.patch(`/api/v1/restobars_requests/${id}`, data);

// Tables

export const getTables = async (restobar_id: number) =>
  client.get(`/api/v1/tables/restobar/${restobar_id}`);

export const postTable = async (data: any, restobar_id: number) =>
  client.post(`/api/v1/tables/restobar/${restobar_id}`, data);

export const deleteTable = async (table_id: number, restobar_id: number) =>
  client.delete(`/api/v1/tables/${table_id}/restobar/${restobar_id}`);

export const patchTable = async (
  table_id: number,
  restobar_id: number,
  data: any
) => client.patch(`/api/v1/tables/${table_id}/restobar/${restobar_id}`, data);

// Reservations - Bookings

export const getReservations = async (restobar_id: number) =>
  client.get(`/api/v1/reservations/restobar/${restobar_id}`);

export const getBooking = async () => client.get("/api/v1/reservations/user/me");

export const postBooking = async (data: any, restobar_id: number) =>
  client.post(`/api/v1/reservations/restobar/${restobar_id}`, data);

export const patchReservations = async ( data: any, reservation_id: number) =>
  client.patch(`/api/v1/reservations/${reservation_id}`, data);

// Ranking

export const getRanking = async (restobar_id: number) =>
  client.get(`/api/v1/ratings/restobar/${restobar_id}`);

export const postRanking = async (data:any, restobar_id: number) =>
  client.post(`/api/v1/ratings/restobar/${restobar_id}`, data);
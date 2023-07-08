import { client } from "@/api/client";

export const healthCheck = () => client.get("/health-check");

// Users

export const getUsers = async () => client.get("/users");

export const postUser = async (data: any) => client.post("/users", data);

// User me

export const getUserInfo = async () => client.get("/users/me");

export const putUserInfo = async (data: any) => client.put("/users/me", data);

export const deleteUser = async () => client.delete("/users/me");

// User by id

export const getUserById = async (user_id: number) =>
  client.get(`/users/${user_id}`);

export const putUserById = async (user_id: number, data: any) =>
  client.put(`/users/${user_id}`, data);

export const deleteUserById = async (user_id: number) =>
  client.delete(`/users/${user_id}`);

// Restobars

export const getRestobars = async () => client.get("/restobars");

export const postRestobar = async (data: any) =>
  client.post("/restobars", data);

// Restobar by id

export const getRestobarById = async (restobar_id: number) =>
  client.get(`/restobars/${restobar_id}`);

export const deleteRestobarById = async (restobar_id: number) =>
  client.delete(`/restobars/${restobar_id}`);

export const patchRestobarById = async (restobar_id: number, data: any) =>
  client.put(`/restobars/${restobar_id}`, data);

export const patchRestobarByIdMenu = async (restobar_id: number, data: any) =>
  client.put(`/restobars/${restobar_id}/menu`, data);

// Restobar requests

export const getRestobarRequests = async () =>
  client.get("/restobars_requests/");

export const postRestobarRequest = async (data: any) =>
  client.post("/restobars_request/s", data);

export const patchRestobarRequest = async (data: any, id: number) =>
  client.patch(`/restobars_requests/${id}`, data);

// Tables

export const getTables = async (restobar_id: number) =>
  client.get(`/tables/restobar/${restobar_id}`);

export const postTable = async (data: any, restobar_id: number) =>
  client.post(`/tables/restobar/${restobar_id}`, data);

export const deleteTable = async (table_id: number, restobar_id: number) =>
  client.delete(`/tables/${table_id}/restobar/${restobar_id}`);

export const patchTable = async (
  table_id: number,
  restobar_id: number,
  data: any
) => client.patch(`/tables/${table_id}/restobar/${restobar_id}`, data);

// Reservations - Bookings

export const getReservations = async (restobar_id: number) =>
  client.get(`/reservations/restobar/${restobar_id}`);

export const getBooking = async () => client.get("/reservations/user/me");

export const postBooking = async (data: any, restobar_id: number) =>
  client.post(`/reservations/restobar/${restobar_id}`, data);

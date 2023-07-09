import { setClientToken } from "@/api/client";
import {
  deleteTable,
  getBooking,
  getReservations,
  getRestobarRequests,
  getRestobars,
  getTables,
  getUserInfo,
  postBooking,
  postTable,
} from "@/api/modules/common";
import { defineStore } from "pinia";

export interface Local {
  name: string;
  address: string;
  unit_number: number;
  commune: string;
  region: string;
  id: number;
  owner_id: number;
  tables: Array<number>;
  coordinates: Array<number>;
  menu_url: string;
}
export interface LocalRequest {
  name: string;
  owner_email: string;
  address: string;
  unit_number: number;
  commune: string;
  region: string;
  status: string;
  id: number;
}

interface User {
  email: string;
  full_name: string;
  is_active: boolean;
  is_superuser: boolean;
  is_restobar_owner: boolean;
  restobars: Local[];
}

interface Booking {
  people: number;
  start_time: Date;
  end_time: Date;
  for_smokers: boolean;
  id: number;
  user_id: number;
  table_id: number;
  restobar_id: number;
  status: string;
}

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userToken: "",
    userIsAppAdmin: false,
    userIsRestobarAdmin: false,
    userIsLoggedIn: false,
    loading: false,
    userInfo: {} as User,
    userBooking: [] as Booking[],
    adminRestobar: [] as Local[],
    adminRestobarRequest: [] as LocalRequest[],
    managerRestobarBooking: [] as any[],
    managerMyTables: [] as any[],
    error: "",
  }),
  getters: {
    getToken(): string {
      return this.userToken;
    },
    isAppAdmin(): boolean {
      return this.userIsAppAdmin;
    },
    isRestobarAdmin(): boolean {
      return this.userIsRestobarAdmin;
    },
    isLogged(): boolean {
      return this.userIsLoggedIn;
    },
    user(): User {
      return this.userInfo;
    },
    myRestobars(): Local {
      return this.userInfo.restobars[0];
    },
  },
  actions: {
    setToken(userToken: string): void {
      this.userToken = userToken;
      localStorage.setItem("userToken", userToken);
      setClientToken(userToken);
    },
    async getInfo() {
      this.loading = true;
      try {
        // Obtener información de usuario
        const response = await getUserInfo();
        this.userInfo = response.data;
      } catch (error) {
        console.error(
          "Error tratando de obtener la información del usuario:",
          error
        );
      }
      this.loading = false;
    },

    async getBooking() {
      this.loading = true;
      this.userBooking = [];
      try {
        // Obtener información de usuario
        const response = await getBooking();
        this.userBooking = response.data;
      } catch (error) {
        console.error(
          "Error tratando de obtener la información de las reservas:",
          error
        );
      }
      this.loading = false;
    },
    async postBooking(booking: Booking, Localid: number) {
      this.loading = true;
      try {
        const response = await postBooking(booking, Localid);
        this.userBooking = response.data;
      } catch (error: any) {
        alert("Error al realizar la reserva, porfavor intentelo más tarde");
        console.error("Error al realizar la reserva:", error);
      }
      this.loading = false;
    },

    async getMyRestobarsBooking() {
      this.loading = true;
      this.managerRestobarBooking = [];
      try {
        // Obtener información de usuario
        this.getInfo();
        if (this.user.restobars.length > 0) {
          const table_id = this.user.restobars[0].id;
          const response = await getReservations(table_id);
          this.managerRestobarBooking = response.data;
        }
      } catch (error) {
        console.error(
          "Error tratando de obtener la información del usuario:",
          error
        );
      }
    },

    async managerGetMyTables(restobar_id: number) {
      this.loading = true;
      this.managerMyTables = [];
      try {
        // Obtener información de usuario
        const response = await getTables(restobar_id);
        this.managerMyTables = response.data;
      } catch (error) {
        console.error(
          "Error tratando de obtener la información del usuario:",
          error
        );
      }
    },

    async adminGetRestobar() {
      this.loading = true;
      this.adminRestobar = [];
      try {
        const response = await getRestobars();
        this.adminRestobar = response.data;
      } catch (error) {
        console.error("Error tratando de obtener los locales:", error);
      }
      this.loading = false;
    },

    async adminGetRestobarRequest() {
      this.loading = true;
      this.adminRestobarRequest = [];
      try {
        // Obtener información de usuario
        const response = await getRestobarRequests();
        this.adminRestobarRequest = response.data;
      } catch (error) {
        console.error("Error tratando de obtener las reservas:", error);
      }
      this.loading = false;
    },

    async managerAddTable(restobar_id: number, data: any) {
      this.loading = true;
      try {
        await postTable(data, restobar_id);
      } catch (error) {
        console.error("Error al realizar la reserva:", error);
      }
      this.loading = false;
    },

    async managerDeleteTable(table_id: number, restobar_id: number) {
      this.loading = true;
      try {
        await deleteTable(table_id, restobar_id);
      } catch (error) {
        console.error("Error al realizar la reserva:", error);
      }
      this.loading = false;
    },

    setIsAppAdmin(value: boolean): void {
      this.userIsAppAdmin = value;
      localStorage.setItem("userIsAppAdmin", value.toString());
    },
    setIsRestobarAdmin(value: boolean): void {
      this.userIsRestobarAdmin = value;
      localStorage.setItem("userIsRestobarAdmin", value.toString());
    },
    setIsLogged(value: boolean): void {
      this.userIsLoggedIn = value;
      localStorage.setItem("userIsLoggedIn", value.toString());
    },
    loadFromLocalStorage(): void {
      const userToken = localStorage.getItem("userToken");
      userToken ? this.setToken(userToken) : this.setToken("");

      const userIsAppAdmin = localStorage.getItem("userIsAppAdmin");
      userIsAppAdmin === "true"
        ? this.setIsAppAdmin(true)
        : this.setIsAppAdmin(false);

      const userIsRestobarAdmin = localStorage.getItem("userIsRestobarAdmin");
      userIsRestobarAdmin === "true"
        ? this.setIsRestobarAdmin(true)
        : this.setIsRestobarAdmin(false);

      const userIsloggedIn = localStorage.getItem("userIsLoggedIn");
      userIsloggedIn === "true"
        ? this.setIsLogged(true)
        : this.setIsLogged(false);
    },
    logout(): void {
      this.setToken("");
      this.setIsAppAdmin(false);
      this.setIsRestobarAdmin(false);
      this.setIsLogged(false);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userIsAppAdmin");
      localStorage.removeItem("userIsRestobarAdmin");
      localStorage.removeItem("userIsLoggedIn");
      this.userInfo = {} as User;
      this.userBooking = [] as Booking[];
    },
  },
  persist: true,
});

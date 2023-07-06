import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userToken: "",
    userIsAppAdmin: false,
    userIsRestobarAdmin: false,
    userIsLoggedIn: false,
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
  },
  actions: {
    setToken(userToken: string): void {
      this.userToken = userToken;
      localStorage.setItem("userToken", userToken);
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
    },
  },
});

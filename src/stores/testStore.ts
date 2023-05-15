import { defineStore } from "pinia";

interface State {
    test: string;
}

export const useTestStore = defineStore({
  id: "test",
  state: (): State => ({
    test: "sin modificar",
  }),
  getters: {
    getTest(state: State): string {
        return state.test;
    },
  },
  actions: {
    setTest(test: string) {
      this.test = test;
    },
  },
  persist: true,
});

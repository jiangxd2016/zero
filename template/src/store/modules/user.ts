import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {

  state: () => ({
    token: '',
    name: '',
    avatar: '',
  }),
  getters: {
    getToken(state) {
      return state.token;
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    }
  }
});

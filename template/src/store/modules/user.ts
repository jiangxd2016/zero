import { defineStore } from 'pinia';

const useUserStore = defineStore('user', () => {

  const userInfo = ref({
    name: 'admin',
    roles: ['admin'],
  });
  const refreshToken = ref<string>('');

  async function getUserInfo() {
    return userInfo.value;
  }

  async function logout() {
    useToken.remove();
    userInfo.value = {};
  }

  return {
    userInfo,
    refreshToken,
    getUserInfo,
    logout,
  };
});
export default useUserStore;


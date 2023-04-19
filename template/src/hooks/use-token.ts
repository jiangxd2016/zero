import Cookies from 'js-cookie';

const TOKEN_KEY = 'Admin-Token';

const useToken = {
  get: (key: string = TOKEN_KEY) => Cookies.get(key),
  set: (value: string, key: string = TOKEN_KEY) => Cookies.set(key, value),
  remove: (key: string = TOKEN_KEY) => Cookies.remove(key)
};
export default useToken;

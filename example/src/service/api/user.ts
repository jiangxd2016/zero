import { request } from "../request";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return request.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return request.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return request.post<any>('/api/user/info');
}

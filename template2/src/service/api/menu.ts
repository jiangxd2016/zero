import { request } from '../request';

export interface LoginData {
  username: string;
  password: string;
}

export function getRoutesInfo() {
  return request.get<any>('auth');
}

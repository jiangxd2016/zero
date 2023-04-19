import type { RouteRecordRaw } from 'vue-router';
import { request } from '../request';

export interface LoginData {
  username: string;
  password: string;
}

export function getRoutesInfo() {
  return request.post<RouteRecordRaw[]>('/api/user/route');
}

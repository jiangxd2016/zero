import { request } from '../request';

export interface ContentDataRecord {
  x: string;
  y: number;
}

export function queryContentData() {
  return request.get<ContentDataRecord[]>('/api/content-data');
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}

export function queryPopularList(params: { type: string }) {
  return request.get<PopularRecord[]>('/api/popular/list', { params });
}

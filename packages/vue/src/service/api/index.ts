import { request } from '../request';

export function getFields() {
  return request.get<any>('dev-api/test/fields');
}
export function getList() {
  return request.get<any>('dev-api/test/list');
}

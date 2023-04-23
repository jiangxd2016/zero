/**
 * 获取页面，如果没有则返回默认页面
 * @param path string
 * @returns
 */
export function getComponent(path: string) {
  const allPage = import.meta.glob(['@/views/**/*.vue', '@/views/**/*.jsx', '@/views/**/*.tsx']);

  // path.slice(1);

  const pathKeys = Object.keys(allPage);
  for (const key of pathKeys) {
    if (key.includes(path)) {
      return allPage[key];
    }
  }

  return () => import('@/views/comm/index.vue');

}

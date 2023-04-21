/**
 * 对象转url参数
 * @param data
 * @return string
 */
export function parseParams(data: Record<string, any>) {
  try {
    const tempArr = [];
    for (const i in data) {
      const key = encodeURIComponent(i);
      let val = data[i];
      // 内容中含有？ 会截断后续参数解析
      if (`${val}`.includes('?')) {
        val = encodeURIComponent(val);
      }
      tempArr.push(key + '=' + val);
    }
    return tempArr.join('&');
  } catch {
    return '';
  }
}

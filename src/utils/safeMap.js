export const safeMap = (array, cb) =>
  Array.isArray(array) ? array.map(cb) : [];

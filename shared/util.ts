export function debounce<Args extends any[], K>(
  fn: (...args: Args) => K,
  time: number,
) {
  let lastUsed: number = Date.now();
  return function (...args: Args) {
    const now = Date.now();
    if (now - lastUsed > time) {
      lastUsed = now;
      return fn(...args);
    }
    return undefined as K;
  };
}

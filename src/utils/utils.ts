export const debounce = <T>(callback: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: T[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

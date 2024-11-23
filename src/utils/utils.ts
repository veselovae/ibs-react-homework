export const debounce = <T>(cb: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: T[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

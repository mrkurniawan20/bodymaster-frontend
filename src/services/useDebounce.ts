import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, 1000);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounceValue;
}

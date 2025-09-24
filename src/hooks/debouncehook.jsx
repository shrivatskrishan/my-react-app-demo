import { useEffect, useRef, useState } from 'react';

const useDebounce = (input, delay) => {
  const [inputValue, setInputValue] = useState(input);
  const timer = useRef(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    timer.current = setTimeout(() => {
      setInputValue(input);
    }, delay);
    return () => {
      clearTimeout(timer.current);
      timer.current = null;
      setInputValue('');
    };
  }, [input, delay]);

  return inputValue;
};
export default useDebounce;

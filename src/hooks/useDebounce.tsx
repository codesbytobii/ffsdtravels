type CallbackFunction<T extends unknown[]> = (...args: T) => void;

export function debounce<T extends unknown[]>(
  func: CallbackFunction<T>,
  delay: number
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}



// hooks/useDebounce.ts
// import { useState, useEffect } from "react";

// const useDebounce = <T,>(value: T, delay: number): T => {
//     const [debouncedValue, setDebouncedValue] = useState<T>(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// };

// export default useDebounce;





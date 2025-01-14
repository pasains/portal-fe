import { useRef, useEffect, useCallback } from "react";

const useDebounceRef = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 500, // Default delay of 500ms if not specified
): T => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The debounced function, ensuring that the latest callback is used
  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear the previous timeout if any
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args); // Call the callback after the specified delay
      }, delay);
    },
    [callback, delay], // Recreate the debounced function if callback or delay changes
  );

  // Cleanup on component unmount or when callback changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clean up the timeout
      }
    };
  }, []);

  return debouncedFunction as T; // Return the debounced function with the correct type
};

export default useDebounceRef;

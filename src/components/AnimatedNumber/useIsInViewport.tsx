"use client";
import { useEffect, useState, useRef } from "react";

export const useIsInViewport = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isIntersecting: hasIntersected };
};

export default useIsInViewport;

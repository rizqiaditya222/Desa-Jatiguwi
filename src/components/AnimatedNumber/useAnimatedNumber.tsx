"use client";
import { useEffect, useState } from "react";

const easeOutCirc = (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2));

export const useAnimatedNumber = (
  target: number,
  duration: number = 2000,
  shouldAnimate: boolean = true
) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    setNumber(0); // <- reset ke 0 setiap kali animasi dimulai

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCirc(progress);
      const currentValue = Math.floor(easedProgress * target);
      setNumber(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setNumber(target); // pastikan sampai target
      }
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, shouldAnimate]);

  return number;
};
export default useAnimatedNumber;

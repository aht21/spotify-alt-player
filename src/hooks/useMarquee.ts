import { useEffect, useRef, useCallback } from "react";

interface Options {
  speed?: number;
  pause?: number;
  deps?: unknown[];
}

export const useMarquee = ({ speed = 30, pause = 3, deps = [] }: Options = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const overflow = content.scrollWidth - container.clientWidth;
    if (overflow <= 0) return;

    const move = overflow / speed;
    const total = 2 * move + 2 * pause;

    const animation = content.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(0)", offset: pause / total },
        { transform: `translateX(-${overflow}px)`, offset: (pause + move) / total },
        { transform: `translateX(-${overflow}px)`, offset: (2 * pause + move) / total },
        { transform: "translateX(0)" },
      ],
      { duration: total * 1000, iterations: Infinity, easing: "linear" },
    );

    animationRef.current = animation;

    return () => {
      animation.cancel();
      animationRef.current = null;
    };
  }, [speed, pause, ...deps]);

  const handleMouseEnter = useCallback(() => animationRef.current?.pause(), []);
  const handleMouseLeave = useCallback(() => animationRef.current?.play(), []);

  return { containerRef, contentRef, handleMouseEnter, handleMouseLeave };
};

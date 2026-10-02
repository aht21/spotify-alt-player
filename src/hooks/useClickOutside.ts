import { useEffect, useRef, useState, type RefObject } from "react";

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  ignoreRefs: RefObject<HTMLElement | null>[] = [],
  initialState = false,
) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inMenu = ref.current?.contains(target);
      const inIgnored = ignoreRefs.some((r) => r.current?.contains(target));

      if (!inMenu && !inIgnored) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, ignoreRefs]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return { isOpen, setIsOpen, toggle, close, ref };
};

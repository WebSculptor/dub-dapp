"use client";

import { useEffect, useState, useCallback } from "react";

export const useDesktopView = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const updateIsDesktop = useCallback((e: MediaQueryListEvent) => {
    setIsDesktop(e.matches);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(min-width: 768px)");

      // Set initial state
      setIsDesktop(mediaQuery.matches);

      // Add event listener
      mediaQuery.addEventListener("change", updateIsDesktop);

      // Clean up event listener on unmount
      return () => {
        mediaQuery.removeEventListener("change", updateIsDesktop);
      };
    }
  }, [updateIsDesktop]);

  return isDesktop;
};

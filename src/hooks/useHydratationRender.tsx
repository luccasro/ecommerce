"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface HydrationRenderContextType {
  isHydrationRender: boolean;
}

const HydrationRenderContext = createContext<HydrationRenderContextType>({
  isHydrationRender: true,
});

export const useHydrationRender = () => useContext(HydrationRenderContext);

interface HydrationRenderProviderProps {
  children: React.ReactNode;
}

export const HydrationRenderProvider: React.FC<
  HydrationRenderProviderProps
> = ({ children }) => {
  const [isHydrationRender, setIsHydrationRender] = useState(true);

  useEffect(() => {
    setIsHydrationRender(false);
  }, []);

  return (
    <HydrationRenderContext.Provider value={{ isHydrationRender }}>
      {children}
    </HydrationRenderContext.Provider>
  );
};

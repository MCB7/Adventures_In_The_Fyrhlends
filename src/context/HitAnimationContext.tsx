import React, { createContext, useContext, useState } from "react";
interface Props {
  children: React.ReactNode;
}


interface isAnimationContextData {
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

export const IsAnimationContext= createContext<isAnimationContextData>({
  isAnimating: false,
  setIsAnimating: () => {},
});
export const useisAnimationContext = () => useContext(IsAnimationContext);

export const IsAnimationProvider:React.FC<Props> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <IsAnimationContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </IsAnimationContext.Provider>
  );
};

interface HitAnimationContextData {
  hit: boolean;
  setHit: (hit: boolean) => void;
}

const HitAnimationContext = createContext<HitAnimationContextData>({
  hit: false,
  setHit: () => {},
});

export const useHitAnimationContext = () => useContext(HitAnimationContext);


export const HitAnimationProvider: React.FC<Props> = ({ children }) => {
    const [hit, setHit] = useState(false);
  return (
    <HitAnimationContext.Provider value={{ hit, setHit }}>
      {children}
    </HitAnimationContext.Provider>
  );
};
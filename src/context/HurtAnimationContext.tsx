import React, { createContext, useContext, useState } from "react";


interface HurtAnimationContextData {
  Hurt: boolean;
  setHurt: (Hurt: boolean) => void;
}

const HurtAnimationContext = createContext<HurtAnimationContextData>({
  Hurt: false,
  setHurt: () => {},
});

export const useHurtAnimationContext = () => useContext(HurtAnimationContext);

interface Props {
  children: React.ReactNode;
}

export const HurtAnimationProvider: React.FC<Props> = ({ children }) => {
    const [Hurt, setHurt] = useState(false);
  return (
    <HurtAnimationContext.Provider value={{ Hurt, setHurt }}>
      {children}
    </HurtAnimationContext.Provider>
  );
};
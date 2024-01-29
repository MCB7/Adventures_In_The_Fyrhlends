import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';


export const BattleStateContext = createContext({
  info: null,
  setInfo: (() => {}) as Dispatch<SetStateAction<null>>,
});

export const useBattleStateContext = () => useContext(BattleStateContext);

export const BattleStateProvider = ({ children } : {children : any}) => {
  const [info, setInfo] = useState(null);

  return (
    <BattleStateContext.Provider value={{ info, setInfo }}>
      {children}
    </BattleStateContext.Provider>
  );
};
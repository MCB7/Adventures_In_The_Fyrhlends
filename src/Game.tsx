import { CharacterProvider } from "./context/CharacterContext";
import { StatsProvider } from "./context/StatsContext";
import { AttributesProvider } from "./context/AttributesContext";
import { InventoryProvider } from "./context/InventoryContext";
import { ItemTransferProvider } from "./context/ItemTransferContext";
import { EquipmentProvider } from "./context/EquipmentContext";
import { LocationContextProvider } from "./context/LocationContext";
import CreateCharacter from './components/CreateCharacter'
import Character from './components/Character'
import Battle from './components/Battle'
import ItemTransfer from './components/ItemTransfer'

import Map from './components/Map'


const Game: React.FC = () => {
  return (
    <LocationContextProvider>
    <EquipmentProvider>
    <ItemTransferProvider>
    <InventoryProvider>
    <CharacterProvider>
      <StatsProvider>
        <AttributesProvider>
         <Map/>

   {/* <CreateCharacter/>
   <Battle/>
  <Character/> */}

  {/* <ItemTransfer/>  */}

        </AttributesProvider>
      </StatsProvider>
    </CharacterProvider>
    </InventoryProvider>
    </ItemTransferProvider>
    </EquipmentProvider>
    </LocationContextProvider>
  );
};
export default Game

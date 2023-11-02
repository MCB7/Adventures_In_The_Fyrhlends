import { CharacterProvider } from "./context/CharacterContext";
import { StatsProvider } from "./context/StatsContext";
import { EnemyStatsProvider } from "./context/EnemyStatsContext";
import { AttributesProvider } from "./context/AttributesContext";
import { InventoryProvider } from "./context/InventoryContext";
import { ItemTransferProvider } from "./context/ItemTransferContext";
import { EquipmentProvider } from "./context/EquipmentContext";
import { LocationContextProvider } from "./context/LocationContext";
import { BiomeProvider } from "./context/BiomeContext";
import { EnemyProvider } from "./context/EnemyContext";
import { BattleStateProvider } from "./context/BattleStateContext";
import { HitAnimationProvider, IsAnimationProvider } from "./context/HitAnimationContext";
import { HurtAnimationProvider } from "./context/HurtAnimationContext";
import { BlockAnimationProvider } from "./context/BlockAnimationContext";
import { EnemyHitAnimationProvider } from "./context/EnemyHitAnimationContext";
import { EnemyBlockAnimationProvider } from "./context/EnemyBlockAnimationContext";
import { EnemyHurtAnimationProvider } from "./context/EnemyHurtContext";
// import CreateCharacter from "./components/CreateCharacter";
// import Character from "./components/Character";
// import Battle from "./components/Battle";
// import ItemTransfer from "./components/ItemTransfer";
// import Inventory from "./components/Inventory";
// import Battle from "./components/Battle";
// import BattleStage from "./components/BattleStage";

import Map from "./components/Map";

const Game: React.FC = () => {
  return (
    <BiomeProvider>
      <EnemyProvider>
        <LocationContextProvider>
          <EquipmentProvider>
            <ItemTransferProvider>
              <InventoryProvider>
                <CharacterProvider>
                  <EnemyStatsProvider>
                    <StatsProvider>
                      <AttributesProvider>
                        <BattleStateProvider>
                          <HitAnimationProvider>
                            <BlockAnimationProvider>
                              <HurtAnimationProvider>
                                <EnemyHitAnimationProvider>
                                  <EnemyBlockAnimationProvider>
                                    <EnemyHurtAnimationProvider>
                                      <IsAnimationProvider>
                                      {/* <BattleStage /> */}
                                      <Map/>
                                      {/* 
                                      <Battle /> 
                                      
                                      <CreateCharacter/> 
                                      <Battle/> 
                                      <Character/>
                                      <Inventory/>
                                      <ItemTransfer/>  */}

                                    
                                      </IsAnimationProvider>
                                    </EnemyHurtAnimationProvider>
                                  </EnemyBlockAnimationProvider>
                                </EnemyHitAnimationProvider>
                              </HurtAnimationProvider>
                            </BlockAnimationProvider>
                          </HitAnimationProvider>
                        </BattleStateProvider>
                      </AttributesProvider>
                    </StatsProvider>
                  </EnemyStatsProvider>
                </CharacterProvider>
              </InventoryProvider>
            </ItemTransferProvider>
          </EquipmentProvider>
        </LocationContextProvider>
      </EnemyProvider>
    </BiomeProvider>
  );
};
export default Game;

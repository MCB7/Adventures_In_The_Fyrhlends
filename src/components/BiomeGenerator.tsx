import { ForestBiome, MoutainsBiome } from "./Biome";
import { useLocationContext } from "../context/LocationContext";

export const BiomeGenerator: React.FC = () => {
    const { LocationX, LocationY } = useLocationContext();
  
    // Check if LocationX = 1 and LocationY = 1
    if (LocationX === 2.5 && LocationY === 2.5) {
      // Randomize the index of the biome array
      const rndNum = Math.floor(Math.random() * 3);
  
      // Assign the corresponding biome based on the randomized index
      const BiomeGenerated = ForestBiome[rndNum];
  
      // Use the generated biome data
      console.log(BiomeGenerated);
  
      // Return the BiomeGenerated data as a console.log
      return <>{console.log(BiomeGenerated)}</>;
    } else  if (LocationX === 2.5 && LocationY === 7.5) {
        // Randomize the index of the biome array
        const rndNum = Math.floor(Math.random() * 3);
    
        // Assign the corresponding biome based on the randomized index
        const BiomeGenerated = MoutainsBiome[rndNum];
    
        // Use the generated biome data
        console.log(BiomeGenerated);
    
        // Return the BiomeGenerated data as a console.log
        return <>{console.log(BiomeGenerated)}</>;
      }
  
    // Return null if the conditions are not met
    return null;
  };
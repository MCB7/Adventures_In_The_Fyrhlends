import React, { useEffect, useMemo } from "react";
import { useLocationContext } from "../context/LocationContext";
import { useBiomeContext } from "../context/BiomeContext";
import { CivilizationBiome, FoothillsBiome, ForestBiome, MireBiome, MoutainsBiome } from "./Biome";

type Biome = any;
type BiomeArray = Biome[];

export const BiomeGenerator: React.FC = () => {
  const { LocationX, LocationY } = useLocationContext();
  const { biome, setbiome } = useBiomeContext();

  const generateBiome = (biomeArray: BiomeArray): Biome => {
    const rndNum = Math.floor(Math.random() * 3);
    const BiomeGenerated = biomeArray[rndNum];
    return BiomeGenerated;
  };

  const BiomeGenerated = useMemo(() => {
    switch (`${LocationX},${LocationY}`) {
      case "22.5,2.5":
      case "27.5,2.5":
      case "32.5,2.5":
      case "37.5,2.5":
      case "42.5,2.5":
      case "47.5,2.5":
        return generateBiome(ForestBiome);
      case "2.5,2.5":
      case "7.5,2.5":
      case "12.5,2.5":
        return generateBiome(MoutainsBiome);
      case "17.5,2.5":
        return generateBiome(FoothillsBiome);
      case "52.5,2.5":
      case "57.5,2.5":
      case "62.5,2.5":
      case "67.5,2.5":
        return generateBiome(MireBiome);
      case "92.5,2.5":
      case "97.5,2.5":
        return CivilizationBiome[2];
      default:
        return undefined;
    }
  }, [LocationX, LocationY]);

  useEffect(() => {
    if (BiomeGenerated) {
      setbiome(BiomeGenerated);

        console.log("Type:", biome.Type);
        console.log("Threat:", biome.ThreatRating);
  
    }
  }, [BiomeGenerated, setbiome, biome]);

  return null;
};

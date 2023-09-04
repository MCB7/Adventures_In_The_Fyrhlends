export interface Biome {
    
    Type: string;
    LowTemp: number;
    HighTemp: number;
    PotableWater: number;
    Precipitation: number;
    ThreatRating:string
}

export const ForestBiome:Biome[] = [
    {
        Type: "Forest",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 80,
        Precipitation: 60,
        ThreatRating: "low"
   
    },

    {
        Type: "Forest",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 80,
        Precipitation: 60,
        ThreatRating: "medium"
   
    },

    {
        Type: "Forest",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 80,
        Precipitation: 60,
        ThreatRating: "high"
   
    }
]
export const WoodlandsBiome:Biome[] = [
    {
        Type: "Woodlands",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 60,
        Precipitation: 40,
        ThreatRating: "low"
   
    },

    {
        Type: "Woodlands",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 60,
        Precipitation: 40,
        ThreatRating: "medium"
   
    },

    {
        Type: "Woodlands",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 60,
        Precipitation: 40,
        ThreatRating: "high"
   
    }
]
export const FoothillsBiome:Biome[] = [
    {
        Type: "Foothills",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 30,
        Precipitation: 30,
        ThreatRating: "low"
   
    },

    {
        Type: "Foothills",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 30,
        Precipitation: 30,
        ThreatRating: "medium"
   
    },

    {
        Type: "Foothills",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 30,
        Precipitation: 30,
        ThreatRating: "high"
   
    }
]
export const MireBiome:Biome[] = [
    {
        Type: "Mire",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 20,
        Precipitation: 60,
        ThreatRating: "low"
   
    },

    {
        Type: "Mire",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 20,
        Precipitation: 60,
        ThreatRating: "medium"
   
    },

    {
        Type: "Mire",
        LowTemp: 34,
        HighTemp: 80,
        PotableWater: 20,
        Precipitation: 60,
        ThreatRating: "high"
   
    }
] 
export const MoutainsBiome:Biome[] = [
    {
        Type: "Moutains",
        LowTemp: 30,
        HighTemp: 75,
        PotableWater: 30,
        Precipitation: 50,
        ThreatRating: "low"
   
    },

    {
        Type: "Moutains",
        LowTemp: 30,
        HighTemp: 75,
        PotableWater: 30,
        Precipitation: 50,
        ThreatRating: "medium"
   
    },

    {
        Type: "Moutains",
        LowTemp: 30,
        HighTemp: 75,
        PotableWater: 30,
        Precipitation: 50,
        ThreatRating: "high"
   
    }
]

export const SteppesBiome:Biome[] = [
    {
        Type: "Steppes",
        LowTemp: 30,
        HighTemp: 80,
        PotableWater: 20,
        Precipitation: 20,
        ThreatRating: "low"
   
    },

    {
        Type: "Steppes",
        LowTemp: 30,
        HighTemp: 80,
        PotableWater: 20,
        Precipitation: 20,
        ThreatRating: "medium"
   
    },

    {
        Type: "Steppes",
        LowTemp: 30,
        HighTemp: 80,
        PotableWater: 20,
        Precipitation: 20,
        ThreatRating: "high"
   
    }
]
    
export const CivilizationBiome:Biome[] = [
    {
        Type: "Hold",
        LowTemp: 30,
        HighTemp: 80,
        PotableWater: 100,
        Precipitation: 50,
        ThreatRating: "none"
   
    },

    {
        Type: "Citadel",
        LowTemp: 30,
        HighTemp: 80,
        PotableWater: 100,
        Precipitation: 50,
        ThreatRating: "low"
   
    },

    {
        Type: "Farmland",
        LowTemp: 30,
        HighTemp: 80,
        PotableWater: 100,
        Precipitation: 50,
        ThreatRating: "low"
   
    }
]
    


  

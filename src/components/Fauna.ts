export interface ForestFauna {
    
    name: string;
    HP: number;
    EP: number;
    AP: number;
    lowDam: number;
    HighDam: number;
    description: string;
    defense: number;
    ThreatRating: string;
    
}

export const ForestFauna:ForestFauna[] = [
    {
    name: "Forest Bandit",
    HP: 100,
    EP: 100,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "a mud covered man in a camouflage of leaves, twigs, and bird droppings. He's holding a cruel looking cudgel and a rotting wooden shield ",
    defense: 10,
    ThreatRating: "low"
    }, 
    {
    name: "Underman",
    HP: 100,
    EP: 0,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "an albino humanoid, covered in sores and lychen. Hunched over the creature is shaking with rage and hatred ",
    defense: 10,
    ThreatRating: "low"
    },
    {
    name: "Daeodon",
    HP: 200,
    EP: 0,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "A squealing monstrostiy the size of a bear, its mouth full of jagged teeth and tusks",
    defense: 10,
    ThreatRating: "high"
    }

]

  

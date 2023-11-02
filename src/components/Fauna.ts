
export interface Fauna {
    
    Type: string;
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
export const generateFauna = (hitpoints : number, endurancepoints : number, actionpoints : number) => {


const ForestFauna:Fauna[] = [
    {
    Type: "Forest",
    name: "Forest Bandit",
    HP: hitpoints * .25,
    EP: endurancepoints * .25,
    AP: actionpoints,
    lowDam: 1,
    HighDam: 5,
    description: "a mud covered man in a camouflage of leaves, twigs, and bird droppings. He's holding a cruel looking cudgel and a rotting wooden shield ",
    defense: 10,
    ThreatRating: "medium"
    }, 
    {
    Type: "Forest",
    name: "Underman",
    HP: hitpoints * .75,
    EP: endurancepoints * .25,
    AP: actionpoints,
    lowDam: 1,
    HighDam: 5,
    description: "an albino humanoid, covered in sores and lychen. Hunched over the creature is shaking with rage and hatred ",
    defense: 10,
    ThreatRating: "low"
    },
    {
    Type: "Forest",
    name: "Daeodon",
    HP: hitpoints * .5,
    EP: 0,
    AP: actionpoints * .25,
    lowDam: 1,
    HighDam: 5,
    description: "A squealing scarred monstrostiy, its mouth full of jagged teeth and tusks",
    defense: 10,
    ThreatRating: "high"
    }

]

const MireFauna:Fauna[] = [
    {
    Type: "Mire",
    name: "Heanling Bandit",
    HP: 50,
    EP: 100,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "A jagged blade, chitnous shield, and bright orange hair like a flame, this Heanling bears ill-intent to the weary traveler ",
    defense: 10,
    ThreatRating: "medium"
    }, 
    {
    Type: "Mire",
    name: "Frogman",
    HP: 100,
    EP: 0,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "This amphibious humanoid looks at you while it licks its wet giant globular eye ",
    defense: 10,
    ThreatRating: "low"
    },
    {
    Type: "Mire",
    name: "Insectoid",
    HP: 200,
    EP: 0,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "A horror of bladed legs and tripping venomous fangs, its undulating movement is alarmingly fast",
    defense: 10,
    ThreatRating: "high"
    }

]  
 const MountainFauna:Fauna[] = [
    {
    Type: "Mountains",
    name: "Mountain Bandit",
    HP: 100,
    EP: 100,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "Covered in flea ridden animal furs, this wind rashed miscreant lunges at you with a battered shield and rusted sword",
    defense: 10,
    ThreatRating: "medium"
    }, 
    {
    Type: "Mountains",
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
    Type: "Mountains",
    name: "Roc",
    HP: 200,
    EP: 0,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "A massive winged bird",
    defense: 10,
    ThreatRating: "high"
    }

]

const FoothillFauna:Fauna[] = [
    {
    Type: "Foothills",
    name: "Hill Bandit",
    HP: 100,
    EP: 100,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "The bandit bellows a foul note on a strange horn then charges at you shield and axe ready",
    defense: 10,
    ThreatRating: "medium"
    }, 
    {
    Type: "Foothills",
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
    Type: "Foothills",
    name: "Megalictis",
    HP: 200,
    EP: 0,
    AP: 100,
    lowDam: 1,
    HighDam: 5,
    description: "A snarling large mustelids, jaws capable of crushing a mans skull",
    defense: 10,
    ThreatRating: "high"
    }

]  
return { ForestFauna, MireFauna, MountainFauna, FoothillFauna };
}
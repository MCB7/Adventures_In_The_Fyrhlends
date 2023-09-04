// weapons.ts
export interface Weapon {
    type: string;
    name: string;
    description: string;
    damageType: string;
    lowDamage: any;
    highDamage: any;
    weight: any;
    special: string | null;
    icon: string;
    image: string;
  }
  export interface Shield {
    type: string;
    name: string;
    description: string;
    defense: string;
    weight: any;
    special: string | null;
    icon: string;
    image: string;
  }
  export interface Helmet {
    type: string;
    name: string;
    description: string;
    defense: string;
    weight: any;
    special: string | null;
    icon: string;
    image: string;
  }
  export interface Armor {
    type: string;
    name: string;
    description: string;
    defense: string;
    weight: any;
    special: string | null;
    icon: string;
    image: string;
  }
  export interface Bracers {
    type: string;
    name: string;
    description: string;
    defense: string;
    weight: any;
    special: string | null;
    icon: string;
    image: string;
  }
  export interface Boots {
    type: string;
    name: string;
    description: string;
    defense: string;
    weight: any;
    special: string | null;
    icon: string;
    image: string;
  }
  export interface Ring {
    type: string;
    name: string;
    description: string;
    special: string | null;
    icon: string;
    image: string;
  }
  export interface Amulet {
    type: string;
    name: string;
    description: string;
    special: string | null;
    icon: string;
    image: string;
  }
  
  export const Weapons: Weapon[] = [
    {
      type: "Weapon",
      name: "Iron Sword",
      description:
        "A dull cold sword, its hilt wrapped in well worn beige leather that has seen many hands and a blade pitted and gray.",
      damageType: "Slashing",
      lowDamage: "1",
      highDamage: "8",
      weight: "4",
      special: null,
      icon: "item/img.icon",
      image: "item/img.png",
    },
    {
        type: "Weapon",
        name: "Weirded Steel Sword",
        description:
          "It feels light in the hand and flashes with a blue incandescence",
        damageType: "Slashing",
        lowDamage: "1",
        highDamage: "10",
        weight: "4",
        special: null,
        icon: "item/img.icon",
        image: "item/img.png",
      },
    // Add more weapons here
  ];

  export const Shields : Shield[] = [

    {   type: "Shield",
        name: "Wooden Kite Shield",
        description: "Made from Ghostwood, bearing the scars of battle, it was at one time painted goldenrod by the judge of the flecks of color that still hang on",
        defense: "10",
        weight: "7",
        special: null,
        icon: "item/img.icon",
        image:  "item/img.png",
    },
    {
        type: "Shield",
        name: "Iron shield",
        description: "Blackened and Heavy, it it roughly engraved with intricate patterns",
        defense: "20",
        weight: "15",
        special: null,
        icon: "item/img.icon",
        image:  "item/img.png",
    
    }
  ]

  
  export const Helmet : Helmet[] = [

    {
      type: "Helmet",
      name: "Iron Helm",
      description: "A conical iron helm",
      defense: "40",
      weight: "10",
      special: null,
      icon: "item/img.icon",
      image:  "item/img.png",
    },
    {
      type: "Helmet",
      name: "Face Helm",
      description: "An enclosed iron helm, the faceguard is the facsimile of a solemn face",
      defense: "50",
      weight: "10",
      special: null,
      icon: "item/img.icon",
      image:  "item/img.png",
    },
  ]

  export const Armor : Armor[] = [

    {
      type: "Armor",
      name: "Mail Hauberk",
      description: "An iron chainmail shirt, long sleeved and falling to the thigh",
      defense: "50",
      weight: "25",
      special: null,
      icon: "item/img.icon",
      image:  "item/img.png",
    },
    {
      type: "Armor",
      name: "Banded Hauberk",
      description: "An iron chainmail shirt, long sleeved and falling to the thigh, thin plates of iron have been riveted to the chest, shoulder, and arms",
      defense: "60",
      weight: "35",
      special: null,
      icon: "item/img.icon",
      image:  "item/img.png",
    },
  ]
  

  export const Bracers : Bracers[] = [

    {  type: "Bracers",
    name: "Vambraces",
    description: "Hardened leather and riveted with metal, these extend across the entirety of the forearm and wrap around the elbow",
    defense: "10",
    weight: "5",
    special: null,
    icon: "item/img.icon",
    image:  "item/img.png",}
  ]

  export const Boots : Boots[] = [

    {  type: "Boots",
    name: "Worn Boots",
    description: "Made from softened animal hide, these boots have been on many a journey",
    defense: "1",
    weight: "5",
    special: null,
    icon: "item/img.icon",
    image:  "item/img.png",}
  ]

  export const Ring : Ring[] = [

 {
      type: "Ring",
      name: "Silver Ring",
      description: "a hammered silver band",
      special: null,
      icon: "item/img.icon",
      image: "item/img.png",
    }
  ]

  export const Amulet : Amulet[] = [

    {
         type: "Amulet",
         name: "Bone Amulet",
         description: "an Amulet carved from bone, it is covered in runic designs to ward off ill intent for the wearer",
         special: null,
         icon: "item/img.icon",
         image: "item/img.png",
       }
     ]
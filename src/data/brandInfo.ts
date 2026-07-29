export interface HenzoFarmSpecs {
  location: string;
  landSize: string;
  flockCount: number;
  diet: string[];
  priceRange: string;
  targetAudience: string[];
  brandValues: string[];
  toneGuidelines: string[];
}

export const HENZO_FARM_DATA: HenzoFarmSpecs = {
  location: "Pindorian Shareef, Islamabad, Pakistan",
  landSize: "2.5 Kanal (Shaded, natural pasture land)",
  flockCount: 500,
  diet: [
    "Green Fodder (Corn, Bajra, Jowar, Jantar)",
    "Layer Feed Mix",
    "Flaxseed (Omega-3 Boost)",
    "Azolla / Duckweed (High Protein Micro-algae)"
  ],
  priceRange: "PKR 600 - 700 / dozen",
  targetAudience: [
    "Islamabad & Rawalpindi Families",
    "Gym-goers & Fitness Enthusiasts (High Protein)",
    "Specialty Cafes & Fine Dining Restaurants",
    "Health-conscious Moms & Doctors"
  ],
  brandValues: [
    "24/7 Free-range roaming (No cages, no factory stress)",
    "Pasture-raised golden-orange natural yolk",
    "Zero growth hormones, pure natural foraging",
    "Local Islamabad organic delivery"
  ],
  toneGuidelines: [
    "Conversational Roman Urdu ('Yeh dekho', 'Koi nahi batayega')",
    "Short, punchy sentences with natural Pakistani humor",
    "Suspense & Curiosity hooks (Never start with boring farm intro)",
    "Phone-only realistic filmmaking aesthetic"
  ]
};

export const POPULAR_PROMPTS = [
  {
    label: "🔥 Islamabad Cafe Yolk Test",
    category: "Investigation",
    prompt: "A secret test comparing normal commercial egg yolks with Henzo's deep orange pasture yolk at a fancy F-7 Islamabad coffee shop."
  },
  {
    label: "🐔 Chicken Interrogation (Dark Humor)",
    category: "Dark Humor",
    prompt: "Interrogating hen #42 about why she ate all the fresh Azolla duckweed before the morning flock arrived."
  },
  {
    label: "💪 Gym Bro Protein Mythbuster",
    category: "Gym & Health",
    prompt: "An Islamabad gym trainer cracking 3 normal eggs vs 2 Henzo pasture eggs and realizing the nutrient density difference."
  },
  {
    label: "🌾 Azolla Superfood Secrets",
    category: "Mini-Documentary",
    prompt: "Why Pindorian Shareef hens eat green Azolla water-plants and how it turns yolk color to natural golden red."
  },
  {
    label: "🔍 Cage Egg vs Henzo Lab Experiment",
    category: "Myth Busters",
    prompt: "Testing eggshell strength and yolk viscosity using phone camera macro lens in 4k."
  }
];

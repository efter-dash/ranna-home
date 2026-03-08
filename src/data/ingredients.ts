export type Category = "Fish" | "Meat" | "Vegetable" | "Essential";

export interface Ingredient {
  id: string;
  name: string;
  localName: string;
  category: Category;
  imageQuery: string;
  icon: string;
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "Fish", label: "Fish", icon: "set_meal" },
  { id: "Meat", label: "Meat", icon: "kebab_dining" },
  { id: "Vegetable", label: "Vegetables", icon: "eco" },
  { id: "Essential", label: "Essentials", icon: "grain" },
];

export const INGREDIENT_DATA: Ingredient[] = [
  // Fish
  { id: "fish-ilish", name: "Hilsa", localName: "ইলিশ", category: "Fish", imageQuery: "raw hilsa fish market", icon: "set_meal" },
  { id: "fish-rui", name: "Rohu", localName: "রুই", category: "Fish", imageQuery: "raw rohu fish", icon: "set_meal" },
  { id: "fish-katla", name: "Catla", localName: "কাতলা", category: "Fish", imageQuery: "catla fish fresh", icon: "set_meal" },
  { id: "fish-chingri", name: "Prawn", localName: "চিংড়ি", category: "Fish", imageQuery: "fresh raw prawns shrimp", icon: "set_meal" },
  { id: "fish-magur", name: "Catfish", localName: "মাগুর", category: "Fish", imageQuery: "fresh catfish", icon: "set_meal" },
  { id: "fish-pabda", name: "Butterfish", localName: "পাবদা", category: "Fish", imageQuery: "small freshwater fish", icon: "set_meal" },
  { id: "fish-koi", name: "Climbing Perch", localName: "কই", category: "Fish", imageQuery: "climbing perch fish", icon: "set_meal" },
  { id: "fish-shutki", name: "Dried Fish", localName: "শুঁটকি", category: "Fish", imageQuery: "dried fish market bangladesh", icon: "set_meal" },
  { id: "fish-tilapia", name: "Tilapia", localName: "তেলাপিয়া", category: "Fish", imageQuery: "fresh tilapia fish", icon: "set_meal" },
  { id: "fish-rupchanda", name: "Pomfret", localName: "রূপচাঁদা", category: "Fish", imageQuery: "pomfret fish fresh", icon: "set_meal" },

  // Meat
  { id: "meat-chicken", name: "Chicken", localName: "মুরগি", category: "Meat", imageQuery: "raw chicken pieces", icon: "kebab_dining" },
  { id: "meat-beef", name: "Beef", localName: "গরুর মাংস", category: "Meat", imageQuery: "raw beef cuts", icon: "kebab_dining" },
  { id: "meat-mutton", name: "Mutton", localName: "খাসি", category: "Meat", imageQuery: "raw mutton goat meat", icon: "kebab_dining" },
  { id: "meat-duck", name: "Duck", localName: "হাঁস", category: "Meat", imageQuery: "raw duck meat", icon: "kebab_dining" },

  // Vegetable
  { id: "veg-potato", name: "Potato", localName: "আলু", category: "Vegetable", imageQuery: "fresh potatoes", icon: "nutrition" },
  { id: "veg-eggplant", name: "Eggplant", localName: "বেগুন", category: "Vegetable", imageQuery: "fresh eggplant aubergine", icon: "eco" },
  { id: "veg-cauliflower", name: "Cauliflower", localName: "ফুলকপি", category: "Vegetable", imageQuery: "fresh cauliflower", icon: "eco" },
  { id: "veg-cabbage", name: "Cabbage", localName: "বাঁধাকপি", category: "Vegetable", imageQuery: "fresh green cabbage", icon: "eco" },
  { id: "veg-tomato", name: "Tomato", localName: "টমেটো", category: "Vegetable", imageQuery: "fresh red tomatoes", icon: "eco" },
  { id: "veg-lau", name: "Bottle Gourd", localName: "লাউ", category: "Vegetable", imageQuery: "bottle gourd lauki", icon: "eco" },
  { id: "veg-korola", name: "Bitter Gourd", localName: "করলা", category: "Vegetable", imageQuery: "bitter gourd karela", icon: "eco" },
  { id: "veg-potol", name: "Pointed Gourd", localName: "পটল", category: "Vegetable", imageQuery: "pointed gourd parwal", icon: "eco" },
  { id: "veg-okra", name: "Okra", localName: "ঢেঁড়স", category: "Vegetable", imageQuery: "fresh okra ladyfinger", icon: "eco" },
  { id: "veg-spinach", name: "Spinach", localName: "পালং শাক", category: "Vegetable", imageQuery: "fresh spinach leaves", icon: "eco" },
  { id: "veg-lalshak", name: "Red Amaranth", localName: "লাল শাক", category: "Vegetable", imageQuery: "red amaranth leaves", icon: "eco" },
  { id: "veg-papaya", name: "Green Papaya", localName: "পেঁপে", category: "Vegetable", imageQuery: "green raw papaya", icon: "eco" },
  { id: "veg-banana", name: "Green Banana", localName: "কাঁচা কলা", category: "Vegetable", imageQuery: "green raw banana plantain", icon: "eco" },
  { id: "veg-kochu", name: "Taro Root", localName: "মুখি কচু", category: "Vegetable", imageQuery: "taro root vegetable", icon: "eco" },
  { id: "veg-shim", name: "Bean", localName: "শিম", category: "Vegetable", imageQuery: "fresh flat beans hyacinth bean", icon: "eco" },

  // Essential
  { id: "ess-rice", name: "Rice", localName: "চাল", category: "Essential", imageQuery: "raw basmati rice grains", icon: "grain" },
  { id: "ess-lentils", name: "Red Lentils", localName: "মসুর ডাল", category: "Essential", imageQuery: "red lentils masoor dal", icon: "grain" },
  { id: "ess-mustard-oil", name: "Mustard Oil", localName: "সরিষার তেল", category: "Essential", imageQuery: "mustard oil bottle", icon: "water_drop" },
  { id: "ess-onion", name: "Onion", localName: "পেঁয়াজ", category: "Essential", imageQuery: "fresh onions", icon: "eco" },
  { id: "ess-garlic", name: "Garlic", localName: "রসুন", category: "Essential", imageQuery: "fresh garlic cloves", icon: "eco" },
  { id: "ess-ginger", name: "Ginger", localName: "আদা", category: "Essential", imageQuery: "fresh ginger root", icon: "thermostat" },
  { id: "ess-chili", name: "Green Chili", localName: "কাঁচা মরিচ", category: "Essential", imageQuery: "fresh green chili peppers", icon: "local_fire_department" },
  { id: "ess-turmeric", name: "Turmeric", localName: "হলুদ", category: "Essential", imageQuery: "turmeric powder root", icon: "opacity" },
  { id: "ess-cumin", name: "Cumin", localName: "জিরা", category: "Essential", imageQuery: "cumin seeds spice", icon: "spa" },
  { id: "ess-coriander", name: "Coriander Leaves", localName: "ধনিয়া পাতা", category: "Essential", imageQuery: "fresh coriander cilantro leaves", icon: "grass" },
];

// Backward-compatible export
export const ingredients = INGREDIENT_DATA;

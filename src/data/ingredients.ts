export type Category = "Fish" | "Meat" | "Vegetable" | "Essential";

export interface Ingredient {
  id: string;
  name: string;
  localName: string;
  category: Category;
  imageQuery: string;
  icon: string;
  image: string;
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "Fish", label: "Fish", icon: "set_meal" },
  { id: "Meat", label: "Meat", icon: "kebab_dining" },
  { id: "Vegetable", label: "Vegetables", icon: "eco" },
  { id: "Essential", label: "Essentials", icon: "grain" },
];

export const INGREDIENT_DATA: Ingredient[] = [
  // ===== FISH (Popular Bangladeshi fish) =====
  { id: "fish-ilish", name: "Hilsa", localName: "ইলিশ", category: "Fish", imageQuery: "hilsa fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1544943910-a94d6c545528?w=400&h=400&fit=crop" },
  { id: "fish-rui", name: "Rohu", localName: "রুই", category: "Fish", imageQuery: "rohu fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=400&fit=crop" },
  { id: "fish-katla", name: "Catla", localName: "কাতলা", category: "Fish", imageQuery: "catla fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400&h=400&fit=crop" },
  { id: "fish-chingri", name: "Prawn", localName: "চিংড়ি", category: "Fish", imageQuery: "fresh prawns", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop" },
  { id: "fish-pangash", name: "Pangasius", localName: "পাঙ্গাশ", category: "Fish", imageQuery: "pangasius fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=400&h=400&fit=crop" },
  { id: "fish-tilapia", name: "Tilapia", localName: "তেলাপিয়া", category: "Fish", imageQuery: "tilapia fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400&h=400&fit=crop" },
  { id: "fish-magur", name: "Catfish", localName: "মাগুর", category: "Fish", imageQuery: "catfish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop" },
  { id: "fish-shing", name: "Stinging Catfish", localName: "শিং", category: "Fish", imageQuery: "stinging catfish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop" },
  { id: "fish-pabda", name: "Butterfish", localName: "পাবদা", category: "Fish", imageQuery: "butterfish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=400&fit=crop" },
  { id: "fish-koi", name: "Climbing Perch", localName: "কই", category: "Fish", imageQuery: "climbing perch", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1544943910-a94d6c545528?w=400&h=400&fit=crop" },
  { id: "fish-rupchanda", name: "Pomfret", localName: "রূপচাঁদা", category: "Fish", imageQuery: "pomfret fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400&h=400&fit=crop" },
  { id: "fish-bata", name: "Bata Fish", localName: "বাটা", category: "Fish", imageQuery: "bata fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=400&fit=crop" },
  { id: "fish-mrigel", name: "Mrigal Carp", localName: "মৃগেল", category: "Fish", imageQuery: "mrigal carp", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=400&h=400&fit=crop" },
  { id: "fish-boal", name: "Wallago", localName: "বোয়াল", category: "Fish", imageQuery: "wallago fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop" },
  { id: "fish-tengra", name: "Mystus", localName: "টেংরা", category: "Fish", imageQuery: "small river fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=400&fit=crop" },
  { id: "fish-aar", name: "Long-whiskered Catfish", localName: "আইড়", category: "Fish", imageQuery: "river catfish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop" },
  { id: "fish-shutki", name: "Dried Fish", localName: "শুঁটকি", category: "Fish", imageQuery: "dried fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1604481721184-de1e90b2e579?w=400&h=400&fit=crop" },
  { id: "fish-chital", name: "Clown Knifefish", localName: "চিতল", category: "Fish", imageQuery: "knifefish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=400&h=400&fit=crop" },
  { id: "fish-baila", name: "Tank Goby", localName: "বাইলা/বেলে", category: "Fish", imageQuery: "small freshwater fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=400&fit=crop" },
  { id: "fish-shol", name: "Snakehead", localName: "শোল", category: "Fish", imageQuery: "snakehead fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1544943910-a94d6c545528?w=400&h=400&fit=crop" },
  { id: "fish-taki", name: "Spotted Snakehead", localName: "টাকি", category: "Fish", imageQuery: "spotted snakehead", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=400&h=400&fit=crop" },
  { id: "fish-golda-chingri", name: "Giant Prawn", localName: "গলদা চিংড়ি", category: "Fish", imageQuery: "giant freshwater prawn", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop" },
  { id: "fish-bagda-chingri", name: "Tiger Shrimp", localName: "বাগদা চিংড়ি", category: "Fish", imageQuery: "tiger shrimp", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop" },
  { id: "fish-kachki", name: "Small Dried Fish", localName: "কাচকি", category: "Fish", imageQuery: "small silver fish", icon: "set_meal",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=400&fit=crop" },

  // ===== MEAT =====
  { id: "meat-chicken", name: "Chicken", localName: "মুরগি", category: "Meat", imageQuery: "raw chicken", icon: "kebab_dining",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop" },
  { id: "meat-beef", name: "Beef", localName: "গরুর মাংস", category: "Meat", imageQuery: "raw beef", icon: "kebab_dining",
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop" },
  { id: "meat-mutton", name: "Mutton", localName: "খাসি", category: "Meat", imageQuery: "raw mutton", icon: "kebab_dining",
    image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=400&fit=crop" },
  { id: "meat-duck", name: "Duck", localName: "হাঁস", category: "Meat", imageQuery: "raw duck", icon: "kebab_dining",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=400&fit=crop" },

  // ===== VEGETABLES =====
  { id: "veg-potato", name: "Potato", localName: "আলু", category: "Vegetable", imageQuery: "potatoes", icon: "nutrition",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82ade73c?w=400&h=400&fit=crop" },
  { id: "veg-eggplant", name: "Eggplant", localName: "বেগুন", category: "Vegetable", imageQuery: "eggplant", icon: "eco",
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=400&fit=crop" },
  { id: "veg-cauliflower", name: "Cauliflower", localName: "ফুলকপি", category: "Vegetable", imageQuery: "cauliflower", icon: "eco",
    image: "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=400&h=400&fit=crop" },
  { id: "veg-cabbage", name: "Cabbage", localName: "বাঁধাকপি", category: "Vegetable", imageQuery: "cabbage", icon: "eco",
    image: "https://images.unsplash.com/photo-1594282486756-56b0fb4a29a4?w=400&h=400&fit=crop" },
  { id: "veg-tomato", name: "Tomato", localName: "টমেটো", category: "Vegetable", imageQuery: "tomatoes", icon: "eco",
    image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=400&fit=crop" },
  { id: "veg-lau", name: "Bottle Gourd", localName: "লাউ", category: "Vegetable", imageQuery: "bottle gourd", icon: "eco",
    image: "https://images.unsplash.com/photo-1622921491193-345c3708a5cf?w=400&h=400&fit=crop" },
  { id: "veg-korola", name: "Bitter Gourd", localName: "করলা", category: "Vegetable", imageQuery: "bitter gourd", icon: "eco",
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400&h=400&fit=crop" },
  { id: "veg-potol", name: "Pointed Gourd", localName: "পটল", category: "Vegetable", imageQuery: "pointed gourd", icon: "eco",
    image: "https://images.unsplash.com/photo-1622921491193-345c3708a5cf?w=400&h=400&fit=crop" },
  { id: "veg-okra", name: "Okra", localName: "ঢেঁড়স", category: "Vegetable", imageQuery: "okra", icon: "eco",
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&h=400&fit=crop" },
  { id: "veg-spinach", name: "Spinach", localName: "পালং শাক", category: "Vegetable", imageQuery: "spinach leaves", icon: "eco",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop" },
  { id: "veg-lalshak", name: "Red Amaranth", localName: "লাল শাক", category: "Vegetable", imageQuery: "red amaranth", icon: "eco",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop" },
  { id: "veg-papaya", name: "Green Papaya", localName: "পেঁপে", category: "Vegetable", imageQuery: "green papaya", icon: "eco",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=400&fit=crop" },
  { id: "veg-banana", name: "Green Banana", localName: "কাঁচা কলা", category: "Vegetable", imageQuery: "green banana", icon: "eco",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop" },
  { id: "veg-kochu", name: "Taro Root", localName: "মুখি কচু", category: "Vegetable", imageQuery: "taro root", icon: "eco",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop" },
  { id: "veg-shim", name: "Bean", localName: "শিম", category: "Vegetable", imageQuery: "flat beans", icon: "eco",
    image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae10c4a?w=400&h=400&fit=crop" },

  // ===== ESSENTIALS =====
  { id: "ess-rice", name: "Rice", localName: "চাল", category: "Essential", imageQuery: "rice grains", icon: "grain",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop" },
  { id: "ess-lentils", name: "Red Lentils", localName: "মসুর ডাল", category: "Essential", imageQuery: "red lentils", icon: "grain",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop" },
  { id: "ess-mustard-oil", name: "Mustard Oil", localName: "সরিষার তেল", category: "Essential", imageQuery: "mustard oil", icon: "water_drop",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop" },
  { id: "ess-onion", name: "Onion", localName: "পেঁয়াজ", category: "Essential", imageQuery: "onions", icon: "eco",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop" },
  { id: "ess-garlic", name: "Garlic", localName: "রসুন", category: "Essential", imageQuery: "garlic", icon: "eco",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2571?w=400&h=400&fit=crop" },
  { id: "ess-ginger", name: "Ginger", localName: "আদা", category: "Essential", imageQuery: "ginger root", icon: "thermostat",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop" },
  { id: "ess-chili", name: "Green Chili", localName: "কাঁচা মরিচ", category: "Essential", imageQuery: "green chili", icon: "local_fire_department",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=400&fit=crop" },
  { id: "ess-turmeric", name: "Turmeric", localName: "হলুদ", category: "Essential", imageQuery: "turmeric", icon: "opacity",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop" },
  { id: "ess-cumin", name: "Cumin", localName: "জিরা", category: "Essential", imageQuery: "cumin seeds", icon: "spa",
    image: "https://images.unsplash.com/photo-1599909533601-aa23a126c55d?w=400&h=400&fit=crop" },
  { id: "ess-coriander", name: "Coriander Leaves", localName: "ধনিয়া পাতা", category: "Essential", imageQuery: "coriander leaves", icon: "grass",
    image: "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=400&h=400&fit=crop" },
];

// Backward-compatible export
export const ingredients = INGREDIENT_DATA;

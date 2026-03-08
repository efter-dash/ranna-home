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

// AI-generated fish images
import fishIlish from "@/assets/fish-ilish.jpg";
import fishRui from "@/assets/fish-rui.jpg";
import fishKatla from "@/assets/fish-katla.png";
import fishPangash from "@/assets/fish-pangash.png";
import fishMagur from "@/assets/fish-magur.jpg";
import fishShing from "@/assets/fish-shing.jpg";
import fishPabda from "@/assets/fish-pabda.jpg";
import fishKoi from "@/assets/fish-koi.jpg";
import fishRupchanda from "@/assets/fish-rupchanda.jpeg";
import fishBata from "@/assets/fish-bata.jpg";
import fishMrigel from "@/assets/fish-mrigel.jpg";
import fishBoal from "@/assets/fish-boal.png";
import fishTengra from "@/assets/fish-tengra.jpg";
import fishAar from "@/assets/fish-aar.png";
import fishShutki from "@/assets/fish-loitta-shutki.png";
import fishChital from "@/assets/fish-chital.png";
import fishBaila from "@/assets/fish-baila.jpg";
import fishShol from "@/assets/fish-shol.png";
import fishTaki from "@/assets/fish-taki.png";

// Vegetable & Essential images
import vegPotato from "@/assets/veg-potato.jpg";
import vegEggplant from "@/assets/veg-eggplant.jpg";
import vegCabbage from "@/assets/veg-cabbage.jpg";
import vegTomato from "@/assets/veg-tomato.jpg";
import vegLau from "@/assets/veg-lau.jpg";
import vegPotol from "@/assets/veg-potol.jpg";
import vegLalshak from "@/assets/veg-lalshak.jpg";
import vegShim from "@/assets/veg-shim.jpg";
import vegCauliflower from "@/assets/veg-cauliflower.png";
import vegPapaya from "@/assets/veg-papaya.webp";
import vegBanana from "@/assets/veg-banana.jpg";
import essGarlic from "@/assets/ess-garlic.jpg";
import essCumin from "@/assets/ess-cumin.jpg";
import essCoriander from "@/assets/ess-coriander.jpeg";
import essGinger from "@/assets/ess-ginger.jpg";
import essChili from "@/assets/ess-chili.jpeg";
import meatDuck from "@/assets/meat-duck.jpg";
import meatChicken from "@/assets/meat-chicken.jpg";
import fishGoldaChingri from "@/assets/fish-golda-chingri-2.jpg";
import fishTilapia from "@/assets/fish-tilapia.png";
import fishBagdaChingri from "@/assets/fish-bagda-chingri.jpg";
import essMustardOil from "@/assets/ess-mustard-oil.jpeg";
import vegKochu from "@/assets/veg-kochu.jpeg";
import vegGolBegun from "@/assets/veg-gol-begun.png";
import essLentils from "@/assets/ess-lentils.jpg";
import essChiniguraRice from "@/assets/ess-chinigura-rice.jpg";
import essMoongDal from "@/assets/ess-moong-dal.jpg";
import essCholarDal from "@/assets/ess-cholar-dal.jpg";
import essMashkalaiDal from "@/assets/ess-mashkalai-dal.jpg";
import essTurmeric from "@/assets/ess-turmeric.jpg";
import meatQuail from "@/assets/meat-quail.jpeg";
import meatPigeon from "@/assets/meat-pigeon.jpeg";
import essBayLeaf from "@/assets/ess-bay-leaf.jpeg";
import essCardamom from "@/assets/ess-cardamom.jpeg";
import essCinnamon from "@/assets/ess-cinnamon.jpg";
import essCoconut from "@/assets/ess-coconut.png";
import essCorianderPowder from "@/assets/ess-coriander-powder.jpg";
import essDryRedChili from "@/assets/ess-dry-red-chili.jpeg";
import essGaramMasala from "@/assets/ess-garam-masala.jpeg";
import essGhee from "@/assets/ess-ghee.jpeg";
import essJaggery from "@/assets/ess-jaggery.jpg";
import essMustardSeeds from "@/assets/ess-mustard-seeds.jpg";
import essNigella from "@/assets/ess-nigella.png";
import essPoppySeeds from "@/assets/ess-poppy-seeds.jpeg";
import essRedChiliPowder from "@/assets/ess-red-chili-powder.jpg";
import essSoyabeanOil from "@/assets/ess-soyabean-oil.jpg";
import essSugar from "@/assets/ess-sugar.jpg";
import essTurmeric2 from "@/assets/ess-turmeric-2.jpg";
import essMilk from "@/assets/ess-milk.jpg";
import essSourCurd from "@/assets/ess-sour-curd.jpg";
import meatDeshiChicken from "@/assets/meat-deshi-chicken.png";

export const INGREDIENT_DATA: Ingredient[] = [
  // ===== FISH (Popular Bangladeshi fish) =====
  { id: "fish-ilish", name: "Hilsa", localName: "ইলিশ", category: "Fish", imageQuery: "hilsa fish", icon: "set_meal", image: fishIlish },
  { id: "fish-rui", name: "Rohu", localName: "রুই", category: "Fish", imageQuery: "rohu fish", icon: "set_meal", image: fishRui },
  { id: "fish-katla", name: "Catla", localName: "কাতলা", category: "Fish", imageQuery: "catla fish", icon: "set_meal", image: fishKatla },
  { id: "fish-chingri", name: "Prawn", localName: "চিংড়ি", category: "Fish", imageQuery: "fresh prawns", icon: "set_meal", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop" },
  { id: "fish-pangash", name: "Pangasius", localName: "পাঙ্গাশ", category: "Fish", imageQuery: "pangasius fish", icon: "set_meal", image: fishPangash },
  { id: "fish-tilapia", name: "Tilapia", localName: "তেলাপিয়া", category: "Fish", imageQuery: "tilapia fish", icon: "set_meal", image: fishTilapia },
  { id: "fish-magur", name: "Catfish", localName: "মাগুর", category: "Fish", imageQuery: "catfish", icon: "set_meal", image: fishMagur },
  { id: "fish-shing", name: "Stinging Catfish", localName: "শিং", category: "Fish", imageQuery: "stinging catfish", icon: "set_meal", image: fishShing },
  { id: "fish-pabda", name: "Butterfish", localName: "পাবদা", category: "Fish", imageQuery: "butterfish", icon: "set_meal", image: fishPabda },
  { id: "fish-koi", name: "Climbing Perch", localName: "কই", category: "Fish", imageQuery: "climbing perch", icon: "set_meal", image: fishKoi },
  { id: "fish-rupchanda", name: "Pomfret", localName: "রূপচাঁদা", category: "Fish", imageQuery: "pomfret fish", icon: "set_meal", image: fishRupchanda },
  { id: "fish-bata", name: "Bata Fish", localName: "বাটা", category: "Fish", imageQuery: "bata fish", icon: "set_meal", image: fishBata },
  { id: "fish-mrigel", name: "Mrigal Carp", localName: "মৃগেল", category: "Fish", imageQuery: "mrigal carp", icon: "set_meal", image: fishMrigel },
  { id: "fish-boal", name: "Wallago", localName: "বোয়াল", category: "Fish", imageQuery: "wallago fish", icon: "set_meal", image: fishBoal },
  { id: "fish-tengra", name: "Mystus", localName: "টেংরা", category: "Fish", imageQuery: "small river fish", icon: "set_meal", image: fishTengra },
  { id: "fish-aar", name: "Long-whiskered Catfish", localName: "আইড়", category: "Fish", imageQuery: "river catfish", icon: "set_meal", image: fishAar },
  { id: "fish-shutki", name: "Loitta Shutki", localName: "লইট্টা শুঁটকি", category: "Fish", imageQuery: "loitta shutki dried fish", icon: "set_meal", image: fishShutki },
  { id: "fish-chital", name: "Clown Knifefish", localName: "চিতল", category: "Fish", imageQuery: "knifefish", icon: "set_meal", image: fishChital },
  { id: "fish-baila", name: "Tank Goby", localName: "বাইলা/বেলে", category: "Fish", imageQuery: "small freshwater fish", icon: "set_meal", image: fishBaila },
  { id: "fish-shol", name: "Snakehead", localName: "শোল", category: "Fish", imageQuery: "snakehead fish", icon: "set_meal", image: fishShol },
  { id: "fish-taki", name: "Spotted Snakehead", localName: "টাকি", category: "Fish", imageQuery: "spotted snakehead", icon: "set_meal", image: fishTaki },
  { id: "fish-golda-chingri", name: "Giant Prawn", localName: "গলদা চিংড়ি", category: "Fish", imageQuery: "giant freshwater prawn", icon: "set_meal", image: fishGoldaChingri },
  { id: "fish-bagda-chingri", name: "Tiger Shrimp", localName: "বাগদা চিংড়ি", category: "Fish", imageQuery: "tiger shrimp", icon: "set_meal", image: fishBagdaChingri },
  

  // ===== MEAT =====
  { id: "meat-chicken", name: "Chicken", localName: "মুরগি", category: "Meat", imageQuery: "raw chicken", icon: "kebab_dining", image: meatChicken },
  { id: "meat-beef", name: "Beef", localName: "গরুর মাংস", category: "Meat", imageQuery: "raw beef", icon: "kebab_dining", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop" },
  { id: "meat-mutton", name: "Mutton", localName: "খাসি", category: "Meat", imageQuery: "raw mutton", icon: "kebab_dining", image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=400&fit=crop" },
  { id: "meat-duck", name: "Duck", localName: "হাঁস", category: "Meat", imageQuery: "raw duck", icon: "kebab_dining", image: meatDuck },
  { id: "meat-quail", name: "Quail", localName: "কোয়েল", category: "Meat", imageQuery: "raw quail meat", icon: "kebab_dining", image: meatQuail },
  { id: "meat-pigeon", name: "Pigeon", localName: "কবুতর", category: "Meat", imageQuery: "raw pigeon meat", icon: "kebab_dining", image: meatPigeon },
  { id: "meat-deshi-chicken", name: "Deshi Chicken", localName: "দেশি মুরগি", category: "Meat", imageQuery: "free range country chicken", icon: "kebab_dining", image: meatDeshiChicken },

  // ===== VEGETABLES =====
  { id: "veg-potato", name: "Potato", localName: "আলু", category: "Vegetable", imageQuery: "potatoes", icon: "nutrition", image: vegPotato },
  { id: "veg-eggplant", name: "Eggplant", localName: "বেগুন", category: "Vegetable", imageQuery: "eggplant", icon: "eco", image: vegEggplant },
  { id: "veg-gol-begun", name: "Round Eggplant", localName: "গোল বেগুণ", category: "Vegetable", imageQuery: "round eggplant", icon: "eco", image: vegGolBegun },
  { id: "veg-cauliflower", name: "Cauliflower", localName: "ফুলকপি", category: "Vegetable", imageQuery: "cauliflower", icon: "eco", image: vegCauliflower },
  { id: "veg-cabbage", name: "Cabbage", localName: "বাঁধাকপি", category: "Vegetable", imageQuery: "cabbage", icon: "eco", image: vegCabbage },
  { id: "veg-tomato", name: "Tomato", localName: "টমেটো", category: "Vegetable", imageQuery: "tomatoes", icon: "eco", image: vegTomato },
  { id: "veg-lau", name: "Bottle Gourd", localName: "লাউ", category: "Vegetable", imageQuery: "bottle gourd", icon: "eco", image: vegLau },
  { id: "veg-korola", name: "Bitter Gourd", localName: "করলা", category: "Vegetable", imageQuery: "bitter gourd", icon: "eco", image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400&h=400&fit=crop" },
  { id: "veg-potol", name: "Pointed Gourd", localName: "পটল", category: "Vegetable", imageQuery: "pointed gourd", icon: "eco", image: vegPotol },
  { id: "veg-okra", name: "Okra", localName: "ঢেঁড়স", category: "Vegetable", imageQuery: "okra", icon: "eco", image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&h=400&fit=crop" },
  { id: "veg-spinach", name: "Spinach", localName: "পালং শাক", category: "Vegetable", imageQuery: "spinach leaves", icon: "eco", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop" },
  { id: "veg-lalshak", name: "Red Amaranth", localName: "লাল শাক", category: "Vegetable", imageQuery: "red amaranth", icon: "eco", image: vegLalshak },
  { id: "veg-papaya", name: "Green Papaya", localName: "পেঁপে", category: "Vegetable", imageQuery: "green papaya", icon: "eco", image: vegPapaya },
  { id: "veg-banana", name: "Green Banana", localName: "কাঁচা কলা", category: "Vegetable", imageQuery: "green banana", icon: "eco", image: vegBanana },
  { id: "veg-kochu", name: "Taro Root", localName: "মুখি কচু", category: "Vegetable", imageQuery: "taro root", icon: "eco", image: vegKochu },
  { id: "veg-shim", name: "Bean", localName: "শিম", category: "Vegetable", imageQuery: "flat beans", icon: "eco", image: vegShim },

  // ===== ESSENTIALS =====
  { id: "ess-rice", name: "Rice", localName: "চাল", category: "Essential", imageQuery: "rice grains", icon: "grain", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop" },
  { id: "ess-chinigura-rice", name: "Chinigura Rice", localName: "চিনিগুড়া চাল", category: "Essential", imageQuery: "chinigura aromatic rice", icon: "grain", image: essChiniguraRice },
  { id: "ess-lentils", name: "Red Lentils", localName: "মসুর ডাল", category: "Essential", imageQuery: "red lentils", icon: "grain", image: essLentils },
  { id: "ess-moong-dal", name: "Moong Dal", localName: "মুগ ডাল", category: "Essential", imageQuery: "moong dal yellow lentils", icon: "grain", image: essMoongDal },
  { id: "ess-cholar-dal", name: "Cholar Dal", localName: "ছোলার ডাল", category: "Essential", imageQuery: "chana dal bengal gram", icon: "grain", image: essCholarDal },
  { id: "ess-mashkalai-dal", name: "Mashkalai Dal", localName: "মাষকলাই ডাল", category: "Essential", imageQuery: "black gram urad dal", icon: "grain", image: essMashkalaiDal },
  { id: "ess-mustard-oil", name: "Mustard Oil", localName: "সরিষার তেল", category: "Essential", imageQuery: "mustard oil", icon: "water_drop", image: essMustardOil },
  { id: "ess-onion", name: "Onion", localName: "পেঁয়াজ", category: "Essential", imageQuery: "onions", icon: "eco", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop" },
  { id: "ess-garlic", name: "Garlic", localName: "রসুন", category: "Essential", imageQuery: "garlic", icon: "eco", image: essGarlic },
  { id: "ess-ginger", name: "Ginger", localName: "আদা", category: "Essential", imageQuery: "ginger root", icon: "thermostat", image: essGinger },
  { id: "ess-chili", name: "Green Chili", localName: "কাঁচা মরিচ", category: "Essential", imageQuery: "green chili", icon: "local_fire_department", image: essChili },
  { id: "ess-turmeric", name: "Turmeric", localName: "হলুদ", category: "Essential", imageQuery: "turmeric", icon: "opacity", image: essTurmeric2 },
  { id: "ess-cumin", name: "Cumin", localName: "জিরা", category: "Essential", imageQuery: "cumin seeds", icon: "spa", image: essCumin },
  { id: "ess-coriander", name: "Coriander Leaves", localName: "ধনিয়া পাতা", category: "Essential", imageQuery: "coriander leaves", icon: "grass", image: essCoriander },
  { id: "ess-panch-phoron", name: "Panch Phoron", localName: "পাঁচফোড়ন", category: "Essential", imageQuery: "panch phoron spice", icon: "spa", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop" },
  { id: "ess-nigella", name: "Nigella Seeds", localName: "কালো জিরা", category: "Essential", imageQuery: "nigella seeds", icon: "spa", image: essNigella },
  { id: "ess-dry-red-chili", name: "Dry Red Chili", localName: "শুকনো মরিচ", category: "Essential", imageQuery: "dried red chili", icon: "local_fire_department", image: essDryRedChili },
  { id: "ess-bay-leaf", name: "Bay Leaf", localName: "তেজপাতা", category: "Essential", imageQuery: "bay leaves", icon: "eco", image: essBayLeaf },
  { id: "ess-cardamom", name: "Cardamom", localName: "এলাচ", category: "Essential", imageQuery: "cardamom pods", icon: "spa", image: essCardamom },
  { id: "ess-cinnamon", name: "Cinnamon", localName: "দারুচিনি", category: "Essential", imageQuery: "cinnamon sticks", icon: "spa", image: essCinnamon },
  { id: "ess-red-chili-powder", name: "Red Chili Powder", localName: "লাল মরিচ গুঁড়া", category: "Essential", imageQuery: "red chili powder", icon: "local_fire_department", image: essRedChiliPowder },
  { id: "ess-coriander-powder", name: "Coriander Powder", localName: "ধনিয়া গুঁড়া", category: "Essential", imageQuery: "coriander powder", icon: "spa", image: essCorianderPowder },
  { id: "ess-garam-masala", name: "Garam Masala", localName: "গরম মশলা", category: "Essential", imageQuery: "garam masala powder", icon: "spa", image: essGaramMasala },
  { id: "ess-ghee", name: "Ghee", localName: "ঘি", category: "Essential", imageQuery: "ghee clarified butter", icon: "water_drop", image: essGhee },
  { id: "ess-poppy-seeds", name: "Poppy Seeds", localName: "পোস্ত", category: "Essential", imageQuery: "poppy seeds", icon: "spa", image: essPoppySeeds },
  { id: "ess-mustard-seeds", name: "Mustard Seeds", localName: "সরিষা", category: "Essential", imageQuery: "mustard seeds", icon: "spa", image: essMustardSeeds },
  { id: "ess-coconut", name: "Coconut", localName: "নারিকেল", category: "Essential", imageQuery: "coconut", icon: "eco", image: essCoconut },
  { id: "ess-sugar", name: "Sugar", localName: "চিনি", category: "Essential", imageQuery: "sugar", icon: "grain", image: essSugar },
  { id: "ess-jaggery", name: "Jaggery", localName: "গুড়", category: "Essential", imageQuery: "jaggery", icon: "grain", image: essJaggery },
  { id: "ess-soyabean-oil", name: "Soyabean Oil", localName: "সয়াবিন তেল", category: "Essential", imageQuery: "soybean oil", icon: "water_drop", image: essSoyabeanOil },
  { id: "ess-butter", name: "Butter", localName: "মাখন", category: "Essential", imageQuery: "butter", icon: "water_drop", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop" },
  { id: "ess-milk", name: "Milk", localName: "দুধ", category: "Essential", imageQuery: "milk", icon: "water_drop", image: essMilk },
  { id: "ess-sour-curd", name: "Sour Curd", localName: "টক দই", category: "Essential", imageQuery: "sour curd yogurt", icon: "grain", image: essSourCurd },
];

// Backward-compatible export
export const ingredients = INGREDIENT_DATA;

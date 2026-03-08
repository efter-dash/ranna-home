export type Category = "fish" | "meat" | "vegetables" | "essentials";

export interface Ingredient {
  id: string;
  name: string;
  nameBn: string;
  category: Category;
  image: string;
  icon: string;
}

export const categories: { id: Category; label: string; labelBn: string; icon: string }[] = [
  { id: "fish", label: "Fish", labelBn: "মাছ", icon: "set_meal" },
  { id: "meat", label: "Meat", labelBn: "মাংস", icon: "kebab_dining" },
  { id: "vegetables", label: "Vegetables", labelBn: "সবজি", icon: "eco" },
  { id: "essentials", label: "Essentials", labelBn: "মশলা", icon: "grain" },
];

export const ingredients: Ingredient[] = [
  // Fish
  { id: "ilish", name: "Hilsa", nameBn: "ইলিশ", category: "fish", image: "https://images.unsplash.com/photo-1544943910-a94d6c545528?w=300&h=300&fit=crop", icon: "set_meal" },
  { id: "rui", name: "Rohu", nameBn: "রুই", category: "fish", image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=300&h=300&fit=crop", icon: "set_meal" },
  { id: "chingri", name: "Shrimp", nameBn: "চিংড়ি", category: "fish", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&h=300&fit=crop", icon: "set_meal" },

  // Meat
  { id: "chicken", name: "Chicken", nameBn: "মুরগি", category: "meat", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop", icon: "kebab_dining" },
  { id: "beef", name: "Beef", nameBn: "গরু", category: "meat", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=300&h=300&fit=crop", icon: "kebab_dining" },
  { id: "mutton", name: "Mutton", nameBn: "খাসি", category: "meat", image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=300&h=300&fit=crop", icon: "kebab_dining" },

  // Vegetables
  { id: "potato", name: "Potato", nameBn: "আলু", category: "vegetables", image: "https://images.unsplash.com/photo-1518977676601-b53f82ber73d?w=300&h=300&fit=crop", icon: "nutrition" },
  { id: "brinjal", name: "Eggplant", nameBn: "বেগুন", category: "vegetables", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=300&h=300&fit=crop", icon: "eco" },
  { id: "cauliflower", name: "Cauliflower", nameBn: "ফুলকপি", category: "vegetables", image: "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=300&h=300&fit=crop", icon: "eco" },

  // Essentials
  { id: "rice", name: "Rice", nameBn: "ভাত", category: "essentials", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop", icon: "grain" },
  { id: "lentils", name: "Lentils", nameBn: "ডাল", category: "essentials", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop", icon: "grain" },
  { id: "mustard-oil", name: "Mustard Oil", nameBn: "সরিষার তেল", category: "essentials", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", icon: "water_drop" },
  { id: "chili", name: "Green Chili", nameBn: "কাঁচা মরিচ", category: "essentials", image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=300&h=300&fit=crop", icon: "local_fire_department" },
  { id: "turmeric", name: "Turmeric", nameBn: "হলুদ", category: "essentials", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=300&h=300&fit=crop", icon: "opacity" },
  { id: "cumin", name: "Cumin", nameBn: "জিরা", category: "essentials", image: "https://images.unsplash.com/photo-1599909533601-aa23a126c55d?w=300&h=300&fit=crop", icon: "spa" },
];

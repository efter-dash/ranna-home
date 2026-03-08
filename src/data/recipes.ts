export interface Recipe {
  title: string;
  titleBn: string;
  image: string;
  prepTime: string;
  serves: string;
  difficulty: string;
  usedIngredients: string[];
  missingEssentials: string[];
  steps: string[];
}

export function generateMockRecipe(selectedIds: string[]): Recipe {
  const hasIlish = selectedIds.includes("ilish");
  const hasRui = selectedIds.includes("rui");
  const hasChingri = selectedIds.includes("chingri");
  const hasChicken = selectedIds.includes("chicken");
  const hasBeef = selectedIds.includes("beef");
  const hasMutton = selectedIds.includes("mutton");
  const hasPotato = selectedIds.includes("potato");
  const hasBrinjal = selectedIds.includes("brinjal");
  const hasCauliflower = selectedIds.includes("cauliflower");
  const hasLentils = selectedIds.includes("lentils");

  if (hasIlish) {
    return {
      title: "Ilish Machher Bhapa",
      titleBn: "ইলিশ মাছের ভাপা",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd4JAB9tE-4wwL0ow5ihNY0U16yW_z-z7Bczmc3cisKNp2RM7QV_5dGO6JbjFbkCfyzjjY12Be2plDxxWZWamiDDjfMYwsnAxo3Yfp6YpgfjqjElk57M0Xl1eVzQrYieBacGSLbF7jyaoCJny4e7_RW8PoNMlJfNuRoQMyfHTJaQ3daaVDzN4wBMgoYDoufUBOaP4tym8S6mPQF2ovxIDf3_SonpL0CuIiNoIYlMN6flKLuFfzHyyD_sgMFo0gktueXn_ux3cENKxu",
      prepTime: "40 mins",
      serves: "4 People",
      difficulty: "Medium",
      usedIngredients: selectedIds,
      missingEssentials: !selectedIds.includes("mustard-oil") ? ["Mustard Oil", "Mustard Paste"] : ["Mustard Paste"],
      steps: [
        "Clean the **Hilsa fish** pieces and marinate with turmeric, chili powder, and salt for 10 minutes.",
        "Make a paste of **mustard seeds** soaked in water. Mix with mustard oil, green chilies, and a pinch of turmeric.",
        "Coat each fish piece generously with the mustard paste mixture.",
        "Place the marinated fish in a steel container or banana leaf. Add a drizzle of **mustard oil** on top.",
        "Steam the fish in a covered pot for 20-25 minutes until cooked through. Serve hot with steamed **rice**.",
      ],
    };
  }

  if (hasRui && hasBrinjal) {
    return {
      title: "Spicy Rohu Fish Curry with Eggplant",
      titleBn: "রুই মাছের ঝোল",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd4JAB9tE-4wwL0ow5ihNY0U16yW_z-z7Bczmc3cisKNp2RM7QV_5dGO6JbjFbkCfyzjjY12Be2plDxxWZWamiDDjfMYwsnAxo3Yfp6YpgfjqjElk57M0Xl1eVzQrYieBacGSLbF7jyaoCJny4e7_RW8PoNMlJfNuRoQMyfHTJaQ3daaVDzN4wBMgoYDoufUBOaP4tym8S6mPQF2ovxIDf3_SonpL0CuIiNoIYlMN6flKLuFfzHyyD_sgMFo0gktueXn_ux3cENKxu",
      prepTime: "45 mins",
      serves: "3 People",
      difficulty: "Medium",
      usedIngredients: selectedIds,
      missingEssentials: !selectedIds.includes("chili") ? ["Salt", "Green Chilies"] : ["Salt"],
      steps: [
        "Marinate the cleaned **Rohu fish** pieces with turmeric powder, chili powder, and a pinch of salt. Let it rest for 15 minutes.",
        "Heat **mustard oil** in a pan until it reaches smoking point. Fry the marinated fish pieces until golden brown on both sides. Remove and set aside.",
        "In the same oil, sauté the sliced **eggplant** with a little turmeric until softened. Drain and keep with the fish.",
        "Add nigella seeds to the remaining oil. Stir in ginger paste, **cumin** powder, and chili powder diluted in water. Cook until the oil separates.",
        "Pour in 2 cups of warm water. Once it boils, add the fish and eggplant. Cover and simmer for 10 minutes. Garnish with fresh **coriander** and slit green chilies.",
      ],
    };
  }

  if (hasChicken) {
    return {
      title: "Deshi Chicken Curry with Potatoes",
      titleBn: "দেশি মুরগির তরকারি",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&h=500&fit=crop",
      prepTime: "60 mins",
      serves: "4 People",
      difficulty: "Easy",
      usedIngredients: selectedIds,
      missingEssentials: !selectedIds.includes("potato") ? ["Potato", "Onion", "Garlic"] : ["Onion", "Garlic"],
      steps: [
        "Cut **chicken** into medium pieces. Marinate with turmeric, chili powder, ginger-garlic paste, and salt for 30 minutes.",
        "Heat oil in a heavy-bottomed pan. Add whole spices — bay leaf, cardamom, cinnamon, and cloves.",
        "Fry sliced onions until deep golden brown. Add the marinated chicken and cook on high heat for 5 minutes.",
        "Add diced **potatoes**, tomato paste, and yogurt. Mix well and cook for another 5 minutes.",
        "Add warm water to cover the curry. Simmer on low heat for 25-30 minutes until chicken is tender. Garnish with **coriander** leaves.",
      ],
    };
  }

  if (hasBeef) {
    return {
      title: "Traditional Beef Bhuna",
      titleBn: "গরুর মাংস ভুনা",
      image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=800&h=500&fit=crop",
      prepTime: "90 mins",
      serves: "5 People",
      difficulty: "Hard",
      usedIngredients: selectedIds,
      missingEssentials: ["Onion", "Garlic", "Ginger"],
      steps: [
        "Cut **beef** into cubes. Marinate with yogurt, turmeric, chili, and all ground spices for 1 hour.",
        "Heat **mustard oil** and fry sliced onions until crispy and dark brown.",
        "Add ginger-garlic paste and cook until raw smell disappears.",
        "Add marinated beef. Cook on high heat, stirring frequently, for 15 minutes until oil separates.",
        "Add a little water, cover, and slow-cook for 45-60 minutes until beef is fall-apart tender. Finish with fresh green chilies.",
      ],
    };
  }

  if (hasLentils) {
    return {
      title: "Bengali Masoor Dal",
      titleBn: "মসুর ডাল",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=500&fit=crop",
      prepTime: "25 mins",
      serves: "3 People",
      difficulty: "Easy",
      usedIngredients: selectedIds,
      missingEssentials: ["Onion", "Garlic"],
      steps: [
        "Wash **red lentils** thoroughly and boil with turmeric and salt until soft and mushy.",
        "Heat **mustard oil** in a pan. Add cumin seeds and let them splutter.",
        "Add sliced onions, green chilies, and dried red chilies. Fry until onions are golden.",
        "Pour the tempering over the boiled dal. Mix well and simmer for 5 minutes.",
        "Garnish with fresh **coriander** leaves. Serve hot with steamed **rice**.",
      ],
    };
  }

  // Default fallback
  return {
    title: "Mixed Vegetable Torkari",
    titleBn: "মিক্স সবজির তরকারি",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=500&fit=crop",
    prepTime: "30 mins",
    serves: "3 People",
    difficulty: "Easy",
    usedIngredients: selectedIds,
    missingEssentials: ["Onion", "Garlic"],
    steps: [
      "Wash and cut all selected **vegetables** into bite-sized pieces.",
      "Heat **oil** in a pan. Add panch phoron (five-spice mix) and let it splutter.",
      "Add the harder vegetables first (potatoes, cauliflower) and sauté for 5 minutes.",
      "Add softer vegetables, **turmeric**, chili powder, and salt. Mix well and add half a cup of water.",
      "Cover and cook on medium heat for 15-20 minutes until vegetables are tender. Finish with a drizzle of mustard oil.",
    ],
  };
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients } = await req.json();

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return new Response(
        JSON.stringify({ error: "No ingredients provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const hasFish = ingredients.some((i: any) => i.category === "Fish");
    const hasMeat = ingredients.some((i: any) => i.category === "Meat");

    const ingredientList = ingredients
      .map((i: { name: string; localName: string }) => `${i.localName} (${i.name})`)
      .join(", ");

    const systemPrompt = `তুমি একজন বাংলাদেশী রান্নার বিশেষজ্ঞ। তুমি সিদ্দিকা কবীরের "রান্না খাদ্য পুষ্টি" বইয়ের স্টাইলে রেসিপি লেখো। 

তোমার রেসিপি অবশ্যই বাংলায় লিখতে হবে। প্রতিটি রেসিপিতে থাকবে:
- রেসিপির নাম (বাংলায়)
- রেসিপির ইংরেজি নাম
- রান্নার সময়
- কত জনের জন্য
- কঠিনতার মাত্রা (সহজ/মাঝারি/কঠিন)
- উপকরণের তালিকা (পরিমাণসহ বাংলায়)
- ধাপে ধাপে রান্নার প্রণালী (বাংলায়, বিস্তারিত)
- যেসব প্রয়োজনীয় উপকরণ ব্যবহারকারী নির্বাচন করেননি (যেমন লবণ, তেল, মসলা)

তুমি অবশ্যই JSON ফরম্যাটে উত্তর দেবে। অন্য কিছু লিখবে না।`;

    let recipeCount = 1;
    let userPrompt = "";

    if (hasFish && hasMeat) {
      // Both meat and fish: generate 2-3 recipes covering both proteins
      const fishIngredients = ingredients
        .filter((i: any) => i.category !== "Meat")
        .map((i: { name: string; localName: string }) => `${i.localName} (${i.name})`)
        .join(", ");
      const meatIngredients = ingredients
        .filter((i: any) => i.category !== "Fish")
        .map((i: { name: string; localName: string }) => `${i.localName} (${i.name})`)
        .join(", ");

      recipeCount = 3;
      userPrompt = `ব্যবহারকারী মাছ ও মাংস দুটোই নির্বাচন করেছে। ৩টি আলাদা রেসিপি তৈরি করো:

১. মাছের রেসিপি - এই উপকরণ দিয়ে: ${fishIngredients}
২. মাংসের রেসিপি - এই উপকরণ দিয়ে: ${meatIngredients}
৩. আরেকটি ভিন্ন স্বাদের রেসিপি (মাছ বা মাংস যেকোনো একটি দিয়ে) - সব উপকরণ: ${ingredientList}

প্রতিটি রেসিপি যেন আলাদা স্বাদ ও রান্নার পদ্ধতির হয়।`;
    } else if (ingredients.length >= 2) {
      // 2+ items selected, generate 2-3 varied recipes
      recipeCount = ingredients.length >= 4 ? 3 : 2;
      userPrompt = `এই উপকরণগুলো দিয়ে ${recipeCount}টি ভিন্ন ভিন্ন সুস্বাদু বাংলাদেশী রেসিপি তৈরি করো: ${ingredientList}

প্রতিটি রেসিপি যেন আলাদা স্বাদ ও রান্নার পদ্ধতির হয়। একই ধরনের রেসিপি দুইবার দিও না।`;
    } else {
      // Single item
      recipeCount = 1;
      userPrompt = `এই উপকরণ দিয়ে একটি সুস্বাদু বাংলাদেশী রেসিপি তৈরি করো: ${ingredientList}`;
    }

    const jsonFormat = recipeCount === 1
      ? `JSON ফরম্যাট:
{
  "title": "English recipe name",
  "titleBn": "বাংলায় রেসিপির নাম",
  "prepTime": "৩০ মিনিট",
  "serves": "৪ জন",
  "difficulty": "সহজ/মাঝারি/কঠিন",
  "ingredientsList": ["১ কেজি ইলিশ মাছ", ...],
  "missingEssentials": ["লবণ", ...],
  "substitutes": [{"original": "সর্ষে বাটা", "substitute": "সরিষার তেল + ১ চা চামচ গুঁড়া সরিষা", "compatibility": 80, "explanation": "প্রায় একই স্বাদ পাবেন, সহজলভ্য বিকল্প"}, ...],
  "steps": ["বাংলায় ধাপ ১...", ...],
  "stepTitles": ["মাছ প্রস্তুত করা", "মসলা বাটা", ...],
  "stepTimers": [300, 120, 600, ...],
  "stepTips": ["বাংলায় টিপস ১...", ...]
}
গুরুত্বপূর্ণ: "stepTitles" হলো প্রতিটি ধাপের জন্য একটি সংক্ষিপ্ত কিন্তু অর্থবোধক শিরোনাম (বাংলায়, ২-৪ শব্দ)। এটি যেন একটি সম্পূর্ণ ও বোধগম্য বাক্যাংশ হয়, যেমন "মাছ প্রস্তুত করা", "মসলা ভাজা", "ঝোল রান্না করা" ইত্যাদি। অসম্পূর্ণ বাক্য দিও না। "stepTimers" হলো প্রতিটি ধাপের জন্য সেকেন্ডে আনুমানিক সময়। "stepTips" হলো প্রতিটি ধাপের জন্য একটি সংক্ষিপ্ত রান্নার টিপস বা পরামর্শ (বাংলায়)। steps, stepTitles, stepTimers এবং stepTips এর length সমান হতে হবে। রান্নার ধাপ অনুযায়ী বাস্তবসম্মত সময় দাও (যেমন: কাটাকুটি ১২০ সেকেন্ড, ভাজা ৩০০ সেকেন্ড, সিদ্ধ ৬০০ সেকেন্ড ইত্যাদি)। টিপসগুলো যেন সেই ধাপের জন্য প্রাসঙ্গিক ও কাজে লাগে এমন হয়। "substitutes" হলো missingEssentials এর প্রতিটি উপকরণের জন্য একটি বিকল্প সাজেশন। শুধুমাত্র বাংলাদেশী ঘরে সহজলভ্য বিকল্প দাও (যেমন: সর্ষে বাটার বদলে সরিষার তেল, ঘি এর বদলে তেল, দই এর বদলে লেবুর রস ইত্যাদি)। compatibility হলো ০-১০০ এর মধ্যে স্বাদের কাছাকাছি থাকার শতাংশ। explanation হলো এক বাক্যে কেন এই বিকল্প কাজ করবে তার ব্যাখ্যা (বাংলায়)। missingEssentials এ থাকা প্রতিটি আইটেমের জন্য substitutes এ একটি entry থাকতে হবে।`
      : `JSON ফরম্যাট (অবশ্যই একটি array হবে, ${recipeCount}টি রেসিপি):
[
  {
    "title": "English recipe name",
    "titleBn": "বাংলায় রেসিপির নাম",
    "prepTime": "৩০ মিনিট",
    "serves": "৪ জন",
    "difficulty": "সহজ/মাঝারি/কঠিন",
    "ingredientsList": ["১ কেজি ইলিশ মাছ", ...],
    "missingEssentials": ["লবণ", ...],
    "steps": ["বাংলায় ধাপ ১...", ...],
    "stepTitles": ["মাছ প্রস্তুত করা", "মসলা বাটা", ...],
    "stepTimers": [300, 120, 600, ...],
    "stepTips": ["বাংলায় টিপস ১...", ...]
  },
  ...
]
গুরুত্বপূর্ণ: "stepTitles" হলো প্রতিটি ধাপের জন্য একটি সংক্ষিপ্ত কিন্তু অর্থবোধক শিরোনাম (বাংলায়, ২-৪ শব্দ)। এটি যেন একটি সম্পূর্ণ ও বোধগম্য বাক্যাংশ হয়, যেমন "মাছ প্রস্তুত করা", "মসলা ভাজা", "ঝোল রান্না করা" ইত্যাদি। অসম্পূর্ণ বাক্য দিও না। "stepTimers" হলো প্রতিটি ধাপের জন্য সেকেন্ডে আনুমানিক সময়। "stepTips" হলো প্রতিটি ধাপের জন্য একটি সংক্ষিপ্ত রান্নার টিপস বা পরামর্শ (বাংলায়)। steps, stepTitles, stepTimers এবং stepTips এর length সমান হতে হবে। রান্নার ধাপ অনুযায়ী বাস্তবসম্মত সময় দাও (যেমন: কাটাকুটি ১২০ সেকেন্ড, ভাজা ৩০০ সেকেন্ড, সিদ্ধ ৬০০ সেকেন্ড ইত্যাদি)। টিপসগুলো যেন সেই ধাপের জন্য প্রাসঙ্গিক ও কাজে লাগে এমন হয়।`;

    const fullPrompt = `${userPrompt}\n\n${jsonFormat}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: fullPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      return handleAIError(response);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content in AI response");

    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1].trim();

    const parsed = JSON.parse(jsonStr);
    const recipesArray = Array.isArray(parsed) ? parsed : [parsed];

    return new Response(
      JSON.stringify({ recipes: recipesArray, multiple: recipesArray.length > 1 }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-recipe error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function handleAIError(response: Response) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
  if (response.status === 429) {
    return new Response(
      JSON.stringify({ error: "Rate limited. Please try again in a moment." }),
      { status: 429, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
  if (response.status === 402) {
    return new Response(
      JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
      { status: 402, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
  const errText = await response.text();
  console.error("AI gateway error:", response.status, errText);
  throw new Error("AI gateway error");
}

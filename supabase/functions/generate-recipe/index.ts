import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Set the ALLOWED_ORIGINS secret (comma-separated, e.g. "https://myapp.lovable.app,http://localhost:8080")
// in Supabase to lock CORS to your real origins. Falls back to "*" until configured.
const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const VALID_CATEGORIES = new Set(["Fish", "Meat", "Vegetable", "Essential"]);
const MAX_INGREDIENTS = 25;
const MAX_NAME_LENGTH = 60;

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowOrigin =
    ALLOWED_ORIGINS.length === 0
      ? "*"
      : ALLOWED_ORIGINS.includes(origin)
        ? origin
        : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    Vary: "Origin",
  };
}

interface IngredientInput {
  name: string;
  localName: string;
  category: string;
}

// Strip newlines/control characters so values can't break out of the prompt structure
function sanitize(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\r\n\t]/g, " ").trim();
  if (cleaned.length === 0 || cleaned.length > MAX_NAME_LENGTH) return null;
  return cleaned;
}

function validateIngredients(body: unknown): IngredientInput[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as Record<string, unknown>).ingredients;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_INGREDIENTS) return null;

  const result: IngredientInput[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) return null;
    const record = item as Record<string, unknown>;
    const name = sanitize(record.name);
    const localName = sanitize(record.localName);
    const category = record.category;
    if (!name || !localName || typeof category !== "string" || !VALID_CATEGORIES.has(category)) {
      return null;
    }
    result.push({ name, localName, category });
  }
  return result;
}

serve(async (req) => {
  const cors = corsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  const json = (payload: unknown, status = 200) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const ingredients = validateIngredients(body);
    if (!ingredients) {
      return json({ error: "Invalid ingredients payload" }, 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return json({ error: "Service temporarily unavailable" }, 500);
    }

    const hasFish = ingredients.some((i) => i.category === "Fish");
    const hasMeat = ingredients.some((i) => i.category === "Meat");

    const ingredientList = ingredients
      .map((i) => `${i.localName} (${i.name})`)
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
        .filter((i) => i.category !== "Meat")
        .map((i) => `${i.localName} (${i.name})`)
        .join(", ");
      const meatIngredients = ingredients
        .filter((i) => i.category !== "Fish")
        .map((i) => `${i.localName} (${i.name})`)
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
    "substitutes": [{"original": "সর্ষে বাটা", "substitute": "সরিষার তেল + ১ চা চামচ গুঁড়া সরিষা", "compatibility": 80, "explanation": "প্রায় একই স্বাদ পাবেন, সহজলভ্য বিকল্প"}, ...],
    "steps": ["বাংলায় ধাপ ১...", ...],
    "stepTitles": ["মাছ প্রস্তুত করা", "মসলা বাটা", ...],
    "stepTimers": [300, 120, 600, ...],
    "stepTips": ["বাংলায় টিপস ১...", ...]
  },
  ...
]
গুরুত্বপূর্ণ: "stepTitles" হলো প্রতিটি ধাপের জন্য একটি সংক্ষিপ্ত কিন্তু অর্থবোধক শিরোনাম (বাংলায়, ২-৪ শব্দ)। এটি যেন একটি সম্পূর্ণ ও বোধগম্য বাক্যাংশ হয়, যেমন "মাছ প্রস্তুত করা", "মসলা ভাজা", "ঝোল রান্না করা" ইত্যাদি। অসম্পূর্ণ বাক্য দিও না। "stepTimers" হলো প্রতিটি ধাপের জন্য সেকেন্ডে আনুমানিক সময়। "stepTips" হলো প্রতিটি ধাপের জন্য একটি সংক্ষিপ্ত রান্নার টিপস বা পরামর্শ (বাংলায়)। steps, stepTitles, stepTimers এবং stepTips এর length সমান হতে হবে। রান্নার ধাপ অনুযায়ী বাস্তবসম্মত সময় দাও। "substitutes" হলো missingEssentials এর প্রতিটি উপকরণের জন্য একটি বিকল্প সাজেশন। শুধুমাত্র বাংলাদেশী ঘরে সহজলভ্য বিকল্প দাও। compatibility হলো ০-১০০ এর মধ্যে স্বাদের কাছাকাছি থাকার শতাংশ। explanation হলো এক বাক্যে কেন এই বিকল্প কাজ করবে তার ব্যাখ্যা (বাংলায়)। missingEssentials এ থাকা প্রতিটি আইটেমের জন্য substitutes এ একটি entry থাকতে হবে।`;

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

    if (response.status === 429) {
      return json({ error: "Rate limited. Please try again in a moment." }, 429);
    }
    if (response.status === 402) {
      return json({ error: "AI credits exhausted. Please add credits." }, 402);
    }
    if (!response.ok) {
      console.error("AI gateway error:", response.status, await response.text());
      return json({ error: "Recipe generation failed. Please try again." }, 502);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content in AI response");

    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1].trim();

    const parsed = JSON.parse(jsonStr);
    const recipesArray = Array.isArray(parsed) ? parsed : [parsed];

    return json({ recipes: recipesArray, multiple: recipesArray.length > 1 });
  } catch (e) {
    // Full detail stays server-side; clients get a generic message
    console.error("generate-recipe error:", e);
    return json({ error: "Recipe generation failed. Please try again." }, 500);
  }
});

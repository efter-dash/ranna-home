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

    const userPrompt = `এই উপকরণগুলো দিয়ে একটি সুস্বাদু বাংলাদেশী রেসিপি তৈরি করো: ${ingredientList}

JSON ফরম্যাট:
{
  "title": "English recipe name",
  "titleBn": "বাংলায় রেসিপির নাম",
  "prepTime": "৩০ মিনিট",
  "serves": "৪ জন",
  "difficulty": "সহজ/মাঝারি/কঠিন",
  "ingredientsList": ["১ কেজি ইলিশ মাছ", "২ টেবিল চামচ সরিষার তেল", ...],
  "missingEssentials": ["লবণ", "সরিষার তেল", ...],
  "steps": ["বাংলায় ধাপ ১...", "বাংলায় ধাপ ২...", ...]
}`;

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
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const recipe = JSON.parse(jsonStr);

    return new Response(JSON.stringify(recipe), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-recipe error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

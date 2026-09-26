import { GoogleGenAI } from '@google/genai';
import { MenuItem } from '../data/menu';

// Initialize Google Gen AI SDK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function explainDish(item: MenuItem, userQuestion?: string): Promise<string> {
  // 1. Try Chrome Built-in Prompt API (Gemini Nano) if available locally in browser
  if (typeof window !== 'undefined' && (window as any).ai?.languageModel) {
    try {
      const session = await (window as any).ai.languageModel.create({
        systemPrompt: "You are an expert cafe sommelier at a Google Builder Pop-up cafe. Explain menu dishes concisely, highlighting flavor, texture, and why someone should try it."
      });
      const prompt = `Dish: ${item.name} (${item.category}). Ingredients: ${item.ingredients.join(', ')}. Question: ${userQuestion || 'Explain what this tastes like and who would enjoy it.'}`;
      const result = await session.prompt(prompt);
      return result;
    } catch (e) {
      console.warn("Gemini Nano fallback to Cloud API:", e);
    }
  }

  // 2. Fallback to Cloud Gemini 3.8 Flash
  if (!ai) {
    return `☕ **${item.name}**: ${item.description}\n\n• **Flavor Profile**: Sweetness (${item.tasteProfile.sweetness}/5), Bitterness (${item.tasteProfile.bitterness}/5), Spice (${item.tasteProfile.spice}/5).\n• **Ingredients**: ${item.ingredients.join(', ')}.\n• **Best Paired With**: ${item.suggestedPairing || 'A fresh brew'}.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are an expert cafe sommelier at a Google Builder Pop-up cafe event in Bangalore. 
Dish: ${item.name} (${item.category}, ${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'})
Ingredients: ${item.ingredients.join(', ')}
Tagline: ${item.tagline}
Taste profile: Sweetness ${item.tasteProfile.sweetness}/5, Bitterness ${item.tasteProfile.bitterness}/5, Spice ${item.tasteProfile.spice}/5, Richness ${item.tasteProfile.richness}/5.
User query: ${userQuestion || 'Explain what makes this dish special, how it is made, and what it tastes like for a first-time customer.'}

Keep your answer concise (3-4 bullet points max), engaging, and helpful for deciding what to order.`,
    });
    return response.text || item.description;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return item.description;
  }
}

export async function generateIcebreaker(userA: any, userB: any): Promise<string> {
  if (!ai) {
    return `Hey ${userB.name}! Saw you're working on ${userB.project}. Would love to grab a coffee and chat about ${userB.skills?.[0] || 'tech'}!`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Generate a fun, natural, 1-line in-person icebreaker conversation starter for two developers at a Google Cloud Builder Pop-Up cafe.
Person A: ${userA.name} (Working on: ${userA.project}, Skills: ${userA.skills?.join(', ')})
Person B: ${userB.name} (Working on: ${userB.project}, Skills: ${userB.skills?.join(', ')}, Open to: ${userB.intent})
Give ONLY the 1-2 sentence spoken opener. Keep it casual and friendly.`,
    });
    return response.text || `Hey ${userB.name}, love what you're building with ${userB.project}!`;
  } catch (err) {
    return `Hey ${userB.name}! Would love to chat about ${userB.project}.`;
  }
}

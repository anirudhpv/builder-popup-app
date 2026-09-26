import { GoogleGenAI } from '@google/genai';
import { MenuItem } from '../data/menu';
import { UserProfile } from './store';

const apiKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function explainDish(item: MenuItem, userQuestion?: string): Promise<string> {
  if (typeof window !== 'undefined' && (window as any).ai?.languageModel) {
    try {
      const session = await (window as any).ai.languageModel.create({
        systemPrompt: "You are an expert cafe sommelier at Third Wave Coffee Bangalore. Explain drinks and food clearly, highlighting tasting notes, preparation methods, and flavor characteristics."
      });
      const prompt = `Item: ${item.name} (${item.category}). Ingredients: ${item.ingredients.join(', ')}. Question: ${userQuestion || 'Explain what this tastes like, how it is made, and why someone should try it.'}`;
      return await session.prompt(prompt);
    } catch (e) {
      console.warn("Gemini Nano fallback:", e);
    }
  }

  if (!ai) {
    return `☕ **${item.name}**: ${item.description}\n\n• **Flavor Profile**: Sweetness (${item.tasteProfile.sweetness}/5), Bitterness (${item.tasteProfile.bitterness}/5), Spice (${item.tasteProfile.spice}/5).\n• **Ingredients**: ${item.ingredients.join(', ')}.\n• **Best Paired With**: ${item.suggestedPairing || 'A fresh brew'}.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are an artisanal cafe sommelier at Third Wave Coffee in Bangalore.
Item: ${item.name} (${item.category}, ${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'})
Ingredients: ${item.ingredients.join(', ')}
Tagline: ${item.tagline}
Taste profile: Sweetness ${item.tasteProfile.sweetness}/5, Bitterness ${item.tasteProfile.bitterness}/5, Spice ${item.tasteProfile.spice}/5, Richness ${item.tasteProfile.richness}/5.
User query: ${userQuestion || 'Explain what makes this dish special, how it is made, and what it tastes like for a first-time customer.'}

Provide a concise, mouthwatering 3-bullet breakdown.`,
    });
    return response.text || item.description;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return item.description;
  }
}

export async function generateIcebreaker(userA: UserProfile | any, userB: UserProfile): Promise<string> {
  if (!ai) {
    return `Hey ${userB.name}! Saw you're working on ${userB.project}. Would love to hear more about your work in ${userB.field || 'your field'}!`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are generating an in-person, friendly, casual conversation starter between two creatives/professionals sharing a table or room at Third Wave Coffee Bangalore.
Person A: ${userA.name} (${userA.role || 'Visitor'}, Field: ${userA.field || 'Creative'}, Working on: ${userA.project || 'their work'})
Person B: ${userB.name} (${userB.role}, Field: ${userB.field}, Working on: "${userB.project}", Interests: ${userB.tags?.join(', ')}, Intent: ${userB.intent})

Give ONLY the 1-2 sentence natural spoken opener. Connect their creative/professional interests naturally. Keep it casual and warm.`,
    });
    return response.text || `Hey ${userB.name}, couldn't help but notice you're working on ${userB.project} — sounds fascinating!`;
  } catch (err) {
    return `Hey ${userB.name}! Love what you're working on with ${userB.project}.`;
  }
}

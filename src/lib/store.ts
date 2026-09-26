import { MenuItem, CAFE_MENU } from '../data/menu';

export type IntentType = 'chat' | 'cowork' | 'focus';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  field: string;
  project: string;
  tags: string[];
  intent: IntentType;
  tableNo: string;
  checkedInAt: string;
  currentOrder?: string;
  avatarColor: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

const STORAGE_PROFILE_KEY = '***';
const STORAGE_CART_KEY = '***';
const STORAGE_LOUNGE_KEY = '***';

export const DIVERSE_CAFE_ATTENDEES: UserProfile[] = [
  {
    id: '1',
    name: 'Anirudh P',
    role: 'Creative Strategist & Consultant',
    field: 'Design & Media',
    project: 'Building an interactive visual food & presence app for Bangalore cafes',
    tags: ['Brand Strategy', 'Visual Design', 'Storytelling'],
    intent: 'chat',
    tableNo: 'Table 4',
    checkedInAt: '5 mins ago',
    currentOrder: 'Signature Filter Coffee',
    avatarColor: '#10b981'
  },
  {
    id: '2',
    name: 'Rhea Sen',
    role: 'Screenwriter & Playwright',
    field: 'Film & Theatre',
    project: 'Drafting act two of an indie psychological drama set in Old Bangalore',
    tags: ['Screenwriting', 'Dialogue', 'Cinema', 'Fiction'],
    intent: 'chat',
    tableNo: 'Corner Window',
    checkedInAt: '15 mins ago',
    currentOrder: 'Classic Cold Brew',
    avatarColor: '#ec4899'
  },
  {
    id: '3',
    name: 'Kabir Mehta',
    role: 'Independent Film Director',
    field: 'Cinema & Production',
    project: 'Storyboarding a short documentary on Bangalore filter coffee culture',
    tags: ['Directing', 'Cinematography', 'Documentary'],
    intent: 'cowork',
    tableNo: 'Table 7',
    checkedInAt: '35 mins ago',
    currentOrder: 'Americano / Espresso',
    avatarColor: '#f59e0b'
  },
  {
    id: '4',
    name: 'Maya Nambiar',
    role: 'Freelance Journalist & Essayist',
    field: 'Publishing & Media',
    project: 'Writing a long-form cultural feature on third-wave coffee & urban spaces',
    tags: ['Journalism', 'Longform Essays', 'Cultural Studies'],
    intent: 'focus',
    tableNo: 'Table 2',
    checkedInAt: '50 mins ago',
    currentOrder: 'Masala Chai Latte',
    avatarColor: '#8b5cf6'
  },
  {
    id: '5',
    name: 'Arjun Das',
    role: 'Sound Designer & Music Composer',
    field: 'Audio & Music',
    project: 'Composing ambient synthesizer soundscapes for a podcast series',
    tags: ['Music Production', 'Soundscapes', 'Podcasting'],
    intent: 'chat',
    tableNo: 'Garden Patio',
    checkedInAt: '20 mins ago',
    currentOrder: 'Cappuccino',
    avatarColor: '#06b6d4'
  },
  {
    id: '6',
    name: 'Tara Roy',
    role: 'Architect & Urban Sketcher',
    field: 'Architecture & Art',
    project: 'Sketching colonial facade studies around central Bengaluru',
    tags: ['Architecture', 'Urban Sketching', 'Illustration'],
    intent: 'cowork',
    tableNo: 'High Table 3',
    checkedInAt: '1 hour ago',
    currentOrder: 'Classic Lemonade',
    avatarColor: '#14b8a6'
  }
];

export function getStoredProfile(): UserProfile | null {
  try {
    const data = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (!data) return null;
    const p = JSON.parse(data);
    return {
      id: p.id || String(Date.now()),
      name: p.name || 'Anonymous Creative',
      role: p.role || 'Creator',
      field: p.field || 'Arts & Creative',
      project: p.project || 'Working at the cafe',
      tags: Array.isArray(p.tags) ? p.tags : Array.isArray(p.skills) ? p.skills : ['Creative'],
      intent: p.intent || 'chat',
      tableNo: p.tableNo || 'Main Seating',
      checkedInAt: p.checkedInAt || 'Just now',
      currentOrder: p.currentOrder || undefined,
      avatarColor: p.avatarColor || '#10b981'
    };
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
  const attendees = getAttendees();
  const index = attendees.findIndex(a => a.id === profile.id);
  if (index >= 0) {
    attendees[index] = profile;
  } else {
    attendees.unshift(profile);
  }
  localStorage.setItem(STORAGE_LOUNGE_KEY, JSON.stringify(attendees));
}

export function getAttendees(): UserProfile[] {
  try {
    const data = localStorage.getItem(STORAGE_LOUNGE_KEY);
    if (!data) return DIVERSE_CAFE_ATTENDEES;
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return DIVERSE_CAFE_ATTENDEES;
    return parsed.map((p: any) => ({
      id: String(p.id || Math.random()),
      name: String(p.name || 'Anonymous Creative'),
      role: String(p.role || 'Creator'),
      field: String(p.field || 'Creative Work'),
      project: String(p.project || 'Working at Third Wave Coffee'),
      tags: Array.isArray(p.tags) ? p.tags : Array.isArray(p.skills) ? p.skills : ['Creative'],
      intent: (['chat', 'cowork', 'focus'].includes(p.intent) ? p.intent : 'chat') as IntentType,
      tableNo: String(p.tableNo || 'Main Seating'),
      checkedInAt: String(p.checkedInAt || 'Recently'),
      currentOrder: p.currentOrder ? String(p.currentOrder) : undefined,
      avatarColor: String(p.avatarColor || '#10b981')
    }));
  } catch {
    return DIVERSE_CAFE_ATTENDEES;
  }
}

export function getCart(): CartItem[] {
  try {
    const data = localStorage.getItem(STORAGE_CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
}

import { MenuItem, CAFE_MENU } from '../data/menu';

export type IntentType = 'chat' | 'cowork' | 'focus';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  project: string;
  skills: string[];
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

const STORAGE_PROFILE_KEY = 'cafe_user_profile';
const STORAGE_CART_KEY = 'cafe_user_cart';
const STORAGE_LOUNGE_KEY = 'cafe_lounge_attendees';

export const DEFAULT_ATTENDEES: UserProfile[] = [
  {
    id: '1',
    name: 'Anirudh P',
    role: 'Full Stack & Marketing Consultant',
    company: 'TigerTracks.ai',
    project: 'Google Builder Pop-Up Hackathon App',
    skills: ['React', 'TypeScript', 'Google Cloud', 'Gemini'],
    intent: 'chat',
    tableNo: 'Table 4',
    checkedInAt: '10 mins ago',
    currentOrder: 'Signature Filter Coffee',
    avatarColor: '#10b981'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'AI / ML Engineer',
    company: 'NexusAI',
    project: 'Agentic RAG with Vertex AI',
    skills: ['Python', 'Vertex AI', 'LangChain', 'Firestore'],
    intent: 'chat',
    tableNo: 'Table 2',
    checkedInAt: '25 mins ago',
    currentOrder: 'Classic Cold Brew',
    avatarColor: '#3b82f6'
  },
  {
    id: '3',
    name: 'Rahul Varma',
    role: 'Founder & Backend Lead',
    company: 'Kira Pay',
    project: 'High-throughput UPI Reconciliation Engine',
    skills: ['Go', 'Cloud Run', 'Spanner', 'Kubernetes'],
    intent: 'cowork',
    tableNo: 'Corner Booth',
    checkedInAt: '40 mins ago',
    currentOrder: 'Cappuccino',
    avatarColor: '#f59e0b'
  },
  {
    id: '4',
    name: 'Sneha Patel',
    role: 'Product Designer',
    company: 'Studio Craft',
    project: 'Design Systems & Micro-Interactions for Web3',
    skills: ['Figma', 'UI/UX', 'Tailwind', 'Park UI'],
    intent: 'chat',
    tableNo: 'Table 6',
    checkedInAt: '1 hour ago',
    currentOrder: 'Masala Chai Latte',
    avatarColor: '#ec4899'
  },
  {
    id: '5',
    name: 'Vikram Joshi',
    role: 'Cloud Architect',
    company: 'ScaleGrid',
    project: 'Debugging Multi-Region VPC Peering',
    skills: ['Terraform', 'GCP', 'GKE', 'Security'],
    intent: 'focus',
    tableNo: 'Table 8',
    checkedInAt: '15 mins ago',
    currentOrder: 'Americano / Espresso',
    avatarColor: '#6366f1'
  }
];

export function getStoredProfile(): UserProfile | null {
  try {
    const data = localStorage.getItem(STORAGE_PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
  // Also add to attendees list
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
    return data ? JSON.parse(data) : DEFAULT_ATTENDEES;
  } catch {
    return DEFAULT_ATTENDEES;
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

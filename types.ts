
export interface Flavor {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  color: string;
  accentColor: string;
  image: string;
  tagline: string;
  benefits: string[];
}

export interface Feedback {
  id: string;
  userName: string;
  flavorId: string;
  rating: number;
  comment: string;
  timestamp: Date;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SuggestionResult {
  flavorName: string;
  reason: string;
}

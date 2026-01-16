export interface Feedback {
  id: string;
  text: string;
  rating: number; // 1 to 5
  timestamp: number;
}

export interface MoodStat {
  rating: number;
  count: number;
  label: string;
  color: string;
}

export const MOOD_LABELS: Record<number, { label: string; emoji: string; color: string }> = {
  1: { label: 'Struggling', emoji: '😣', color: '#f87171' }, // Red-400
  2: { label: 'Not Great', emoji: '😕', color: '#fb923c' }, // Orange-400
  3: { label: 'Okay', emoji: '😐', color: '#fbbf24' }, // Amber-400
  4: { label: 'Good', emoji: '🙂', color: '#a3e635' }, // Lime-400
  5: { label: 'Amazing', emoji: '🥰', color: '#34d399' }, // Emerald-400
};
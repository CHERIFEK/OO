import React, { useState } from 'react';
import { MOOD_LABELS } from '../types';

interface SurveyFormProps {
  onSubmit: (text: string, rating: number) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating && text.trim()) {
      onSubmit(text, rating);
      setText('');
      setRating(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-700 mb-6">How are you feeling today?</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Select Mood</label>
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRating(r)}
                className={`
                  flex-1 aspect-square rounded-2xl text-2xl flex items-center justify-center transition-all duration-200
                  ${rating === r 
                    ? 'bg-indigo-50 border-2 border-indigo-200 scale-110 shadow-md' 
                    : 'bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:scale-105 grayscale opacity-70 hover:grayscale-0 hover:opacity-100'
                  }
                `}
                title={MOOD_LABELS[r].label}
              >
                {MOOD_LABELS[r].emoji}
              </button>
            ))}
          </div>
          <div className="text-center mt-2 h-5 text-sm font-medium text-indigo-400 transition-opacity">
            {rating ? MOOD_LABELS[rating].label : ''}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Your Thoughts</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your honest feedback..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none resize-none h-32 text-slate-600 placeholder-slate-400 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!rating || !text.trim()}
        className="w-full py-3 bg-slate-800 text-white rounded-xl font-medium shadow-lg shadow-slate-200 hover:bg-slate-700 hover:shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default SurveyForm;
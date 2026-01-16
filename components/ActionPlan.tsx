import React, { useState } from 'react';
import { generateActionPlan } from '../services/geminiService';
import { Feedback } from '../types';

interface ActionPlanProps {
  feedbacks: Feedback[];
}

const ActionPlan: React.FC<ActionPlanProps> = ({ feedbacks }) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string[] | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateActionPlan(feedbacks);
    setPlan(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
          <span className="text-2xl">✨</span> AI Action Plan
        </h2>
        {!plan && (
             <button
             onClick={handleGenerate}
             disabled={loading || feedbacks.length === 0}
             className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full text-sm font-medium transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
           >
             {loading ? 'Thinking...' : 'Generate Plan'}
           </button>
        )}
      </div>

      {!plan && !loading && (
        <p className="text-slate-400 text-sm italic">
          Collect some feedback, then click generate to get a management summary.
        </p>
      )}

      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          <div className="h-4 bg-slate-100 rounded w-5/6"></div>
          <div className="h-4 bg-slate-100 rounded w-1/2"></div>
        </div>
      )}

      {plan && (
        <div className="space-y-4">
          <ul className="space-y-3">
            {plan.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-indigo-50/50 p-3 rounded-xl text-indigo-900 text-sm leading-relaxed border border-indigo-100/50">
                <span className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-indigo-400 shadow-sm">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => setPlan(null)}
            className="w-full text-center text-xs text-slate-400 hover:text-indigo-500 mt-2 transition-colors"
          >
            Refresh Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionPlan;
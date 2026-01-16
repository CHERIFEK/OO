import React, { useState } from 'react';
import { Feedback } from './types';
import SurveyForm from './components/SurveyForm';
import MoodChart from './components/MoodChart';
import ActionPlan from './components/ActionPlan';

const INITIAL_DATA: Feedback[] = [
  { id: '1', text: "The team spirit is high, but we need more coffee!", rating: 4, timestamp: Date.now() },
  { id: '2', text: "Feeling a bit overwhelmed with the new project deadline.", rating: 2, timestamp: Date.now() - 10000 },
  { id: '3', text: "Great support from leadership this week.", rating: 5, timestamp: Date.now() - 20000 },
  { id: '4', text: "Meetings are taking up too much time.", rating: 3, timestamp: Date.now() - 30000 },
];

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(INITIAL_DATA);

  const handleSubmit = (text: string, rating: number) => {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      text,
      rating,
      timestamp: Date.now(),
    };
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  const averageMood = feedbacks.length 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1) 
    : '0.0';

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            Team<span className="text-indigo-400">Pulse</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-1">Anonymous Culture Dashboard</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Avg Mood</div>
          <div className="text-2xl font-bold text-indigo-500">{averageMood}</div>
          <div className="text-xl">
             {Number(averageMood) >= 4 ? '🚀' : Number(averageMood) >= 3 ? '👌' : '⚠️'}
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Input */}
        <div className="md:col-span-5 lg:col-span-4 h-full">
          <SurveyForm onSubmit={handleSubmit} />
        </div>

        {/* Right Column: Analytics & Action */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
          
          {/* Mood Chart Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-700">Mood Distribution</h2>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{feedbacks.length} Responses</span>
             </div>
             <MoodChart feedbacks={feedbacks} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ActionPlan feedbacks={feedbacks} />
            
            {/* Recent Feedback Feed */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-h-96 overflow-y-auto custom-scrollbar">
              <h2 className="text-xl font-semibold text-slate-700 mb-4 sticky top-0 bg-white pb-2 border-b border-slate-50">Recent Thoughts</h2>
              <div className="space-y-4">
                {feedbacks.map((f) => (
                  <div key={f.id} className="group flex gap-4 items-start p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm
                      ${f.rating >= 4 ? 'bg-green-100' : f.rating === 3 ? 'bg-amber-100' : 'bg-red-100'}
                    `}>
                      {f.rating === 5 ? '🥰' : f.rating === 4 ? '🙂' : f.rating === 3 ? '😐' : f.rating === 2 ? '😕' : '😣'}
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm leading-relaxed">{f.text}</p>
                      <span className="text-xs text-slate-300 mt-1 block group-hover:text-slate-400 transition-colors">
                        {new Date(f.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
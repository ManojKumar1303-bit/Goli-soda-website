
import React, { useState, useMemo } from 'react';
import { getFlavorRecommendation } from '../services/geminiService';
import { SuggestionResult } from '../types';
import { FLAVORS } from '../constants';

interface Option {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const STEPS = [
  { 
    title: "How's the Mood?", 
    key: 'mood',
    options: [
      { id: 'happy', label: 'Excited', icon: '🎉', color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700' },
      { id: 'tired', label: 'Tired', icon: '😴', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700' },
      { id: 'hot', label: 'Feeling Hot', icon: '☀️', color: 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700' },
      { id: 'bold', label: 'Adventurous', icon: '🕵️', color: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700' },
    ]
  },
  { 
    title: "Where are you?", 
    key: 'setting',
    options: [
      { id: 'food', label: 'After a Meal', icon: '🍲', color: 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700' },
      { id: 'movie', label: 'Movie Time', icon: '🍿', color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700' },
      { id: 'travel', label: 'On a Trip', icon: '🚗', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700' },
      { id: 'party', label: 'With Friends', icon: '🤝', color: 'bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-700' },
    ]
  },
  { 
    title: "Preference?", 
    key: 'preference',
    options: [
      { id: 'fizzy', label: 'Extra Fizzy', icon: '💥', color: 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700' },
      { id: 'sweet', label: 'Fruity Sweet', icon: '🍓', color: 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700' },
      { id: 'herbal', label: 'Traditional', icon: '🌿', color: 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700' },
      { id: 'tangy', label: 'Citrus Kick', icon: '🍋', color: 'bg-lime-50 hover:bg-lime-100 border-lime-200 text-lime-700' },
    ]
  }
];

export const FlavorMatch: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [suggestion, setSuggestion] = useState<SuggestionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (key: string, value: string) => {
    const updatedSelections = { ...selections, [key]: value };
    setSelections(updatedSelections);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsLoading(true);
      try {
        const result = await getFlavorRecommendation({
          mood: updatedSelections.mood,
          setting: updatedSelections.setting,
          preference: updatedSelections.preference
        });
        setSuggestion(result);
      } catch (error) {
        console.error("Match error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelections({});
    setSuggestion(null);
  };

  const handleViewDetails = () => {
    if (!suggestion) return;
    const flavor = FLAVORS.find(f => f.name.toLowerCase() === suggestion.flavorName.toLowerCase());
    if (flavor) {
      const element = document.getElementById(`flavor-${flavor.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-teal-500', 'ring-offset-4');
        setTimeout(() => element.classList.remove('ring-4', 'ring-teal-500', 'ring-offset-4'), 3000);
      }
    }
  };

  const matchedFlavor = useMemo(() => 
    FLAVORS.find(f => f.name.toLowerCase() === suggestion?.flavorName.toLowerCase()),
    [suggestion]
  );

  return (
    <section id="match" className="py-24 bg-teal-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="inline-block bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 tracking-widest">Interactive Quiz</div>
        <h2 className="text-5xl font-serif font-bold text-teal-900 mb-6">Discover Your Signature Sip</h2>
        <p className="text-slate-600 mb-12 text-lg max-w-2xl mx-auto">Answer 3 quick questions and our AI Mixologist will find your perfect Kaaraalan Goli Soda match.</p>
        
        {/* Progress Tracker */}
        {!suggestion && !isLoading && (
          <div className="flex justify-center items-center gap-4 mb-16">
            {STEPS.map((_, i) => (
              <React.Fragment key={i}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 shadow-sm ${
                  currentStep === i 
                    ? 'bg-teal-600 text-white scale-125 ring-4 ring-teal-100' 
                    : currentStep > i ? 'bg-teal-200 text-teal-700' : 'bg-slate-200 text-slate-400'
                }`}>
                  {currentStep > i ? <i className="fas fa-check"></i> : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className={`w-12 h-1 ${currentStep > i ? 'bg-teal-200' : 'bg-slate-200'}`}></div>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Question Area */}
        {!suggestion && !isLoading && (
          <div className="animate-fadeIn">
            <h3 className="text-3xl font-bold text-slate-800 mb-10 transition-all">{STEPS[currentStep].title}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {STEPS[currentStep].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(STEPS[currentStep].key, opt.label)}
                  className={`p-10 rounded-[40px] border-2 flex flex-col items-center justify-center gap-4 transition-all duration-300 group shadow-sm hover:shadow-xl transform hover:-translate-y-2 ${opt.color} border-transparent hover:border-current`}
                >
                  <span className="text-5xl group-hover:scale-125 transition-transform duration-300">{opt.icon}</span>
                  <span className="font-bold text-lg">{opt.label}</span>
                </button>
              ))}
            </div>
            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="mt-12 text-slate-400 hover:text-teal-600 font-bold flex items-center gap-2 mx-auto"
              >
                <i className="fas fa-arrow-left"></i> Go Back
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-24 h-24 mb-6">
               <div className="absolute inset-0 bg-teal-200 rounded-full animate-ping opacity-25"></div>
               <div className="relative w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center border-4 border-teal-500 shadow-lg">
                <i className="fas fa-flask text-4xl text-teal-600 animate-bounce"></i>
               </div>
            </div>
            <p className="text-teal-900 font-black text-2xl tracking-tight">AI is crafting your recipe...</p>
            <p className="text-slate-500 mt-2 italic">Mixing {selections.preference} bubbles with a {selections.mood} vibe...</p>
          </div>
        )}

        {/* Suggestion Result */}
        {suggestion && !isLoading && (
          <div className="bg-white p-12 rounded-[50px] shadow-2xl flex flex-col md:flex-row gap-12 items-center animate-scaleIn border border-teal-50 relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0 opacity-50"></div>
            
            <div className="relative z-10 w-72 h-80 rounded-[40px] overflow-hidden shrink-0 shadow-3xl transform -rotate-2 hover:rotate-0 transition duration-700">
              <img 
                src={matchedFlavor?.image || `https://picsum.photos/seed/${suggestion.flavorName}/400/500`} 
                alt={suggestion.flavorName} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 text-left flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-teal-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Your Soul Match</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <h3 className="text-5xl font-serif font-black text-slate-900 mb-6 leading-tight">{suggestion.flavorName} Goli Soda</h3>
              <div className="bg-slate-50 p-8 rounded-3xl border-l-8 border-teal-500 mb-10 shadow-inner">
                <p className="text-slate-700 italic text-xl leading-relaxed font-medium">
                  "{suggestion.reason}"
                </p>
              </div>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={handleViewDetails}
                  className="bg-teal-600 text-white px-12 py-5 rounded-2xl font-bold hover:bg-teal-700 transition flex items-center gap-3 shadow-2xl transform active:scale-95 text-lg"
                >
                  <i className="fas fa-glass-whiskey"></i> View Flavor Details
                </button>
                <button 
                  onClick={handleReset} 
                  className="bg-slate-100 text-slate-600 px-10 py-5 rounded-2xl font-bold hover:bg-slate-200 transition border border-slate-200"
                >
                  <i className="fas fa-undo mr-2"></i> Retake Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

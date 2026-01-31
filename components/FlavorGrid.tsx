
import React, { useState } from 'react';
import { FLAVORS } from '../constants';
import { Flavor } from '../types';

export const FlavorGrid: React.FC = () => {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);

  return (
    <section id="flavors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-slate-900 mb-4">Our Legendary Flavors</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Each bottle is pressure-sealed with a glass marble (Goli), preserving the intense carbonation and natural flavors you love.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FLAVORS.map((flavor) => (
            <div 
              id={`flavor-${flavor.id}`}
              key={flavor.id} 
              className={`${flavor.color} rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group flex flex-col cursor-pointer border-2 border-transparent hover:border-teal-500/20`}
              onClick={() => setSelectedFlavor(flavor)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={flavor.image} 
                  alt={flavor.name} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-teal-900/10 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                   <span className="bg-white/90 text-teal-900 px-4 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                     Quick View
                   </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${flavor.accentColor}`}>{flavor.tagline}</p>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{flavor.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{flavor.description}</p>
                <button 
                  className={`flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-3 ${flavor.accentColor}`}
                >
                  Read Flavor Profile <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flavor Details Modal */}
      {selectedFlavor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fadeIn" 
            onClick={() => setSelectedFlavor(null)}
          ></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scaleIn">
            <button 
              onClick={() => setSelectedFlavor(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full text-slate-900 transition shadow-md"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                src={selectedFlavor.image} 
                alt={selectedFlavor.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${selectedFlavor.accentColor}`}>
                {selectedFlavor.tagline}
              </p>
              <h3 className="text-4xl font-serif font-bold text-slate-900 mb-4">{selectedFlavor.name} Soda</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {selectedFlavor.longDescription}
              </p>
              
              <div className="mb-8">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-leaf text-teal-500"></i> Benefits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFlavor.benefits.map((benefit, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    setSelectedFlavor(null);
                    window.location.href = '#feedback';
                  }}
                  className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition shadow-lg text-center"
                >
                  Give Feedback
                </button>
                <button 
                  onClick={() => setSelectedFlavor(null)}
                  className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

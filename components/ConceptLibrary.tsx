
import React from 'react';
import { MARKETING_CONCEPTS } from '../constants';
import * as Icons from 'lucide-react';

const ConceptLibrary: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-black text-slate-800">The Relationship</h2>
        <p className="text-slate-500 leading-relaxed">
          The synergy between AI diagnostic systems and modern marketing mindset creates a powerful framework for healthcare adoption and patient trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MARKETING_CONCEPTS.map((concept) => {
          const IconComponent = (Icons as any)[concept.icon];
          return (
            <div key={concept.id} className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-6">
                <IconComponent className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{concept.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {concept.description}
              </p>
              
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50/50 transition-colors">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Focus</p>
                  <p className="text-xs text-slate-700 font-medium">{concept.marketingFocus}</p>
                </div>
                <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-100">
                  <p className="text-[10px] uppercase font-bold text-blue-100 mb-1">Message</p>
                  <p className="text-xs text-white font-bold">"{concept.message}"</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Box */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Exam-Ready Summary</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              AI marketing mindset and Hemoscan are connected through data-driven targeting, predictive positioning, user-centered value, trust building, personalization, and social impact communication. AI marketing helps present Hemoscan as a preventive, intelligent, and accessible anemia risk detection system.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-blue-500/20 flex items-center justify-center bg-blue-500/5">
              <span className="text-blue-400 text-4xl font-black">A+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptLibrary;

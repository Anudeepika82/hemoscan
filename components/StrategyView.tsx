
import React, { useEffect, useState } from 'react';
import { FileText, Cpu, Target, Share2, Loader2 } from 'lucide-react';
import { generateStrategySummary } from '../services/gemini';

const StrategyView: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const summary = await generateStrategySummary();
      setContent(summary);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="font-medium">Gemini is synthesizing strategic insights...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Strategic Write-up</h2>
            <p className="text-slate-500 font-medium">Academic relationship analysis & presentation framework</p>
          </div>
          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-10 prose prose-slate max-w-none">
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4" /> AI Diagnostics
            </div>
            <div className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center gap-2">
              <Target className="w-4 h-4" /> Marketing Mindset
            </div>
          </div>
          
          <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap font-serif text-lg">
            {content}
          </div>
        </div>

        <div className="bg-blue-50 p-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900">Project Submission Ready</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              This analysis is formatted for professional presentations and academic project write-ups. Use the "Core Concepts" section for visual slides.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyView;

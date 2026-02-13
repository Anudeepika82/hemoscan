
import React, { useState } from 'react';
import { Microscope, BrainCircuit, Sparkles, Send, Loader2, Info } from 'lucide-react';
import { PatientData, AnalysisResult } from '../types';
import { generateMarketingInsight } from '../services/gemini';

const HemoScanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<PatientData>({
    hemoglobin: 13.5,
    rbcCount: 4.8,
    fatigueLevel: 3,
    age: 35,
    gender: 'female'
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleScan = async () => {
    setLoading(true);
    // Simulate medical logic
    const hb = patient.hemoglobin;
    let riskScore = 0;
    
    // Simple logic for simulation
    if (hb < 11) riskScore = 85;
    else if (hb < 13) riskScore = 55;
    else riskScore = 15;

    // Adjust for fatigue
    riskScore += (patient.fatigueLevel * 1.5);
    riskScore = Math.min(Math.max(riskScore, 0), 100);

    const category = riskScore > 70 ? 'High' : riskScore > 40 ? 'Moderate' : 'Low';
    
    const analysis: AnalysisResult = {
      riskScore,
      category,
      recommendations: [
        category === 'High' ? 'Urgent CBC and clinician review needed.' : 'Monitor iron levels via diet.',
        'Consider Vitamin B12 and Folate screening.',
        'Repeat HemoScan in 30 days.'
      ]
    };

    // Use Gemini for the marketing mindset layer
    const marketingAngle = await generateMarketingInsight(patient, analysis);
    analysis.marketingAngle = marketingAngle;

    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">HemoScan Input</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Hemoglobin (g/dL)</label>
              <input 
                type="range" min="5" max="18" step="0.1"
                value={patient.hemoglobin}
                onChange={(e) => setPatient({...patient, hemoglobin: parseFloat(e.target.value)})}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                <span>5.0</span>
                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{patient.hemoglobin} g/dL</span>
                <span>18.0</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">RBC Count (mil/μL)</label>
              <input 
                type="number" step="0.1"
                value={patient.rbcCount}
                onChange={(e) => setPatient({...patient, rbcCount: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Reported Fatigue (1-10)</label>
              <div className="flex gap-2">
                {[1,2,3,4,5,6,7,8,9,10].map(val => (
                  <button
                    key={val}
                    onClick={() => setPatient({...patient, fatigueLevel: val})}
                    className={`flex-1 h-8 rounded-lg text-xs font-bold transition-all ${
                      patient.fatigueLevel === val ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <button 
                onClick={() => setPatient({...patient, gender: 'male'})}
                className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                  patient.gender === 'male' ? 'bg-slate-800 text-white border-slate-800' : 'text-slate-600 border-slate-200'
                }`}
              >
                Male
              </button>
              <button 
                onClick={() => setPatient({...patient, gender: 'female'})}
                className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                  patient.gender === 'female' ? 'bg-slate-800 text-white border-slate-800' : 'text-slate-600 border-slate-200'
                }`}
              >
                Female
              </button>
            </div>

            <button 
              disabled={loading}
              onClick={handleScan}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {loading ? 'Analyzing...' : 'Run HemoScan Analysis'}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3 space-y-8">
          {result ? (
            <div className="space-y-8 animate-slideUp">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">Diagnostic Output</h3>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    result.category === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
                    result.category === 'Moderate' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {result.category} Risk
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" 
                        strokeDasharray={364}
                        strokeDashoffset={364 - (364 * result.riskScore / 100)}
                        className={`${result.category === 'High' ? 'text-red-500' : result.category === 'Moderate' ? 'text-amber-500' : 'text-emerald-500'} transition-all duration-1000 ease-out`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-800">{Math.round(result.riskScore)}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Index</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <h4 className="font-bold text-slate-700 text-sm">Key Recommendations</h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Marketing Perspective Card */}
              <div className="bg-slate-900 rounded-2xl shadow-xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Sparkles className="w-24 h-24 text-blue-400" />
                </div>
                
                <div className="flex items-center gap-2 mb-6 text-blue-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">AI Marketing Mindset Insight</span>
                </div>

                <div className="relative z-10">
                  <p className="text-white text-lg font-medium leading-relaxed italic border-l-2 border-blue-500/30 pl-6">
                    {result.marketingAngle}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-4">
                     <div className="flex -space-x-2">
                        {[1,2,3].map(i => <img key={i} src={`https://picsum.photos/seed/${i+10}/32/32`} className="w-8 h-8 rounded-full border-2 border-slate-900" />)}
                     </div>
                     <span className="text-slate-400 text-xs font-medium">Verified for Public Health Communication</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Info className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-slate-500 font-semibold text-lg mb-2">Awaiting Diagnosis</h3>
              <p className="text-slate-400 max-w-xs text-sm leading-relaxed">
                Enter patient biomarkers on the left to generate clinical results and strategic marketing positioning.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HemoScanner;

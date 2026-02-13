
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Droplet, TrendingUp, AlertCircle } from 'lucide-react';

const mockBarData = [
  { name: 'Rural', diagnosed: 450, predictive: 620 },
  { name: 'Urban', diagnosed: 300, predictive: 410 },
  { name: 'Peri-Urban', diagnosed: 120, predictive: 280 },
];

const mockPieData = [
  { name: 'Low Risk', value: 400 },
  { name: 'Moderate Risk', value: 300 },
  { name: 'High Risk', value: 150 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Screened Patients', value: '12,482', icon: Users, color: 'blue' },
          { label: 'Risk Interventions', value: '2,841', icon: AlertCircle, color: 'orange' },
          { label: 'Predictive Accuracy', value: '98.4%', icon: TrendingUp, color: 'emerald' },
          { label: 'Detection Speed', value: '0.8s', icon: Droplet, color: 'cyan' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl bg-${kpi.color}-50 flex items-center justify-center mb-4`}>
              <kpi.icon className={`w-6 h-6 text-${kpi.color}-600`} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Predictive Detection Impact</h3>
            <span className="text-xs text-slate-400 font-medium">By Geographic Sector</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockBarData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="diagnosed" name="Standard Diagnostics" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="predictive" name="Hemoscan AI" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800 leading-relaxed italic">
              "AI Marketing Mindset Insight: Rural deployment of Hemoscan has increased predictive early-intervention by 38% compared to traditional clinical screening."
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Patient Risk Segmentation</h3>
            <span className="text-xs text-slate-400 font-medium">AI Insights distribution</span>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {mockPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-4 ml-8">
              {mockPieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}} />
                  <span className="text-sm text-slate-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
             <h4 className="font-bold text-slate-800 text-sm mb-2">Targeting Opportunity</h4>
             <p className="text-xs text-slate-600 leading-relaxed">
               The "Moderate Risk" segment represents the primary target for early-intervention marketing strategies, focusing on nutritional support and wellness education.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

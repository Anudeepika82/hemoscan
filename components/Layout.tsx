
import React from 'react';
import { LayoutDashboard, Microscope, BookOpen, Presentation, Activity, HeartPulse } from 'lucide-react';
import { Tab } from '../types';

interface LayoutProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const navItems = [
    { id: 'dashboard', label: 'Impact Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'HemoScanner AI', icon: Microscope },
    { id: 'concepts', label: 'Core Concepts', icon: BookOpen },
    { id: 'strategy', label: 'Marketing Strategy', icon: Presentation },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <HeartPulse className="w-8 h-8" />
            <span>HEMOSCAN</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">AI Marketing Suite</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase">System Active</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              Gemini 3 Flash Pro Engine currently powering predictive insights.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
              Live Connection
            </div>
            <img src="https://picsum.photos/seed/doc/40/40" alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200" />
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex justify-around">
           {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex flex-col items-center p-2 rounded-lg ${
                activeTab === item.id ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] mt-1">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Layout;

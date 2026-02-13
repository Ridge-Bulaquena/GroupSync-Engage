
import React from 'react';
import { AnalysisView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AnalysisView;
  setView: (view: AnalysisView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  const menuItems = [
    { id: AnalysisView.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: AnalysisView.BRAIN_3D, label: '3D Hyperscanning', icon: 'fa-brain' },
    { id: AnalysisView.CONNECTIVITY, label: 'Synchrony Matrix', icon: 'fa-th' },
    { id: AnalysisView.NETWORK, label: 'Graph Dynamics', icon: 'fa-project-diagram' },
    { id: AnalysisView.INTELLIGENCE, label: 'Neuro Intelligence', icon: 'fa-microchip' },
    { id: AnalysisView.REPOSITORY, label: 'Repository Explorer', icon: 'fa-folder-open' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#020617] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0f172a] border-r border-slate-800 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-wave-square text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">GroupSync</h1>
              <span className="text-xs text-slate-500 font-mono">ENGAGE v2.4.1</span>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-lg shadow-indigo-600/5'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-slate-300 font-medium uppercase tracking-widest">System Active</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
              STREAM: 1250 Hz<br/>
              NODES: 8 Subject(s)<br/>
              FILES: 140+ Source
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-[#020617] to-[#0f172a]">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 glass sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-100">{activeView.replace('_', ' ')}</h2>
            <div className="h-4 w-[1px] bg-slate-700"></div>
            <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded border border-slate-700">Project: Social-Cohesion-A1</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/${i + 10}/32/32`}
                  className="w-8 h-8 rounded-full border-2 border-slate-900 ring-2 ring-indigo-600/20"
                  alt="Subject"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                +4
              </div>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <i className="fas fa-file-export mr-2"></i> Report
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

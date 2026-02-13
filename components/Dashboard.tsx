
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Metric } from '../types';

const data = [
  { time: '0s', plv: 0.2, cohesion: 0.1 },
  { time: '10s', plv: 0.45, cohesion: 0.3 },
  { time: '20s', plv: 0.38, cohesion: 0.4 },
  { time: '30s', plv: 0.62, cohesion: 0.55 },
  { time: '40s', plv: 0.81, cohesion: 0.72 },
  { time: '50s', plv: 0.75, cohesion: 0.78 },
  { time: '60s', plv: 0.88, cohesion: 0.82 },
];

const metrics: Metric[] = [
  { label: 'Avg PLV (Alpha Band)', value: '0.82', trend: 'up', color: 'text-indigo-400' },
  { label: 'Graph Density', value: '0.64', trend: 'stable', color: 'text-emerald-400' },
  { label: 'Global Efficiency', value: '0.41', trend: 'up', color: 'text-amber-400' },
  { label: 'Processing Latency', value: '14ms', trend: 'down', color: 'text-rose-400' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl border border-slate-800/50 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{m.label}</span>
              <i className={`fas fa-chevron-${m.trend === 'up' ? 'up' : m.trend === 'down' ? 'down' : 'right'} ${m.color} text-xs opacity-50`}></i>
            </div>
            <div className={`text-3xl font-bold ${m.color} code-font tracking-tight`}>
              {m.value}
            </div>
            <div className="mt-2 text-[10px] text-slate-500 font-medium">
              vs previous session: {m.trend === 'up' ? '+12%' : m.trend === 'down' ? '-4%' : '0%'}
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-slate-800/50 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Temporal Synchronization</h3>
              <p className="text-xs text-slate-500">Real-time Phase Locking Value (PLV) evolution</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded uppercase">Alpha (8-13Hz)</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded uppercase">Theta (4-7Hz)</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPlv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="plv" stroke="#6366f1" fillOpacity={1} fill="url(#colorPlv)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-slate-800/50 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-100 mb-6">Subject Interaction Status</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={`https://picsum.photos/seed/${i + 50}/40/40`} className="w-10 h-10 rounded-full" alt="avatar" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">Subject #{i + 100}</div>
                    <div className="text-[10px] text-slate-500">Lead Researcher Role</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-indigo-400">92% Engagement</div>
                  <div className="w-24 bg-slate-700 h-1 rounded-full mt-1 overflow-hidden">
                    <div className="bg-indigo-500 h-full" style={{ width: `${80 + i * 3}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

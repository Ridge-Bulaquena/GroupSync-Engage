
import React from 'react';

const NetworkGraph: React.FC = () => {
  // We'll simulate a 2D graph with absolute positioning to avoid D3 boilerplate for this specific mock UI
  const subjects = [
    { id: '101', x: 20, y: 30, power: 0.8 },
    { id: '102', x: 70, y: 20, power: 0.9 },
    { id: '103', x: 50, y: 50, power: 0.75 },
    { id: '104', x: 80, y: 70, power: 0.85 },
    { id: '105', x: 25, y: 75, power: 0.6 },
    { id: '106', x: 45, y: 15, power: 0.4 },
  ];

  const connections = [
    { from: 0, to: 2, strength: 4 },
    { from: 1, to: 2, strength: 5 },
    { from: 2, to: 3, strength: 3 },
    { from: 4, to: 2, strength: 2 },
    { from: 5, to: 2, strength: 1 },
    { from: 0, to: 4, strength: 3 },
    { from: 1, to: 3, strength: 2 },
  ];

  return (
    <div className="animate-in zoom-in duration-500">
        <div className="glass rounded-2xl p-8 border border-slate-800/50 h-[600px] flex flex-col">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-100">Dynamic Social Network</h3>
                    <p className="text-sm text-slate-500">Edge weight ∝ Synchrony Strength (WPLI)</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-400">Modularity Q</span>
                        <span className="text-lg font-bold text-indigo-400">0.42</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-400">Clustering</span>
                        <span className="text-lg font-bold text-indigo-400">0.68</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-slate-900/40 rounded-xl border border-slate-800 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {connections.map((c, i) => (
                        <line
                            key={i}
                            x1={`${subjects[c.from].x}%`}
                            y1={`${subjects[c.from].y}%`}
                            x2={`${subjects[c.to].x}%`}
                            y2={`${subjects[c.to].y}%`}
                            stroke="#6366f1"
                            strokeWidth={c.strength}
                            strokeOpacity={0.2 + c.strength * 0.1}
                            strokeDasharray={c.strength < 2 ? "4 4" : "0"}
                        />
                    ))}
                </svg>

                {subjects.map((s, i) => (
                    <div
                        key={i}
                        className="absolute w-12 h-12 -ml-6 -mt-6 group"
                        style={{ left: `${s.x}%`, top: `${s.y}%` }}
                    >
                        <div className={`w-full h-full rounded-full border-2 border-indigo-500 flex items-center justify-center bg-slate-800/80 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all hover:scale-125 hover:z-20 cursor-pointer`}>
                            <span className="text-[10px] font-bold text-slate-200">{s.id}</span>
                        </div>
                        <div className="hidden group-hover:block absolute top-14 left-1/2 -translate-x-1/2 glass px-3 py-2 rounded-lg border border-indigo-500/30 w-32 z-50">
                            <p className="text-[10px] font-bold text-slate-100 mb-1">Subject #{s.id}</p>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[8px]">
                                    <span className="text-slate-500">Eigen. Centrality</span>
                                    <span className="text-indigo-400">0.82</span>
                                </div>
                                <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full" style={{ width: '82%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="absolute bottom-4 right-4 glass p-4 rounded-xl text-[10px] space-y-2 max-w-[200px]">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span className="text-slate-300">Coherent Hub (Node 103)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full border border-indigo-500 bg-slate-800"></div>
                        <span className="text-slate-300">Peripheral Participant</span>
                    </div>
                    <p className="text-slate-500 italic mt-2">Graph layout updated every 500ms using temporal edge data.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NetworkGraph;

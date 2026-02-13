
import React, { useMemo } from 'react';

const SynchronyMatrix: React.FC = () => {
  const size = 8;
  const labels = Array.from({ length: size }, (_, i) => `S${i + 101}`);

  // Generate a mock symmetric matrix with diagonal = 1
  const matrix = useMemo(() => {
    const m = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === j) m[i][j] = 1;
        else if (i < j) {
          m[i][j] = Number((0.2 + Math.random() * 0.7).toFixed(2));
          m[j][i] = m[i][j];
        }
      }
    }
    return m;
  }, []);

  const getColor = (val: number) => {
    if (val > 0.8) return 'bg-indigo-500';
    if (val > 0.6) return 'bg-indigo-600';
    if (val > 0.4) return 'bg-indigo-700';
    if (val > 0.2) return 'bg-slate-700';
    return 'bg-slate-800';
  };

  return (
    <div className="animate-in slide-in-from-bottom duration-700">
      <div className="glass rounded-2xl p-8 border border-slate-800/50 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-100">Inter-Subject PLV Matrix</h3>
            <p className="text-sm text-slate-500 italic">Phase-Locking Values (Lachaux et al., 1999)</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">Low</span>
              <div className="h-2 w-24 bg-gradient-to-r from-slate-800 to-indigo-500 rounded-full"></div>
              <span className="text-[10px] text-slate-400">High</span>
            </div>
            <select className="bg-slate-800 text-xs border border-slate-700 rounded px-2 py-1 text-slate-300">
              <option>Alpha Band</option>
              <option>Beta Band</option>
              <option>Gamma Band</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4">
          {/* Y Labels */}
          <div className="flex flex-col justify-around py-2">
            {labels.map(l => (
              <span key={l} className="text-[10px] font-mono text-slate-500 font-bold">{l}</span>
            ))}
          </div>

          <div className="space-y-1">
            {/* Matrix Rows */}
            {matrix.map((row, i) => (
              <div key={i} className="flex gap-1 h-12">
                {row.map((val, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`flex-1 rounded-sm ${getColor(val)} transition-all hover:scale-105 hover:ring-2 hover:ring-white/20 relative group cursor-crosshair`}
                  >
                    <div className="hidden group-hover:flex absolute -top-12 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded text-[10px] font-mono z-50 whitespace-nowrap border border-indigo-500/50">
                      {labels[i]} ↔ {labels[j]}: <span className="text-indigo-400 font-bold ml-1">{val}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* X Labels */}
            <div className="flex justify-around pt-2">
              {labels.map(l => (
                <span key={l} className="text-[10px] font-mono text-slate-500 font-bold">{l}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-info-circle"></i> Scholarly Context
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
                PLV represents the consistency of phase differences between neural oscillators across subjects. Higher values (approaching 1.0) indicate strong temporal coupling, typically observed during cooperative problem-solving or shared emotional experiences. Reference: <span className="italic text-slate-300">"Measuring phase synchrony in brain signals", Human Brain Mapping, 1999.</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SynchronyMatrix;

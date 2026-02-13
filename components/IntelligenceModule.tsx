
import React, { useState } from 'react';
import { analyzeSynchronyData } from '../services/geminiService';
import { InsightReport } from '../types';

const IntelligenceModule: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<InsightReport | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      // Mock data for analysis
      const mockData = {
        mean_plv: 0.74,
        clustering_coeff: 0.52,
        density: 0.61,
        active_participants: 8,
        dominant_freq: "10.2Hz",
        event_markers: ["Task Start", "Consensus Achieved", "Task End"]
      };
      const result = await analyzeSynchronyData(mockData, "Group of 8 subjects performing a joint visual task involving shared attention.");
      setReport(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="glass p-8 rounded-2xl border border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <i className="fas fa-brain text-8xl text-indigo-500"></i>
        </div>
        
        <div className="relative z-10">
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Neuro-Behavioral Intelligence</h2>
            <p className="text-slate-400 text-sm mb-8">Deploy Gemini 3.0 Flash to synthesize complex neural dynamics into actionable group behavioral insights.</p>
            
            {!report && !loading && (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                    <i className="fas fa-atom text-4xl text-indigo-500/50 mb-4 animate-spin-slow"></i>
                    <p className="text-slate-400 text-sm mb-6">Ready to synthesize data across 140+ connectivity parameters.</p>
                    <button 
                        onClick={runAnalysis}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                    >
                        <i className="fas fa-bolt"></i> Generate AI Synthesis
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-1 w-full max-w-xs bg-slate-800 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-indigo-500 animate-[loading_1.5s_ease-in-out_infinite]"></div>
                    </div>
                    <p className="text-slate-500 font-mono text-[10px] animate-pulse">REASONING: Evaluating inter-subject coherence patterns...</p>
                </div>
            )}

            {report && (
                <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                        <div>
                            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">AI Synthesis Report</h3>
                            <p className="text-slate-300 leading-relaxed text-sm italic">
                                "{report.summary}"
                            </p>
                        </div>
                        <div className="glass bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30 text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Group Cohesion Score</div>
                            <div className="text-5xl font-black text-indigo-400 code-font">{(report.cohesionScore * 100).toFixed(0)}%</div>
                            <div className="mt-4 w-full bg-slate-700 h-2 rounded-full">
                                <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${report.cohesionScore * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                <i className="fas fa-exclamation-triangle text-amber-500"></i> Identified Anomalies
                            </h4>
                            <ul className="space-y-2">
                                {report.anomalies.map((a, i) => (
                                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0"></span>
                                        {a}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                <i className="fas fa-lightbulb text-indigo-400"></i> Recommendations
                            </h4>
                            <ul className="space-y-2">
                                {report.recommendations.map((r, i) => (
                                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 flex-shrink-0"></span>
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800">
                        <button 
                            onClick={() => setReport(null)}
                            className="text-[10px] text-slate-500 hover:text-indigo-400 font-mono transition-colors uppercase tracking-widest"
                        >
                            Reset analysis session
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default IntelligenceModule;

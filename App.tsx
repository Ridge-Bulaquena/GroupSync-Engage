
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SynchronyMatrix from './components/SynchronyMatrix';
import NetworkGraph from './components/NetworkGraph';
import IntelligenceModule from './components/IntelligenceModule';
import FileExplorer from './components/FileExplorer';
import { AnalysisView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AnalysisView>(AnalysisView.DASHBOARD);

  const renderContent = () => {
    switch (activeView) {
      case AnalysisView.DASHBOARD:
        return <Dashboard />;
      case AnalysisView.CONNECTIVITY:
        return <SynchronyMatrix />;
      case AnalysisView.NETWORK:
        return <NetworkGraph />;
      case AnalysisView.INTELLIGENCE:
        return <IntelligenceModule />;
      case AnalysisView.REPOSITORY:
        return <FileExplorer />;
      case AnalysisView.BRAIN_3D:
        return (
          <div className="flex flex-col items-center justify-center h-[600px] glass rounded-2xl border border-slate-800 border-dashed animate-in zoom-in duration-500">
            <i className="fas fa-brain text-6xl text-slate-700 mb-6"></i>
            <h3 className="text-xl font-bold text-slate-300">3D Brain Visualizer</h3>
            <p className="text-slate-500 max-w-md text-center mt-2 px-8">
              Currently initializing hyperscanning WebGL context. Ensure subject EEG coords are correctly mapped to MNI152 space.
            </p>
            <div className="mt-8 flex gap-4">
                <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce delay-100"></div>
                <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce delay-200"></div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeView={activeView} setView={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;

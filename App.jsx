
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Competitions from './components/Competitions.jsx';
import { LayoutDashboard } from 'lucide-react';
import { exitCompetition } from './usersSlice.js';

const PlaceholderView = ({ name }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-500 px-6">
    <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-600 mb-6 border border-rose-100">
      <LayoutDashboard className="w-10 h-10" />
    </div>
    <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{name} Dashboard</h2>
    <p className="text-slate-400 max-w-sm font-medium text-sm">Professional analytics for the {name} module are being compiled.</p>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState('Leaderboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const activeCompetitionId = useSelector(state => state.users.activeCompetitionId);

  useEffect(() => {
    if (activeCompetitionId) {
      setCurrentView('Leaderboard');
    }
  }, [activeCompetitionId]);

  const handleSetView = (view) => {
    if (view !== 'Leaderboard' && activeCompetitionId) {
      dispatch(exitCompetition());
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'Leaderboard': return <Leaderboard />;
      case 'Competitions': return <Competitions />;
      default: return <PlaceholderView name={currentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex transition-all duration-300">
      <Sidebar 
        currentView={currentView} 
        setView={handleSetView} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} min-h-screen pb-20 md:pb-12`}>
        <Header collapsed={isSidebarCollapsed} />

        <main className="pt-20 md:pt-24 pb-12 px-4 sm:px-10 max-w-7xl mx-auto">
          <nav className="hidden sm:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
            <span>Student Dashboard</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="text-rose-600">{currentView}</span>
            {activeCompetitionId && (
              <>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-slate-900">Arena Active</span>
              </>
            )}
          </nav>

          {renderContent()}
        </main>
      </div>
      
      {/* Floating Goal indicator - only on tablet+ */}
      <div className="hidden sm:flex fixed bottom-8 right-8 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl items-center gap-4 z-50 border border-slate-700 animate-in slide-in-from-right-8">
        <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center font-black">!</div>
        <div>
          <p className="text-xs font-bold text-slate-200 leading-tight">Current Objective</p>
          <p className="text-sm font-black text-white">Dominate the {activeCompetitionId ? 'Arena' : 'Global'} rankings</p>
        </div>
      </div>
    </div>
  );
};

export default App;

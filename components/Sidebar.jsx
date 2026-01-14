
import React from 'react';
import { LayoutDashboard, Trophy, Target, Users, BookOpen, BarChart3, User, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const Sidebar = ({ currentView, setView, isCollapsed, onToggle }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Leaderboard', icon: Trophy },
    { name: 'Competitions', icon: Target },
    { name: 'Groups', icon: Users },
    { name: 'Subjects', icon: BookOpen },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-50 flex-col sidebar-transition ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-6 pb-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            {!isCollapsed && (
              <span className="font-extrabold text-xl tracking-tight text-slate-900 whitespace-nowrap">SAT<span className="text-rose-600">ELITE</span></span>
            )}
          </div>
          <button onClick={onToggle} className="text-slate-400 hover:text-slate-900 transition-colors p-1">
            {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setView(item.name)}
              title={isCollapsed ? item.name : ''}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                currentView === item.name
                  ? 'bg-rose-50 text-rose-600 font-semibold shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${currentView === item.name ? 'text-rose-600' : 'text-slate-400 group-hover:text-slate-900'}`} />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 overflow-hidden">
          <div className={`flex items-center gap-3 p-3 mb-2 rounded-xl bg-slate-50 ${isCollapsed ? 'justify-center' : ''}`}>
             <div className="w-8 h-8 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center flex-shrink-0">AJ</div>
             {!isCollapsed && (
               <div className="overflow-hidden">
                 <p className="text-xs font-bold text-slate-900 truncate">Alex J.</p>
                 <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Elite Tier</p>
               </div>
             )}
          </div>
          <button className={`w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-600 transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 px-2 z-[60] shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        {menuItems.slice(0, 5).map((item) => (
          <button
            key={item.name}
            onClick={() => setView(item.name)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              currentView === item.name ? 'text-rose-600' : 'text-slate-400'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.name}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;

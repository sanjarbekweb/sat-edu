
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import { ChevronUp, ChevronDown, Minus, Trophy, Target, Award, Zap, Clock, ShieldCheck, ChevronLeft, Flag, Star, X, BarChart3, Timer } from 'lucide-react';
import { selectFilteredStudents, setGroupFilter, setSubjectFilter, exitCompetition } from '../usersSlice.js';
import { ProgressRing } from './StatCharts.jsx';
import { MOCK_COMPETITIONS } from '../constants.js';

const TooltipCard = ({ student, position, isMobile, onClose }) => {
  if (!student) return null;

  // Mobile/Modal View
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white border border-slate-200 shadow-2xl rounded-[32px] p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
              {student.avatar}
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-lg leading-tight">{student.name}</h4>
              <p className="text-xs text-rose-600 font-bold uppercase tracking-widest">{student.group}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 flex flex-col items-center">
              <p className="text-[10px] text-rose-400 font-black uppercase mb-1">Accuracy</p>
              <p className="text-xl font-black text-rose-600">{student.accuracy}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
              <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Time Spent</p>
              <p className="text-xl font-black text-slate-900">{student.timeSpent}h</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Math Median</span>
              </div>
              <span className="text-sm font-black text-slate-900">{student.mathMedian}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">English Median</span>
              </div>
              <span className="text-sm font-black text-slate-900">{student.rwMedian}</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200"
          >
            Close Profile
          </button>
        </div>
      </div>
    );
  }

  // Desktop Tooltip View
  return (
    <div 
      className="fixed z-[999] pointer-events-none animate-tooltip hidden lg:block"
      style={{ top: position.y + 15, left: position.x + 15 }}
    >
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 w-64 ring-4 ring-rose-500/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-base">
            {student.avatar}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm leading-tight">{student.name}</h4>
            <p className="text-[9px] text-rose-600 font-bold uppercase tracking-widest">{student.group}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-rose-50/50 p-2 rounded-lg border border-rose-100/50">
            <p className="text-[8px] text-rose-400 font-black uppercase">Accuracy</p>
            <p className="text-sm font-black text-rose-600">{student.accuracy}%</p>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <p className="text-[8px] text-slate-400 font-black uppercase">Time Spent</p>
            <p className="text-sm font-black text-slate-900">{student.timeSpent}h</p>
          </div>
        </div>

        <div className="space-y-1.5 border-t border-slate-50 pt-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-400 font-medium uppercase tracking-tight">Math Median</span>
            <span className="font-black text-slate-700">{student.mathMedian}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-400 font-medium uppercase tracking-tight">English Median</span>
            <span className="font-black text-slate-700">{student.rwMedian}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectFilteredStudents);
  const filters = useSelector(state => state.users.filters);
  const activeCompetitionId = useSelector(state => state.users.activeCompetitionId);
  
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null); // For mobile clicks
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".podium-orb", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });
      gsap.from(".leaderboard-row", {
        y: 10,
        opacity: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",
        delay: 0.3
      });
    }, containerRef);
    return () => ctx.revert();
  }, [students.length, activeCompetitionId, filters.subject]);

  const groups = ['All', 'Porsche Performance', 'Ferrari Fast-Track', 'BMW Blue-Ribbon', 'Mercedes Mastery', 'Lamborghini Leaders', 'Audi Academic'];
  const subjects = ['Both', 'Math', 'English'];
  const activeCompetition = MOCK_COMPETITIONS.find(c => c.id === activeCompetitionId);

  const topThree = students.slice(0, 3);
  const others = students.slice(3);

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ChevronUp className="w-4 h-4 text-emerald-500" />;
    if (trend === 'down') return <ChevronDown className="w-4 h-4 text-rose-500" />;
    return <Minus className="w-4 h-4 text-slate-300" />;
  };

  const handleRowClick = (student) => {
    if (window.innerWidth < 1024) {
      setSelected(student);
    }
  };

  return (
    <div className="relative" ref={containerRef} onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
      {/* Desktop Tooltip */}
      <TooltipCard student={hovered} position={mousePos} isMobile={false} />
      
      {/* Mobile Modal */}
      {selected && (
        <TooltipCard 
          student={selected} 
          isMobile={true} 
          onClose={() => setSelected(null)} 
        />
      )}

      {/* STICKY HEADER & FILTERS */}
      <div className="sticky top-16 z-30 bg-slate-50/80 backdrop-blur-md -mx-4 px-4 py-4 md:-mx-10 md:px-10 border-b border-slate-100 transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            {activeCompetitionId ? (
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => dispatch(exitCompetition())}
                  className="flex items-center gap-2 text-rose-600 font-bold text-[10px] uppercase tracking-widest hover:text-rose-700 transition-colors w-fit"
                >
                  <ChevronLeft className="w-3 h-3" />
                  Global Rankings
                </button>
                <div className="flex items-center gap-3">
                  <Flag className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight truncate max-w-[200px] md:max-w-none">
                    {activeCompetition?.title}
                  </h1>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Academic Spotlight</h1>
                <p className="hidden sm:block text-slate-500 text-[10px] font-bold uppercase tracking-wide">Elite Rankings • Real-time Data</p>
              </div>
            )}
          </div>

          {!activeCompetitionId && (
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="flex flex-col gap-1 flex-1 min-w-[120px] sm:min-w-[160px]">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Squad</span>
                <select 
                  value={filters.group}
                  onChange={(e) => dispatch(setGroupFilter(e.target.value))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-rose-500/20 outline-none transition-all cursor-pointer w-full"
                >
                  {groups.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1 flex-1 min-w-[140px] sm:min-w-[200px]">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Domain</span>
                <div className="bg-white border border-slate-200 rounded-xl p-1 flex shadow-sm w-full">
                  {subjects.map(s => (
                    <button
                      key={s}
                      onClick={() => dispatch(setSubjectFilter(s))}
                      className={`flex-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap ${
                        filters.subject === s ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {s === 'English' ? 'RW' : s === 'Both' ? 'ALL' : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SPACE AFTER STICKY HEADER */}
      <div className="h-8 md:h-12" />

      {/* COMPACT ORBITAL PODIUM - OVERFLOW-VISIBLE FOR RANK NUMBERS */}
      {students.length > 0 && (
        <div className="relative h-[280px] sm:h-[340px] mb-8 md:mb-12 flex items-center justify-center overflow-visible rounded-[40px] bg-white border border-slate-100 shadow-sm">
          {/* Decorative Elements - Clipped by their own container to keep it clean */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden rounded-[40px]">
             <div className="w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] border border-slate-900 rounded-full animate-spin-slow"></div>
             <div className="absolute w-[180px] h-[180px] sm:w-[330px] sm:h-[330px] border border-slate-900 rounded-full"></div>
          </div>

          {/* Rank 2 - Silver Flow */}
          {topThree[1] && (
            <div 
              className="podium-orb absolute left-[5%] sm:left-[15%] flex flex-col items-center group cursor-pointer z-10"
              onMouseEnter={() => { setHovered(topThree[1]); }}
              onMouseLeave={() => { setHovered(null); }}
              onClick={() => handleRowClick(topThree[1])}
            >
              <div className="rank-number-bg rank-silver">2</div>
              <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center relative transition-transform group-hover:scale-105 ${topThree[1].id === 'me' ? 'bg-rose-50 ring-4 ring-rose-500' : 'bg-white shadow-xl border border-slate-100'}`}>
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xl sm:text-2xl overflow-hidden border-2 border-white">
                   {topThree[1].avatar}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-slate-200 rounded-full flex items-center justify-center font-black text-slate-700 border-2 border-white text-[10px] sm:text-xs">2</div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-[10px] sm:text-sm font-black text-slate-900 truncate max-w-[80px] sm:max-w-none">{topThree[1].name.split(' ')[0]}</p>
                <div className="text-sm sm:text-lg font-black text-rose-600 leading-none">{topThree[1].displayCorrect} <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-widest">OK</span></div>
              </div>
            </div>
          )}

          {/* Rank 1 - Gold Flow */}
          {topThree[0] && (
            <div 
              className="podium-orb flex flex-col items-center group cursor-pointer z-20"
              onMouseEnter={() => { setHovered(topThree[0]); }}
              onMouseLeave={() => { setHovered(null); }}
              onClick={() => handleRowClick(topThree[0])}
            >
              <div className="rank-number-bg rank-gold">1</div>
              <div className={`w-32 h-32 sm:w-44 sm:h-44 rounded-full flex items-center justify-center relative transition-transform group-hover:scale-105 ${topThree[0].id === 'me' ? 'podium-orb-pulse ring-4 sm:ring-8 ring-rose-500' : 'bg-white shadow-2xl border-2 border-rose-50'}`}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 to-rose-700 p-1">
                   <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-3xl sm:text-5xl overflow-hidden border-2 sm:border-4 border-white">
                      {topThree[0].avatar}
                   </div>
                </div>
                <div className="absolute -top-2 sm:-top-4 -right-1 sm:-right-2 w-10 h-10 sm:w-14 sm:h-14 bg-rose-600 rounded-full flex items-center justify-center font-black text-white border-2 sm:border-4 border-white shadow-lg animate-bounce">
                  <Star className="w-5 h-5 sm:w-7 sm:h-7 fill-current" />
                </div>
              </div>
              <div className="mt-4 sm:mt-6 text-center bg-white/90 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg border border-rose-50 relative z-10">
                <p className="text-sm sm:text-lg font-black text-slate-900 leading-tight">{topThree[0].name}</p>
                <div className="text-xl sm:text-3xl font-black text-slate-900 tabular-nums">
                  {topThree[0].displayCorrect}
                  <span className="text-rose-600 text-sm sm:text-lg ml-0.5"> / {topThree[0].displayTotal}</span>
                </div>
              </div>
            </div>
          )}

          {/* Rank 3 - Bronze Flow */}
          {topThree[2] && (
            <div 
              className="podium-orb absolute right-[5%] sm:right-[15%] flex flex-col items-center group cursor-pointer z-10"
              onMouseEnter={() => { setHovered(topThree[2]); }}
              onMouseLeave={() => { setHovered(null); }}
              onClick={() => handleRowClick(topThree[2])}
            >
              <div className="rank-number-bg rank-bronze">3</div>
              <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center relative transition-transform group-hover:scale-105 ${topThree[2].id === 'me' ? 'bg-rose-50 ring-4 ring-rose-500' : 'bg-white shadow-xl border border-slate-100'}`}>
                 <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xl sm:text-2xl overflow-hidden border-2 border-white">
                   {topThree[2].avatar}
                 </div>
                 <div className="absolute -top-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center font-black text-orange-600 border-2 border-white text-[10px] sm:text-xs">3</div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-[10px] sm:text-sm font-black text-slate-900 truncate max-w-[80px] sm:max-w-none">{topThree[2].name.split(' ')[0]}</p>
                <div className="text-sm sm:text-lg font-black text-rose-600 leading-none">{topThree[2].displayCorrect} <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-widest">OK</span></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Table Content */}
      <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-xl overflow-hidden mb-10">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-4 md:py-5 px-4 md:px-8 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Pos</th>
                <th className="py-4 md:py-5 px-4 md:px-8 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="py-4 md:py-5 px-4 md:px-8 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Solved</th>
                <th className="py-4 md:py-5 px-4 md:px-8 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Accuracy</th>
                <th className="py-4 md:py-5 px-4 md:px-8 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">SAT Projection</th>
                <th className="py-4 md:py-5 px-4 md:px-8 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mobile-hide">Growth</th>
              </tr>
            </thead>
            <tbody>
              {others.map((student, idx) => (
                <tr 
                  key={student.id} 
                  onMouseEnter={() => setHovered(student)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleRowClick(student)}
                  className={`leaderboard-row border-b border-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer ${student.id === 'me' ? 'user-row-highlight' : ''}`}
                >
                  <td className="py-4 md:py-6 px-4 md:px-8">
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className={`text-xs md:text-sm font-black ${student.id === 'me' ? 'text-rose-600' : 'text-slate-300 group-hover:text-slate-900'}`}>#{idx + 4}</span>
                      <div className="mobile-hide">{getTrendIcon(student.trend)}</div>
                    </div>
                  </td>
                  <td className="py-4 md:py-6 px-4 md:px-8">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-8 h-8 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-xs md:text-sm font-bold border ${student.id === 'me' ? 'bg-rose-600 text-white border-rose-500 shadow-md' : 'bg-white text-slate-900 border-slate-200'}`}>
                        {student.avatar}
                      </div>
                      <div className="overflow-hidden">
                        <p className={`text-xs md:text-base font-bold truncate flex items-center gap-1.5 ${student.id === 'me' ? 'text-rose-700' : 'text-slate-900 group-hover:text-rose-600'}`}>
                          {student.name}
                        </p>
                        <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{student.group}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 md:py-6 px-4 md:px-8 text-center">
                    <span className="text-xs md:text-lg font-black text-slate-900 tabular-nums">
                      {student.displayCorrect}
                      <span className="text-slate-300 font-bold ml-1 text-[10px] md:text-sm">/ {student.displayTotal}</span>
                    </span>
                  </td>
                  <td className="py-4 md:py-6 px-4 md:px-8 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[10px] md:text-sm font-black ${student.id === 'me' ? 'text-rose-600' : 'text-slate-900'}`}>{student.accuracy}%</span>
                      <div className="w-10 md:w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${student.id === 'me' ? 'bg-rose-600' : 'bg-slate-700'}`} style={{ width: `${student.accuracy}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 md:py-6 px-4 md:px-8 text-center">
                     <div className="px-2 md:px-4 py-1 md:py-1.5 bg-slate-50 rounded-lg inline-block border border-slate-100">
                        <span className="text-[10px] md:text-sm font-black text-slate-600">
                          {filters.subject === 'Math' ? student.math : filters.subject === 'English' ? student.rw : student.math + student.rw}
                        </span>
                     </div>
                  </td>
                  <td className="py-4 md:py-6 px-4 md:px-8 text-center mobile-hide">
                    <span className={`text-sm font-black ${student.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {student.growth >= 0 ? '+' : ''}{student.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

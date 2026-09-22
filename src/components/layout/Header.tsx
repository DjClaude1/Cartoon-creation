import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Tv, 
  ShieldCheck, 
  Bot, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    isDemoMode, 
    setIsDemoMode, 
    user, 
    setUserRole, 
    activeEpisode,
    setCurrentView 
  } = useApp();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Brand & Active Episode context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20 ring-2 ring-amber-400/30">
            <span className="text-xl select-none">🦊</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-fun">
                MILO & MOMO
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20">
                TOON FACTORY
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-[280px]">
              Series: <span className="text-slate-200 font-medium">Milo & Momo's Wonder Garden</span>
            </p>
          </div>
        </div>

        {activeEpisode && (
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs text-slate-300">
            <span className="text-slate-500">Working On:</span>
            <button 
              onClick={() => setCurrentView('episode_studio')}
              className="font-medium text-amber-300 hover:underline flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700"
            >
              <Tv className="w-3.5 h-3.5 text-amber-400" />
              Ep {activeEpisode.episodeNumber}: {activeEpisode.title}
              <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-semibold ${
                activeEpisode.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                activeEpisode.status === 'PUBLISHED' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                activeEpisode.status === 'REVIEW' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-slate-700 text-slate-300'
              }`}>
                {activeEpisode.status.replace('_', ' ')}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Right controls: Demo Mode Toggle, Role Switcher, Studio Profile */}
      <div className="flex items-center gap-4">
        {/* Prominent Demo Mode Switch */}
        <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-full">
          <div className="flex items-center gap-1.5">
            <Sparkles className={`w-3.5 h-3.5 ${isDemoMode ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="text-xs font-semibold text-slate-300">DEMO MODE</span>
          </div>
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            aria-label="Toggle Demo Mode"
            className={`w-10 h-5 rounded-full transition-colors relative focus:outline-none ${
              isDemoMode ? 'bg-amber-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                isDemoMode ? 'transform translate-x-5' : ''
              }`}
            />
          </button>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            {isDemoMode ? 'No Paid APIs' : 'Live Cloud'}
          </span>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-lg text-xs">
          <UserCheck className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-400 text-[11px] hidden md:inline">Role:</span>
          <select 
            value={user.role} 
            onChange={(e) => setUserRole(e.target.value as any)}
            className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer text-xs"
          >
            <option value="owner" className="bg-slate-900 text-white">Owner (Full Studio)</option>
            <option value="admin" className="bg-slate-900 text-white">Admin</option>
            <option value="editor" className="bg-slate-900 text-white">Editor (No Publish)</option>
            <option value="reviewer" className="bg-slate-900 text-white">Reviewer</option>
          </select>
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white ring-2 ring-indigo-400/40">
            MG
          </div>
          <div className="hidden xl:block text-left text-xs leading-tight">
            <div className="font-semibold text-slate-200">{user.displayName}</div>
            <div className="text-[10px] text-slate-400 capitalize">{user.role} Access</div>
          </div>
        </div>
      </div>
    </header>
  );
};

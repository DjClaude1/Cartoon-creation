import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Film, 
  PenTool, 
  Grid3X3, 
  Mic, 
  PlaySquare, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Youtube, 
  Sparkles, 
  Activity, 
  Settings as SettingsIcon,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, episodes, activeEpisode } = useApp();

  const reviewCount = episodes.filter(e => e.status === 'REVIEW').length;

  const navSections = [
    {
      label: 'STUDIO OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'series_bible', label: 'Series Bible', icon: BookOpen },
        { id: 'characters', label: 'Characters', icon: Users, badge: 'Milo & Momo' },
        { id: 'episodes', label: 'Episodes', icon: Film, badge: `${episodes.length}` },
      ]
    },
    {
      label: 'PRODUCTION PIPELINE',
      items: [
        { id: 'episode_studio', label: 'Episode Studio', icon: PenTool },
        { id: 'scene_board', label: 'Scene Board', icon: Grid3X3, badge: `${activeEpisode?.scenes?.length || 14}` },
        { id: 'audio_studio', label: 'Audio Studio', icon: Mic },
        { id: 'animation_studio', label: 'Animation Studio', icon: PlaySquare },
        { id: 'render_center', label: 'Render Center', icon: Cpu },
      ]
    },
    {
      label: 'QUALITY & RELEASE',
      items: [
        { id: 'qa_center', label: 'QA Center', icon: ShieldCheck },
        { 
          id: 'approval_queue', 
          label: 'Approval Queue', 
          icon: CheckCircle2, 
          badge: reviewCount > 0 ? `${reviewCount} Waiting` : undefined,
          badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
        },
        { id: 'youtube', label: 'YouTube Studio', icon: Youtube },
        { id: 'automation', label: 'Daily Automation', icon: Clock },
        { id: 'job_monitor', label: 'Job Monitor', icon: Activity },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: SettingsIcon },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 select-none">
      {/* Mini character greeting badge */}
      <div className="p-4 mx-3 my-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 border border-slate-800 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-lg shadow-inner">
            🦊
          </div>
          <span className="absolute -top-1 -right-1 text-xs">☁️</span>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-200">Wonder Garden</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Studio Live (2-5m Ep)
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {navSections.map((section) => (
          <div key={section.label} className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {section.label}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-300 border border-amber-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      item.badgeColor || (isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-400')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Presets / IP Protection Banner */}
      <div className="p-3 border-t border-slate-800 text-slate-400 text-[11px] bg-slate-950/40">
        <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Strict Original IP Enforced</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Preschool safe, non-scary, zero copyrighted characters.
        </p>
      </div>
    </aside>
  );
};

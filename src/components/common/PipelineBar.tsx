import React from 'react';
import { 
  Lightbulb, 
  BookOpen, 
  FileText, 
  Grid3X3, 
  Image as ImageIcon, 
  Mic, 
  PlaySquare, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Youtube, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { EpisodeStatus } from '../../types';

interface PipelineBarProps {
  status: EpisodeStatus;
  onNavigate?: (view: string) => void;
}

export const PipelineBar: React.FC<PipelineBarProps> = ({ status, onNavigate }) => {
  const stages = [
    { key: 'DRAFT', label: 'Idea & Story', icon: Lightbulb, view: 'episode_studio' },
    { key: 'SCRIPT_READY', label: 'Script & Scenes', icon: FileText, view: 'scene_board' },
    { key: 'ASSETS_READY', label: 'Audio & Visuals', icon: Mic, view: 'audio_studio' },
    { key: 'RENDERING', label: 'Animation & Render', icon: Cpu, view: 'render_center' },
    { key: 'REVIEW', label: 'QA Inspection', icon: ShieldCheck, view: 'qa_center' },
    { key: 'APPROVED', label: 'Human Approval', icon: CheckCircle2, view: 'approval_queue' },
    { key: 'SCHEDULED', label: 'Scheduled', icon: Calendar, view: 'automation' },
    { key: 'PUBLISHED', label: 'YouTube Live', icon: Youtube, view: 'youtube' },
  ];

  const getStatusRank = (s: EpisodeStatus) => {
    switch (s) {
      case 'DRAFT': return 0;
      case 'SCRIPT_READY': return 1;
      case 'ASSETS_READY': return 2;
      case 'RENDERING': return 3;
      case 'REVIEW': return 4;
      case 'APPROVED': return 5;
      case 'SCHEDULED': return 6;
      case 'PUBLISHED': return 7;
      case 'FAILED': return -1;
      default: return 0;
    }
  };

  const currentRank = getStatusRank(status);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-slate-200 uppercase tracking-wider">
            Episode Production Pipeline
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Current Phase:</span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
            status === 'REVIEW' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
            status === 'PUBLISHED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
            'bg-slate-800 text-amber-300'
          }`}>
            {status.replace('_', ' ')}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 hidden sm:block">
          Step {Math.min(currentRank + 1, 8)} of 8 Stages
        </div>
      </div>

      {/* Steps visualization */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isPassed = currentRank > idx;
          const isCurrent = currentRank === idx;
          const isUpcoming = currentRank < idx;

          return (
            <button
              key={stage.key}
              onClick={() => onNavigate && onNavigate(stage.view)}
              className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                isCurrent
                  ? 'bg-amber-500/20 border-amber-400/60 shadow-lg shadow-amber-500/10'
                  : isPassed
                  ? 'bg-emerald-950/30 border-emerald-500/30 hover:bg-emerald-900/30'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:bg-slate-800/40'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-amber-400 animate-pulse" />
              )}
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                  isCurrent 
                    ? 'bg-amber-400 text-slate-950 font-bold' 
                    : isPassed 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isPassed ? '✓' : idx + 1}
                </div>
                <Icon className={`w-3.5 h-3.5 ${
                  isCurrent ? 'text-amber-400' : isPassed ? 'text-emerald-400' : 'text-slate-500'
                }`} />
              </div>
              <div className={`text-[11px] font-bold leading-tight ${
                isCurrent ? 'text-amber-300' : isPassed ? 'text-emerald-300' : 'text-slate-400'
              }`}>
                {stage.label}
              </div>
              <div className="text-[9px] text-slate-500 capitalize mt-0.5 flex items-center gap-1">
                {isCurrent ? 'In progress' : isPassed ? 'Completed' : 'Queued'}
                <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Film, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Youtube, 
  AlertCircle, 
  ArrowRight, 
  Play, 
  Sparkles, 
  TrendingUp, 
  Eye, 
  ThumbsUp, 
  UserPlus,
  Compass,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PipelineBar } from '../common/PipelineBar';

export const DashboardView: React.FC = () => {
  const { 
    episodes, 
    activeEpisode, 
    setActiveEpisode, 
    setCurrentView, 
    automation, 
    jobs,
    runFullPipelineDemo,
    isDemoMode 
  } = useApp();

  const totalEpisodes = episodes.length;
  const waitingApproval = episodes.filter(e => e.status === 'REVIEW').length;
  const scheduledCount = episodes.filter(e => e.status === 'SCHEDULED').length;
  const publishedCount = episodes.filter(e => e.status === 'PUBLISHED').length;
  const failedJobsCount = jobs.filter(j => j.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 p-6 md:p-8">
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none translate-x-8 translate-y-8">
          <span className="text-[180px]">🦊</span>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preschool Daily Cartoon Engine (Ages 4–8)</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-fun mb-2">
            Milo & Momo Toon Factory
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Automated production studio for <strong className="text-amber-300 font-semibold">"Milo & Momo's Wonder Garden"</strong>. 
            Generate stories, structured scripts, 14-scene storyboards, voices, animations, and QA checks for daily 2–5 minute preschool YouTube releases.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => setCurrentView('episode_studio')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Create New Episode
            </button>
            <button
              onClick={() => {
                if (activeEpisode) runFullPipelineDemo(activeEpisode.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              Simulate Full Pipeline (Demo)
            </button>
            <button
              onClick={() => setCurrentView('series_bible')}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              Series Bible
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Episodes</span>
            <Film className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-fun">{totalEpisodes}</div>
          <div className="text-[10px] text-slate-500 mt-1">Total in database</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Waiting Approval</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-fun">{waitingApproval}</div>
          <div className="text-[10px] text-amber-400/80 mt-1">Requires human review</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Scheduled</span>
            <Calendar className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white font-fun">{scheduledCount}</div>
          <div className="text-[10px] text-slate-500 mt-1">Next: Tomorrow 7am</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Published</span>
            <Youtube className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-white font-fun">{publishedCount}</div>
          <div className="text-[10px] text-slate-500 mt-1">On YouTube Kids</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Failed Jobs</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-white font-fun">{failedJobsCount}</div>
          <div className="text-[10px] text-slate-500 mt-1">Auto-retry active (3x)</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Today's Status</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Active (Ep 1)
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Pipeline On Track</div>
        </div>
      </div>

      {/* Active Pipeline Flow Card */}
      {activeEpisode && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Active Production Focus: Episode {activeEpisode.episodeNumber} - "{activeEpisode.title}"
            </h2>
            <button
              onClick={() => setCurrentView('approval_queue')}
              className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              Open Approval Queue <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <PipelineBar status={activeEpisode.status} onNavigate={setCurrentView} />
        </div>
      )}

      {/* Featured Starter Episode Overview + Production Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Episode 1 Card */}
        {activeEpisode && (
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <span>STARTER EPISODE {activeEpisode.episodeNumber}</span>
                  <span>•</span>
                  <span>{activeEpisode.scenesCount} SCENES</span>
                  <span>•</span>
                  <span>~{Math.round(activeEpisode.totalDurationSeconds / 60)} MINS</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-fun">
                  {activeEpisode.title}
                </h3>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                activeEpisode.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                activeEpisode.status === 'REVIEW' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-slate-800 text-slate-300'
              }`}>
                {activeEpisode.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {activeEpisode.logline}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-0.5">Educational Moral:</span>
                <span className="text-slate-200 font-medium">{activeEpisode.moral}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-0.5">Target Audience:</span>
                <span className="text-slate-200 font-medium">{activeEpisode.targetAge} (Preschool / Kindergarten)</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
              <button 
                onClick={() => setCurrentView('scene_board')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                Storyboard (14 Scenes)
              </button>
              <button 
                onClick={() => setCurrentView('audio_studio')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                Narration & Voice Studio
              </button>
              <button 
                onClick={() => setCurrentView('qa_center')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                QA Check Report
              </button>
              <button 
                onClick={() => setCurrentView('approval_queue')}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-amber-500/30 ml-auto"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Human Approval
              </button>
            </div>
          </div>
        )}

        {/* Channel Analytics Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-rose-500" />
                Channel Health & Metrics
              </h3>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                30 Day Performance
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Real-time analytics monitor for YouTube preschool series. Monetization depends on YouTube eligibility.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  <span>Estimated Views</span>
                </div>
                <span className="font-bold text-white">14,850</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Watch Time (Mins)</span>
                </div>
                <span className="font-bold text-white">42,100 min</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Subscribers Gained</span>
                </div>
                <span className="font-bold text-emerald-400">+340</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                  <span>Average Retention</span>
                </div>
                <span className="font-bold text-purple-400">78.5% (High)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 text-[11px] text-slate-500">
            Automated publishing scheduled daily at 07:00 AM EST.
          </div>
        </div>
      </div>
    </div>
  );
};

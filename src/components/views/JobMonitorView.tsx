import React from 'react';
import { 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Cpu, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const JobMonitorView: React.FC = () => {
  const { jobs, retryJob } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Activity className="w-4 h-4" />
            <span>BACKGROUND WORKER & PIPELINE JOBS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Production Job Monitor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track asynchronous background jobs: story ideation, script rendering, TTS voice synthesis, animation, and video exports.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>Queue Status: <strong>Optimal (0 Lag)</strong></span>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Job ID & Type</th>
                <th className="px-6 py-4">Episode</th>
                <th className="px-6 py-4">Provider / Worker</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Started At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {jobs.map((job) => {
                const isRunning = job.status === 'running';
                const isCompleted = job.status === 'completed';
                const isFailed = job.status === 'failed';

                return (
                  <tr key={job.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white font-mono">{job.id}</div>
                      <div className="text-[10px] uppercase font-bold text-amber-400 mt-0.5">
                        {job.type}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200">{job.episodeTitle}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{job.episodeId}</div>
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {job.provider}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        isRunning ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                        isFailed ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {isRunning && <RefreshCw className="w-2.5 h-2.5 animate-spin" />}
                        {isCompleted && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {isFailed && <XCircle className="w-2.5 h-2.5" />}
                        {job.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="text-[10px] font-semibold text-slate-400 mb-1">
                          {job.progressPercent}%
                        </div>
                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${isFailed ? 'bg-rose-500' : 'bg-emerald-400'}`}
                            style={{ width: `${job.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-400 text-[11px]">
                      {job.startedAt}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {isFailed && (
                        <button
                          onClick={() => retryJob(job.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 ml-auto border border-slate-700"
                        >
                          <RotateCcw className="w-3 h-3 text-amber-400" />
                          Retry
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

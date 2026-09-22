import React, { useState } from 'react';
import { 
  Clock, 
  Settings as SettingsIcon, 
  Play, 
  Pause, 
  RefreshCw, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  Save 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AutomationSettings } from '../../types';

export const DailyAutomationView: React.FC = () => {
  const { automation, updateAutomation, logAction, user } = useApp();
  const [formState, setFormState] = useState<AutomationSettings>(automation);
  const [savedNotice, setSavedNotice] = useState(false);

  const canEdit = user.role === 'owner' || user.role === 'admin';

  const handleSave = async () => {
    await updateAutomation(formState);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleToggleActive = async () => {
    const updated = { ...formState, enabled: !formState.enabled };
    setFormState(updated);
    await updateAutomation(updated);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Clock className="w-4 h-4" />
            <span>CRON SCHEDULE & AUTOMATION ENGINE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Daily Production Automation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automates daily episode ideation, script generation, and render staging. Strictly preserves the human approval gate.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Check className="w-4 h-4" /> Settings Saved
            </span>
          )}
          {canEdit && (
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Schedule
            </button>
          )}
        </div>
      </div>

      {/* Primary Invariant Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-300">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
        <div>
          <strong className="block font-bold">Immutable System Rule:</strong>
          Automation produces drafts, scripts, voices, and QA inspections, but <strong>NEVER bypasses human approval</strong> prior to publishing.
        </div>
      </div>

      {/* Main Settings Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            Schedule Cadence & Timing
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Cadence Mode</label>
            <select
              value={formState.frequency}
              onChange={(e) => setFormState({ ...formState, frequency: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="daily">Daily Episode (1 Episode Every Morning)</option>
              <option value="weekly">Weekly Release (Batch of 5)</option>
              <option value="manual">Manual Studio Mode</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Production Start Time</label>
              <input
                type="text"
                value={formState.productionTime}
                onChange={(e) => setFormState({ ...formState, productionTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                placeholder="04:00 AM"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Target Publishing Time</label>
              <input
                type="text"
                value={formState.publishingTime}
                onChange={(e) => setFormState({ ...formState, publishingTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                placeholder="07:00 AM"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Studio Timezone</label>
            <input
              type="text"
              value={formState.timezone}
              onChange={(e) => setFormState({ ...formState, timezone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Automation Status & Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              Scheduler Health & Monitoring
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-500 font-semibold block">Last Scheduled Run:</span>
                <span className="font-bold text-slate-200">{formState.lastRunAt || 'Today at 04:00 AM'}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-500 font-semibold block">Next Scheduled Run:</span>
                <span className="font-bold text-amber-400">{formState.nextRunAt || 'Tomorrow at 04:00 AM'}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Automatic Draft Creation:</span>
                <span className="text-emerald-400 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Retry Count on Job Failure:</span>
                <span className="text-slate-200 font-bold">3 Attempts with Backoff</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleToggleActive}
              className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                formState.enabled
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              {formState.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {formState.enabled ? 'Automation Active (Pause)' : 'Automation Paused (Activate)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Key, 
  Database, 
  Users, 
  History, 
  Save, 
  Check, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { 
    user, 
    setUserRole, 
    auditLogs, 
    youtubeSettings, 
    updateYouTubeSettings,
    isDemoMode,
    setIsDemoMode 
  } = useApp();

  const [savedNotice, setSavedNotice] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <SettingsIcon className="w-4 h-4" />
            <span>STUDIO SYSTEM CONFIGURATION</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Settings & Security Governance
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Role-based access control, security invariants, provider modes, and audit logging.
          </p>
        </div>
      </div>

      {/* Security Invariant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User & Role Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            Role & Authorization Simulation
          </h2>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <div>
              <span className="text-slate-500 font-medium block">Current User:</span>
              <span className="font-bold text-white text-sm">{user.displayName} ({user.email})</span>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Assigned Role:</label>
              <select
                value={user.role}
                onChange={(e) => setUserRole(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="owner">Owner (Full studio rights, publishing, settings)</option>
                <option value="admin">Admin (Approval, creation, publishing)</option>
                <option value="editor">Editor (Script, scenes, audio only - No approval/publish)</option>
                <option value="reviewer">Reviewer (QA inspection, approval decisions)</option>
              </select>
            </div>

            <div className="text-[11px] text-slate-500 pt-1">
              *Only <strong>owner</strong> and <strong>admin</strong> users have permissions to configure external APIs or release episodes.
            </div>
          </div>
        </div>

        {/* Database & Cloud State */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Persistence & Firebase Status
          </h2>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Database Engine:</span>
              <span className="text-white font-semibold">Google Cloud Firestore</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Database ID:</span>
              <span className="text-amber-400 font-mono text-[11px]">ai-studio-573d4794-199c-4865-af48-86105fcc5726</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Rules Deployment:</span>
              <span className="text-emerald-400 font-bold">firestore.rules active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Mode:</span>
              <span className="text-slate-300 font-semibold">{isDemoMode ? 'Demo Sandbox Mode' : 'Live Cloud Engine'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-purple-400" />
            Executive Audit Trail & Action Log
          </h2>
          <span className="text-xs text-slate-500">{auditLogs.length} Logged Events</span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400 font-mono text-[11px]">
                    {log.action}
                  </span>
                  <span className="text-[10px] text-slate-500">by {log.userEmail}</span>
                </div>
                <p className="text-slate-300 text-xs">{log.details}</p>
              </div>

              <span className="text-[10px] text-slate-500 font-mono shrink-0">
                {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

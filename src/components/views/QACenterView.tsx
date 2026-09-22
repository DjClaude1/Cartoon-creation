import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  FileText, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QAReport } from '../../types';

export const QACenterView: React.FC = () => {
  const { 
    activeEpisode, 
    qaReports, 
    runQAForEpisode, 
    setCurrentView 
  } = useApp();

  const [isRunningQA, setIsRunningQA] = useState(false);
  const [currentReport, setCurrentReport] = useState<QAReport | null>(null);

  useEffect(() => {
    if (activeEpisode) {
      if (qaReports[activeEpisode.id]) {
        setCurrentReport(qaReports[activeEpisode.id]);
      } else {
        handleRunQA();
      }
    }
  }, [activeEpisode?.id]);

  if (!activeEpisode) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
        No active episode selected.
      </div>
    );
  }

  const handleRunQA = async () => {
    setIsRunningQA(true);
    try {
      const rep = await runQAForEpisode(activeEpisode);
      setCurrentReport(rep);
    } finally {
      setIsRunningQA(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>AUTOMATED QUALITY ASSURANCE ENGINE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            QA Inspection Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated compliance check for preschool safety, non-violence, zero copyrighted references, and completeness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunQA}
            disabled={isRunningQA}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRunningQA ? 'animate-spin' : ''}`} />
            {isRunningQA ? 'Auditing Episode...' : 'Re-Run QA Checks'}
          </button>

          {currentReport?.passed && (
            <button
              onClick={() => setCurrentView('approval_queue')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              Proceed to Approval Queue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Score Summary Box */}
      {currentReport && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
            <span className="text-xs text-slate-400 uppercase font-bold mb-1">Overall QA Score</span>
            <div className={`text-5xl font-black font-fun ${
              currentReport.score >= 90 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {currentReport.score}%
            </div>
            <span className="text-[11px] text-slate-500 mt-1">
              {currentReport.passed ? 'Ready for Human Approval' : 'Action Required'}
            </span>
          </div>

          <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {currentReport.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                )}
                <h3 className="font-bold text-base text-white font-fun">
                  {currentReport.passed ? 'Preschool Safety & Quality Passed' : 'QA Attention Required'}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentReport.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Critical Issues: <strong>{currentReport.criticalIssuesCount}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Warnings: <strong>{currentReport.warningIssuesCount}</strong></span>
              </div>
              <div className="text-slate-500 ml-auto">
                Audited at: {currentReport.generatedAt}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Checks List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-sky-400" />
          Detailed Checklist & Verification Points
        </h2>

        <div className="space-y-2.5">
          {currentReport?.checks.map((check) => (
            <div
              key={check.id}
              className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                check.passed 
                  ? 'bg-slate-950/60 border-slate-800' 
                  : check.severity === 'critical'
                  ? 'bg-rose-950/20 border-rose-800/40'
                  : 'bg-amber-950/20 border-amber-800/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : check.severity === 'critical' ? (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">
                      {check.name}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      check.category === 'safety' ? 'bg-purple-500/20 text-purple-300' :
                      check.category === 'compliance' ? 'bg-sky-500/20 text-sky-300' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {check.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {check.message}
                  </p>
                  {check.details && (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {check.details}
                    </p>
                  )}
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                check.passed 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : check.severity === 'critical' 
                  ? 'bg-rose-500/20 text-rose-400' 
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {check.passed ? 'PASSED' : check.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

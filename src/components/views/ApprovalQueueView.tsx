import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  UserCheck, 
  ShieldCheck, 
  History, 
  MessageSquare, 
  Clock, 
  Sparkles,
  ArrowRight,
  Tv
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const ApprovalQueueView: React.FC = () => {
  const { 
    episodes, 
    activeEpisode, 
    setActiveEpisode, 
    submitApprovalDecision, 
    user, 
    setCurrentView 
  } = useApp();

  const [comments, setComments] = useState('Reviewed 14 scenes, soundscape, and narrative. Gentle preschool tone approved for production release.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Episodes requiring review
  const pendingEpisodes = episodes.filter(e => e.status === 'REVIEW' || e.status === 'ASSETS_READY' || e.status === 'SCRIPT_READY');
  const targetEpisode = activeEpisode || pendingEpisodes[0] || null;

  const canApprove = user.role === 'owner' || user.role === 'admin' || user.role === 'reviewer';

  const handleApprove = async () => {
    if (!targetEpisode) return;
    setIsSubmitting(true);
    const success = await submitApprovalDecision(targetEpisode.id, 'APPROVED', comments);
    setIsSubmitting(false);

    if (success) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setSuccessMessage(`Episode "${targetEpisode.title}" successfully approved! Now unlocked for YouTube scheduling & publishing.`);
    }
  };

  const handleReject = async () => {
    if (!targetEpisode) return;
    setIsSubmitting(true);
    await submitApprovalDecision(targetEpisode.id, 'REJECTED', comments || 'Changes requested during human review');
    setIsSubmitting(false);
    setSuccessMessage(`Episode "${targetEpisode.title}" returned to draft for revisions.`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>MANDATORY HUMAN APPROVAL GATEWAY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Executive Approval Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Strict human-in-the-loop security: No episode can ever be published publicly without explicit human signoff.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-semibold">{user.displayName}</span>
          <span className="text-[10px] uppercase font-bold text-amber-400">({user.role})</span>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setCurrentView('youtube')}
            className="underline font-bold hover:text-white"
          >
            Go to YouTube Studio →
          </button>
        </div>
      )}

      {/* Main Review Card */}
      {targetEpisode ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
                <span>EPISODE #{targetEpisode.episodeNumber}</span>
                <span>•</span>
                <span>STATUS: {targetEpisode.status.replace('_', ' ')}</span>
              </div>
              <h2 className="text-2xl font-black text-white font-fun">
                {targetEpisode.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('qa_center')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                View QA Scorecard
              </button>
              <button
                onClick={() => setCurrentView('render_center')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                <Tv className="w-3.5 h-3.5 text-sky-400" />
                Watch Render Master
              </button>
            </div>
          </div>

          {/* Episode Attributes Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-500 font-semibold block mb-1">Educational Lesson:</span>
              <p className="text-slate-200">{targetEpisode.lesson}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-500 font-semibold block mb-1">Duration & Scenes:</span>
              <p className="text-slate-200">{targetEpisode.scenesCount || 14} Scenes • ~{Math.round((targetEpisode.totalDurationSeconds || 196) / 60)} minutes</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-500 font-semibold block mb-1">YouTube Target:</span>
              <p className="text-slate-200 truncate">{targetEpisode.youtubeTitle || 'Standard Release'}</p>
            </div>
          </div>

          {/* Video Preview Frame */}
          <div className="aspect-video max-w-2xl mx-auto bg-black rounded-2xl overflow-hidden relative border border-slate-800">
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
              poster={targetEpisode.thumbnailUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Review Decision Box */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              Human Reviewer Decision & Feedback
            </div>

            <textarea
              rows={2}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter audit review comments, notes on character consistency, audio clarity, and safety..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Approval will be logged into immutable audit trail under your credentials.</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReject}
                  disabled={isSubmitting || !canApprove}
                  className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 font-semibold text-xs border border-rose-800/40 flex items-center gap-2 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  Request Revisions
                </button>

                <button
                  onClick={handleApprove}
                  disabled={isSubmitting || !canApprove}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isSubmitting ? 'Recording Approval...' : 'Approve Episode For Release'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
          No episodes currently pending review.
        </div>
      )}
    </div>
  );
};

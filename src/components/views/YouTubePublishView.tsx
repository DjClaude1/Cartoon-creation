import React, { useState } from 'react';
import { 
  Youtube, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Lock, 
  Globe, 
  Sparkles, 
  Clock, 
  Tag, 
  Calendar,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const YouTubePublishView: React.FC = () => {
  const { 
    activeEpisode, 
    youtubeSettings, 
    updateYouTubeSettings, 
    publishEpisodeToYouTube, 
    user,
    setCurrentView 
  } = useApp();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ url?: string; error?: string } | null>(null);

  if (!activeEpisode) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
        No active episode selected.
      </div>
    );
  }

  const isApproved = activeEpisode.status === 'APPROVED';
  const isPublished = activeEpisode.status === 'PUBLISHED';
  const canPublish = (user.role === 'owner' || user.role === 'admin') && isApproved;

  const handlePublish = async () => {
    setIsUploading(true);
    setUploadResult(null);
    try {
      const res = await publishEpisodeToYouTube(activeEpisode.id);
      if (res.success) {
        setUploadResult({ url: res.url });
      } else {
        setUploadResult({ error: res.error });
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-500 mb-1">
            <Youtube className="w-4 h-4" />
            <span>YOUTUBE PUBLISHING ENGINE (YouTubeProvider)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            YouTube Release Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish approved 16:9 full episodes and 9:16 Shorts to YouTube Kids with automated Made-For-Kids compliance.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs">
          <Globe className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-slate-200 font-semibold">{youtubeSettings.channelName}</span>
          <span className="text-[10px] text-emerald-400 font-bold">● Connected</span>
        </div>
      </div>

      {/* Safety Gate Alert: If not approved */}
      {!isApproved && !isPublished && (
        <div className="p-5 rounded-3xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-4 shadow-xl">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-white font-fun">
              Publishing Protected: Human Approval Required
            </h3>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              Episode status is currently <span className="font-bold uppercase text-amber-400">{activeEpisode.status.replace('_', ' ')}</span>. 
              The system strictly prevents publishing unapproved content to YouTube. 
              An authorized reviewer must approve the episode in the Approval Queue first.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentView('approval_queue')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Go to Approval Queue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {uploadResult?.url && (
        <div className="p-5 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <div>
              <div className="font-bold text-white font-fun text-sm">
                Successfully Uploaded to YouTube!
              </div>
              <div className="text-emerald-300/90 text-xs">
                Video is live/scheduled according to channel settings.
              </div>
            </div>
          </div>
          <a
            href={uploadResult.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
          >
            Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Upload Details & Metadata Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Episode Metadata Package
          </h2>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Video Title:</span>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white font-medium">
                {activeEpisode.youtubeTitle}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Description:</span>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line max-h-36 overflow-y-auto">
                {activeEpisode.youtubeDescription}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Search Tags:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeEpisode.youtubeTags?.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Publishing Declaration & Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-sky-400" />
              Compliance Settings
            </h2>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <label className="flex items-center gap-2 text-slate-200 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={youtubeSettings.madeForKids}
                  onChange={(e) => updateYouTubeSettings({ ...youtubeSettings, madeForKids: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>Made for Kids (COPPA Compliant)</span>
              </label>
              <p className="text-[10px] text-slate-500 pl-5">
                Restricts ads, enforces safe comments, and optimizes for YouTube Kids discovery.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <label className="flex items-center gap-2 text-slate-200 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={youtubeSettings.containsSyntheticMedia}
                  onChange={(e) => updateYouTubeSettings({ ...youtubeSettings, containsSyntheticMedia: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>Synthetic Media / AI Disclosure</span>
              </label>
              <p className="text-[10px] text-slate-500 pl-5">
                Complies with YouTube policy regarding AI-assisted animation and tooling.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Release Visibility</label>
              <select
                value={youtubeSettings.defaultVisibility}
                onChange={(e) => updateYouTubeSettings({ ...youtubeSettings, defaultVisibility: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
              >
                <option value="public">Public (Immediate Family Reach)</option>
                <option value="unlisted">Unlisted (Review Link Only)</option>
                <option value="private">Private (Team Sandbox)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handlePublish}
              disabled={!canPublish || isUploading || isPublished}
              className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xl ${
                isPublished
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : canPublish
                  ? 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 text-white shadow-rose-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <UploadCloud className={`w-4 h-4 ${isUploading ? 'animate-bounce' : ''}`} />
              {isPublished 
                ? 'Already Published to YouTube' 
                : isUploading 
                ? 'Uploading to YouTube Data API...' 
                : isApproved 
                ? 'Publish to YouTube Now' 
                : 'Locked: Approval Required'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

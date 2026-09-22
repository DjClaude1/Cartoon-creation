import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  Smartphone, 
  Tv, 
  Download, 
  FileText, 
  Layers, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { providers } from '../../services/providers';

export const RenderCenterView: React.FC = () => {
  const { activeEpisode, updateEpisode, createJob, logAction, setCurrentView } = useApp();
  const [renderStage, setRenderStage] = useState<'idle' | 'preparing' | 'rendering' | 'encoding' | 'complete'>('complete');
  const [renderProgress, setRenderProgress] = useState(100);
  const [includeSubtitles, setIncludeSubtitles] = useState(true);

  if (!activeEpisode) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
        No active episode selected.
      </div>
    );
  }

  const renderProvider = providers.getRender();

  const handleStartRender = async () => {
    setRenderStage('preparing');
    setRenderProgress(15);
    await createJob('render', activeEpisode.id, activeEpisode.title);

    setTimeout(() => {
      setRenderStage('rendering');
      setRenderProgress(50);
    }, 1000);

    setTimeout(() => {
      setRenderStage('encoding');
      setRenderProgress(85);
    }, 2000);

    setTimeout(async () => {
      setRenderStage('complete');
      setRenderProgress(100);

      const res = await renderProvider.renderEpisode({
        scenes: activeEpisode.scenes,
        ratio: '16:9',
        withSubtitles: includeSubtitles
      });

      const updated = {
        ...activeEpisode,
        status: 'REVIEW' as const,
        video16x9Url: res.data?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        shorts9x16Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        updatedAt: new Date().toISOString()
      };

      await updateEpisode(updated);
      await logAction('RENDER_COMPLETED', `Rendered 16:9 Full Episode and 9:16 Shorts with Subtitles`, activeEpisode.id);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span>RENDER PIPELINE (RenderProvider)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Render Center & Output Compositor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Scene assets + approved narration + sound effects + subtitles = Broadcast-ready MP4.
          </p>
        </div>

        <button
          onClick={handleStartRender}
          disabled={renderStage !== 'complete' && renderStage !== 'idle'}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${renderStage !== 'complete' && renderStage !== 'idle' ? 'animate-spin' : ''}`} />
          {renderStage !== 'complete' && renderStage !== 'idle' ? 'Compositing...' : 'Render Master MP4'}
        </button>
      </div>

      {/* Progress Monitor */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            Pipeline Status: <span className="text-amber-400 capitalize">{renderStage}</span>
          </span>
          <span className="font-bold text-slate-400">{renderProgress}% Complete</span>
        </div>

        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${renderProgress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
          <div className={`p-3 rounded-2xl border ${
            renderStage === 'preparing' ? 'bg-amber-500/10 border-amber-400/40 text-amber-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'
          }`}>
            <span className="font-bold block">1. Preparing</span>
            <span className="text-[10px]">Stitching 14 scenes</span>
          </div>

          <div className={`p-3 rounded-2xl border ${
            renderStage === 'rendering' ? 'bg-amber-500/10 border-amber-400/40 text-amber-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'
          }`}>
            <span className="font-bold block">2. Rendering</span>
            <span className="text-[10px]">Visuals + Motion layers</span>
          </div>

          <div className={`p-3 rounded-2xl border ${
            renderStage === 'encoding' ? 'bg-amber-500/10 border-amber-400/40 text-amber-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'
          }`}>
            <span className="font-bold block">3. Encoding</span>
            <span className="text-[10px]">H.264 / AAC 1080p</span>
          </div>

          <div className={`p-3 rounded-2xl border ${
            renderStage === 'complete' ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'
          }`}>
            <span className="font-bold block">4. Complete</span>
            <span className="text-[10px]">Ready for QA review</span>
          </div>
        </div>
      </div>

      {/* Render Outputs Grid: 16:9 + 9:16 Shorts + Subtitles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 16:9 Full YouTube Episode */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-fun flex items-center gap-2">
              <Tv className="w-4 h-4 text-amber-400" />
              16:9 Full Episode Master (YouTube)
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              1080p FHD
            </span>
          </div>

          <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-slate-800">
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
              poster={activeEpisode.thumbnailUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Duration: ~{Math.round(activeEpisode.totalDurationSeconds / 60)} min</span>
            <span>File Size: ~68.4 MB</span>
          </div>
        </div>

        {/* 9:16 YouTube Shorts Version */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-fun flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-sky-400" />
              9:16 YouTube Shorts Cut (~45s)
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
              Vertical 1080x1920
            </span>
          </div>

          <div className="h-[280px] bg-black rounded-2xl overflow-hidden relative mx-auto aspect-[9/16] border border-slate-800">
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Duration: 45 sec (Shorts)</span>
            <span>File Size: ~32.1 MB</span>
          </div>
        </div>
      </div>

      {/* Subtitles & Captions Export */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            Subtitles & Closed Captions (SRT & VTT)
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => {
                const blob = new Blob([activeEpisode.subtitlesSrt || ''], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${activeEpisode.title.replace(/\s+/g, '_')}.srt`;
                a.click();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" /> Download SRT
            </button>
            <button
              onClick={() => {
                const blob = new Blob([activeEpisode.subtitlesVtt || ''], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${activeEpisode.title.replace(/\s+/g, '_')}.vtt`;
                a.click();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" /> Download VTT
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Subtitles automatically synchronize with narration timing to maximize preschool literacy, language comprehension, and YouTube accessibility.
        </p>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-28 overflow-y-auto">
          {activeEpisode.subtitlesSrt || '1\n00:00:00,000 --> 00:00:14,000\nWelcome to the Wonder Garden!'}
        </div>
      </div>
    </div>
  );
};

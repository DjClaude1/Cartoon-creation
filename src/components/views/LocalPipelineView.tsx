import React, { useState } from 'react';
import { Film, Loader2, Sparkles, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const API = 'http://localhost:3001';

export const LocalPipelineView: React.FC = () => {
  const { createEpisode, updateEpisode, setCurrentView, logAction } = useApp();
  const [topic, setTopic] = useState('kindness and caring for a tiny seed');
  const [lesson, setLesson] = useState('patience and kindness');
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const run = async () => {
    setRunning(true); setError(''); setResult(null);
    setMessage('Creating idea, story, script, scenes, narration and MP4 on this computer...');
    try {
      const response = await fetch(`${API}/api/local/auto`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, lesson, targetAge: '4-8' })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Pipeline failed');

      const episode = await createEpisode({
        title: data.title,
        logline: data.logline,
        lesson: data.lesson,
        moral: data.moral,
        topic,
        synopsis: data.story,
        fullScript: data.script,
        youtubeTitle: data.metadata?.youtubeTitle || data.title,
        youtubeDescription: data.metadata?.youtubeDescription || '',
        youtubeTags: data.metadata?.youtubeTags || [],
        thumbnailConcept: data.metadata?.thumbnailConcept || '',
        thumbnailUrl: `${API}${data.thumbnailUrl}`,
        video16x9Url: `${API}${data.video16x9Url}`,
        shorts9x16Url: `${API}${data.shorts9x16Url}`,
        subtitlesSrt: data.subtitlesSrt,
        totalDurationSeconds: data.durationSeconds,
        scenes: (data.scenes || []).map((scene: any, index: number) => ({
          ...scene,
          id: `local-${Date.now()}-${index}`,
          audioStatus: 'ready', animationStatus: 'ready', qaStatus: 'passed',
          imageUrl: ''
        })) as any,
        scenesCount: data.scenes?.length || 0,
        status: 'REVIEW'
      } as any);

      await updateEpisode({ ...episode, status: 'REVIEW' } as any);
      await logAction('LOCAL_FULL_PIPELINE_COMPLETED', `Built local MP4 outputs for ${data.title}`, episode.id);
      setResult(data);
      setMessage('Complete. Review the episode before publishing to YouTube.');
    } catch (e: any) {
      setError(e.message || 'Pipeline failed');
      setMessage('');
    } finally { setRunning(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2"><Film className="w-4 h-4" /> LOCAL TOON FACTORY</div>
        <h1 className="text-3xl font-extrabold text-white">Topic → Finished Animated Video</h1>
        <p className="text-sm text-slate-400 mt-2">One button runs the local production chain: idea → story → script → storyboard → Windows narration → animated scenes → 16:9 MP4 → 9:16 Short → thumbnail → captions.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div><label className="block text-xs font-semibold text-slate-400 mb-1">Topic</label><input value={topic} onChange={e => setTopic(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white" /></div>
        <div><label className="block text-xs font-semibold text-slate-400 mb-1">Lesson</label><input value={lesson} onChange={e => setLesson(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white" /></div>
        <button onClick={run} disabled={running} className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold flex items-center justify-center gap-2 disabled:opacity-60">
          {running ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {running ? 'Building the episode on this PC...' : 'Create Complete Episode'}
        </button>
        {message && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" />{message}</div>}
        {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex gap-2"><AlertCircle className="w-5 h-5 shrink-0" />{error}</div>}
      </div>

      {result && <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Output: {result.title}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a href={`${API}${result.video16x9Url}`} target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 flex items-center justify-between">Open 16:9 master <ExternalLink className="w-4 h-4" /></a>
          <a href={`${API}${result.shorts9x16Url}`} target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 flex items-center justify-between">Open 9:16 Short <ExternalLink className="w-4 h-4" /></a>
        </div>
        <button onClick={() => setCurrentView('approval_queue')} className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm">Send to human approval</button>
      </div>}
    </div>
  );
};

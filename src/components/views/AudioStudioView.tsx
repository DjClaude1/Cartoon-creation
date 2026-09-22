import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  Play, 
  Pause, 
  Download, 
  RefreshCw, 
  Sparkles, 
  FileText, 
  Clock, 
  Check, 
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { providers } from '../../services/providers';

export const AudioStudioView: React.FC = () => {
  const { activeEpisode, updateScene, logAction } = useApp();
  const [selectedVoice, setSelectedVoice] = useState('Preschool Gentle Storyteller (Female)');
  const [cadenceSpeed, setCadenceSpeed] = useState(1.0);
  const [isPlayingId, setIsPlayingId] = useState<string | null>(null);
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);

  if (!activeEpisode) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
        No active episode selected.
      </div>
    );
  }

  const scenes = activeEpisode.scenes || [];
  const audioProvider = providers.getAudio();

  const handleGenerateAllAudio = async () => {
    setIsBatchGenerating(true);
    for (const scene of scenes) {
      if (scene.narration) {
        const res = await audioProvider.generateNarration(scene.narration, selectedVoice, cadenceSpeed);
        if (res.success && res.data) {
          await updateScene(activeEpisode.id, scene.id, {
            audioUrl: res.data.audioUrl,
            audioStatus: 'ready',
            durationSeconds: res.data.durationSeconds
          });
        }
      }
    }
    setIsBatchGenerating(false);
    await logAction('AUDIO_BATCH_GENERATED', `Generated narration for all ${scenes.length} scenes in ${activeEpisode.title}`, activeEpisode.id);
  };

  const handleSimulatePlay = (id: string) => {
    if (isPlayingId === id) {
      setIsPlayingId(null);
    } else {
      setIsPlayingId(id);
      setTimeout(() => setIsPlayingId(null), 4000);
    }
  };

  const totalWords = scenes.reduce((acc, s) => acc + (s.narration?.trim().split(/\s+/).length || 0), 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Mic className="w-4 h-4" />
            <span>NARRATION & VOICE STUDIO (AudioProvider)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Voiceover & Soundscape Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate warm, sensory-friendly preschool narration tracks for <strong className="text-slate-200">{activeEpisode.title}</strong>.
          </p>
        </div>

        <button
          onClick={handleGenerateAllAudio}
          disabled={isBatchGenerating}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isBatchGenerating ? 'animate-spin' : ''}`} />
          {isBatchGenerating ? 'Generating All Voices...' : 'Generate All Narration Tracks'}
        </button>
      </div>

      {/* Voice Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Narrator Voice Profile</label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
          >
            <option value="Preschool Gentle Storyteller (Female)">Storyteller Joy (Warm, Melodic)</option>
            <option value="Milo Child Voice (7yo Fox)">Milo Voice (Youthful, Curious)</option>
            <option value="Momo Sprite Voice (Cloud)">Momo Voice (Chime, Giggles)</option>
            <option value="Grandpa Barnaby (Elder Leaf Beetle)">Barnaby (Low, Soothing)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Cadence / Pace ({cadenceSpeed}x)</label>
          <input
            type="range"
            min="0.8"
            max="1.2"
            step="0.05"
            value={cadenceSpeed}
            onChange={(e) => setCadenceSpeed(parseFloat(e.target.value))}
            className="w-full mt-2 accent-sky-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Slow & Cozy (0.8x)</span>
            <span>Standard (1.0x)</span>
            <span>Upbeat (1.2x)</span>
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Total Script Words</span>
          <span className="text-xl font-bold text-white font-fun">{totalWords} Words</span>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Total Voice Duration</span>
          <span className="text-xl font-bold text-sky-400 font-fun">
            ~{Math.round(activeEpisode.totalDurationSeconds / 60)}m {activeEpisode.totalDurationSeconds % 60}s
          </span>
        </div>
      </div>

      {/* Scene Narration Cues List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-sky-400" />
          Scene Narration Tracks ({scenes.length} Audio Blocks)
        </h2>

        <div className="space-y-3">
          {scenes.map((scene) => {
            const isPlaying = isPlayingId === scene.id;
            const wordCount = scene.narration.trim().split(/\s+/).length;

            return (
              <div
                key={scene.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleSimulatePlay(scene.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isPlaying 
                        ? 'bg-amber-400 text-slate-950' 
                        : 'bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-300'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-fun">
                        Scene {scene.sceneNumber}: {scene.title}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {wordCount} words • {scene.durationSeconds}s
                      </span>
                      {isPlaying && (
                        <span className="text-[10px] text-sky-400 font-bold animate-pulse flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                          Playing Audio...
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 italic">
                      "{scene.narration}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    scene.audioStatus === 'ready' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {scene.audioStatus}
                  </span>

                  <button
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([scene.narration], { type: 'text/plain' });
                      element.href = URL.createObjectURL(file);
                      element.download = `scene_${scene.sceneNumber}_narration.txt`;
                      document.body.appendChild(element);
                      element.click();
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Download Audio Cue / Script"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

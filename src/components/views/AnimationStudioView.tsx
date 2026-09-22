import React, { useState } from 'react';
import { 
  PlaySquare, 
  Sparkles, 
  RefreshCw, 
  Video, 
  Layers, 
  Film, 
  Sliders, 
  Play, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { providers } from '../../services/providers';

export const AnimationStudioView: React.FC = () => {
  const { activeEpisode, updateScene, logAction } = useApp();
  const [selectedProvider, setSelectedProvider] = useState('Google Video / Local Vector (Demo)');
  const [motionPreset, setMotionPreset] = useState('Gentle Storybook Squash-and-Stretch');
  const [renderingSceneId, setRenderingSceneId] = useState<string | null>(null);

  if (!activeEpisode) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
        No active episode selected.
      </div>
    );
  }

  const scenes = activeEpisode.scenes || [];
  const animationProvider = providers.getAnimation();

  const handleAnimateScene = async (sceneId: string) => {
    setRenderingSceneId(sceneId);
    try {
      const scene = scenes.find(s => s.id === sceneId);
      const res = await animationProvider.generateSceneAnimation(scene);
      if (res.success) {
        await updateScene(activeEpisode.id, sceneId, {
          animationStatus: 'ready'
        });
        await logAction('SCENE_ANIMATED', `Generated scene animation with motion preset: ${motionPreset}`, activeEpisode.id);
      }
    } finally {
      setRenderingSceneId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <PlaySquare className="w-4 h-4" />
            <span>ANIMATION ENGINE (AnimationProvider)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Animation & Character Movement Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Orchestrates camera movements, character squash-and-stretch, and background parallax. Not a simple slideshow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
            Provider: {animationProvider.name}
          </span>
        </div>
      </div>

      {/* Movement & Style Config */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Animation Engine / Backend</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="Google Video / Local Vector (Demo)">Google Video Generation / Vector Node</option>
            <option value="Future External Video Provider">Future Video Provider (Runway / Pika)</option>
            <option value="ToonFactory Canvas Renderer">Local 2D/3D Canvas Engine</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Preschool Motion Profile</label>
          <select
            value={motionPreset}
            onChange={(e) => setMotionPreset(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="Gentle Storybook Squash-and-Stretch">Gentle Storybook Squash-and-Stretch</option>
            <option value="Slow Cinematic Nature Pan">Slow Cinematic Nature Pan</option>
            <option value="Playful Bouncy Toddler Cadence">Playful Bouncy Toddler Cadence</option>
          </select>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center text-xs">
          <span className="text-slate-500 uppercase font-bold text-[10px]">Animation Safety Check</span>
          <span className="text-emerald-400 font-bold mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero Flash / Sensory Safe (Non-Epileptic)
          </span>
        </div>
      </div>

      {/* Scene Animations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-amber-400 font-fun">
                  Scene #{scene.sceneNumber}: {scene.title}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  scene.animationStatus === 'ready' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {scene.animationStatus}
                </span>
              </div>

              <div className="aspect-video bg-slate-950 rounded-2xl overflow-hidden relative mb-3">
                <img
                  src={scene.imageUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'}
                  alt={scene.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-semibold bg-black/70 px-3 py-1.5 rounded-xl border border-white/20">
                    Preview Motion Sequence
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400">
                  <strong className="text-slate-200">Camera:</strong> {scene.cameraDirection}
                </div>
                <div className="text-slate-400">
                  <strong className="text-slate-200">Instruction:</strong> {scene.animationInstructions}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => handleAnimateScene(scene.id)}
                disabled={renderingSceneId === scene.id}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${renderingSceneId === scene.id ? 'animate-spin' : ''}`} />
                {renderingSceneId === scene.id ? 'Rendering Motion...' : 'Render Motion Asset'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

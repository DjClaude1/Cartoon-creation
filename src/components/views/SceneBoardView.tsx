import React, { useState } from 'react';
import { 
  Grid3X3, 
  Plus, 
  Sparkles, 
  Play, 
  Volume2, 
  Edit3, 
  Trash2, 
  Copy, 
  Clock, 
  CheckCircle2, 
  Image as ImageIcon, 
  Video, 
  MoveUp, 
  MoveDown,
  X,
  Save,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Scene } from '../../types';
import { providers } from '../../services/providers';

export const SceneBoardView: React.FC = () => {
  const { 
    activeEpisode, 
    updateScene, 
    addScene, 
    deleteScene, 
    updateEpisode,
    logAction 
  } = useApp();

  const [selectedScene, setSelectedScene] = useState<Scene | null>(activeEpisode?.scenes?.[0] || null);
  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [previewingScene, setPreviewingScene] = useState<Scene | null>(null);
  const [isGeneratingVisual, setIsGeneratingVisual] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState<string | null>(null);

  if (!activeEpisode) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
        No active episode selected.
      </div>
    );
  }

  const scenes = activeEpisode.scenes || [];
  const visualProvider = providers.getVisual();
  const audioProvider = providers.getAudio();

  const handleDuplicateScene = async (scene: Scene) => {
    const duplicated = {
      ...scene,
      title: `${scene.title} (Copy)`,
      id: `sc-${Date.now()}`
    };
    await addScene(activeEpisode.id, duplicated);
    await logAction('SCENE_DUPLICATED', `Duplicated scene ${scene.sceneNumber}: ${scene.title}`, activeEpisode.id);
  };

  const handleRegenerateVisual = async (scene: Scene) => {
    setIsGeneratingVisual(scene.id);
    try {
      const res = await visualProvider.generateSceneVisual(scene.visualPrompt, 'Milo and Momo preschool', scene.sceneNumber);
      if (res.success && res.data) {
        await updateScene(activeEpisode.id, scene.id, {
          imageUrl: res.data.imageUrl,
          animationStatus: 'ready'
        });
        await logAction('VISUAL_REGENERATED', `Regenerated visual asset for Scene ${scene.sceneNumber}`, activeEpisode.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingVisual(null);
    }
  };

  const handleRegenerateAudio = async (scene: Scene) => {
    setIsGeneratingAudio(scene.id);
    try {
      const res = await audioProvider.generateNarration(scene.narration, 'Preschool Gentle Narrator');
      if (res.success && res.data) {
        await updateScene(activeEpisode.id, scene.id, {
          audioUrl: res.data.audioUrl,
          audioStatus: 'ready',
          durationSeconds: res.data.durationSeconds
        });
        await logAction('AUDIO_REGENERATED', `Regenerated narration audio for Scene ${scene.sceneNumber}`, activeEpisode.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAudio(null);
    }
  };

  const handleSaveSceneEdit = async () => {
    if (!editingScene) return;
    await updateScene(activeEpisode.id, editingScene.id, editingScene);
    if (selectedScene?.id === editingScene.id) {
      setSelectedScene(editingScene);
    }
    setEditingScene(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Grid3X3 className="w-4 h-4" />
            <span>VISUAL STORYBOARD & TIMELINE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Scene Board ({scenes.length} Scenes)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual production storyboard for <strong className="text-slate-200">{activeEpisode.title}</strong> (~{Math.round(activeEpisode.totalDurationSeconds / 60)}m target).
          </p>
        </div>

        <button
          onClick={() => {
            addScene(activeEpisode.id, {
              title: `Scene ${scenes.length + 1}`,
              durationSeconds: 14,
              narration: 'Gentle garden breeze rustles through the sweet blossoms.',
              dialogue: 'MILO: Look at that, Momo!',
              characters: ['Milo', 'Momo']
            });
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Scene
        </button>
      </div>

      {/* Grid of 14 Scene Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {scenes.map((scene) => {
          const isSelected = selectedScene?.id === scene.id;
          return (
            <div
              key={scene.id}
              onClick={() => setSelectedScene(scene)}
              className={`bg-slate-900 border rounded-3xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer group ${
                isSelected
                  ? 'border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Visual Thumbnail Preview */}
              <div className="h-36 bg-slate-950 relative overflow-hidden">
                {scene.imageUrl ? (
                  <img
                    src={scene.imageUrl}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                    <ImageIcon className="w-8 h-8 mb-1" />
                    <span className="text-[10px]">No visual rendered</span>
                  </div>
                )}

                {/* Badges on preview */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="bg-slate-900/90 backdrop-blur text-white text-[10px] font-black px-2 py-0.5 rounded-lg border border-slate-700">
                    #{scene.sceneNumber}
                  </span>
                  <span className="bg-slate-900/90 backdrop-blur text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-slate-700 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {scene.durationSeconds}s
                  </span>
                </div>

                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur uppercase ${
                    scene.qaStatus === 'passed' ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-slate-950'
                  }`}>
                    QA: {scene.qaStatus}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewingScene(scene);
                  }}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors"
                  title="Preview Scene"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scene Content */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white font-fun line-clamp-1">
                    {scene.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 italic">
                    "{scene.narration}"
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {scene.characters.map((c) => (
                      <span key={c} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Action Icons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegenerateVisual(scene);
                      }}
                      disabled={isGeneratingVisual === scene.id}
                      className="p-1 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                      title="Regenerate Visual"
                    >
                      <ImageIcon className={`w-3.5 h-3.5 ${isGeneratingVisual === scene.id ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegenerateAudio(scene);
                      }}
                      disabled={isGeneratingAudio === scene.id}
                      className="p-1 rounded text-slate-400 hover:text-sky-400 hover:bg-slate-800"
                      title="Regenerate Audio Narration"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isGeneratingAudio === scene.id ? 'animate-pulse' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateScene(scene);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-purple-400 hover:bg-slate-800"
                      title="Duplicate Scene"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingScene(scene);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                      title="Edit Scene"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {scenes.length > 3 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteScene(activeEpisode.id, scene.id);
                        }}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                        title="Delete Scene"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Scene Detailed Inspector */}
      {selectedScene && !editingScene && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400">
                SCENE {selectedScene.sceneNumber} INSPECTOR
              </span>
              <h2 className="text-xl font-bold text-white font-fun">
                {selectedScene.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingScene(selectedScene)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                Edit Scene Breakdown
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[11px] font-semibold">Narration Voiceover:</span>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{selectedScene.narration}"
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[11px] font-semibold">Character Dialogue:</span>
                <p className="text-xs text-amber-300 font-mono leading-relaxed whitespace-pre-line">
                  {selectedScene.dialogue || 'None (pure narration / action)'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[11px] font-semibold">Action & Camera:</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>Action:</strong> {selectedScene.action}
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  <strong>Camera:</strong> {selectedScene.cameraDirection}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[11px] font-semibold">Animation Instructions:</span>
                <p className="text-xs text-emerald-300 leading-relaxed">
                  {selectedScene.animationInstructions}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[11px] font-semibold">Visual Generation Prompt:</span>
                <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                  {selectedScene.visualPrompt}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRegenerateVisual(selectedScene)}
                  className="flex-1 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-xs border border-amber-500/30 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Regenerate Visual
                </button>
                <button
                  onClick={() => handleRegenerateAudio(selectedScene)}
                  className="flex-1 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-semibold text-xs border border-sky-500/30 flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Regenerate Audio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editing Scene Modal */}
      {editingScene && (
        <div className="bg-slate-900 border border-amber-400/50 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-lg text-white font-fun flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-amber-400" />
              Edit Scene {editingScene.sceneNumber}: {editingScene.title}
            </h3>
            <button onClick={() => setEditingScene(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Scene Title</label>
              <input
                type="text"
                value={editingScene.title}
                onChange={(e) => setEditingScene({ ...editingScene, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Duration (Seconds)</label>
              <input
                type="number"
                value={editingScene.durationSeconds}
                onChange={(e) => setEditingScene({ ...editingScene, durationSeconds: parseInt(e.target.value) || 10 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Narration Voiceover</label>
            <textarea
              rows={2}
              value={editingScene.narration}
              onChange={(e) => setEditingScene({ ...editingScene, narration: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Dialogue</label>
            <textarea
              rows={2}
              value={editingScene.dialogue}
              onChange={(e) => setEditingScene({ ...editingScene, dialogue: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Action</label>
              <input
                type="text"
                value={editingScene.action}
                onChange={(e) => setEditingScene({ ...editingScene, action: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Camera Direction</label>
              <input
                type="text"
                value={editingScene.cameraDirection}
                onChange={(e) => setEditingScene({ ...editingScene, cameraDirection: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Visual Generation Prompt</label>
            <textarea
              rows={2}
              value={editingScene.visualPrompt}
              onChange={(e) => setEditingScene({ ...editingScene, visualPrompt: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setEditingScene(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSceneEdit}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save Scene
            </button>
          </div>
        </div>
      )}

      {/* Preview Scene Modal */}
      {previewingScene && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white font-fun">
                Scene {previewingScene.sceneNumber}: {previewingScene.title}
              </h3>
              <button onClick={() => setPreviewingScene(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative">
              <img
                src={previewingScene.imageUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80'}
                alt={previewingScene.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-6">
                <div className="text-amber-300 text-sm font-medium mb-1">
                  {previewingScene.narration}
                </div>
                {previewingScene.dialogue && (
                  <div className="text-white text-xs font-mono bg-black/60 p-2 rounded-lg border border-white/10">
                    {previewingScene.dialogue}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewingScene(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

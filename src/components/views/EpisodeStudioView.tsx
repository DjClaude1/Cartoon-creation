import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Save, 
  RefreshCw, 
  FileText, 
  Grid3X3, 
  Mic, 
  Image as ImageIcon, 
  Youtube, 
  History, 
  ArrowRight,
  Check,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { providers } from '../../services/providers';
import { Episode } from '../../types';

export const EpisodeStudioView: React.FC = () => {
  const { 
    activeEpisode, 
    updateEpisode, 
    createJob, 
    isDemoMode, 
    logAction,
    setCurrentView 
  } = useApp();

  if (!activeEpisode) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
        No active episode selected. Please select or create an episode from the Episodes tab.
      </div>
    );
  }

  const [formData, setFormData] = useState<Episode>(activeEpisode);
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const ai = providers.getAI();

  const handleSave = async (updated?: Episode) => {
    const toSave = updated || formData;
    await updateEpisode(toSave);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // 1. Generate Idea
  const handleGenerateIdea = async () => {
    setLoadingSection('idea');
    setStatusMessage('Generating original preschool concept with Milo & Momo...');
    try {
      const res = await ai.generateIdea(formData.topic, formData.targetAge);
      if (res.success && res.data) {
        const next = {
          ...formData,
          title: res.data.title,
          logline: res.data.logline,
          lesson: res.data.lesson,
          moral: res.data.moral,
          updatedAt: new Date().toISOString()
        };
        setFormData(next);
        await handleSave(next);
        await logAction('GENERATE_IDEA', `Generated idea: ${res.data.title}`, formData.id);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingSection(null);
      setStatusMessage(null);
    }
  };

  // 2. Generate Story Synopsis
  const handleGenerateStory = async () => {
    setLoadingSection('story');
    setStatusMessage('Crafting heartwarming preschool story narrative...');
    try {
      const res = await ai.generateStory(formData.title, formData.lesson, formData.targetAge);
      if (res.success && res.data) {
        const next = {
          ...formData,
          synopsis: res.data,
          updatedAt: new Date().toISOString()
        };
        setFormData(next);
        await handleSave(next);
        await logAction('GENERATE_STORY', `Generated story narrative for ${formData.title}`, formData.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSection(null);
      setStatusMessage(null);
    }
  };

  // 3. Generate Complete Children's Script
  const handleGenerateScript = async () => {
    setLoadingSection('script');
    setStatusMessage('Drafting multi-character children’s script with Narrator cues...');
    try {
      const res = await ai.generateScript(formData.synopsis || formData.logline, ['Milo', 'Momo']);
      if (res.success && res.data) {
        const next = {
          ...formData,
          fullScript: res.data,
          status: 'SCRIPT_READY' as const,
          updatedAt: new Date().toISOString()
        };
        setFormData(next);
        await handleSave(next);
        await createJob('script', formData.id, formData.title);
        await logAction('GENERATE_SCRIPT', `Generated full children script for ${formData.title}`, formData.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSection(null);
      setStatusMessage(null);
    }
  };

  // 4. Generate Structured Scenes Breakdown
  const handleGenerateScenes = async () => {
    setLoadingSection('scenes');
    setStatusMessage('Breaking down script into 14 visual storyboard scenes...');
    try {
      const res = await ai.generateScenes(formData.fullScript || formData.synopsis || formData.logline, 3);
      if (res.success && res.data) {
        const formattedScenes = res.data.map((sc: any, idx: number) => ({
          id: `sc-${Date.now()}-${idx + 1}`,
          sceneNumber: idx + 1,
          title: sc.title || `Scene ${idx + 1}`,
          durationSeconds: sc.durationSeconds || 14,
          narration: sc.narration || '',
          dialogue: sc.dialogue || '',
          characters: sc.characters || ['Milo', 'Momo'],
          action: sc.action || '',
          background: sc.background || 'Lush preschool flowerbed',
          cameraDirection: sc.cameraDirection || 'Medium shot',
          animationInstructions: sc.animationInstructions || 'Gentle idle bounce',
          visualPrompt: sc.visualPrompt || `Milo and Momo in garden, preschool storybook 3d style`,
          imageUrl: sc.imageUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
          audioStatus: 'ready' as const,
          animationStatus: 'ready' as const,
          qaStatus: 'passed' as const
        }));

        const next = {
          ...formData,
          scenes: formattedScenes,
          scenesCount: formattedScenes.length,
          totalDurationSeconds: formattedScenes.reduce((acc: number, s: any) => acc + s.durationSeconds, 0),
          updatedAt: new Date().toISOString()
        };
        setFormData(next);
        await handleSave(next);
        await createJob('scenes', formData.id, formData.title);
        await logAction('GENERATE_SCENES', `Generated ${formattedScenes.length} scenes storyboard`, formData.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSection(null);
      setStatusMessage(null);
    }
  };

  // 5. Generate YouTube Metadata
  const handleGenerateYouTubeMeta = async () => {
    setLoadingSection('youtube');
    setStatusMessage('Formulating YouTube title, Made-for-Kids description & tags...');
    try {
      const res = await ai.generateYouTubeMetadata(formData.title, formData.lesson, formData.fullScript || '');
      if (res.success && res.data) {
        const next = {
          ...formData,
          youtubeTitle: res.data.youtubeTitle,
          youtubeDescription: res.data.youtubeDescription,
          youtubeTags: res.data.youtubeTags,
          thumbnailConcept: res.data.thumbnailConcept,
          updatedAt: new Date().toISOString()
        };
        setFormData(next);
        await handleSave(next);
        await logAction('GENERATE_YOUTUBE_METADATA', `Generated YouTube metadata for ${formData.title}`, formData.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSection(null);
      setStatusMessage(null);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <PenTool className="w-4 h-4" />
            <span>EPISODE STUDIO • VERSION {formData.version || 1}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            {formData.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Granular generation control. Regenerate ideas, narrative, script, scenes, or YouTube packaging independently without losing other work.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Check className="w-4 h-4" /> Saved
            </span>
          )}
          <button
            onClick={() => handleSave()}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700"
          >
            <Save className="w-4 h-4 text-amber-400" />
            Save Changes
          </button>
          <button
            onClick={() => setCurrentView('scene_board')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Grid3X3 className="w-4 h-4" />
            Open Scene Board
          </button>
        </div>
      </div>

      {/* Progress status banner when generating */}
      {statusMessage && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-300 animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Step 1: Input Prompts & Creative Seeds */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            1. Core Concept & Lesson
          </h2>
          <button
            onClick={handleGenerateIdea}
            disabled={loadingSection === 'idea'}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-xs border border-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingSection === 'idea' ? 'animate-spin' : ''}`} />
            Generate / Remix Idea
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Episode Topic</label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              placeholder="e.g. Caring for seeds, patience, sharing"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Preschool Lesson</label>
            <input
              type="text"
              value={formData.lesson}
              onChange={(e) => setFormData({ ...formData, lesson: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              placeholder="e.g. Kindness and caring for growing things"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Takeaway Moral</label>
            <input
              type="text"
              value={formData.moral}
              onChange={(e) => setFormData({ ...formData, moral: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              placeholder="e.g. Good things take time to grow"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Episode Logline</label>
          <textarea
            rows={2}
            value={formData.logline}
            onChange={(e) => setFormData({ ...formData, logline: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-amber-400 focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* Step 2: Story & Script Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Story Narrative */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                2. Story Narrative (Bedtime / Circle Time)
              </h2>
              <button
                onClick={handleGenerateStory}
                disabled={loadingSection === 'story'}
                className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-semibold text-xs border border-sky-500/30 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingSection === 'story' ? 'animate-spin' : ''}`} />
                Generate Story
              </button>
            </div>

            <textarea
              rows={9}
              value={formData.synopsis || ''}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              placeholder="Click 'Generate Story' to create the gentle narrative..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-sky-400 focus:outline-none font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* Full Script */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <PenTool className="w-4 h-4 text-emerald-400" />
                3. Full Episode Script (Dialogue & Action)
              </h2>
              <button
                onClick={handleGenerateScript}
                disabled={loadingSection === 'script'}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-xs border border-emerald-500/30 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingSection === 'script' ? 'animate-spin' : ''}`} />
                Generate Script
              </button>
            </div>

            <textarea
              rows={9}
              value={formData.fullScript || ''}
              onChange={(e) => setFormData({ ...formData, fullScript: e.target.value })}
              placeholder="Script with [NARRATOR], MILO, MOMO dialogue and scene breakdown..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-emerald-400 focus:outline-none font-mono leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Step 3: Storyboard & Scenes Conversion */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Grid3X3 className="w-4 h-4 text-purple-400" />
              4. Storyboard Scenes ({formData.scenes?.length || 0} Scenes)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Converts the full script into timestamped visual production units (~14 scenes for a 2–5 min episode).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateScenes}
              disabled={loadingSection === 'scenes'}
              className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-semibold text-xs border border-purple-500/30 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingSection === 'scenes' ? 'animate-spin' : ''}`} />
              Generate 14-Scene Breakdown
            </button>
            <button
              onClick={() => setCurrentView('scene_board')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-1.5"
            >
              Open Interactive Scene Board <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scene Previews preview cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2">
          {formData.scenes && formData.scenes.length > 0 ? (
            formData.scenes.slice(0, 7).map((scene) => (
              <div 
                key={scene.id} 
                onClick={() => setCurrentView('scene_board')}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 cursor-pointer transition-all text-xs"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-1">
                  <span>SCENE {scene.sceneNumber}</span>
                  <span>{scene.durationSeconds}s</span>
                </div>
                <div className="font-semibold text-slate-200 truncate">{scene.title}</div>
                <div className="text-[10px] text-slate-400 truncate mt-1">{scene.narration}</div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-6 text-center text-xs text-slate-500">
              No scenes broken down yet. Click "Generate 14-Scene Breakdown" to automatically structure the storyboard.
            </div>
          )}
        </div>
      </div>

      {/* Step 4: YouTube Packaging */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Youtube className="w-4 h-4 text-rose-500" />
            5. YouTube Publishing Packaging (Made-For-Kids)
          </h2>
          <button
            onClick={handleGenerateYouTubeMeta}
            disabled={loadingSection === 'youtube'}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-xs border border-rose-500/30 flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingSection === 'youtube' ? 'animate-spin' : ''}`} />
            Generate YouTube Metadata
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Title</label>
            <input
              type="text"
              value={formData.youtubeTitle || ''}
              onChange={(e) => setFormData({ ...formData, youtubeTitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Thumbnail Concept Prompt</label>
            <input
              type="text"
              value={formData.thumbnailConcept || ''}
              onChange={(e) => setFormData({ ...formData, thumbnailConcept: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Description & Hashtags</label>
          <textarea
            rows={3}
            value={formData.youtubeDescription || ''}
            onChange={(e) => setFormData({ ...formData, youtubeDescription: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-rose-400 focus:outline-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};

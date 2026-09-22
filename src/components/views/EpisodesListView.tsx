import React, { useState } from 'react';
import { 
  Film, 
  Plus, 
  Play, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Trash2, 
  Eye, 
  Youtube,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Episode } from '../../types';

export const EpisodesListView: React.FC = () => {
  const { 
    episodes, 
    activeEpisode, 
    setActiveEpisode, 
    setCurrentView, 
    createEpisode, 
    user 
  } = useApp();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLesson, setNewLesson] = useState('');

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    const created = await createEpisode({
      title: newTitle.trim(),
      lesson: newLesson.trim() || 'Sharing and gentle kindness'
    });
    setIsCreatingNew(false);
    setNewTitle('');
    setNewLesson('');
    setActiveEpisode(created);
    setCurrentView('episode_studio');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Film className="w-4 h-4" />
            <span>EPISODE REPOSITORY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Episodes Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            All preschool episodes produced or in production for Milo & Momo's Wonder Garden.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create New Episode
        </button>
      </div>

      {/* New Episode Modal / Card */}
      {isCreatingNew && (
        <div className="bg-slate-900 border border-amber-400/40 rounded-3xl p-6 space-y-4 shadow-2xl">
          <h3 className="font-bold text-white font-fun text-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Start a New Wonder Garden Episode
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Episode Title</label>
              <input
                type="text"
                placeholder="e.g. The Musical Caterpillar, Momo's Cloud Nap"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Preschool Lesson / Moral</label>
              <input
                type="text"
                placeholder="e.g. Taking turns, listening to nature"
                value={newLesson}
                onChange={(e) => setNewLesson(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsCreatingNew(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Continue to Episode Studio
            </button>
          </div>
        </div>
      )}

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((ep) => {
          const isActive = activeEpisode?.id === ep.id;
          return (
            <div
              key={ep.id}
              className={`bg-slate-900 border rounded-3xl p-5 flex flex-col justify-between transition-all relative overflow-hidden group ${
                isActive 
                  ? 'border-amber-400/60 shadow-xl shadow-amber-500/5 ring-1 ring-amber-400/20' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl-lg">
                  ACTIVE FOCUS
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="font-bold text-amber-400 font-fun">
                    EPISODE {ep.episodeNumber}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{ep.scenesCount || 14} Scenes</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">~{Math.round((ep.totalDurationSeconds || 196) / 60)}m</span>
                </div>

                <h3 className="font-bold text-lg text-white font-fun mb-2 line-clamp-1">
                  {ep.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {ep.logline || 'A gentle educational story with Milo and Momo in the Wonder Garden.'}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] space-y-1 mb-4">
                  <div className="text-slate-500 font-medium">Lesson:</div>
                  <div className="text-slate-300 font-semibold truncate">{ep.lesson}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs mb-3">
                  <span className="text-slate-500 text-[11px]">Workflow Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    ep.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    ep.status === 'PUBLISHED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    ep.status === 'REVIEW' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {ep.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveEpisode(ep);
                      setCurrentView('episode_studio');
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    Open Studio
                  </button>

                  <button
                    onClick={() => {
                      setActiveEpisode(ep);
                      setCurrentView('scene_board');
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    title="Storyboard"
                  >
                    <Film className="w-4 h-4 text-sky-400" />
                  </button>

                  {ep.status === 'REVIEW' && (
                    <button
                      onClick={() => {
                        setActiveEpisode(ep);
                        setCurrentView('approval_queue');
                      }}
                      className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30"
                      title="Review for Approval"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

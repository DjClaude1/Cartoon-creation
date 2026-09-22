import React, { useState } from 'react';
import { 
  BookOpen, 
  Save, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  Palette, 
  Smile, 
  Plus, 
  Trash2,
  Undo
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SeriesBibleView: React.FC = () => {
  const { seriesBible, updateSeriesBible, user } = useApp();
  const [formData, setFormData] = useState(seriesBible);
  const [savedNotice, setSavedNotice] = useState(false);
  const [newWorldRule, setNewWorldRule] = useState('');
  const [newProhibited, setNewProhibited] = useState('');

  const isEditable = user.role === 'owner' || user.role === 'admin' || user.role === 'editor';

  const handleSave = async () => {
    await updateSeriesBible({ ...formData, updatedAt: new Date().toISOString() });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleAddWorldRule = () => {
    if (!newWorldRule.trim()) return;
    setFormData(prev => ({
      ...prev,
      worldRules: [...prev.worldRules, newWorldRule.trim()]
    }));
    setNewWorldRule('');
  };

  const handleRemoveWorldRule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      worldRules: prev.worldRules.filter((_, i) => i !== index)
    }));
  };

  const handleAddProhibited = () => {
    if (!newProhibited.trim()) return;
    setFormData(prev => ({
      ...prev,
      prohibitedContent: [...prev.prohibitedContent, newProhibited.trim()]
    }));
    setNewProhibited('');
  };

  const handleRemoveProhibited = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prohibitedContent: prev.prohibitedContent.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>ORIGINAL SHOW FOUNDATION</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Series Bible & World Rules
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Defines the immutable creative guidelines, visual constraints, safe tone, and prohibited content for "Milo & Momo's Wonder Garden".
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Check className="w-4 h-4" /> Saved to Database
            </span>
          )}
          {isEditable && (
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Series Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Metadata */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Core Series Metadata
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Series Title</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.seriesName}
              onChange={(e) => setFormData({ ...formData, seriesName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Series Logline</label>
            <textarea
              rows={3}
              disabled={!isEditable}
              value={formData.logline}
              onChange={(e) => setFormData({ ...formData, logline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Target Age</label>
              <input
                type="text"
                disabled={!isEditable}
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Episode Length</label>
              <input
                type="text"
                disabled={!isEditable}
                value={formData.episodeLengthTarget}
                onChange={(e) => setFormData({ ...formData, episodeLengthTarget: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Publishing Schedule</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.publishingSchedule}
              onChange={(e) => setFormData({ ...formData, publishingSchedule: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Visual & Audio Aesthetics */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4 text-sky-400" />
            Visual & Aesthetic Style
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Visual Art Direction</label>
            <textarea
              rows={3}
              disabled={!isEditable}
              value={formData.visualStyle}
              onChange={(e) => setFormData({ ...formData, visualStyle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-400 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Character Consistency Guidelines</label>
            <textarea
              rows={3}
              disabled={!isEditable}
              value={formData.characterConsistencyGuidelines}
              onChange={(e) => setFormData({ ...formData, characterConsistencyGuidelines: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-400 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Music & Sound Style</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.musicAndAudioStyle}
              onChange={(e) => setFormData({ ...formData, musicAndAudioStyle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>
      </div>

      {/* World Rules & Prohibited Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* World Rules */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Smile className="w-4 h-4 text-emerald-400" />
              World Rules (Immutable)
            </h2>
            <span className="text-[10px] text-slate-500">{formData.worldRules.length} Rules</span>
          </div>

          <div className="space-y-2">
            {formData.worldRules.map((rule, idx) => (
              <div key={idx} className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="text-emerald-400 font-bold">•</span>
                <span className="flex-1 leading-relaxed">{rule}</span>
                {isEditable && (
                  <button onClick={() => handleRemoveWorldRule(idx)} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditable && (
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add new world rule..."
                value={newWorldRule}
                onChange={(e) => setNewWorldRule(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddWorldRule()}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
              <button
                onClick={handleAddWorldRule}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          )}
        </div>

        {/* Prohibited Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Prohibited Content (Strict Invariant)
            </h2>
            <span className="text-[10px] text-slate-500">{formData.prohibitedContent.length} Guardrails</span>
          </div>

          <div className="space-y-2">
            {formData.prohibitedContent.map((rule, idx) => (
              <div key={idx} className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-rose-950/20 border border-rose-900/30 text-xs text-rose-200">
                <span className="text-rose-400 font-bold">✕</span>
                <span className="flex-1 leading-relaxed">{rule}</span>
                {isEditable && (
                  <button onClick={() => handleRemoveProhibited(idx)} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditable && (
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add prohibited safety guardrail..."
                value={newProhibited}
                onChange={(e) => setNewProhibited(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddProhibited()}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
              />
              <button
                onClick={handleAddProhibited}
                className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold flex items-center gap-1 border border-rose-800/40"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Sparkles, 
  Edit3, 
  Trash2, 
  Check, 
  Volume2, 
  Eye, 
  ShieldCheck, 
  Activity,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Character } from '../../types';

export const CharacterDatabaseView: React.FC = () => {
  const { characters, addCharacter, updateCharacter, deleteCharacter, user } = useApp();
  const [selectedChar, setSelectedChar] = useState<Character | null>(characters[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formState, setFormState] = useState<Partial<Character>>({});

  const canEdit = user.role === 'owner' || user.role === 'admin' || user.role === 'editor';

  const handleStartCreate = () => {
    setIsCreating(true);
    setIsEditing(true);
    setFormState({
      id: `char-${Date.now()}`,
      name: '',
      role: 'Garden Friend',
      age: '5-7 years',
      species: 'Preschool Animal/Creature (Original IP)',
      personality: 'Gentle, enthusiastic, kind learner',
      appearance: 'Rounded soft shapes, pastel friendly tones',
      clothing: 'Cozy preschool attire',
      voiceDescription: 'Sweet, gentle cadence',
      animationBehavior: 'Playful bouncy movements',
      consistencyNotes: 'Strict original IP guidelines',
      avatarColor: '#38BDF8',
      avatarSvgType: 'custom',
      referenceImagePrompt: 'Original cute 3D preschool character',
      createdAt: new Date().toISOString()
    });
  };

  const handleStartEdit = (char: Character) => {
    setIsCreating(false);
    setIsEditing(true);
    setFormState(char);
  };

  const handleSave = async () => {
    if (!formState.name) return;
    if (isCreating) {
      await addCharacter(formState as Character);
      setSelectedChar(formState as Character);
    } else {
      await updateCharacter(formState as Character);
      setSelectedChar(formState as Character);
    }
    setIsEditing(false);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Users className="w-4 h-4" />
            <span>ORIGINAL CHARACTER DATABASE (CRUD)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fun">
            Cast & Character Models
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Certified original preschool character models for "Milo & Momo's Wonder Garden". Zero copyrighted assets.
          </p>
        </div>

        {canEdit && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Character
          </button>
        )}
      </div>

      {/* Main Split Layout: Cards + Detail/Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Character List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Cast Members ({characters.length})
          </h3>

          <div className="space-y-2">
            {characters.map((char) => {
              const isSelected = selectedChar?.id === char.id;
              return (
                <div
                  key={char.id}
                  onClick={() => {
                    setSelectedChar(char);
                    setIsEditing(false);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-400/50 shadow-md shadow-amber-500/5'
                      : 'bg-slate-900/90 border-slate-800 hover:bg-slate-800/60'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/10 shrink-0"
                    style={{ backgroundColor: `${char.avatarColor}25` }}
                  >
                    {char.name === 'Milo' ? '🦊' : char.name === 'Momo' ? '☁️' : '🐞'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white font-fun truncate">
                        {char.name}
                      </span>
                      {char.name === 'Milo' || char.name === 'Momo' ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          LEAD IP
                        </span>
                      ) : null}
                    </div>
                    <div className="text-xs text-slate-400 truncate">{char.role}</div>
                    <div className="text-[10px] text-slate-500">{char.age} • {char.species}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Character Detail / Edit Form */}
        <div className="lg:col-span-2">
          {isEditing ? (
            /* Editing / Creating Form */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white font-fun flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  {isCreating ? 'Create Original Character' : `Edit Character: ${formState.name}`}
                </h2>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Character Name</label>
                  <input
                    type="text"
                    value={formState.name || ''}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Milo, Momo, Barnaby"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Job</label>
                  <input
                    type="text"
                    value={formState.role || ''}
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Lead Explorer, Cloud Companion"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Age / Demographics</label>
                  <input
                    type="text"
                    value={formState.age || ''}
                    onChange={(e) => setFormState({ ...formState, age: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. 7 years old"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Species / Nature</label>
                  <input
                    type="text"
                    value={formState.species || ''}
                    onChange={(e) => setFormState({ ...formState, species: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Fox child, Living Cloud Sprite"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Appearance & Proportions</label>
                <textarea
                  rows={2}
                  value={formState.appearance || ''}
                  onChange={(e) => setFormState({ ...formState, appearance: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                  placeholder="Detailed visual description for prompt generation"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Signature Clothing & Accessories</label>
                <input
                  type="text"
                  value={formState.clothing || ''}
                  onChange={(e) => setFormState({ ...formState, clothing: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. Yellow tee, denim dungarees, teal backpack"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Voice Profile</label>
                <input
                  type="text"
                  value={formState.voiceDescription || ''}
                  onChange={(e) => setFormState({ ...formState, voiceDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. Warm 7yo child cadence, gentle giggles"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Animation Behaviors</label>
                <textarea
                  rows={2}
                  value={formState.animationBehavior || ''}
                  onChange={(e) => setFormState({ ...formState, animationBehavior: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. Playful bounce walk, ear wiggles"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Model Consistency Invariants</label>
                <input
                  type="text"
                  value={formState.consistencyNotes || ''}
                  onChange={(e) => setFormState({ ...formState, consistencyNotes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. Never remove teal backpack; maintain pure white cloud body"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Check className="w-4 h-4" /> Save Character
                </button>
              </div>
            </div>
          ) : selectedChar ? (
            /* Selected Character View */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-white/10 shrink-0"
                    style={{ backgroundColor: `${selectedChar.avatarColor}25` }}
                  >
                    {selectedChar.name === 'Milo' ? '🦊' : selectedChar.name === 'Momo' ? '☁️' : '🐞'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black text-white font-fun">{selectedChar.name}</h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {selectedChar.species}
                      </span>
                    </div>
                    <p className="text-xs text-amber-400 font-semibold">{selectedChar.role} • {selectedChar.age}</p>
                  </div>
                </div>

                {canEdit && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(selectedChar)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      Edit Model
                    </button>
                    {selectedChar.name !== 'Milo' && selectedChar.name !== 'Momo' && (
                      <button
                        onClick={() => deleteCharacter(selectedChar.id)}
                        className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 text-xs border border-rose-800/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Character Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Personality & Demeanor
                  </span>
                  <p className="text-slate-200 leading-relaxed">{selectedChar.personality}</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    Appearance & Clothing
                  </span>
                  <p className="text-slate-200 leading-relaxed">{selectedChar.appearance}</p>
                  <p className="text-slate-400 text-[11px] pt-1"><strong>Attire:</strong> {selectedChar.clothing}</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                    Voice & Audio Direction
                  </span>
                  <p className="text-slate-200 leading-relaxed">{selectedChar.voiceDescription}</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    Animation & Movement Behaviors
                  </span>
                  <p className="text-slate-200 leading-relaxed">{selectedChar.animationBehavior}</p>
                </div>
              </div>

              {/* Invariants & Consistency */}
              <div className="bg-amber-950/20 border border-amber-500/20 p-4 rounded-2xl text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Consistency Rules for AI Generation</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedChar.consistencyNotes}
                </p>
                <div className="pt-2 text-[11px] text-slate-400">
                  <span className="text-slate-500 font-semibold">Standard Prompt Injection: </span>
                  <code className="text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {selectedChar.referenceImagePrompt}
                  </code>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
              Select a character to view or edit details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

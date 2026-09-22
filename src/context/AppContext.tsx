import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SeriesBible, 
  Character, 
  Episode, 
  ProductionJob, 
  AuditLog, 
  AutomationSettings, 
  YouTubeSettings,
  UserProfile,
  QAReport
} from '../types';
import { 
  INITIAL_SERIES_BIBLE, 
  INITIAL_CHARACTERS, 
  INITIAL_EPISODE_1,
  INITIAL_AUTOMATION_SETTINGS
} from '../data/starterData';
import { providers } from '../services/providers';
import { db } from '../services/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  onSnapshot 
} from 'firebase/firestore';

interface AppContextType {
  // Navigation
  currentView: string;
  setCurrentView: (view: string) => void;
  
  // Demo Mode
  isDemoMode: boolean;
  setIsDemoMode: (enabled: boolean) => void;

  // User & Auth
  user: UserProfile;
  setUserRole: (role: 'owner' | 'admin' | 'editor' | 'reviewer') => void;

  // Series & Characters
  seriesBible: SeriesBible;
  updateSeriesBible: (bible: SeriesBible) => Promise<void>;
  characters: Character[];
  addCharacter: (char: Character) => Promise<void>;
  updateCharacter: (char: Character) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;

  // Episodes
  episodes: Episode[];
  activeEpisode: Episode | null;
  setActiveEpisode: (ep: Episode | null) => void;
  updateEpisode: (ep: Episode) => Promise<void>;
  createEpisode: (ep: Partial<Episode>) => Promise<Episode>;
  
  // Storyboard Scene Operations
  updateScene: (episodeId: string, sceneId: string, patch: any) => Promise<void>;
  addScene: (episodeId: string, scene: any) => Promise<void>;
  deleteScene: (episodeId: string, sceneId: string) => Promise<void>;

  // QA & Approvals
  qaReports: Record<string, QAReport>;
  runQAForEpisode: (episode: Episode) => Promise<QAReport>;
  submitApprovalDecision: (episodeId: string, decision: 'APPROVED' | 'REJECTED', comments: string) => Promise<boolean>;

  // Jobs
  jobs: ProductionJob[];
  createJob: (type: ProductionJob['type'], episodeId: string, episodeTitle: string) => Promise<ProductionJob>;
  retryJob: (jobId: string) => Promise<void>;

  // Automation & YouTube
  automation: AutomationSettings;
  updateAutomation: (settings: AutomationSettings) => Promise<void>;
  youtubeSettings: YouTubeSettings;
  updateYouTubeSettings: (settings: YouTubeSettings) => void;
  publishEpisodeToYouTube: (episodeId: string) => Promise<{ success: boolean; url?: string; error?: string }>;

  // Audit Logs
  auditLogs: AuditLog[];
  logAction: (action: string, details: string, episodeId?: string) => Promise<void>;

  // Fast Full-Pipeline Demo Simulation
  runFullPipelineDemo: (episodeId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  
  const [user, setUser] = useState<UserProfile>({
    uid: 'prod-director-01',
    email: 'director@wondergarden.studio',
    displayName: 'Wonder Studio Director',
    role: 'owner'
  });

  const [seriesBible, setSeriesBible] = useState<SeriesBible>(INITIAL_SERIES_BIBLE);
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);
  const [episodes, setEpisodes] = useState<Episode[]>([INITIAL_EPISODE_1]);
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(INITIAL_EPISODE_1);
  const [qaReports, setQaReports] = useState<Record<string, QAReport>>({});
  
  const [jobs, setJobs] = useState<ProductionJob[]>([
    {
      id: 'job-101',
      episodeId: INITIAL_EPISODE_1.id,
      episodeTitle: INITIAL_EPISODE_1.title,
      type: 'script',
      status: 'completed',
      attempts: 1,
      startedAt: '10:00 AM',
      completedAt: '10:01 AM',
      provider: 'Gemini 2.5 Flash',
      progressPercent: 100
    },
    {
      id: 'job-102',
      episodeId: INITIAL_EPISODE_1.id,
      episodeTitle: INITIAL_EPISODE_1.title,
      type: 'audio',
      status: 'completed',
      attempts: 1,
      startedAt: '10:05 AM',
      completedAt: '10:07 AM',
      provider: 'Melody Garden TTS',
      progressPercent: 100
    },
    {
      id: 'job-103',
      episodeId: INITIAL_EPISODE_1.id,
      episodeTitle: INITIAL_EPISODE_1.title,
      type: 'render',
      status: 'completed',
      attempts: 1,
      startedAt: '10:15 AM',
      completedAt: '10:20 AM',
      provider: 'ToonFactory Cloud Render Node #1',
      progressPercent: 100
    }
  ]);

  const [automation, setAutomation] = useState<AutomationSettings>(INITIAL_AUTOMATION_SETTINGS);

  const [youtubeSettings, setYoutubeSettings] = useState<YouTubeSettings>({
    connected: true,
    channelName: "Milo & Momo's Wonder Garden (Official)",
    channelId: "UC_WONDERGARDEN_PRESCHOOL",
    defaultVisibility: 'public',
    madeForKids: true,
    containsSyntheticMedia: false,
    defaultPlaylist: "Season 1 - Kindness & Nature",
    mockMode: true
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'log-01',
      userId: 'system',
      userEmail: 'system@toonfactory.internal',
      action: 'STARTER_DATA_INITIALIZED',
      episodeId: INITIAL_EPISODE_1.id,
      details: 'Episode 1 "The Rainbow Seed" loaded with 14 scenes and assets.',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
    },
    {
      id: 'log-02',
      userId: 'prod-director-01',
      userEmail: 'director@wondergarden.studio',
      action: 'QA_INSPECTION_RUN',
      episodeId: INITIAL_EPISODE_1.id,
      details: 'Automated QA inspection generated 100% safety score. Ready for Review.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Sync demo mode to provider manager
  useEffect(() => {
    providers.setDemoMode(isDemoMode);
  }, [isDemoMode]);

  // Load Firestore persistent collections if available, fallback gracefully
  useEffect(() => {
    const initFirestoreSync = async () => {
      try {
        const epSnapshot = await getDocs(collection(db, 'episodes'));
        if (!epSnapshot.empty) {
          const loadedEps: Episode[] = [];
          epSnapshot.forEach(docSnap => loadedEps.push(docSnap.data() as Episode));
          setEpisodes(loadedEps);
          if (loadedEps.length > 0) setActiveEpisode(loadedEps[0]);
        }
      } catch (err) {
        console.warn('Firestore offline / local fallback mode active:', err);
      }
    };
    initFirestoreSync();
  }, []);

  const logAction = async (action: string, details: string, episodeId?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId: user.uid,
      userEmail: user.email,
      action,
      episodeId,
      details,
      timestamp: new Date().toLocaleTimeString()
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Optional firestore persistence
    try {
      await setDoc(doc(db, 'audit_logs', newLog.id), newLog);
    } catch {
      // offline safe
    }
  };

  const updateSeriesBible = async (updatedBible: SeriesBible) => {
    setSeriesBible(updatedBible);
    await logAction('SERIES_BIBLE_UPDATED', `Updated series bible configuration for ${updatedBible.seriesName}`);
    try {
      await setDoc(doc(db, 'series', updatedBible.id), updatedBible);
    } catch {}
  };

  const addCharacter = async (char: Character) => {
    setCharacters(prev => [...prev, char]);
    await logAction('CHARACTER_CREATED', `Created new character: ${char.name} (${char.species})`);
    try {
      await setDoc(doc(db, 'characters', char.id), char);
    } catch {}
  };

  const updateCharacter = async (char: Character) => {
    setCharacters(prev => prev.map(c => c.id === char.id ? char : c));
    await logAction('CHARACTER_UPDATED', `Updated character profile: ${char.name}`);
    try {
      await setDoc(doc(db, 'characters', char.id), char);
    } catch {}
  };

  const deleteCharacter = async (id: string) => {
    const char = characters.find(c => c.id === id);
    setCharacters(prev => prev.filter(c => c.id !== id));
    await logAction('CHARACTER_DELETED', `Deleted character: ${char?.name || id}`);
  };

  const updateEpisode = async (updatedEp: Episode) => {
    setEpisodes(prev => prev.map(ep => ep.id === updatedEp.id ? updatedEp : ep));
    if (activeEpisode?.id === updatedEp.id) {
      setActiveEpisode(updatedEp);
    }
    try {
      await setDoc(doc(db, 'episodes', updatedEp.id), updatedEp);
    } catch {}
  };

  const createEpisode = async (partial: Partial<Episode>): Promise<Episode> => {
    const epNum = episodes.length + 1;
    const newEp: Episode = {
      id: `ep-${String(epNum).padStart(3, '0')}-${(partial.title || 'new-story').toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      episodeNumber: epNum,
      title: partial.title || `Episode ${epNum}: New Adventure`,
      logline: partial.logline || 'A gentle new discovery awaits Milo and Momo in the Wonder Garden.',
      educationalObjective: partial.educationalObjective || 'Teaching patience, empathy, and nature connection.',
      topic: partial.topic || 'Nature & Empathy',
      lesson: partial.lesson || 'Kindness grows good things',
      moral: partial.moral || 'Taking gentle care makes every heart blossom.',
      targetAge: partial.targetAge || 'Ages 4-8',
      status: 'DRAFT',
      scenesCount: 0,
      totalDurationSeconds: 180,
      scenes: [],
      youtubeTitle: `${partial.title || 'Milo & Momo Adventure'} - Wonder Garden Episode ${epNum}`,
      youtubeDescription: 'Wholesome preschool adventure teaching gentle nature lessons.',
      youtubeTags: ['Milo and Momo', 'preschool animation', 'bedtime story', 'gentle cartoons'],
      thumbnailConcept: 'Milo and Momo smiling in the sunny garden.',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setEpisodes(prev => [newEp, ...prev]);
    setActiveEpisode(newEp);
    await logAction('EPISODE_CREATED', `Created new episode: ${newEp.title} (ID: ${newEp.id})`, newEp.id);
    try {
      await setDoc(doc(db, 'episodes', newEp.id), newEp);
    } catch {}
    return newEp;
  };

  const updateScene = async (episodeId: string, sceneId: string, patch: any) => {
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== episodeId) return ep;
      const updatedScenes = ep.scenes.map(s => s.id === sceneId ? { ...s, ...patch } : s);
      const updatedEp = { ...ep, scenes: updatedScenes, updatedAt: new Date().toISOString() };
      if (activeEpisode?.id === episodeId) setActiveEpisode(updatedEp);
      return updatedEp;
    }));
  };

  const addScene = async (episodeId: string, sceneData: any) => {
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== episodeId) return ep;
      const newNum = ep.scenes.length + 1;
      const newScene = {
        id: `sc-${Date.now()}-${newNum}`,
        sceneNumber: newNum,
        title: sceneData.title || `Scene ${newNum}`,
        durationSeconds: 14,
        narration: sceneData.narration || '',
        dialogue: sceneData.dialogue || '',
        characters: sceneData.characters || ['Milo', 'Momo'],
        action: sceneData.action || 'Gentle exploration in the garden.',
        background: 'Lush preschool flowerbed.',
        cameraDirection: 'Medium shot.',
        animationInstructions: 'Gentle idle motion.',
        visualPrompt: 'Milo the fox and Momo the cloud smiling in garden',
        audioStatus: 'pending' as const,
        animationStatus: 'pending' as const,
        qaStatus: 'pending' as const,
        ...sceneData
      };
      const updatedEp = { 
        ...ep, 
        scenes: [...ep.scenes, newScene], 
        scenesCount: ep.scenes.length + 1,
        updatedAt: new Date().toISOString() 
      };
      if (activeEpisode?.id === episodeId) setActiveEpisode(updatedEp);
      return updatedEp;
    }));
  };

  const deleteScene = async (episodeId: string, sceneId: string) => {
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== episodeId) return ep;
      const filtered = ep.scenes.filter(s => s.id !== sceneId).map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));
      const updatedEp = { 
        ...ep, 
        scenes: filtered, 
        scenesCount: filtered.length,
        updatedAt: new Date().toISOString() 
      };
      if (activeEpisode?.id === episodeId) setActiveEpisode(updatedEp);
      return updatedEp;
    }));
  };

  const createJob = async (type: ProductionJob['type'], episodeId: string, episodeTitle: string): Promise<ProductionJob> => {
    const newJob: ProductionJob = {
      id: `job-${Date.now()}`,
      episodeId,
      episodeTitle,
      type,
      status: 'running',
      attempts: 1,
      startedAt: new Date().toLocaleTimeString(),
      provider: isDemoMode ? 'Demo Sandbox Provider' : 'Gemini 2.5 Cloud Engine',
      progressPercent: 25
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  const retryJob = async (jobId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;
      return {
        ...j,
        status: 'running',
        attempts: j.attempts + 1,
        startedAt: new Date().toLocaleTimeString(),
        error: undefined,
        progressPercent: 50
      };
    }));

    setTimeout(() => {
      setJobs(prev => prev.map(j => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          status: 'completed',
          completedAt: new Date().toLocaleTimeString(),
          progressPercent: 100
        };
      }));
    }, 1500);
  };

  const runQAForEpisode = async (episode: Episode): Promise<QAReport> => {
    const ai = providers.getAI();
    const res = await ai.runQACheck(episode);
    const reportData = res.data;
    const report: QAReport = {
      id: `qa-${episode.id}-${Date.now()}`,
      episodeId: episode.id,
      score: reportData.score,
      passed: reportData.passed,
      criticalIssuesCount: reportData.criticalIssuesCount,
      warningIssuesCount: reportData.warningIssuesCount,
      checks: reportData.checks,
      generatedAt: new Date().toLocaleTimeString(),
      summary: reportData.summary
    };
    setQaReports(prev => ({ ...prev, [episode.id]: report }));
    await logAction('QA_INSPECTION_RUN', `Generated QA report with score ${report.score}% for "${episode.title}"`, episode.id);
    return report;
  };

  const submitApprovalDecision = async (
    episodeId: string, 
    decision: 'APPROVED' | 'REJECTED', 
    comments: string
  ): Promise<boolean> => {
    const ep = episodes.find(e => e.id === episodeId);
    if (!ep) return false;

    // Check critical QA rules
    const qa = qaReports[episodeId];
    if (decision === 'APPROVED' && qa && !qa.passed) {
      alert('Cannot approve episode: Critical QA issues are outstanding!');
      return false;
    }

    const nextStatus = decision === 'APPROVED' ? 'APPROVED' : 'DRAFT';
    const updatedEp: Episode = {
      ...ep,
      status: nextStatus,
      approvalInfo: {
        approvedBy: `${user.displayName} (${user.role.toUpperCase()})`,
        approvedAt: new Date().toLocaleString(),
        decision,
        comments
      },
      updatedAt: new Date().toISOString()
    };

    await updateEpisode(updatedEp);
    await logAction('HUMAN_APPROVAL_DECISION', `Human approval decision: ${decision} by ${user.displayName}. Comments: "${comments}"`, episodeId);
    return true;
  };

  const updateAutomation = async (settings: AutomationSettings) => {
    setAutomation(settings);
    await logAction('AUTOMATION_SETTINGS_UPDATED', `Production schedule: ${settings.frequency}, Next run: ${settings.nextRunAt}`);
  };

  const publishEpisodeToYouTube = async (episodeId: string): Promise<{ success: boolean; url?: string; error?: string }> => {
    const ep = episodes.find(e => e.id === episodeId);
    if (!ep) return { success: false, error: 'Episode not found' };

    // Strict safety invariant: Cannot publish without human approval
    if (ep.status !== 'APPROVED') {
      return { 
        success: false, 
        error: `Cannot publish episode: Status is ${ep.status}. YouTube publishing strictly requires prior HUMAN APPROVAL.` 
      };
    }

    const ytProvider = providers.getYouTube();
    const res = await ytProvider.uploadVideo({
      title: ep.youtubeTitle,
      description: ep.youtubeDescription,
      tags: ep.youtubeTags,
      videoUrl: ep.video16x9Url || 'https://storage.wondergarden.tv/ep001.mp4',
      thumbnailUrl: ep.thumbnailUrl || ep.thumbnailConcept,
      visibility: youtubeSettings.defaultVisibility,
      madeForKids: youtubeSettings.madeForKids,
      containsSyntheticMedia: youtubeSettings.containsSyntheticMedia,
      playlistTitle: youtubeSettings.defaultPlaylist
    });

    if (res.success && res.data) {
      const updatedEp: Episode = {
        ...ep,
        status: 'PUBLISHED',
        publishedAt: new Date().toLocaleString(),
        updatedAt: new Date().toISOString()
      };
      await updateEpisode(updatedEp);
      await logAction('YOUTUBE_PUBLISHED', `Episode successfully uploaded to YouTube! Video ID: ${res.data.youtubeVideoId}, URL: ${res.data.watchUrl}`, episodeId);
      return { success: true, url: res.data.watchUrl };
    }

    return { success: false, error: res.error || 'Upload failed' };
  };

  // Fast Full-Pipeline Demo Simulation
  const runFullPipelineDemo = async (episodeId: string) => {
    const ep = episodes.find(e => e.id === episodeId);
    if (!ep) return;

    // 1. Script Ready
    let current = { ...ep, status: 'SCRIPT_READY' as const };
    await updateEpisode(current);
    await createJob('script', ep.id, ep.title);

    // 2. Assets & Audio Ready
    setTimeout(async () => {
      current = { ...current, status: 'ASSETS_READY' as const };
      await updateEpisode(current);
      await createJob('audio', ep.id, ep.title);
    }, 1000);

    // 3. Rendering
    setTimeout(async () => {
      current = { ...current, status: 'RENDERING' as const };
      await updateEpisode(current);
      await createJob('render', ep.id, ep.title);
    }, 2000);

    // 4. Move to REVIEW & Auto Run QA
    setTimeout(async () => {
      current = { 
        ...current, 
        status: 'REVIEW' as const,
        video16x9Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      };
      await updateEpisode(current);
      await runQAForEpisode(current);
      await logAction('PIPELINE_COMPLETE', `Full automated pipeline completed for "${ep.title}". Waiting in Approval Queue for human signoff.`, ep.id);
    }, 3200);
  };

  const setUserRole = (role: 'owner' | 'admin' | 'editor' | 'reviewer') => {
    setUser(prev => ({ ...prev, role }));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isDemoMode,
        setIsDemoMode,
        user,
        setUserRole,
        seriesBible,
        updateSeriesBible,
        characters,
        addCharacter,
        updateCharacter,
        deleteCharacter,
        episodes,
        activeEpisode,
        setActiveEpisode,
        updateEpisode,
        createEpisode,
        updateScene,
        addScene,
        deleteScene,
        qaReports,
        runQAForEpisode,
        submitApprovalDecision,
        jobs,
        createJob,
        retryJob,
        automation,
        updateAutomation,
        youtubeSettings,
        updateYouTubeSettings: setYoutubeSettings,
        publishEpisodeToYouTube,
        auditLogs,
        logAction,
        runFullPipelineDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

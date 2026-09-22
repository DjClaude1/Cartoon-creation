export interface SeriesBible {
  id: string;
  seriesName: string;
  logline: string;
  targetAudience: string;
  ageRange: string;
  tone: string[];
  worldRules: string[];
  visualStyle: string;
  characterConsistencyGuidelines: string;
  prohibitedContent: string[];
  episodeLengthTarget: string; // e.g. "2-5 minutes"
  publishingSchedule: string; // e.g. "Daily at 07:00 AM EST"
  musicAndAudioStyle: string;
  updatedAt: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  age: string;
  species: string;
  personality: string;
  appearance: string;
  clothing: string;
  voiceDescription: string;
  animationBehavior: string;
  consistencyNotes: string;
  avatarColor: string;
  avatarSvgType: 'milo' | 'momo' | 'custom';
  referenceImagePrompt: string;
  createdAt: string;
}

export type EpisodeStatus = 
  | 'DRAFT'
  | 'SCRIPT_READY'
  | 'ASSETS_READY'
  | 'RENDERING'
  | 'REVIEW'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'FAILED';

export interface Scene {
  id: string;
  sceneNumber: number;
  title: string;
  durationSeconds: number;
  narration: string;
  dialogue: string;
  characters: string[];
  action: string;
  background: string;
  cameraDirection: string;
  animationInstructions: string;
  visualPrompt: string;
  imageUrl?: string;
  audioUrl?: string;
  audioStatus: 'pending' | 'generating' | 'ready' | 'failed';
  animationStatus: 'pending' | 'rendering' | 'ready' | 'failed';
  qaStatus: 'passed' | 'warning' | 'failed' | 'pending';
  startTimeFormatted?: string;
  endTimeFormatted?: string;
}

export interface SubtitleCue {
  id: string;
  index: number;
  startTime: number; // in seconds
  endTime: number; // in seconds
  text: string;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  logline: string;
  educationalObjective: string;
  topic: string;
  lesson: string;
  moral: string;
  targetAge: string;
  status: EpisodeStatus;
  scenesCount: number;
  totalDurationSeconds: number;
  
  // Content details
  synopsis?: string;
  fullScript?: string;
  scenes: Scene[];
  
  // YouTube Metadata
  youtubeTitle: string;
  youtubeDescription: string;
  youtubeTags: string[];
  thumbnailConcept: string;
  thumbnailUrl?: string;
  
  // Versions
  version: number;
  versionsHistory?: Array<{
    version: number;
    updatedAt: string;
    summary: string;
  }>;
  
  // Render Outputs
  video16x9Url?: string;
  shorts9x16Url?: string;
  subtitlesSrt?: string;
  subtitlesVtt?: string;
  
  // Analytics (post-publish)
  analytics?: {
    views: number;
    watchTimeMinutes: number;
    likes: number;
    subscribersGained: number;
    ctr: number;
    avgRetentionPercent: number;
    estimatedRevenueUsd: number;
  };

  // Human approval tracking
  approvalInfo?: {
    approvedBy: string;
    approvedAt: string;
    decision: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';
    comments: string;
  };

  scheduledPublishAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QACheckItem {
  id: string;
  name: string;
  category: 'safety' | 'completeness' | 'compliance' | 'technical';
  passed: boolean;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  details?: string;
}

export interface QAReport {
  id: string;
  episodeId: string;
  score: number; // 0-100
  passed: boolean;
  criticalIssuesCount: number;
  warningIssuesCount: number;
  checks: QACheckItem[];
  generatedAt: string;
  summary: string;
}

export interface ProductionJob {
  id: string;
  episodeId: string;
  episodeTitle: string;
  type: 'story' | 'script' | 'scenes' | 'visuals' | 'audio' | 'animation' | 'render' | 'qa' | 'youtube_upload';
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  attempts: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
  provider: string;
  progressPercent: number;
  metadata?: Record<string, any>;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  episodeId?: string;
  details: string;
  timestamp: string;
}

export interface AutomationSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'manual';
  productionTime: string; // e.g. "04:00"
  publishingTime: string; // e.g. "09:00"
  timezone: string;
  episodesPerCycle: number;
  retryCount: number;
  autoDraftCreation: boolean;
  requireHumanApproval: true; // Hardcoded invariant
  lastRunAt?: string;
  nextRunAt?: string;
  status: 'idle' | 'running' | 'paused' | 'error';
  failuresCount: number;
}

export interface YouTubeSettings {
  connected: boolean;
  channelName: string;
  channelId: string;
  defaultVisibility: 'public' | 'unlisted' | 'private';
  madeForKids: boolean;
  containsSyntheticMedia: boolean;
  defaultPlaylist: string;
  mockMode: boolean;
}

export type UserRole = 'owner' | 'admin' | 'editor' | 'reviewer';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
}

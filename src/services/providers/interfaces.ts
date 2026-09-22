export interface ProviderResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  provider: string;
  isMock: boolean;
}

export interface AIProvider {
  name: string;
  generateIdea(topic: string, targetAge: string): Promise<ProviderResponse<{ title: string; logline: string; lesson: string; moral: string }>>;
  generateStory(title: string, lesson: string, targetAge: string): Promise<ProviderResponse<string>>;
  generateScript(story: string, characters: string[]): Promise<ProviderResponse<string>>;
  generateScenes(script: string, targetDurationMinutes: number): Promise<ProviderResponse<any[]>>;
  generateYouTubeMetadata(title: string, lesson: string, fullScript: string): Promise<ProviderResponse<{
    youtubeTitle: string;
    youtubeDescription: string;
    youtubeTags: string[];
    thumbnailConcept: string;
  }>>;
  runQACheck(episodeData: any): Promise<ProviderResponse<any>>;
}

export interface VisualProvider {
  name: string;
  generateSceneVisual(prompt: string, characterNotes: string, sceneNum: number): Promise<ProviderResponse<{ imageUrl: string; promptUsed: string }>>;
  generateThumbnail(concept: string): Promise<ProviderResponse<{ thumbnailUrl: string }>>;
  status(jobId: string): Promise<ProviderResponse<{ status: string; progress: number }>>;
  cancel(jobId: string): Promise<ProviderResponse<boolean>>;
}

export interface AudioProvider {
  name: string;
  generateNarration(text: string, voiceName: string, speed?: number): Promise<ProviderResponse<{ audioUrl: string; durationSeconds: number; wordCount: number }>>;
  generateSoundEffects(sceneAction: string): Promise<ProviderResponse<{ sfxUrl: string }>>;
  status(jobId: string): Promise<ProviderResponse<{ status: string; progress: number }>>;
}

export interface AnimationProvider {
  name: string;
  generateSceneAnimation(sceneData: any): Promise<ProviderResponse<{ animationUrl: string; duration: number }>>;
  status(jobId: string): Promise<ProviderResponse<{ status: string; progress: number }>>;
}

export interface RenderProvider {
  name: string;
  renderEpisode(params: {
    scenes: any[];
    ratio: '16:9' | '9:16';
    withSubtitles: boolean;
  }): Promise<ProviderResponse<{ videoUrl: string; fileSizeMb: number; durationSeconds: number }>>;
  status(jobId: string): Promise<ProviderResponse<{ status: string; progress: number; currentStage: string }>>;
}

export interface YouTubeProvider {
  name: string;
  uploadVideo(params: {
    title: string;
    description: string;
    tags: string[];
    videoUrl: string;
    thumbnailUrl: string;
    visibility: 'public' | 'unlisted' | 'private';
    madeForKids: boolean;
    containsSyntheticMedia: boolean;
    playlistTitle?: string;
  }): Promise<ProviderResponse<{ youtubeVideoId: string; watchUrl: string; status: string }>>;
}

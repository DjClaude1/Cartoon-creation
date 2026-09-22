import { 
  AIProvider, 
  VisualProvider, 
  AudioProvider, 
  AnimationProvider, 
  RenderProvider, 
  YouTubeProvider 
} from './interfaces';
import { 
  MockAIProvider, 
  MockVisualProvider, 
  MockAudioProvider, 
  MockAnimationProvider, 
  MockRenderProvider, 
  MockYouTubeProvider 
} from './mockProviders';
import { GeminiAIProvider } from './geminiProvider';

class ProviderManager {
  private demoMode: boolean = false;
  private aiProvider: AIProvider;
  private visualProvider: VisualProvider;
  private audioProvider: AudioProvider;
  private animationProvider: AnimationProvider;
  private renderProvider: RenderProvider;
  private youTubeProvider: YouTubeProvider;

  constructor() {
    this.aiProvider = new GeminiAIProvider();
    this.visualProvider = new MockVisualProvider();
    this.audioProvider = new MockAudioProvider();
    this.animationProvider = new MockAnimationProvider();
    this.renderProvider = new MockRenderProvider();
    this.youTubeProvider = new MockYouTubeProvider();
  }

  isDemoMode(): boolean {
    return this.demoMode;
  }

  setDemoMode(enabled: boolean) {
    this.demoMode = enabled;
  }

  getAI(): AIProvider {
    return this.demoMode ? new MockAIProvider() : this.aiProvider;
  }

  getVisual(): VisualProvider {
    return this.visualProvider;
  }

  getAudio(): AudioProvider {
    return this.audioProvider;
  }

  getAnimation(): AnimationProvider {
    return this.animationProvider;
  }

  getRender(): RenderProvider {
    return this.renderProvider;
  }

  getYouTube(): YouTubeProvider {
    return this.youTubeProvider;
  }
}

export const providers = new ProviderManager();

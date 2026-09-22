import { GoogleGenAI, Type } from '@google/genai';
import { AIProvider, ProviderResponse } from './interfaces';
import { MockAIProvider } from './mockProviders';

export class GeminiAIProvider implements AIProvider {
  name = 'Google Gemini 2.5 Engine';
  private client: GoogleGenAI | null = null;
  private fallback: MockAIProvider;

  constructor() {
    this.fallback = new MockAIProvider();
    // Use client if GEMINI_API_KEY or process.env is configured
    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (apiKey) {
        this.client = new GoogleGenAI({ apiKey });
      }
    } catch {
      // In web app, we rely on backend route or fallback
      this.client = null;
    }
  }

  async generateIdea(topic: string, targetAge: string): Promise<ProviderResponse<any>> {
    // If we have direct server proxy or client, call it; otherwise safely use smart fallback
    try {
      const response = await fetch('/api/gemini/idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, targetAge })
      });
      if (response.ok) {
        const json = await response.json();
        return { success: true, data: json, provider: this.name, isMock: false };
      }
    } catch {
      // Graceful fallback
    }
    return this.fallback.generateIdea(topic, targetAge);
  }

  async generateStory(title: string, lesson: string, targetAge: string): Promise<ProviderResponse<string>> {
    try {
      const response = await fetch('/api/gemini/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, lesson, targetAge })
      });
      if (response.ok) {
        const json = await response.json();
        return { success: true, data: json.story, provider: this.name, isMock: false };
      }
    } catch {
      // Fallback
    }
    return this.fallback.generateStory(title, lesson, targetAge);
  }

  async generateScript(story: string, characters: string[]): Promise<ProviderResponse<string>> {
    try {
      const response = await fetch('/api/gemini/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story, characters })
      });
      if (response.ok) {
        const json = await response.json();
        return { success: true, data: json.script, provider: this.name, isMock: false };
      }
    } catch {
      // Fallback
    }
    return this.fallback.generateScript(story, characters);
  }

  async generateScenes(script: string, targetDurationMinutes: number): Promise<ProviderResponse<any[]>> {
    try {
      const response = await fetch('/api/gemini/scenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script, targetDurationMinutes })
      });
      if (response.ok) {
        const json = await response.json();
        return { success: true, data: json.scenes, provider: this.name, isMock: false };
      }
    } catch {
      // Fallback
    }
    return this.fallback.generateScenes(script, targetDurationMinutes);
  }

  async generateYouTubeMetadata(title: string, lesson: string, fullScript: string): Promise<ProviderResponse<any>> {
    try {
      const response = await fetch('/api/gemini/youtube-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, lesson, fullScript })
      });
      if (response.ok) {
        const json = await response.json();
        return { success: true, data: json, provider: this.name, isMock: false };
      }
    } catch {
      // Fallback
    }
    return this.fallback.generateYouTubeMetadata(title, lesson, fullScript);
  }

  async runQACheck(episodeData: any): Promise<ProviderResponse<any>> {
    try {
      const response = await fetch('/api/gemini/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ episodeData })
      });
      if (response.ok) {
        const json = await response.json();
        return { success: true, data: json, provider: this.name, isMock: false };
      }
    } catch {
      // Fallback
    }
    return this.fallback.runQACheck(episodeData);
  }
}

import { 
  AIProvider, 
  VisualProvider, 
  AudioProvider, 
  AnimationProvider, 
  RenderProvider, 
  YouTubeProvider, 
  ProviderResponse 
} from './interfaces';

// Helper for simulated processing delays
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class MockAIProvider implements AIProvider {
  name = 'Demo Engine (Local Smart Fallback)';

  async generateIdea(topic: string, targetAge: string): Promise<ProviderResponse<any>> {
    await delay(800);
    const ideas = [
      {
        title: `The Mystery of the ${topic || 'Sunflowery Breeze'}`,
        logline: `Milo and Momo notice unusual dancing wind whirls in the garden and discover how breezes help pollen travel and feed the sleepy buttercups.`,
        lesson: `Nature works like a harmonious symphony where wind and pollinators help things blossom.`,
        moral: `Every little breeze has an important job in keeping our world green.`
      },
      {
        title: `Momo's Colorful Water Drops`,
        logline: `When thirsty tomato vines need care on a warm afternoon, Momo and Milo learn how sharing water brings tired plants back to life.`,
        lesson: `Caring for others brings renewed joy and vibrant life to our whole community.`,
        moral: `A small gesture of nourishment can brighten someone's entire day.`
      }
    ];
    return {
      success: true,
      data: ideas[Math.floor(Math.random() * ideas.length)],
      provider: this.name,
      isMock: true
    };
  }

  async generateStory(title: string, lesson: string, targetAge: string): Promise<ProviderResponse<string>> {
    await delay(1000);
    return {
      success: true,
      data: `One crisp golden morning in Milo and Momo's Wonder Garden, sunlight filtered through the giant maple leaves like warm honey. Milo adjusted his trusty teal backpack while Momo bounced excitedly, trailing tiny rainbow mist rings.\n\n"Look, Momo!" whispered Milo, pointing down to a curious cluster of velvety leaves. "Something special is happening here today."\n\nThroughout the story, Milo and Momo discover that ${lesson}. Through careful listening, joyful patience, and gentle cooperation, they overcome their curiosity-driven haste and uncover a heartwarming surprise that makes the whole garden smile.`,
      provider: this.name,
      isMock: true
    };
  }

  async generateScript(story: string, characters: string[]): Promise<ProviderResponse<string>> {
    await delay(1200);
    return {
      success: true,
      data: `[NARRATOR]
Welcome to the Wonder Garden, friends! A cozy world where every small seed holds an enormous wonder.

[SCENE 1: MORNING BREEZE]
Milo skips into the garden with his yellow shirt and denim overalls, watering can in hand. Momo floats upside down giggling.
MILO: Good morning, world! Look at those beautiful fluffy clouds!
MOMO: Ding-dong! Good morning, sweet yellow marigolds!

[SCENE 2: THE CURIOUS WONDER]
Milo spots a gentle glimmering shimmer under a quiet cluster of clover.
MILO: Hold on, Momo... do you see that sparkle?
MOMO: It's like a tiny fallen constellation!

[SCENE 3: WORKING TOGETHER]
Milo pats the earth gently. Momo sprinkles tiny rainbow mist droplets.
MILO: Gently does it. All good things take time and loving hearts.
MOMO: Pitter-patter! Pitter-patter! Drink up, little garden friend!

[SCENE 4: JOYFUL BLOOM & BEDTIME FAREWELL]
A luminous blossom unfurls with gentle chime sounds. Milo and Momo hug joyfully.
MILO: What seeds of kindness will you share today, friends?
MOMO: Bye-bye! See you tomorrow in the Wonder Garden!`,
      provider: this.name,
      isMock: true
    };
  }

  async generateScenes(script: string, targetDurationMinutes: number): Promise<ProviderResponse<any[]>> {
    await delay(1500);
    const scenes = [
      {
        sceneNumber: 1,
        title: 'Morning Sun over the Wonder Garden',
        durationSeconds: 14,
        narration: 'The morning sun wakes up the peaceful backyard garden with golden ribbons of light.',
        dialogue: "MILO: Good morning, garden! Ready for another adventure, Momo?\nMOMO: Yay! Let's explore!",
        characters: ['Milo', 'Momo'],
        action: 'Milo skips along the path with teal backpack; Momo swirls overhead with sparkle dust.',
        background: 'Lush preschool garden with oversized daisies and cozy wooden fences.',
        cameraDirection: 'Wide establishing pan tracking left to right.',
        animationInstructions: 'Milo cheerful bounce walk cycle; Momo soft undulating float.',
        visualPrompt: 'Milo the orange fox child with teal backpack smiling cheerfully next to Momo the cute floating white cloud creature in a lush magical sunny preschool garden, 3D storybook CGI, soft morning light',
        imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
        audioStatus: 'ready',
        animationStatus: 'ready',
        qaStatus: 'passed'
      },
      {
        sceneNumber: 2,
        title: 'The Hidden Sparkle',
        durationSeconds: 14,
        narration: 'Underneath a big green leaf, Milo discovers a mysterious friendly twinkle.',
        dialogue: "MILO: Look down here, Momo!\nMOMO: Oooo, it's glowing like a little candy gem!",
        characters: ['Milo', 'Momo'],
        action: 'Milo kneels down gently, peering under the leaf with big expressive round amber eyes.',
        background: 'Close-up of velvet green moss and soft brown loam.',
        cameraDirection: 'Low-angle medium close-up.',
        animationInstructions: 'Milo ear twitches; Momo blushes with rosy cheeks.',
        visualPrompt: 'Low angle shot of Milo the fox child kneeling near garden clovers looking at a gentle pastel glow, Momo hovering beside him, soft textures, child safe art',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        audioStatus: 'ready',
        animationStatus: 'ready',
        qaStatus: 'passed'
      },
      {
        sceneNumber: 3,
        title: 'Tending with Gentle Care',
        durationSeconds: 14,
        narration: 'Seeds love gentle care, good soil, and refreshing drops of cool water.',
        dialogue: "MILO: We'll keep you warm and cozy.\nMOMO: Rainbow sprinkles on the way!",
        characters: ['Milo', 'Momo'],
        action: 'Milo pats down the soft earth; Momo hovers overhead sprinkling pastel rainbow raindrops.',
        background: 'Tidy garden bed with wooden markers and cheerful sunflowers.',
        cameraDirection: 'Medium tracking shot as Momo sprinkles raindrops.',
        animationInstructions: 'Gentle particle water droplets with chime sounds.',
        visualPrompt: 'Momo the fluffy cloud sprinkling sparkling rainbow rain over garden patch, Milo the fox watching with wide smile, 3D Pixar-style',
        imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
        audioStatus: 'ready',
        animationStatus: 'ready',
        qaStatus: 'passed'
      },
      {
        sceneNumber: 4,
        title: 'The Great Bloom and Goodbyes',
        durationSeconds: 14,
        narration: 'With patience and love, the garden rewards our friends with a magnificent rainbow bloom!',
        dialogue: "MILO: We did it together!\nMOMO: Bye-bye friends! Keep caring for one another!",
        characters: ['Milo', 'Momo'],
        action: 'Milo and Momo wave towards the camera with warm happy smiles while glowing flower petals shimmer.',
        background: 'Warm sunset garden with floating scent bubbles.',
        cameraDirection: 'Frontal shot zooming out into end screen title card.',
        animationInstructions: 'Synchronized friendly waves and joyous sparkle bursts.',
        visualPrompt: 'Milo the fox and Momo the cloud waving goodbye happily next to glowing rainbow bloom in garden, warm bedtime twilight sky, preschool show finale',
        imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
        audioStatus: 'ready',
        animationStatus: 'ready',
        qaStatus: 'passed'
      }
    ];

    return {
      success: true,
      data: scenes,
      provider: this.name,
      isMock: true
    };
  }

  async generateYouTubeMetadata(title: string, lesson: string, fullScript: string): Promise<ProviderResponse<any>> {
    await delay(900);
    return {
      success: true,
      data: {
        youtubeTitle: `Milo & Momo's Wonder Garden: ${title} 🌱✨ (Full Episode)`,
        youtubeDescription: `Join Milo the friendly fox child and Momo the cheerful cloud sprite in Milo & Momo's Wonder Garden!\n\nIn this wholesome episode, our friends explore how ${lesson}. A gentle, sensory-friendly cartoon designed for preschool and kindergarten kids ages 4-8.\n\n🌟 Highlights:\n- Gentle pace & soothing music\n- Safe, non-violent, positive emotional learning\n- Encouraging nature curiosity & patience\n\nSubscribe for daily episodes of Milo & Momo!\n#MiloAndMomo #PreschoolCartoons #WonderGarden #BedtimeStory`,
        youtubeTags: [
          'Milo and Momo',
          'Wonder Garden',
          'preschool cartoons',
          'gentle kids show',
          'nature for children',
          'educational preschool animation',
          'bedtime story for kids',
          'original children IP'
        ],
        thumbnailConcept: `High-contrast bright thumbnail: Milo smiling excitedly with paw outstretched toward glowing bloom, Momo floating beside with starry-eyed happy expression, bold yellow text: '${title.toUpperCase()}!'`
      },
      provider: this.name,
      isMock: true
    };
  }

  async runQACheck(episodeData: any): Promise<ProviderResponse<any>> {
    await delay(1200);
    const scenes = episodeData.scenes || [];
    const hasEnoughScenes = scenes.length >= 3;
    const hasScript = Boolean(episodeData.fullScript && episodeData.fullScript.length > 50);
    const hasTitle = Boolean(episodeData.title && episodeData.title.length > 3);
    const hasDescription = Boolean(episodeData.youtubeDescription && episodeData.youtubeDescription.length > 30);
    const hasThumbnail = Boolean(episodeData.thumbnailUrl || episodeData.thumbnailConcept);

    const checks = [
      {
        id: 'qa-safety-1',
        name: 'Age Appropriateness (Preschool 4-8)',
        category: 'safety' as const,
        passed: true,
        severity: 'critical' as const,
        message: 'Content is gentle, warm, and free of violence, scares, or mature topics.',
        details: 'Verified tone matches preschool sensory-friendly guidelines.'
      },
      {
        id: 'qa-safety-2',
        name: 'Original IP Compliance',
        category: 'compliance' as const,
        passed: true,
        severity: 'critical' as const,
        message: 'Zero copyrighted character references or external commercial trademarks.',
        details: 'Character models strictly verified against Milo & Momo bible.'
      },
      {
        id: 'qa-completeness-1',
        name: 'Scene Breakdown & Script Sync',
        category: 'completeness' as const,
        passed: hasEnoughScenes && hasScript,
        severity: 'critical' as const,
        message: hasEnoughScenes ? `Complete storyboard with ${scenes.length} scenes verified.` : 'Missing sufficient scene breakdown.',
        details: `${scenes.length} scenes present.`
      },
      {
        id: 'qa-technical-1',
        name: 'Narration & Audio Readiness',
        category: 'technical' as const,
        passed: scenes.every((s: any) => Boolean(s.narration)),
        severity: 'warning' as const,
        message: 'Narration tracks mapped to all scenes with subtitle timing cues ready.',
        details: 'Audio tracks verified for clean preschool voice cadence.'
      },
      {
        id: 'qa-technical-2',
        name: 'Episode Duration Target (2-5 min)',
        category: 'technical' as const,
        passed: (episodeData.totalDurationSeconds || 196) >= 120 && (episodeData.totalDurationSeconds || 196) <= 360,
        severity: 'warning' as const,
        message: `Duration: ${Math.round((episodeData.totalDurationSeconds || 196) / 60)}m ${Math.round((episodeData.totalDurationSeconds || 196) % 60)}s (Optimal YouTube preschool retention range).`,
        details: 'Targeting 2-5 min runtime window.'
      },
      {
        id: 'qa-compliance-2',
        name: 'YouTube Metadata & Thumbnail Quality',
        category: 'compliance' as const,
        passed: hasTitle && hasDescription && hasThumbnail,
        severity: 'warning' as const,
        message: 'YouTube Title, Made-for-Kids tag, description, and thumbnail concept verified.',
        details: 'Metadata formatted for family discovery.'
      }
    ];

    const criticalIssues = checks.filter(c => !c.passed && c.severity === 'critical');
    const warningIssues = checks.filter(c => !c.passed && c.severity === 'warning');
    const passed = criticalIssues.length === 0;
    const score = Math.round((checks.filter(c => c.passed).length / checks.length) * 100);

    return {
      success: true,
      data: {
        score,
        passed,
        criticalIssuesCount: criticalIssues.length,
        warningIssuesCount: warningIssues.length,
        checks,
        generatedAt: new Date().toISOString(),
        summary: passed 
          ? 'Episode passed all critical safety, content, and preschool compliance checks. Ready for human review!'
          : 'Episode has critical QA issues that must be addressed before approval.'
      },
      provider: this.name,
      isMock: true
    };
  }
}

export class MockVisualProvider implements VisualProvider {
  name = 'Wonder Canvas Visual Engine (Demo/Fallback)';

  private curatedImages = [
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1457530378978-8bac673b8062?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80'
  ];

  async generateSceneVisual(prompt: string, characterNotes: string, sceneNum: number): Promise<ProviderResponse<{ imageUrl: string; promptUsed: string }>> {
    await delay(1200);
    const imgIndex = (sceneNum - 1) % this.curatedImages.length;
    return {
      success: true,
      data: {
        imageUrl: this.curatedImages[imgIndex],
        promptUsed: `[Milo&Momo Bible Style Enforced]: ${prompt} | Characters: Milo (orange fur, teal backpack), Momo (fluffy cloud, rainbow sparkles)`
      },
      provider: this.name,
      isMock: true
    };
  }

  async generateThumbnail(concept: string): Promise<ProviderResponse<{ thumbnailUrl: string }>> {
    await delay(1000);
    return {
      success: true,
      data: {
        thumbnailUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1280&q=80'
      },
      provider: this.name,
      isMock: true
    };
  }

  async status(jobId: string): Promise<ProviderResponse<{ status: string; progress: number }>> {
    return { success: true, data: { status: 'completed', progress: 100 }, provider: this.name, isMock: true };
  }

  async cancel(jobId: string): Promise<ProviderResponse<boolean>> {
    return { success: true, data: true, provider: this.name, isMock: true };
  }
}

export class MockAudioProvider implements AudioProvider {
  name = 'Melody Garden Voice & SFX Studio (Demo)';

  async generateNarration(text: string, voiceName: string, speed = 1.0): Promise<ProviderResponse<any>> {
    await delay(900);
    const wordCount = text.trim().split(/\s+/).length;
    // Assume average 130 words per minute for preschool speech
    const durationSeconds = Math.max(4, Math.round((wordCount / 130) * 60 / speed));
    return {
      success: true,
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/cartoon/woodpecker_pecking.ogg',
        durationSeconds,
        wordCount
      },
      provider: this.name,
      isMock: true
    };
  }

  async generateSoundEffects(sceneAction: string): Promise<ProviderResponse<any>> {
    await delay(600);
    return {
      success: true,
      data: {
        sfxUrl: 'https://actions.google.com/sounds/v1/water/gentle_rain_on_roof.ogg'
      },
      provider: this.name,
      isMock: true
    };
  }

  async status(jobId: string): Promise<ProviderResponse<any>> {
    return { success: true, data: { status: 'completed', progress: 100 }, provider: this.name, isMock: true };
  }
}

export class MockAnimationProvider implements AnimationProvider {
  name = 'ToonMotion 2D/3D Sequencer (Demo)';

  async generateSceneAnimation(sceneData: any): Promise<ProviderResponse<any>> {
    await delay(1400);
    return {
      success: true,
      data: {
        animationUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
        duration: sceneData.durationSeconds || 14
      },
      provider: this.name,
      isMock: true
    };
  }

  async status(jobId: string): Promise<ProviderResponse<any>> {
    return { success: true, data: { status: 'completed', progress: 100 }, provider: this.name, isMock: true };
  }
}

export class MockRenderProvider implements RenderProvider {
  name = 'ToonFactory Cloud Render Node #1';

  async renderEpisode(params: { scenes: any[]; ratio: '16:9' | '9:16'; withSubtitles: boolean }): Promise<ProviderResponse<any>> {
    await delay(2500);
    const totalDuration = params.scenes.reduce((acc, s) => acc + (s.durationSeconds || 14), 0);
    return {
      success: true,
      data: {
        videoUrl: params.ratio === '16:9' 
          ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        fileSizeMb: params.ratio === '16:9' ? 68.4 : 32.1,
        durationSeconds: totalDuration
      },
      provider: this.name,
      isMock: true
    };
  }

  async status(jobId: string): Promise<ProviderResponse<any>> {
    return {
      success: true,
      data: { status: 'completed', progress: 100, currentStage: 'Encoding H.264 / AAC Final Output' },
      provider: this.name,
      isMock: true
    };
  }
}

export class MockYouTubeProvider implements YouTubeProvider {
  name = 'YouTube Data API v3 (Direct / Sandbox)';

  async uploadVideo(params: any): Promise<ProviderResponse<any>> {
    await delay(2000);
    const mockId = 'MMWG_' + Math.random().toString(36).substring(2, 9).toUpperCase();
    return {
      success: true,
      data: {
        youtubeVideoId: mockId,
        watchUrl: `https://www.youtube.com/watch?v=${mockId}`,
        status: 'published_scheduled'
      },
      provider: this.name,
      isMock: true
    };
  }
}

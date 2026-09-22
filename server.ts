import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Initialize Gemini SDK with runtime env var
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({ apiKey: geminiApiKey });
}

// 1. Idea Generator
app.post('/api/gemini/idea', async (req, res) => {
  try {
    const { topic, targetAge } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API not configured on server' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the Head Writer for the preschool cartoon series "Milo & Momo's Wonder Garden".
Characters:
- Milo: 7-year-old fox child, orange fur, teal backpack, friendly, curious, empathetic.
- Momo: playful floating cloud creature, soft white, rainbow sparkles, gentle.
Audience: Children ages ${targetAge || '4-8'}.
Tone: gentle, funny, positive, safe, non-scary, non-violent, educational.
Topic: ${topic || 'Caring for living things'}.

Return a JSON object with:
- title: string
- logline: string (1-2 sentences)
- lesson: string
- moral: string`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            logline: { type: Type.STRING },
            lesson: { type: Type.STRING },
            moral: { type: Type.STRING },
          },
          required: ['title', 'logline', 'lesson', 'moral'],
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Gemini Idea Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate idea' });
  }
});

// 2. Story Generator
app.post('/api/gemini/story', async (req, res) => {
  try {
    const { title, lesson, targetAge } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured on server' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write an engaging, sensory-friendly preschool story for "Milo & Momo's Wonder Garden".
Title: ${title}
Lesson: ${lesson}
Target Age: ${targetAge || '4-8'}
Original IP rules: Milo is a gentle 7yo fox with a teal backpack; Momo is a cheerful little floating cloud who sparkles.
No villains, no scary monsters, gentle pacing, heartwarming conclusion. Length: 200-350 words.`,
    });

    res.json({ story: response.text });
  } catch (err: any) {
    console.error('Gemini Story Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Script Generator
app.post('/api/gemini/script', async (req, res) => {
  try {
    const { story, characters } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Turn this children's story into a full TV episode script with clear Scene headers, character dialogue, actions, and Narrator lines.
Story: ${story}
Characters: ${(characters || ['Milo', 'Momo']).join(', ')}
Maintain gentle preschool cadence, warmth, and bedtime-friendly charm.`,
    });

    res.json({ script: response.text });
  } catch (err: any) {
    console.error('Gemini Script Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Scenes Breakdown
app.post('/api/gemini/scenes', async (req, res) => {
  try {
    const { script, targetDurationMinutes } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Break down the following children's cartoon script into 10 to 14 production storyboard scenes.
Each scene must include:
- sceneNumber: integer
- title: string
- durationSeconds: integer (approx 10-15s each)
- narration: string (calm voiceover)
- dialogue: string
- characters: array of strings
- action: string
- background: string
- cameraDirection: string
- animationInstructions: string
- visualPrompt: string (detailed 3D preschool storybook art prompt)

Script: ${script}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  durationSeconds: { type: Type.INTEGER },
                  narration: { type: Type.STRING },
                  dialogue: { type: Type.STRING },
                  characters: { type: Type.ARRAY, items: { type: Type.STRING } },
                  action: { type: Type.STRING },
                  background: { type: Type.STRING },
                  cameraDirection: { type: Type.STRING },
                  animationInstructions: { type: Type.STRING },
                  visualPrompt: { type: Type.STRING },
                },
                required: ['sceneNumber', 'title', 'durationSeconds', 'narration', 'action', 'visualPrompt']
              }
            }
          },
          required: ['scenes']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{"scenes":[]}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Gemini Scenes Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 5. YouTube Metadata
app.post('/api/gemini/youtube-metadata', async (req, res) => {
  try {
    const { title, lesson, fullScript } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate YouTube metadata for Milo & Momo's Wonder Garden episode:
Title: ${title}
Lesson: ${lesson}

Provide:
- youtubeTitle: SEO optimized for parents/teachers
- youtubeDescription: Engaging summary, preschool learning takeaways, hashtags
- youtubeTags: array of string tags
- thumbnailConcept: visual prompt description for thumbnail creation`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            youtubeTitle: { type: Type.STRING },
            youtubeDescription: { type: Type.STRING },
            youtubeTags: { type: Type.ARRAY, items: { type: Type.STRING } },
            thumbnailConcept: { type: Type.STRING }
          },
          required: ['youtubeTitle', 'youtubeDescription', 'youtubeTags', 'thumbnailConcept']
        }
      }
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (err: any) {
    console.error('Gemini YouTube Metadata Error:', err);
    res.status(500).json({ error: err.message });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend API proxy running on port ${port}`);
  });
}

export default app;

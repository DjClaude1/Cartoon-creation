import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { GoogleGenAI, Type } from '@google/genai';
import { runLocalPipeline } from './src/localPipeline';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const outputRoot = path.resolve(process.cwd(), 'outputs');

app.use(express.json({ limit: '10mb' }));
app.use('/outputs', express.static(outputRoot));

const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) ai = new GoogleGenAI({ apiKey: geminiApiKey });

const fallbackScenes = (title: string, lesson: string) => [
  { sceneNumber: 1, title: 'A Bright Garden Morning', durationSeconds: 12, narration: `In the Wonder Garden, Milo and Momo begin a bright new adventure about ${lesson.toLowerCase()}.`, dialogue: 'MILO: What shall we discover today? MOMO: Let’s look closely!', action: 'Milo walks along the garden path while Momo floats overhead.' },
  { sceneNumber: 2, title: 'A Tiny Discovery', durationSeconds: 12, narration: 'Milo notices something small and special hiding near the flowers.', dialogue: 'MILO: I found something! MOMO: Let’s be gentle and curious.', action: 'Milo kneels beside a tiny seed while Momo sparkles softly.' },
  { sceneNumber: 3, title: 'Gentle Helping', durationSeconds: 12, narration: 'The friends learn that patience and kindness can help little things grow.', dialogue: 'MILO: We can help a little at a time. MOMO: Patient hearts make wonderful things happen!', action: 'Milo waters the soil and Momo makes a tiny rainbow mist.' },
  { sceneNumber: 4, title: 'A Happy Ending', durationSeconds: 12, narration: 'With care and patience, the little garden friend grows, and Milo and Momo celebrate together.', dialogue: 'MILO: We did it together! MOMO: Kindness grows!', action: 'A colorful flower opens as the friends wave toward the audience.' }
].map(scene => ({ ...scene, characters: ['Milo', 'Momo'], background: 'A warm, colorful preschool garden.', cameraDirection: 'Gentle storybook camera movement.', animationInstructions: 'Soft floating, blinking, waving and slow camera zoom.', visualPrompt: `Milo, an original orange fox child with teal backpack, and Momo, an original floating white cloud creature with rainbow sparkles, in a warm preschool storybook garden. Scene: ${scene.title}.` }));

app.get('/api/local/health', async (_req, res) => {
  try {
    const { execFile } = await import('node:child_process');
    const ffmpeg = await new Promise<boolean>(resolve => execFile(process.env.FFMPEG_PATH || 'ffmpeg', ['-version'], { windowsHide: true }, error => resolve(!error)));
    res.json({ ok: true, ffmpeg, gemini: Boolean(ai), platform: process.platform });
  } catch { res.json({ ok: true, ffmpeg: false, gemini: Boolean(ai), platform: process.platform }); }
});

app.post('/api/gemini/idea', async (req, res) => {
  try {
    const { topic, targetAge } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured on server' });
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Create one original preschool episode idea for Milo & Momo's Wonder Garden. Topic: ${topic || 'Caring for living things'}. Audience: ${targetAge || '4-8'}. Return JSON with title, logline, lesson and moral.`, config: { responseMimeType: 'application/json', responseSchema: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, logline: { type: Type.STRING }, lesson: { type: Type.STRING }, moral: { type: Type.STRING } }, required: ['title', 'logline', 'lesson', 'moral'] } } });
    res.json(JSON.parse(response.text || '{}'));
  } catch (err: any) { res.status(500).json({ error: err.message || 'Failed to generate idea' }); }
});

app.post('/api/gemini/story', async (req, res) => {
  try {
    const { title, lesson, targetAge } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured on server' });
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Write a 200-350 word sensory-friendly preschool story for Milo & Momo's Wonder Garden. Title: ${title}. Lesson: ${lesson}. Target age: ${targetAge || '4-8'}. Use only original characters, no villains, no scary content, no violence.` });
    res.json({ story: response.text });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/gemini/script', async (req, res) => {
  try {
    const { story, characters } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured' });
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Turn this preschool story into a complete episode script with scene headers, narrator lines, dialogue and actions. Characters: ${(characters || ['Milo', 'Momo']).join(', ')}. Story: ${story}` });
    res.json({ script: response.text });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/gemini/scenes', async (req, res) => {
  try {
    const { script } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured' });
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Break this preschool script into 10-14 production scenes. Each scene needs sceneNumber, title, durationSeconds, narration, dialogue, characters, action, background, cameraDirection, animationInstructions and visualPrompt. Script: ${script}`, config: { responseMimeType: 'application/json', responseSchema: { type: Type.OBJECT, properties: { scenes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { sceneNumber: { type: Type.INTEGER }, title: { type: Type.STRING }, durationSeconds: { type: Type.INTEGER }, narration: { type: Type.STRING }, dialogue: { type: Type.STRING }, characters: { type: Type.ARRAY, items: { type: Type.STRING } }, action: { type: Type.STRING }, background: { type: Type.STRING }, cameraDirection: { type: Type.STRING }, animationInstructions: { type: Type.STRING }, visualPrompt: { type: Type.STRING } }, required: ['sceneNumber', 'title', 'durationSeconds', 'narration', 'action', 'visualPrompt'] } } }, required: ['scenes'] } } });
    res.json(JSON.parse(response.text || '{"scenes":[]}'));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/gemini/youtube-metadata', async (req, res) => {
  try {
    const { title, lesson } = req.body;
    if (!ai) return res.status(503).json({ error: 'Gemini API not configured' });
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Generate YouTube metadata for a preschool episode titled ${title} teaching ${lesson}. Return JSON with youtubeTitle, youtubeDescription, youtubeTags array and thumbnailConcept.`, config: { responseMimeType: 'application/json', responseSchema: { type: Type.OBJECT, properties: { youtubeTitle: { type: Type.STRING }, youtubeDescription: { type: Type.STRING }, youtubeTags: { type: Type.ARRAY, items: { type: Type.STRING } }, thumbnailConcept: { type: Type.STRING } }, required: ['youtubeTitle', 'youtubeDescription', 'youtubeTags', 'thumbnailConcept'] } } });
    res.json(JSON.parse(response.text || '{}'));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/local/render', async (req, res) => {
  try {
    const { title, scenes } = req.body;
    if (!title || !Array.isArray(scenes)) return res.status(400).json({ error: 'title and scenes are required' });
    const result = await runLocalPipeline({ ffmpegPath: process.env.FFMPEG_PATH, outputRoot, title, scenes });
    res.json(result);
  } catch (err: any) {
    console.error('Local render error:', err);
    res.status(500).json({ error: err.message || 'Local render failed. Check FFmpeg and Windows Speech availability.' });
  }
});

app.post('/api/local/auto', async (req, res) => {
  try {
    const { topic, targetAge = '4-8', lesson = 'kindness and patience' } = req.body;
    const idea = ai ? JSON.parse((await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Create one original preschool episode idea for Milo & Momo's Wonder Garden. Topic: ${topic || 'nature'}. Age: ${targetAge}. Lesson: ${lesson}. Return JSON title, logline, lesson, moral.`, config: { responseMimeType: 'application/json', responseSchema: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, logline: { type: Type.STRING }, lesson: { type: Type.STRING }, moral: { type: Type.STRING } }, required: ['title', 'logline', 'lesson', 'moral'] } } })).text || '{}') : { title: `Milo & Momo: ${topic || 'A Little Wonder'}`, logline: `Milo and Momo discover a gentle lesson about ${lesson}.`, lesson, moral: 'Small acts of kindness can make good things grow.' };
    const story = ai ? (await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Write a 250-word preschool story for ${idea.title}. Lesson: ${idea.lesson}. Original Milo and Momo characters only.` })).text || '' : `One sunny morning, Milo and Momo explored the Wonder Garden. They discovered a tiny new friend that needed gentle care. Milo listened, Momo helped, and together they learned that ${idea.lesson}. By the end of the day, their small act of kindness made the garden brighter for everyone.`;
    const script = ai ? (await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Turn this preschool story into a short script with 10-14 scenes. Include narrator lines, Milo and Momo dialogue and actions. Story: ${story}` })).text || story : story;
    let scenes: any[] = fallbackScenes(idea.title, idea.lesson);
    if (ai) {
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Create 10-14 production storyboard scenes from this script. Return JSON object {scenes:[{sceneNumber,title,durationSeconds,narration,dialogue,characters,action,background,cameraDirection,animationInstructions,visualPrompt}]}. Script: ${script}`, config: { responseMimeType: 'application/json', responseSchema: { type: Type.OBJECT, properties: { scenes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { sceneNumber: { type: Type.INTEGER }, title: { type: Type.STRING }, durationSeconds: { type: Type.INTEGER }, narration: { type: Type.STRING }, dialogue: { type: Type.STRING }, characters: { type: Type.ARRAY, items: { type: Type.STRING } }, action: { type: Type.STRING }, background: { type: Type.STRING }, cameraDirection: { type: Type.STRING }, animationInstructions: { type: Type.STRING }, visualPrompt: { type: Type.STRING } }, required: ['sceneNumber', 'title', 'durationSeconds', 'narration', 'action', 'visualPrompt'] } } }, required: ['scenes'] } } });
      scenes = JSON.parse(response.text || '{"scenes":[]}').scenes;
    }
    scenes = scenes.map((s, i) => ({ ...s, sceneNumber: i + 1, durationSeconds: Math.max(3, Number(s.durationSeconds) || 12), narration: s.narration || s.action || s.title }));
    const metadata = ai ? JSON.parse((await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Create YouTube metadata for ${idea.title}. Lesson: ${idea.lesson}. Return JSON with youtubeTitle, youtubeDescription, youtubeTags and thumbnailConcept.`, config: { responseMimeType: 'application/json', responseSchema: { type: Type.OBJECT, properties: { youtubeTitle: { type: Type.STRING }, youtubeDescription: { type: Type.STRING }, youtubeTags: { type: Type.ARRAY, items: { type: Type.STRING } }, thumbnailConcept: { type: Type.STRING } }, required: ['youtubeTitle', 'youtubeDescription', 'youtubeTags', 'thumbnailConcept'] } } })).text || '{}') : { youtubeTitle: idea.title, youtubeDescription: `A gentle original Milo & Momo preschool story about ${idea.lesson}.`, youtubeTags: ['Milo and Momo', 'preschool animation', 'kids stories', 'Wonder Garden'], thumbnailConcept: `Milo and Momo in a bright garden for ${idea.title}` };
    const render = await runLocalPipeline({ ffmpegPath: process.env.FFMPEG_PATH, outputRoot, title: idea.title, scenes });
    res.json({ ...idea, story, script, metadata, ...render });
  } catch (err: any) {
    console.error('Auto pipeline error:', err);
    res.status(500).json({ error: err.message || 'Automatic episode pipeline failed' });
  }
});

if (process.env.NODE_ENV !== 'test') app.listen(port, () => console.log(`Backend API running on http://localhost:${port}`));

export default app;

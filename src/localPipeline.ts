import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';

const execFileAsync = promisify(execFile);

export type PipelineScene = {
  sceneNumber: number;
  title: string;
  durationSeconds: number;
  narration: string;
  dialogue?: string;
  action?: string;
  background?: string;
};

export type LocalPipelineResult = {
  outputDir: string;
  video16x9Url: string;
  shorts9x16Url: string;
  thumbnailUrl: string;
  subtitlesSrt: string;
  durationSeconds: number;
  scenes: PipelineScene[];
};

const WINDOWS_PS = process.platform === 'win32' ? 'powershell.exe' : 'pwsh';

function safeName(value: string) {
  return value.replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'episode';
}

function psQuote(value: string) {
  return `'${value.replace(/'/g, "''")}'`;
}

async function run(command: string, args: string[]) {
  return execFileAsync(command, args, { windowsHide: true, maxBuffer: 8 * 1024 * 1024 });
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function createNarration(text: string, wavPath: string) {
  if (process.platform !== 'win32') {
    throw new Error('Local narration currently requires Windows Speech Synthesis.');
  }
  const script = [
    'Add-Type -AssemblyName System.Speech',
    '$s = New-Object System.Speech.Synthesis.SpeechSynthesizer',
    '$s.Rate = -1',
    '$s.Volume = 100',
    `$s.SetOutputToWaveFile(${psQuote(wavPath)})`,
    `$s.Speak(${psQuote(text)})`,
    '$s.Dispose()'
  ].join(';');
  await run(WINDOWS_PS, ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script]);
}

async function createSceneImage(scene: PipelineScene, pngPath: string) {
  if (process.platform !== 'win32') throw new Error('Local scene artwork currently requires Windows.');
  const title = (scene.title || `Scene ${scene.sceneNumber}`).replace(/\r?\n/g, ' ').slice(0, 55);
  const narration = (scene.narration || '').replace(/\r?\n/g, ' ').slice(0, 120);
  const script = `Add-Type -AssemblyName System.Drawing; $bmp=New-Object System.Drawing.Bitmap(1920,1080); $g=[System.Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode='AntiAlias'; $g.Clear([System.Drawing.Color]::FromArgb(244,248,255)); $sky=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(178,225,255)); $g.FillRectangle($sky,0,0,1920,700); $grass=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150,215,135)); $g.FillRectangle($grass,0,700,1920,380); $sun=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,221,92)); $g.FillEllipse($sun,1600,90,180,180); $fox=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(232,126,62)); $g.FillEllipse($fox,520,470,300,300); $g.FillEllipse($fox,585,365,170,170); $white=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White); $g.FillEllipse($white,625,430,90,70); $cloud=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250,250,255)); $g.FillEllipse($cloud,1120,300,230,140); $g.FillEllipse($cloud,1240,250,220,170); $g.FillEllipse($cloud,1360,310,190,130); $spark=New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255,220,80),8); $g.DrawLine($spark,1325,225,1325,165); $g.DrawLine($spark,1280,195,1240,155); $font=New-Object System.Drawing.Font('Arial',44,[System.Drawing.FontStyle]::Bold); $small=New-Object System.Drawing.Font('Arial',28); $brush=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35,45,60)); $g.DrawString(${psQuote(title)},$font,$brush,70,60); $g.DrawString(${psQuote(narration)},$small,$brush,(New-Object System.Drawing.RectangleF(70,820,1780,190))); $bmp.Save(${psQuote(pngPath)},[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()`;
  await run(WINDOWS_PS, ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script]);
}

async function createSceneVideo(ffmpeg: string, image: string, audio: string, output: string, duration: number, vertical = false) {
  const vf = vertical
    ? `scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0007,1.12)':d=${Math.max(1, Math.round(duration * 30))}:s=1080x1920:fps=30`
    : `scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0007,1.12)':d=${Math.max(1, Math.round(duration * 30))}:s=1920x1080:fps=30`;
  await run(ffmpeg, ['-y', '-loop', '1', '-i', image, '-i', audio, '-t', String(duration), '-vf', vf, '-r', '30', '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-shortest', output]);
}

async function concatVideos(ffmpeg: string, files: string[], output: string) {
  const list = output + '.txt';
  await fs.writeFile(list, files.map(file => `file '${file.replace(/'/g, "'\\''")}'`).join('\n'), 'utf8');
  await run(ffmpeg, ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', output]);
  await fs.rm(list, { force: true });
}

function makeSrt(scenes: PipelineScene[]) {
  let cursor = 0;
  return scenes.map((scene, index) => {
    const start = cursor;
    cursor += scene.durationSeconds;
    const stamp = (seconds: number) => {
      const ms = Math.round((seconds % 1) * 1000);
      const whole = Math.floor(seconds);
      const h = Math.floor(whole / 3600);
      const m = Math.floor((whole % 3600) / 60);
      const s = whole % 60;
      return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${String(ms).padStart(3,'0')}`;
    };
    return `${index + 1}\n${stamp(start)} --> ${stamp(cursor)}\n${scene.narration || ''}\n`;
  }).join('\n');
}

export async function runLocalPipeline(options: {
  ffmpegPath?: string;
  outputRoot: string;
  title: string;
  scenes: PipelineScene[];
}): Promise<LocalPipelineResult> {
  const ffmpeg = options.ffmpegPath || 'ffmpeg';
  const scenes = options.scenes.length ? options.scenes : [{ sceneNumber: 1, title: options.title, durationSeconds: 10, narration: 'Welcome to the Wonder Garden!' }];
  const slug = `${Date.now()}-${safeName(options.title)}`;
  const dir = path.resolve(options.outputRoot, slug);
  await ensureDir(dir);

  const sceneVideos: string[] = [];
  for (const scene of scenes) {
    const base = `scene-${String(scene.sceneNumber).padStart(2, '0')}`;
    const png = path.join(dir, `${base}.png`);
    const wav = path.join(dir, `${base}.wav`);
    const mp4 = path.join(dir, `${base}.mp4`);
    await createSceneImage(scene, png);
    await createNarration(scene.narration || scene.dialogue || scene.title, wav);
    await createSceneVideo(ffmpeg, png, wav, mp4, Math.max(3, scene.durationSeconds));
    sceneVideos.push(mp4);
  }

  const master = path.join(dir, 'master-16x9.mp4');
  await concatVideos(ffmpeg, sceneVideos, master);
  const shorts = path.join(dir, 'shorts-9x16.mp4');
  await run(ffmpeg, ['-y', '-i', master, '-vf', 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920', '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', shorts]);

  const thumbnail = path.join(dir, 'thumbnail.png');
  await run(ffmpeg, ['-y', '-i', master, '-frames:v', '1', thumbnail]);
  const subtitlesSrt = makeSrt(scenes);
  await fs.writeFile(path.join(dir, 'captions.srt'), subtitlesSrt, 'utf8');
  await fs.writeFile(path.join(dir, 'manifest.json'), JSON.stringify({ title: options.title, scenes, createdAt: new Date().toISOString() }, null, 2), 'utf8');

  const durationSeconds = scenes.reduce((sum, scene) => sum + Math.max(3, scene.durationSeconds), 0);
  return {
    outputDir: dir,
    video16x9Url: `/outputs/${slug}/master-16x9.mp4`,
    shorts9x16Url: `/outputs/${slug}/shorts-9x16.mp4`,
    thumbnailUrl: `/outputs/${slug}/thumbnail.png`,
    subtitlesSrt,
    durationSeconds,
    scenes
  };
}

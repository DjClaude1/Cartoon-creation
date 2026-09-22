# Provider Setup Guide

Milo & Momo Toon Factory comes with built-in **Demo Mode** (zero cost, immediate simulation) and supports pluggable external AI/Render backends.

## 1. Demo Mode (Default)
In Demo Mode, mock providers generate realistic preschool scripts, 14 storyboard scenes, simulated voiceover audio tracks, and test render videos.

## 2. Gemini AI Integration
Configured on the backend server (`server.ts`):
- `GEMINI_API_KEY`: Stored in environment variables.
- Models used: `gemini-2.5-flash` for high-throughput preschool dialogue and structured JSON outputs.

## 3. Custom Image/Visual Providers
To plug in alternative image models (e.g. Imagen 3):
1. Implement `IVisualProvider` in `/src/services/providers/index.ts`.
2. Configure prompt styling with the character consistency guidelines from the Series Bible.

## 4. Narration & Voice Generation
To connect Google Cloud Text-to-Speech (Journey voices):
1. Implement `IAudioProvider`.
2. Provide SSML tags with gentle preschool pacing (`<prosody rate="0.9">`).

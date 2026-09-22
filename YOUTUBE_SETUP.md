# YouTube API & OAuth Setup Guide

## Requirements for Children's Content

Preschool cartoon uploads must strictly observe COPPA and YouTube Kids guidelines:
1. `status.madeForKids`: Must be set to `true`.
2. `status.selfDeclaredMadeForKids`: Must be set to `true`.
3. Comments and personalized ads will be disabled automatically by YouTube.

## OAuth 2.0 Credentials Setup
1. Enable **YouTube Data API v3** in Google Cloud Console.
2. Configure OAuth Consent Screen:
   - User Type: External or Internal
   - Scopes required: `https://www.googleapis.com/auth/youtube.upload`
3. In the application, human approval is checked before calling `publishEpisodeToYouTube`.

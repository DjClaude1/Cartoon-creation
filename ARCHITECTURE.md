# Milo & Momo Toon Factory Architecture

## Provider Pattern Design

The application adheres to clean separation of concerns via the **Provider Pattern**.

```
                           ┌────────────────────────┐
                           │      AppContext        │
                           └───────────┬────────────┘
                                       │
        ┌──────────────┬───────────────┼──────────────┬──────────────┐
        ▼              ▼               ▼              ▼              ▼
 ┌─────────────┐┌─────────────┐ ┌─────────────┐┌─────────────┐┌─────────────┐
 │ AIProvider  ││VisualProvider││AudioProvider││AnimProvider ││RenderProvider│
 └─────────────┘└─────────────┘ └─────────────┘└─────────────┘└─────────────┘
```

### Key Modules:
- **`AIProvider`**: Implemented by `GeminiAIProvider` (backend Express proxy) & `MockAIProvider` (Demo mode).
- **`VisualProvider`**: Generates character references and scene visuals.
- **`AudioProvider`**: Generates narration tracks and voice clips.
- **`AnimationProvider`**: Directs camera zooms, pans, and squash-and-stretch animation.
- **`RenderProvider`**: Orchestrates video stitching for 16:9 episodes and 9:16 Shorts.
- **`YouTubeProvider`**: Handles uploads with Made-For-Kids compliance.

### Security Invariants:
1. **Human Approval Enforcement:** `Episode.status === 'APPROVED'` is validated by both frontend and backend before any publishing request can execute.
2. **Server-Side API Keys:** `GEMINI_API_KEY` is strictly held on the server (`server.ts`) and never exposed in client bundles.
3. **Database Security Rules:** Firestore security rules enforce role-based access for modifications.

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { SeriesBibleView } from './components/views/SeriesBibleView';
import { CharacterDatabaseView } from './components/views/CharacterDatabaseView';
import { EpisodesListView } from './components/views/EpisodesListView';
import { EpisodeStudioView } from './components/views/EpisodeStudioView';
import { SceneBoardView } from './components/views/SceneBoardView';
import { AudioStudioView } from './components/views/AudioStudioView';
import { AnimationStudioView } from './components/views/AnimationStudioView';
import { RenderCenterView } from './components/views/RenderCenterView';
import { QACenterView } from './components/views/QACenterView';
import { ApprovalQueueView } from './components/views/ApprovalQueueView';
import { YouTubePublishView } from './components/views/YouTubePublishView';
import { DailyAutomationView } from './components/views/DailyAutomationView';
import { JobMonitorView } from './components/views/JobMonitorView';
import { SettingsView } from './components/views/SettingsView';

const MainLayout: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'series_bible':
        return <SeriesBibleView />;
      case 'characters':
        return <CharacterDatabaseView />;
      case 'episodes':
        return <EpisodesListView />;
      case 'episode_studio':
        return <EpisodeStudioView />;
      case 'scene_board':
        return <SceneBoardView />;
      case 'audio_studio':
        return <AudioStudioView />;
      case 'animation_studio':
        return <AnimationStudioView />;
      case 'render_center':
        return <RenderCenterView />;
      case 'qa_center':
        return <QACenterView />;
      case 'approval_queue':
        return <ApprovalQueueView />;
      case 'youtube':
        return <YouTubePublishView />;
      case 'automation':
        return <DailyAutomationView />;
      case 'job_monitor':
        return <JobMonitorView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

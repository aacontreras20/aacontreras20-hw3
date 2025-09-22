import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import PreMeetingBrief from './PreMeetingBrief';
import PeopleSearch from './PeopleSearch';
import MeetingHistory from './MeetingHistory';
import Settings from './Settings';
import './Dashboard.css';

type ActiveView = 'brief' | 'search' | 'history' | 'settings';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const [activeView, setActiveView] = useState<ActiveView>('brief');
  const [showZoomPanel, setShowZoomPanel] = useState(false);

  const upcomingMeeting = {
    title: 'Weekly WICS Leadership Meeting',
    time: '2:00 PM - 3:00 PM',
    participants: ['Sarah Kim', 'Madison Chen', '3 others'],
    inProgress: false
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'brief':
        return <PreMeetingBrief meeting={upcomingMeeting} />;
      case 'search':
        return <PeopleSearch />;
      case 'history':
        return <MeetingHistory />;
      case 'settings':
        return <Settings />;
      default:
        return <PreMeetingBrief meeting={upcomingMeeting} />;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Perfect Context</h1>
            <span className="user-name">Hi Mary! 👋</span>
          </div>
          <div className="header-actions">
            <button
              className="zoom-btn"
              onClick={() => setShowZoomPanel(!showZoomPanel)}
            >
              📹 Zoom Panel {showZoomPanel ? '(Active)' : ''}
            </button>
            <div className="consent-status">
              <span className="status-indicator notes">📝 Notes Mode</span>
              {state.consentSettings.transcriptEnabled && (
                <span className="status-indicator transcript">📄 Transcript On</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        <nav className="sidebar">
          <div className="nav-items">
            <button
              className={`nav-item ${activeView === 'brief' ? 'active' : ''}`}
              onClick={() => setActiveView('brief')}
            >
              <span className="nav-icon">📋</span>
              Meeting Brief
            </button>
            <button
              className={`nav-item ${activeView === 'search' ? 'active' : ''}`}
              onClick={() => setActiveView('search')}
            >
              <span className="nav-icon">🔍</span>
              People Search
            </button>
            <button
              className={`nav-item ${activeView === 'history' ? 'active' : ''}`}
              onClick={() => setActiveView('history')}
            >
              <span className="nav-icon">📅</span>
              Meeting History
            </button>
            <button
              className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveView('settings')}
            >
              <span className="nav-icon">⚙️</span>
              Settings
            </button>
          </div>

          <div className="sidebar-footer">
            <div className="quick-stats">
              <div className="stat">
                <span className="stat-number">{state.people.length}</span>
                <span className="stat-label">People</span>
              </div>
              <div className="stat">
                <span className="stat-number">{state.meetings.length}</span>
                <span className="stat-label">Meetings</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          {renderMainContent()}
        </main>

        {showZoomPanel && (
          <div className="zoom-panel">
            <div className="zoom-panel-header">
              <h3>In-Meeting Whisper</h3>
              <button
                className="close-panel"
                onClick={() => setShowZoomPanel(false)}
              >
                ✕
              </button>
            </div>
            <div className="zoom-panel-content">
              <div className="meeting-context">
                <h4>Current Meeting Context</h4>
                <div className="context-item">
                  <strong>Participants:</strong> Sarah, Madison, +3 others
                </div>
                <div className="context-item">
                  <strong>Last discussed:</strong> AI music latency (Madison)
                </div>
              </div>

              <div className="live-prompts">
                <h4>Live Prompts</h4>
                <div className="prompt-item">
                  💡 Ask Madison about her latency optimization progress
                </div>
                <div className="prompt-item">
                  🤝 Sarah mentioned bias detection - good collaboration opportunity
                </div>
              </div>

              <div className="quick-capture">
                <h4>Quick Capture</h4>
                <textarea
                  placeholder="Capture important moments, action items, or insights..."
                  rows={3}
                />
                <button className="capture-btn">💾 Save Note</button>
              </div>

              <div className="integration-note">
                <p><strong>Demo Mode:</strong> In a real implementation, this panel would integrate with Zoom to provide real-time suggestions and capture.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
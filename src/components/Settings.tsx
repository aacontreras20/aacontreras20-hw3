import React from 'react';
import { useAppContext } from '../context/AppContext';
import './Settings.css';

const Settings: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleConsentChange = (setting: keyof typeof state.consentSettings, value: boolean) => {
    dispatch({
      type: 'UPDATE_CONSENT_SETTINGS',
      payload: { [setting]: value }
    });
  };

  const exportData = () => {
    const data = {
      people: state.people,
      meetings: state.meetings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'perfect-context-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>⚙️ Settings</h2>
        <p className="settings-subtitle">
          Manage your privacy preferences and account settings
        </p>
      </div>

      <div className="settings-content">
        <section className="settings-section">
          <h3>🔒 Privacy & Consent</h3>
          <p className="section-description">
            Control what data is captured and how it's used. Changes apply to future meetings.
          </p>

          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-header">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={state.consentSettings.transcriptEnabled}
                    onChange={(e) => handleConsentChange('transcriptEnabled', e.target.checked)}
                  />
                  <span className="setting-title">Meeting Transcripts</span>
                </label>
                <span className="setting-status recommended">Recommended</span>
              </div>
              <p className="setting-description">
                Capture text from meetings when all participants consent. Enables better context and search.
              </p>
              <div className="setting-details">
                <small>📝 Notes-only mode is always available as fallback</small>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-header">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={state.consentSettings.recordingEnabled}
                    onChange={(e) => handleConsentChange('recordingEnabled', e.target.checked)}
                  />
                  <span className="setting-title">Audio Recording</span>
                </label>
                <span className="setting-status caution">Requires Consent</span>
              </div>
              <p className="setting-description">
                Record audio for enhanced context and accuracy. Requires explicit consent from all participants.
              </p>
              <div className="setting-details">
                <small>🎙️ Audio is processed locally when possible</small>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-header">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={state.consentSettings.faceMemoryEnabled}
                    onChange={(e) => handleConsentChange('faceMemoryEnabled', e.target.checked)}
                  />
                  <span className="setting-title">Face Memory</span>
                </label>
                <span className="setting-status beta">Beta</span>
              </div>
              <p className="setting-description">
                Remember faces to help identify people in future meetings. Processing happens on your device only.
              </p>
              <div className="setting-details">
                <small>📱 All face data stays on your device and is never shared</small>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h3>🔗 Integrations</h3>
          <p className="section-description">
            Connect and manage your external services
          </p>

          <div className="integration-list">
            <div className="integration-item">
              <div className="integration-info">
                <span className="integration-icon">📹</span>
                <div className="integration-details">
                  <h4>Zoom</h4>
                  <p>Meeting capture and real-time assistance</p>
                </div>
              </div>
              <div className="integration-status">
                <span className="status-badge demo">Demo Mode</span>
                <button
                  className="integration-btn"
                  onClick={() => alert('Zoom integration not implemented - using demo data')}
                >
                  Configure
                </button>
              </div>
            </div>

            <div className="integration-item">
              <div className="integration-info">
                <span className="integration-icon">📅</span>
                <div className="integration-details">
                  <h4>Google Calendar</h4>
                  <p>Meeting scheduling and participant sync</p>
                </div>
              </div>
              <div className="integration-status">
                <span className="status-badge demo">Demo Mode</span>
                <button
                  className="integration-btn"
                  onClick={() => alert('Calendar integration not implemented - using demo data')}
                >
                  Configure
                </button>
              </div>
            </div>

            <div className="integration-item">
              <div className="integration-info">
                <span className="integration-icon">📧</span>
                <div className="integration-details">
                  <h4>Email</h4>
                  <p>Follow-up automation and contact sync</p>
                </div>
              </div>
              <div className="integration-status">
                <span className="status-badge coming-soon">Coming Soon</span>
                <button className="integration-btn disabled" disabled>
                  Configure
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h3>💾 Data & Export</h3>
          <p className="section-description">
            Manage your data, exports, and retention settings
          </p>

          <div className="data-options">
            <div className="data-item">
              <div className="data-info">
                <h4>Data Retention</h4>
                <p>How long to keep your meeting data</p>
              </div>
              <select className="retention-select">
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12" selected>12 months (recommended)</option>
                <option value="24">24 months</option>
                <option value="forever">Keep forever</option>
              </select>
            </div>

            <div className="data-item">
              <div className="data-info">
                <h4>Export Data</h4>
                <p>Download all your Perfect Context data</p>
              </div>
              <button className="export-btn" onClick={exportData}>
                📥 Export All Data (JSON)
              </button>
            </div>

            <div className="data-item danger">
              <div className="data-info">
                <h4>Delete All Data</h4>
                <p>Permanently remove all your data from Perfect Context</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm('Are you sure? This cannot be undone.')) {
                    alert('Data deletion not implemented in demo');
                  }
                }}
              >
                🗑️ Delete All Data
              </button>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h3>🔔 Notifications</h3>
          <p className="section-description">
            Control when and how you're notified
          </p>

          <div className="notification-options">
            <div className="notification-item">
              <label className="notification-label">
                <input type="checkbox" defaultChecked />
                <span>Pre-meeting briefs (5 minutes before)</span>
              </label>
            </div>
            <div className="notification-item">
              <label className="notification-label">
                <input type="checkbox" defaultChecked />
                <span>Action item reminders</span>
              </label>
            </div>
            <div className="notification-item">
              <label className="notification-label">
                <input type="checkbox" defaultChecked />
                <span>Weekly relationship insights</span>
              </label>
            </div>
            <div className="notification-item">
              <label className="notification-label">
                <input type="checkbox" />
                <span>Email summaries</span>
              </label>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h3>ℹ️ About</h3>
          <div className="about-info">
            <div className="about-item">
              <strong>Version:</strong> 1.0.0 (Prototype)
            </div>
            <div className="about-item">
              <strong>Build:</strong> Demo Mode
            </div>
            <div className="about-item">
              <strong>Privacy Policy:</strong> <a href="#">View Policy</a>
            </div>
            <div className="about-item">
              <strong>Terms of Service:</strong> <a href="#">View Terms</a>
            </div>
            <div className="about-item">
              <strong>Support:</strong> <a href="mailto:support@perfct.io">support@perfct.io</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
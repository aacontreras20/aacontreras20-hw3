import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './MeetingHistory.css';

const MeetingHistory: React.FC = () => {
  const { state } = useAppContext();
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [showPostMeetingWrap, setShowPostMeetingWrap] = useState(false);

  const getPersonName = (personId: string) => {
    const person = state.people.find(p => p.id === personId);
    return person?.name || 'Unknown';
  };

  const selectedMeetingData = selectedMeeting
    ? state.meetings.find(m => m.id === selectedMeeting)
    : null;

  const handleViewPostMeetingWrap = (meetingId: string) => {
    setSelectedMeeting(meetingId);
    setShowPostMeetingWrap(true);
  };

  const generateFollowUpEmail = (meeting: any) => {
    const attendeeNames = meeting.attendees.map(getPersonName).join(', ');
    return `Subject: Follow-up from ${meeting.title}

Hi ${attendeeNames},

Thanks for the great discussion today! Here are the key points and action items:

${meeting.summary}

Action items:
${meeting.actionItems.map((item: any) => `• ${item.text}`).join('\n')}

Looking forward to our continued collaboration!

Best,
Mary`;
  };

  return (
    <div className="meeting-history">
      <div className="history-header">
        <h2>📅 Meeting History</h2>
        <p className="history-subtitle">
          Review past meetings, summaries, and follow-up actions
        </p>
      </div>

      <div className="history-content">
        <div className="meetings-list">
          <div className="meetings-header">
            <h3>Recent Meetings ({state.meetings.length})</h3>
            <div className="filter-options">
              <select className="meeting-filter">
                <option>All meetings</option>
                <option>This week</option>
                <option>This month</option>
                <option>With recordings</option>
              </select>
            </div>
          </div>

          <div className="meetings-grid">
            {state.meetings.map(meeting => (
              <div key={meeting.id} className="meeting-card">
                <div className="meeting-header">
                  <div className="meeting-date">
                    {meeting.date.toLocaleDateString()}
                  </div>
                  <div className="meeting-recording-status">
                    {meeting.isRecorded ? '🎥 Recorded' : '📝 Notes Only'}
                  </div>
                </div>

                <h4 className="meeting-title">{meeting.title}</h4>

                <div className="meeting-attendees">
                  <strong>Attendees:</strong> {meeting.attendees.map(getPersonName).join(', ')}
                </div>

                <div className="meeting-summary">
                  {meeting.summary}
                </div>

                <div className="meeting-stats">
                  <span className="stat">
                    {meeting.actionItems.length} action items
                  </span>
                  <span className="stat">
                    {meeting.actionItems.filter(item => item.completed).length} completed
                  </span>
                </div>

                <div className="meeting-actions">
                  <button
                    className="action-btn primary"
                    onClick={() => handleViewPostMeetingWrap(meeting.id)}
                  >
                    📋 View Wrap-up
                  </button>
                  <button
                    className="action-btn secondary"
                    onClick={() => {
                      const email = generateFollowUpEmail(meeting);
                      alert('Email integration not implemented. Generated email:\n\n' + email);
                    }}
                  >
                    📧 Generate Follow-up
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPostMeetingWrap && selectedMeetingData && (
          <div className="post-meeting-wrap">
            <div className="wrap-header">
              <h3>📋 Post-Meeting Wrap-up</h3>
              <button
                className="close-wrap"
                onClick={() => setShowPostMeetingWrap(false)}
              >
                ✕
              </button>
            </div>

            <div className="wrap-content">
              <div className="meeting-overview">
                <h4>{selectedMeetingData.title}</h4>
                <div className="overview-details">
                  <div className="detail-item">
                    <strong>Date:</strong> {selectedMeetingData.date.toLocaleDateString()}
                  </div>
                  <div className="detail-item">
                    <strong>Duration:</strong> 1 hour (estimated)
                  </div>
                  <div className="detail-item">
                    <strong>Attendees:</strong> {selectedMeetingData.attendees.map(getPersonName).join(', ')}
                  </div>
                </div>
              </div>

              <div className="wrap-section">
                <h4>📝 Meeting Summary</h4>
                <div className="summary-content">
                  {selectedMeetingData.summary}
                </div>
              </div>

              <div className="wrap-section">
                <h4>✅ Action Items</h4>
                <div className="action-items-list">
                  {selectedMeetingData.actionItems.map(item => (
                    <div key={item.id} className={`action-item ${item.completed ? 'completed' : ''}`}>
                      <div className="action-checkbox">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {
                            // In a real app, this would update the state
                            alert('Action item update not implemented in demo');
                          }}
                        />
                      </div>
                      <div className="action-details">
                        <div className="action-text">{item.text}</div>
                        <div className="action-meta">
                          Assigned to: {item.assignedTo}
                          {item.dueDate && ` • Due: ${item.dueDate.toLocaleDateString()}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="wrap-section">
                <h4>🔄 Follow-up Suggestions</h4>
                <div className="followup-suggestions">
                  <div className="suggestion-item">
                    <div className="suggestion-icon">📧</div>
                    <div className="suggestion-content">
                      <strong>Send thank you email</strong>
                      <p>Include meeting summary and action items</p>
                    </div>
                    <button className="suggestion-btn">Generate</button>
                  </div>
                  <div className="suggestion-item">
                    <div className="suggestion-icon">📅</div>
                    <div className="suggestion-content">
                      <strong>Schedule follow-up meeting</strong>
                      <p>Based on action item deadlines</p>
                    </div>
                    <button className="suggestion-btn">Schedule</button>
                  </div>
                  <div className="suggestion-item">
                    <div className="suggestion-icon">🔗</div>
                    <div className="suggestion-content">
                      <strong>Connect attendees</strong>
                      <p>Facilitate potential collaborations</p>
                    </div>
                    <button className="suggestion-btn">Connect</button>
                  </div>
                </div>
              </div>

              <div className="wrap-section">
                <h4>🎯 Key Insights</h4>
                <div className="insights-list">
                  <div className="insight-item">
                    💡 Madison and Sarah have complementary research interests
                  </div>
                  <div className="insight-item">
                    🤝 Potential collaboration opportunity on AI ethics
                  </div>
                  <div className="insight-item">
                    📈 Growing interest in technical deep-dives
                  </div>
                </div>
              </div>

              <div className="wrap-actions">
                <button className="wrap-btn primary">
                  💾 Save Summary
                </button>
                <button className="wrap-btn secondary">
                  📤 Share Summary
                </button>
                <button className="wrap-btn secondary">
                  📝 Add Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="history-stats">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{state.meetings.length}</div>
            <div className="stat-label">Total Meetings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {state.meetings.reduce((sum, m) => sum + m.actionItems.length, 0)}
            </div>
            <div className="stat-label">Action Items Created</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {Math.round(
                (state.meetings.reduce((sum, m) => sum + m.actionItems.filter(a => a.completed).length, 0) /
                state.meetings.reduce((sum, m) => sum + m.actionItems.length, 0)) * 100
              )}%
            </div>
            <div className="stat-label">Completion Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{state.people.length}</div>
            <div className="stat-label">Unique Contacts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingHistory;
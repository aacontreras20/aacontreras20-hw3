import React from 'react';
import { useAppContext } from '../context/AppContext';
import './PreMeetingBrief.css';

interface MeetingInfo {
  title: string;
  time: string;
  participants: string[];
  inProgress: boolean;
}

interface PreMeetingBriefProps {
  meeting: MeetingInfo;
}

const PreMeetingBrief: React.FC<PreMeetingBriefProps> = ({ meeting }) => {
  const { state } = useAppContext();

  const getPersonByName = (name: string) => {
    return state.people.find(person => person.name === name);
  };

  const knownParticipants = meeting.participants
    .map(name => getPersonByName(name))
    .filter(Boolean);

  const conversationHooks = [
    {
      person: 'Madison Chen',
      hook: 'Ask about AI music latency optimization progress',
      context: 'Last mentioned working on reducing generation time'
    },
    {
      person: 'Sarah Kim',
      hook: 'Discuss potential collaboration on bias detection',
      context: 'Her NLP research aligns with our ethics work'
    }
  ];

  const openLoops = [
    {
      text: 'Send Madison the voice processing research paper',
      dueDate: 'Overdue by 2 days',
      urgent: true
    },
    {
      text: 'Share WICS event photos with Sarah',
      dueDate: 'Due today',
      urgent: false
    }
  ];

  return (
    <div className="pre-meeting-brief">
      <div className="brief-header">
        <h2>📋 Pre-Meeting Brief</h2>
        <div className="meeting-info">
          <h3>{meeting.title}</h3>
          <p className="meeting-time">{meeting.time}</p>
          <p className="meeting-status">
            {meeting.inProgress ? '🔴 In Progress' : '⏰ Upcoming'}
          </p>
        </div>
      </div>

      <div className="brief-content">
        <section className="known-participants">
          <h4>👥 You've met these {knownParticipants.length} before</h4>
          <div className="participants-grid">
            {knownParticipants.map(person => (
              <div key={person!.id} className="participant-card">
                <div className="participant-header">
                  <div className="participant-avatar">
                    {person!.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="participant-info">
                    <h5>{person!.name}</h5>
                    <p>{person!.company} • {person!.role}</p>
                  </div>
                </div>
                <div className="participant-vibes">
                  <strong>Vibes:</strong> {person!.vibes}
                </div>
                <div className="participant-tags">
                  {person!.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="last-interaction">
                  <small>
                    Last met: {person!.lastMeeting?.toLocaleDateString()}
                    ({person!.meetingCount} meetings total)
                  </small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="conversation-hooks">
          <h4>💡 Conversation hooks to mention</h4>
          <div className="hooks-list">
            {conversationHooks.map((hook, index) => (
              <div key={index} className="hook-item">
                <div className="hook-person">{hook.person}</div>
                <div className="hook-suggestion">{hook.hook}</div>
                <div className="hook-context">{hook.context}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="open-loops">
          <h4>🔄 Open loops (promises to keep)</h4>
          <div className="loops-list">
            {openLoops.map((loop, index) => (
              <div key={index} className={`loop-item ${loop.urgent ? 'urgent' : ''}`}>
                <div className="loop-text">{loop.text}</div>
                <div className="loop-due">{loop.dueDate}</div>
                {loop.urgent && <span className="urgent-badge">Urgent</span>}
              </div>
            ))}
          </div>
        </section>

        <section className="meeting-prep">
          <h4>🎯 Meeting Preparation</h4>
          <div className="prep-checklist">
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span>Review participant context</span>
            </label>
            <label className="checkbox-item">
              <input type="checkbox" />
              <span>Prepare WICS updates to share</span>
            </label>
            <label className="checkbox-item">
              <input type="checkbox" />
              <span>Bring up collaboration opportunities</span>
            </label>
            <label className="checkbox-item">
              <input type="checkbox" />
              <span>Follow up on pending action items</span>
            </label>
          </div>
        </section>

        <section className="suggested-outcomes">
          <h4>🎪 Suggested meeting outcomes</h4>
          <div className="outcomes-list">
            <div className="outcome-item">
              <span className="outcome-icon">🤝</span>
              <span>Set up Madison-Sarah collaboration on AI ethics</span>
            </div>
            <div className="outcome-item">
              <span className="outcome-icon">📅</span>
              <span>Schedule follow-up technical deep-dive</span>
            </div>
            <div className="outcome-item">
              <span className="outcome-icon">📧</span>
              <span>Exchange relevant research papers and resources</span>
            </div>
          </div>
        </section>
      </div>

      <div className="brief-actions">
        <button
          className="start-meeting-btn"
          onClick={() => alert('Zoom integration not implemented - this would open Zoom with Perfect Context panel')}
        >
          📹 Start Meeting with Perfect Context
        </button>
        <button className="save-brief-btn">
          💾 Save Brief
        </button>
      </div>
    </div>
  );
};

export default PreMeetingBrief;
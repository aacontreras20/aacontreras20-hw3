import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import './PeopleSearch.css';

const PeopleSearch: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const searchExamples = [
    'the VC into climate who likes climbing',
    'gen AI music person',
    'Harvard PhD studying bias',
    'founder working on latency',
    'researcher interested in ethics'
  ];

  const filteredPeople = useMemo(() => {
    if (!searchQuery.trim()) return state.people;

    const query = searchQuery.toLowerCase();
    return state.people.filter(person => {
      return (
        person.name.toLowerCase().includes(query) ||
        person.company?.toLowerCase().includes(query) ||
        person.role?.toLowerCase().includes(query) ||
        person.vibes.toLowerCase().includes(query) ||
        person.tags.some(tag => tag.toLowerCase().includes(query)) ||
        person.notes.some(note => note.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, state.people]);

  const handleExampleClick = (example: string) => {
    setSearchQuery(example);
  };

  const getPersonMeetings = (personId: string) => {
    return state.meetings.filter(meeting =>
      meeting.attendees.includes(personId)
    );
  };

  const selectedPersonData = selectedPerson
    ? state.people.find(p => p.id === selectedPerson)
    : null;

  return (
    <div className="people-search">
      <div className="search-header">
        <h2>🔍 People Search</h2>
        <p className="search-subtitle">
          Find people using "vibes" - natural language descriptions of who you're looking for
        </p>
      </div>

      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Try: 'the VC into climate who likes climbing' or 'gen AI music person'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="search-examples">
          <span className="examples-label">Try these examples:</span>
          {searchExamples.map((example, index) => (
            <button
              key={index}
              className="example-chip"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="search-results">
        <div className="results-list">
          <div className="results-header">
            <h3>
              {searchQuery
                ? `Found ${filteredPeople.length} ${filteredPeople.length === 1 ? 'person' : 'people'}`
                : `All People (${state.people.length})`
              }
            </h3>
            {searchQuery && (
              <div className="search-confidence">
                <span className="confidence-badge high">
                  {filteredPeople.length > 0 ? '✓ High confidence' : '⚠️ No matches'}
                </span>
              </div>
            )}
          </div>

          <div className="people-grid">
            {filteredPeople.map(person => (
              <div
                key={person.id}
                className={`person-card ${selectedPerson === person.id ? 'selected' : ''}`}
                onClick={() => setSelectedPerson(person.id)}
              >
                <div className="person-header">
                  <div className="person-avatar">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="person-basic-info">
                    <h4>{person.name}</h4>
                    <p>{person.company} • {person.role}</p>
                  </div>
                  <div className="meeting-count">
                    {person.meetingCount} meetings
                  </div>
                </div>

                <div className="person-vibes">
                  <strong>Vibes:</strong> {person.vibes}
                </div>

                <div className="person-tags">
                  {person.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="last-meeting">
                  Last met: {person.lastMeeting?.toLocaleDateString() || 'Never'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPersonData && (
          <div className="person-details">
            <div className="details-header">
              <h3>📋 {selectedPersonData.name}</h3>
              <button
                className="close-details"
                onClick={() => setSelectedPerson(null)}
              >
                ✕
              </button>
            </div>

            <div className="details-content">
              <div className="detail-section">
                <h4>Basic Info</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Company:</span>
                    <span>{selectedPersonData.company}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Role:</span>
                    <span>{selectedPersonData.role}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span>{selectedPersonData.email}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Meeting History</h4>
                <div className="meeting-stats">
                  <div className="stat">
                    <span className="stat-number">{selectedPersonData.meetingCount}</span>
                    <span className="stat-label">Total Meetings</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">
                      {selectedPersonData.lastMeeting
                        ? Math.floor((new Date().getTime() - selectedPersonData.lastMeeting.getTime()) / (1000 * 60 * 60 * 24))
                        : 'N/A'
                      }
                    </span>
                    <span className="stat-label">Days Since Last Meeting</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Notes & Context</h4>
                <div className="notes-list">
                  {selectedPersonData.notes.map((note, index) => (
                    <div key={index} className="note-item">
                      • {note}
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>Vibes & Personality</h4>
                <div className="vibes-description">
                  {selectedPersonData.vibes}
                </div>
              </div>

              <div className="detail-actions">
                <button
                  className="action-btn primary"
                  onClick={() => alert('Email integration not implemented - would open email to ' + selectedPersonData.email)}
                >
                  📧 Send Email
                </button>
                <button
                  className="action-btn secondary"
                  onClick={() => alert('Calendar integration not implemented - would schedule meeting')}
                >
                  📅 Schedule Meeting
                </button>
                <button className="action-btn secondary">
                  📝 Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {searchQuery && filteredPeople.length === 0 && (
        <div className="no-results">
          <div className="no-results-content">
            <h3>🤔 No matches found</h3>
            <p>Try a different search term or browse all people above.</p>
            <div className="search-tips">
              <h4>Search tips:</h4>
              <ul>
                <li>Use natural language: "the person who..."</li>
                <li>Try company names, roles, or interests</li>
                <li>Search by personality traits or "vibes"</li>
                <li>Use tags like "AI", "founder", "research"</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleSearch;
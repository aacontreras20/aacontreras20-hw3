import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './Onboarding.css';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { state, dispatch } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [showConsentDetails, setShowConsentDetails] = useState(false);

  const steps = [
    'Welcome',
    'Connect Services',
    'Consent Settings',
    'Complete'
  ];

  const handleConsentChange = (setting: keyof typeof state.consentSettings, value: boolean) => {
    dispatch({
      type: 'UPDATE_CONSENT_SETTINGS',
      payload: { [setting]: value }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="welcome-step">
            <h1>Welcome to Perfect Context</h1>
            <p className="subtitle">Your consent-first meeting companion</p>
            <div className="feature-list">
              <div className="feature-item">
                <span className="icon">🤝</span>
                <div>
                  <h3>Remember Everyone</h3>
                  <p>Never forget a name or conversation detail again</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="icon">🔒</span>
                <div>
                  <h3>Privacy First</h3>
                  <p>Full control over what's captured and shared</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="icon">⚡</span>
                <div>
                  <h3>Instant Context</h3>
                  <p>Get meeting briefs and follow-up suggestions</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="connect-step">
            <h2>Connect Your Services</h2>
            <p>Connect Zoom and Calendar to get started</p>
            <div className="service-connections">
              <div className="service-item">
                <span className="service-icon">📹</span>
                <div className="service-info">
                  <h3>Zoom</h3>
                  <p>Capture meeting context and participants</p>
                </div>
                <button
                  className="connect-btn disabled"
                  onClick={() => alert('Zoom integration not implemented yet - using demo data')}
                >
                  Connect (Demo)
                </button>
              </div>
              <div className="service-item">
                <span className="service-icon">📅</span>
                <div className="service-info">
                  <h3>Google Calendar</h3>
                  <p>Sync meeting schedules and participants</p>
                </div>
                <button
                  className="connect-btn disabled"
                  onClick={() => alert('Calendar integration not implemented yet - using demo data')}
                >
                  Connect (Demo)
                </button>
              </div>
            </div>
            <div className="demo-note">
              <p><strong>Demo Mode:</strong> This prototype uses synthetic meeting data to demonstrate functionality.</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="consent-step">
            <h2>Privacy & Consent Settings</h2>
            <p>Choose your default privacy level. You can change these anytime.</p>

            <div className="consent-options">
              <div className="consent-item">
                <div className="consent-header">
                  <label>
                    <input
                      type="checkbox"
                      checked={state.consentSettings.transcriptEnabled}
                      onChange={(e) => handleConsentChange('transcriptEnabled', e.target.checked)}
                    />
                    <span className="consent-title">Meeting Transcripts</span>
                  </label>
                  <span className="recommended">Recommended</span>
                </div>
                <p className="consent-description">Capture text from meetings when all participants consent</p>
              </div>

              <div className="consent-item">
                <div className="consent-header">
                  <label>
                    <input
                      type="checkbox"
                      checked={state.consentSettings.recordingEnabled}
                      onChange={(e) => handleConsentChange('recordingEnabled', e.target.checked)}
                    />
                    <span className="consent-title">Audio Recording</span>
                  </label>
                </div>
                <p className="consent-description">Record audio for enhanced context (requires explicit consent from all participants)</p>
              </div>

              <div className="consent-item">
                <div className="consent-header">
                  <label>
                    <input
                      type="checkbox"
                      checked={state.consentSettings.faceMemoryEnabled}
                      onChange={(e) => handleConsentChange('faceMemoryEnabled', e.target.checked)}
                    />
                    <span className="consent-title">Face Memory</span>
                  </label>
                  <span className="beta">Beta</span>
                </div>
                <p className="consent-description">Remember faces to help identify people (stored locally on device)</p>
              </div>
            </div>

            <button
              className="learn-more-btn"
              onClick={() => setShowConsentDetails(!showConsentDetails)}
            >
              {showConsentDetails ? 'Hide' : 'Learn more about'} our privacy practices
            </button>

            {showConsentDetails && (
              <div className="consent-details">
                <h4>Our Privacy Promise</h4>
                <ul>
                  <li>All data is encrypted and stored securely</li>
                  <li>You can export or delete your data anytime</li>
                  <li>Meeting participants always see consent status</li>
                  <li>No data is shared without your explicit permission</li>
                  <li>Face recognition stays on your device only</li>
                </ul>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="complete-step">
            <h2>You're All Set! 🎉</h2>
            <p>Perfect Context is ready to help you remember everyone you meet.</p>
            <div className="next-steps">
              <h3>What's next:</h3>
              <ul>
                <li>📋 Get pre-meeting briefs with past conversation context</li>
                <li>🔍 Search for people using "vibes" - like "the VC who likes climbing"</li>
                <li>📝 Review meeting summaries and follow-up suggestions</li>
                <li>🤝 Build stronger relationships with better context</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding">
      <div className="onboarding-container">
        <div className="progress-bar">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`progress-step ${
                index <= currentStep ? 'active' : ''
              } ${index === currentStep ? 'current' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-name">{step}</div>
            </div>
          ))}
        </div>

        <div className="step-content">
          {renderStep()}
        </div>

        <div className="step-actions">
          {currentStep > 0 && (
            <button
              className="btn-secondary"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </button>
          )}
          <button
            className="btn-primary"
            onClick={nextStep}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
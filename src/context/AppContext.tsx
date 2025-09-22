import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Person {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  tags: string[];
  vibes: string;
  lastMeeting?: Date;
  meetingCount: number;
  notes: string[];
  photo?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: Date;
  attendees: string[];
  summary: string;
  actionItems: ActionItem[];
  transcript?: string;
  isRecorded: boolean;
}

export interface ActionItem {
  id: string;
  text: string;
  assignedTo: string;
  dueDate?: Date;
  completed: boolean;
}

interface AppState {
  people: Person[];
  meetings: Meeting[];
  currentMeeting?: Meeting;
  searchQuery: string;
  consentSettings: {
    recordingEnabled: boolean;
    transcriptEnabled: boolean;
    faceMemoryEnabled: boolean;
  };
}

type AppAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_PERSON'; payload: Person }
  | { type: 'UPDATE_PERSON'; payload: Person }
  | { type: 'ADD_MEETING'; payload: Meeting }
  | { type: 'SET_CURRENT_MEETING'; payload: Meeting }
  | { type: 'UPDATE_CONSENT_SETTINGS'; payload: Partial<AppState['consentSettings']> };

const initialState: AppState = {
  people: [
    {
      id: '1',
      name: 'Madison Chen',
      email: 'madison@genaimusic.com',
      company: 'GenAI Music',
      role: 'Founder',
      tags: ['AI', 'Music', 'Founder'],
      vibes: 'Passionate about AI-generated music, very technical, likes discussing latency optimization',
      lastMeeting: new Date('2024-01-15'),
      meetingCount: 3,
      notes: [
        'Working on reducing AI music generation latency',
        'Interested in real-time audio processing',
        'Asked about our voice recognition tech'
      ]
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      email: 'alex@climatevc.com',
      company: 'Climate Ventures',
      role: 'Investment Associate',
      tags: ['VC', 'Climate', 'Investing'],
      vibes: 'Climate-focused investor, rock climbing enthusiast, very analytical about carbon markets',
      lastMeeting: new Date('2024-01-10'),
      meetingCount: 2,
      notes: [
        'Loves rock climbing on weekends',
        'Looking for B2B climate solutions',
        'Mentioned interest in carbon capture tech'
      ]
    },
    {
      id: '3',
      name: 'Sarah Kim',
      email: 'sarah.kim@harvard.edu',
      company: 'Harvard CS',
      role: 'PhD Student',
      tags: ['Research', 'NLP', 'Academia'],
      vibes: 'NLP researcher focused on conversational AI, very detail-oriented, prefers deep technical discussions',
      lastMeeting: new Date('2024-01-08'),
      meetingCount: 4,
      notes: [
        'Researching conversational AI ethics',
        'Working on bias detection in language models',
        'Interested in our consent mechanisms'
      ]
    }
  ],
  meetings: [
    {
      id: '1',
      title: 'Harvard CS Networking Mixer',
      date: new Date('2024-01-15'),
      attendees: ['1', '3'],
      summary: 'Discussed AI music generation and NLP research. Madison showed interest in collaboration.',
      actionItems: [
        {
          id: '1',
          text: 'Send Madison our voice processing paper',
          assignedTo: 'me',
          dueDate: new Date('2024-01-17'),
          completed: false
        }
      ],
      isRecorded: false
    },
    {
      id: '2',
      title: 'Climate Tech Coffee Chat',
      date: new Date('2024-01-10'),
      attendees: ['2'],
      summary: 'Alex explained Climate Ventures investment thesis. Discussed potential B2B opportunities.',
      actionItems: [
        {
          id: '2',
          text: 'Research carbon capture startups for Alex',
          assignedTo: 'me',
          dueDate: new Date('2024-01-15'),
          completed: true
        }
      ],
      isRecorded: false
    }
  ],
  searchQuery: '',
  consentSettings: {
    recordingEnabled: false,
    transcriptEnabled: true,
    faceMemoryEnabled: false
  }
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'ADD_PERSON':
      return { ...state, people: [...state.people, action.payload] };
    case 'UPDATE_PERSON':
      return {
        ...state,
        people: state.people.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'ADD_MEETING':
      return { ...state, meetings: [...state.meetings, action.payload] };
    case 'SET_CURRENT_MEETING':
      return { ...state, currentMeeting: action.payload };
    case 'UPDATE_CONSENT_SETTINGS':
      return {
        ...state,
        consentSettings: { ...state.consentSettings, ...action.payload }
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
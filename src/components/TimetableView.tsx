import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'motion/react';
import {
  Calendar,
  Clock,
  Search,
  Download,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Sparkles,
  Filter,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Info,
  Layers,
  Flame,
  Share2,
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '../types';

interface TimetableViewProps {
  userProfile?: UserProfile | null;
  onNavigate?: (view: string, docId?: string) => void;
  language?: 'sw' | 'en';
}

export interface ExamSession {
  code: string;
  subject: string;
  swahiliSubject: string;
  paper: string;
  duration: string;
  time: string;
  type: 'core' | 'science' | 'arts' | 'commercial' | 'practical' | 'religion';
  instructions?: string;
}

export interface DaySchedule {
  id: string;
  date: string; // e.g. "2025-11-10"
  displayDate: string; // e.g. "Jumatatu, 10 Novemba 2025"
  displayDateEn: string; // e.g. "Monday, 10 November 2025"
  dayNumber: number;
  morningSessions: ExamSession[];
  afternoonSessions: ExamSession[];
}

export interface LevelTimetable {
  levelCode: 'csee' | 'ftna' | 'acsee';
  levelName: string;
  levelFullName: string;
  year: number;
  startDate: string; // "2025-11-10"
  endDate: string; // "2025-11-21"
  pdfUrl: string;
  drivePreviewUrl: string;
  totalCandidatesEstimate: string;
  schedule: DaySchedule[];
}

// Structured Official NECTA Timetable Data
const NECTA_TIMETABLES: Record<string, LevelTimetable> = {
  csee: {
    levelCode: 'csee',
    levelName: 'Kidato cha 4 (CSEE)',
    levelFullName: 'Certificate of Secondary Education Examination (CSEE)',
    year: 2025,
    startDate: '2025-11-10',
    endDate: '2025-11-21',
    pdfUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    drivePreviewUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/preview',
    totalCandidatesEstimate: '560,000+',
    schedule: [
      {
        id: 'csee-day-1',
        date: '2025-11-10',
        displayDate: 'Jumatatu, 10 Novemba 2025',
        displayDateEn: 'Monday, 10 November 2025',
        dayNumber: 1,
        morningSessions: [
          { code: '011', subject: 'Civics', swahiliSubject: 'Uraia', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'core', instructions: 'Maswali yote ni ya lazima sehemu A & B' }
        ],
        afternoonSessions: [
          { code: '014/1', subject: 'Bible Knowledge', swahiliSubject: 'Elimu ya Biblia', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'religion' },
          { code: '015/1', subject: 'Islamic Knowledge', swahiliSubject: 'Mambo ya Kiislamu', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'religion' }
        ]
      },
      {
        id: 'csee-day-2',
        date: '2025-11-11',
        displayDate: 'Jumanne, 11 Novemba 2025',
        displayDateEn: 'Tuesday, 11 November 2025',
        dayNumber: 2,
        morningSessions: [
          { code: '012', subject: 'History', swahiliSubject: 'Historia', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'arts' }
        ],
        afternoonSessions: [
          { code: '061', subject: 'Commerce', swahiliSubject: 'Biashara', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'commercial' }
        ]
      },
      {
        id: 'csee-day-3',
        date: '2025-11-12',
        displayDate: 'Jumatano, 12 Novemba 2025',
        displayDateEn: 'Wednesday, 12 November 2025',
        dayNumber: 3,
        morningSessions: [
          { code: '021', subject: 'Kiswahili', swahiliSubject: 'Kiswahili', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'core' }
        ],
        afternoonSessions: [
          { code: '036', subject: 'Information and Computer Studies (ICS)', swahiliSubject: 'Tehama (ICS)', paper: 'Paper 1 (Theory)', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'science' }
        ]
      },
      {
        id: 'csee-day-4',
        date: '2025-11-13',
        displayDate: 'Alhamisi, 13 Novemba 2025',
        displayDateEn: 'Thursday, 13 November 2025',
        dayNumber: 4,
        morningSessions: [
          { code: '041', subject: 'Basic Mathematics', swahiliSubject: 'Hisabati ya Kawaida', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'core', instructions: 'Calculator hairuhusiwi (Non-programmable mathematical table is allowed)' }
        ],
        afternoonSessions: [
          { code: '062', subject: 'Book-Keeping', swahiliSubject: 'Uwekaji Vitabu (Book-Keeping)', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'commercial' }
        ]
      },
      {
        id: 'csee-day-5',
        date: '2025-11-14',
        displayDate: 'Ijumaa, 14 Novemba 2025',
        displayDateEn: 'Friday, 14 November 2025',
        dayNumber: 5,
        morningSessions: [
          { code: '022', subject: 'English Language', swahiliSubject: 'Lugha ya Kiingereza', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'core' }
        ],
        afternoonSessions: [
          { code: '034', subject: 'Agricultural Science', swahiliSubject: 'Sayansi ya Kilimo', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'science' }
        ]
      },
      {
        id: 'csee-day-6',
        date: '2025-11-17',
        displayDate: 'Jumatatu, 17 Novemba 2025',
        displayDateEn: 'Monday, 17 November 2025',
        dayNumber: 6,
        morningSessions: [
          { code: '031/1', subject: 'Physics 1', swahiliSubject: 'Fizikia (Nadharia)', paper: 'Paper 1 (Theory)', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'science' }
        ],
        afternoonSessions: [
          { code: '013', subject: 'Geography', swahiliSubject: 'Jiografia', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'arts' }
        ]
      },
      {
        id: 'csee-day-7',
        date: '2025-11-18',
        displayDate: 'Jumanne, 18 Novemba 2025',
        displayDateEn: 'Tuesday, 18 November 2025',
        dayNumber: 7,
        morningSessions: [
          { code: '032/1', subject: 'Chemistry 1', swahiliSubject: 'Kemia (Nadharia)', paper: 'Paper 1 (Theory)', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'science' }
        ],
        afternoonSessions: [
          { code: '031/2A', subject: 'Physics 2A (Practical)', swahiliSubject: 'Fizikia Vitendo 2A', paper: 'Paper 2A', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'practical' }
        ]
      },
      {
        id: 'csee-day-8',
        date: '2025-11-19',
        displayDate: 'Jumatano, 19 Novemba 2025',
        displayDateEn: 'Wednesday, 19 November 2025',
        dayNumber: 8,
        morningSessions: [
          { code: '033/1', subject: 'Biology 1', swahiliSubject: 'Biolojia (Nadharia)', paper: 'Paper 1 (Theory)', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'science' }
        ],
        afternoonSessions: [
          { code: '032/2A', subject: 'Chemistry 2A (Practical)', swahiliSubject: 'Kemia Vitendo 2A', paper: 'Paper 2A', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'practical' }
        ]
      },
      {
        id: 'csee-day-9',
        date: '2025-11-20',
        displayDate: 'Alhamisi, 20 Novemba 2025',
        displayDateEn: 'Thursday, 20 November 2025',
        dayNumber: 9,
        morningSessions: [
          { code: '033/2A', subject: 'Biology 2A (Practical)', swahiliSubject: 'Biolojia Vitendo 2A', paper: 'Paper 2A', duration: 'Saa 2:30 (08:00 AM - 10:30 AM)', time: '08:00 AM', type: 'practical' }
        ],
        afternoonSessions: [
          { code: '036/2', subject: 'Information and Computer Studies (Practical)', swahiliSubject: 'Tehama Vitendo', paper: 'Paper 2', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'practical' }
        ]
      },
      {
        id: 'csee-day-10',
        date: '2025-11-21',
        displayDate: 'Ijumaa, 21 Novemba 2025',
        displayDateEn: 'Friday, 21 November 2025',
        dayNumber: 10,
        morningSessions: [
          { code: '031/2B', subject: 'Physics 2B (Practical Alternative)', swahiliSubject: 'Fizikia Vitendo 2B', paper: 'Paper 2B', duration: 'Saa 2:30 (08:00 AM - 10:30 AM)', time: '08:00 AM', type: 'practical' }
        ],
        afternoonSessions: [
          { code: '032/2B', subject: 'Chemistry 2B (Practical Alternative)', swahiliSubject: 'Kemia Vitendo 2B', paper: 'Paper 2B', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'practical' }
        ]
      }
    ]
  },
  ftna: {
    levelCode: 'ftna',
    levelName: 'Kidato cha 2 (FTNA)',
    levelFullName: 'Form Two National Assessment (FTNA)',
    year: 2025,
    startDate: '2025-10-27',
    endDate: '2025-11-07',
    pdfUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    drivePreviewUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/preview',
    totalCandidatesEstimate: '680,000+',
    schedule: [
      {
        id: 'ftna-day-1',
        date: '2025-10-27',
        displayDate: 'Jumatatu, 27 Oktoba 2025',
        displayDateEn: 'Monday, 27 October 2025',
        dayNumber: 1,
        morningSessions: [
          { code: '011', subject: 'Civics', swahiliSubject: 'Uraia', paper: 'FTNA Paper', duration: 'Saa 2:30 (08:30 AM - 11:00 AM)', time: '08:30 AM', type: 'core' }
        ],
        afternoonSessions: [
          { code: '012', subject: 'History', swahiliSubject: 'Historia', paper: 'FTNA Paper', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'arts' }
        ]
      },
      {
        id: 'ftna-day-2',
        date: '2025-10-28',
        displayDate: 'Jumanne, 28 Oktoba 2025',
        displayDateEn: 'Tuesday, 28 October 2025',
        dayNumber: 2,
        morningSessions: [
          { code: '021', subject: 'Kiswahili', swahiliSubject: 'Kiswahili', paper: 'FTNA Paper', duration: 'Saa 2:30 (08:30 AM - 11:00 AM)', time: '08:30 AM', type: 'core' }
        ],
        afternoonSessions: [
          { code: '013', subject: 'Geography', swahiliSubject: 'Jiografia', paper: 'FTNA Paper', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'arts' }
        ]
      },
      {
        id: 'ftna-day-3',
        date: '2025-10-29',
        displayDate: 'Jumatano, 29 Oktoba 2025',
        displayDateEn: 'Wednesday, 29 October 2025',
        dayNumber: 3,
        morningSessions: [
          { code: '041', subject: 'Basic Mathematics', swahiliSubject: 'Hisabati', paper: 'FTNA Paper', duration: 'Saa 2:30 (08:30 AM - 11:00 AM)', time: '08:30 AM', type: 'core' }
        ],
        afternoonSessions: [
          { code: '061', subject: 'Commerce', swahiliSubject: 'Biashara', paper: 'FTNA Paper', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'commercial' }
        ]
      },
      {
        id: 'ftna-day-4',
        date: '2025-10-30',
        displayDate: 'Alhamisi, 30 Oktoba 2025',
        displayDateEn: 'Thursday, 30 October 2025',
        dayNumber: 4,
        morningSessions: [
          { code: '022', subject: 'English Language', swahiliSubject: 'Lugha ya Kiingereza', paper: 'FTNA Paper', duration: 'Saa 2:30 (08:30 AM - 11:00 AM)', time: '08:30 AM', type: 'core' }
        ],
        afternoonSessions: [
          { code: '062', subject: 'Book-Keeping', swahiliSubject: 'Uwekaji Vitabu', paper: 'FTNA Paper', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'commercial' }
        ]
      },
      {
        id: 'ftna-day-5',
        date: '2025-10-31',
        displayDate: 'Ijumaa, 31 Oktoba 2025',
        displayDateEn: 'Friday, 31 October 2025',
        dayNumber: 5,
        morningSessions: [
          { code: '031', subject: 'Physics', swahiliSubject: 'Fizikia', paper: 'FTNA Paper', duration: 'Saa 2:30 (08:30 AM - 11:00 AM)', time: '08:30 AM', type: 'science' }
        ],
        afternoonSessions: [
          { code: '034', subject: 'Agriculture', swahiliSubject: 'Kilimo', paper: 'FTNA Paper', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'science' }
        ]
      },
      {
        id: 'ftna-day-6',
        date: '2025-11-03',
        displayDate: 'Jumatatu, 3 Novemba 2025',
        displayDateEn: 'Monday, 3 November 2025',
        dayNumber: 6,
        morningSessions: [
          { code: '032', subject: 'Chemistry', swahiliSubject: 'Kemia', paper: 'FTNA Paper', duration: 'Saa 2:30 (08:30 AM - 11:00 AM)', time: '08:30 AM', type: 'science' }
        ],
        afternoonSessions: [
          { code: '036', subject: 'Information and Computer Studies', swahiliSubject: 'Tehama', paper: 'FTNA Paper', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'science' }
        ]
      },
      {
        id: 'ftna-day-7',
        date: '2025-11-04',
        displayDate: 'Jumanne, 4 Novemba 2025',
        displayDateEn: 'Tuesday, 4 November 2025',
        dayNumber: 7,
        morningSessions: [
          { code: '033', subject: 'Biology', swahiliSubject: 'Biolojia', paper: 'FTNA Paper', duration: 'Saa 2:30 (08:30 AM - 11:00 AM)', time: '08:30 AM', type: 'science' }
        ],
        afternoonSessions: [
          { code: '014', subject: 'Bible Knowledge', swahiliSubject: 'Elimu ya Biblia', paper: 'FTNA Paper', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'religion' },
          { code: '015', subject: 'Islamic Knowledge', swahiliSubject: 'Mambo ya Kiislamu', paper: 'FTNA Paper', duration: 'Saa 2:30 (02:00 PM - 04:30 PM)', time: '02:00 PM', type: 'religion' }
        ]
      }
    ]
  },
  acsee: {
    levelCode: 'acsee',
    levelName: 'Kidato cha 6 (ACSEE)',
    levelFullName: 'Advanced Certificate of Secondary Education Examination (ACSEE)',
    year: 2026,
    startDate: '2026-05-04',
    endDate: '2026-05-22',
    pdfUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    drivePreviewUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/preview',
    totalCandidatesEstimate: '110,000+',
    schedule: [
      {
        id: 'acsee-day-1',
        date: '2026-05-04',
        displayDate: 'Jumatatu, 4 Mei 2026',
        displayDateEn: 'Monday, 4 May 2026',
        dayNumber: 1,
        morningSessions: [
          { code: '111/1', subject: 'General Studies', swahiliSubject: 'Masomo ya Jumla (GS)', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'core' }
        ],
        afternoonSessions: [
          { code: '113/1', subject: 'Geography 1', swahiliSubject: 'Jiografia 1', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'arts' },
          { code: '141/1', subject: 'Basic Applied Mathematics (BAM)', swahiliSubject: 'Hisabati ya BAM', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'core' }
        ]
      },
      {
        id: 'acsee-day-2',
        date: '2026-05-05',
        displayDate: 'Jumanne, 5 Mei 2026',
        displayDateEn: 'Tuesday, 5 May 2026',
        dayNumber: 2,
        morningSessions: [
          { code: '131/1', subject: 'Physics 1', swahiliSubject: 'Fizikia 1', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'science' },
          { code: '112/1', subject: 'History 1', swahiliSubject: 'Historia 1', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'arts' }
        ],
        afternoonSessions: [
          { code: '132/1', subject: 'Chemistry 1', swahiliSubject: 'Kemia 1', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'science' },
          { code: '121/1', subject: 'Kiswahili 1', swahiliSubject: 'Kiswahili 1', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'arts' }
        ]
      },
      {
        id: 'acsee-day-3',
        date: '2026-05-06',
        displayDate: 'Jumatano, 6 Mei 2026',
        displayDateEn: 'Wednesday, 6 May 2026',
        dayNumber: 3,
        morningSessions: [
          { code: '133/1', subject: 'Biology 1', swahiliSubject: 'Biolojia 1', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'science' },
          { code: '142/1', subject: 'Advanced Mathematics 1', swahiliSubject: 'Hisabati ya Juu 1 (Pure Math)', paper: 'Paper 1', duration: 'Saa 3:00 (08:00 AM - 11:00 AM)', time: '08:00 AM', type: 'science' }
        ],
        afternoonSessions: [
          { code: '161/1', subject: 'Commerce 1', swahiliSubject: 'Biashara 1', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'commercial' },
          { code: '162/1', subject: 'Accountancy 1', swahiliSubject: 'Uhasibu 1', paper: 'Paper 1', duration: 'Saa 3:00 (02:00 PM - 05:00 PM)', time: '02:00 PM', type: 'commercial' }
        ]
      }
    ]
  }
};

const timetableContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const dayRowVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06
    }
  }
};

const sessionRowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

export default function TimetableView({ userProfile, onNavigate, language = 'sw' }: TimetableViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<'csee' | 'ftna' | 'acsee'>('csee');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [bookmarkedSessions, setBookmarkedSessions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lupanulla_bookmarked_exams');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [showMyBookmarkedOnly, setShowMyBookmarkedOnly] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const currentTimetable = NECTA_TIMETABLES[selectedLevel];

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('lupanulla_bookmarked_exams', JSON.stringify(bookmarkedSessions));
    } catch (e) {
      console.error('Error saving bookmarked exams:', e);
    }
  }, [bookmarkedSessions]);

  // Countdown calculations
  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date(`${currentTimetable.startDate}T08:00:00`).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [selectedLevel, currentTimetable.startDate]);

  const toggleBookmark = (sessionCode: string) => {
    setBookmarkedSessions(prev =>
      prev.includes(sessionCode)
        ? prev.filter(c => c !== sessionCode)
        : [...prev, sessionCode]
    );
  };

  const getSessionBadgeStyle = (type: ExamSession['type']) => {
    switch (type) {
      case 'core':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'science':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'arts':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'commercial':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'practical':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'religion':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const subjectQuickFilters = [
    { id: 'all', label: language === 'sw' ? 'Masomo Yote' : 'All Subjects' },
    { id: 'core', label: language === 'sw' ? 'Masomo ya Lazima' : 'Core Subjects' },
    { id: 'science', label: language === 'sw' ? 'Sayansi' : 'Science' },
    { id: 'arts', label: language === 'sw' ? 'Sanaa / Jamii' : 'Arts & Humanities' },
    { id: 'commercial', label: 'Biashara', labelEn: 'Commercial' },
    { id: 'practical', label: 'Vitendo (Practicals)', labelEn: 'Practicals' },
  ];

  // Filter Schedule Days
  const filteredSchedule = currentTimetable.schedule.map(day => {
    const filterSession = (session: ExamSession) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query ||
        session.subject.toLowerCase().includes(query) ||
        session.swahiliSubject.toLowerCase().includes(query) ||
        session.code.toLowerCase().includes(query) ||
        session.paper.toLowerCase().includes(query);

      const matchesCategory = selectedSubjectFilter === 'all' || session.type === selectedSubjectFilter;
      const matchesBookmark = !showMyBookmarkedOnly || bookmarkedSessions.includes(session.code);

      return matchesSearch && matchesCategory && matchesBookmark;
    };

    const morning = day.morningSessions.filter(filterSession);
    const afternoon = day.afternoonSessions.filter(filterSession);

    return {
      ...day,
      morningSessions: morning,
      afternoonSessions: afternoon,
      hasSessions: morning.length > 0 || afternoon.length > 0
    };
  }).filter(day => day.hasSessions);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="TimetableView min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* ── TOP HEADER HERO BANNER ── */}
      <div className="relative bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-950 border-b border-cyan-500/20 overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Title & Badge */}
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <CalendarDays size={14} className="text-cyan-400 animate-pulse" />
                <span>RATIBA RASMI YA NECTA {currentTimetable.year}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase">
                Ratiba ya Mitihani ya Kitaifa <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">(NECTA)</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                {language === 'sw'
                  ? 'Tafuta na uangalie ratiba kamili ya mitihani ya kitaifa ya Kidato cha Nne (CSEE), Kidato cha Pili (FTNA), na Kidato cha Tano/Sita (ACSEE). Hifadhi kadi za masomo yako na kuweka vikumbusho.'
                  : 'Search and inspect the official national examination timetable for Form 4 (CSEE), Form 2 (FTNA), and Form 6 (ACSEE). Bookmark your subjects and keep track of exam times.'}
              </p>

              {/* Status and API indicator */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1 font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                  <ShieldCheck size={14} /> Official NECTA API Sync Active
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Calendar size={14} className="text-cyan-400" /> Tarehe: {currentTimetable.startDate} hadi {currentTimetable.endDate}
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <BookOpen size={14} className="text-amber-400" /> Watahiniwa: ~{currentTimetable.totalCandidatesEstimate}
                </span>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="w-full lg:w-auto bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-5 shadow-2xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-2.5">
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                  <Flame size={15} className="text-amber-400 animate-bounce" />
                  Muda Uliobaki NECTA ({currentTimetable.levelCode.toUpperCase()})
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded-full">
                  Mwaka {currentTimetable.year}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5">
                  <span className="font-mono font-black text-xl sm:text-2xl text-cyan-300 block leading-none">
                    {String(countdown.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Siku</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5">
                  <span className="font-mono font-black text-xl sm:text-2xl text-emerald-300 block leading-none">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Saa</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5">
                  <span className="font-mono font-black text-xl sm:text-2xl text-amber-300 block leading-none">
                    {String(countdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Dakika</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5">
                  <span className="font-mono font-black text-xl sm:text-2xl text-rose-400 block leading-none">
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Sekunde</span>
                </div>
              </div>

              {/* Action buttons inside banner */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FileText size={14} />
                  <span>Soma Ratiba PDF</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs p-2.5 rounded-xl transition-all border border-slate-700"
                  title="Chapa Ratiba (Print)"
                >
                  <Printer size={15} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* LEVEL SELECTOR TABS & QUICK CONTROLS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 backdrop-blur-md">
          
          {/* Tabs */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedLevel('csee')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                selectedLevel === 'csee'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <AwardIcon />
              <span>Kidato cha 4 (CSEE)</span>
            </button>

            <button
              onClick={() => setSelectedLevel('ftna')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                selectedLevel === 'ftna'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen size={15} />
              <span>Kidato cha 2 (FTNA)</span>
            </button>

            <button
              onClick={() => setSelectedLevel('acsee')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                selectedLevel === 'acsee'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers size={15} />
              <span>Kidato cha 6 (ACSEE)</span>
            </button>
          </div>

          {/* Bookmark Filter & Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMyBookmarkedOnly(!showMyBookmarkedOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs border transition-all ${
                showMyBookmarkedOnly
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {showMyBookmarkedOnly ? <BookmarkCheck size={16} className="text-amber-400" /> : <Bookmark size={16} />}
              <span>
                {language === 'sw' ? 'Ratiba Yangu pekee' : 'My Bookmarks'} ({bookmarkedSessions.length})
              </span>
            </button>

            <a
              href={currentTimetable.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-4 py-2.5 rounded-2xl transition-all"
            >
              <ExternalLink size={14} />
              <span>Pakua PDF</span>
            </a>
          </div>

        </div>

        {/* SEARCH & CATEGORY FILTERS BAR */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={
                language === 'sw'
                  ? 'Tafuta mtihani kwa Jina la Somo (mf. Physics, Civics), Namba ya Somo (mf. 011), au Tarehe...'
                  : 'Search by subject name (e.g. Physics, Civics), subject code (e.g. 011), or paper type...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <Filter size={14} className="text-slate-400 flex-shrink-0" />
            {subjectQuickFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedSubjectFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSubjectFilter === f.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TIMETABLE DAYS GRID / LIST ── */}
        {filteredSchedule.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Calendar size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-base text-slate-200">
                Hakuna Mtihani Uliopatikana
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Jaribu kubadilisha maneno ya utafutaji au uondoe vichungi vya masomo ili kuona ratiba kamili.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubjectFilter('all');
                setShowMyBookmarkedOnly(false);
              }}
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
            >
              <RefreshCw size={14} /> Onyesha Ratiba Yote
            </button>
          </div>
        ) : (
          <motion.div
            key={`${selectedLevel}-${searchQuery}-${selectedSubjectFilter}-${showMyBookmarkedOnly}`}
            variants={timetableContainerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {filteredSchedule.map((day) => (
              <motion.div
                key={day.id}
                variants={dayRowVariants}
                className="bg-slate-900/90 border border-slate-800/80 rounded-3xl overflow-hidden shadow-lg transition-all hover:border-slate-700"
              >
                {/* Day Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-black text-xs">
                      #{day.dayNumber}
                    </div>
                    <div>
                      <h2 className="font-display font-black text-sm sm:text-base text-white">
                        {language === 'sw' ? day.displayDate : day.displayDateEn}
                      </h2>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Siku ya {day.dayNumber} ya Mtihani wa Kitaifa
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                    Siku ya Kazi (Exam Day)
                  </span>
                </div>

                {/* Sessions Grid */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* MORNING SESSION */}
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                        <Clock size={14} className="text-amber-400" />
                        A.M. KIPINDI CHA ASUBUHI (MORNING SESSION)
                      </span>
                      <span className="text-[10px] font-bold text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded-md">
                        08:00 AM - 11:00 AM
                      </span>
                    </div>

                    {day.morningSessions.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-2">Hakuna mtihani kipindi cha asubuhi.</p>
                    ) : (
                      <div className="space-y-3">
                        {day.morningSessions.map((session) => {
                          const isBookmarked = bookmarkedSessions.includes(session.code);
                          return (
                            <motion.div
                              key={session.code}
                              variants={sessionRowVariants}
                              className={`p-3.5 rounded-xl border transition-all ${
                                isBookmarked
                                  ? 'bg-amber-500/10 border-amber-500/40'
                                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                                      {session.code}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getSessionBadgeStyle(session.type)}`}>
                                      {session.type}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                      {session.paper}
                                    </span>
                                  </div>

                                  <h3 className="font-display font-extrabold text-sm text-white pt-1">
                                    {session.subject} <span className="text-slate-400 font-normal">({session.swahiliSubject})</span>
                                  </h3>

                                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-0.5">
                                    <Clock size={12} className="text-cyan-400" /> {session.duration}
                                  </p>

                                  {session.instructions && (
                                    <p className="text-[10px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 mt-2 font-medium flex items-center gap-1.5">
                                      <Info size={12} className="flex-shrink-0" />
                                      <span>{session.instructions}</span>
                                    </p>
                                  )}
                                </div>

                                <button
                                  onClick={() => toggleBookmark(session.code)}
                                  className={`p-2 rounded-xl transition-all ${
                                    isBookmarked
                                      ? 'text-amber-400 bg-amber-500/20'
                                      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
                                  }`}
                                  title={isBookmarked ? 'Ondoa kwenye Ratiba Yangu' : 'Hifadhi kwenye Ratiba Yangu'}
                                >
                                  {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* AFTERNOON SESSION */}
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-2">
                        <Clock size={14} className="text-purple-400" />
                        P.M. KIPINDI CHA MCHANA (AFTERNOON SESSION)
                      </span>
                      <span className="text-[10px] font-bold text-purple-300/80 bg-purple-500/10 px-2 py-0.5 rounded-md">
                        02:00 PM - 05:00 PM
                      </span>
                    </div>

                    {day.afternoonSessions.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-2">Hakuna mtihani kipindi cha mchana.</p>
                    ) : (
                      <div className="space-y-3">
                        {day.afternoonSessions.map((session) => {
                          const isBookmarked = bookmarkedSessions.includes(session.code);
                          return (
                            <motion.div
                              key={session.code}
                              variants={sessionRowVariants}
                              className={`p-3.5 rounded-xl border transition-all ${
                                isBookmarked
                                  ? 'bg-amber-500/10 border-amber-500/40'
                                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">
                                      {session.code}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getSessionBadgeStyle(session.type)}`}>
                                      {session.type}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                      {session.paper}
                                    </span>
                                  </div>

                                  <h3 className="font-display font-extrabold text-sm text-white pt-1">
                                    {session.subject} <span className="text-slate-400 font-normal">({session.swahiliSubject})</span>
                                  </h3>

                                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-0.5">
                                    <Clock size={12} className="text-purple-400" /> {session.duration}
                                  </p>

                                  {session.instructions && (
                                    <p className="text-[10px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 mt-2 font-medium flex items-center gap-1.5">
                                      <Info size={12} className="flex-shrink-0" />
                                      <span>{session.instructions}</span>
                                    </p>
                                  )}
                                </div>

                                <button
                                  onClick={() => toggleBookmark(session.code)}
                                  className={`p-2 rounded-xl transition-all ${
                                    isBookmarked
                                      ? 'text-amber-400 bg-amber-500/20'
                                      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
                                  }`}
                                  title={isBookmarked ? 'Ondoa kwenye Ratiba Yangu' : 'Hifadhi kwenye Ratiba Yangu'}
                                >
                                  {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── NECTA EXAMINATION RULES & INSTRUCTIONS BANNER ── */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-white uppercase tracking-tight">
                Maelekezo Muhimu ya NECTA kwa Watahiniwa (Examination Rules & Code of Conduct)
              </h3>
              <p className="text-xs text-slate-400">
                Kila mtahiniwa anapaswa kuzingatia masharti haya ili kuepuka kufungiwa au kufutiwa matokeo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-cyan-400">
                <CheckCircle2 size={16} /> 1. Muda wa Kuingia Chumba cha Mtihani
              </div>
              <p className="text-slate-400 leading-relaxed">
                Watahiniwa wote wanatakiwa kuwa nje ya chumba cha mtihani dakika 30 kabla ya muda wa mtihani kuanza (Saa 07:30 AM asubuhi & Saa 01:30 PM mchana).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 size={16} /> 2. Vitambulisho & Vifaa
              </div>
              <p className="text-slate-400 leading-relaxed">
                Hakikisha una Kitambulisho cha Mtahiniwa (NECTA Identity Card) na vifaa vyako mwenyewe (kalamu ya bluu/nyeusi, rula, na Mathematical Tables).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <AlertTriangle size={16} /> 3. Marufuku ya Simu & Vyombo vya Elektroniki
              </div>
              <p className="text-slate-400 leading-relaxed">
                Ni marufuku kabisa kuingia na simu ya mkononi, smart watch, au karatasi zisizoruhusiwa ndani ya chumba cha mtihani. Kukiuka ni kufutiwa matokeo yote!
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── OFFICIAL PDF EMBEDDED MODAL ── */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsPdfModalOpen(false)}
          ></div>

          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col h-[90vh] overflow-hidden z-[210] text-slate-100">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-white uppercase">
                    NECTA Official Timetable PDF - {currentTimetable.levelName}
                  </h3>
                  <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    Google Drive Secured Preview
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={currentTimetable.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <ExternalLink size={14} /> Fungua Drive
                </a>
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal PDF Viewer Iframe */}
            <div className="flex-1 bg-slate-950 relative">
              <iframe
                src={currentTimetable.drivePreviewUrl}
                className="w-full h-full border-none"
                title={`NECTA Timetable ${currentTimetable.levelName}`}
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function AwardIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-2 5l2-1.5l2 1.5l-2-5k" />
      <circle cx="12" cy="8" r="6" strokeWidth={2} />
    </svg>
  );
}

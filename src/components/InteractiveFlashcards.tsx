import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Sparkles, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Shuffle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Wand2, 
  Award, 
  BookOpen, 
  Layers, 
  Timer, 
  Flame, 
  Check, 
  HelpCircle, 
  X, 
  Save, 
  Sliders,
  Zap,
  Star,
  Info,
  RefreshCw,
  Trophy,
  BarChart2
} from 'lucide-react';
import { academicData, Topic } from './MasomoAcademicData';
import { getFlashcardsForTopic, Flashcard } from './MasomoFlashcardData';
import { awardStudyPoints } from '../firebase';

interface InteractiveFlashcardsProps {
  userProfile?: any;
  initialSubject?: string;
  initialTopicTitle?: string;
  onCloseTopicView?: () => void;
  showToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

// Subject pre-populated default cards bank for quick subject testing
const SUBJECT_PRESETS: Record<string, Flashcard[]> = {
  'Physics': [
    { term: 'Velocity (Kasi Mwelekeo)', definition: 'Kasi ya mwendo wa kitu katika mwelekeo maalum. Ni kipimo cha vector kinachojumuisha mwendokasi na uelekeo.' },
    { term: "Newton's First Law (Inertia)", definition: 'Kitu kitaendelea kubaki katika hali yake ya utulivu au mwendo wa mstari mnyooka usipolazimishwa na nguvu ya nje.' },
    { term: 'Acceleration (Mchapuko)', definition: 'Kiwango cha mabadiliko ya kasi kwa kila sekunde. Hupimwa kwa mita kwa sekunde ya mraba (m/s²).' },
    { term: 'Electric Current (Mkondo wa Umeme)', definition: 'Kiwango cha mtiririko wa chaji za umeme (elektroni) kupitia kondakta kwa wakati fulani. Hupimwa kwa Ampea (A).' },
    { term: 'Refraction of Light (Mkengeuko wa Mwanga)', definition: 'Kupinda kwa mionzi ya mwanga inapotoka kwenye kimiminika/hewa moja kwenda kingine chenye msongamano tofauti.' },
    { term: 'Momentum (Kani Mwendo)', definition: 'Zao la masi ya kitu na kasi yake (p = m × v). Ni kiasi cha mwendo kilichomo kwenye kitu.' }
  ],
  'Chemistry': [
    { term: 'Mole Concept (Dhana ya Mole)', definition: 'Kipimo rasmi cha kiasi cha dutu. Mole moja ina viumbe vidogo 6.022 × 10²³ (Avogadro\'s number).' },
    { term: 'Covalent Bond (Mshikamano wa Covalent)', definition: 'Aina ya mshikamano wa kikemikali unaotokea kwa kushiriki elektroni kati ya atomi zisizo chuma (non-metals).' },
    { term: 'Oxidation (Oksidisho)', definition: 'Mchakato wa kikemikali ambapo atomi au ioni inapoteza elektroni au kuongezeka kwa namba ya oksidisho.' },
    { term: 'pH Scale (Kipimo cha pH)', definition: 'Kipimo kinachopima kiwango cha uasidi au ualkali wa kimiminika kuanzia 0 hadi 14 (pH < 7 ni asidi, pH > 7 ni alkali).' },
    { term: 'Exothermic Reaction (Mmenyuko wa Joto)', definition: 'Mmenyuko wa kikemikali unaotoa nishati ya joto kwenda kwenye mazingira ya nje.' },
    { term: 'Electrolysis (Mchanganuo wa Umeme)', definition: 'Mchakato wa kutenganisha elementi za kiwanja cha kimiminika kwa kutumia mkondo wa umeme wa DC.' }
  ],
  'Biology': [
    { term: 'Photosynthesis (Utengezaji Chakula)', definition: 'Mchakato ambao mimea ya kijani hutumia mwanga wa jua, maji na hewa ya CO₂ kutengeneza glucose na kutoa O₂.' },
    { term: 'Osmosis (Mpenyo wa Maji)', definition: 'Mtiririko wa molekuli za maji kutoka eneo lenye msongamano mkubwa wa maji kwenda eneo lenye msongamano mdogo kupitia utando (semi-permeable membrane).' },
    { term: 'Enzyme (Kimeng`enya)', definition: 'Kichocheo cha kibiolojia (protein catalyst) kinachohararakisha mimetaboliki bila yenyewe kubadilika.' },
    { term: 'Respiration (Pumuaji wa Seli)', definition: 'Mchakato wa kuvunja chakula (glucose) ndani ya seli ili kutoa nishati ya ATP na maji/CO₂.' },
    { term: 'Mitosis (Mchanganuo wa Seli)', definition: 'Aina ya mgawanyiko wa seli unaozalisha seli mbili zinazofanana kabisa na seli mama zenye idadi sawa ya kromosomu.' },
    { term: 'Ecosystem (Mfumo wa Ekolojia)', definition: 'Mkusanyiko wa viumbe hai (biotic) na visivyo hai (abiotic) vinavyotangamana na kutegemeana katika eneo fulani.' }
  ],
  'Mathematics': [
    { term: 'Quadratic Formula (Kanuni ya Mlinganyo)', definition: 'Kanuni ya kutatua ax² + bx + c = 0. Formula: x = [-b ± √(b² - 4ac)] / 2a.' },
    { term: 'Pythagoras Theorem', definition: 'Katika pembetatu mraba: mraba wa hypotenuse ni sawa na jumla ya miraba ya pande zingine mbili (a² + b² = c²).' },
    { term: 'Probability (Uwezekano)', definition: 'Kipimo cha uwezekano wa tukio kutokea. Uwezekano = Idadi ya matokeo yanayotakiwa ÷ Jumla ya matokeo yote.' },
    { term: 'Trigonometry Ratios (SOH CAH TOA)', definition: 'Sin θ = Opposite/Hypotenuse, Cos θ = Adjacent/Hypotenuse, Tan θ = Opposite/Adjacent.' },
    { term: 'Logarithm (Lughariti)', definition: 'Kipeo ambacho namba ya msingi (base) lazima inyanyuliwe ili kupata namba husika. Mfano: log₁₀(100) = 2.' },
    { term: 'LCM na GCF (BKM na KUKU)', definition: 'LCM ni Bội Ndogo Kuliko Zote (BKM), na GCF ni Kigawe Kikubwa Zaidi cha Pamoja (KUKU).' }
  ],
  'Geography': [
    { term: 'Continental Drift (Msongo wa Mabara)', definition: 'Nadharia inayoeleza jinsi mabara ya dunia yalivyokuwa ardhi moja kubwa (Pangaea) kisha yakajitenga na kusogea.' },
    { term: 'Weathering (Mommonyoko wa Miamba)', definition: 'Mchakato wa kuvunjika na kusagika kwa miamba mahali ilipo kutokana na hali ya hewa, joto na mimea.' },
    { term: 'Solar System (Mfumo wa Jua)', definition: 'Jua pamoja na magimba yote ya angani yanayolilinda na kulizunguka, ikiwa ni pamoja na sayari 8 na miezi yao.' },
    { term: 'Map Scale (Kipimo cha Ramani)', definition: 'Uhusiano kati ya umbali uliopimwa kwenye ramani na umbali halisi unaowakilishwa duniani (e.g. 1:50,000).' }
  ],
  'History': [
    { term: 'Berlin Conference (1884-1885)', definition: 'Mkutano ulioongozwa na Otto von Bismarck kugawa bara la Afrika miongoni mwa madola ya Ulaya bila idhini ya Waafrika.' },
    { term: 'Majimaji War (1905-1907)', definition: 'Vita vya uasi vya wananchi wa kusini mwa Tanganyika dhidi ya utawala wa kikoloni wa Wajerumani wakiongozwa na Kinjikitile Ngwale.' },
    { term: 'Mercantilism', definition: 'Awamu ya kwanza ya ubepari Ulaya iliyolenga biashara na umiliki wa dhahabu na malighafi kupitia makoloni.' },
    { term: 'Feudalism (Ufeodali)', definition: 'Mfumo wa uzalishaji ambapo mabwana shamba (landlords) walimiliki ardhi na kuwatumia wakulima wadogo (serfs).' }
  ],
  'Kiswahili': [
    { term: 'Nomino (N)', definition: 'Aina ya neno linalotaja jina la mtu, mahali, kitu, hali au wazo. Mfano: Ali, Dodoma, amani.' },
    { term: 'Kitenzi (T)', definition: 'Aina ya neno linaloeleza tendo linalofanyika, lililofanyika au litakalofanyika. Mfano: anasoma, alikimbia.' },
    { term: 'Kivumishi (V)', definition: 'Neno linalotoa maelezo zaidi kuhusu nomino. Mfano: mtoto *mpole*, nyumba *kubwa*.' },
    { term: 'Ushairi (Ubeti na Mstari)', definition: 'Sanaa ya lugha inayotumia mpangilio wa vinara, mizani na miondoko maalum kueleza hisia au ujumbe.' }
  ],
  'English Language': [
    { term: 'Active vs Passive Voice', definition: 'Active: Subject performs the action (Ali wrote the letter). Passive: Subject receives action (The letter was written by Ali).' },
    { term: 'Metaphor (Lugha ya Picha)', definition: 'A figure of speech comparing two different things directly without using "like" or "as" (e.g., "Time is money").' },
    { term: 'Simile', definition: 'A figure of speech comparing two things using "like" or "as" (e.g., "As brave as a lion").' }
  ]
};

export default function InteractiveFlashcards({
  userProfile,
  initialSubject,
  initialTopicTitle,
  onCloseTopicView,
  showToast
}: InteractiveFlashcardsProps) {
  // State for selections
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject || 'Physics');
  const [selectedTopicTitle, setSelectedTopicTitle] = useState<string>(initialTopicTitle || 'all');
  const [studyMode, setStudyMode] = useState<'standard' | 'timed' | 'ai'>('standard');

  // Flashcards List State
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIndices, setMasteredIndices] = useState<number[]>([]);
  const [hardIndices, setHardIndices] = useState<number[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Timed mode state
  const [timerSeconds, setTimerSeconds] = useState<number>(15);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // AI Generator modal state
  const [aiPromptTopic, setAiPromptTopic] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Score & XP session statistics
  const [sessionXpEarned, setSessionXpEarned] = useState<number>(0);
  const [sessionComplete, setSessionComplete] = useState<boolean>(false);

  // Gather list of available subjects dynamically from academicData
  const availableSubjects = useMemo(() => {
    const list = new Set<string>();
    academicData.forEach(level => {
      level.subjects.forEach(sub => {
        list.add(sub.name);
      });
    });
    return Array.from(list);
  }, []);

  // Filter topics for selected subject
  const availableTopics = useMemo(() => {
    const topics: { title: string; subject: string }[] = [];
    academicData.forEach(level => {
      level.subjects.forEach(sub => {
        if (selectedSubject === 'all' || sub.name.toLowerCase().includes(selectedSubject.toLowerCase()) || selectedSubject.toLowerCase().includes(sub.name.toLowerCase())) {
          sub.topics.forEach(t => {
            topics.push({ title: t.title, subject: sub.name });
          });
        }
      });
    });
    return topics;
  }, [selectedSubject]);

  // Load cards whenever subject or topic changes
  useEffect(() => {
    let loadedCards: Flashcard[] = [];

    if (selectedTopicTitle && selectedTopicTitle !== 'all') {
      loadedCards = getFlashcardsForTopic(selectedTopicTitle);
    } 
    
    if (loadedCards.length === 0) {
      // Find preset for subject or fallback
      const matchingKey = Object.keys(SUBJECT_PRESETS).find(
        key => selectedSubject.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(selectedSubject.toLowerCase())
      );
      if (matchingKey && SUBJECT_PRESETS[matchingKey]) {
        loadedCards = SUBJECT_PRESETS[matchingKey];
      } else {
        loadedCards = SUBJECT_PRESETS['Physics'];
      }
    }

    setFlashcards(loadedCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIndices([]);
    setHardIndices([]);
    setSessionComplete(false);
    setSessionXpEarned(0);
  }, [selectedSubject, selectedTopicTitle]);

  // Timed review countdown effect
  useEffect(() => {
    let interval: any = null;
    if (studyMode === 'timed' && timerActive && !isFlipped && !sessionComplete) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            // Auto flip card when time runs out
            setIsFlipped(true);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [studyMode, timerActive, isFlipped, sessionComplete]);

  // Reset timer when index changes in timed mode
  const resetTimerForNextCard = () => {
    setTimerSeconds(15);
    setTimerActive(true);
  };

  // Text to speech function
  const handleToggleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      showToast?.('info', 'Kivinjari chako hakitogharimikia kusoma kwa sauti.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sw-TZ';
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Handle assessment rating
  const handleAssessment = (type: 'easy' | 'medium' | 'hard') => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (type === 'easy') {
      if (!masteredIndices.includes(currentIndex)) {
        const newMastered = [...masteredIndices, currentIndex];
        setMasteredIndices(newMastered);
        setSessionXpEarned(prev => prev + 2);

        // Award XP on Firebase if user is logged in
        if (userProfile?.uid) {
          awardStudyPoints(userProfile.uid, 2, 0).catch(console.error);
        }
      }
      showToast?.('success', 'Hongera! Umeelewa dhana hii (+2 XP)');
    } else if (type === 'hard') {
      if (!hardIndices.includes(currentIndex)) {
        setHardIndices([...hardIndices, currentIndex]);
      }
    }

    // Move to next card or complete
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      if (studyMode === 'timed') resetTimerForNextCard();
    } else {
      setSessionComplete(true);
      showToast?.('success', 'Umekamilisha mzunguko wa kadi za somo hili!');
    }
  };

  // Card Navigation
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (studyMode === 'timed') resetTimerForNextCard();
    } else {
      setSessionComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (studyMode === 'timed') resetTimerForNextCard();
    }
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIndices([]);
    setSessionComplete(false);
    showToast?.('info', 'Kadi zimechanganywa!');
    if (studyMode === 'timed') resetTimerForNextCard();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIndices([]);
    setHardIndices([]);
    setSessionComplete(false);
    showToast?.('info', 'Masomo yameanzishwa upya!');
    if (studyMode === 'timed') resetTimerForNextCard();
  };

  // AI Flashcard Generator function using backend AI API endpoint
  const handleGenerateAiFlashcards = async () => {
    if (!aiPromptTopic.trim()) return;
    setIsGeneratingAi(true);
    try {
      const response = await fetch('/api/claude.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: 'Wewe ni Lupanulla AI, mtaalamu wa kutoa flashcards fupi za masomo ya shule za Sekondari na Msingi nchini Tanzania (TIE & NECTA curriculum). Jibu pekee kwa JSON Array ya vitu 5 vyenye "term" na "definition".',
          messages: [
            { role: 'user', content: `Tengeneza flashcards 5 fupi za kimasomo kuhusu mada hii: "${aiPromptTopic}". Toa majibu kama JSON Array pekee.` }
          ]
        })
      });

      if (!response.ok) throw new Error('Seva imefeli kupata majibu');
      const data = await response.json();
      let replyText = data.reply || '';
      if (replyText.startsWith('```')) {
        replyText = replyText.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
      }

      const parsed = JSON.parse(replyText) as Flashcard[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setFlashcards(parsed);
        setCurrentIndex(0);
        setIsFlipped(false);
        setMasteredIndices([]);
        setSessionComplete(false);
        setAiPromptTopic('');
        setStudyMode('standard');
        showToast?.('success', '⚡ Flashcards 5 zimetengenezwa kikamilifu na AI!');
      } else {
        throw new Error('Muundo haukueleweka');
      }
    } catch (err) {
      showToast?.('error', 'Imeshindwa kuunda kadi na AI. Mfumo umehitimisha na kadi za kawaida.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const currentCard = flashcards[currentIndex] || flashcards[0];
  const progressPercent = flashcards.length > 0 ? Math.round((masteredIndices.length / flashcards.length) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-7 text-white shadow-2xl relative overflow-hidden space-y-6">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 flex items-center gap-1.5">
              <Brain size={13} className="text-cyan-400 animate-pulse" /> INTERACTIVE KNOWLEDGE TESTER
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 flex items-center gap-1">
              <Flame size={12} className="text-amber-400" /> +{sessionXpEarned} XP Earned
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
            <span>Kadi za Kumbukumbu (Subject Flashcards)</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Pima na imarisha uelewa wako wa dhana kuu, kanuni na maana za maneno ya masomo ya NECTA.
          </p>
        </div>

        {/* Study Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start lg:self-auto">
          <button
            onClick={() => {
              setStudyMode('standard');
              setTimerActive(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              studyMode === 'standard'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers size={13} />
            <span>Kawaida</span>
          </button>

          <button
            onClick={() => {
              setStudyMode('timed');
              resetTimerForNextCard();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              studyMode === 'timed'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Timer size={13} />
            <span>Muda (Timed)</span>
          </button>

          <button
            onClick={() => setStudyMode('ai')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              studyMode === 'ai'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Wand2 size={13} />
            <span>AI Generator</span>
          </button>
        </div>
      </div>

      {/* Subject & Topic Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
        {/* Subject Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
            <BookOpen size={12} className="text-cyan-400" /> Somo (Subject)
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedTopicTitle('all');
            }}
            className="w-full bg-slate-950 text-slate-100 font-extrabold text-xs rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            {Object.keys(SUBJECT_PRESETS).map(subKey => (
              <option key={subKey} value={subKey}>
                📖 {subKey}
              </option>
            ))}
            {availableSubjects.filter(s => !SUBJECT_PRESETS[s]).map(sub => (
              <option key={sub} value={sub}>
                📚 {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
            <Sliders size={12} className="text-cyan-400" /> Mada (Topic / Chapter)
          </label>
          <select
            value={selectedTopicTitle}
            onChange={(e) => setSelectedTopicTitle(e.target.value)}
            className="w-full bg-slate-950 text-slate-100 font-extrabold text-xs rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer truncate"
          >
            <option value="all">Mada Zote za {selectedSubject}</option>
            {availableTopics.map((t, idx) => (
              <option key={idx} value={t.title}>
                📌 {t.title}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Progress Bar Summary */}
        <div className="sm:col-span-2 lg:col-span-1 bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Maendeleo ya Uelewa</span>
            <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
              <span>{masteredIndices.length} / {flashcards.length} Kadi ({progressPercent}%)</span>
            </div>
          </div>
          <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/50">
            <motion.div 
              className="bg-emerald-400 h-full rounded-full" 
              animate={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>
      </div>

      {/* AI GENERATOR MODE OVERLAY */}
      {studyMode === 'ai' ? (
        <div className="bg-slate-950 p-6 rounded-2xl border border-purple-500/30 space-y-4 animate-fade-in relative z-10">
          <div className="flex items-center gap-2 text-purple-300 font-extrabold text-sm">
            <Wand2 size={18} className="text-purple-400 animate-spin-slow" />
            <span>Tengeneza Flashcards kwa kutumia Lupanulla AI</span>
          </div>
          <p className="text-xs text-slate-300">
            Andika jina la mada au dhana yoyote ya masomo (mfano: <i>"Electricity & Magnetism"</i>, <i>"Nyakati za Kiswahili"</i>, au <i>"Digestive System"</i>) kisha bonyeza kutengeneza kadi 5 za papo hapo!
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={aiPromptTopic}
              onChange={(e) => setAiPromptTopic(e.target.value)}
              placeholder="Andika mada hapa..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleGenerateAiFlashcards}
              disabled={isGeneratingAi || !aiPromptTopic.trim()}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-black text-xs uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGeneratingAi ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Inatengeneza...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Tengeneza Kadi</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : sessionComplete ? (
        /* SESSION COMPLETE SCREEN */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950 p-8 rounded-3xl border border-emerald-500/30 text-center space-y-5 my-4 relative z-10"
        >
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg animate-bounce">
            <Trophy size={32} />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-white uppercase tracking-wide">Hongera Sana! Umekamilisha Mzunguko!</h3>
            <p className="text-xs text-slate-300">
              Umejifunza kadi {masteredIndices.length} kati ya {flashcards.length} za somo la <strong>{selectedSubject}</strong>.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Jumla ya XP Ulizozipata</span>
              <span className="text-lg font-black text-amber-400">+{sessionXpEarned} XP Points</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Marudia Upya</span>
            </button>
            <button
              onClick={handleShuffle}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
            >
              <Shuffle size={15} />
              <span>Changanya Kadi</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* MAIN 3D FLIP CARD TEST AREA */
        <div className="space-y-5 relative z-10 max-w-2xl mx-auto">
          
          {/* Timed Mode Bar */}
          {studyMode === 'timed' && (
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-amber-300">
              <span className="flex items-center gap-2">
                <Timer size={16} className="animate-pulse" /> Sogeza jibu kabla muda haujaisha!
              </span>
              <span className="font-mono font-black text-base bg-amber-500/20 px-3 py-1 rounded-xl border border-amber-500/30">
                00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
              </span>
            </div>
          )}

          {/* 3D Flip Card Container */}
          <div 
            className="perspective-1000 h-72 sm:h-80 cursor-pointer group"
            onClick={() => {
              setIsFlipped(!isFlipped);
              window.speechSynthesis.cancel();
              setIsSpeaking(false);
            }}
          >
            <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
              
              {/* CARD FRONT SIDE */}
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl group-hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-black uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    DHANA / TERM (Mbele)
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSpeech(currentCard?.term || '');
                      }}
                      className={`p-2 rounded-xl border transition-all ${
                        isSpeaking 
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                      title="Sikia Sauti"
                    >
                      {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>

                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {currentIndex + 1} / {flashcards.length}
                    </span>
                  </div>
                </div>

                <div className="my-auto text-center px-2">
                  <h3 className="text-lg sm:text-2xl font-black text-white leading-snug tracking-wide">
                    {currentCard?.term}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 border-t border-slate-800 pt-3">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <RotateCw size={13} className="animate-spin-slow" /> Bofya kadi hapa uone maana
                  </span>
                  <span>{masteredIndices.includes(currentIndex) ? '✓ Umeelewa' : 'Bado kujifunza'}</span>
                </div>
              </div>

              {/* CARD BACK SIDE */}
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl rotate-y-180">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-black uppercase text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    MAELEZO / DEFINITION (Nyuma)
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSpeech(currentCard?.definition || '');
                    }}
                    className={`p-2 rounded-xl border transition-all ${
                      isSpeaking 
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 animate-pulse' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Sikia Sauti"
                  >
                    {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>

                <div className="my-auto text-center px-2 overflow-y-auto max-h-[140px]">
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
                    {currentCard?.definition}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 border-t border-slate-800 pt-3">
                  <span className="text-cyan-300 flex items-center gap-1">
                    <RotateCw size={13} /> Bofya kurudi mbele
                  </span>
                  <span className="text-emerald-400">Pima uelewa wako hapa chini ↓</span>
                </div>
              </div>

            </div>
          </div>

          {/* Assessment Action Buttons (Easy, Medium, Hard) */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block text-center">
              Je, uliikumbuka dhana hii vizuri?
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleAssessment('hard')}
                className="py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>🔴 Sijakumbuka</span>
              </button>

              <button
                onClick={() => handleAssessment('medium')}
                className="py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>🟡 Kidogo</span>
              </button>

              <button
                onClick={() => handleAssessment('easy')}
                className="py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <CheckCircle2 size={15} />
                <span>🟢 Nimeelewa (+2 XP)</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Iliyopita</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold uppercase rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Changanya Kadi"
              >
                <Shuffle size={14} />
                <span className="hidden sm:inline">Changanya</span>
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold uppercase rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Anza Upya"
              >
                <RotateCcw size={14} />
                <span className="hidden sm:inline">Anza Upya</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
            >
              <span className="hidden sm:inline">Inayofuata</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

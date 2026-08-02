import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Calendar, 
  Flame, 
  Target, 
  Edit3, 
  Check, 
  Sparkles,
  BookOpen,
  Award,
  Clock
} from 'lucide-react';
import { UserProfile } from '../types';

interface NectaCountdownWidgetProps {
  language?: 'sw' | 'en';
  userProfile?: UserProfile | null;
  onNavigate?: (tab: string) => void;
}

interface PresetExam {
  id: string;
  nameSw: string;
  nameEn: string;
  level: string;
  defaultDate: string; // YYYY-MM-DD
}

const PRESET_EXAMS: PresetExam[] = [
  {
    id: 'csee-2026',
    nameSw: 'NECTA CSEE (Form 4)',
    nameEn: 'NECTA CSEE (Form 4)',
    level: 'Form 4',
    defaultDate: '2026-11-02'
  },
  {
    id: 'acsee-2027',
    nameSw: 'NECTA ACSEE (Form 6)',
    nameEn: 'NECTA ACSEE (Form 6)',
    level: 'Form 6',
    defaultDate: '2027-05-03'
  },
  {
    id: 'ftna-2026',
    nameSw: 'NECTA FTNA (Form 2)',
    nameEn: 'NECTA FTNA (Form 2)',
    level: 'Form 2',
    defaultDate: '2026-11-09'
  },
  {
    id: 'psle-2026',
    nameSw: 'NECTA PSLE (Darasa la 7)',
    nameEn: 'NECTA PSLE (Standard 7)',
    level: 'Primary',
    defaultDate: '2026-09-09'
  }
];

export default function NectaCountdownWidget({ language = 'sw', userProfile, onNavigate }: NectaCountdownWidgetProps) {
  // Load saved exam configuration or default to Form 4 CSEE 2026
  const [examName, setExamName] = useState<string>(() => {
    return localStorage.getItem('necta_exam_name') || 'NECTA CSEE (Kidato cha 4)';
  });
  
  const [examDateStr, setExamDateStr] = useState<string>(() => {
    return localStorage.getItem('necta_exam_date') || '2026-11-02';
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(examName);
  const [tempDate, setTempDate] = useState<string>(examDateStr);

  // Time remaining state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(examDateStr + 'T08:00:00').getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [examDateStr]);

  const handleSave = () => {
    const finalName = tempName.trim() || 'NECTA Exam';
    const finalDate = tempDate || '2026-11-02';
    
    setExamName(finalName);
    setExamDateStr(finalDate);
    localStorage.setItem('necta_exam_name', finalName);
    localStorage.setItem('necta_exam_date', finalDate);
    setIsEditing(false);
  };

  const handlePresetSelect = (preset: PresetExam) => {
    setTempName(language === 'sw' ? preset.nameSw : preset.nameEn);
    setTempDate(preset.defaultDate);
  };

  // Format date nicely
  const formattedDate = new Date(examDateStr + 'T00:00:00').toLocaleDateString(
    language === 'sw' ? 'sw-TZ' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  // Motivational quote based on days remaining
  const getMotivationalText = () => {
    if (timeLeft.isPast) {
      return language === 'sw'
        ? 'Mitihani imewadia! Kila la kheri katika kufanya vizuri zaidi!'
        : 'The exams are here! All the best in achieving your highest potential!';
    }
    if (timeLeft.days > 90) {
      return language === 'sw'
        ? 'Bado una muda mzuri wa kujenga msingi imara. Soma mada 1 kila siku!'
        : 'Great time ahead to build a solid foundation. Study 1 topic every day!';
    }
    if (timeLeft.days > 30) {
      return language === 'sw'
        ? 'Wakati wa marudio umezidi kukurubia! Fanya Past Papers zote za NECTA.'
        : 'Revision time is drawing near! Practice all past NECTA papers now.';
    }
    return language === 'sw'
      ? 'Dhahabu inatengenezwa sasa! Zingatia ratiba na utulivu wa akili.'
      : 'Excellence is forged now! Stay focused, calm, and follow your schedule.';
  };

  return (
    <div id="necta-countdown-widget" className="bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-cyan-500/20 relative overflow-hidden transition-all">
      {/* Background Subtle Accent Effect */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-inner">
            <Timer size={20} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider flex items-center gap-1">
              <Sparkles size={11} className="text-amber-400" />
              {language === 'sw' ? 'Muda wa Mitihani' : 'NECTA Exam Countdown'}
            </span>
            <h3 className="font-display font-black text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-[260px]">
              {examName}
            </h3>
          </div>
        </div>

        <button
          onClick={() => {
            setTempName(examName);
            setTempDate(examDateStr);
            setIsEditing(!isEditing);
          }}
          className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 rounded-xl transition-all border border-slate-800"
          title={language === 'sw' ? 'Badili tarehe ya mtihani' : 'Edit exam date'}
        >
          {isEditing ? <Check size={16} className="text-emerald-400" /> : <Edit3 size={16} />}
        </button>
      </div>

      {/* Edit Form Drawer */}
      {isEditing ? (
        <div className="py-4 space-y-4 animate-fadeIn">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
              {language === 'sw' ? 'Jina la Mtihani' : 'Exam Title'}
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Mfano: NECTA CSEE 2026"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
              {language === 'sw' ? 'Tarehe ya Kuanza Mtihani' : 'Exam Date'}
            </label>
            <input
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
            />
          </div>

          {/* Preset Buttons */}
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">
              {language === 'sw' ? 'Chagua Mitihani Rasmi ya NECTA:' : 'Quick NECTA Presets:'}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {PRESET_EXAMS.map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-[10px] font-bold text-cyan-300 text-left truncate transition-all"
                >
                  {language === 'sw' ? preset.nameSw : preset.nameEn}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs py-2 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5"
            >
              <Check size={14} />
              {language === 'sw' ? 'Hifadhi Tarehe' : 'Save Countdown'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2 rounded-xl transition-all"
            >
              {language === 'sw' ? 'Ghairi' : 'Cancel'}
            </button>
          </div>
        </div>
      ) : (
        /* Countdown Display */
        <div className="py-4 space-y-4">
          {timeLeft.isPast ? (
            <div className="text-center py-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <Award size={32} className="text-amber-400 mx-auto mb-2 animate-bounce" />
              <h4 className="font-display font-black text-lg text-amber-300 uppercase">
                {language === 'sw' ? 'Muda wa Mtihani Umewadia!' : 'Exam Time is Here!'}
              </h4>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                {language === 'sw' ? 'Kila la heri katika mitihani yako ya NECTA.' : 'Wishing you maximum success in your NECTA exams.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center">
              {/* Days Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                <span className="font-display font-black text-2xl sm:text-3xl text-cyan-300 tracking-tight leading-none">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  {language === 'sw' ? 'Siku' : 'Days'}
                </span>
              </div>

              {/* Hours Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                <span className="font-display font-black text-2xl sm:text-3xl text-amber-300 tracking-tight leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  {language === 'sw' ? 'Masaa' : 'Hours'}
                </span>
              </div>

              {/* Minutes Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                <span className="font-display font-black text-2xl sm:text-3xl text-teal-300 tracking-tight leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  {language === 'sw' ? 'Dadaika' : 'Mins'}
                </span>
              </div>

              {/* Seconds Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                <span className="font-display font-black text-2xl sm:text-3xl text-emerald-300 tracking-tight leading-none animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  {language === 'sw' ? 'Sekunde' : 'Secs'}
                </span>
              </div>
            </div>
          )}

          {/* Date & Motivational Quote Footer */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={13} className="text-cyan-400" />
                {language === 'sw' ? 'Siku ya Mtihani:' : 'Target Date:'}
              </span>
              <span className="font-bold text-cyan-200">{formattedDate}</span>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-start gap-2">
              <Flame size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300 leading-snug font-medium">
                {getMotivationalText()}
              </p>
            </div>
          </div>

          {/* Action Call to Study */}
          {onNavigate && (
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onNavigate('mitihani')}
                className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/10 flex items-center justify-center gap-1.5"
              >
                <BookOpen size={14} />
                {language === 'sw' ? 'Fanya Past Papers Sasa' : 'Practice Past Papers'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

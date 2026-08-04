import React, { useState, useEffect, useRef } from 'react';
import { 
  Target, 
  Clock, 
  Trophy, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Edit3, 
  Plus, 
  Flame, 
  ChevronRight, 
  BookOpen, 
  RotateCcw,
  Award,
  PartyPopper
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { updateUserProfile } from '../firebase';
import { triggerGoalCompletedConfetti } from '../utils/confetti';

interface DailyStudyGoalWidgetProps {
  userProfile?: any;
  todayMinutes?: number;
  todayXp?: number;
  onAwardPoints?: (points: number, minutes: number) => void;
  onNavigate?: (view: string) => void;
  language?: 'sw' | 'en';
}

const PRESET_GOALS = [15, 30, 45, 60, 90, 120];

export default function DailyStudyGoalWidget({
  userProfile,
  todayMinutes = 0,
  todayXp = 0,
  onAwardPoints,
  onNavigate,
  language = 'sw'
}: DailyStudyGoalWidgetProps) {
  // Goal state in minutes (default 60 mins if not set)
  const [goalMinutes, setGoalMinutes] = useState<number>(() => {
    if (userProfile?.dailyGoalMinutes) return userProfile.dailyGoalMinutes;
    const saved = localStorage.getItem('lupanulla_daily_study_goal_mins');
    return saved ? parseInt(saved, 10) : 60;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState<number>(goalMinutes);
  const [customInput, setCustomInput] = useState<string>('');
  const [logSuccessMessage, setLogSuccessMessage] = useState<string | null>(null);

  // Sync state if userProfile updates
  useEffect(() => {
    if (userProfile?.dailyGoalMinutes) {
      setGoalMinutes(userProfile.dailyGoalMinutes);
      setTempGoal(userProfile.dailyGoalMinutes);
    }
  }, [userProfile?.dailyGoalMinutes]);

  const handleSaveGoal = async (newGoal: number) => {
    const validGoal = Math.max(5, Math.min(480, newGoal));
    setGoalMinutes(validGoal);
    localStorage.setItem('lupanulla_daily_study_goal_mins', String(validGoal));
    setIsEditing(false);

    if (userProfile?.uid) {
      try {
        await updateUserProfile(userProfile.uid, { dailyGoalMinutes: validGoal });
      } catch (e) {
        console.warn('Could not sync goal to profile:', e);
      }
    }
  };

  // Calculations
  const targetXp = goalMinutes * 10;
  const progressPercent = Math.min(100, Math.round((todayMinutes / goalMinutes) * 100));
  const isGoalAchieved = todayMinutes >= goalMinutes;
  const remainingMinutes = Math.max(0, goalMinutes - todayMinutes);

  const hasTriggeredConfetti = useRef(false);

  useEffect(() => {
    if (isGoalAchieved && !hasTriggeredConfetti.current && todayMinutes > 0) {
      triggerGoalCompletedConfetti();
      hasTriggeredConfetti.current = true;
    }
  }, [isGoalAchieved, todayMinutes]);

  const handleQuickLog = (mins: number) => {
    const xpPoints = mins * 10;
    const newTotalMinutes = todayMinutes + mins;
    if (onAwardPoints && userProfile?.uid) {
      onAwardPoints(xpPoints, mins);
    }

    if (newTotalMinutes >= goalMinutes && !isGoalAchieved) {
      triggerGoalCompletedConfetti();
      hasTriggeredConfetti.current = true;
      setLogSuccessMessage(`🎉 HONGERA SANA! Umefikisha lengo lako la masomo leo (+${mins} Min, +${xpPoints} XP)!`);
    } else {
      setLogSuccessMessage(`Hongera! Umeongeza +${mins} Min na +${xpPoints} XP! 🎉`);
    }

    setTimeout(() => setLogSuccessMessage(null), 4000);
  };

  return (
    <section className={`relative rounded-3xl p-6 sm:p-7 transition-all border shadow-sm ${
      isGoalAchieved 
        ? 'bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 text-white border-emerald-500/40 shadow-emerald-950/20 ring-1 ring-emerald-500/30' 
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Background Subtle Gradient Overlay when active */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Section: Header & Current Goal Status */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                isGoalAchieved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-100 text-cyan-700'
              }`}>
                <Target size={22} className={isGoalAchieved ? 'animate-bounce' : ''} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-display font-extrabold text-base sm:text-lg uppercase tracking-wide ${
                    isGoalAchieved ? 'text-white' : 'text-slate-950'
                  }`}>
                    Lengo la Masomo la Siku (Daily Goal)
                  </h3>
                  {isGoalAchieved && (
                    <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-sm">
                      <CheckCircle2 size={12} /> Lengo Limekamilika!
                    </span>
                  )}
                </div>
                <p className={`text-xs font-medium ${isGoalAchieved ? 'text-emerald-200/80' : 'text-slate-500'}`}>
                  Fikia lengo lako la kila siku kupata pointi nyingi za XP na kudumisha streak!
                </p>
              </div>
            </div>

            {/* Target Edit Trigger */}
            <button
              onClick={() => {
                setTempGoal(goalMinutes);
                setIsEditing(!isEditing);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isGoalAchieved 
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Edit3 size={13} />
              <span>{goalMinutes} Min / Siku</span>
            </button>
          </div>

          {/* Quick Success Alert */}
          <AnimatePresence>
            {logSuccessMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Sparkles size={14} className="text-amber-300 animate-spin" />
                <span>{logSuccessMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar & Numerical Metrics */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className={`flex items-center gap-1.5 ${isGoalAchieved ? 'text-emerald-300' : 'text-slate-700'}`}>
                <Clock size={14} className={isGoalAchieved ? 'text-emerald-400' : 'text-cyan-600'} />
                {todayMinutes} / {goalMinutes} Min
              </span>
              <span className={`flex items-center gap-1.5 ${isGoalAchieved ? 'text-amber-300' : 'text-amber-600'}`}>
                <Zap size={14} />
                {todayXp} / {targetXp} XP
              </span>
              <span className={`font-black text-sm ${
                isGoalAchieved ? 'text-emerald-400' : progressPercent >= 50 ? 'text-cyan-600' : 'text-slate-500'
              }`}>
                {progressPercent}%
              </span>
            </div>

            {/* Custom Track */}
            <div className={`w-full h-3.5 rounded-full p-0.5 overflow-hidden border ${
              isGoalAchieved ? 'bg-slate-900 border-emerald-500/30' : 'bg-slate-100 border-slate-200'
            }`}>
              <motion.div 
                className={`h-full rounded-full transition-all duration-700 ${
                  isGoalAchieved 
                    ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 shadow-lg shadow-emerald-400/30' 
                    : progressPercent >= 75
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-500'
                }`}
                style={{ width: `${progressPercent}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Status Message */}
            <div className="flex items-center justify-between text-[11px] font-semibold pt-0.5">
              <span className={isGoalAchieved ? 'text-emerald-300 font-bold' : 'text-slate-500'}>
                {isGoalAchieved ? (
                  '🎉 Hongera sana! Umefikia lengo la leo la kujifunza!'
                ) : remainingMinutes > 0 ? (
                  `Bado dakika ${remainingMinutes} kufikia lengo lako la leo.`
                ) : (
                  'Anza kusoma mada mpya au fanya mtihani kuanza kufikisha lengo!'
                )}
              </span>

              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                isGoalAchieved ? 'text-amber-300' : 'text-cyan-700'
              }`}>
                +10 XP / Kila Dakika
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Quick Action Buttons & Interactive Launcher */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 justify-center">
          {isGoalAchieved && (
            <button
              onClick={() => triggerGoalCompletedConfetti()}
              className="px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md shadow-amber-500/20 animate-pulse"
              title="Sherehekea tena mafanikio ya leo!"
            >
              <PartyPopper size={16} />
              <span>Sherehekea 🎉</span>
            </button>
          )}

          {onNavigate && (
            <button
              onClick={() => onNavigate('masomo')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                isGoalAchieved
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              <BookOpen size={15} />
              <span>Soma Mada Sasa</span>
              <ChevronRight size={14} />
            </button>
          )}

          {/* Quick 15 Mins Booster */}
          <button
            onClick={() => handleQuickLog(15)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 border ${
              isGoalAchieved
                ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
            }`}
            title="Weka Rekodi ya Dakika 15 ulizojisomea peke yako"
          >
            <Plus size={14} className="text-emerald-500" />
            <span>Ongeza +15 Min</span>
          </button>
        </div>
      </div>

      {/* Target Editing Modal / Modal Selector Drawer */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-5 pt-5 border-t space-y-4 ${
              isGoalAchieved ? 'border-emerald-500/30' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className={`font-bold text-xs uppercase tracking-wider ${
                isGoalAchieved ? 'text-emerald-300' : 'text-slate-900'
              }`}>
                Weka Lengo la Muda wa Kujisomea (Minutes Per Day)
              </h4>
              <button 
                onClick={() => setIsEditing(false)}
                className={`text-[11px] font-bold ${isGoalAchieved ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
              >
                Funga
              </button>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_GOALS.map((preset) => {
                const isSelected = tempGoal === preset;
                return (
                  <button
                    key={preset}
                    onClick={() => {
                      setTempGoal(preset);
                      handleSaveGoal(preset);
                    }}
                    className={`py-2 px-3 rounded-xl font-extrabold text-xs transition-all border ${
                      isSelected 
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md ring-2 ring-cyan-500/40' 
                        : isGoalAchieved 
                          ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {preset} Min
                  </button>
                );
              })}
            </div>

            {/* Custom Minutes Input */}
            <div className="flex items-center gap-2 pt-1">
              <input 
                type="number"
                min="5"
                max="480"
                placeholder="Andika dakika nyingine (mf. 75)"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className={`flex-1 px-4 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-1 ${
                  isGoalAchieved
                    ? 'bg-slate-900 text-white border-slate-700 focus:ring-emerald-400 placeholder-slate-500'
                    : 'bg-slate-50 text-slate-900 border-slate-200 focus:ring-cyan-500 placeholder-slate-400'
                }`}
              />
              <button
                onClick={() => {
                  const val = parseInt(customInput, 10);
                  if (val && !isNaN(val)) {
                    handleSaveGoal(val);
                    setCustomInput('');
                  }
                }}
                disabled={!customInput || isNaN(parseInt(customInput, 10))}
                className="px-5 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold disabled:opacity-50 hover:bg-slate-900 transition-all"
              >
                Hifadhi Lengo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

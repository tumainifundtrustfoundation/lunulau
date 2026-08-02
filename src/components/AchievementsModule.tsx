import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  CheckCircle, 
  Lock, 
  Sparkles, 
  Trophy, 
  Clock, 
  Moon, 
  Sun, 
  BookOpen, 
  Flame, 
  Zap, 
  Filter, 
  Info,
  Check
} from 'lucide-react';
import { evaluateAchievements, unlockBadge, AchievementBadge } from '../utils/achievements';
import { UserProfile } from '../types';

interface AchievementsModuleProps {
  userProfile?: Partial<UserProfile> | null;
  language?: 'sw' | 'en';
  onNavigate?: (view: string) => void;
  compact?: boolean;
}

export default function AchievementsModule({
  userProfile = null,
  language = 'sw',
  onNavigate,
  compact = false
}: AchievementsModuleProps) {
  const [badges, setBadges] = useState<AchievementBadge[]>(() => evaluateAchievements(userProfile));
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'routine' | 'mastery'>('all');
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refreshBadges = () => {
    setBadges(evaluateAchievements(userProfile));
  };

  useEffect(() => {
    refreshBadges();

    const handleUnlocked = () => {
      refreshBadges();
    };

    window.addEventListener('achievement-unlocked', handleUnlocked);
    window.addEventListener('refresh-user-profile', handleUnlocked);

    return () => {
      window.removeEventListener('achievement-unlocked', handleUnlocked);
      window.removeEventListener('refresh-user-profile', handleUnlocked);
    };
  }, [userProfile]);

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalXPFromBadges = badges.filter(b => b.unlocked).reduce((sum, b) => sum + b.xpReward, 0);
  const overallCompletion = Math.round((unlockedCount / badges.length) * 100);

  const handleSimulateUnlock = (badge: AchievementBadge) => {
    unlockBadge(badge.id);
    refreshBadges();
    
    // Also update selected badge if open
    setSelectedBadge(prev => prev ? { ...prev, unlocked: true, unlockedAt: 'Hivi Karibuni' } : null);

    setToastMessage(`🎉 Beji Imefunguliwa! Hongera kwa kupata "${badge.titleSw}" (+${badge.xpReward} XP)!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredBadges = badges.filter(b => {
    if (activeFilter === 'unlocked') return b.unlocked;
    if (activeFilter === 'routine') return b.category === 'routine';
    if (activeFilter === 'mastery') return b.category === 'mastery';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Toast popup when unlocking */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="p-3.5 rounded-2xl bg-amber-500 text-amber-950 font-black text-xs shadow-xl flex items-center justify-between border border-amber-300 z-50"
          >
            <div className="flex items-center gap-2">
              <Trophy size={18} className="animate-bounce shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-amber-950/70 hover:text-amber-950 text-xs font-extrabold px-2 py-0.5"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header / Stats Summary Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white border border-slate-800 shadow-lg space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-amber-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
              <Award size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  Moduli ya Beji na Mafanikio
                </span>
                <span className="text-[9px] font-black uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-400/30">
                  {overallCompletion}% Imekamilika
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                Beji Zilizofunguliwa ({unlockedCount} / {badges.length})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/70 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300">
            <Zap size={15} className="text-amber-400 fill-amber-400" />
            <span>Alama za Beji:</span>
            <span className="text-amber-300 font-black text-sm">{totalXPFromBadges} XP</span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-1.5 relative z-10">
          <div className="flex justify-between text-[11px] text-slate-400 font-bold">
            <span>Maendeleo ya Jumla ya Mwanafunzi</span>
            <span className="text-cyan-400">{unlockedCount} kati ya {badges.length} Beji</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallCompletion}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400 rounded-full shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      {!compact && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: `Beji Zote (${badges.length})` },
            { id: 'unlocked', label: `Zilizofunguliwa (${unlockedCount})` },
            { id: 'routine', label: 'Muda (Early Bird & Night Owl)' },
            { id: 'mastery', label: 'Bingwa wa Mitihani & Masaa' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 border ${
                activeFilter === f.id
                  ? 'bg-slate-900 text-amber-300 border-amber-400/40 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Badges Grid */}
      <div className={`grid gap-3 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredBadges.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ y: -2 }}
            onClick={() => setSelectedBadge(badge)}
            className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-3 relative overflow-hidden shadow-sm ${
              badge.unlocked
                ? 'bg-gradient-to-b from-white to-amber-50/40 border-amber-300/80 shadow-amber-500/5'
                : 'bg-white/80 border-slate-200/80 opacity-85 hover:opacity-100 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shrink-0 transition-transform ${
                  badge.unlocked
                    ? 'bg-amber-100/80 border-amber-300 text-amber-600 shadow-sm scale-105'
                    : 'bg-slate-100 border-slate-200 text-slate-400 grayscale'
                }`}>
                  {badge.icon}
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 leading-tight">
                    {badge.titleSw}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                    +{badge.xpReward} XP Reward
                  </span>
                </div>
              </div>

              {badge.unlocked ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-[9px] font-black uppercase flex items-center gap-1 shrink-0">
                  <Check size={11} /> Unlocked
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-black uppercase flex items-center gap-1 shrink-0">
                  <Lock size={10} /> Locked
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2">
              {badge.descSw}
            </p>

            {/* Badge Progress Indicator */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <div className="flex justify-between text-[9px] font-black uppercase">
                <span className={badge.unlocked ? 'text-amber-600' : 'text-slate-400'}>
                  {badge.progressLabel}
                </span>
                <span className="text-slate-500">{badge.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    badge.unlocked ? 'bg-amber-400' : 'bg-slate-300'
                  }`}
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Badge Detail Drawer / Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-extrabold text-sm"
              >
                ✕
              </button>

              <div className="text-center space-y-3 pt-2">
                <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl border shadow-lg ${
                  selectedBadge.unlocked
                    ? 'bg-amber-100 border-amber-300 text-amber-600 shadow-amber-400/20'
                    : 'bg-slate-100 border-slate-200 text-slate-400 grayscale'
                }`}>
                  {selectedBadge.icon}
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg inline-block">
                    Beji ya Mafanikio
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {selectedBadge.titleSw}
                  </h3>
                  <p className="text-xs font-extrabold text-amber-600">
                    Zawadi: +{selectedBadge.xpReward} XP
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <p className="font-extrabold text-slate-800">Maelezo ya Beji:</p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {selectedBadge.descSw}
                </p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] font-bold text-slate-500">
                  <span>Hali:</span>
                  <span className={selectedBadge.unlocked ? 'text-emerald-600 font-extrabold' : 'text-slate-500'}>
                    {selectedBadge.unlocked ? `Imefunguliwa (${selectedBadge.unlockedAt || 'Leo'})` : 'Bado Haijafunguliwa'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {!selectedBadge.unlocked ? (
                  <button
                    onClick={() => handleSimulateUnlock(selectedBadge)}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-xs py-3 rounded-2xl uppercase tracking-wider transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={15} />
                    <span>Fungua Sasa (Simulate Unlock)</span>
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-black text-center flex items-center justify-center gap-1.5 border border-emerald-200">
                    <CheckCircle size={15} />
                    <span>Hongera! Beji hii tayari imehifadhiwa kwenye akaunti yako.</span>
                  </div>
                )}

                {onNavigate && (
                  <button
                    onClick={() => {
                      setSelectedBadge(null);
                      if (selectedBadge.id === 'early_bird' || selectedBadge.id === 'night_owl' || selectedBadge.id === 'master_scholar') {
                        onNavigate('masomo');
                      } else if (selectedBadge.id === 'exam_master') {
                        onNavigate('mitihani');
                      } else {
                        onNavigate('dashboard');
                      }
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 rounded-2xl transition-all"
                  >
                    Nenda Kusoma Ili Kuitimiza
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

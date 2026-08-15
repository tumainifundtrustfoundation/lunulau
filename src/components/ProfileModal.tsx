import { useState } from 'react';
import { 
  User, 
  Mail, 
  Award, 
  Crown, 
  ShieldCheck, 
  X, 
  Zap
} from 'lucide-react';
import AchievementsModule from './AchievementsModule';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: Partial<UserProfile> | null;
  onNavigate?: (view: string) => void;
  language?: 'sw' | 'en';
}

export default function ProfileModal({
  isOpen,
  onClose,
  userProfile,
  onNavigate,
  language = 'sw'
}: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'achievements' | 'info'>('achievements');

  if (!isOpen) return null;

  const xp = userProfile?.xp || 5400;
  const studyTime = userProfile?.studyTime || 120;
  const level = Math.max(1, Math.floor(xp / 450));
  const isPremium = userProfile?.subscription === 'premium' || userProfile?.role === 'admin' || userProfile?.role === 'super_admin';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white relative overflow-hidden shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm transition-colors border border-slate-700 cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="flex flex-wrap items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-black text-2xl uppercase shadow-xl ring-4 ring-cyan-500/20 shrink-0">
              {userProfile?.name ? userProfile.name.charAt(0) : 'M'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {userProfile?.name || 'Mwanafunzi Lupanulla'}
                </h2>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                  isPremium 
                    ? 'bg-amber-400 text-amber-950 border-amber-300' 
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {isPremium ? <Crown size={11} /> : null}
                  {isPremium ? '★ Premium' : 'Akaunti ya Bure'}
                </span>
              </div>

              <p className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <Mail size={12} className="text-cyan-400" />
                <span>{userProfile?.email || 'mwanafunzi@lupanulla.co.tz'}</span>
              </p>

              {/* Level & XP Stats Row */}
              <div className="flex items-center gap-3 pt-1 text-xs font-bold">
                <span className="text-amber-300 flex items-center gap-1">
                  <Zap size={13} className="fill-current text-amber-400" />
                  Level {level}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-300">{xp} XP</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400">{studyTime} Dk za Masomo</span>
              </div>
            </div>
          </div>

          {/* Modal Sub Nav Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-slate-800/80 pt-3">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/70 text-slate-300 hover:text-white'
              }`}
            >
              <Award size={14} />
              <span>Beji & Mafanikio (Achievements)</span>
            </button>

            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'info'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/70 text-slate-300 hover:text-white'
              }`}
            >
              <User size={14} />
              <span>Taarifa za Akaunti</span>
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'achievements' ? (
            <AchievementsModule 
              userProfile={userProfile} 
              language={language} 
              onNavigate={(v) => {
                onClose();
                if (onNavigate) onNavigate(v);
              }} 
            />
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                <h3 className="font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-cyan-600" />
                  Maelezo ya Mwanafunzi
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-slate-200/60 space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Jina:</span>
                    <p className="font-bold text-slate-900">{userProfile?.name || 'Mwanafunzi Lupanulla'}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/60 space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Barua Pepe:</span>
                    <p className="font-bold text-slate-900">{userProfile?.email || 'Haikupatikana'}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/60 space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Namba ya Simu:</span>
                    <p className="font-bold text-slate-900">{userProfile?.phone || '+255 700 000 000'}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/60 space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Cheo cha Akaunti:</span>
                    <p className="font-bold text-slate-900 uppercase">{userProfile?.role || 'mwanafunzi'}</p>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              {onNavigate && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('premium');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Crown size={14} />
                    <span>Boresha kwenda Premium</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('leaderboard');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Award size={14} className="text-amber-400" />
                    <span>Tazama Msimamo (Leaderboard)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

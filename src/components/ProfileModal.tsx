import { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Award, 
  Crown, 
  ShieldCheck, 
  X, 
  Zap,
  Camera,
  Upload,
  Trash2,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import AchievementsModule from './AchievementsModule';
import { UserProfile } from '../types';
import { updateUserProfile } from '../firebase';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: Partial<UserProfile> | null;
  onNavigate?: (view: string) => void;
  language?: 'sw' | 'en';
  onProfileUpdate?: () => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  userProfile,
  onNavigate,
  language = 'sw',
  onProfileUpdate
}: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'achievements' | 'info'>('achievements');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const xp = userProfile?.xp || 5400;
  const studyTime = userProfile?.studyTime || 120;
  const level = Math.max(1, Math.floor(xp / 450));
  const isPremium = userProfile?.subscription === 'premium' || userProfile?.role === 'admin' || userProfile?.role === 'super_admin';

  // Handle image upload and resize to safe base64
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError(language === 'sw' ? 'Tafadhali chagua faili la picha (JPEG, PNG, WebP).' : 'Please choose an image file (JPEG, PNG, WebP).');
      return;
    }

    // Validate size (max 5MB raw)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(language === 'sw' ? 'Picha ni kubwa mno. Tafadhali chagua picha chini ya 5MB.' : 'Image is too large. Please select an image under 5MB.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = async () => {
        try {
          // Resize image on an off-screen canvas to max 256x256 for fast loading and low storage footprint
          const canvas = document.createElement('canvas');
          const maxDim = 256;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

            if (userProfile?.uid) {
              await updateUserProfile(userProfile.uid, { photoURL: compressedDataUrl });
            }

            if (onProfileUpdate) {
              onProfileUpdate();
            }

            setUploadSuccess(language === 'sw' ? 'Picha ya wasifu imebadilishwa kikamilifu!' : 'Profile picture updated successfully!');
            setTimeout(() => setUploadSuccess(null), 3000);
          }
        } catch (err: any) {
          console.error('Failed to save profile picture:', err);
          setUploadError(language === 'sw' ? 'Imeshindwa kuhifadhi picha. Jaribu tena.' : 'Failed to save picture. Please try again.');
        } finally {
          setIsUploading(false);
        }
      };

      img.onerror = () => {
        setIsUploading(false);
        setUploadError(language === 'sw' ? 'Hitilafu ya kufungua picha.' : 'Error opening image file.');
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => {
      setIsUploading(false);
      setUploadError(language === 'sw' ? 'Hitilafu ya kusoma faili.' : 'Failed to read file.');
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = async () => {
    if (!userProfile?.uid) return;
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);
    try {
      await updateUserProfile(userProfile.uid, { photoURL: '' });
      if (onProfileUpdate) {
        onProfileUpdate();
      }
      setUploadSuccess(language === 'sw' ? 'Picha ya wasifu imeondolewa!' : 'Profile picture removed!');
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err) {
      setUploadError(language === 'sw' ? 'Hitilafu ya kuondoa picha.' : 'Failed to remove picture.');
    } finally {
      setIsUploading(false);
    }
  };

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
            {/* Profile Avatar with Change Trigger */}
            <div className="relative group shrink-0">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoSelect} 
                accept="image/png, image/jpeg, image/webp" 
                className="hidden" 
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-black text-2xl uppercase shadow-xl ring-4 ring-cyan-500/20 cursor-pointer relative transition-transform hover:scale-105"
                title={language === 'sw' ? 'Bonyeza kubadili picha ya wasifu' : 'Click to change profile picture'}
              >
                {userProfile?.photoURL ? (
                  <img 
                    src={userProfile.photoURL} 
                    alt={userProfile.name || 'User Profile'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{userProfile?.name ? userProfile.name.charAt(0) : 'M'}</span>
                )}

                {/* Hover overlay with camera */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity gap-1">
                  {isUploading ? (
                    <Loader2 size={20} className="animate-spin text-cyan-400" />
                  ) : (
                    <>
                      <Camera size={20} className="text-cyan-300" />
                      <span className="text-[9px] font-extrabold uppercase tracking-tight text-white">
                        {language === 'sw' ? 'Badili' : 'Change'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quick action button for Camera */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl flex items-center justify-center shadow-lg border-2 border-slate-900 cursor-pointer transition-transform hover:scale-110"
                title={language === 'sw' ? 'Pakia picha mpya' : 'Upload new picture'}
              >
                <Camera size={13} strokeWidth={2.5} />
              </button>
            </div>

            <div className="space-y-1 flex-1 min-w-[200px]">
              <div className="flex flex-wrap items-center gap-2">
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

              {/* Photo Action Buttons */}
              <div className="flex items-center gap-2 pt-1 pb-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-cyan-500/40 cursor-pointer transition-all"
                >
                  <Upload size={11} />
                  <span>{language === 'sw' ? 'Badili Picha' : 'Change Photo'}</span>
                </button>

                {userProfile?.photoURL && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    disabled={isUploading}
                    className="px-2 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-rose-500/30 cursor-pointer transition-all"
                  >
                    <Trash2 size={11} />
                    <span>{language === 'sw' ? 'Futa' : 'Remove'}</span>
                  </button>
                )}
              </div>

              {/* Success / Error Messages */}
              {uploadSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
                  <CheckCircle2 size={13} />
                  <span>{uploadSuccess}</span>
                </div>
              )}
              {uploadError && (
                <div className="flex items-center gap-1.5 text-rose-400 text-[11px] font-bold">
                  <X size={13} />
                  <span>{uploadError}</span>
                </div>
              )}

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

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle, Share, PlusSquare, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [installedSuccess, setInstalledSuccess] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // 2. Check iOS browser (Safari on iPhone/iPad)
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOSDevice && isSafari && !window.matchMedia('(display-mode: standalone)').matches) {
      const dismissedIOS = localStorage.getItem('lupanulla_pwa_dismissed_ios');
      if (!dismissedIOS) {
        setShowIOSGuide(true);
      }
    }

    // 3. Listen for Android / Chrome / Desktop PWA installation event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      const dismissedPWA = localStorage.getItem('lupanulla_pwa_dismissed');
      if (!dismissedPWA) {
        setShowBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowBanner(false);
      setShowIOSGuide(false);
      setShowIOSModal(false);
      setInstalledSuccess(true);
      setTimeout(() => setInstalledSuccess(false), 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show native prompt
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted PWA installation');
      setInstalledSuccess(true);
    } else {
      console.log('User dismissed PWA installation');
    }

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('lupanulla_pwa_dismissed', 'true');
  };

  const handleDismissIOSGuide = () => {
    setShowIOSGuide(false);
    localStorage.setItem('lupanulla_pwa_dismissed_ios', 'true');
  };

  if (isStandalone || installedSuccess) {
    if (installedSuccess) {
      return (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-bounce">
          <CheckCircle className="w-6 h-6 shrink-0" />
          <div>
            <p className="font-bold text-sm">Hongera! Application imesakinishwa!</p>
            <p className="text-xs opacity-90">Sasa unaweza kuitumia Lupanulla moja kwa moja kwenye skrini yako.</p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {/* Standard Android / Desktop Chrome PWA Install Banner */}
      {showBanner && deferredPrompt && (
        <div className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-blue-400/30 backdrop-blur-md animate-fade-in transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shrink-0 shadow-lg">
                <img src="/icon-192x192.png" alt="Lupanulla Icon" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 flex items-center gap-1">
                  <Sparkles size={11} className="text-amber-400" /> SAKINISHA APP RASMI
                </span>
                <h4 className="font-bold text-sm sm:text-base leading-tight">Lupanulla Elimu Hub</h4>
                <p className="text-xs text-blue-100/90 mt-0.5">Soma notisi na mitihani offline bila bando!</p>
              </div>
            </div>
            <button
              onClick={handleDismissBanner}
              className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              title="Funga"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} />
              <span>Sakinisha App Sasa (Install)</span>
            </button>
            <button
              onClick={handleDismissBanner}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-all"
            >
              Baadaye
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari Banner Preview */}
      {showIOSGuide && !showIOSModal && (
        <div className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-700 backdrop-blur-md animate-fade-in">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/40 p-2 flex items-center justify-center shrink-0">
                <img src="/icon-192x192.png" alt="Lupanulla Icon" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">iOS App Setup</span>
                <h4 className="font-bold text-sm">Sakinisha kwenye iPhone / iPad</h4>
                <p className="text-xs text-slate-300">Tumia bila bando kwenye skrini yako</p>
              </div>
            </div>
            <button onClick={handleDismissIOSGuide} className="text-slate-400 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          <div className="mt-3.5 flex items-center gap-2">
            <button
              onClick={() => setShowIOSModal(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Share size={14} className="text-cyan-300" />
              <span>Onyesha Maelekezo (Tutorial)</span>
            </button>
            <button
              onClick={handleDismissIOSGuide}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs py-2.5 px-3 rounded-xl transition-all"
            >
              Funga
            </button>
          </div>
        </div>
      )}

      {/* iOS Full Step-by-Step Custom Tutorial Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-700 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 p-2 shadow-lg flex items-center justify-center">
                  <img src="/icon-192x192.png" alt="Lupanulla Icon" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400">PWA Tutorial</span>
                  <h3 className="font-extrabold text-base text-white">Add to Home Screen (iOS)</h3>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Safari kwenye iOS haitumii kitufe cha moja kwa moja cha kusanikisha. Fuata hatua hizi fupi kuweka <strong>Lupanulla Elimu Hub</strong> kwenye skrini ya iPhone au iPad yako:
              </p>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      Bonyeza Kitufe cha Share <Share size={14} className="text-cyan-400" />
                    </p>
                    <p className="text-slate-300 mt-0.5">
                      Chini ya skrini ya Safari (au juu kwenye iPad), gusa alama ya kushirikisha (Share icon).
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      Chagua "Add to Home Screen" <PlusSquare size={14} className="text-emerald-400" />
                    </p>
                    <p className="text-slate-300 mt-0.5">
                      Sogeza orodha ya chaguo chini kisha uguse <strong>Add to Home Screen</strong> (Weka kwenye Skrini Kuu).
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white">
                      Thibitisha kwa kugusa "Add" (Ongeza)
                    </p>
                    <p className="text-slate-300 mt-0.5">
                      Gusa kitufe cha <strong>Add</strong> juu kulia. Icon ya Lupanulla itaonekana papo hapo kwenye App Drawer yako!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl text-[11px] text-amber-200 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400 shrink-0" />
                <span>Ukishamaliza, utapata uwezo wa kusoma notisi na past papers zote hata ukiwa offline!</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => {
                  setShowIOSModal(false);
                  handleDismissIOSGuide();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all"
              >
                Nimeelewa (Got It)
              </button>
              <button
                onClick={() => setShowIOSModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-3 px-4 rounded-xl transition-all"
              >
                Funga
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

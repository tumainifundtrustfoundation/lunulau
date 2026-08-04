import React, { useState, useEffect } from 'react';
import { 
  Download, 
  X, 
  Smartphone, 
  CheckCircle, 
  Share, 
  PlusSquare, 
  Sparkles, 
  Monitor, 
  Globe, 
  ShieldCheck, 
  Zap, 
  WifiOff, 
  ChevronRight,
  Info
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const openPWAInstallModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pwa-install-modal'));
  }
};

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showUniversalModal, setShowUniversalModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'desktop' | 'benefits'>('android');
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [installedSuccess, setInstalledSuccess] = useState<boolean>(false);
  const [browserType, setBrowserType] = useState<string>('browser');

  useEffect(() => {
    // 1. Detect browser environment
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/.test(ua);
    const isMac = /Macintosh/.test(ua);
    const isWindows = /Windows/.test(ua);

    if (isIOS) {
      setBrowserType('ios');
      setActiveTab('ios');
    } else if (isAndroid) {
      setBrowserType('android');
      setActiveTab('android');
    } else if (isMac || isWindows) {
      setBrowserType('desktop');
      setActiveTab('desktop');
    }

    // 2. Check standalone mode
    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // 3. Listen for native browser install event (Chromium)
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
      setShowUniversalModal(false);
      setInstalledSuccess(true);
      setTimeout(() => setInstalledSuccess(false), 6000);
    };

    // 4. Global custom event listener
    const handleOpenModalEvent = () => {
      setShowUniversalModal(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('open-pwa-install-modal', handleOpenModalEvent);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('open-pwa-install-modal', handleOpenModalEvent);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setInstalledSuccess(true);
        }
        setDeferredPrompt(null);
        setShowBanner(false);
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    } else {
      setShowUniversalModal(true);
    }
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('lupanulla_pwa_dismissed', 'true');
  };

  return (
    <>
      {/* ── 1. Floating Bottom Banner (Auto-triggers on installable browsers) ── */}
      {showBanner && !isStandalone && (
        <div className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-cyan-500/30 backdrop-blur-xl animate-fade-in transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-2 flex items-center justify-center shrink-0 shadow-lg border border-cyan-400/40">
                <img src="/icon-192x192.png" alt="Lupanulla Icon" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 flex items-center gap-1">
                  <Sparkles size={11} className="text-amber-400" /> SAKINISHA APP RASMI
                </span>
                <h4 className="font-extrabold text-sm sm:text-base leading-tight">Lupanulla Elimu Hub</h4>
                <p className="text-xs text-slate-300 mt-0.5">Soma notisi na mitihani offline kwenye browser yoyote!</p>
              </div>
            </div>
            <button
              onClick={handleDismissBanner}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
              title="Funga"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm py-2.5 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download size={16} />
              <span>Sakinisha App Sasa (Install)</span>
            </button>
            <button
              onClick={() => {
                setShowBanner(false);
                setShowUniversalModal(true);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs py-2.5 px-3 rounded-2xl border border-slate-700 transition-all cursor-pointer"
            >
              Maelekezo
            </button>
          </div>
        </div>
      )}

      {/* ── 2. Success Alert Toast ── */}
      {installedSuccess && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-5 py-4 rounded-3xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-bounce max-w-sm">
          <CheckCircle className="w-7 h-7 shrink-0 text-emerald-200" />
          <div>
            <p className="font-extrabold text-sm">Hongera! WebApp Imesakinishwa!</p>
            <p className="text-xs opacity-90 mt-0.5">Icon ya Lupanulla Elimu Hub sasa ipo kwenye skrini kuu ya simu/kompyuta yako.</p>
          </div>
        </div>
      )}

      {/* ── 3. Universal WebApp Installation Guide Modal (Supports All Browsers) ── */}
      {showUniversalModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-slate-700/80 overflow-hidden relative flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-2 flex items-center justify-center shrink-0 shadow-lg">
                  <img src="/icon-192x192.png" alt="Lupanulla App Icon" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                      PWA Progressive Web App
                    </span>
                    {isStandalone && (
                      <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        ✓ Imesakinishwa
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-lg sm:text-xl text-white mt-0.5">
                    Sakinisha Lupanulla Elimu Hub 🇹🇿
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowUniversalModal(false)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick 1-Click Native Install Banner inside modal (if browser supports) */}
            {deferredPrompt && (
              <div className="p-4 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5 text-xs text-cyan-200">
                  <Zap size={18} className="text-amber-400 shrink-0 animate-pulse" />
                  <span>Kivinjari chako kinasaidia usakinishaji wa <strong>kugusa mara moja!</strong></span>
                </div>
                <button
                  onClick={handleInstallClick}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Download size={15} />
                  <span>Sakinisha Hapa Moja kwa Moja</span>
                </button>
              </div>
            )}

            {/* Navigation Tabs for Browsers */}
            <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto shrink-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('android')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'android'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Smartphone size={15} />
                <span>Android (Chrome/Samsung)</span>
              </button>

              <button
                onClick={() => setActiveTab('ios')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'ios'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Share size={15} />
                <span>iPhone / iPad (iOS Safari)</span>
              </button>

              <button
                onClick={() => setActiveTab('desktop')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'desktop'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Monitor size={15} />
                <span>Kompyuta / Laptop</span>
              </button>

              <button
                onClick={() => setActiveTab('benefits')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Sparkles size={15} />
                <span>Faida za App</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              
              {/* TAB 1: Android */}
              {activeTab === 'android' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-2xl border border-slate-700/60">
                    <p className="text-xs text-slate-300">
                      Unatumia Android? Lupanulla inafanya kazi kikamilifu kwenye <strong>Google Chrome, Samsung Internet, Brave, Edge na Opera</strong>.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white text-sm">Fungua Menu ya Kivinjari (3 Dots ⋮)</p>
                        <p className="text-slate-300 mt-1">
                          Bonyeza nukta tatu (<strong>⋮</strong>) zilizopo juu au chini kulia mwa kivinjari chako cha Chrome/Samsung.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white text-sm">Gusa "Install App" au "Add to Home Screen"</p>
                        <p className="text-slate-300 mt-1">
                          Chagua kile kinachosomeka <strong>"Install app"</strong> au <strong>"Add to Home screen"</strong> (Weka kwenye skrini kuu).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white text-sm">Thibitisha "Install"</p>
                        <p className="text-slate-300 mt-1">
                          Gusa <strong>Install</strong>. Icon ya Lupanulla itaongezwa papo hapo kwenye App Drawer ya simu yako!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: iOS Safari */}
              {activeTab === 'ios' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/60 text-xs text-slate-300">
                    Kwenye iPhone au iPad (Safari), fuata hatua hizi fupi za Apple:
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white text-sm flex items-center gap-1.5">
                          Bonyeza Kitufe cha Share <Share size={15} className="text-cyan-400" />
                        </p>
                        <p className="text-slate-300 mt-1">
                          Chini ya skrini ya Safari (au juu kwenye iPad), gusa icon ya kushirikisha (Share button).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white text-sm flex items-center gap-1.5">
                          Chagua "Add to Home Screen" <PlusSquare size={15} className="text-emerald-400" />
                        </p>
                        <p className="text-slate-300 mt-1">
                          Sogeza orodha ya chaguo chini kisha uguse <strong>Add to Home Screen</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white text-sm">Gusa "Add" Juu Kulia</p>
                        <p className="text-slate-300 mt-1">
                          Thibitisha kwa kugusa <strong>Add</strong>. Icon ya Lupanulla itatokea kwenye skrini ya iPhone yako.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Desktop */}
              {activeTab === 'desktop' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/60 text-xs text-slate-300">
                    Unatumia Laptop au Kompyuta (Windows / Mac / Chromebook / Linux)?
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white text-sm flex items-center gap-1.5">
                          Tazama Mwisho wa Address Bar (Juu)
                        </p>
                        <p className="text-slate-300 mt-1">
                          Kwenye Chrome au Edge, utaona icon ndogo ya kompyuta au alama ya <strong>Install Lupanulla</strong> kulia kwa URL bar (https://...).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white text-sm">
                          Au Tumia Menu ya Chrome (3 Dots ⋮)
                        </p>
                        <p className="text-slate-300 mt-1">
                          Bonyeza nukta 3 juu kulia &gt; <strong>Save and Share</strong> &gt; <strong>Install Lupanulla Elimu Hub</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Benefits */}
              {activeTab === 'benefits' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fade-in">
                  <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm">
                      <WifiOff size={18} />
                      <span>Inafanya Kazi Offline</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Soma notisi, vitabu na past papers za NECTA bila haja ya bando la mtandao baada ya kuzifungua mara moja.
                    </p>
                  </div>

                  <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                      <Zap size={18} />
                      <span>Kasi ya Ajabu (&lt;2MB Size)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Hailemei simu wala kula memory (RAM). Inafunguka papo hapo bila kuchelewa.
                    </p>
                  </div>

                  <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                      <ShieldCheck size={18} />
                      <span>Salama na Imara</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Imethibitishwa na Google PWA Standard, haina virusi wala matangazo haramu.
                    </p>
                  </div>

                  <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-sm">
                      <Globe size={18} />
                      <span>Inasaidia Masomo Yote</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      O-Level, A-Level, Walimu Hub, AI Assistant (Fisi Maji) na Vyeti vyako mahali pamoja.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Info size={14} className="text-cyan-400 shrink-0" />
                <span className="hidden sm:inline">Unaweza pia kuisoma moja kwa moja hapa kwenye browser.</span>
              </div>

              <button
                onClick={() => setShowUniversalModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
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

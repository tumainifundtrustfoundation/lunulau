import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Tv, 
  Sparkles, 
  ShoppingCart, 
  CheckCircle2, 
  Tag, 
  Maximize2,
  Film,
  Zap,
  ArrowRight,
  Plus,
  Upload,
  Trash2,
  X,
  Video,
  HelpCircle
} from 'lucide-react';
import { Product, DukaVideoAdItem, UserVideoProgress } from '../types';
import { fetchDukaVideoAds, saveDukaVideoAd, deleteDukaVideoAd, saveVideoProgress, fetchVideoProgress } from '../firebase';

interface DukaVideoAdProps {
  onAddToCart?: (product: Product) => void;
  products?: Product[];
  userProfile?: any;
}

const DEFAULT_VIDEO_ADS: DukaVideoAdItem[] = [
  {
    id: 'ad-necta-books',
    titleSw: 'Miongozo na Vitabu Rasmi vya NECTA 2026',
    titleEn: 'Official NECTA Guides & Textbooks 2026',
    badge: 'TANGAZO TEULE 🌟',
    descriptionSw: 'Tazama onyesho la vitabu teule vya TIE na miongozo iliyosaidia wanafunzi zaidi ya 10,000 kupata Divisheni ya Kwanza NECTA.',
    descriptionEn: 'Watch showcase of approved TIE textbooks and revision guides that helped over 10,000 students pass NECTA.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
    featuredProductId: 'prod-mstahiki',
    promoCode: 'NECTA2026',
    discountText: 'Punguzo la 15%'
  },
  {
    id: 'ad-calculator-science',
    titleSw: 'Kikokotozi cha Sayansi (Scientific Calculator)',
    titleEn: 'Approved Scientific Calculators',
    badge: 'VIFAA YA MTIHANI ⚡',
    descriptionSw: 'Kikokotozi halisi kilichoidhinishwa kwa mitihani ya NECTA Form 4 & Form 6 Math & Physics. Kasi kubwa na betri inayodumu.',
    descriptionEn: 'Official NECTA-approved scientific calculator for Form 4 & Form 6 Math & Physics exams.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=1800&auto=format&fit=crop',
    featuredProductId: 'prod-calc',
    promoCode: 'CALC10',
    discountText: 'Bure Usafirishaji'
  },
  {
    id: 'ad-delivery-mikoani',
    titleSw: 'Huduma ya Kutuma Hardcopies Mikoa Yote Tanzania',
    titleEn: 'Nationwide Express Hardcopy Delivery',
    badge: 'USAFIRISHAJI HARAKA 🚚',
    descriptionSw: 'Unapata vitabu na hardcopies za mitihani hadi mkoani kwako ndani ya masaa 24-48 kupitia mabasi au Parcel Express.',
    descriptionEn: 'Get physical books and printed past papers delivered anywhere in Tanzania within 24-48 hours.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1770&auto=format&fit=crop',
    featuredProductId: 'prod-chem-manual',
    promoCode: 'FREESHIP',
    discountText: 'Punguzo la Tsh 2,000'
  }
];

export default function DukaVideoAd({ onAddToCart, products = [], userProfile }: DukaVideoAdProps) {
  const [videoAdsList, setVideoAdsList] = useState<DukaVideoAdItem[]>(DEFAULT_VIDEO_ADS);
  const [activeAdIndex, setActiveAdIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(() => {
    return localStorage.getItem('duka_video_autoplay') === 'true';
  });
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Video progress & resume states
  const [savedProgress, setSavedProgress] = useState<UserVideoProgress | null>(null);
  const [showResumeBanner, setShowResumeBanner] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const lastSavedTimeRef = useRef<number>(0);

  // Form states for adding custom video ad
  const [newTitleSw, setNewTitleSw] = useState<string>('');
  const [newDescriptionSw, setNewDescriptionSw] = useState<string>('');
  const [newBadge, setNewBadge] = useState<string>('TANGAZO LANGU 🌟');
  const [newVideoUrl, setNewVideoUrl] = useState<string>('');
  const [newPosterUrl, setNewPosterUrl] = useState<string>('');
  const [newPromoCode, setNewPromoCode] = useState<string>('');
  const [newDiscountText, setNewDiscountText] = useState<string>('Ofa Maalum');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const posterInputRef = useRef<HTMLInputElement | null>(null);

  // Format seconds into MM:SS
  const formatSeconds = (sec: number) => {
    if (!sec || isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Load video ads from Firestore & localStorage on mount
  useEffect(() => {
    const loadAds = async () => {
      try {
        const customAds = await fetchDukaVideoAds();
        if (customAds && customAds.length > 0) {
          // Put custom ads first, then defaults
          const combined = [...customAds, ...DEFAULT_VIDEO_ADS.filter(d => !customAds.some(c => c.id === d.id))];
          setVideoAdsList(combined);
        }
      } catch (err) {
        console.error('Error loading Duka video ads:', err);
      }
    };
    loadAds();
  }, []);

  const currentAd = videoAdsList[activeAdIndex] || videoAdsList[0] || DEFAULT_VIDEO_ADS[0];

  // Fetch saved video progress when current video or user profile changes
  useEffect(() => {
    if (!currentAd?.id) return;
    const loadProgress = async () => {
      try {
        const prog = await fetchVideoProgress(userProfile?.uid || '', currentAd.id);
        if (prog && prog.currentTime > 3 && prog.duration > 0 && prog.currentTime < prog.duration - 5) {
          setSavedProgress(prog);
          setShowResumeBanner(true);
        } else {
          setSavedProgress(null);
          setShowResumeBanner(false);
        }
      } catch (err) {
        console.error('Error fetching video progress:', err);
      }
    };
    loadProgress();
  }, [currentAd?.id, userProfile?.uid]);

  // Handler to resume video playback from saved position
  const handleResumeVideo = () => {
    if (videoRef.current && savedProgress && savedProgress.currentTime > 0) {
      videoRef.current.currentTime = savedProgress.currentTime;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      setShowResumeBanner(false);
    }
  };

  // Track playback timeupdate and persist to Firestore
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 0;
    setCurrentVideoTime(time);
    if (duration) setVideoDuration(duration);

    // Save to Firestore & local storage every ~3 seconds
    if (time > 3 && Math.abs(time - lastSavedTimeRef.current) > 2.5) {
      lastSavedTimeRef.current = time;
      saveVideoProgress(
        userProfile?.uid || '',
        currentAd.id,
        Math.floor(time),
        Math.floor(duration),
        currentAd.titleSw
      );
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (currentAd?.id) {
      saveVideoProgress(userProfile?.uid || '', currentAd.id, 0, Math.floor(videoDuration), currentAd.titleSw);
      setShowResumeBanner(false);
    }
  };

  const toggleAutoplay = () => {
    setAutoPlayEnabled(prev => {
      const next = !prev;
      localStorage.setItem('duka_video_autoplay', String(next));
      if (next && videoRef.current) {
        setIsMuted(true);
        videoRef.current.muted = true;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
      return next;
    });
  };

  // Match featured product if available from backend products
  const featuredProduct = products.find(p => p.id === currentAd.featuredProductId) || {
    id: currentAd.featuredProductId || 'prod-featured',
    name: currentAd.titleSw,
    description: currentAd.descriptionSw,
    price: 15000,
    category: 'Vifaa vya Shule',
    stockQuantity: 25,
    imageUrl: currentAd.posterUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop'
  };

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSelectAd = (index: number) => {
    setActiveAdIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (autoPlayEnabled) {
        setIsMuted(true);
        videoRef.current.muted = true;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(featuredProduct as Product);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    }
  };

  // Handle Video File Upload
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert('File ya video ni kubwa sana. Tafadhali chagua video iliyo chini ya 50MB au weka kiunganishi cha video.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewVideoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Poster File Upload
  const handlePosterFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPosterUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit new Video Ad
  const handleSaveVideoAd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleSw.trim() || !newVideoUrl.trim()) {
      alert('Tafadhali jaza Jina la Video na uweke au u-upload Video!');
      return;
    }

    setIsSaving(true);
    try {
      const adItem: Omit<DukaVideoAdItem, 'id'> = {
        titleSw: newTitleSw,
        titleEn: newTitleSw,
        badge: newBadge || 'TANGAZO LANGU 🌟',
        descriptionSw: newDescriptionSw || 'Tazama bidhaa zetu mpya na ofa za Lupanulla Duka.',
        descriptionEn: newDescriptionSw || 'Check out our new products and offers.',
        videoUrl: newVideoUrl,
        posterUrl: newPosterUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
        featuredProductId: selectedProductId || undefined,
        promoCode: newPromoCode ? newPromoCode.toUpperCase() : undefined,
        discountText: newDiscountText || 'Ofa Maalum',
        createdAt: Date.now()
      };

      const adId = await saveDukaVideoAd(adItem);
      const createdAd: DukaVideoAdItem = { id: adId, ...adItem };

      const updatedList = [createdAd, ...videoAdsList];
      setVideoAdsList(updatedList);
      setActiveAdIndex(0); // Switch to the newly created video

      // Reset form
      setNewTitleSw('');
      setNewDescriptionSw('');
      setNewBadge('TANGAZO LANGU 🌟');
      setNewVideoUrl('');
      setNewPosterUrl('');
      setNewPromoCode('');
      setNewDiscountText('Ofa Maalum');
      setSelectedProductId('');
      setShowAddModal(false);

    } catch (err) {
      console.error('Failed to save video ad:', err);
      alert('Imefeli kuhifadhi video. Tafadhali jaribu tena.');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Video Ad
  const handleDeleteAd = async (adId: string) => {
    if (!confirm('Je, una uhakika unataka kufuta video hii ya tangazo?')) return;
    try {
      await deleteDukaVideoAd(adId);
      const filtered = videoAdsList.filter(a => a.id !== adId);
      setVideoAdsList(filtered.length > 0 ? filtered : DEFAULT_VIDEO_ADS);
      setActiveAdIndex(0);
    } catch (err) {
      console.error('Failed to delete ad:', err);
    }
  };

  const isCustomAd = !DEFAULT_VIDEO_ADS.some(d => d.id === currentAd.id);

  return (
    <section id="duka-video-ad-section" className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/20 sm:border-slate-200 relative overflow-hidden transition-all my-6">
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-cyan-500/20 shrink-0">
            <Tv size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider flex items-center gap-1">
              <Sparkles size={11} className="text-amber-400" />
              TANGAZO LA VIDEO NA ONYESHO LA BIDHAA (PROMO VIDEO)
            </span>
            <h2 className="font-display font-black text-base sm:text-xl text-white">
              {currentAd.titleSw}
            </h2>
          </div>
        </div>

        {/* Upload / Add Video Button */}
        <div className="flex items-center gap-2">
          {currentAd.promoCode && (
            <div className="hidden lg:inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300 text-xs font-black">
              <Tag size={14} className="text-amber-400" />
              <span>Kodi: <strong className="text-white tracking-wider">{currentAd.promoCode}</strong> ({currentAd.discountText})</span>
            </div>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus size={16} />
            <span>Ongeza Video Yako (Add Video)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Video Player + Promo Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
        
        {/* Video Player Box (7 cols on lg) */}
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-black border border-slate-200/30 sm:border-slate-200 shadow-2xl group">
          
          {/* Resume Watching Floating Banner */}
          {showResumeBanner && savedProgress && (
            <div className="absolute top-3 left-3 right-3 z-30 bg-slate-950/95 border border-cyan-500/50 p-3 rounded-2xl shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-2 animate-fade-in">
              <div className="flex items-center gap-2 text-xs text-white">
                <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-black shrink-0">
                  <Film size={14} />
                </span>
                <div>
                  <div className="font-extrabold text-cyan-300 text-[11px] uppercase tracking-wider">
                    Ulikuwa unatazama video hii!
                  </div>
                  <div className="text-[11px] text-slate-200">
                    Uliishia dakika <strong className="text-amber-300">{formatSeconds(savedProgress.currentTime)}</strong> / {formatSeconds(savedProgress.duration)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResumeVideo}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[11px] px-3 py-1.5 rounded-xl transition-all shadow-md flex items-center gap-1"
                >
                  <Play size={12} className="fill-slate-950" />
                  <span>Endelea (Resume)</span>
                </button>
                <button
                  onClick={() => setShowResumeBanner(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
                  title="Funga"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            src={currentAd.videoUrl}
            poster={currentAd.posterUrl}
            muted={isMuted}
            autoPlay={autoPlayEnabled}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration || 0)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full aspect-video object-cover cursor-pointer"
            onClick={handlePlayToggle}
          />

          {/* Big Center Play Overlay Button when paused */}
          {!isPlaying && (
            <div 
              onClick={handlePlayToggle}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer group-hover:bg-slate-950/30 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/50 transform group-hover:scale-110 transition-transform">
                <Play size={30} className="ml-1 fill-slate-950" />
              </div>
              <span className="mt-3 text-xs font-black uppercase tracking-wider text-white bg-slate-900/80 px-3 py-1 rounded-full border border-white/20">
                Tazama Video ya Tangazo 🎬
              </span>
            </div>
          )}

          {/* Subtitles Overlay */}
          {subtitlesEnabled && currentAd.descriptionSw && (
            <div className="absolute bottom-12 inset-x-3 text-center pointer-events-none z-10 animate-fade-in">
              <span className="bg-slate-950/90 text-amber-300 font-bold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-xl border border-amber-500/30 shadow-xl backdrop-blur-md inline-block max-w-[90%] tracking-wide leading-snug">
                💬 {currentAd.descriptionSw}
              </span>
            </div>
          )}

          {/* Video Control Bar at bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePlayToggle}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5 fill-white" />}
              </button>

              <button
                onClick={handleMuteToggle}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Subtitles (CC) Toggle Button */}
              <button
                onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                className={`px-2 py-1 rounded-lg text-[10px] font-black border backdrop-blur-md transition-all flex items-center gap-1 ${
                  subtitlesEnabled
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                    : 'bg-white/20 hover:bg-white/30 text-slate-300 border-white/20'
                }`}
                title={subtitlesEnabled ? 'Zima Manukuu (Disable Captions)' : 'Washa Manukuu (Enable Captions)'}
              >
                <span>CC</span>
                <span className="hidden sm:inline">{subtitlesEnabled ? 'ON' : 'OFF'}</span>
              </button>

              {/* Autoplay Toggle Button */}
              <button
                onClick={toggleAutoplay}
                className={`px-2 py-1 rounded-lg text-[10px] font-black border backdrop-blur-md transition-all flex items-center gap-1 ${
                  autoPlayEnabled
                    ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-sm'
                    : 'bg-white/20 hover:bg-white/30 text-slate-300 border-white/20'
                }`}
                title={autoPlayEnabled ? 'Zima Autoplay (Disable Autoplay)' : 'Washa Autoplay (Enable Autoplay)'}
              >
                <Zap size={11} className={autoPlayEnabled ? 'fill-slate-950' : ''} />
                <span>Auto</span>
                <span className="hidden sm:inline">{autoPlayEnabled ? 'ON' : 'OFF'}</span>
              </button>

              {/* Video Playback Progress Time Indicator */}
              <div className="bg-slate-950/80 text-cyan-300 font-mono text-[10px] font-bold px-2 py-1 rounded-lg border border-cyan-500/30 flex items-center gap-1">
                <span>{formatSeconds(currentVideoTime)}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">{formatSeconds(videoDuration)}</span>
              </div>

              <span className="text-[10px] font-bold text-slate-300 hidden sm:inline">
                {currentAd.badge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isCustomAd && (
                <button
                  onClick={() => handleDeleteAd(currentAd.id)}
                  className="bg-red-500/20 hover:bg-red-500/40 text-red-300 px-2 py-1 rounded text-[10px] font-bold border border-red-500/40 flex items-center gap-1 transition-all"
                  title="Futa video hii ya tangazo"
                >
                  <Trash2 size={12} />
                  <span>Futa</span>
                </button>
              )}
              <span className="text-[10px] text-cyan-300 font-mono font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                HD PROMO 1080P
              </span>
            </div>
          </div>
        </div>

        {/* Promo Showcase Info & Add to Cart Action (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                {currentAd.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Duka la Lupanulla
              </span>
            </div>

            <h3 className="font-display font-extrabold text-base text-white leading-snug">
              {currentAd.titleSw}
            </h3>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {currentAd.descriptionSw}
            </p>

            {/* Featured Product Box */}
            <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img 
                  src={featuredProduct.imageUrl} 
                  alt={featuredProduct.name}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0" 
                />
                <div>
                  <h4 className="font-bold text-xs text-white line-clamp-1">{featuredProduct.name}</h4>
                  <span className="text-sm font-black text-emerald-400">
                    Tsh {featuredProduct.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCartClick}
                className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-md ${
                  addedSuccess
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Imeongezwa!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={14} />
                    <span>Weka Kikapuni</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Video Ads Carousel Selector Tabs */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                Chagua Video ya Tangazo ({videoAdsList.length}):
              </span>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-[10px] font-bold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Weka Video Mpya
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-0.5">
              {videoAdsList.map((ad, idx) => (
                <button
                  key={ad.id}
                  onClick={() => handleSelectAd(idx)}
                  className={`p-2 rounded-xl text-left transition-all border text-[10px] font-bold truncate flex flex-col justify-between relative ${
                    activeAdIndex === idx
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="truncate font-black">{ad.titleSw}</span>
                  <span className="text-[8px] opacity-75">{ad.discountText || ad.badge}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Add / Upload Custom Video Ad Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-700 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
                  <Video size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                    LUPANULLA DUKA MEDIA
                  </span>
                  <h3 className="font-extrabold text-base text-white">
                    Ongeza Video ya Tangazo (Add Promo Video)
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveVideoAd} className="mt-4 space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Kichwa cha Video (Title / Jina la Tangazo) *
                </label>
                <input
                  type="text"
                  required
                  value={newTitleSw}
                  onChange={e => setNewTitleSw(e.target.value)}
                  placeholder="mf. Onyesho la Vitabu vya Sayansi na Vitendeakazi 2026"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Maelezo Fupi (Description)
                </label>
                <textarea
                  rows={2}
                  value={newDescriptionSw}
                  onChange={e => setNewDescriptionSw(e.target.value)}
                  placeholder="Maelezo yanayoonekana kama manukuu au chini ya video..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Video Source Option */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-cyan-300">
                  Uwanja wa Video (Video File or Link) *
                </label>
                
                {/* File Upload Button */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="video/*"
                    onChange={handleVideoFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-dashed border-slate-600 rounded-xl p-3 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Upload size={16} className="text-cyan-400" />
                    <span>Pakia File ya Video kutoka Kwenye Simu / Kompyuta (Upload MP4/WebM)</span>
                  </button>
                </div>

                <div className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  — AU —
                </div>

                {/* Direct Link Input */}
                <div>
                  <input
                    type="url"
                    value={newVideoUrl}
                    onChange={e => setNewVideoUrl(e.target.value)}
                    placeholder="Weka kiunganishi cha MP4 (Direct MP4 URL / Video Link)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {newVideoUrl && (
                  <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Video imeteuliwa vyema!</span>
                  </div>
                )}
              </div>

              {/* Video Upload Tips Guide Box inside Modal */}
              <div className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
                  <HelpCircle size={14} className="text-amber-400 shrink-0" />
                  <span>Dondoo za Kuweka Link za Google Drive au YouTube (Tips):</span>
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong className="text-cyan-300">Google Drive:</strong> Weka video kwenye Drive &rarr; Share &rarr; Set Access to <em>"Anyone with the link"</em> &rarr; Copy Link kisha weka hapa au mtumie Admin.
                  </li>
                  <li>
                    <strong className="text-red-400">YouTube:</strong> Weka video kama <em>"Unlisted"</em> au <em>"Public"</em> &rarr; Copy Share Link &rarr; Pasting kwenye uwanja wa Link hapo juu.
                  </li>
                </ul>
              </div>

              {/* Poster Image */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Picha ya Jalada la Video (Poster Thumbnail Image URL / Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPosterUrl}
                    onChange={e => setNewPosterUrl(e.target.value)}
                    placeholder="Link ya Picha au tumia button ya kulia..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="file"
                    ref={posterInputRef}
                    accept="image/*"
                    onChange={handlePosterFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => posterInputRef.current?.click()}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-3 rounded-xl border border-slate-700"
                  >
                    Upload Picha
                  </button>
                </div>
              </div>

              {/* Additional Fields: Badge & Promo Code */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Lebo/Badge (Tag)
                  </label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={e => setNewBadge(e.target.value)}
                    placeholder="mf. TANGAZO TEULE 🌟"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Kodi ya Punguzo (Promo Code)
                  </label>
                  <input
                    type="text"
                    value={newPromoCode}
                    onChange={e => setNewPromoCode(e.target.value)}
                    placeholder="mf. DISKAU15"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono"
                  />
                </div>
              </div>

              {/* Link Featured Product */}
              {products && products.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Unganisha na Bidhaa ya Duka (Featured Product)
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={e => setSelectedProductId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="">-- Chagua Bidhaa --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} - Tsh {p.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Ghairi (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  {isSaving ? (
                    <span>Inahifadhi...</span>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Hifadhi Video (Publish Video Ad)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
}


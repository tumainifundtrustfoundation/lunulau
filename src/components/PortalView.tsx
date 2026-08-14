import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Calendar, 
  TrendingUp, 
  Plus, 
  ArrowUp,
  Award,
  ChevronDown,
  ChevronUp,
  Mail,
  HelpCircle,
  Play,
  Heart,
  TrendingDown,
  Minus,
  CheckCircle,
  Cpu,
  BookOpen,
  FileText,
  User,
  Activity,
  Bot,
  MessageCircle,
  Phone,
  X,
  Sparkles,
  Briefcase,
  Calculator,
  Store,
  CheckCircle2,
  Book,
  Compass,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchAnnouncements, fetchVideos } from '../firebase';
import { Announcement, Video } from '../types';
import QuoteWidget from './QuoteWidget';
import AdSenseWidget from './AdSenseWidget';
import VisionMission from './VisionMission';

interface PortalViewProps {
  onNavigate: (view: string, id?: string) => void;
  userProfile: any;
}

export default function PortalView({ onNavigate, userProfile }: PortalViewProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [activeRankTab, setActiveRankTab] = useState<'shule' | 'mikoa' | 'acsee'>('shule');
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({ 0: true });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const anns = await fetchAnnouncements();
      setAnnouncements(anns.slice(0, 3));
      const vids = await fetchVideos();
      setVideos(vids.slice(0, 4));
    } catch (e) {
      console.error(e);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterStatus('Umesajiliwa kikamilifu! Asante kwa kujiunga.');
      setNewsletterEmail('');
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <motion.div 
      id="portal-view" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-12 font-sans text-slate-900 bg-slate-50 relative pb-16"
    >
      
      {/* ── Matukio Ticker (Continuous Horizontal Marquee) ── */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-purple-500/10 border border-slate-200/60 rounded-2xl p-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center overflow-hidden">
          <div className="flex-shrink-0 mr-4 pr-4 border-r border-slate-300 font-display font-extrabold text-red-600 flex items-center gap-2 whitespace-nowrap text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            MATUKIO MUHIMU
          </div>
          <div 
            className="flex-grow overflow-hidden relative"
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
          >
            <div className={`flex gap-8 whitespace-nowrap text-xs font-semibold text-slate-800 ${tickerPaused ? '' : 'animate-marquee'}`} style={{ animation: tickerPaused ? 'none' : 'marquee 25s linear infinite' }}>
              <span className="flex items-center gap-2 cursor-pointer hover:text-cyan-600" onClick={() => onNavigate('timetable')}><Calendar size={14} className="text-cyan-500" /> Ratiba ya NECTA 2025/2026 ya CSEE (Kidato cha 4) na FTNA (Kidato cha 2) ipo tayari!</span>
              <span className="flex items-center gap-2 cursor-pointer hover:text-cyan-600" onClick={() => onNavigate('fisimaji')}><Bot size={14} className="text-purple-500" /> Uliza Lupanulla AI maswali yote ya masomo kwa lugha ya Swahili na English</span>
              <span className="flex items-center gap-2 cursor-pointer hover:text-cyan-600" onClick={() => onNavigate('mitihani')}><Megaphone size={14} className="text-amber-500" /> Past Papers za NECTA na Mock za Mikoa zimesasishwa kwa mtaala wa TIE</span>
              <span className="flex items-center gap-2 cursor-pointer hover:text-cyan-600" onClick={() => onNavigate('necta-progress')}><Award size={14} className="text-emerald-500" /> Fuatilia alama zako na ukokotoe GPA/Division ya NECTA kwa usahihi</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── GRAND HERO WELCOME BANNER (Executive Captivating Visual) ── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-slate-800/80 p-6 sm:p-10 lg:p-12">
        {/* Glow & Ambient Particle Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl space-y-6">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Sparkles size={14} className="text-cyan-400 animate-spin" />
              LUPANULLA ELIMU HUB TANZANIA 🇹🇿
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <CheckCircle2 size={14} /> 100% Bure kwa Wanafunzi Na Walimu
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-bold">
              <Bot size={14} /> Swahili AI Tutor Integrated
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[1.1]">
            Kila Kitu Unachohitaji Ili <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Kufaulu Vizuri NECTA</span> Na Masomo Yako
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-normal">
            Karibu kwenye mfumo namba moja wa elimu kidijitali nchini Tanzania! Lupanulla Elimu Hub inakupa Notisi za Masomo (Form 1–6), Mitihani na Past Papers za NECTA, Ratiba ya NECTA, Lupanulla AI Tutor, Tracker ya GPA, Miongozo ya Form 5, na Duka la Elimu sehemu moja.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('masomo')}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:scale-[1.02]"
            >
              <BookOpen size={18} />
              <span>Anza Kusoma Notisi Bure</span>
            </button>

            <button
              onClick={() => onNavigate('timetable')}
              className="bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Calendar size={18} className="text-cyan-400" />
              <span>Ratiba ya NECTA 2025/2026</span>
            </button>

            <button
              onClick={() => onNavigate('fisimaji')}
              className="bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 border border-purple-500/40 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Bot size={18} className="text-purple-400" />
              <span>Ongea na AI Assistant</span>
            </button>
          </div>

          {/* Visual Platform Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              <span className="font-mono font-black text-xl sm:text-2xl text-cyan-400 block">10,000+</span>
              <span className="text-[11px] font-bold text-slate-400 block mt-0.5">Notisi &amp; Mada (TIE)</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              <span className="font-mono font-black text-xl sm:text-2xl text-emerald-400 block">1,500+</span>
              <span className="text-[11px] font-bold text-slate-400 block mt-0.5">Past Papers &amp; Mock</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              <span className="font-mono font-black text-xl sm:text-2xl text-amber-400 block">2025/26</span>
              <span className="text-[11px] font-bold text-slate-400 block mt-0.5">Ratiba Rasmi za NECTA</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              <span className="font-mono font-black text-xl sm:text-2xl text-purple-400 block">24/7 AI</span>
              <span className="text-[11px] font-bold text-slate-400 block mt-0.5">Msaidizi wa Swahili</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── OVERVIEW OF ALL PLATFORM FEATURES ("Kila Kitu Kilichopo Hapa") ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-600 uppercase tracking-widest">
              <Compass size={14} /> MWONGOZO WA TOVUTI
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-3xl text-slate-900 uppercase">
              Kila Kitu Kilichopo Kwenye Lupanulla Elimu Hub
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-xs font-semibold">
            Bonyeza kadi yoyote kuingia moja kwa moja kwenye sehemu unayotaka kujifunza.
          </p>
        </div>

        {/* Grid Showcase of Platform Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Masomo & Notisi */}
          <div
            onClick={() => onNavigate('masomo')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-cyan-50/40 border border-slate-200/80 hover:border-cyan-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                  <BookOpen size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                  Form 1 &ndash; Form 6
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-cyan-600 transition-colors">
                  1. Notisi za Masomo (Study Notes)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Pata notisi kamili za Physics, Chemistry, Biology, Mathematics, Geography, History, Kiswahili na Civics zilizoratibiwa kwa mtaala wa TIE.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-cyan-600">
              <span>Soma Notisi Bure</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 2: NECTA Past Papers */}
          <div
            onClick={() => onNavigate('mitihani')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/40 border border-slate-200/80 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <FileText size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                  CSEE / FTNA / ACSEE
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                  2. Mitihani ya Zamani (Past Papers)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Pakua mitihani ya NECTA, Pre-NECTA na Mock za Mikoa mbalimbali nchini Tanzania pamoja na Marking Schemes zake za usahihi.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-amber-600">
              <span>Tafuta Past Papers</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 3: Ratiba ya NECTA */}
          <div
            onClick={() => onNavigate('timetable')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <Calendar size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  2025/2026 Timetable
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-emerald-600 transition-colors">
                  3. Ratiba Rasmi ya NECTA
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Ratiba kamili ya mitihani ya Kidato cha Nne (CSEE) na Kidato cha Pili (FTNA) ikiwa na vipindi vya asubuhi, mchana, na vihesabio vya siku.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-emerald-600">
              <span>Fungua Ratiba Ya NECTA</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 4: Lupanulla AI Tutor */}
          <div
            onClick={() => onNavigate('fisimaji')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-purple-50/40 border border-slate-200/80 hover:border-purple-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  <Bot size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                  Smart AI Tutor
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-purple-600 transition-colors">
                  4. Lupanulla AI Assistant
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Msaidizi wa akili ya bandia anayejibu maswali yako yote ya masomo kwa Kiswahili au Kiingereza, na kutoa ufafanuzi wa mada ngumu.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-purple-600">
              <span>Ongea na AI Sasa</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 5: NECTA Tracker & GPA */}
          <div
            onClick={() => onNavigate('necta-progress')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-teal-50/40 border border-slate-200/80 hover:border-teal-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800">
                  GPA &amp; Division
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-teal-600 transition-colors">
                  5. NECTA Progress &amp; Calculator
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Weka alama zako na ukokotoe Division I, II, III au IV na GPA ya NECTA pamoja na kufuatilia maendeleo ya ufaulu wako kabla ya mtihani.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-teal-600">
              <span>Kokotoa Division Yako</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 6: Video Darasani */}
          <div
            onClick={() => onNavigate('videos')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50/40 border border-slate-200/80 hover:border-red-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                  <Play size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-red-100 text-red-800">
                  Lupa+ Video
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  6. Darasani (Video Tutorials)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Tazama video za mafunzo ya vitendo na majaribio ya maabara (Biology/Chemistry/Physics Practicals) kutoka kwa walimu mashuhuri.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-red-600">
              <span>Tazama Video Lessons</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 7: Kombination Form 5 */}
          <div
            onClick={() => onNavigate('combinations')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-sky-50/40 border border-slate-200/80 hover:border-sky-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
                  <Award size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                  A-Level Guide
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                  7. Mwongozo wa Kombi za Form 5
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Jifunze kuhusu tahasusi (PCM, PCB, PGM, CBG, HGL, HGK, EGM, HKL) na vigezo vyake vya uchaguzi kwa ushauri wa kitaaluma.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-sky-600">
              <span>Angalia Kombi Zote</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 8: Portal za Ajira na Mikopo */}
          <div
            onClick={() => onNavigate('ajira')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-rose-50/40 border border-slate-200/80 hover:border-rose-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                  <Briefcase size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                  HESLB &amp; Utumishi
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-rose-600 transition-colors">
                  8. Portal za Ajira &amp; Mikopo ya HESLB
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Miongozo ya kuomba mikopo ya elimu ya juu (HESLB), ajira za Utumishi, na Tamisemi kwa wahitimu na walimu.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-rose-600">
              <span>Soma Miongozo ya Mikopo</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 9: Duka la Elimu */}
          <div
            onClick={() => onNavigate('duka')}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200/80 hover:border-indigo-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                  <Store size={24} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
                  Vitabu &amp; WhatsApp
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  9. Duka la Elimu (Books)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Nunua vitabu vya miongozo, riwaya za NECTA, na PDF kwa mchakato rahisi wa WhatsApp checkout ya moja kwa moja.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-indigo-600">
              <span>Tembelea Duka</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Motivational Quote of the Day ── */}
      <QuoteWidget />

      {/* ── Google AdSense Responsive Ad Unit (Hero-top) ── */}
      <AdSenseWidget slotId="1000100101" className="my-4" />

      {/* ── Main Hero Section + Rankings Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Hero Story Banner */}
        <div 
          onClick={() => onNavigate('masomo')}
          className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 group cursor-pointer flex flex-col justify-end min-h-[480px] p-6 sm:p-10"
        >
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
            alt="Students Studying" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">Mtanange wa NECTA</span>
              <span className="text-slate-300 text-xs font-medium"><Calendar size={12} className="inline mr-1" /> Leo hii</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              Maandalizi ya Mitihani ya Taifa: Mbinu 5 za Kufaulu kwa Alama za Juu (A)
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-3">
              Wataalamu wa elimu na walimu wazoefu Tanzania wanashiriki siri za jinsi ya kupangilia muda wako, kutengeneza ratiba za wiki 6 kabla ya mtihani, na kujibu maswali ya mitihani ya NECTA kwa ufasaha mkubwa ili kuondokana na hofu ya kufeli.
            </p>
            <div className="pt-2">
              <button className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-full transition-all group shadow-lg shadow-cyan-500/20">
                Soma Miongozo <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* NECTA Rankings Standings Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-bold text-xl text-slate-900 uppercase">Viwango vya NECTA</h2>
              <button onClick={() => onNavigate('mikoa')} className="text-cyan-600 text-xs font-bold hover:underline">Ona Zote</button>
            </div>

            {/* Sub-tabs */}
            <div className="flex space-x-1 border-b border-slate-100 mb-5 pb-1">
              <button 
                onClick={() => setActiveRankTab('shule')}
                className={`flex-1 text-center pb-2 text-xs font-bold transition-all border-b-2 ${activeRankTab === 'shule' ? 'border-cyan-600 text-cyan-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Shule (CSEE)
              </button>
              <button 
                onClick={() => setActiveRankTab('mikoa')}
                className={`flex-1 text-center pb-2 text-xs font-bold transition-all border-b-2 ${activeRankTab === 'mikoa' ? 'border-cyan-600 text-cyan-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Mikoa (Avg)
              </button>
              <button 
                onClick={() => setActiveRankTab('acsee')}
                className={`flex-1 text-center pb-2 text-xs font-bold transition-all border-b-2 ${activeRankTab === 'acsee' ? 'border-cyan-600 text-cyan-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                ACSEE (Form VI)
              </button>
            </div>

            {/* Standings list */}
            <div className="space-y-3">
              {activeRankTab === 'shule' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">1</span>
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">KM</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">Kemebos Sec</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Kagera &bull; Gpa: 1.02</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><TrendingUp size={10} /> DIV I</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">2</span>
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">SF</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">St. Francis Girls</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Mbeya &bull; Gpa: 1.10</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><TrendingUp size={10} /> DIV I</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">3</span>
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">WS</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">Waja Springs</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Geita &bull; Gpa: 1.25</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><TrendingUp size={10} /> DIV I</span>
                  </div>
                </>
              )}

              {activeRankTab === 'mikoa' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">1</span>
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">DS</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">Dar es Salaam</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Wastani: 84.5%</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><TrendingUp size={10} /> Juu</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">2</span>
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">KL</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">Kilimanjaro</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Wastani: 82.1%</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><TrendingUp size={10} /> Juu</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">3</span>
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">MW</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">Mwanza</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Wastani: 79.4%</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><TrendingUp size={10} /> Juu</span>
                  </div>
                </>
              )}

              {activeRankTab === 'acsee' && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">1</span>
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">MZ</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">Mzumbe Sec</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Morogoro &bull; PCM/PCB</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">DIV I</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">2</span>
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">IL</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">Ilboru Sec</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Arusha &bull; PCM/PGM</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">DIV I</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-slate-500 w-5">3</span>
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">KK</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-none">Kilakala Girls</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">Morogoro &bull; HGL/HGK</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">DIV I</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            onClick={() => onNavigate('mikoa')} 
            className="w-full mt-6 py-2.5 text-xs text-center font-extrabold bg-slate-950 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md shadow-slate-950/15"
          >
            ANGALIA VIWANGO VYOTE
          </button>
        </div>

      </div>

      {/* ── Highlighted Features Grid (Sports style cards) ── */}
      <div className="space-y-6">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 uppercase border-b-4 border-cyan-600 inline-block pb-1">
          Habari &amp; Rasilimali Mpya
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Study Notes Card */}
          <div 
            onClick={() => onNavigate('masomo')}
            className="group cursor-pointer bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col h-full"
          >
            <div className="h-44 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" alt="Books" />
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">NOTES</span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider block mb-1">Mtaala Mpya &bull; O-Level</span>
                <h3 className="font-bold text-slate-950 text-base leading-snug group-hover:text-cyan-600 transition-colors">Notisi Zote za Physics Kidato cha 3 Zimepakiwa</h3>
                <p className="text-slate-500 text-xs mt-2 line-clamp-3">Notisi zilizochambuliwa kwa lugha rahisi sambamba na maswali na majibu kusaidia kufanya marudio rahisi.</p>
              </div>
              <span className="text-cyan-600 font-bold text-xs inline-flex items-center gap-1 pt-4">Soma Bure &rarr;</span>
            </div>
          </div>

          {/* Past Papers Card */}
          <div 
            onClick={() => onNavigate('mitihani')}
            className="group cursor-pointer bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col h-full"
          >
            <div className="h-44 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" alt="Exams" />
              <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">MITIHANI</span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider block mb-1">CSEE &bull; FTNA &bull; Mock</span>
                <h3 className="font-bold text-slate-950 text-base leading-snug group-hover:text-cyan-600 transition-colors">Mitihani ya Mock ya Mikoa 2024 Ipo Tayari</h3>
                <p className="text-slate-500 text-xs mt-2 line-clamp-3">Jipime uwezo wako kwa kujibu past papers za Mock kutoka mikoa ya Arusha, Mwanza, Kilmanjaro na Dar.</p>
              </div>
              <span className="text-cyan-600 font-bold text-xs inline-flex items-center gap-1 pt-4">Anza Mazoezi &rarr;</span>
            </div>
          </div>

          {/* Lupanulla AI Card */}
          <div 
            onClick={() => onNavigate('fisimaji')}
            className="group cursor-pointer bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col h-full"
          >
            <div className="h-44 bg-gradient-to-br from-indigo-600 via-indigo-900 to-purple-950 flex items-center justify-center relative overflow-hidden">
              <Cpu size={56} className="text-indigo-400/40 animate-pulse" />
              <Bot size={48} className="absolute text-cyan-300 stroke-[1.5]" />
              <span className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">AI ASSISTANT</span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider block mb-1">Lupanulla AI &bull; Smart Tutor</span>
                <h3 className="font-bold text-slate-950 text-base leading-snug group-hover:text-cyan-600 transition-colors">Uliza Swali Lolote la Masomo kwa Lugha ya Swahili</h3>
                <p className="text-slate-500 text-xs mt-2 line-clamp-3">Msaidizi wa akili ya bandia aliyebobea kwenye mtaala wa TIE, NECTA, TCU na HESLB atakusaidia kuelewa kila kitu.</p>
              </div>
              <span className="text-cyan-600 font-bold text-xs inline-flex items-center gap-1 pt-4">Ongea na AI &rarr;</span>
            </div>
          </div>

          {/* Static Bulletin Board for Announcements */}
          <div className="bg-slate-100 rounded-2xl border border-slate-200/60 p-5 flex flex-col justify-between h-full shadow-inner">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2 mb-3">
                <Megaphone size={16} className="text-red-500 animate-bounce" />
                Matangazo Yetu
              </h3>
              <div className="space-y-3.5 divide-y divide-slate-200">
                <div className="pt-0">
                  <span className="text-[9px] text-red-500 font-bold block uppercase tracking-wide">Mpya Dukani</span>
                  <span className="text-xs font-bold text-slate-800 leading-tight block hover:text-cyan-600 cursor-pointer" onClick={() => onNavigate('duka')}>Kitabu: "You Can't Beat God Givin'" - R.W. Schambach sasa kipo Lupanulla.</span>
                </div>
                <div className="pt-3">
                  <span className="text-[9px] text-slate-400 font-bold block">Leo hii</span>
                  <span className="text-xs font-bold text-slate-800 leading-tight block hover:text-cyan-600 cursor-pointer">HESLB yafungua rasmi dirisha la maombi ya mikopo ya elimu ya juu.</span>
                </div>
                <div className="pt-3">
                  <span className="text-[9px] text-slate-400 font-bold block">Jana</span>
                  <span className="text-xs font-bold text-slate-800 leading-tight block hover:text-cyan-600 cursor-pointer">Kalenda ya mitihani ya NECTA kwa shule za sekondari imesasishwa.</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('matangazo')}
              className="mt-4 w-full py-2 text-center text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors border border-cyan-400/60 hover:border-cyan-500/80 rounded-xl"
            >
              ONA MATANGAZO YOTE
            </button>
          </div>

        </div>
      </div>

      {/* ── Learning Hub Highlights (Light bento-style highlights) ── */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-xs text-cyan-600 font-extrabold uppercase tracking-widest">Jifunze Sehemu Moja</p>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 uppercase leading-none mt-2">
              Masomo, Notisi na Mitihani ya Zamani
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate('masomo')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-cyan-500/10">
              Anza Kusoma
            </button>
            <button onClick={() => onNavigate('mitihani')} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-sm transition-all border border-slate-200">
              Tafuta Mtihani
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => onNavigate('masomo')} 
            className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-4"><BookOpen size={22} className="stroke-[2]" /></div>
            <h3 className="font-bold text-slate-950 text-sm">Masomo Makuu (Subjects)</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">Hisabati, Fizikia, Kemia, Biolojia, Kiswahili, Jiografia, Uraia kwa mitaala yote ya Tanzania.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => onNavigate('mitihani')} 
            className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-11 h-11 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4"><FileText size={22} className="stroke-[2]" /></div>
            <h3 className="font-bold text-slate-950 text-sm">Mitihani (Past Papers)</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">Mitihani ya taifa ya NECTA, mock za mikoa, pre-NECTA, marking schemes, na majibu ya vitabu.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => onNavigate('videos')} 
            className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-11 h-11 bg-red-100 text-red-700 rounded-xl flex items-center justify-center mb-4"><Play size={22} className="stroke-[2]" /></div>
            <h3 className="font-bold text-slate-950 text-sm">Darasani (Video Tutorials)</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">Tazama video za walimu mashuhuri wakisuluhisha maswali magumu na kuelezea mada kwa undani.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => onNavigate('duka')} 
            className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-11 h-11 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-4"><Bot size={22} className="stroke-[2]" /></div>
            <h3 className="font-bold text-slate-950 text-sm">Duka la Elimu</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">Njia rahisi ya kununua vitabu vya miongozo na vifaa vya shule kwa checkout ya moja kwa moja WhatsApp.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Live Video Lessons Preview Section (Dark theme showcase) ── */}
      <section className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs text-red-500 font-extrabold uppercase tracking-widest block mb-1">Lupa+ Streaming</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase">Jifunze kwa Vitendo</h2>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed max-w-xl">Video za mada na mafunzo mafupi kutoka kwa walimu wazoefu, somo kwa somo, darasa kwa darasa.</p>
          </div>
          <button onClick={() => onNavigate('videos')} className="bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold px-5 py-2.5 rounded-full transition-all border border-white/15">
            MAKTABA YA VIDEO &rarr;
          </button>
        </div>

        {/* Video Horizontal Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={() => onNavigate('videos')} className="bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all group cursor-pointer">
            <div className="relative h-36 bg-black flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="" />
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"><Play size={18} className="fill-current ml-0.5" /></div>
              </div>
            </div>
            <div className="p-4">
              <span className="text-[9px] text-cyan-400 font-extrabold uppercase tracking-wider block mb-0.5">Biology &bull; Form III</span>
              <h4 className="font-bold text-xs text-white line-clamp-2">Muundo na Kazi ya Seli ya Mimea (Plant Cell Structure)</h4>
            </div>
          </div>

          <div onClick={() => onNavigate('videos')} className="bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all group cursor-pointer">
            <div className="relative h-36 bg-blue-900/40 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-blue-950 flex items-center justify-center text-slate-600 text-3xl"><BookOpen size={48} className="text-slate-700" /></div>
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"><Play size={18} className="fill-current ml-0.5" /></div>
              </div>
            </div>
            <div className="p-4">
              <span className="text-[9px] text-cyan-400 font-extrabold uppercase tracking-wider block mb-0.5">Mathematics &bull; Form IV</span>
              <h4 className="font-bold text-xs text-white line-clamp-2">Jinsi ya Kutatua Quadratic Equations kwa Njia ya Formular</h4>
            </div>
          </div>

          <div onClick={() => onNavigate('videos')} className="bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all group cursor-pointer">
            <div className="relative h-36 bg-black flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="" loading="lazy" />
              <div className="absolute inset-0 bg-black/30 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play size={18} className="fill-current ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <span className="text-[9px] text-cyan-400 font-extrabold uppercase tracking-wider block mb-0.5">Chemistry &bull; O-Level</span>
              <h4 className="font-bold text-xs text-white line-clamp-2">Volumetric Analysis (Titration Practical)</h4>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all group cursor-pointer" onClick={() => onNavigate('videos')}>
            <div className="relative w-full h-36 overflow-hidden bg-black">
              <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="" loading="lazy" />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play size={18} className="fill-current ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <span className="text-[9px] text-cyan-400 font-extrabold uppercase tracking-wider block mb-0.5">Geography &bull; Msingi</span>
              <h4 className="font-bold text-xs text-white line-clamp-2">Mfumo wa Jua na Sayari Zake (Solar System)</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Vision and Mission ── */}
      <VisionMission />

      {/* ── FAQ Systems (Accordion layout) ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <span className="text-xs text-cyan-600 font-extrabold uppercase tracking-wider">FAQ</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 uppercase leading-none">
            Maswali Yanayoulizwa Sana
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Una maswali kuhusu Lupanulla Elimu Hub? Soma majibu hapa, au wasiliana na timu yetu kwa msaada zaidi.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
              <a href="mailto:lupanulla.co.tz@hotmail.com" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all shrink-0">
                <Mail size={14} /> Barua Pepe ya Msaada
              </a>
              <a href="mailto:lupanulla.co.tz@gmail.com" className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all shrink-0">
                <Mail size={14} /> Barua Pepe ya Admin
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
              <a href="tel:0699479032" className="inline-flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all shrink-0">
                <Phone size={14} /> Pigia Simu
              </a>
              <a href="https://wa.me/255699479032" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all shrink-0">
                <MessageCircle size={14} /> WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm transition-all">
            <button 
              onClick={() => toggleFaq(0)}
              className="w-full flex justify-between items-center text-left font-bold text-slate-900 text-sm sm:text-base"
            >
              <span>Je, naweza kusoma notes na kupakua mitihani bila malipo?</span>
              {faqOpen[0] ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
            </button>
            {faqOpen[0] && (
              <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed border-t border-slate-100 pt-3">
                Ndiyo kabisa! Lupanulla inatoa upatikanaji wa bure kabisa kwa asilimia 100 kwa maudhui yote ya kielimu kama vile notes za masomo yote, past papers za NECTA na majaribio ya shule. Lengo letu ni kuwawezesha wanafunzi wote nchini kupata elimu bora bure.
              </p>
            )}
          </div>

          <div className="lupa-faq-item bg-white border border-gray-200 p-5 rounded-2xl shadow-sm transition-all">
            <button 
              onClick={() => toggleFaq(1)}
              className="w-full flex justify-between items-center text-left font-bold text-slate-900 text-sm sm:text-base"
            >
              <span>Lupanulla AI ananisaidiaje katika masomo?</span>
              {faqOpen[1] ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
            </button>
            {faqOpen[1] && (
              <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed border-t border-slate-100 pt-3">
                Lupanulla AI ni msaidizi wako binafsi wa masomo. Anaelewa mtaala wa Tanzania (TIE &amp; NECTA) kikamilifu. Unaweza kumuuliza kutatua maswali magumu ya hesabu, kueleza dhana za sayansi, kukutafutia maana ya maneno au kukusaidia kuandika insha kwa Swahili fasaha.
              </p>
            )}
          </div>

          <div className="lupa-faq-item bg-white border border-gray-200 p-5 rounded-2xl shadow-sm transition-all">
            <button 
              onClick={() => toggleFaq(2)}
              className="w-full flex justify-between items-center text-left font-bold text-slate-900 text-sm sm:text-base"
            >
              <span>Je, naweza kutumia tovuti hii kwenye simu yangu ya mkononi?</span>
              {faqOpen[2] ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
            </button>
            {faqOpen[2] && (
              <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed border-t border-slate-100 pt-3">
                Ndiyo. Jukwaa letu limetengenezwa likiwa responsive kikamilifu kwa simu ya mkononi, tablet na desktop. Unaweza kusoma notisi, kufanya mazoezi na kutazama video ukiwa popote pale kupitia simu yako ya mkononi ya aina yoyote.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Google AdSense Responsive Ad Unit (Portal-bottom) ── */}
      <AdSenseWidget slotId="2000200202" className="my-6" />

      {/* ── Beautiful Newsletter Section ── */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center gap-8 justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_26px]"></div>
        <div className="relative z-10 max-w-lg space-y-3 text-center lg:text-left">
          <span className="text-xs text-cyan-400 font-extrabold uppercase tracking-wider">Lupanulla Newsletter</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-none">
            Pokea Updates za Masomo &amp; Mitihani
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Jiunge na barua pepe yetu upokee taarifa za hivi karibuni za mitihani ya NECTA, notisi mpya za masomo, na updates kutoka Lupanulla Foundation moja kwa moja kwenye inbox yako kila wiki.
          </p>
        </div>

        <div className="relative z-10 w-full lg:w-96">
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input 
              type="email" 
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Andika barua pepe yako..." 
              className="flex-grow bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-1">
              <Mail size={16} /> Jiunge
            </button>
          </form>
          {newsletterStatus && (
            <p className="text-[11px] text-cyan-300 font-bold text-center lg:text-left mt-2 flex items-center justify-center lg:justify-start gap-1">
              <CheckCircle size={12} /> {newsletterStatus}
            </p>
          )}
        </div>
      </section>

    </motion.div>
  );
}

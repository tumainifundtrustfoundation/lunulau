import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  Eye, 
  Bookmark, 
  Share2, 
  Crown, 
  AlertCircle,
  HelpCircle,
  Lock,
  Compass,
  Brain,
  Sparkles,
  Highlighter,
  Trash2,
  Plus,
  Check,
  ChevronRight,
  Maximize2,
  Minimize2,
  Printer,
  ShieldAlert,
  ShieldCheck,
  StickyNote,
  Save,
  Pencil,
  Edit3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote
} from 'lucide-react';
import { fetchDocuments, saveHighlight, fetchHighlights, deleteHighlight, toggleBookmark, fetchUserBookmarks, submitFeedback, updateDocument, saveReadingProgress, fetchReadingProgress, saveUserPrivateNote } from '../firebase';
import { DocumentMetadata, HighlightAnnotation, UserBookmark, UserReadingProgress } from '../types';
import { localSeedDocs } from '../data/seedDocs';
import FlashcardsModal from './FlashcardsModal';
import PDFPreviewer from './PDFPreviewer';
import MarkdownRenderer from './MarkdownRenderer';
import { jsPDF } from 'jspdf';

interface ReaderViewProps {
  documentId: string;
  onNavigate: (view: string, id?: string) => void;
  userProfile: any;
}

export default function ReaderView({ documentId, onNavigate, userProfile }: ReaderViewProps) {
  const [doc, setDoc] = useState<DocumentMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);

  // Copyright Reporting States
  const [isReportingOpen, setIsReportingOpen] = useState(false);
  const [reportDetails, setReportDetails] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  // Continue Reading / Scroll Position States
  const [savedProgress, setSavedProgress] = useState<UserReadingProgress | null>(null);
  const [showContinueBanner, setShowContinueBanner] = useState<boolean>(false);
  const [hasRestoredScroll, setHasRestoredScroll] = useState<boolean>(false);

  // States for text selection and highlight annotations
  const [readerMode, setReaderMode] = useState<'pdf' | 'notes'>('pdf');
  const [notesTheme, setNotesTheme] = useState<'ivory' | 'light' | 'sepia' | 'dark'>('ivory');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);

  const notesThemeClasses = {
    ivory: 'bg-[#FFFDF5] text-[#2C2825] border-[#EFEBE0] shadow-stone-200/50',
    light: 'bg-white text-slate-800 border-slate-200 shadow-sm',
    sepia: 'bg-[#fbf0db] text-[#5c4033] border-[#eadaa6] shadow-amber-100/30',
    dark: 'bg-slate-900 text-slate-100 border-slate-800 shadow-slate-950/40'
  };

  const toggleFullscreen = () => {
    if (!readerRef.current) return;
    try {
      if (!isFullscreen) {
        if (readerRef.current.requestFullscreen) {
          readerRef.current.requestFullscreen();
        } else if ((readerRef.current as any).webkitRequestFullscreen) {
          (readerRef.current as any).webkitRequestFullscreen();
        } else if ((readerRef.current as any).msRequestFullscreen) {
          (readerRef.current as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (e) {
      console.warn('Native fullscreen not fully supported, falling back to CSS-only fullscreen:', e);
      setIsFullscreen(!isFullscreen);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const activeElement = document.fullscreenElement || 
                            (document as any).webkitFullscreenElement || 
                            (document as any).msFullscreenElement;
      setIsFullscreen(!!activeElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const [highlights, setHighlights] = useState<HighlightAnnotation[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [highlightColor, setHighlightColor] = useState('bg-yellow-100 text-yellow-900 border-yellow-300');
  const [highlightNote, setHighlightNote] = useState('');
  const [savingHighlight, setSavingHighlight] = useState(false);
  const [smartNotes, setSmartNotes] = useState('');
  const [loadingSmartNotes, setLoadingSmartNotes] = useState(false);

  // Private Note State per documentId
  const [privateNoteText, setPrivateNoteText] = useState('');
  const [savedPrivateNote, setSavedPrivateNote] = useState('');
  const [isEditingPrivateNote, setIsEditingPrivateNote] = useState(false);
  const [savingPrivateNote, setSavingPrivateNote] = useState(false);
  const [privateNoteSavedMsg, setPrivateNoteSavedMsg] = useState(false);
  const privateNoteInputRef = useRef<HTMLTextAreaElement>(null);

  const applyNoteFormatting = (prefix: string, suffix: string = '') => {
    const textarea = privateNoteInputRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = privateNoteText;
    const selectedText = currentText.substring(start, end);

    let replacement = '';
    if (selectedText) {
      replacement = `${prefix}${selectedText}${suffix}`;
    } else {
      const placeholder = prefix === '### ' ? 'Kichwa cha habari' : prefix === '> ' ? 'Nukuu...' : 'Maandishi';
      replacement = `${prefix}${placeholder}${suffix}`;
    }

    const newText = currentText.substring(0, start) + replacement + currentText.substring(end);
    setPrivateNoteText(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = selectedText ? start + replacement.length : start + prefix.length;
      textarea.setSelectionRange(newCursorPos, selectedText ? newCursorPos : start + replacement.length);
    }, 50);
  };

  useEffect(() => {
    let note = '';
    if (userProfile?.personalNotes && userProfile.personalNotes[documentId]) {
      note = userProfile.personalNotes[documentId];
    } else {
      try {
        const stored = localStorage.getItem('lupa_private_notes');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed[documentId]) {
            note = parsed[documentId];
          }
        }
      } catch (e) {
        // ignore
      }
    }
    setPrivateNoteText(note);
    setSavedPrivateNote(note);
    setIsEditingPrivateNote(!note);
  }, [documentId, userProfile]);

  const handleSavePrivateNote = async () => {
    setSavingPrivateNote(true);
    try {
      if (userProfile?.uid) {
        await saveUserPrivateNote(userProfile.uid, documentId, privateNoteText);
        if (userProfile.personalNotes) {
          userProfile.personalNotes[documentId] = privateNoteText;
        } else {
          userProfile.personalNotes = { [documentId]: privateNoteText };
        }
      } else {
        const stored = localStorage.getItem('lupa_private_notes');
        let parsed: Record<string, string> = stored ? JSON.parse(stored) : {};
        parsed[documentId] = privateNoteText;
        localStorage.setItem('lupa_private_notes', JSON.stringify(parsed));
      }
      setSavedPrivateNote(privateNoteText);
      setIsEditingPrivateNote(false);
      setPrivateNoteSavedMsg(true);
      setTimeout(() => setPrivateNoteSavedMsg(false), 3000);
    } catch (err) {
      console.error('Failed to save private note:', err);
      alert('Hitilafu imetokea wakati wa kuhifadhi dokezo lako binafsi.');
    } finally {
      setSavingPrivateNote(false);
    }
  };

  const loadHighlights = async () => {
    if (!userProfile?.uid) return;
    try {
      const fetched = await fetchHighlights(userProfile.uid, documentId);
      setHighlights(fetched);
    } catch (e) {
      console.error('Error loading highlights:', e);
    }
  };

  const handleSaveHighlight = async () => {
    if (!selectedText.trim()) {
      alert('Tafadhali chagua maandishi kwenye upande wa "Smart Notes" kwanza!');
      return;
    }
    if (!userProfile?.uid) {
      alert('🔒 TAFADHALI INGIA KWENYE AKAUNTI:\nKuhifadhi highlights na maelezo (annotations) ni huduma inayohitaji uwe umeingia kwenye akaunti yako ya Lupanulla.');
      return;
    }

    try {
      setSavingHighlight(true);
      await saveHighlight({
        userId: userProfile.uid,
        documentId: documentId,
        documentTitle: doc?.title || 'Nyaraka',
        text: selectedText.trim(),
        note: highlightNote.trim() || undefined,
        color: highlightColor,
      });

      setSelectedText('');
      setHighlightNote('');
      await loadHighlights();
    } catch (e) {
      console.error('Error saving highlight:', e);
    } finally {
      setSavingHighlight(false);
    }
  };

  const handleDeleteHighlight = async (id: string) => {
    try {
      if (confirm('Je, una uhakika unataka kufuta highlight hii?')) {
        await deleteHighlight(id);
        await loadHighlights();
      }
    } catch (e) {
      console.error('Error deleting highlight:', e);
    }
  };

  const fetchSmartNotesContent = async () => {
    if (smartNotes) return;

    const preAuthored: Record<string, string> = {
      'necta-phy-f4-2023': `SURA YA KWANZA: MECHANICS AND FORCE IN EQUILIBRIUM\n\nMechanics ni tawi la fizikia linalohusika na mwendo wa vitu na nguvu zinazasababisha mwendo huo. Kanuni muhimu ya Archimedes (Archimedes' Principle) inasema kwamba: "Wakati kitu kinapozamishwa kabisa au nusu katika maji, kinakabiliwa na nguvu ya juu (upthrust) inayolingana na uzito wa maji yaliyohamishwa na kitu hicho."\n\nMfumo wa Upthrust unakokotolewa kama:\nUpthrust = V * ρ * g (ambapo V ni ujazo, ρ ni density ya maji, na g ni acceleration ya gravity).\n\nSURA YA PILI: NEWTON'S LAWS OF MOTION\n\n- Sheria ya Kwanza ya Newton (Inertia): Kila kitu kitaendelea kuwa katika hali yake ya utulivu au mwendo wa kasi mfululizo katika mtaro ulionyooka isipokuwa kilazimishwe kubadilisha hali hiyo na nguvu ya nje.\n- Sheria ya Pili ya Newton: Kiwango cha mabadiliko ya momentum ya kitu kinalingana moja kwa moja na nguvu inayotumika na hutokea katika mwelekeo wa nguvu hiyo (F = m * a).\n- Sheria ya Tatu ya Newton: Kwa kila nguvu ya utendaji (action), kuna nguvu sawa na ya kinyume ya upinzani (reaction).\n\nSURA YA TATU: HEAT AND THERMODYNAMICS\n\nKiwango cha joto kinachohitajika kubadilisha hali ya dutu bila kubadilisha joto lake kinaitwa Latent Heat.\nMfumo wa joto la jumla: Q = m * c * ΔT (ambapo c ni specific heat capacity).\n\nSURA YA NNE: ELECTRICITY AND ELECTROMAGNETISM\n\nSheria ya Ohm (Ohm's Law) inasema kwamba sasa ya umeme (I) inayopita kwenye kondakta inalingana moja kwa moja na voltage (V) katika ncha zake, mradi joto na hali nyingine za kimaumbile zibaki thabiti.\nV = I * R (ambapo R ni upinzani/resistance).`,
      
      'necta-math-f4-2022': `SURA YA KWANZA: SETS AND VENN DIAGRAMS\n\nSeti ni mkusanyiko wa vitu vilivyoelezewa vizuri. Venn Diagram hutumiwa kuonyesha uhusiano kati ya seti tofauti.\nKumbuka: n(A ∪ B) = n(A) + n(B) - n(A ∩ B).\nAlama ya kofia (∩) inamaanisha intersection (vitu vya pamoja), na alama ya kikombe (∪) inamaanisha union (vitu vyote vilivyomo).\n\nSURA YA PILI: QUADRATIC EQUATIONS\n\nMlinganyo wa quadratic uko katika muundo wa ax² + bx + c = 0.\nTunaweza kutatua mlinganyo huu kwa kutumia njia ya Quadratic Formula:\nx = [-b ± √(b² - 4ac)] / (2a)\nSehemu ya chini ya kipeo cha pili (b² - 4ac) inaitwa Discriminant (D). Kama D > 0, mlinganyo una majibu mawili tofauti ya kweli. Kama D = 0, kuna jibu moja linalojirudia.\n\nSURA YA TATU: TRIGONOMETRY\n\nKatika pembetatu ya pembe mraba (Right-angled triangle):\n- Sin(θ) = Opposite / Hypotenuse (Mkabala / Kiegema)\n- Cos(θ) = Adjacent / Hypotenuse (Mshazari / Kiegema)\n- Tan(θ) = Opposite / Adjacent (Mkabala / Mshazari)\nKumbuka kanuni maarufu ya Pythagoras: a² + b² = c².`,
      
      'mock-hist-f4-2024': `SURA YA KWANZA: COLONIAL ECONOMY IN EAST AFRICA\n\nUchumi wa kikoloni ulijengwa ili kunufaisha mataifa ya Ulaya (Metropolitan countries). Njia kuu zilizotumiwa ni pamoja na kuanzishwa kwa kilimo cha mashamba makubwa (plantation agriculture), kuanzishwa kwa kodi ya kichwa (head tax) ili kulazimisha Waafrika kufanya kazi, na ujenzi wa miundombinu kama reli ya kati (Central Line) kusafirisha malighafi.\n\nSURA YA PILI: BERLIN CONFERENCE (1884 - 1885)\n\nMkutano wa Berlin uliitishwa na Chancellor wa Ujerumani, Otto von Bismarck. Lengo kuu lilikuwa kugawana bara la Afrika kwa amani kati ya mataifa ya Ulaya bila vita. Sheria ya "Effective Occupation" ilipitishwa, inayotaka taifa lolote linalodai eneo fulani kuanzisha utawala thabiti wa kijeshi na kiutawala.\n\nSURA YA TATU: MAJIMAJI REBELLION (1905 - 1907)\n\nHuu ulikuwa uasi mkubwa dhidi ya utawala wa Kijerumani huko Tanganyika Kusini. Uliongozwa na Kinjekitile Ngwale, ambaye alitumia maji yaliyochanganywa na mtama kama silaha ya kiroho kuwaaminisha wapiganaji kuwa risasi za Wajerumani zingebadilika kuwa maji. Sababu kuu ya uasi ilikuwa kulazimishwa kulima pamba na kuteswa kwa wananchi na akida.`,
      
      'mock-bio-f4-2026': `SURA YA KWANZA: NADHARIA ZA EVOLUTION NA USHAHIDI WA KIBIOLOJIA\n\nEvolution ni mabadiliko ya taratibu ya viumbe hai kutoka kizazi kimoja hadi kingine kwa muda mrefu wa miaka. Nadharia kuu mbili ni:\n- Nadharia ya Jean-Baptiste Lamarck (Lamarckism): Inasema sifa zote ambazo kiumbe anajipatia katika maisha yake (acquired characteristics) kwa kutumia sana au kutotumia kiungo fulani cha mwili hupitishwa kwa watoto wake.\n- Nadharia ya Charles Darwin (Darwinism / Natural Selection): Inasisitiza mazingira yanachagua viumbe wenye uwezo mkubwa wa kuishi (survival of the fittest) na wale wasio na sifa zinazofaa hufa.\n\nUshahidi wa kusaidia nadharia ya Evolution unajumuisha:\n1. Palaeontology (Mabaki ya kale / Fossils).\n2. Comparative Anatomy (Ulinganifu wa viungo vya miili kama Homologous na Analogous organs).\n3. Comparative Embryology (Ulinganifu wa maendeleo ya kijusi wakati wa ujauzito).\n\nSURA YA PILI: ECOLOGY NA UCHAFUZI WA MAZINGIRA (PLASTIC POLLUTION)\n\nMifuko ya plastiki inajumuisha takataka zisizooza (non-biodegradable waste) ambazo huleta madhara makubwa nchini Tanzania:\n- Kuharibu udongo kwa kuzuia maji kupenya chini na kuathiri mizizi ya mimea.\n- Kifo cha mifugo na wanyamapori wanapokula plastiki wakidhania kuwa ni chakula.\n- Kuziba kwa mifereji na miundombinu ya maji taka, kusababisha mafuriko na milipuko ya magonjwa ya kipindupindu.\n\nNjia za kuzuia uchafuzi wa plastiki:\n- Marufuku kamili ya matumizi ya mifuko ya plastiki isiyooza (plastic bag ban).\n- Kuhamasisha matumizi ya mifuko mbadala (Kikapu, bahasha za karatasi, nk).\n- Kuanzisha viwanda vya kurejeleza plastiki (Recycling plants).\n\nSURA YA TATU: MAFANIKIO YA EVOLUTION NA SIFA ZA CLASS INSECTA\n\nInsects (Wadudu) ni kundi lililofanikiwa zaidi duniani kwa sababu ya:\n1. Kuwa na Exoskeleton ngumu ya chitin inayozuia kupoteza maji mwilini.\n2. Uwezo mkubwa wa kuruka (Wings) kuwakimbia maadui na kutafuta chakula.\n3. Uzazi mkubwa na wa haraka sana (High reproduction rate).\n4. Mfumo wa upumuaji wa Tracheole unaofanya kazi bila kutegemea mfumo wa damu.`,

      'mock-geo-f4-2026': `SURA YA KWANZA: MAP READING AND PHOTOGRAPH INTERPRETATION\n\nMap reading inahusisha uchambuzi wa ramani za topografia (Topographical Maps).\n1. Contour lines (Mstari ya mwinuko): Mistari inayounganisha maeneo yenye urefu sawa kutoka usawa wa bahari. Mistari ikiwa karibu inamaanisha mteremko mkali (steep slope); ikiwa mbali inamaanisha mteremko wa taratibu (gentle slope).\n2. Liwale Map Extract (280/4): Inajumuisha grid references (Eastings na Northings) kupima maeneo ya kilimo cha korosho, makazi, na barabara za vumbi.\n\nSURA YA PILI: MANUFACTURING INDUSTRIES & ENVIRONMENTAL DEGRADATION\n\nViwanda vya utengenezaji (Manufacturing industries) vinakabiliwa na changamoto ya utoaji wa hewa ya ukaa na takataka za kemikali.\n- Madhara: Uchafuzi wa maji ya mito na hewa kusababisha mvua za tindikali (acid rain).\n- Njia za utatuzi: Kufunga filters kwenye dohani za viwanda na kutumia nishati mbadala (Clean Energy).\n\nSURA YA TATU: ECO-TOURISM IN TANZANIA\n\nUtalii wa ikolojia (Eco-tourism) unasisitiza uhifadhi wa mazingira wakati wa kukuza uchumi kupitia mbuga za wanyama kama Serengeti, Ngorongoro, na Mikumi.`,

      'mock-chem-f4-2026': `SURA YA KWANZA: LABORATORY SAFETY AND CHEMICAL REACTIONS\n\nMaabara ya Kemia ni eneo maalum la kufanyia majaribio ya kisayansi. Kanuni kuu za usalama zinaratibu matumizi ya Fume Chamber, Zana za Kinga (PPE), na kuzuia milipuko ya gesi.\n\nSURA YA PILI: ELECTROCHEMISTRY & ELECTROLYSIS\n\nElectrolysis ni mchakato wa kutenganisha kiwanja cha kemikali kwa kutumia umeme.\n- Anode (Chaji Chanya): Mahali ambapo oxidation hutokea.\n- Cathode (Chaji Hasi): Mahali ambapo reduction hutokea.\n- Kanuni ya Faraday ya Kwanza: Masi ya dutu inayowekwa kwenye electrode inalingana moja kwa moja na kiwango cha umeme kinachopita (m = Q * Z = I * t * Z).\n\nSURA YA TATU: ORGANIC CHEMISTRY (HYDROCARBONS)\n\nAlkanes (C_n H_{2n+2}), Alkenes (C_n H_{2n}), na Alkynes (C_n H_{2n-2}). Alkenes hufanya addition reactions ilhali Alkanes hufanya substitution reactions.`,

      'mock-math-f4-2026': `SURA YA KWANZA: VECTORS & ALGEBRA\n\nVector ni wingi wenye ukubwa (magnitude) na mwelekeo (direction). Ukubwa wa vector v = (x, y) ni |v| = √(x² + y²).\n\nSURA YA PILI: COORDINATE GEOMETRY & LINES\n\nMstari ulionyooka kwenye mfumo wa cartesian una mlinganyo y = mx + c (ambapo m ni gradient/mteremko na c ni y-intercept).\nGradient (m) = (y₂ - y₁) / (x₂ - x₁).\nMistari miwili iliyo sambamba (parallel lines) ina gradient sawa (m₁ = m₂).\nMistari miwili iliyokutana kwa pembe mraba (perpendicular lines) ina m₁ * m₂ = -1.\n\nSURA YA TATU: STATISTICS & PROBABILITY\n\nUpimaji wa wastani (Mean), Nambari ya katikati (Median), na Nambari inayojirudia zaidi (Mode).\nProbability ya matukio mawili huru (Independent events): P(A na B) = P(A) * P(B).`,

      'chem-practical-handout': `SURA YA KWANZA: UCHAMBUZI WA KIASI (VOLUMETRIC ANALYSIS)\n\nVolumetric analysis au Titration inahusisha upimaji wa ujazo wa miundo miwili ya kemikali (asidi na besi) inayomanyuka ili kupata ukolezi (concentration) na masi ya molar (molar mass) ya dutu isiyojulikana.\n\nMamnyuko Muhimu katika Titration:\n- Acid + Base → Salt + Water (Mmenyuko wa Neutralization).\n- Mifano ya viashiria (indicators) ni Methyl Orange (MO - hubadilika kutoka njano kwenda nyekundu kwenye asidi) na Phenolphthalein (POP - hubadilika kutoka pinki kwenda kutokuwa na rangi kwenye asidi).\n\nSURA YA PILI: KASI YA MMENYUKO (KINETICS)\n\nKasi ya mmenyuko inategemea mambo makuu manne:\n1. Ukolezi wa vitendanishi (Concentration of reactants).\n2. Joto (Temperature).\n3. Kichocheo (Catalyst).\n4. Eneo la mguso (Surface area of solids).\n\nMmenyuko wa thiosulphate na asidi huzalisha precipitate ya njano ya sulfur: Na₂S₂O₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + S(s) + SO₂(g).\nHerufi 'X' iliyochorwa chini ya karatasi hupotea jinsi sulfur inavyoongezeka.`
    };

    if (preAuthored[documentId]) {
      setSmartNotes(preAuthored[documentId]);
      return;
    }

    setLoadingSmartNotes(true);
    try {
      const tagList = Array.isArray(doc?.tags) ? doc.tags.join(', ') : 'Elimu, Mitihani, NECTA';
      const categoryName = doc?.category || 'Somo la Kitaaluma';
      const docTitle = doc?.title || 'Muhtasari wa Somo';
      const docDesc = doc?.description || 'Nyaraka ya mafunzo na maandalizi ya mitihani.';

      const generatedText = `SURA YA KWANZA: UTANGULIZI WA ${docTitle.toUpperCase()}\n\nMada hii ya "${docTitle}" inahusu mambo msingi ya ${categoryName}. Maelezo haya yameandaliwa kusaidia wanafunzi wa sekondari na msingi nchini Tanzania kupata maandalizi bora kwa ajili ya mitihani ya NECTA na tathmini za shuleni.\n\nSURA YA PILI: MAMBO MUHIMU YA KUJIFUNZA\n- Kuelewa dhana kuu, kanuni na mifumo inayohusiana na: ${tagList}.\n- Kuchambua maelezo ya kitabu: ${docDesc}.\n- Kujenga uwezo wa kujibu maswali ya nadharia (Theory) na vitendo (Practical/Application) kwa ufasaha.\n\nSURA YA TATU: MAELEZO NA MKUTADHA WA SOMO\n1. Kujisomea kwa Umakini: Mwanafunzi anashauriwa kusoma kwa kulinganisha maswali ya miaka iliyopita na muhtasari wa somo.\n2. Maelezo Mahiri (Annotations): Unaweza kuchagua sentensi yoyote katika muhtasari huu kwenye skrini ili kuiwekea rangi ya Highlight na kuandika kumbukumbu zako binafsi.\n3. Mazoezi ya Flashcards: Tumia mfumo wetu wa Kadi Mahiri za Kujikumbusha (Flashcards) ili kuimarisha kumbukumbu ya msamiati na kanuni kuu.\n\n[MWONGOZO]: Bonyeza maandishi yoyote hapo juu ili kuweka Highlight yako mwenyewe!`;

      setSmartNotes(generatedText);
    } catch (err) {
      console.error('Error setting smart notes:', err);
      setSmartNotes(`SURA YA REVISION: ${doc?.title || 'Muhtasari wa Somo'}\n\n1. UTANGULIZI\nMada hii inahusu masomo ya elimu nchini Tanzania.\n\n2. MALENGO YA KUJIFUNZA\n- Kuelewa dhana kuu za mitihani ya NECTA na maandalizi ya masomo.`);
    } finally {
      setLoadingSmartNotes(false);
    }
  };

  const handleToggleReaderMode = (mode: 'pdf' | 'notes') => {
    setReaderMode(mode);
    if (mode === 'notes') {
      fetchSmartNotesContent();
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString().trim();
      if (text.length > 0) {
        setSelectedText(text);
      }
    }
  };

  const renderParagraphWithHighlights = (paraText: string, idx: number) => {
    if (highlights.length === 0) {
      if (paraText.startsWith('SURA') || paraText.startsWith('Sura') || paraText.startsWith('Chapter') || paraText.match(/^\d+\./)) {
        return <h3 key={idx} className="font-display font-extrabold text-slate-900 text-base sm:text-lg pt-4 border-b pb-1 border-slate-100 uppercase tracking-tight">{paraText}</h3>;
      }
      return <p key={idx} className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line text-slate-600">{paraText}</p>;
    }

    let matches = highlights.filter(h => paraText.toLowerCase().includes(h.text.toLowerCase()));
    if (matches.length === 0) {
      if (paraText.startsWith('SURA') || paraText.startsWith('Sura') || paraText.startsWith('Chapter') || paraText.match(/^\d+\./)) {
        return <h3 key={idx} className="font-display font-extrabold text-slate-900 text-base sm:text-lg pt-4 border-b pb-1 border-slate-100 uppercase tracking-tight">{paraText}</h3>;
      }
      return <p key={idx} className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line text-slate-600">{paraText}</p>;
    }

    let parts: { text: string; isHighlight: boolean; color?: string; note?: string }[] = [{ text: paraText, isHighlight: false }];

    for (const h of matches) {
      const newParts: typeof parts = [];
      for (const part of parts) {
        if (part.isHighlight) {
          newParts.push(part);
          continue;
        }

        const lowerText = part.text.toLowerCase();
        const lowerSearch = h.text.toLowerCase();
        const startIdx = lowerText.indexOf(lowerSearch);

        if (startIdx !== -1) {
          const before = part.text.substring(0, startIdx);
          const match = part.text.substring(startIdx, startIdx + h.text.length);
          const after = part.text.substring(startIdx + h.text.length);

          if (before) newParts.push({ text: before, isHighlight: false });
          newParts.push({ text: match, isHighlight: true, color: h.color, note: h.note });
          if (after) newParts.push({ text: after, isHighlight: false });
        } else {
          newParts.push(part);
        }
      }
      parts = newParts;
    }

    if (paraText.startsWith('SURA') || paraText.startsWith('Sura') || paraText.startsWith('Chapter') || paraText.match(/^\d+\./)) {
      return (
        <h3 key={idx} className="font-display font-extrabold text-slate-900 text-base sm:text-lg pt-4 border-b pb-1 border-slate-100 uppercase tracking-tight">
          {parts.map((p, pIdx) => p.isHighlight ? <span key={pIdx} className={`${p.color || 'bg-yellow-100'} px-1 rounded cursor-help`} title={p.note}>{p.text}</span> : p.text)}
        </h3>
      );
    }

    return (
      <p key={idx} className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line text-slate-600">
        {parts.map((p, pIdx) => p.isHighlight ? (
          <span 
            key={pIdx} 
            className={`${p.color || 'bg-yellow-100'} px-1 py-0.5 rounded cursor-help relative group inline`} 
            title={p.note}
          >
            {p.text}
            {p.note && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-950 text-white text-[10px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl z-30">
                📝 {p.note}
              </span>
            )}
          </span>
        ) : p.text)}
      </p>
    );
  };

  // Default seeds just in case the active ID matches one of our local seeds
  const localSeedDocs: DocumentMetadata[] = [
    {
      id: 'necta-phy-f4-2023',
      title: 'NECTA Physics Form IV (CSEE) 2023 Past Paper',
      description: 'Official national examination paper for Physics paper 1, complete with questions on mechanics, thermal physics, waves, electromagnetism and modern physics.',
      category: 'Science & Technology',
      tags: ['Physics', 'CSEE', 'NECTA', '2023', 'Form IV'],
      fileId: 'sample-drive-id-1',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 5,
      views: 1241,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2023,
      type: 'NECTA',
      sizeKB: 245
    },
    {
      id: 'necta-math-f4-2022',
      title: 'NECTA Basic Mathematics Form IV 2022 Past Paper',
      description: 'Official national mathematics paper 1 for form four secondary school candidates. Covers sets, quadratic equations, geometry, and trigonometry.',
      category: 'Mathematics',
      tags: ['Mathematics', 'CSEE', 'NECTA', '2022', 'Form IV'],
      fileId: 'sample-drive-id-2',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 10,
      views: 951,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2022,
      type: 'NECTA',
      sizeKB: 180
    },
    {
      id: 'mock-hist-f4-2024',
      title: 'Dar es Salaam Mock History Form IV 2024 Past Paper',
      description: 'Region mock assessment history examination paper 1. Contains great structure aligning with new syllabus updates.',
      category: 'History & Humanities',
      tags: ['History', 'Mock', 'Dar es Salaam', '2024', 'Form IV'],
      fileId: 'sample-drive-id-3',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'author-1',
      uploadedByName: 'Mwl. Kamau',
      createdAt: Date.now() - 3600000 * 24 * 2,
      views: 311,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2024,
      type: 'Mock',
      sizeKB: 140
    },
    {
      id: 'mock-bio-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Biology 1',
      description: 'Official regional mock examination paper for Biology 1. Features high-quality questions on physiology, classification, genetics, ecology, and evolution aligned with the latest NECTA syllabus.',
      category: 'Science & Technology',
      tags: ['Biology', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-4',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1, // 1 day ago
      views: 1845,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 295
    },
    {
      id: 'mock-geo-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Geography',
      description: 'Official regional mock examination paper for Geography. Contains Section A (Multiple choice & matching), Section B (Map extract of Liwale 280/4 & statistical data representation), and Section C (consequences of manufacturing, poverty vs environmental degradation, and tourism).',
      category: 'Geography & Environment',
      tags: ['Geography', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-5',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.1,
      views: 1420,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 320
    },
    {
      id: 'mock-chem-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Chemistry 1',
      description: 'Official regional mock examination paper for Chemistry 1. Includes detailed questions on laboratory safety, organic compounds, electrochemistry, and chemical reactions.',
      category: 'Science & Technology',
      tags: ['Chemistry', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-6',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.2,
      views: 1680,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 285
    },
    {
      id: 'mock-math-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Basic Mathematics',
      description: 'Official regional mock examination paper for Basic Mathematics. Covers algebra, set theory, vectors, coordinate geometry, trigonometry, and statistics.',
      category: 'Mathematics',
      tags: ['Mathematics', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-7',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.3,
      views: 2150,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 340
    },
    {
      id: 'mock-pe-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Physical Education',
      description: 'Official regional mock examination paper for Physical Education. Examines gymnastics, swimming stroke order, relay zones, and sports injuries.',
      category: 'Physical Education & Sports',
      tags: ['Physical Education', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-8',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.4,
      views: 920,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 210
    },
    {
      id: 'mock-phy-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Physics 1',
      description: 'Official regional mock examination paper for Physics 1. Features high-fidelity questions on mechanics, thermal physics, sound, magnetism, electronics, and waves.',
      category: 'Science & Technology',
      tags: ['Physics', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-9',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.5,
      views: 1950,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 310
    },
    {
      id: 'mock-chem2-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Chemistry 2 (Actual Practical)',
      description: 'Official regional mock practical examination paper for Chemistry 2. Consists of Question 1 (Volumetric analysis of Sodium Hydroxide contaminating a drinking water source) and Question 2 (Chemical kinetics of Sodium Thiosulphate and Hydrochloric acid reaction at different temperatures).',
      category: 'Science & Technology',
      tags: ['Chemistry', 'Practical', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-10',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.55,
      views: 1250,
      status: 'approved',
      paperNo: 'Paper 2',
      year: 2026,
      type: 'Mock',
      sizeKB: 290
    },
    {
      id: 'mock-chinese-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Chinese Language',
      description: 'Official regional mock examination paper for Chinese Language. Covers Pinyin, character translation, comprehension reading, matching patterns, and short composition writing topics.',
      category: 'Languages & Linguistics',
      tags: ['Chinese', 'Mock', 'Morogoro', '2026', 'Form IV', 'Language'],
      fileId: 'sample-drive-id-11',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.6,
      views: 840,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 320
    },
    {
      id: 'mock-civics-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Civics',
      description: 'Official regional mock examination paper for Civics. Evaluates human rights, courtship systems, cultural practices, local government roles, globalization effects, and reproductive education.',
      category: 'History & Humanities',
      tags: ['Civics', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-12',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.65,
      views: 1100,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 195
    },
    {
      id: 'mock-commerce-f4-2026',
      title: 'Morogoro Region Regional Form Four Mock Examination 2026 - Commerce',
      description: 'Official regional mock examination paper for Commerce. Includes calculations on stock turnover, cost of goods sold, gross profit markup, business risk management, partnership categories, and taxation systems.',
      category: 'Business & Economics',
      tags: ['Commerce', 'Mock', 'Morogoro', '2026', 'Form IV'],
      fileId: 'sample-drive-id-13',
      driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
      uploadedBy: 'admin',
      uploadedByName: 'Lupanulla Admin',
      createdAt: Date.now() - 3600000 * 24 * 1.7,
      views: 950,
      status: 'approved',
      paperNo: 'Paper 1',
      year: 2026,
      type: 'Mock',
      sizeKB: 230
    }
  ];

  useEffect(() => {
    loadDocument();
    
    // Check bookmark status
    const checkBookmarkStatus = async () => {
      if (!userProfile?.uid) {
        const storedBookmarks = localStorage.getItem('lupa_bookmarks');
        if (storedBookmarks) {
          const bookmarked = JSON.parse(storedBookmarks) as string[];
          setIsBookmarked(bookmarked.includes(documentId));
        }
        return;
      }
      
      try {
        const bookmarks = await fetchUserBookmarks(userProfile.uid);
        setIsBookmarked(bookmarks.some(b => b.resourceId === documentId));
      } catch (e) {
        console.error(e);
      }
    };

    checkBookmarkStatus();

    // Load active highlights
    if (userProfile?.uid) {
      loadHighlights();
    }
  }, [documentId, userProfile?.uid]);

  // Load saved reading progress when documentId or user changes
  useEffect(() => {
    if (!documentId) return;

    const loadProgress = async () => {
      try {
        const prog = await fetchReadingProgress(userProfile?.uid || '', documentId);
        if (prog && prog.scrollPosition > 50) {
          setSavedProgress(prog);
          setShowContinueBanner(true);
        } else {
          setSavedProgress(null);
          setShowContinueBanner(false);
        }
      } catch (err) {
        console.error('Error fetching reading progress:', err);
      }
    };

    loadProgress();
  }, [documentId, userProfile?.uid]);

  // Restore scroll position helper
  const handleRestoreScrollPosition = (position?: number) => {
    const targetPos = position ?? savedProgress?.scrollPosition ?? 0;
    if (!targetPos) return;

    if (readerRef.current) {
      readerRef.current.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
    window.scrollTo({ top: targetPos, behavior: 'smooth' });
    setHasRestoredScroll(true);
    setShowContinueBanner(false);
  };

  // Auto-restore scroll position once document loading completes
  useEffect(() => {
    if (savedProgress && savedProgress.scrollPosition > 50 && !hasRestoredScroll && !loading) {
      const timer = setTimeout(() => {
        handleRestoreScrollPosition(savedProgress.scrollPosition);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [savedProgress, loading, hasRestoredScroll]);

  // Debounced scroll listener to record reading progress in Firestore and LocalStorage
  useEffect(() => {
    if (loading || !documentId) return;

    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const containerScroll = readerRef.current ? readerRef.current.scrollTop : 0;
        const windowScroll = window.scrollY || document.documentElement.scrollTop || 0;
        const currentScroll = Math.max(containerScroll, windowScroll);

        const maxScroll = readerRef.current
          ? (readerRef.current.scrollHeight - readerRef.current.clientHeight)
          : (document.documentElement.scrollHeight - window.innerHeight);

        const percentage = maxScroll > 0
          ? Math.min(100, Math.round((currentScroll / maxScroll) * 100))
          : 0;

        if (currentScroll > 30) {
          saveReadingProgress(
            userProfile?.uid || '',
            documentId,
            currentScroll,
            percentage,
            doc?.title
          );
        }
      }, 800);
    };

    const container = readerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [documentId, userProfile?.uid, doc?.title, loading]);

  const loadDocument = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if it's a dynamic NECTA past paper ID
      if (documentId && documentId.startsWith('necta-')) {
        // Format: necta-[level]-[subject]-[year]
        const parts = documentId.split('-');
        const levelCode = parts[1] || 'f4';
        const subjectCode = parts[2] || 'physics';
        const yearVal = parseInt(parts[3] || '2023', 10);
        
        // Map codes to localized names
        const levelNames: Record<string, string> = {
          'std4': 'Darasa la IV (Standard 4)',
          'std7': 'Darasa la VII (Standard 7 - PSLE)',
          'f2': 'Kidato cha Pili (Form II - FTSEE)',
          'f4': 'Kidato cha Nne (Form IV - CSEE)',
          'f6': 'Kidato cha Sita (Form VI - ACSEE)'
        };
        
        const subjectNames: Record<string, string> = {
          'physics': 'Physics (Fizikia)',
          'chemistry': 'Chemistry (Kemia)',
          'biology': 'Biology (Biolojia)',
          'basic-math': 'Basic Mathematics (Hisabati)',
          'adv-math': 'Advanced Mathematics',
          'history': 'History (Historia)',
          'geography': 'Geography (Jiografia)',
          'civics': 'Civics (Uraia)',
          'kiswahili': 'Kiswahili',
          'english': 'English Language (Kiingereza)',
          'commerce': 'Commerce (Biashara)',
          'bookkeeping': 'Book-keeping (Uhasibu)',
          'science': 'Science and Technology (Sayansi na Teknolojia)',
          'social-studies': 'Social Studies (Maarifa ya Jamii)',
          'civic-moral': 'Civic and Moral Education (Uraia na Maadili)',
          'mathematics': 'Mathematics (Hisabati)'
        };
        
        const levelCategory: Record<string, string> = {
          'std4': 'Primary School',
          'std7': 'Primary School',
          'f2': 'O-Level Secondary',
          'f4': 'O-Level Secondary',
          'f6': 'A-Level Secondary'
        };
        
        const subjectName = subjectNames[subjectCode] || subjectCode.charAt(0).toUpperCase() + subjectCode.slice(1);
        const levelName = levelNames[levelCode] || levelCode.toUpperCase();
        const categoryName = levelCategory[levelCode] || 'Past Papers';
        
        // Generate proper drive.google.com PDF URL
        // Example: https://drive.google.com/past-papers/csee/biology/Biology-1-2023.pdf
        const maktabaLevel = levelCode === 'std7' ? 'psle' :
                             levelCode === 'std4' ? 'sf' :
                             levelCode === 'f2' ? 'ftsee' :
                             levelCode === 'f4' ? 'csee' : 'acsee';
                             
        // Standardize subject folder on drive.google.com
        const maktabaSubject = subjectCode === 'basic-math' ? 'basic-math' :
                               subjectCode === 'adv-math' ? 'adv-math' :
                               subjectCode === 'kiswahili' ? 'kiswahili' :
                               subjectCode === 'english' ? 'english' : subjectCode;
                               
        // Capitalize subject name for file name
        let fileSubject = subjectCode === 'basic-math' ? 'Basic-Mathematics' :
                          subjectCode === 'adv-math' ? 'Advanced-Mathematics' :
                          subjectCode === 'kiswahili' ? 'Kiswahili' :
                          subjectCode === 'english' ? 'English-Language' :
                          subjectCode === 'science' ? 'Science-and-Technology' :
                          subjectCode === 'social-studies' ? 'Social-Studies' :
                          subjectCode === 'civic-moral' ? 'Civic-and-Moral-Education' :
                          subjectCode === 'mathematics' ? 'Mathematics' :
                          subjectCode.charAt(0).toUpperCase() + subjectCode.slice(1);
                          
        // CSEE & ACSEE usually have paper numbers
        let paperSuffix = '';
        if (levelCode === 'f4' || levelCode === 'f6') {
          if (!['basic-math', 'civics', 'kiswahili', 'bookkeeping'].includes(subjectCode)) {
            paperSuffix = '-1';
          }
        }
        
        const driveUrl = `https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/preview`;
        
        const dynamicDoc: DocumentMetadata = {
          id: documentId,
          title: `NECTA ${subjectName} - ${levelName} (${yearVal})`,
          description: `Karatasi rasmi ya mtihani wa taifa wa NECTA kwa somo la ${subjectName}, ngazi ya ${levelName} kwa mwaka wa ${yearVal}. Jibu maswali haya ili kujiandaa na mitihani yako ya mwisho.`,
          category: categoryName,
          tags: ['NECTA', subjectName, levelName, String(yearVal), 'Past Paper'],
          fileId: `necta-${levelCode}-${subjectCode}-${yearVal}`,
          driveUrl: driveUrl,
          uploadedBy: 'system',
          uploadedByName: 'NECTA Past Papers Library',
          createdAt: Date.now() - 3600000 * 24 * 30,
          views: Math.floor(Math.random() * 5000) + 1200,
          status: 'approved',
          paperNo: 'Paper 1',
          year: yearVal,
          type: 'NECTA',
          sizeKB: Math.floor(Math.random() * 200) + 150
        };
        
        setDoc(dynamicDoc);
        setLoading(false);
        return;
      }

      let fetched: DocumentMetadata[] = [];
      try {
        fetched = await fetchDocuments();
      } catch (err) {
        console.warn('Firestore fetch failed in ReaderView, falling back to local seed docs:', err);
      }

      let found = fetched.find(d => d.id === documentId);
      if (!found) {
        found = localSeedDocs.find(d => d.id === documentId);
      }
      
      if (found) {
        setDoc(found);
      } else {
        // Construct fallback document metadata dynamically so notes/documents never fail with error
        const cleanName = documentId ? documentId.replace(/[-_]/g, ' ') : 'Nyaraka za Mafunzo';
        const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        const fallbackDoc: DocumentMetadata = {
          id: documentId || 'doc-default',
          title: formattedTitle.includes('NECTA') || formattedTitle.includes('Mock') ? formattedTitle : `Notes: ${formattedTitle}`,
          description: 'Nyaraka ya mafunzo na maandalizi ya mitihani kutoka Lupanulla Elimu Hub.',
          category: 'Masomo ya Sekondari & Msingi',
          tags: ['Elimu', 'Notes', 'NECTA', 'Mitihani'],
          fileId: documentId || 'file-default',
          driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
          uploadedBy: 'system',
          uploadedByName: 'Lupanulla Admin',
          createdAt: Date.now() - 3600000 * 24,
          views: 350,
          status: 'approved',
          paperNo: 'Paper 1',
          year: 2026,
          type: 'Notes',
          sizeKB: 210
        };
        setDoc(fallbackDoc);
      }
    } catch (e) {
      console.error('Error loading document:', e);
      const cleanName = documentId ? documentId.replace(/[-_]/g, ' ') : 'Nyaraka za Mafunzo';
      const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      setDoc({
        id: documentId || 'doc-default',
        title: formattedTitle,
        description: 'Nyaraka ya mafunzo na maandalizi ya mitihani kutoka Lupanulla Elimu Hub.',
        category: 'Mitihani & Notes',
        tags: ['Elimu', 'Notes', 'NECTA', 'Mitihani'],
        fileId: documentId || 'file-default',
        driveUrl: 'https://docs.google.com/viewer?url=https://www.orimi.com/pdf-test.pdf&embedded=true',
        uploadedBy: 'system',
        uploadedByName: 'Lupanulla Admin',
        createdAt: Date.now(),
        views: 200,
        status: 'approved',
        paperNo: 'Paper 1',
        year: 2026,
        type: 'Notes',
        sizeKB: 200
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBookmark = async () => {
    if (!doc) return;
    
    if (!userProfile?.uid) {
      // Fallback to localStorage for guest
      const storedBookmarks = localStorage.getItem('lupa_bookmarks');
      let bookmarked: string[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      
      if (isBookmarked) {
        bookmarked = bookmarked.filter(id => id !== documentId);
        setIsBookmarked(false);
      } else {
        bookmarked.push(documentId);
        setIsBookmarked(true);
      }
      localStorage.setItem('lupa_bookmarks', JSON.stringify(bookmarked));
      return;
    }

    try {
      const result = await toggleBookmark(userProfile.uid, {
        id: doc.id,
        type: doc.type?.toLowerCase().includes('exam') ? 'exam' : 'document',
        title: doc.title
      });
      setIsBookmarked(result);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendCopyrightReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail || !reportDetails) return;

    try {
      setReportLoading(true);
      
      // 1. Submit feedback / report of type copyright_report
      await submitFeedback({
        userId: userProfile?.uid || 'anonymous',
        userName: userProfile?.name || 'Mripoti Hakimiliki',
        email: reportEmail,
        type: 'copyright_report',
        message: `HAKIMILIKI REPORT: Document [ID: ${doc?.id}] "${doc?.title}" imeripotiwa kwa ukiukaji wa hakimiliki na mtumiaji. Maelezo: ${reportDetails}`
      });

      // 2. Increment reportCount on the document, and if it exceeds e.g. 2, change status to pending or flagged for safety
      const currentReports = (doc?.reportCount || 0) + 1;
      const updates: any = {
        reportCount: currentReports,
      };

      // Auto-moderate for safety if reported multiple times (e.g. 3 reports hides it back to pending)
      if (currentReports >= 3) {
        updates.status = 'pending';
      }

      await updateDocument(documentId, updates);
      
      // Update local state as well
      if (doc) {
        setDoc({
          ...doc,
          ...updates
        });
      }

      setReportSuccess(true);
    } catch (err) {
      console.error('Failed to submit copyright report:', err);
      alert('Imeshindikana kuwasilisha ripoti. Tafadhali jaribu tena baada ya muda mfupi au wasiliana nasi moja kwa moja.');
    } finally {
      setReportLoading(false);
    }
  };

  const handleDownload = () => {
    const url = doc?.driveUrl || 'https://www.orimi.com/pdf-test.pdf';
    window.dispatchEvent(new CustomEvent('start-pdf-download', {
      detail: { 
        title: doc?.title || 'Faili la Lupanulla', 
        url: url 
      }
    }));
  };

  const generateOfflinePDF = () => {
    try {
      if (!doc) {
        alert('Nyaraka haikupatikana au bado inapakia!');
        return;
      }

      // Initialize jsPDF document (A4, Portrait, millimeters)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageHeight = pdf.internal.pageSize.getHeight(); // A4 is 297mm
      const pageWidth = pdf.internal.pageSize.getWidth(); // A4 is 210mm
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2); // 170mm

      let y = 20;

      // Helper to add headers/footers on each page
      const addHeaderFooter = (pageNum: number, totalPagesPlaceholder: string) => {
        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        
        // Header line and branding text
        pdf.text('LUPANULLA ELIMU HUB - Kitovu cha Elimu ya Kidijitali Tanzania', margin, 10);
        pdf.line(margin, 12, pageWidth - margin, 12);

        // Footer line and page numbering
        pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
        pdf.text(`Ukurasa ${pageNum}`, pageWidth - margin - 20, pageHeight - 10);
        pdf.text('Hati hii imetengenezwa na Lupanulla Elimu Hub kwa usomaji wa nje ya mtandao.', margin, pageHeight - 10);
      };

      // Helper to handle text wrapping and automatic pagination
      const printParagraph = (text: string, fontSize: number, style: 'normal' | 'bold' | 'italic' = 'normal', color: [number, number, number] = [51, 65, 85], spacingBefore = 4, spacingAfter = 4) => {
        pdf.setFont('Helvetica', style);
        pdf.setFontSize(fontSize);
        pdf.setTextColor(color[0], color[1], color[2]);

        const lines = pdf.splitTextToSize(text, contentWidth);
        const lineHeight = fontSize * 0.45; // Approx height per line in mm

        const blockHeight = spacingBefore + (lines.length * lineHeight) + spacingAfter;
        if (y + blockHeight > pageHeight - 20) {
          pdf.addPage();
          addHeaderFooter(pdf.getNumberOfPages(), '');
          y = 20; // reset vertical offset
        }

        y += spacingBefore;
        for (const line of lines) {
          pdf.text(line, margin, y);
          y += lineHeight;
        }
        y += spacingAfter;
      };

      // Draw beautiful page header branding
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(6, 182, 212); // cyan-500 color
      pdf.text('LUPANULLA ELIMU HUB', margin, y);
      y += 5;

      pdf.setFont('Helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139); // slate-500 color
      pdf.text('KIDIGITALI STUDY GUIDE & NOTES', margin, y);
      y += 8;

      pdf.setDrawColor(226, 232, 240); // slate-200 color
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 10;

      // Print Title of the document
      printParagraph(doc.title.toUpperCase(), 16, 'bold', [15, 23, 42], 2, 6);

      // Print Metadata: Subject, Category, Year, Type
      printParagraph(`Somo: ${doc.category || 'Mkuu'} | Mwaka: ${doc.year || 'N/A'} | Aina: ${doc.type || 'Necta'}`, 10, 'bold', [14, 116, 144], 2, 6);

      // Print Description if it exists
      if (doc.description) {
        printParagraph('Maelezo ya Nyaraka:', 11, 'bold', [71, 85, 105], 4, 2);
        printParagraph(doc.description, 10, 'italic', [100, 116, 139], 2, 8);
      }

      pdf.line(margin, y, pageWidth - margin, y);
      y += 8;

      // Smart Notes Header
      printParagraph('MUHTASARI WA SOMO NA MAELEZO MAHIRI (SMART NOTES)', 12, 'bold', [15, 23, 42], 4, 6);

      const notesText = smartNotes || `Sura ya Revision: ${doc.title}\n\n1. UTANGULIZI\nMada hii inahusu ${doc.category || 'Somo la Shule'}. Hapa mwanafunzi anapaswa kuelewa misingi ya ${doc.tags?.join(', ') || 'somo hili'}.\n\n2. MALENGO YA KUJIFUNZA\n- Kuelewa dhana kuu na mada muhimu za mitihani ya NECTA.\n- Kujenga uwezo wa kujibu maswali kwa ufasaha na kujiamini.\n- Kufanya mazoezi mfululizo kwa kutumia miongozo hii na kadi mahiri za Flashcards.`;
      
      const paragraphs = notesText.split('\n\n');

      for (const para of paragraphs) {
        if (!para.trim()) continue;

        // Check if paragraph is a heading or chapter
        if (para.startsWith('SURA') || para.startsWith('Sura') || para.startsWith('Chapter') || para.match(/^\d+\./)) {
          printParagraph(para, 12, 'bold', [15, 23, 42], 8, 4);
        } else {
          printParagraph(para, 10, 'normal', [51, 65, 85], 2, 4);
        }
      }

      // Append Private Notes if available
      const activePrivateNote = savedPrivateNote || privateNoteText;
      if (activePrivateNote && activePrivateNote.trim()) {
        if (y + 35 > pageHeight - 20) {
          pdf.addPage();
          addHeaderFooter(pdf.getNumberOfPages(), '');
          y = 20;
        } else {
          y += 5;
          pdf.line(margin, y, pageWidth - margin, y);
          y += 10;
        }

        printParagraph('DOKEZO LANGU BINAFSI (MY PRIVATE NOTE)', 12, 'bold', [217, 119, 6], 4, 6);
        
        const noteParas = activePrivateNote.split('\n\n');
        for (const p of noteParas) {
          if (!p.trim()) continue;
          printParagraph(p, 10, 'normal', [30, 41, 59], 2, 4);
        }
      }

      // Append Highlight Annotations if they exist
      if (highlights.length > 0) {
        if (y + 35 > pageHeight - 20) {
          pdf.addPage();
          addHeaderFooter(pdf.getNumberOfPages(), '');
          y = 20;
        } else {
          y += 5;
          pdf.line(margin, y, pageWidth - margin, y);
          y += 10;
        }

        printParagraph('HIGHLIGHTS NA TAFSIRI/DOKEZO ZANGU (MY ANNOTATIONS)', 12, 'bold', [6, 182, 212], 4, 6);

        for (const h of highlights) {
          printParagraph(`"${h.text}"`, 10, 'italic', [71, 85, 105], 3, 2);
          if (h.note) {
            printParagraph(`Dokezo langu: ${h.note}`, 9, 'bold', [14, 116, 144], 1, 3);
          }
          printParagraph(`Tarehe: ${new Date(h.createdAt).toLocaleDateString('sw-TZ')}`, 8, 'normal', [148, 163, 184], 1, 4);
        }
      }

      // Add Headers/Footers on all pages
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        addHeaderFooter(i, totalPages.toString());
      }

      // Save the generated PDF
      const sanitizedTitle = doc.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      pdf.save(`Lupanulla_${sanitizedTitle}_SmartNotes.pdf`);

      alert('🎉 Hati yako ya PDF imetengenezwa kwa ufanisi na imepakuliwa nje ya mtandao! Unaweza kuisoma wakati wowote bila kuwa na bando la internet.');

    } catch (err: any) {
      console.error('Error generating PDF:', err);
      alert('Imeshindwa kutengeneza PDF: ' + (err.message || err));
    }
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4"
      >
        {/* Upper Navigation Action Bar Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-28 h-9 bg-slate-200 rounded-xl animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-slate-200 rounded-xl animate-pulse" />
            <div className="w-32 h-9 bg-slate-200 rounded-xl animate-pulse" />
            <div className="w-9 h-9 bg-slate-200 rounded-xl animate-pulse" />
            <div className="w-32 h-9 bg-slate-200 rounded-xl animate-pulse" />
            <div className="w-32 h-9 bg-slate-200 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Tab Switcher Skeleton */}
        <div className="flex bg-slate-200/60 p-1 rounded-xl w-fit gap-2">
          <div className="w-44 h-8 bg-slate-300/80 rounded-lg animate-pulse" />
          <div className="w-44 h-8 bg-slate-200/80 rounded-lg animate-pulse" />
        </div>

        {/* Main Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Viewer Skeleton */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 min-h-[650px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Top status & progress header */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20"
                    >
                      <FileText size={22} className="text-cyan-400" />
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-cyan-300 tracking-wider">Lupanulla PDF Rendering Engine</span>
                        <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/30 font-bold">
                          Kasi Kubwa (HD)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">Inapakia na kutayarisha mtihani uliouchagua kwa ajili ya kusoma...</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                      Inapakia Mtihani...
                    </span>
                  </div>
                </div>

                {/* Detailed animated progress bar with motion shimmer */}
                <div className="space-y-2 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      Inatayarisha muundo wa kurasa za mtihani...
                    </span>
                    <span className="text-cyan-400 font-mono font-extrabold">92%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/50 relative">
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 h-full rounded-full relative overflow-hidden shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/25"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Simulated Paper Skeleton Canvas */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 flex-1 my-4 relative overflow-hidden">
                <div className="flex flex-col items-center justify-center space-y-3 pb-6 border-b border-slate-800/80">
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center shadow-lg"
                  >
                    <Sparkles size={24} className="text-cyan-400" />
                  </motion.div>
                  <div className="w-3/4 sm:w-1/2 h-5 bg-slate-800 rounded-lg animate-pulse" />
                  <div className="w-1/2 sm:w-1/3 h-3 bg-slate-800/60 rounded-md animate-pulse" />
                </div>

                {/* Fake Exam Section Lines */}
                <div className="space-y-4">
                  <div className="w-1/4 h-4 bg-cyan-900/40 rounded border border-cyan-800/30 animate-pulse" />
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-slate-800/80 rounded animate-pulse" />
                    <div className="w-11/12 h-3 bg-slate-800/80 rounded animate-pulse" />
                    <div className="w-4/5 h-3 bg-slate-800/60 rounded animate-pulse" />
                  </div>

                  <div className="w-1/3 h-4 bg-indigo-900/40 rounded border border-indigo-800/30 animate-pulse pt-2" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-slate-800/50 rounded-xl border border-slate-800 animate-pulse flex items-center justify-center text-slate-600 text-xs font-mono">
                      [Formula / Section Box]
                    </div>
                    <div className="h-20 bg-slate-800/50 rounded-xl border border-slate-800 animate-pulse flex items-center justify-center text-slate-600 text-xs font-mono">
                      [Diagram / Answer Box]
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Status Notice */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800/80 pt-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  Lupanulla Secure Document Engine (VERIFIED)
                </span>
                <span className="font-mono text-[11px] text-slate-500">Auto-Detecting Page Specs...</span>
              </div>
            </div>
          </div>

          {/* Right Side Panel Skeleton */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
              <div className="w-1/2 h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
              <div className="w-2/3 h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error || !doc) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md mx-auto py-16 space-y-4">
        <AlertCircle size={36} className="text-red-500 mx-auto" />
        <h3 className="font-bold text-slate-900 text-sm uppercase">Hitilafu Imetokea</h3>
        <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">{error || 'Imeshindwa kufungua nyaraka.'}</p>
        <button onClick={() => onNavigate('mitihani')} className="py-2 px-5 bg-slate-900 text-white font-bold text-xs rounded-xl">Rudi Kwenye Maktaba</button>
      </div>
    );
  }

  const isPremium = userProfile?.subscription === 'premium' || userProfile?.role === 'admin' || userProfile?.role === 'super_admin';

  return (
    <div 
      ref={readerRef}
      id="reader-view" 
      className={`animate-fade-in text-slate-800 transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-[9999] w-screen h-screen bg-slate-50 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6' 
          : 'space-y-6'
      }`}
    >
      {/* Continue Reading Notification Banner */}
      {showContinueBanner && savedProgress && savedProgress.scrollPosition > 50 && (
        <div className="bg-gradient-to-r from-cyan-950 via-indigo-950 to-slate-900 text-white p-4 rounded-2xl shadow-md border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30 shrink-0">
              <Compass size={20} className="animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-cyan-200 uppercase tracking-wider">
                  📖 Endelea Kusoma (Continue Reading)
                </span>
                <span className="bg-cyan-500/30 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/30 font-bold">
                  {savedProgress.scrollPercentage}% Tayari
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-0.5">
                Msimamo wako wa mwisho wa kusoma ulihifadhiwa mtandaoni kwa ufanisi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleRestoreScrollPosition()}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Check size={14} /> Rejea Ulipoishia
            </button>
            <button
              onClick={() => setShowContinueBanner(false)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs rounded-xl transition-all"
            >
              Ondoa
            </button>
          </div>
        </div>
      )}
      
      {/* Upper Navigation Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <button 
          onClick={() => onNavigate('mitihani')}
          className="text-slate-500 hover:text-slate-900 font-bold text-xs flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Rudi Kwenye Maktaba
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl border transition-all ${isBookmarked ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-slate-50 border-slate-150 text-slate-400 hover:text-slate-600'}`}
            title="Hifadhi"
          >
            <Bookmark size={15} className={isBookmarked ? 'fill-current' : ''} />
          </button>

          <button
            onClick={() => {
              setIsEditingPrivateNote(true);
              const el = document.getElementById('private-note-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => privateNoteInputRef.current?.focus(), 150);
            }}
            className="p-2 rounded-xl border bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 transition-all flex items-center gap-1 font-bold text-xs"
            title="Weka Dokezo Binafsi (Add/Edit Private Note)"
          >
            <StickyNote size={15} />
            <span className="hidden sm:inline">Dokezo Binafsi</span>
          </button>
          
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Kiungo cha ukurasa huu kimenakiliwa! Unaweza kuwashirikisha rafiki zako.');
            }}
            className="p-2 rounded-xl border bg-slate-50 border-slate-150 text-slate-400 hover:text-slate-600 transition-all"
            title="Shirikisha"
          >
            <Share2 size={15} />
          </button>

          {/* Fullscreen Button */}
          <button 
            onClick={toggleFullscreen}
            className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
              isFullscreen 
                ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-black shadow-sm' 
                : 'bg-slate-50 border-slate-150 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isFullscreen ? "Exit Fullscreen (Skrini Ndogo)" : "Soma kwa Skrini Nzima (Fullscreen)"}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          <button 
            onClick={handleDownload}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
              isPremium 
                ? 'bg-green-600 hover:bg-green-500 text-white' 
                : 'bg-amber-500 hover:bg-amber-400 text-amber-950'
            }`}
          >
            {isPremium ? (
              <>
                <Download size={14} /> Pakua PDF (Bure)
              </>
            ) : (
              <>
                <Lock size={14} /> Pakua (Premium)
              </>
            )}
          </button>

          <button 
            onClick={generateOfflinePDF}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white"
            title="Pakua muhtasari na highlights zako kama PDF ya kusoma offline"
          >
            <Sparkles size={14} className="text-amber-300" /> Pakua Notisi (PDF Offline)
          </button>

          <button 
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm bg-slate-900 hover:bg-slate-800 text-white border border-slate-700"
            title="Chapa au Hamisha Notisi hizi kwenda PDF kwa kutumia chombo cha chapa cha kivinjari (Browser Print)"
          >
            <Printer size={14} /> Chapa / Hamisha PDF
          </button>
        </div>
      </div>

      {/* Tab Switcher for Reader Mode */}
      <div className="flex bg-slate-200/60 p-1 rounded-xl w-fit gap-1 shadow-inner">
        <button
          onClick={() => handleToggleReaderMode('pdf')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            readerMode === 'pdf' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText size={14} /> Karatasi ya PDF (Original)
        </button>
        <button
          onClick={() => handleToggleReaderMode('notes')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            readerMode === 'notes' 
              ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles size={14} className={readerMode === 'notes' ? 'animate-pulse text-amber-300' : 'text-cyan-500'} /> Notisi Mahiri (Smart Notes)
        </button>
      </div>

      {/* Main Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Interactive Viewer/Reader area */}
        <div className="lg:col-span-3 space-y-4">
          {readerMode === 'pdf' ? (
            <div className="space-y-4">
              <PDFPreviewer 
                documentId={doc.id}
                documentTitle={doc.title}
                driveUrl={doc.driveUrl}
                category={doc.category}
                year={doc.year}
                type={doc.type}
                onSelectText={setSelectedText}
                onSwitchToNotes={() => handleToggleReaderMode('notes')}
              />
            </div>
          ) : (
            <div className={`border rounded-3xl p-6 sm:p-8 space-y-6 min-h-[600px] animate-fade-in transition-colors duration-300 ${notesThemeClasses[notesTheme]}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
                <div>
                  <h3 className="font-display font-extrabold text-base sm:text-lg uppercase flex items-center gap-2">
                    <Sparkles className="text-amber-500 animate-pulse" size={18} />
                    Notisi na Muhtasari wa Somo
                  </h3>
                  <p className="text-[10px] opacity-70 font-bold uppercase tracking-wider mt-0.5">Kitabu cha Dijitali &bull; Lupanulla Elimu Hub</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* Reading Themes Toolbar */}
                  <div className="flex items-center gap-1 bg-slate-900/10 p-1 rounded-xl border border-slate-900/10">
                    <span className="text-[9px] font-black uppercase px-1.5 opacity-60">Rangi:</span>
                    {(['ivory', 'light', 'sepia', 'dark'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setNotesTheme(t)}
                        className={`px-2 py-1 rounded-lg text-[9.5px] font-black uppercase transition-all flex items-center gap-1 ${
                          notesTheme === t
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        {t === 'ivory' && (
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFFDF5] border border-amber-300 inline-block shrink-0" />
                            <span>Ivory</span>
                          </span>
                        )}
                        {t === 'light' && <span>Mwanga</span>}
                        {t === 'sepia' && <span>Sepia</span>}
                        {t === 'dark' && <span>Giza</span>}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={generateOfflinePDF}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    title="Pakua notisi hizi kama faili la PDF kwa kusoma bila bando"
                  >
                    <Download size={13} /> Pakua (PDF)
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    title="Chapa au Hamisha Notisi hizi kwenda PDF"
                  >
                    <Printer size={13} /> Chapa
                  </button>
                </div>
              </div>

              {loadingSmartNotes ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-cyan-600">
                  <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-bold uppercase tracking-widest animate-pulse">AI Anatayarisha maelezo ya somo hili...</p>
                </div>
              ) : (
                <div 
                  className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 select-text"
                  onMouseUp={handleTextSelection}
                  onTouchEnd={handleTextSelection}
                >
                  {smartNotes.split('\n\n').map((para, idx) => renderParagraphWithHighlights(para, idx))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar: Details and related tags */}
        <div className="lg:col-span-1 space-y-6">
          {/* Add Private Note Widget for activeDocumentId */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3 animate-fade-in" id="private-note-section">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <StickyNote size={15} className="text-amber-500" />
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Dokezo Langu Binafsi</h4>
              </div>
              <span className="text-[9px] bg-amber-50 text-amber-700 font-extrabold px-2 py-0.5 rounded-full uppercase border border-amber-200/60">
                PRIVATE NOTE
              </span>
            </div>

            <p className="text-[10px] text-slate-500 leading-normal font-medium">
              Andika na uhifadhi dokezo au kumbukumbu zako binafsi kuhusu nyaraka hii kwenye akaunti yako.
            </p>

            {!isEditingPrivateNote && savedPrivateNote ? (
              <div
                onClick={() => {
                  setIsEditingPrivateNote(true);
                  setTimeout(() => privateNoteInputRef.current?.focus(), 80);
                }}
                className="bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200/90 hover:border-amber-300 rounded-2xl p-4 transition-all duration-200 cursor-pointer group relative shadow-xs space-y-2.5"
                title="Bonyeza hapa ili kubadilisha au kuhariri dokezo hili (Click to edit note)"
              >
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                  <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Pencil size={11} className="text-amber-600" />
                    Dokezo Lililohifadhiwa
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        generateOfflinePDF();
                      }}
                      className="text-[9px] bg-slate-900 text-white font-black px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-2xs"
                      title="Pakua notisi, dokezo na highlights kama PDF"
                    >
                      <Download size={10} />
                      PDF
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingPrivateNote(true);
                        setTimeout(() => privateNoteInputRef.current?.focus(), 80);
                      }}
                      className="text-[9px] bg-amber-200/80 text-amber-950 font-black px-2.5 py-1 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Edit3 size={10} />
                      Hariri
                    </button>
                  </div>
                </div>

                <div className="text-xs text-amber-950 font-medium leading-relaxed">
                  <MarkdownRenderer content={savedPrivateNote} />
                </div>

                <div className="pt-2 border-t border-amber-200/50 flex items-center justify-between text-[9.5px] text-amber-800 font-semibold group-hover:text-amber-950">
                  <span>Bonyeza hapa wakati wowote ili kufanya marekebisho.</span>
                  <span className="font-extrabold underline flex items-center gap-0.5">Badilisha &rarr;</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Lightweight Rich-Text Formatting Toolbar */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto text-slate-700">
                  <button
                    type="button"
                    onClick={() => applyNoteFormatting('**', '**')}
                    className="p-1.5 hover:bg-white hover:shadow-2xs rounded-lg text-slate-700 hover:text-amber-600 font-bold transition-all flex items-center justify-center"
                    title="Koleza (Bold) **maandishi**"
                  >
                    <Bold size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyNoteFormatting('*', '*')}
                    className="p-1.5 hover:bg-white hover:shadow-2xs rounded-lg text-slate-700 hover:text-amber-600 transition-all flex items-center justify-center"
                    title="Muinamo (Italic) *maandishi*"
                  >
                    <Italic size={13} />
                  </button>
                  <div className="h-4 w-px bg-slate-300 mx-0.5" />
                  <button
                    type="button"
                    onClick={() => applyNoteFormatting('### ')}
                    className="p-1.5 hover:bg-white hover:shadow-2xs rounded-lg text-slate-700 hover:text-amber-600 font-bold transition-all flex items-center justify-center"
                    title="Kichwa cha Habari (Heading 3)"
                  >
                    <Heading2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyNoteFormatting('- ')}
                    className="p-1.5 hover:bg-white hover:shadow-2xs rounded-lg text-slate-700 hover:text-amber-600 transition-all flex items-center justify-center"
                    title="Orodha ya Nukta (Bullet List)"
                  >
                    <List size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyNoteFormatting('1. ')}
                    className="p-1.5 hover:bg-white hover:shadow-2xs rounded-lg text-slate-700 hover:text-amber-600 transition-all flex items-center justify-center"
                    title="Orodha ya Namba (Numbered List)"
                  >
                    <ListOrdered size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyNoteFormatting('> ')}
                    className="p-1.5 hover:bg-white hover:shadow-2xs rounded-lg text-slate-700 hover:text-amber-600 transition-all flex items-center justify-center"
                    title="Nukuu (Quote)"
                  >
                    <Quote size={13} />
                  </button>
                  <div className="h-4 w-px bg-slate-300 mx-0.5" />
                  <button
                    type="button"
                    onClick={() => applyNoteFormatting('[Muhimu] ')}
                    className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-[9px] rounded-lg transition-all"
                    title="Tag Muhimu"
                  >
                    [Muhimu]
                  </button>
                </div>

                <textarea
                  ref={privateNoteInputRef}
                  rows={4}
                  value={privateNoteText}
                  onChange={(e) => setPrivateNoteText(e.target.value)}
                  placeholder="Andika dokezo au notisi yako binafsi hapa... Tumia vitufe vya juu kuongeza **Koleza**, *Muinamo*, au Orodha."
                  className="w-full text-xs font-medium p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 resize-none leading-relaxed"
                />
                {savedPrivateNote && (
                  <div className="flex items-center justify-between text-[10px] text-amber-700 font-semibold px-1">
                    <span className="flex items-center gap-1">
                      <Pencil size={11} className="text-amber-600" /> Unahariri dokezo lako lililopo
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPrivateNoteText(savedPrivateNote);
                        setIsEditingPrivateNote(false);
                      }}
                      className="text-slate-400 hover:text-slate-600 underline text-[9.5px]"
                    >
                      Ghairi (Cancel)
                    </button>
                  </div>
                )}
              </div>
            )}

            {privateNoteSavedMsg && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-bold rounded-xl flex items-center gap-2 animate-fade-in shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <span>Dokezo lako binafsi limehifadhiwa kikamilifu!</span>
              </div>
            )}

            <div className="flex items-center justify-between gap-2 pt-1">
              {privateNoteText || savedPrivateNote ? (
                <button
                  type="button"
                  onClick={async () => {
                    if (confirm('Je, una uhakika unataka kufuta dokezo hili binafsi?')) {
                      setPrivateNoteText('');
                      setSavedPrivateNote('');
                      setIsEditingPrivateNote(true);
                      if (userProfile?.uid) {
                        await saveUserPrivateNote(userProfile.uid, documentId, '');
                        if (userProfile.personalNotes) {
                          delete userProfile.personalNotes[documentId];
                        }
                      } else {
                        const stored = localStorage.getItem('lupa_private_notes');
                        if (stored) {
                          let parsed = JSON.parse(stored);
                          delete parsed[documentId];
                          localStorage.setItem('lupa_private_notes', JSON.stringify(parsed));
                        }
                      }
                    }
                  }}
                  className="px-2.5 py-2 text-slate-400 hover:text-red-500 text-[10px] font-bold uppercase transition-all"
                >
                  Futa Dokezo
                </button>
              ) : <div />}

              {isEditingPrivateNote && (
                <button
                  type="button"
                  onClick={handleSavePrivateNote}
                  disabled={savingPrivateNote}
                  className={`px-4 py-2 font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ml-auto ${
                    privateNoteSavedMsg
                      ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                      : 'bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950'
                  }`}
                >
                  {privateNoteSavedMsg ? (
                    <>
                      <Check size={14} className="stroke-[3] animate-bounce" />
                      <span>Saved! / Limehifadhiwa</span>
                    </>
                  ) : (
                    <>
                      <Save size={13} />
                      {savingPrivateNote ? 'Inahifadhi...' : savedPrivateNote ? 'Hifadhi Mabadiliko' : 'Hifadhi Dokezo'}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Highlighter / Annotation Widget when in Notes Mode or when text is selected */}
          {(readerMode === 'notes' || selectedText) && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-2.5">
                <Highlighter size={14} className="text-cyan-500" />
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Highlight & Annotate</h4>
              </div>

              {selectedText ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Maandishi Uliyochagua:</span>
                    <div className="bg-slate-50 border-l-4 border-cyan-500 p-2.5 rounded-r-xl max-h-24 overflow-y-auto text-xs text-slate-600 font-semibold italic">
                      "{selectedText}"
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Rangi ya Highlighter:</span>
                    <div className="flex gap-2">
                      {[
                        { id: 'bg-yellow-100 text-yellow-900 border-yellow-300', colorClass: 'bg-yellow-200 border-yellow-400' },
                        { id: 'bg-emerald-100 text-emerald-900 border-emerald-300', colorClass: 'bg-emerald-200 border-emerald-400' },
                        { id: 'bg-cyan-100 text-cyan-900 border-cyan-300', colorClass: 'bg-cyan-200 border-cyan-400' },
                        { id: 'bg-rose-100 text-rose-900 border-rose-300', colorClass: 'bg-rose-200 border-rose-400' },
                      ].map(c => (
                        <button
                          key={c.id}
                          onClick={() => setHighlightColor(c.id)}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            highlightColor === c.id ? 'scale-110 shadow-sm ring-2 ring-slate-900/10 border-slate-900' : 'opacity-70 hover:opacity-100 border-transparent'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full ${c.colorClass.split(' ')[0]}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Ongeza Nota/Maelezo Fupi:</span>
                    <input
                      type="text"
                      placeholder="Mf. Neno hili linaulizwa sana..."
                      value={highlightNote}
                      onChange={e => setHighlightNote(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSaveHighlight}
                      disabled={savingHighlight}
                      className="flex-grow py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Plus size={13} />
                      {savingHighlight ? 'Inahifadhi...' : 'Hifadhi Highlight'}
                    </button>
                    <button
                      onClick={() => setSelectedText('')}
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-extrabold uppercase transition-all"
                    >
                      Ghairi
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center space-y-2">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <Highlighter size={16} />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold leading-relaxed max-w-[180px] mx-auto uppercase tracking-wide">
                    CHAGUA MAANDISHI KATIKA NOTISI ILI KUWEKA HIGHLIGHT!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Highlights List inside Document */}
          {highlights.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">Highlight Zangu ({highlights.length})</span>
                <span className="text-[8px] bg-cyan-100 text-cyan-800 font-extrabold px-2 py-0.5 rounded-full uppercase">SALAMA</span>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {highlights.map(h => (
                  <div key={h.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl relative group space-y-1.5">
                    <button
                      onClick={() => handleDeleteHighlight(h.id)}
                      className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Futa Highlight"
                    >
                      <Trash2 size={12} />
                    </button>
                    <div className={`${h.color.split(' ')[0]} p-1 px-1.5 rounded text-[10px] font-semibold text-slate-800 italic leading-snug line-clamp-3`}>
                      "{h.text}"
                    </div>
                    {h.note && (
                      <p className="text-[10px] text-slate-600 font-semibold bg-white border border-slate-200/60 p-1.5 px-2 rounded-lg flex items-start gap-1">
                        <span className="text-cyan-500">📝</span> {h.note}
                      </p>
                    )}
                    <span className="text-[8px] text-slate-400 font-semibold block uppercase">
                      {new Date(h.createdAt).toLocaleDateString('sw-TZ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <span className="text-[10px] bg-cyan-50 border border-cyan-100 text-cyan-700 font-extrabold px-2.5 py-0.5 rounded-full uppercase block w-fit">
              {doc.type || 'NECTA'} &bull; {doc.year || 2024}
            </span>
            <h2 className="font-display font-extrabold text-slate-950 text-base sm:text-lg leading-tight uppercase">{doc.title}</h2>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold">{doc.description}</p>
            
            <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs font-semibold text-slate-500">
              <div className="flex justify-between"><span>Mada:</span> <span className="font-bold text-slate-950">{doc.category}</span></div>
              <div className="flex justify-between"><span>Ukubwa wa faili:</span> <span className="font-bold text-slate-950">{doc.sizeKB || 150} KB</span></div>
              <div className="flex justify-between"><span>Views:</span> <span className="font-bold text-slate-950">{doc.views + 1} views</span></div>
              <div className="flex justify-between"><span>Mchapishaji:</span> <span className="font-bold text-slate-950">{doc.uploadedByName || 'Lupanulla'}</span></div>
              {doc.sourceName && (
                <div className="flex justify-between">
                  <span>Chanzo Halisi:</span> 
                  <span className="font-bold text-cyan-700">
                    {doc.sourceUrl ? (
                      <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                        {doc.sourceName} ↗
                      </a>
                    ) : (
                      doc.sourceName
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Copyright Notice and Report Infringement trigger */}
          <div className="bg-amber-50/40 border border-amber-200/50 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-start gap-1.5 text-[10.5px] text-amber-800 font-bold leading-normal">
              <ShieldAlert size={15} className="mt-0.5 flex-shrink-0 text-amber-600" />
              <div>
                Je, wewe ni mmiliki wa nyaraka hii na unataka iondolewe? Lupanulla inaheshimu hakimiliki na kufuata miongozo ya DMCA/Safe Harbor.
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setReportEmail(userProfile?.email || '');
                setReportDetails('');
                setReportSuccess(false);
                setIsReportingOpen(true);
              }}
              className="w-full py-2 bg-amber-600/10 hover:bg-amber-600/20 text-amber-800 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-amber-200/40"
            >
              Ripoti Ukiukaji wa Hakimiliki (DMCA)
            </button>
          </div>

          {/* Flashcard Generation CTA */}
          <div className="bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-3xl p-5 shadow-md text-white space-y-3 border border-cyan-500/20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Brain size={16} className="text-cyan-200" />
              </div>
              <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">Mazoezi ya Flashcards</h4>
            </div>
            <p className="text-white/80 text-[10px] leading-relaxed font-semibold">
              Soma kwa makini kisha jipime uelewa wako! Bofya hapa chini ili kutengeneza kadi mahiri za kujisomea kwa msaada wa Lupanulla AI.
            </p>
            <button
              onClick={() => setIsFlashcardsOpen(true)}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-indigo-950 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-500 animate-pulse" />
              Tengeneza Flashcards
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase">Lebo za Somo (Tags)</h4>
            <div className="flex flex-wrap gap-1.5">
              {(doc.tags || []).map(t => (
                <span key={t} className="text-[10px] bg-slate-50 border border-slate-150 text-slate-500 font-bold px-2 py-0.5 rounded">#{t}</span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Printable Document Container (Only visible during print) */}
      <div className="hidden print:block print-only-container">
        <div className="border-b-2 border-slate-300 pb-4 flex justify-between items-end">
          <div>
            <span className="text-xs font-black tracking-widest text-cyan-600">LUPANULLA ELIMU HUB</span>
            <h1 className="text-2xl font-black mt-1 uppercase">{doc.title}</h1>
          </div>
          <div className="text-right text-xs text-slate-400 font-semibold">
            <div>{doc.category || 'Mada ya Masomo'}</div>
            <div>{doc.year ? `Mwaka: ${doc.year}` : ''} &bull; {doc.type || 'NECTA'}</div>
          </div>
        </div>

        {doc.description && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs italic text-slate-600 mt-4">
            <strong>Maelezo ya Nyaraka:</strong> {doc.description}
          </div>
        )}

        <div className="space-y-6 mt-6">
          <h2 className="text-lg font-black border-b border-slate-200 pb-1.5 uppercase text-slate-800">
            Muhtasari wa Somo na Notisi Mahiri (Smart Notes)
          </h2>
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
            {(smartNotes || `Sura ya Revision: ${doc.title}\n\nNotisi bado zinatayarishwa na mfumo wa AI...`).split('\n\n').map((para, idx) => {
              if (para.startsWith('SURA') || para.startsWith('Sura') || para.startsWith('Chapter') || para.match(/^\d+\./)) {
                return (
                  <h3 key={idx} className="font-bold text-slate-900 text-sm sm:text-base pt-3 border-b pb-1 border-slate-100 uppercase tracking-tight">
                    {para}
                  </h3>
                );
              }
              return (
                <p key={idx} className="text-slate-700 whitespace-pre-line">
                  {para}
                </p>
              );
            })}
          </div>
        </div>

        {highlights.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200 mt-8">
            <h2 className="text-lg font-black border-b border-slate-200 pb-1.5 uppercase text-slate-800">
              Vipengele Muhimu Vilivyowekewa Alama (Highlights & Notes)
            </h2>
            <div className="space-y-4">
              {highlights.map((h, idx) => (
                <div key={h.id || idx} className="border-l-4 border-cyan-500 pl-4 py-1 space-y-1">
                  <p className="text-xs sm:text-sm italic text-slate-700 font-medium">"{h.text}"</p>
                  {h.note && (
                    <p className="text-xs font-bold text-cyan-700">
                      📝 Maelezo yangu: {h.note}
                    </p>
                  )}
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                    Imehifadhiwa: {new Date(h.createdAt).toLocaleDateString('sw-TZ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-slate-200 pt-6 mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Hati hii imetengenezwa na Lupanulla Elimu Hub. © {new Date().getFullYear()} Lupanulla Elimu Hub. Haki zote zimehifadhiwa.
        </div>
      </div>

      <FlashcardsModal 
        doc={doc} 
        isOpen={isFlashcardsOpen} 
        onClose={() => setIsFlashcardsOpen(false)} 
      />

      {/* Copyright Report Modal */}
      {isReportingOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[10000] animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-md w-full space-y-4 animate-scale-up">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shadow-inner">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-slate-950 text-sm uppercase">Ripoti ya Hakimiliki (DMCA)</h3>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Lupanulla Content Safety & Safe Harbor</p>
              </div>
            </div>

            {reportSuccess ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Check size={24} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs uppercase">Ripoti Imewasilishwa!</h4>
                  <p className="text-slate-500 text-[10.5px] leading-relaxed max-w-xs mx-auto font-medium">
                    Asante kwa taarifa yako. Timu yetu ya usalama inakagua ripoti hii ndani ya masaa 24 na kuchukua hatua za haraka, ikiwemo kuondoa nyenzo hii ikiwa inakiuka masharti.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReportingOpen(false)}
                  className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Funga Dirisha
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendCopyrightReport} className="space-y-4">
                <p className="text-[11px] text-slate-550 leading-relaxed font-semibold">
                  Tafadhali weka taarifa zako na maelezo ya hakimiliki yako ili tuweze kuthibitisha na kuondoa nyaraka hii mara moja ikiwa inakiuka haki zako.
                </p>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Barua Pepe Yako (Email)</label>
                  <input
                    type="email"
                    required
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    placeholder="mfano@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Maelezo ya Ukiukaji (Claim Details)</label>
                  <textarea
                    required
                    rows={4}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Tafadhali eleza kwa kina jinsi faili hili linavyokiuka hakimiliki yako au mali yako..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReportingOpen(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-500 font-bold text-[10.5px] uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Ghairi (Cancel)
                  </button>
                  <button
                    type="submit"
                    disabled={reportLoading}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-[10.5px] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-600/15 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {reportLoading ? 'Inawasilisha...' : 'Ripoti (Submit)'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Print-Specific Dedicated Layout for Student Notes */}
      <div className="hidden print:block print-only-container p-6 bg-white text-slate-900 font-sans">
        {/* Printable Header with Branding */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-black text-slate-900 tracking-tight uppercase">
              Lupanulla Elimu Hub
            </h1>
            <p className="text-xs font-bold text-cyan-700 tracking-wider uppercase mt-0.5">
              Kitovu cha Elimu ya Kidijitali Tanzania &bull; www.lupanulla.co.tz
            </p>
          </div>
          <div className="text-right text-[10px] text-slate-500 font-bold uppercase">
            <p>Tarehe ya Kuchapa: {new Date().toLocaleDateString('sw-TZ')}</p>
            <p>Hati Rasmi ya Kujisomea</p>
          </div>
        </div>

        {/* Document Title & Meta Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-extrabold text-slate-900 mb-2">{doc?.title}</h2>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
            <p><strong className="text-slate-900">Somo / Mada:</strong> {doc?.category || 'General'}</p>
            <p><strong className="text-slate-900">Aina ya Hati:</strong> {doc?.type || 'Notisi za Somo'}</p>
            <p><strong className="text-slate-900">Mwaka:</strong> {doc?.year || '2026'}</p>
            <p><strong className="text-slate-900">Mchapishaji:</strong> {doc?.uploadedByName || 'Lupanulla Academic Team'}</p>
          </div>
          {doc?.description && (
            <div className="mt-3 pt-2 border-t border-slate-200 text-xs italic text-slate-700">
              <strong>Muhtasari:</strong> {doc.description}
            </div>
          )}
        </div>

        {/* Main Notes Content */}
        <div className="space-y-4 mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
            Muhtasari na Notisi za Somo (Smart Notes)
          </h2>
          {(smartNotes || doc?.description || 'Notisi hazikupatikana.').split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-sm leading-relaxed text-slate-800 text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Student Private Note (If available) */}
        {(savedPrivateNote || privateNoteText) && (
          <div className="mb-8 page-break-inside-avoid bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-950 border-b border-amber-200 pb-1 mb-2">
              Dokezo Langu Binafsi (My Private Note)
            </h2>
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-line">
              {savedPrivateNote || privateNoteText}
            </div>
          </div>
        )}

        {/* Student Highlights & Annotations (If available) */}
        {highlights.length > 0 && (
          <div className="mb-8 page-break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Highlight na Dokezo za Mwanafunzi ({highlights.length})
            </h2>
            <div className="space-y-3">
              {highlights.map((h, i) => (
                <div key={i} className="highlight-item bg-amber-50/80 border-l-4 border-amber-500 p-3 text-xs rounded-r-md">
                  <p className="font-semibold italic text-slate-900">"{h.text}"</p>
                  {h.note && (
                    <p className="mt-1 font-bold text-cyan-800">Dokezo langu: {h.note}</p>
                  )}
                  <p className="mt-1 text-[9px] text-slate-500 font-mono">
                    Hifadhi: {new Date(h.createdAt).toLocaleDateString('sw-TZ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Print Footer */}
        <div className="border-t border-slate-300 pt-4 mt-8 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase">
          <p>&copy; {new Date().getFullYear()} Lupanulla Elimu Hub. Haki zote zimehifadhiwa.</p>
          <p>www.lupanulla.co.tz</p>
        </div>
      </div>

      {/* Floating Saved Toast Notification */}
      {privateNoteSavedMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 backdrop-blur-md animate-bounce-short">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-md">
            <Check size={16} className="stroke-[3]" />
          </div>
          <div className="flex flex-col pr-1">
            <span className="text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider">Limehifadhiwa! / Saved!</span>
            <span className="text-slate-300 text-[10px] font-medium">Dokezo lako binafsi limehifadhiwa kwenye akaunti yako.</span>
          </div>
        </div>
      )}

    </div>
  );
}

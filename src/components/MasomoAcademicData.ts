export interface Topic {
  title: string;
  subtopics: string[];
  content: string;
  notesSample: string;
  isDownloadable?: boolean;
}

export interface ClassLevel {
  id: string;
  name: string;
  subjects: {
    name: string;
    topics: Topic[];
  }[];
}

export const academicData: ClassLevel[] = [
  {
    id: 'msingi',
    name: 'Elimu ya Msingi (TIE Curriculum - Darasa 5-7)',
    subjects: [
      {
        name: 'Hisabati (Mathematics)',
        topics: [
          {
            title: 'Chapter 1: Namba Nzima na Sehemu',
            isDownloadable: true,
            subtopics: [
              'Ufafanuzi wa sehemu (proper, improper and mixed fractions)',
              'Kubadili sehemu kuwa desimali na kinyume chake',
              'Kujumlisha na kutoa sehemu zenye asili tofauti',
              'Kuzidisha na kugawanya sehemu za hisabati'
            ],
            content: 'Namba nzima na sehemu ni msingi wa hisabati zote. Katika mada hii utajifunza jinsi ya kubadili sehemu kuwa desimali, kujumlisha na kutoa sehemu zenye asili tofauti na kutumia kanuni ya BODMAS.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Hisabati\nKiwango: Darasa la 5 - 7\nMada: Namba Nzima na Sehemu\n\n1. SEHEMU ZINAZOFANANA NA ZISIZOFANANA\n- Sehemu yenye asili moja (e.g. 1/5 na 3/5) ni rahisi kujumlisha: 1/5 + 3/5 = 4/5.\n- Sehemu zenye asili tofauti (e.g. 1/2 na 1/3) lazima utafute BKM (LCM) ya asili kabla ya kujumlisha: BKM ya 2 na 3 ni 6. Hivyo, 3/6 + 2/6 = 5/6.\n\n2. KUBADILISHA SEHEMU KUWA DESIMALI\nIli kubadili 3/4 kuwa desimali, gawanya 3 kwa 4 kupata 0.75.'
          },
          {
            title: 'Chapter 2: Jiometri na Vipimo (Geometry & Measurements)',
            isDownloadable: true,
            subtopics: [
              'Pembe za maumbo (Angles - Right, Acute, Obtuse)',
              'Kutafuta mzingo na eneo la mraba, mstatili na duara',
              'Vipimo vya urefu, uzito na ujazo (m, kg, liters)'
            ],
            content: 'Jiometri inahusika na maumbo, ukubwa, na nafasi. Katika mada hii utajifunza jinsi ya kukokotoa eneo na mzingo wa maumbo mbalimbali.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Hisabati\nKiwango: Darasa la 5 - 7\nMada: Jiometri na Vipimo\n\n1. KUTAFUTA ENEO LA DUARA\nFormula: Eneo = π × r² (ambapo π = 22/7 au 3.14).\n\n2. MZINGO WA MSTATILI\nFormula: Mzingo = 2 × (Urefu + Upana).'
          },
          {
            title: 'Chapter 3: Asilimia, Uwiano na Aljebra',
            isDownloadable: true,
            subtopics: [
              'Kutafuta asilimia ya namba na faida/hasara',
              'Uwiano na uwiano sawia katika maisha ya kila siku',
              'Kutatua mlinganyo wa shahada ya kwanza wa aljebra (x + 5 = 12)'
            ],
            content: 'Asilimia inawakilisha sehemu katika mia moja. Katika mada hii utajifunza jinsi ya kukokotoa faida, hasara, riba rahisi na kutatua misemo ya aljebra.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Hisabati\nKiwango: Darasa la 5 - 7\nMada: Asilimia na Uwiano\n\n1. KUTAFUTA ASILIMIA YA NAMBA\nMfano: Tafuta 20% ya 500.\nNjia: (20 / 100) × 500 = 100.\n\n2. RIBA RAHISI (SIMPLE INTEREST)\nFormula: Riba (I) = (Mtaji (P) × Kiwango (R) × Muda (T)) / 100.'
          },
          {
            title: 'Chapter 4: Takwimu na Chati (Statistics)',
            isDownloadable: true,
            subtopics: [
              'Kusoma na kutafsiri chati za nguzo na duara (Pie Charts)',
              'Kutafuta wastani (Mean), Namba ya Kati (Median) na Mstari (Mode)',
              'Ukusanyaji na uwekaji wa takwimu kwa takwimu za shule'
            ],
            content: 'Takwimu ni maelezo ya namba yanayokusanywa na kupangwa ili kutoa ujumbe rasmi. Utajifunza chati za nguzo na kukokotoa wastani wa alama.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Hisabati\nKiwango: Darasa la 5 - 7\nMada: Takwimu\n\n1. WASTANI (MEAN)\nWastani = Jumla ya namba zote ÷ Idadi ya namba hizo.\nMfano: Wastani wa 10, 12, na 14 ni (10 + 12 + 14) / 3 = 36 / 3 = 12.'
          }
        ]
      },
      {
        name: 'Sayansi na Teknolojia (Science & Tech)',
        topics: [
          {
            title: 'Chapter 1: MFUMO WA CHAKULA NA MMENYUKO (Digestive System)',
            isDownloadable: true,
            subtopics: [
              'Sehemu za mfumo wa chakula (Mdomo, Umio, Tumbo, Utumbo)',
              'Enzymes na kazi zake katika mmenyuko wa chakula',
              'Magonjwa yanayoathiri mfumo wa chakula na kinga zake'
            ],
            content: 'Mfumo wa mmenyuko wa chakula ni mchakato wa kubadilisha chakula kuwa virutubisho vinavyoweza kutumiwa na mwili.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Sayansi na Teknolojia\nKiwango: Darasa la 5 - 7\nMada: Mfumo wa Chakula na Mmenyuko\n\n1. HATUA ZA MMENYUKO WA CHAKULA\na) Mdomoni: Chakula kinatafunwa na kuchanganywa na mate yenye enzyme ya Salivary Amylase (Ptyalin) inayovunja wanga kuwa sukari rahisi (Maltose).\nb) Tumboni: Asidi ya Hydrochloric (HCl) inaua bakteria na kutengeneza mazingira ya enzyme ya Pepsin kuvunja protini.'
          },
          {
            title: 'Chapter 2: NISHATI NA MABADILIKO YAKE (Energy)',
            isDownloadable: true,
            subtopics: [
              'Aina za nishati (Nuru, Joto, Umeme, Sauti)',
              'Sheria ya hifadhi ya nishati (Law of Conservation of Energy)',
              'Mzunguko wa umeme (Electric circuits)'
            ],
            content: 'Nishati ni uwezo wa kufanya kazi. Nishati haitengenezwi wala kuharibiwa bali inabadilishwa kutoka aina moja kwenda nyingine.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Sayansi na Teknolojia\nKiwango: Darasa la 5 - 7\nMada: Nishati na Mabadiliko Yake\n\n1. SHERIA YA HIFADHI YA NISHATI\nNishati haiwezi kuundwa au kuharibiwa, bali inabadilika kutoka mfumo mmoja hadi mwingine. Kwa mfano: Tochi inabadilisha nishati ya kemikali (betri) kuwa umeme na kisha kuwa nuru na joto.'
          },
          {
            title: 'Chapter 3: Viumbe Hai, Seli na Mazingira',
            isDownloadable: true,
            subtopics: [
              'Tabia za viumbe hai (Kukua, Kuhema, Kujilisha, Kuzaliana)',
              'Muundo wa seli ya mmea na seli ya mnyama',
              'Mfumo wa ikolojia (Ecosystem) na utunzaji wa mazingira'
            ],
            content: 'Seli ni kitengo cha msingi cha uhai cha kila kiumbe hai. Mada hii inalinganisha seli za mimea na wanyama na inaeleza mzunguko wa virutubisho.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Sayansi na Teknolojia\nKiwango: Darasa la 5 - 7\nMada: Seli na Mazingira\n\n1. SELI YA MMEA VS SELI YA MNYAMA\n- Seli ya mmea ina ukuta wa seli (cell wall) na kiloroplasti (chloroplast) inayosaidia sanisi-nuru (photosynthesis).\n- Seli ya mnyama haina ukuta wa seli wala kiloroplasti.'
          },
          {
            title: 'Chapter 4: Mfumo wa Mzunguko wa Damu na Upumuaji',
            isDownloadable: true,
            subtopics: [
              'Moyo na mishipa ya damu (Arteries, Veins, Capillaries)',
              'Seli za damu: Nyekundu, Nyeupe, na Bamba la Damu (Platelets)',
              'Mapafu na mchakato wa ubadilishanaji wa gesi'
            ],
            content: 'Damu inasafirisha oksijeni na virutubisho mwilini kote kwa usaidizi wa moyo na mapafu.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Sayansi na Teknolojia\nKiwango: Darasa la 5 - 7\nMada: Mzunguko wa Damu\n\n1. SELI ZA DAMU NA KAZI ZAKE\n- Seli Nyekundu (RBC): Zina hemoglobin inayosafirisha oksijeni.\n- Seli Nyeupe (WBC): Zinapambana na magonjwa na kuilinda mwili.'
          }
        ]
      },
      {
        name: 'Maarifa ya Jamii (Social Studies)',
        topics: [
          {
            title: 'Chapter 1: Mashujaa wa Afrika na Mapambano dhidi ya Ukoloni',
            isDownloadable: true,
            subtopics: [
              'Mazingira ya Afrika kabla ya ukoloni',
              'Upinzani wa majimaji (Majimaji War 1905-1907)',
              'Mashujaa mfano Kinjeketile Ngwale, Mkwawa na Isike'
            ],
            content: 'Mapambano dhidi ya ukoloni yaliongozwa na mashujaa mbalimbali wa Afrika waliokataa utawala wa mabavu wa kijerumani na kiingereza.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Maarifa ya Jamii\nKiwango: Darasa la 5 - 7\nMada: Mashujaa wa Afrika na Mapambano dhidi ya Ukoloni\n\n1. VITA YA MAJIMAJI (1905 - 1907)\n- Iliongozwa na Kinjeketile Ngwale kusini mwa Tanganyika.\n- Sababu kuu: Mateso ya Wajerumani, kodi kubwa, na kulazimishwa kulima pamba.\n- Kinjeketile alitumia maji ya miujiza akiamini yangebadilisha risasi za Wajerumani kuwa maji.'
          },
          {
            title: 'Chapter 2: Jiografia ya Tanzania na Ramani',
            isDownloadable: true,
            subtopics: [
              'Maziwa makubwa, milima na mito ya Tanzania',
              'Kusoma ramani: Dira, Mizani na Alama za Ramani',
              'Hali ya hewa na kanda za kilimo nchini Tanzania'
            ],
            content: 'Tanzania imebarikiwa na maziwa makubwa kama Victoria, Tanganyika na Nyasa, pamoja na Mlima Kilimanjaro ambao ni mrefu kuliko yote Afrika.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Maarifa ya Jamii\nKiwango: Darasa la 5 - 7\nMada: Jiografia ya Tanzania\n\n1. MILIMA NA MAZIWA\n- Mlima Kilimanjaro (mita 5,895) ndio mlima mrefu zaidi Afrika.\n- Ziwa Victoria ndilo ziwa kubwa zaidi la maji baridi Afrika.'
          },
          {
            title: 'Chapter 3: Historia ya Tanganyika na Muungano wa 1964',
            isDownloadable: true,
            subtopics: [
              'Uhuru wa Tanganyika tarehe 9 Disemba 1961',
              'Mapinduzi Matukufu ya Zanzibar tarehe 12 Jan 1964',
              'Muungano wa Tanganyika na Zanzibar tarehe 26 Aprili 1964'
            ],
            content: 'Mwalimu Julius Kambarage Nyerere na Sheikh Abeid Amani Karume waliunganisha Tanganyika na Zanzibar kuunda Jamhuri ya Muungano wa Tanzania.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Maarifa ya Jamii\nKiwango: Darasa la 5 - 7\nMada: Muungano wa Tanzania\n\n1. TAREHE MUHIMU ZA KITAIFA\n- 9 Disemba 1961: Uhuru wa Tanganyika.\n- 12 Januari 1964: Mapinduzi ya Zanzibar.\n- 26 Aprili 1964: Muungano wa Tanganyika na Zanzibar kuunda TANZANIA.'
          }
        ]
      },
      {
        name: 'Kiswahili',
        topics: [
          {
            title: 'Aina za Maneno na Matumizi Yake katika Sentensi',
            isDownloadable: true,
            subtopics: [
              'Nomino (N), Viwakilishi (W), Vivumishi (V)',
              'Vitenzi (T) na Viunganishi (U)',
              'Mnyambuliko wa vitenzi (Nyakati na Hali)'
            ],
            content: 'Kiswahili kina aina nane kuu za maneno. Katika mada hii utajifunza jinsi ya kutambua na kutumia aina hizi katika ujenzi wa sentensi sahihi.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Kiswahili\nKiwango: Darasa la 5 - 7\nMada: Aina za Maneno\n\n1. NOMINO (N)\nManeno yanayotaja maji, watu, mahali au vitu. Mfano: Juma, Morogoro, Kitabu, Amani.\n\n2. VITENZI (T)\nManeno yanayoeleza tendo linalofanyika. Mfano: Anasoma, Wanakimbia, Amekula.'
          },
          {
            title: 'Ufahamu, Ufupisho na Insha za Swahili',
            isDownloadable: true,
            subtopics: [
              'Kusoma kifungu cha habari na kujibu maswali kwa ufasaha',
              'Mbinu za kufupisha habari bila kupoteza maana kuu',
              'Uandishi wa insha za maelezo, hoja na barua rasmi'
            ],
            content: 'Ufahamu unamwezesha mwanafunzi kuelewa ujumbe wa maandishi na kujibu maswali sahihi.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Kiswahili\nKiwango: Darasa la 5 - 7\nMada: Uandishi wa Insha na Ufahamu\n\n1. KANUNI ZA UFUPISHO\n- Soma kifungu kwa umakini mara mbili.\n- Ondoa mifano, maneno ya ziada na maelezo marefu.\n- Andika mawazo makuu pekee kwa kutumia maneno yako mwenyewe.'
          },
          {
            title: 'Fasihi Simulizi, Methali, Misemo na Nahau',
            isDownloadable: true,
            subtopics: [
              'Maana na matumizi ya methali za Kiswahili',
              'Nahau na Misemo inayotumika katika mawasiliano',
              'Aina za Fasihi Simulizi: Hadithi, Tarihi, na Vitendawili'
            ],
            content: 'Methali ni semi za hekima zenye maana ya ndani na mafunzo kwa jamii.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Kiswahili\nKiwango: Darasa la 5 - 7\nMada: Methali na Nahau\n\n1. METHALI ZA KISWAHILI NA MAANA ZAKE\n- "Usipoziba ufa utajenga ukuta": Sahihisha kosa dogo haraka kabla halijawa tatizo kubwa.\n- "Haraka haraka haina baraka": Kufanya mambo kwa kukurupuka huleta hasara.'
          }
        ]
      },
      {
        name: 'English Language',
        topics: [
          {
            title: 'Tenses and Grammar Mastery (Present, Past, Future)',
            isDownloadable: true,
            subtopics: [
              'Simple Present Tense and Present Continuous',
              'Simple Past Tense and Past Perfect',
              'Future Tenses and Expressing Intentions'
            ],
            content: 'Mastering tenses is essential for clear communication in English speaking and writing.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: English Language\nLevel: Primary School (Std 5-7)\nTopic: Tenses & Grammar\n\n1. PRESENT CONTINUOUS TENSE\nUsed for actions happening right now. Formula: Subject + am/is/are + Verb(-ing).\nExample: "The student is reading a science book."'
          },
          {
            title: 'Comprehension, Vocabulary & Composition',
            isDownloadable: true,
            subtopics: [
              'Reading comprehension passage strategies',
              'Synonyms, Antonyms, and Homophones',
              'Friendly and Official Letter Writing Formats'
            ],
            content: 'Learn vocabulary skills, letter formats, and techniques for answering passage comprehension questions accurately.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: English Language\nLevel: Primary School (Std 5-7)\nTopic: Composition & Letter Writing\n\n1. OFFICIAL LETTER FORMAT\n- Sender Address\n- Date\n- Receiver Address\n- Salutation ("Dear Sir/Madam")\n- Subject Line (RE: APPLICATION FOR...)\n- Body Paragraphs\n- Conclusion ("Yours faithfully")'
          }
        ]
      },
      {
        name: 'Uraia na Maadili (Civics & Ethics)',
        topics: [
          {
            title: 'Alama za Taifa na Uraia Mwema',
            isDownloadable: true,
            subtopics: [
              'Bendera ya Taifa, Wimbo wa Taifa na Mwenge wa Uhuru',
              'Haki na Wajibu wa Raia nchini Tanzania',
              'Maadili ya Mtanzania: Uaminifu, Heshima, na Uzalendo'
            ],
            content: 'Uraia na maadili unalenga kujenga raia mwema, mwaminifu na mwenye uzalendo kwa nchi yake.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Uraia na Maadili\nKiwango: Darasa la 5 - 7\nMada: Alama za Taifa na Uraia\n\n1. WIMBO WA TAIFA WA TANZANIA\n- "Mungu ibariki Afrika... Wabariki viongozi wake..."\n- Kuimba wimbo wa taifa kunahitaji kusimama wima kwa heshima kama ishara ya uzalendo.'
          }
        ]
      }
    ]
  },
  {
    id: 'olevel',
    name: 'O-Level Secondary (Form I - IV NECTA Curriculum)',
    subjects: [
      {
        name: 'Physics',
        topics: [
          {
            title: 'Form 1: Introduction to Physics & Measurement',
            isDownloadable: true,
            subtopics: [
              'Meaning and branches of Physics',
              'Fundamental physical quantities and SI units',
              'Derived physical quantities and density calculations',
              'Measuring instruments (Vernier caliper, Micrometer screw gauge)'
            ],
            content: 'Physics is the study of matter in relation to energy. Learn fundamental quantities (length, mass, time, electric current, temperature, amount of substance, luminous intensity) and derived quantities.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Physics\nLevel: Form I\nTopic: Measurement & Units\n\n1. FUNDAMENTAL QUANTITIES & SI UNITS\n- Length: Meter (m)\n- Mass: Kilogram (kg)\n- Time: Second (s)\n- Electric Current: Ampere (A)\n- Temperature: Kelvin (K)\n\n2. DENSITY\nFormula: Density (ρ) = Mass (m) / Volume (V).\nSI Unit: kg/m³.'
          },
          {
            title: 'Form 2: Magnetism & Electricity (Umeme na Sumaku)',
            isDownloadable: true,
            subtopics: [
              'Properties of magnets and magnetic fields',
              'Static electricity and electric charges',
              'Current electricity, Ohm`s Law (V = IR)',
              'Series and parallel circuits'
            ],
            content: 'Explore electrostatics, simple electric circuits, Ohm`s Law, potential difference, resistance, and magnetic lines of force.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Physics\nLevel: Form II\nTopic: Current Electricity\n\n1. OHM`S LAW\nStates that the current (I) flowing through a conductor is directly proportional to the potential difference (V) across its ends, provided temperature remains constant.\nFormula: V = I × R.'
          },
          {
            title: 'Form 3: Light & Geometrical Optics',
            isDownloadable: true,
            subtopics: [
              'Reflection of light on plane and curved mirrors',
              'Refraction of light through glass prisms and lenses',
              'Real and virtual image formation equations',
              'Optical instruments (Microscope, Telescope, Human Eye)'
            ],
            content: 'Study reflection, refraction, lenses, magnification, laws of reflection, and optical defect corrections.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Physics\nLevel: Form III\nTopic: Geometrical Optics\n\n1. LENS FORMULA\n1/f = 1/u + 1/v\nWhere f = focal length, u = object distance, v = image distance.\n\n2. SNELL`S LAW OF REFRACTION\nn1 × sin(i) = n2 × sin(r).'
          },
          {
            title: 'Form 4: Radioactivity & Nuclear Physics',
            isDownloadable: true,
            subtopics: [
              'Structure of the atom and isotopes',
              'Alpha, Beta, and Gamma radiation properties',
              'Half-life calculation and radioactive decay law',
              'Nuclear fission, fusion and safety precautions'
            ],
            content: 'Nuclear emissions, half-life formulas, detectors (Geiger-Muller counter), applications in medicine and agriculture.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Physics\nLevel: Form IV\nTopic: Radioactivity\n\n1. HALF-LIFE (t1/2)\nThe time required for half the radioactive nuclei in a sample to decay.\nFormula: N(t) = N0 × (1/2)^(t / t1/2).'
          }
        ]
      },
      {
        name: 'Chemistry',
        topics: [
          {
            title: 'Form 1: Laboratory Safety & Matter',
            isDownloadable: true,
            subtopics: [
              'Chemistry laboratory rules and safety gear',
              'First aid kit and handling hazardous chemicals',
              'States of matter and kinetic theory',
              'Elements, compounds, and mixtures separation'
            ],
            content: 'Introduction to matter, physical vs chemical changes, lab apparatus (Bunsen burner, volumetric flask), separation techniques.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Chemistry\nLevel: Form I\nTopic: Chemistry Lab Safety & Matter\n\n1. BUNSEN BURNER FLAMES\n- Luminous flame: Yellow, smoky, produced when air hole is closed.\n- Non-luminous flame: Blue, hot, noiseless, produced when air hole is open.'
          },
          {
            title: 'Form 2: Periodic Table & Chemical Bonding',
            isDownloadable: true,
            subtopics: [
              'Atomic structure (Protons, Neutrons, Electrons)',
              'Electronic configuration of first 20 elements',
              'Periodic Table trends (Groups & Periods)',
              'Ionic, Covalent, and Metallic bonding'
            ],
            content: 'Atomic structure, valency, oxidation states, chemical formula writing, covalent vs ionic lattices.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Chemistry\nLevel: Form II\nTopic: Periodic Table & Bonding\n\n1. IONIC BONDING\nOccurs when electrons are transferred from a metal to a non-metal (e.g. Na + Cl → NaCl).\n\n2. COVALENT BONDING\nOccurs when non-metal atoms share pairs of electrons (e.g. H2O, CH4).'
          },
          {
            title: 'Form 3: Stoichiometry & Mole Concept',
            isDownloadable: true,
            subtopics: [
              'Mole definition and Avogadro`s constant (6.022 × 10²³)',
              'Molar mass, molar volume of gases at STP',
              'Concentration calculations (Molarity M = moles/Liters)',
              'Volumetric analysis (Acid-Base titrations)'
            ],
            content: 'Empirical and molecular formulas, percentage yield, volumetric titration equations, concentration units.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Chemistry\nLevel: Form III\nTopic: The Mole Concept\n\n1. MOLE FORMULA\nMoles (n) = Mass (g) / Molar Mass (g/mol).\n\n2. MOLARITY\nMolarity (M) = Moles of solute / Volume of solution in Liters.'
          },
          {
            title: 'Form 4: Organic Chemistry & Polymers',
            isDownloadable: true,
            subtopics: [
              'Hydrocarbons: Alkanes, Alkenes, Alkynes IUPAC nomenclature',
              'Functional groups: Alcohols, Carboxylic acids, Esters',
              'Saponification (Soap making) and detergents',
              'Polymers: Addition vs condensation polymerization'
            ],
            content: 'Isomerism, reactions of hydrocarbons, esterification, soaps vs synthetic detergents, environmental impacts of plastics.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Chemistry\nLevel: Form IV\nTopic: Organic Chemistry\n\n1. ALKANES (General formula: CnH2n+2)\nSaturated hydrocarbons containing single C-C bonds.\n\n2. ESTERIFICATION\nAlcohol + Carboxylic Acid → Ester + Water (in presence of conc. H2SO4).'
          }
        ]
      },
      {
        name: 'Biology',
        topics: [
          {
            title: 'Form 1: Cell Structure & Organization',
            isDownloadable: true,
            subtopics: [
              'Cell theory and light microscope usage',
              'Plant vs Animal cell organelles (Nucleus, Mitochondria, Vacuole)',
              'Levels of organization: Cell → Tissue → Organ → System → Organism',
              'Cell specialization in plants and animals'
            ],
            content: 'Microscope operation, organelle functions, specialized cells (sperm cell, root hair cell, red blood cell).',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Biology\nLevel: Form I\nTopic: Cell Structure\n\n1. PLANT CELL vs ANIMAL CELL\n- Plant cells have a rigid cellulose cell wall, chloroplasts, and a large central vacuole.\n- Animal cells lack cell walls and chloroplasts.'
          },
          {
            title: 'Form 2: Human Nutrition & Transport System',
            isDownloadable: true,
            subtopics: [
              'Balanced diet, vitamins, and deficiency diseases',
              'Human digestive system and enzymatic action',
              'Blood components (RBC, WBC, Platelets, Plasma)',
              'Human heart structure and double circulation'
            ],
            content: 'Enzyme specificity, peristalsis, cardiac cycle, blood groups, Rh factor, transpiration stream in plants.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Biology\nLevel: Form II\nTopic: Human Transport System\n\n1. DOUBLE CIRCULATION\n- Pulmonary circulation: Deoxygenated blood flows from heart to lungs.\n- Systemic circulation: Oxygenated blood flows from heart to the body tissues.'
          },
          {
            title: 'Form 3: Coordination, Reproduction & Genetics',
            isDownloadable: true,
            subtopics: [
              'Nervous system vs Endocrine system (Hormones)',
              'Asexual vs Sexual reproduction in flowering plants and mammals',
              'Mitosis and Meiosis cell division stages',
              'Mendel`s Laws of Inheritance and Punnett squares'
            ],
            content: 'Reflex arcs, brain regions, plant tropisms, DNA structure, monohybrid crosses, sex-linked genes (color blindness, hemophilia).',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Biology\nLevel: Form III\nTopic: Genetics & Heredity\n\n1. MENDEL`S FIRST LAW (Law of Segregation)\nAlleles separate during gamete formation so each gamete carries only one allele for each gene.'
          },
          {
            title: 'Form 4: Evolution & Ecology',
            isDownloadable: true,
            subtopics: [
              'Theories of origin of life and Lamarckism vs Darwinism',
              'Ecosystem structure: Food chains, food webs, and trophic levels',
              'Nutrient cycles (Carbon, Nitrogen, Water cycles)',
              'Environmental pollution and biodiversity conservation'
            ],
            content: 'Natural selection, evidence of evolution (fossils, homologous structures), ecological pyramids, conservation strategies in Tanzania.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Biology\nLevel: Form IV\nTopic: Ecology & Evolution\n\n1. DARWIN`S THEORY OF NATURAL SELECTION\n- Overproduction of offspring.\n- Struggle for existence (competition).\n- Survival of the fittest.\n- Inheritance of favorable adaptations.'
          }
        ]
      },
      {
        name: 'Mathematics (Basic Mathematics)',
        topics: [
          {
            title: 'Form 1: Numbers, Fractions & Decimals',
            isDownloadable: true,
            subtopics: [
              'Real numbers classification and prime factorization',
              'LCM and GCF word problems',
              'Fractions, decimals, percentages conversions',
              'Units conversion and ratio/proportion'
            ],
            content: 'Prime factors, exponents, scientific notation, ratio, direct and inverse proportion.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Basic Mathematics\nLevel: Form I\nTopic: Numbers & Percentages\n\n1. SCIENTIFIC NOTATION\nForm: A × 10^n where 1 ≤ A < 10.\nExample: 450,000 = 4.5 × 10^5.'
          },
          {
            title: 'Form 2: Algebra, Quadratic Equations & Logarithms',
            isDownloadable: true,
            subtopics: [
              'Algebraic expressions simplification and factorization',
              'Linear equations and simultaneous equations',
              'Quadratic equations (Formula method & Completing square)',
              'Laws of Logarithms and indices'
            ],
            content: 'Quadratic formula x = (-b ± √(b² - 4ac)) / (2a), logarithm laws, simultaneous equation methods (substitution, elimination).',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Basic Mathematics\nLevel: Form II\nTopic: Quadratic Equations\n\n1. QUADRATIC FORMULA\nx = [-b ± √(b² - 4ac)] / (2a).'
          },
          {
            title: 'Form 3: Trigonometry & Circles (Jiometri ya Duara)',
            isDownloadable: true,
            subtopics: [
              'Trigonometric ratios (SOH CAH TOA) in right triangles',
              'Angles of elevation and depression',
              'Circle theorems (Angle at center, cyclic quadrilaterals)',
              'Tangents to a circle properties'
            ],
            content: 'Sine, Cosine, Tangent ratios, circle geometry theorems, arc length, sector area calculations.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Basic Mathematics\nLevel: Form III\nTopic: Circle Theorems\n\n1. THEOREM 1\nThe angle subtended by an arc at the center is twice the angle subtended by it at any point on the circumference.'
          },
          {
            title: 'Form 4: Coordinate Geometry & Probability',
            isDownloadable: true,
            subtopics: [
              'Distance between two points and midpoint formula',
              'Gradient of a line and equation of a straight line (y = mx + c)',
              'Probability of single, combined, and conditional events',
              'Tree diagrams and Venn diagrams in probability'
            ],
            content: 'Slope calculation m = (y2 - y1) / (x2 - x1), parallel vs perpendicular line gradients, sample space, probability formulas.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Basic Mathematics\nLevel: Form IV\nTopic: Probability\n\n1. PROBABILITY FORMULA\nP(A) = Number of favorable outcomes / Total possible outcomes (Sample Space).'
          }
        ]
      },
      {
        name: 'Geography',
        topics: [
          {
            title: 'Form 1: Concept of Geography & The Solar System',
            isDownloadable: true,
            subtopics: [
              'Meaning and branches of geography (Physical, Human)',
              'The Solar system planets, sun, moon, and satellites',
              'Earth`s rotation and revolution effects (Day/night, Seasons)',
              'Latitude, Longitude, and time calculation'
            ],
            content: 'Longitude time difference: 1 degree longitude = 4 minutes time difference. Rotation creates night and day; revolution causes seasons.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Geography\nLevel: Form I\nTopic: Solar System & Time Calculation\n\n1. TIME CALCULATION\n15° Longitude = 1 Hour difference.\nIf time at GMT (0°) is 12:00 PM, time at Dar es Salaam (39°E) is: 39 × 4 mins = 156 mins = 2 hrs 36 mins ahead → 2:36 PM.'
          },
          {
            title: 'Form 2: Human Activities & Climate',
            isDownloadable: true,
            subtopics: [
              'Agriculture: Subsistence vs commercial farming in Tanzania',
              'Water resources and livestock keeping',
              'Weather elements and weather station instruments',
              'Climate zones of the world and factors influencing climate'
            ],
            content: 'Stevenson screen instruments (Maximum/Minimum thermometer, Hygrometer, Barometer), climate regions of East Africa.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Geography\nLevel: Form II\nTopic: Weather & Climate\n\n1. STEVENSON SCREEN\nA white wooden louvored box raised 1.2m above ground used to shelter weather instruments from direct sunlight and rain.'
          },
          {
            title: 'Form 3: Map Reading & Photograph Interpretation',
            isDownloadable: true,
            subtopics: [
              'Topographical map grid references (4-figure & 6-figure)',
              'Contour lines and landform identification (Hills, Valleys, Slopes)',
              'Map scale calculations (Statement, Representative Fraction, Linear)',
              'Types of photographs (Ground, Oblique, Aerial) interpretation'
            ],
            content: 'Contour interval, gradient calculation = Vertical Interval (VI) / Horizontal Equivalent (HE), cross-sections.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Geography\nLevel: Form III\nTopic: Map Reading & Scale\n\n1. CONVERTING SCALE\nIf Representative Fraction (RF) scale is 1:50,000, 1 cm on map represents 50,000 cm (0.5 km) on ground.'
          },
          {
            title: 'Form 4: Environmental Issues & Research in Geography',
            isDownloadable: true,
            subtopics: [
              'Environmental degradation, deforestation, and climate change',
              'Desertification causes and drought management in East Africa',
              'Geographic research methodology (Formulating research problem, Data collection)',
              'Application of Geographic Information System (GIS) and Remote Sensing'
            ],
            content: 'Data collection methods (Questionnaire, Observation, Interview), environmental conservation strategies in Tanzania.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Geography\nLevel: Form IV\nTopic: Environmental Issues & Research\n\n1. RESEARCH DATA COLLECTION\n- Primary Data: Firsthand information collected directly from the field.\n- Secondary Data: Information obtained from existing books, reports, and census data.'
          }
        ]
      },
      {
        name: 'History',
        topics: [
          {
            title: 'Form 1: Sources of History & Human Evolution',
            isDownloadable: true,
            subtopics: [
              'Meaning and importance of studying History',
              'Sources of History (Oral traditions, Historical sites, Written records, Archaeology)',
              'Stages of human evolution (Australopithecus to Homo Sapiens)',
              'Stone Age periods in East Africa (Early, Middle, Late Stone Age)'
            ],
            content: 'Dr. Louis Leakey discoveries at Olduvai Gorge (Zinjanthropus/Australopithecus Boisei), advantages/limitations of historical sources.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: History\nLevel: Form I\nTopic: Sources of History & Archaeology\n\n1. ARCHAEOLOGY\nThe scientific study of past human life and activities through excavation of material remains.\nOlduvai Gorge in Tanzania is one of the world`s most famous archaeological sites.'
          },
          {
            title: 'Form 2: Pre-Colonial African Societies & Trade',
            isDownloadable: true,
            subtopics: [
              'Social and political organization of African societies (Clans, Kingdoms)',
              'Development of local and regional trade (Long Distance Trade in East Africa)',
              'Trans-Saharan Trade and Indian Ocean Trade networks',
              'Impacts of early foreign contacts (Arabs, Portuguese) on East Coast'
            ],
            content: 'Nyamwezi and Yao traders, Oman Sultanate shift to Zanzibar (Seyyid Said 1840), clove plantations, slave trade routes.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: History\nLevel: Form II\nTopic: Long Distance Trade in East Africa\n\n1. KEY TRADERS\nNyamwezi (led by Mirambo and Nyungu ya Mawe), Yao, and Kamba traders connected the interior with coastal Arab merchants.'
          },
          {
            title: 'Form 3: Colonial Invasion & Scramble for Africa',
            isDownloadable: true,
            subtopics: [
              'Causes of the Scramble for and Partition of Africa',
              'The Berlin Conference (1884-1885) and its resolutions',
              'African reactions to colonial rule (Active resistance vs Collaboration)',
              'Establishment of colonial economy (Plantation, Settler, Peasant agriculture)'
            ],
            content: 'Industrial Revolution in Europe driving demand for raw materials and markets, Maji Maji war, Hehe resistance under Mkwawa.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: History\nLevel: Form III\nTopic: Scramble for Africa & Berlin Conference\n\n1. BERLIN CONFERENCE (1884-1885)\nChaired by Otto von Bismarck. Established the doctrine of "Effective Occupation" to divide Africa without European war.'
          },
          {
            title: 'Form 4: Nationalism & Liberation Struggles in Africa',
            isDownloadable: true,
            subtopics: [
              'Rise of nationalism in Africa post-World War II',
              'Political parties and independence struggle in Tanganyika (TANU & Nyerere)',
              'Armed liberation struggles (Mozambique, Angola, Zimbabwe, South Africa)',
              'Pan-Africanism and formation of OAU/African Union'
            ],
            content: 'TANU formation on July 7, 1954, peaceful transition to independence on Dec 9, 1961, Arusha Declaration 1967, Ujamaa policy.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: History\nLevel: Form IV\nTopic: Nationalism in Tanganyika\n\n1. TANU FORMATION (1954)\nFormed from TAA (Tanganyika African Association) under Mwalimu Julius Kambarage Nyerere to fight for unconditional independence.'
          }
        ]
      },
      {
        name: 'Civics / Uraia',
        topics: [
          {
            title: 'Form 1: Our Nation & National Symbols',
            isDownloadable: true,
            subtopics: [
              'Components of a nation and citizenship',
              'National symbols of Tanzania (Coat of Arms, Flag, Anthem, Uhuru Torch, Currency)',
              'Rights and responsibilities of a Tanzanian citizen',
              'Work and development in society'
            ],
            content: 'Symbolism of Tanzanian flag colors: Green (Agriculture/Land), Yellow (Mineral wealth), Black (Tanzanian people), Blue (Water bodies).',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Civics / Uraia\nLevel: Form I\nTopic: National Symbols of Tanzania\n\n1. TANZANIA NATIONAL FLAG\n- Green: Natural vegetation and agriculture.\n- Yellow/Gold: Rich mineral deposits.\n- Black: The native people of Tanzania.\n- Blue: Lakes, rivers, and the Indian Ocean.'
          },
          {
            title: 'Form 2: Democracy & Human Rights',
            isDownloadable: true,
            subtopics: [
              'Concept and types of democracy (Direct vs Representative)',
              'Multi-party system in Tanzania since 1992',
              'Human rights classification and abuses prevention',
              'Gender equity and empowerment in Tanzania'
            ],
            content: 'Commission for Human Rights and Good Governance (CHRAGG), constitutional rights, democratic election process.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Civics\nLevel: Form II\nTopic: Human Rights & Democracy\n\n1. THREE GENERATIONS OF HUMAN RIGHTS\n- Civil & Political Rights (Freedom of speech, voting).\n- Economic, Social & Cultural Rights (Education, healthcare).\n- Environmental & Collective Rights.'
          },
          {
            title: 'Form 3: Government of Tanzania & Local Authorities',
            isDownloadable: true,
            subtopics: [
              'Three pillars of government: Executive, Judiciary, and Legislature',
              'Local government authorities (TAMISEMI, Councils, Ward Offices)',
              'The Constitution making process and amendments in Tanzania'
            ],
            content: 'Powers of the President, Cabinet, National Assembly (Bunge), High Court, and Ward Executive Officers (WEO).',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Civics\nLevel: Form III\nTopic: Pillars of Government\n\n1. EXECUTIVE (SERIKALI)\nLed by the President. Enforces laws and directs national development.\n2. LEGISLATURE (BUNGE)\nMakes laws and approves national budgets.\n3. JUDICIARY (MAHAKAMA)\nInterprets laws and dispenses justice.'
          },
          {
            title: 'Form 4: Globalization, Culture & Economic Development',
            isDownloadable: true,
            subtopics: [
              'Concept of Globalization and its impacts on developing countries',
              'Promotion and preservation of Tanzanian culture and Kiswahili',
              'Economic development, poverty eradication strategies (MKUKUTA), and Vision 2025'
            ],
            content: 'Cultural identity preservation, Kiswahili as an international language, economic integration in East Africa (EAC).',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Civics\nLevel: Form IV\nTopic: Globalization & Tanzanian Culture\n\n1. GLOBALIZATION\nThe integration of national economies, cultures, and technology into a global network. Requires preserving Kiswahili and local ethics.'
          }
        ]
      },
      {
        name: 'Kiswahili (O-Level)',
        topics: [
          {
            title: 'Form 1 & 2: Sarufi na Matumizi ya Lugha',
            isDownloadable: true,
            subtopics: [
              'Mnyambuliko wa Vitenzi na Nyakati (Li, Na, Ta, Me, Ku, Ja)',
              'Uainishaji wa Maneno na Ngeli za Kiswahili (A-WA, KI-VI, I-ZI)',
              'Misingi ya Rejesta na Mawasiliano katika Jamii'
            ],
            content: 'Sarufi ya Kiswahili inahusu miundo ya maneno, ngeli, na matumizi sahihi ya nyakati na viambishi.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Kiswahili (O-Level)\nLevel: Form I & II\nMada: Sarufi na Ngeli za Kiswahili\n\n1. NGELI ZA KISWAHILI\n- Ngeli ya A - WA: Watu na Wanyama (Mfano: Mtu anasoma / Watu wanasoma).\n- Ngeli ya KI - VI: Vitu vya kawaida (Mfano: Kitabu kinaanguka / Vitabu vinaanguka).'
          },
          {
            title: 'Form 3 & 4: Fasihi simulizi na Uhakiki wa Fasihi Andishi',
            isDownloadable: true,
            subtopics: [
              'Uhakiki wa Tamthilia, Riwaya na Ushairi wa Kiswahili',
              'Uchambuzi wa Maudhui, Dhamira, Migogoro na Wahusika',
              'Fasihi Simulizi: Misingi ya Hadithi, Tarihi na Magano'
            ],
            content: 'Fasihi ya Kiswahili inatathmini sanaa ya lugha na ujumbe wa kijamii kupitia vitabu vilivyoteuliwa na NECTA.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Kiswahili\nLevel: Form III & IV\nMada: Uhakiki wa Fasihi Andishi\n\n1. VIPENGELE VYA UHAKIKI\n- Dhamira Kuu: Wazo kuu analolijenga mwandishi.\n- Migogoro: Tofauti za kiitikadi au kimitazamo kati ya wahusika.'
          }
        ]
      },
      {
        name: 'English Language (O-Level)',
        topics: [
          {
            title: 'Form 1 & 2: Grammar, Parts of Speech & Direct/Indirect Speech',
            isDownloadable: true,
            subtopics: [
              'Active and Passive Voice Conversions',
              'Direct and Indirect (Reported) Speech Rules',
              'Conditional Sentences (Type 1, Type 2, Type 3)'
            ],
            content: 'Master active to passive transformations, reported speech tense shifts, and conditional IF clauses.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: English Language\nLevel: Form I & II\nTopic: Active and Passive Voice\n\n1. ACTIVE TO PASSIVE RULE\nActive: "John wrote the letter."\nPassive: "The letter was written by John."'
          },
          {
            title: 'Form 3 & 4: Novel & Play Analysis (Literary Analysis)',
            isDownloadable: true,
            subtopics: [
              'Analysis of Set Books (Passed Like a Shadow, Unanswered Cries, The Black Hermit)',
              'Themes: Betrayal, Corruption, Traditions vs Modernity, Gender Issues',
              'Characterization, Setting, and Message to the Society'
            ],
            content: 'Detailed analysis of CSEE English literature set readings, character roles, conflicts, and central themes.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: English Literature\nLevel: Form III & IV\nTopic: Literary Set Books Analysis\n\n1. PASSED LIKE A SHADOW (Bernard Mapalala)\nCentral Theme: HIV/AIDS epidemic, stigma, and family collapse in modern society.'
          }
        ]
      },
      {
        name: 'Commerce & Bookkeeping',
        topics: [
          {
            title: 'Form 1 & 2: Commerce Principles & Double Entry System',
            isDownloadable: true,
            subtopics: [
              'Introduction to Commerce, Home Trade vs Foreign Trade',
              'Double Entry Bookkeeping rules (Debit the receiver, Credit the giver)',
              'Cash Book, Sales Day Book, and Ledger posting'
            ],
            content: 'Commerce studies trade and aids to trade. Bookkeeping records financial transactions systematically in ledgers.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Bookkeeping & Commerce\nLevel: Form I & II\nTopic: Double Entry Rule\n\n1. THE GOLDEN RULE OF BOOKKEEPING\nFor every debit entry, there must be a corresponding credit entry.'
          },
          {
            title: 'Form 3 & 4: Financial Statements & Warehousing',
            isDownloadable: true,
            subtopics: [
              'Preparation of Trading, Profit & Loss Account and Balance Sheet',
              'Warehousing types, Functions of Wholesalers and Retailers',
              'Transport, Insurance, and Advertising in Commerce'
            ],
            content: 'Learn financial accounting statements, calculation of gross profit, net profit, and working capital balance.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Bookkeeping\nLevel: Form III & IV\nTopic: Financial Statements\n\n1. GROSS PROFIT FORMULA\nGross Profit = Net Sales - Cost of Goods Sold (COGS).'
          }
        ]
      },
      {
        name: 'Computer Studies / ICT',
        topics: [
          {
            title: 'Form 1 - 4: Misingi ya Kompyuta na Mtandao (Computer Basics)',
            isDownloadable: true,
            subtopics: [
              'Sehemu za Kompyuta: Hardware (CPU, RAM, HDD) na Software (OS, Apps)',
              'Mfumo wa Endeshi (Operating System) na Hifadhi ya Kumbukumbu',
              'Misingi ya Mtandao wa Intaneti, Barua Pepe, na Usalama wa Mtandao'
            ],
            content: 'Elimu ya teknolojia ya habari na mawasiliano (TEHAMA) inayofundisha matumizi bora ya kompyuta na usalama wa data.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Computer Studies / TEHAMA\nLevel: Form I - IV\nMada: Misingi ya Hardware & Software\n\n1. CENTRAL PROCESSING UNIT (CPU)\nInajulikana kama "Ubongo wa Kompyuta". Inafanya kazi zote za usindikaji wa data na hesabu (ALU & CU).'
          }
        ]
      }
    ]
  },
  {
    id: 'alevel',
    name: 'A-Level High School (Form V - VI NECTA Curriculum)',
    subjects: [
      {
        name: 'Advanced Mathematics',
        topics: [
          {
            title: 'Set Theory & Complex Numbers',
            isDownloadable: true,
            subtopics: [
              'Operations on sets, Venn diagrams with 3 sets, De Morgan Laws',
              'Complex numbers algebra, Argand diagram representation',
              'De Moivre`s Theorem and roots of complex numbers'
            ],
            content: 'Advanced set algebra, complex numbers z = a + ib, modulus |z|, argument arg(z), polar form r(cos θ + i sin θ), Euler`s formula.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Mathematics\nLevel: Form V & VI\nTopic: Complex Numbers & De Moivre`s Theorem\n\n1. DE MOIVRE`S THEOREM\nFor any real number n: (cos θ + i sin θ)^n = cos(nθ) + i sin(nθ).'
          },
          {
            title: 'Calculus: Differentiation & Integration',
            isDownloadable: true,
            subtopics: [
              'First principles differentiation and chain/product/quotient rules',
              'Applications of derivatives: Tangents, normals, stationary points, rates of change',
              'Integration techniques: Substitution, Integration by parts, Partial fractions',
              'Definite integrals: Area under curves and volume of revolution'
            ],
            content: 'Limits, continuity, implicit differentiation, logarithmic differentiation, reduction formulas, Riemann sums.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Mathematics\nLevel: Form V & VI\nTopic: Integration Techniques\n\n1. INTEGRATION BY PARTS\nFormula: ∫ u dv = u v - ∫ v du.'
          },
          {
            title: 'Linear Programming, Vectors & Probability',
            isDownloadable: true,
            subtopics: [
              'Linear programming inequalities graph and objective function optimization',
              'Vector operations in 3D, scalar dot product and vector cross product',
              'Permutations, combinations, Binomial distribution and Normal distribution'
            ],
            content: '3D vectors algebra, angle between two vectors, probability distributions, expectations and standard deviation.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Mathematics\nLevel: Form V & VI\nTopic: Vector Algebra\n\n1. SCALAR (DOT) PRODUCT\na · b = |a| |b| cos θ.\nIf a · b = 0, vectors a and b are perpendicular.'
          }
        ]
      },
      {
        name: 'BAM (Basic Applied Mathematics)',
        topics: [
          {
            title: 'Functions, Exponential Equations & Statistics',
            isDownloadable: true,
            subtopics: [
              'Domain and range of functions, composite functions f(g(x))',
              'Solving exponential and logarithmic equations in BAM',
              'Measures of dispersion: Standard Deviation, Variance, and Quartiles'
            ],
            content: 'BAM is a core subsidiary subject for Arts and Social Science combinations. Master functions, statistics, differentiation, and matrices.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Basic Applied Mathematics (BAM)\nLevel: Form V & VI\nTopic: Statistics & Variance\n\n1. VARIANCE FORMULA\nVariance (σ²) = ∑ f(x - x̄)² / ∑ f.'
          }
        ]
      },
      {
        name: 'Physics (A-Level)',
        topics: [
          {
            title: 'Mechanics & Simple Harmonic Motion (SHM)',
            isDownloadable: true,
            subtopics: [
              'Projectiles motion equations and trajectory',
              'Newton`s laws of motion and momentum conservation',
              'Rotational dynamics: Torque, moment of inertia, angular momentum',
              'SHM differential equation, pendulum, and mass-spring systems'
            ],
            content: 'Vector calculus applications, projectile range R = (u² sin 2θ)/g, moment of inertia tensor, damped and forced oscillations.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Physics\nLevel: Form V & VI\nTopic: Mechanics & SHM\n\n1. SIMPLE HARMONIC MOTION DIFFERENTIAL EQUATION\nd²x/dt² + ω² x = 0\nSolution: x(t) = A cos(ωt + φ).'
          },
          {
            title: 'Waves, Optics & Modern Physics',
            isDownloadable: true,
            subtopics: [
              'Wave motion, Doppler effect, Young`s double slit interference',
              'Diffraction grating and polarization of light waves',
              'Photoelectric effect, Einstein`s photoelectric equation (E = hf = Φ + KE)',
              'Atomic physics, Bohr model, X-rays production and Bragg`s Law'
            ],
            content: 'Wave theory, interference patterns, work function Φ, de Broglie wavelength λ = h/p, energy level transitions in hydrogen.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Physics\nLevel: Form V & VI\nTopic: Modern Physics & Quantum Theory\n\n1. EINSTEIN`S PHOTOELECTRIC EQUATION\nh f = Φ + K.E.(max).\nWhere h = Planck`s constant, f = frequency of incident radiation, Φ = work function.'
          }
        ]
      },
      {
        name: 'Chemistry (A-Level)',
        topics: [
          {
            title: 'Physical Chemistry: Thermodynamics & Chemical Equilibrium',
            isDownloadable: true,
            subtopics: [
              'First and Second Laws of Thermodynamics, Enthalpy (ΔH) and Entropy (ΔS)',
              'Gibbs Free Energy (ΔG = ΔH - TΔS) and spontaneity',
              'Equilibrium constants Kc and Kp derivations',
              'Le Chatelier`s Principle and buffer solutions pH calculation'
            ],
            content: 'Hess`s Law, Born-Haber cycle, rate laws, order of reaction, Arrhenius equation k = A e^(-Ea/RT).',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Chemistry\nLevel: Form V & VI\nTopic: Chemical Thermodynamics\n\n1. GIBBS FREE ENERGY\nΔG = ΔH - TΔS.\nA reaction is thermodynamically spontaneous when ΔG < 0.'
          },
          {
            title: 'Organic Chemistry: Hydrocarbons & Carbonyl Compounds',
            isDownloadable: true,
            subtopics: [
              'Electrophilic addition to alkenes and Markovnikov`s rule',
              'Aromatic chemistry: Benzene ring structure, electrophilic substitution (Nitration, Halogenation)',
              'Aldehydes and Ketones: Nucleophilic addition and Tollens`/Fehling`s test',
              'Reaction mechanisms: SN1 vs SN2 nucleophilic substitution'
            ],
            content: 'In-depth study of aliphatic and aromatic organic compounds, reaction mechanisms, synthesis pathways, and analytical identification tests.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Chemistry\nLevel: Form V & VI\nTopic: Organic Chemistry Mechanisms\n\n1. MARKOVNIKOV`S RULE\nWhen adding HX to an unsymmetrical alkene, the hydrogen atom attaches to the carbon with more hydrogen atoms.'
          }
        ]
      },
      {
        name: 'Biology (A-Level)',
        topics: [
          {
            title: 'Biochemistry & Molecular Genetics',
            isDownloadable: true,
            subtopics: [
              'Carbohydrates, lipids, proteins, and nucleic acids biochemistry',
              'Enzyme kinetics and Michaelis-Menten equation',
              'DNA replication mechanism, transcription, and translation',
              'Recombinant DNA technology and genetic engineering'
            ],
            content: 'Structure of monomeric and polymeric biomolecules, competitive vs non-competitive enzyme inhibition, lac operon model.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Biology\nLevel: Form V & VI\nTopic: Biochemistry & Protein Synthesis\n\n1. CENTRAL DOGMA OF MOLECULAR BIOLOGY\nDNA → (Transcription) → mRNA → (Translation) → Polypeptide / Protein.'
          },
          {
            title: 'Comparative Physiology: Respiration & Homeostasis',
            isDownloadable: true,
            subtopics: [
              'Glycolysis, Link reaction, Krebs cycle, and Oxidative phosphorylation',
              'Human nephron structure, ultrafiltration, and counter-current multiplier',
              'Thermoregulation, osmoregulation, and blood glucose control'
            ],
            content: 'Cellular respiration pathways producing 36-38 ATP molecules, kidney physiology, endocrine regulation of homeostatic balance.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Biology\nLevel: Form V & VI\nTopic: Cellular Respiration\n\n1. KREBS CYCLE (CITRIC ACID CYCLE)\nTakes place in the mitochondrial matrix. Converts Acetyl-CoA into CO2, NADH, FADH2, and ATP.'
          }
        ]
      },
      {
        name: 'Economics',
        topics: [
          {
            title: 'Microeconomics: Demand, Supply & Market Structures',
            isDownloadable: true,
            subtopics: [
              'Price elasticity of demand (PED) and supply (PES) calculations',
              'Consumer behaviour theories (Utility theory & Indifference curves)',
              'Production function and laws of returns to scale',
              'Perfect competition, monopoly, oligopoly, monopolistic competition'
            ],
            content: 'Income and substitution effects, deadweight loss, price discrimination, game theory basics in oligopoly.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Economics\nLevel: Form V & VI\nTopic: Microeconomics & Elasticity\n\n1. PRICE ELASTICITY OF DEMAND (PED)\nPED = (% Change in Quantity Demanded) / (% Change in Price).'
          },
          {
            title: 'Macroeconomics: National Income & Inflation',
            isDownloadable: true,
            subtopics: [
              'National Income accounting methods (Income, Expenditure, Output)',
              'Circular flow of income in a 4-sector open economy',
              'Inflation types (Demand-pull vs Cost-push) and control policies',
              'Fiscal policy vs Monetary policy instruments (Central Bank reserve ratio)'
            ],
            content: 'GDP, GNP, NNP calculations, Keynesian multiplier, Phillips curve relationship between inflation and unemployment.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Economics\nLevel: Form V & VI\nTopic: Macroeconomics & GDP\n\n1. EXPENDITURE METHOD OF GDP\nGDP = C + I + G + (X - M).\nWhere C = Consumption, I = Investment, G = Government Spending, X = Exports, M = Imports.'
          }
        ]
      },
      {
        name: 'Geography (A-Level)',
        topics: [
          {
            title: 'Geomorphology & Plate Tectonics',
            isDownloadable: true,
            subtopics: [
              'Continental drift hypothesis and paleomagnetism evidence',
              'Plate boundary processes (Divergent, Convergent, Transform)',
              'Vulcanicity and landforms (Volcanoes, Calderas, Intrusive bodies)',
              'Weathering, mass wasting, and fluvial landforms'
            ],
            content: 'Geomorphology studies the origin and evolution of topographic features created by physical processes on Earth`s surface.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Geography\nLevel: Form V & VI\nTopic: Plate Tectonics\n\n1. THE THEORY OF PLATE TECTONICS\nEarth`s outer shell is divided into several plates that glide over the asthenosphere.'
          },
          {
            title: 'Climatology, Population & Development',
            isDownloadable: true,
            subtopics: [
              'Atmospheric circulation cells (Hadley, Ferrel, Polar cells)',
              'Global climate change, El Nino Southern Oscillation (ENSO)',
              'Demographic transition model stages and population dynamics',
              'Sustainable development, energy resources and mining in Africa'
            ],
            content: 'Global heat budget, air masses, weather forecasting, population distribution factors in Tanzania, renewable energy sources.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Geography\nLevel: Form V & VI\nTopic: Climatology\n\n1. EL NINO SOUTHERN OSCILLATION (ENSO)\nIrregular periodic variation in winds and sea surface temperatures over the tropical eastern Pacific Ocean affecting global rainfall.'
          }
        ]
      },
      {
        name: 'History (A-Level)',
        topics: [
          {
            title: 'History Paper 1: African History (Pre-Colonial to Independence)',
            isDownloadable: true,
            subtopics: [
              'Development of pre-colonial African feudal states',
              'Impacts of slave trade on African socio-economic formations',
              'Colonial administrative systems (Direct rule, Indirect rule, Assimilation)',
              'Decolonization of Africa and challenges of post-independence nation building'
            ],
            content: 'Comprehensive analysis of African history, colonial exploitation strategies, Pan-African solidarity, and neo-colonialism.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: History (Paper 1)\nLevel: Form V & VI\nTopic: Colonial Administration Systems\n\n1. INDIRECT RULE (British Policy)\nIntroduced by Lord Lugard. Used local traditional chiefs as intermediaries to collect taxes and maintain order.'
          },
          {
            title: 'History Paper 2: World History (Industrial Revolution to Cold War)',
            isDownloadable: true,
            subtopics: [
              'Agrarian and Industrial Revolutions in Europe',
              'Origins and consequences of World War I and World War II',
              'The Rise of Socialism in USSR and China',
              'The Cold War era, Non-Aligned Movement (NAM), and Globalization'
            ],
            content: 'World history events that shaped modern global politics, industrial growth, world wars, and ideological cold war conflicts.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: History (Paper 2)\nLevel: Form V & VI\nTopic: World War I & Versailles Treaty\n\n1. MAIN CAUSES OF WWI (M-A-I-N)\n- Militarism\n- Alliances\n- Imperialism\n- Nationalism'
          }
        ]
      },
      {
        name: 'Kiswahili (A-Level)',
        topics: [
          {
            title: 'Kiswahili 1: Sarufi na Utatuzi wa Lugha',
            isDownloadable: true,
            subtopics: [
              'Misingi ya Phonolojia na Fonetiki ya Kiswahili',
              'Mofolojia: Mnyambuliko wa maneno na miundo ya viambishi',
              'Sintaksia: Uchanganuzi wa sentensi kwa njia ya mti (Tree diagram)'
            ],
            content: 'Somo la Kiswahili Karatasi ya 1 (K1) linashughulikia sarufi ya kina, uchanganuzi wa sentensi, na maendeleo ya lugha ya Kiswahili.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Kiswahili (Karatasi ya 1)\nLevel: Form V & VI\nMada: Sintaksia na Uchanganuzi wa Sentensi\n\n1. SENTENSI SAHIHI YA KISWAHILI\nS → KN + KT.\nKN (Kundi Nomino) linaweza kuundwa na N + V. KT (Kundi Tenzi) linaweza kuundwa na T + E.'
          },
          {
            title: 'Kiswahili 2: Uhakiki wa Fasihi na Ushairi wa Kisasa',
            isDownloadable: true,
            subtopics: [
              'Uhakiki wa Fasihi Simulizi na Fasihi Andishi katika ngazi ya Juu',
              'Ushairi wa Kiswahili: Bahari za Ushairi (Tarbia, Tathlitha, Sitaria)',
              'Uchambuzi wa Diwani na Riwaya zilizoteuliwa na NECTA'
            ],
            content: 'Kiswahili Karatasi ya 2 (K2) inafundisha uhakiki wa kina wa tamthilia, riwaya, na ushairi na maadili ya jamii.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Kiswahili (Karatasi ya 2)\nLevel: Form V & VI\nMada: Bahari za Ushairi\n\n1. TARBIA\nShairi lenye mistari (mshororo) minne katika kila ubeti.'
          }
        ]
      },
      {
        name: 'English Language (A-Level)',
        topics: [
          {
            title: 'Language 1 & Literature 2 (A-Level English)',
            isDownloadable: true,
            subtopics: [
              'English Phonetics, Phonology, and Word Formation Processes',
              'Advanced Essay Writing, Rhetoric, and Style Analysis',
              'Critical Analysis of World Literature Plays, Novels, and Poetry'
            ],
            content: 'Advanced English studies covering linguistics, literary criticism, stylistic devices, and set readings.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: English Language (A-Level)\nLevel: Form V & VI\nTopic: Word Formation Processes\n\n1. WORD FORMATION TYPES\n- Compounding: Joining two words (e.g. Tooth + Brush = Toothbrush).\n- Blending: Combining parts of two words (e.g. Smoke + Fog = Smog).'
          }
        ]
      },
      {
        name: 'General Studies (GS)',
        topics: [
          {
            title: 'Democratic Process & Human Rights (Demokrasia)',
            isDownloadable: true,
            subtopics: [
              'Principles of democracy and rule of law',
              'The electoral system and voting process in Tanzania',
              'Civil society, governance and human rights watch'
            ],
            content: 'General Studies is a compulsory multi-disciplinary subject in A-level that provides students with general knowledge of social, political, economic, and scientific issues.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: General Studies (GS)\nLevel: Form V & VI (A-Level)\nTopic: Democratic Process in Tanzania\n\n1. PRINCIPLES OF DEMOCRACY\n- Rule of Law (Utawala wa Sheria)\n- Free and Fair Elections\n- Separation of Powers\n- Freedom of Speech and Assembly\n\n2. ELECTORAL SYSTEM IN TANZANIA\nThe National Electoral Commission (NEC) is the independent body that supervises and conducts presidential, parliamentary, and local government elections in Tanzania.'
          }
        ]
      }
    ]
  }
];

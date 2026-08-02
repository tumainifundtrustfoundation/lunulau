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
            content: 'Namba nzima na sehemu ni msingi wa hisabati zote. Katika mada hii utajifunza jinsi ya kubadili sehemu kuwa desimali, kujumlisha na kutoa sehemu zenye asili tofauti.',
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
              'Nomi (N), Viwakilishi (W), Vivumishi (V)',
              'Vitenzi (T) na Viunganishi (U)',
              'Mnyambuliko wa vitenzi (Nyakati na Hali)'
            ],
            content: 'Kiswahili kina aina nane kuu za maneno. Katika mada hii utajifunza jinsi ya kutambua na kutumia aina hizi katika ujenzi wa sentensi sahihi.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSomo: Kiswahili\nKiwango: Darasa la 5 - 7\nMada: Aina za Maneno\n\n1. NOMINO (N)\nManeno yanayotaja maji, watu, mahali au vitu. Mfano: Juma, Morogoro, Kitabu, Amani.\n\n2. VITENZI (T)\nManeno yanayoeleza tendo linalofanyika. Mfano: Anasoma, Wanakimbia, Amekula.'
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
            subtopics: [
              'First principles differentiation and chain/product/quotient rules',
              'Applications of derivatives: Tangents, normals, stationary points, rates of change',
              'Integration techniques: Substitution, Integration by parts, Partial fractions',
              'Definite integrals: Area under curves and volume of revolution'
            ],
            content: 'Limits, continuity, implicit differentiation, logarithmic differentiation, reduction formulas, Riemann sums.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Mathematics\nLevel: Form V & VI\nTopic: Integration Techniques\n\n1. INTEGRATION BY PARTS\nFormula: ∫ u dv = u v - ∫ v du.'
          }
        ]
      },
      {
        name: 'Physics (A-Level)',
        topics: [
          {
            title: 'Mechanics & Simple Harmonic Motion (SHM)',
            subtopics: [
              'Projectiles motion equations and trajectory',
              'Newton`s laws of motion and momentum conservation',
              'Rotational dynamics: Torque, moment of inertia, angular momentum',
              'SHM differential equation, pendulum, and mass-spring systems'
            ],
            content: 'Vector calculus applications, projectile range R = (u² sin 2θ)/g, moment of inertia tensor, damped and forced oscillations.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Physics\nLevel: Form V & VI\nTopic: Mechanics & SHM\n\n1. SIMPLE HARMONIC MOTION DIFFERENTIAL EQUATION\nd²x/dt² + ω² x = 0\nSolution: x(t) = A cos(ωt + φ).'
          }
        ]
      },
      {
        name: 'Chemistry (A-Level)',
        topics: [
          {
            title: 'Physical Chemistry: Thermodynamics & Chemical Equilibrium',
            subtopics: [
              'First and Second Laws of Thermodynamics, Enthalpy (ΔH) and Entropy (ΔS)',
              'Gibbs Free Energy (ΔG = ΔH - TΔS) and spontaneity',
              'Equilibrium constants Kc and Kp derivations',
              'Le Chatelier`s Principle and buffer solutions pH calculation'
            ],
            content: 'Hess`s Law, Born-Haber cycle, rate laws, order of reaction, Arrhenius equation k = A e^(-Ea/RT).',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Chemistry\nLevel: Form V & VI\nTopic: Chemical Thermodynamics\n\n1. GIBBS FREE ENERGY\nΔG = ΔH - TΔS.\nA reaction is thermodynamically spontaneous when ΔG < 0.'
          }
        ]
      },
      {
        name: 'Biology (A-Level)',
        topics: [
          {
            title: 'Biochemistry & Molecular Genetics',
            subtopics: [
              'Carbohydrates, lipids, proteins, and nucleic acids biochemistry',
              'Enzyme kinetics and Michaelis-Menten equation',
              'DNA replication mechanism, transcription, and translation',
              'Recombinant DNA technology and genetic engineering'
            ],
            content: 'Structure of monomeric and polymeric biomolecules, competitive vs non-competitive enzyme inhibition, lac operon model.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Biology\nLevel: Form V & VI\nTopic: Biochemistry & Protein Synthesis\n\n1. CENTRAL DOGMA OF MOLECULAR BIOLOGY\nDNA → (Transcription) → mRNA → (Translation) → Polypeptide / Protein.'
          }
        ]
      },
      {
        name: 'Economics',
        topics: [
          {
            title: 'Microeconomics: Demand, Supply & Market Structures',
            subtopics: [
              'Price elasticity of demand (PED) and supply (PES) calculations',
              'Consumer behaviour theories (Utility theory & Indifference curves)',
              'Production function and laws of returns to scale',
              'Perfect competition, monopoly, oligopoly, monopolistic competition'
            ],
            content: 'Income and substitution effects, deadweight loss, price discrimination, game theory basics in oligopoly.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Economics\nLevel: Form V & VI\nTopic: Microeconomics & Elasticity\n\n1. PRICE ELASTICITY OF DEMAND (PED)\nPED = (% Change in Quantity Demanded) / (% Change in Price).'
          }
        ]
      },
      {
        name: 'Geography (A-Level)',
        topics: [
          {
            title: 'Geomorphology & Plate Tectonics',
            subtopics: [
              'Continental drift hypothesis and paleomagnetism evidence',
              'Plate boundary processes (Divergent, Convergent, Transform)',
              'Vulcanicity and landforms (Volcanoes, Calderas, Intrusive bodies)',
              'Weathering, mass wasting, and fluvial landforms'
            ],
            content: 'Geomorphology studies the origin and evolution of topographic and bathymetric features created by physical or chemical processes on Earth`s surface.',
            notesSample: 'LUPANULLA ACADEMIC NOTISI SERIES:\n\nSubject: Advanced Geography\nLevel: Form V & VI\nTopic: Plate Tectonics\n\n1. THE THEORY OF PLATE TECTONICS\nEarth`s outer shell is divided into several plates that glide over the asthenosphere.\n\n2. TYPES OF PLATE BOUNDARIES\na) Divergent (e.g. East African Rift Valley where plates move apart).\nb) Convergent (e.g. Himalayas where plates crash together).\nc) Transform (e.g. San Andreas Fault where plates slide past each other).'
          }
        ]
      },
      {
        name: 'General Studies (GS)',
        topics: [
          {
            title: 'Democratic Process & Human Rights (Demokrasia)',
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

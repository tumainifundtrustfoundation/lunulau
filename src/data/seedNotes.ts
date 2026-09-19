import { DocumentMetadata } from '../types';

export const officialAdminNotes: DocumentMetadata[] = [
  {
    id: 'admin-note-phy-f4-radioactivity',
    title: 'Physics Form 4: Radioactivity and Nuclear Physics (Notisi Kamili)',
    description: 'Notisi kamili na zilizofafanuliwa kwa kina za Radioactivity, mionzi ya Alpha, Beta, na Gamma, Half-Life, Nuclear Fission na Fusion kwa mtihani wa NECTA CSEE.',
    category: 'Notes',
    documentType: 'Notes',
    type: 'notes',
    subject: 'Physics',
    classLevel: 'Form 4',
    educationLevel: 'O-Level',
    tags: ['Physics', 'Form 4', 'Radioactivity', 'Nuclear', 'NECTA', 'Notes', 'Mwalimu Admin'],
    uploadedBy: 'admin',
    uploadedByName: 'Mwalimu / Admin Lupanulla',
    createdAt: Date.now() - 86400000 * 2,
    views: 1450,
    downloadsCount: 620,
    rating: 5,
    status: 'approved',
    driveUrl: 'https://drive.google.com/file/d/1hTLbL76sjSUpefctOo2Fz78Ox4lE8LVK/view',
    content: `# PHYSICS FORM 4: RADIOACTIVITY AND NUCLEAR PHYSICS
**Imeandaliwa na:** Mwalimu Mkuu / Kitengo cha Taaluma Lupanulla (Admin)
**Ngazi:** Kidato cha Nne (Form 4 - CSEE NECTA Preparation)

---

### 1. UTANGULIZI NA MAANA YA RADIOACTIVITY
Radioactivity ni tendo la hiari ambalo viini vya atomu visivyo na utulivu (unstable atomic nuclei) humomonyoka kwa kutoa nishati na chembechembe za mionzi (radiation) ili kufikia hali ya utulivu (stability).

**Sifa za Atomu Isiyo na Utulivu (Unstable Nucleus):**
- Uwiano wa neutroni kwa protoni (N/Z ratio) ukiwa mkubwa kuliko 1.5 kwa elementi nzito.
- Atomu zenye namba ya atomia (Atomic Number, Z) kubwa kuliko 83 (kama Uranium, Radium, Polonium, Thorium) kiasili zote ni radioactive.

---

### 2. AINA TATU ZA MIONZI YA KINUKLIA (TYPES OF NUCLEAR RADIATIONS)

| Sifa (Property) | Mwonzi wa Alpha (α) | Mwonzi wa Beta (β) | Mwonzi wa Gamma (γ) |
| :--- | :--- | :--- | :--- |
| **Asili (Nature)** | Kiini cha Helium (He-4: 2p, 2n) | Elektroni ya kasi kubwa (e⁻) | Mawimbi ya sumakuumeme (EM Waves) |
| **Alama (Symbol)** | ⁴₂He au ⁴₂α | ⁰₋₁e au ⁰₋₁β | ⁰₀γ |
| **Chaji (Charge)** | Chanya (+2) | Hasi (-1) | Haina chaji (0 / Neutral) |
| **Uwezo wa Kupenya (Penetration Power)** | Mdogo sana (Huzuiwa na karatasi nyembamba au ngozi) | Wa wastani (Hupenya karatasi, huzuiwa na aluminium ya 3-5mm) | Mkubwa sana (Hupenya mwili, huzuiwa tu na risasi nene au zege) |
| **Uwezo wa Ku-ionize Hewa (Ionizing Power)** | Mkubwa mno (kwa sababu ya ukubwa na chaji yake ya +2) | Wa wastani | Mdogo kuliko wote |
| **Mkengeuko katika Uga wa Umeme/Sumaku** | Hupinda kuelekea ncha hasi (Negative plate) | Hupinda kwa nguvu kuelekea ncha chanya (Positive plate) | Haupindi kabisa (Haubadili mwelekeo) |

---

### 3. SHUHUDIA ZA MMOMONYOKO WA MIONZI (RADIOACTIVE DECAY LAWS)

#### A. Alpha Decay:
Kizio cha masi hupungua kwa 4 na namba ya atomia hupungua kwa 2.
**Mlinganyo:**
^A_Z X → ^{A-4}_{Z-2} Y + ⁴₂He

*Mfano:*
²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He

#### B. Beta Decay:
Neutroni moja ndani ya kiini hubadilika kuwa protoni na elektroni. Elektroni inatupwa nje kama beta particle.
**Mlinganyo:**
^A_Z X → ^A_{Z+1} Y + ⁰₋₁e

*Mfano:*
¹⁴₆C → ¹⁴₇N + ⁰₋₁e

#### C. Gamma Emission:
Hutokea baada ya alpha au beta decay wakati kiini kikiwa katika hali ya msisimko wa juu (excited state). Kutoa gamma hakubadilishi namba ya masi wala namba ya atomia.

---

### 4. NUSU-MAISHA (HALF-LIFE, T½)
Nusu-maisha ni muda unaochukuliwa na nusu ya viini vya elementi ya mionzi kumomonyoka, au muda unaochukuliwa kwa kiwango cha mionzi (activity) kupungua hadi nusu ya thamani yake ya mwanzo.

**Kanuni Muhimu za Hesabu:**
1. N = N₀ * (1/2)^n
   - Ambapo:
     - N = Kiasi kilichobaki
     - N₀ = Kiasi cha mwanzo
     - n = Idadi ya nusu-maisha = (Jumla ya muda, t) / (Muda wa nusu-maisha, T½)

*Mfano wa Swali la Mtihani NECTA:*
Kielelezo cha Gramu 80 za elementi fulani kina nusu-maisha ya miaka 5. Je, zitabaki gramu ngapi baada ya miaka 20?
**Hatua:**
- n = 20 / 5 = 4 nusu-maisha
- N = 80 * (1/2)⁴ = 80 / 16 = Gramu 5.
Jibu: Zitabaki Gramu 5.

---

### 5. MATUMIZI YA MIONZI (APPLICATIONS OF RADIOACTIVITY)
1. **Sekta ya Afya (Medicine):**
   - Tiba ya Saratani (Radiotherapy kwa kutumia Cobalt-60).
   - Kufuatilia mtiririko wa damu na utendaji kazi wa tezi (Radioactive tracers kama Iodine-131).
   - Kutakasa vifaa vya upasuaji (Sterilization).
2. **Sekta ya Kilimo:**
   - Kuhifadhi mazao yasiharibike kwa kuua vijidudu na kuzuia mbegu kuota ghalaani.
   - Kuboresha vinasaba vya mbegu (Plant mutation breeding).
3. **Sekta ya Viwanda na Miundombinu:**
   - Kupima unene wa mabati, plastiki na karatasi viwandani (Thickness gauging).
   - Kuchunguza nyufa kwenye mabomba ya mafuta yaliyo ardhini au viunganishi vya madaraja (Radiography).
4. **Sekta ya Akiolojia (Carbon-14 Dating):**
   - Kukadiria umri wa mabaki ya viumbe hai vya kale (Fossils).

---

### 6. NUCLEAR FISSION NA NUCLEAR FUSION
- **Nuclear Fission:** Mgawanyiko wa kiini kizito (kama Uranium-235) kuwa viini vidogo viwili vilivyo thabiti zaidi baada ya kupigwa na neutroni ya polepole, huku ukitoa nishati kubwa na neutroni zaidi (Chain reaction). Hutumika katika vinu vya nyuklia (Nuclear reactors).
- **Nuclear Fusion:** Muungano wa viini viwili vyepesi (kama isotopu za hidrojeni: Deuterium na Tritium) kutengeneza kiini kizito cha Helium katika joto na mgandamizo mkubwa sana (kama ule uliopo kwenye Jua na Nyota). Fusion hutoa nishati nyingi zaidi kuliko Fission na haizalishi taka hatari za mionzi.

---

### 7. TAHADHARI NA USALAMA MAABARANI (RADIATION HAZARDS & SAFETY)
- Kutumia zana za kinga kama koti lenye risasi (Lead aprons) na miwani maalum.
- Kutumia kishikio maalum (tongs au robotic arms) badala ya kushika moja kwa moja kwa mikono.
- Kuhifadhi taka za mionzi kwenye mapipa mazito ya risasi (Lead-lined containers) na kuzika kina kirefu ardhini mbali na vyanzo vya maji.`
  },
  {
    id: 'admin-note-math-f4-coordinate-geometry',
    title: 'Basic Mathematics Form 4: Coordinate Geometry & Vectors (Notisi Kamili)',
    description: 'Miongozo, kanuni za mahesabu, equations of straight lines, perpendicularity, parallelism na vectors na mifano ya mitihani ya NECTA.',
    category: 'Notes',
    documentType: 'Notes',
    type: 'notes',
    subject: 'Basic Mathematics',
    classLevel: 'Form 4',
    educationLevel: 'O-Level',
    tags: ['Mathematics', 'Form 4', 'Coordinate Geometry', 'Vectors', 'Equations', 'NECTA', 'Admin'],
    uploadedBy: 'admin',
    uploadedByName: 'Mwalimu / Admin Lupanulla',
    createdAt: Date.now() - 86400000 * 3,
    views: 1820,
    downloadsCount: 790,
    rating: 5,
    status: 'approved',
    driveUrl: 'https://drive.google.com/file/d/1-QYU34U6qed2_G8UrL2KSdq3tZKbAvdS/view',
    content: `# BASIC MATHEMATICS FORM 4: COORDINATE GEOMETRY AND VECTORS
**Mwandishi:** Idara ya Hisabati - Lupanulla Elimu Hub (Admin)
**Maudhui:** Form 4 NECTA Basic Mathematics Revision Guide

---

### 1. UMBALI KATI YA POINTI MBILI (DISTANCE FORMULA)
Ikiwa una pointi mbili A(x₁, y₁) na B(x₂, y₂), umbali d kati ya pointi hizo unapatikana kwa kanuni ya Pythagoras:

**d = √[(x₂ - x₁)² + (y₂ - y₁)²]**

*Mfano:*
Pata umbali kati ya A(2, 3) na B(6, 6):
d = √[(6 - 2)² + (6 - 3)²] = √[4² + 3²] = √[16 + 9] = √25 = 5 units.

---

### 2. POINTI YA KATI (MIDPOINT OF A LINE SEGMENT)
Pointi ya kati M(x, y) ya mstari unaounganisha A(x₁, y₁) na B(x₂, y₂) inapatikana kwa:

**M = ((x₁ + x₂) / 2, (y₁ + y₂) / 2)**

---

### 3. MTEREMKO WA MSTARI (GRADIENT / SLOPE, m)
Mteremko hupima mwinuko wa mstari kwa kugawa badiliko la wima (Δy) kwa badiliko la mlalo (Δx):

**m = (y₂ - y₁) / (x₂ - x₁)**

**Ufafanuzi wa Mteremko:**
- Mteremko chanya (m > 0): Mstari unapanda kutoka kushoto kuelekea kulia.
- Mteremko hasi (m < 0): Mstari unashuka kutoka kushoto kuelekea kulia.
- Mteremko sufuri (m = 0): Mstari umelala kabisa (Horizontal line, y = c).
- Mteremko hauna mwisho (Undefined): Mstari umesimama wima (Vertical line, x = k).

---

### 4. MILINGANYO YA MSTARI ULIONYOOKA (EQUATIONS OF A STRAIGHT LINE)
1. **Gradient-Intercept Form:**
   **y = mx + c**
   (m ni gradient, c ni y-intercept ambapo mstari unakata mhimili wa y).
2. **Point-Slope Form:**
   **(y - y₁) = m(x - x₁)**
3. **General Form:**
   **Ax + By + C = 0**

---

### 5. UHUSIANO WA MISTARI MIWILI (PARALLEL & PERPENDICULAR LINES)
- **Mistari Sambamba (Parallel Lines):**
  Ina mteremko sawa daima:
  **m₁ = m₂**
- **Mistari Inayokutana kwa Pembe Mraba 90° (Perpendicular Lines):**
  Zao la miteremko yao ni sawa na hasi moja:
  **m₁ * m₂ = -1** au **m₂ = -1 / m₁**

---

### 6. VEKTA (VECTORS IN TWO DIMENSIONS)
Vekta ni wingi wenye ukubwa (magnitude) na mwelekeo (direction).
- **Column Vector Form:**
  v = (x, y)ᵀ
- **Unit Vector Form:**
  v = x*i + y*j (ambapo i na j ni unit vectors katika mihimili ya x na y).
- **Ukubwa wa Vekta (Magnitude):**
  |v| = √(x² + y²)
- **Unit Vector katika Mwelekeo wa v:**
  û = v / |v|
- **Zao la Nukta (Dot Product / Scalar Product):**
  Ikiwa a = (x₁, y₁) na b = (x₂, y₂):
  **a • b = x₁x₂ + y₁y₂ = |a||b| cos(θ)**
  *Muhimu:* Ikiwa vekta mbili ziko perpendicular (pembe 90°), basi:
  **a • b = 0**`
  },
  {
    id: 'admin-note-chem-f3-f4-mole-concept',
    title: 'Chemistry Form 3 & 4: The Mole Concept & Chemical Calculations (Notisi Kamili)',
    description: 'Dhana ya Mole, Avogadro constant, Molar mass, Empirical formula, Molarity na Volumetric Analysis (Titration Calculations) kwa NECTA.',
    category: 'Notes',
    documentType: 'Notes',
    type: 'notes',
    subject: 'Chemistry',
    classLevel: 'Form 4',
    educationLevel: 'O-Level',
    tags: ['Chemistry', 'Form 4', 'Mole Concept', 'Calculations', 'Titration', 'NECTA', 'Admin'],
    uploadedBy: 'admin',
    uploadedByName: 'Mwalimu / Admin Lupanulla',
    createdAt: Date.now() - 86400000 * 4,
    views: 1640,
    downloadsCount: 710,
    rating: 5,
    status: 'approved',
    driveUrl: 'https://drive.google.com/file/d/1EVTJRXa_4dL-oiyPzsts10_jJ5w9FoWy/view',
    content: `# CHEMISTRY FORM 3 & 4: THE MOLE CONCEPT AND STOICHIOMETRY
**Mwandishi:** Mkuu wa Kitengo cha Sayansi ya Kemia (Admin Lupanulla)
**Lengo:** Kuelewa mlinganyo wa kemikali na hesabu za titration kwa mtihani wa NECTA

---

### 1. DHANA YA MOLE (THE MOLE CONCEPT)
Mole ni kizio cha msingi cha kupimia kiwango cha dutu (amount of substance).
Mole moja ya dutu yoyote ina idadi ya chembechembe sawa na idadi ya atomu zilizomo katika gramu 12 za Carbon-12.
Nambari hii inaitwa **Avogadro's Constant (L au N_A)**:

**N_A = 6.022 × 10²³ chembechembe kwa kila mole (particles/mol)**

---

### 2. KANUNI ZA MSINGI ZA MAZINGIRA YA MOLE

1. **Kuhusiana na Masi (Mass):**
   **Idadi ya Mole (n) = Masi halisi (g) / Masi ya Molar (M, g/mol)**
   n = m / M

2. **Kuhusiana na Idadi ya Chembechembe (Particles):**
   **Idadi ya Chembechembe (N) = Idadi ya Mole (n) × N_A**
   N = n × (6.022 × 10²³)

3. **Kuhusiana na Ujazo wa Gesi katika Mlinganyo wa STP (Molar Gas Volume):**
   Katika Standard Temperature and Pressure (STP, 0°C na 1 atm):
   Mole 1 ya gesi yoyote inachukua **22.4 dm³ (litres)** au 22,400 cm³.
   Katika Room Temperature and Pressure (RTP, 25°C na 1 atm):
   Mole 1 ya gesi yoyote inachukua **24.0 dm³ (litres)**.
   **n = Ujazo wa Gesi (dm³) / 22.4 dm³ (katika STP)**

---

### 3. FORMULA ZA KIKEMIKALI (EMPIRICAL NA MOLECULAR FORMULA)
- **Empirical Formula:** Njia rahisi zaidi inayoonyesha uwiano kamili wa namba nzima wa atomu za kila elementi iliyomo katika kiwanja.
- **Molecular Formula:** Fomula halisi inayoonyesha idadi kamili ya atomu za kila elementi katika molekuli moja ya kiwanja.
- **Uhusiano:**
  **(Empirical Formula)_n = Molecular Formula**
  n = (Molar Mass ya Kiwanja) / (Masi ya Empirical Formula)

---

### 4. UKOLEZI NA UTATUZI WA MAJIMAJI (MOLARITY & SOLUTIONS)
- **Molarity (M au mol/dm³):** Idadi ya mole za solute zilizoyeyushwa katika lita 1 (1 dm³ au 1000 cm³) ya mmumunyo.
  **Molarity (M) = (Idadi ya Mole, n) / (Ujazo katika dm³, V)**
  au:
  **Molarity (M) = (Masi katika g/dm³) / (Molar Mass)**

- **Titration Formula (Volumetric Analysis):**
  **(M_a × V_a) / n_a = (M_b × V_b) / n_b**
  Ambapo:
  - M_a = Molarity ya Asidi
  - V_a = Ujazo wa Asidi uliotumika (Titre value)
  - n_a = Idadi ya mole za asidi kutoka kwenye mlinganyo uliobalance
  - M_b = Molarity ya Besi
  - V_b = Ujazo wa Besi uliowekwa kwa pipette (kwa kawaida 20 au 25 cm³)
  - n_b = Idadi ya mole za besi kutoka kwenye mlinganyo uliobalance`
  },
  {
    id: 'admin-note-bio-f4-genetics-evolution',
    title: 'Biology Form 4: Genetics, Variation & Evolution (Notisi Kamili za Admin)',
    description: 'Misingi ya Uridhi (Genetics), Sheria za Mendel, Punnett Squares, Sex Determination, Mutations na Nadharia za Evolution kwa NECTA.',
    category: 'Notes',
    documentType: 'Notes',
    type: 'notes',
    subject: 'Biology',
    classLevel: 'Form 4',
    educationLevel: 'O-Level',
    tags: ['Biology', 'Form 4', 'Genetics', 'Evolution', 'Mendel', 'NECTA', 'Admin'],
    uploadedBy: 'admin',
    uploadedByName: 'Mwalimu / Admin Lupanulla',
    createdAt: Date.now() - 86400000 * 5,
    views: 1390,
    downloadsCount: 580,
    rating: 5,
    status: 'approved',
    driveUrl: 'https://drive.google.com/file/d/1YrOUvQyu7o51Ey-Szh7_uG5TrnncZLLA/view',
    content: `# BIOLOGY FORM 4: GENETICS, VARIATION AND EVOLUTION
**Mwandishi:** Kitengo cha Sayansi ya Uhai (Admin Lupanulla)
**Ngazi:** Kidato cha Nne & Maandalizi ya NECTA

---

### 1. UTANGULIZI NA MSAMIATI WA GENETICS
Genetics ni tawi la biolojia linalochunguza urithi (heredity) na tofauti (variation) miongoni mwa viumbe hai.
- **Gene:** Sehemu ya DNA iliyo kwenye kromosomu inayobeba taarifa maalum ya sifa fulani ya kibaolojia.
- **Allele:** Aina mbadala za jeni moja (mfano T kwa urefu na t kwa ufupi).
- **Dominant Allele:** Allele inayojitokeza na kuficha sifa ya allele nyingine (huandikwa kwa herufi kubwa, mfano T).
- **Recessive Allele:** Allele inayojitokeza tu pale inapokuwa pacha peke yake (huandikwa kwa herufi ndogo, mfano t).
- **Genotype:** Muundo halisi wa jeni za kiumbe (mfano TT, Tt, au tt).
- **Phenotype:** Muonekano wa nje au sifa inayoweza kuonekana/kuhisiwa (mfano kimo kirefu au kifupi).
- **Homozygous:** Kiumbe mwenye aleli mbili zinazofanana (mfano TT au tt).
- **Heterozygous:** Kiumbe mwenye aleli mbili tofauti kwa sifa moja (mfano Tt).

---

### 2. SHERIA ZA MENDEL ZA URITHI (MENDEL'S LAWS)
Gregor Mendel anafahamika kama "Baba wa Genetics ya Kisasa". Alifanya majaribio yake kwa kutumia mimea ya njegere (Garden pea - *Pisum sativum*).

1. **Sheria ya Kwanza ya Mendel (Law of Segregation):**
   Wakati wa kutengeneza gameti (wakati wa meiosis), aleli mbili za kila jeni hutengana ili kila gameti ipate aleli moja tu.
2. **Sheria ya Pili ya Mendel (Law of Independent Assortment):**
   Aleli za jeni tofauti hujigawa kwa uhuru na bila kuingiliana wakati wa utengenezaji wa gameti.

---

### 3. MFANO WA PUNNETT SQUARE: MONOHYBRID CROSS
Mpanda mimea miwili: Mzazi mrefu homozygous (TT) x Mzazi mfupi homozygous (tt).
- Gameti: T na t
- **Kizazi cha Kwanza (F1 Generation):**
  Zote 100% zitakuwa na Genotype ya Tt (Heterozygous Tall). Phenotype: Mimea mirefu yote.

Ikiwa mimea ya F1 itajipanda yenyewe (Selfing: Tt x Tt):
- **Kizazi cha Pili (F2 Generation):**
  - Genotypic Ratio: 1 TT : 2 Tt : 1 tt (1:2:1)
  - Phenotypic Ratio: 3 Mirefu : 1 Mfupi (3:1)

---

### 4. UAMUZI WA JINSIA KWA BINADAMU (SEX DETERMINATION)
Binadamu ana jozi 23 za kromosomu (jumla kromosomu 46):
- Jozi 22 ni Autosomes (Kromosomu za mwili wa kawaida).
- Jozi 1 ni Sex Chromosomes:
  - Mwanamke ana: **XX** (Homogametic - hutoa yai lenye X pekee).
  - Mwanaume ana: **XY** (Heterogametic - hutoa manii yenye X au Y kwa uwiano wa 50:50).
- **Hitimisho la Kibaolojia:** Baba ndiye anayeamua jinsia ya mtoto kibaolojia kwa sababu manii yake yanaweza kubeba X au Y!`
  },
  {
    id: 'admin-note-kisw-f4-ushairi-fasihi',
    title: 'Kiswahili Kidato cha 4: Fasihi Simulizi na Ushairi wa Kiswahili (Notisi Rasmi)',
    description: 'Bahari za Ushairi, Muundo, Vina, Mizani, Uchambuzi wa Diwani teule, Fani na Maudhui na mifano ya majibu ya NECTA Kidato cha Nne.',
    category: 'Notes',
    documentType: 'Notes',
    type: 'notes',
    subject: 'Kiswahili',
    classLevel: 'Form 4',
    educationLevel: 'O-Level',
    tags: ['Kiswahili', 'Form 4', 'Ushairi', 'Fasihi Simulizi', 'Diwani', 'NECTA', 'Admin'],
    uploadedBy: 'admin',
    uploadedByName: 'Mwalimu / Admin Lupanulla',
    createdAt: Date.now() - 86400000 * 6,
    views: 1950,
    downloadsCount: 880,
    rating: 5,
    status: 'approved',
    driveUrl: 'https://drive.google.com/file/d/1_j4OjZxD-hN36xhsTogU1GHnV1mCIInk/view',
    content: `# KISWAHILI KIDATO CHA NNE: USHAIRI NA FASIHI SIMULIZI
**Mwandishi:** Kitengo cha Lugha na Fasihi ya Kiswahili - Lupanulla Hub (Admin)
**Ngazi:** Kidato cha Tatu na cha Nne (NECTA CSEE)

---

### 1. MAANA NA DHANA YA USHAIRI
Ushairi ni tanzu ya fasihi inayotumia mpangilio maalum wa maneno yenye mahadhi, mnato, hisia, urari wa vina na mizani (katika ushairi wa kimapokeo) au mtiririko huru wenye picha na mafumbo (katika ushairi wa kisasa/masivina).

---

### 2. MAKUNDI YA WASANII WA USHAIRI
1. **Wanamapokeo (Traditionalists / Wanazuoni):**
   - Hawa wanaamini shairi halali la Kiswahili lazima lizingatie kanuni za arudhi (vina, mizani, beti, vipande na kibwagizo).
   - Wanasisitiza: "Bila vina na mizani, hilo ni ngonjera au mashairi legelege."
   - Mifano ya washairi: Shaaban Robert, Amri Abeid, Mathias Mnyampala.
2. **Wanamabadiliko (Modernists / Wanamapinduzi):**
   - Hawa wanaamini ushairi uko kwenye hisia, mnato, na ujumbe, si katika gereza la vina na mizani.
   - Wanasema urari wa vina na mizani unamnyima mshairi uhuru wa kueleza hisia zake za dhati.
   - Mifano ya washairi: Euphrase Kezilahabi, Mugyabuso Mulokozi, Kahigi.

---

### 3. BAHARI ZA USHAIRI KULINGANA NA MIUNDO MBALIMBALI
Bahari ni aina za mashairi kulingana na muundo au sifa mahususi:
1. **Kulingana na Idadi ya Mishororo katika Ubeti:**
   - **Tathmina:** Shairi lenye mishororo miwili kwa kila ubeti.
   - **Tathilitha:** Shairi lenye mishororo mitatu kwa kila ubeti.
   - **Tarbia:** Shairi lenye mishororo minne kwa kila ubeti (Hii ndiyo bahari maarufu zaidi).
   - **Takhmisa:** Shairi lenye mishororo mitano kwa kila ubeti.
   - **Tasdisa:** Shairi lenye mishororo sita kwa kila ubeti.
2. **Kulingana na Vina na Mtiririko:**
   - **Ukaraguni:** Shairi ambalo vina vyake vya kati na vya mwisho vinabadilika kila ubeti bila utaratibu uliotulia.
   - **Utando:** Shairi ambalo nusu ya kwanza inategemea nusu ya pili.
   - **Pindu:** Shairi ambalo neno au kifungu cha mwisho cha mshororo kinakuwa cha kwanza katika mshororo unaofuata.
   - **Kikwamba:** Shairi ambalo neno la kwanza la kila mshororo au ubeti linaanza kwa neno lilelile.
   - **Sakarani:** Shairi lililochanganya bahari mbili au zaidi kwa pamoja.

---

### 4. VIPENGELE VYA FANI NA MAUDHUI KATIKA UCHAMBUZI WA USHAIRI
- **Fani (Form / Style):**
  - Muundo wa beti, mishororo, vipande (Ukwapi na Utao).
  - Vina vya kati na vina vya mwisho.
  - Idadi ya mizani (mfano 8/8 = 16).
  - Matumizi ya lugha: Tamathali za semi (Tashbiha, Sitiari, Tashhisi, Balagha, Mubalagha), mbinu za kimtindo, na taswira.
- **Maudhui (Content / Themes):**
  - Dhamira kuu na dhamira ndogondogo (mfano umaskini, elimu, uongozi mbaya, mapenzi, uzalendo, unyonyaji).
  - Ujumbe na mafunzo kwa jamii.
  - Falsafa na msimamo wa mshairi.`
  },
  {
    id: 'admin-note-geo-f4-map-reading',
    title: 'Geography Form 4: Map Reading, Contours & Surveying (Notisi Kamili)',
    description: 'Kusoma ramani za topografia, Grid References, Contours, Scales, Gradient na Cross-Section ya NECTA Geography.',
    category: 'Notes',
    documentType: 'Notes',
    type: 'notes',
    subject: 'Geography',
    classLevel: 'Form 4',
    educationLevel: 'O-Level',
    tags: ['Geography', 'Form 4', 'Map Reading', 'Contours', 'NECTA', 'Admin'],
    uploadedBy: 'admin',
    uploadedByName: 'Mwalimu / Admin Lupanulla',
    createdAt: Date.now() - 86400000 * 7,
    views: 1510,
    downloadsCount: 640,
    rating: 5,
    status: 'approved',
    driveUrl: 'https://drive.google.com/file/d/1rNr8hu8v1HkvvXwJ2OET8kyCrQ_PtrTu/view',
    content: `# GEOGRAPHY FORM 4: MAP READING AND PHOTOGRAPH INTERPRETATION
**Mwandishi:** Mwalimu Mkuu wa Jiografia - Lupanulla Hub (Admin)
**Maudhui:** Maandalizi ya Practical Geography kwa ajili ya Mtihani wa NECTA

---

### 1. UTANGULIZI WA RAMANI ZA TOPOGRAFIA
Ramani ya topografia (Topographical Map) ni mchoro unaoonyesha maumbile ya asili (kama milima, mabonde, mito, maziwa) na maumbile yaliyoundwa na binadamu (kama barabara, makazi, reli, mashamba) katika eneo fulani la uso wa dunia.

---

### 2. GRID REFERENCES (EASTINGS NA NORTHINGS)
Gridi ni mtandao wa mistari inayokutana kwa pembe mraba:
- **Eastings:** Mistari ya wima inayoongezeka thamani zake kuelekea Mashariki (kutoka kushoto kwenda kulia).
- **Northings:** Mistari ya mlalo inayoongezeka thamani zake kuelekea Kaskazini (kutoka chini kwenda juu).
- **Kanuni ya Dhahabu:** Daima soma **Eastings kwanza kisha Northings** (Kumbuka: "Ingia kwanza ndani ya nyumba kabla ya kupanda ngazi!").

#### Four-Figure Grid Reference (Nambari 4):
Hutumika kuelekeza mraba mzima wa gridi (Grid square).
*Mfano:* Eneo lilio kwenye Easting 34 na Northing 62 linaitwa **3462**.

#### Six-Figure Grid Reference (Nambari 6):
Hutumika kuelekeza mahali husika (point object) kwa usahihi mkubwa ndani ya mraba.
Mraba hugawanywa katika vipande 10 vya kumi:
*Mfano:* Easting 34 kipande cha 6, Northing 62 kipande cha 3 = **346623**.

---

### 3. MISTARI YA MWINUKO (CONTOURS) NA MAUMBILE YA ARDHI
Contour ni mstari unaounganisha maeneo yote yenye urefu sawa kutoka usawa wa bahari (mean sea level).
- **Contour Interval (Vertical Interval - V.I):** Tofauti ya kimo kati ya mistari miwili inayofuatana (kwa mfano kila baada ya mita 20).
- **Mteremko Mkali (Steep Slope):** Mistari ya contours ikiwa imebanana sana kwa karibu.
- **Mteremko wa Wastani (Gentle Slope):** Mistari ya contours ikiwa imeachana kwa mbali.
- **Bonde lenye Mto (Valley / River Spur):** Mistari ya contours inayoonyesha umbo la herufi 'V' ikielekeza upande wa urefu wa juu (kuelekea mlimani).`
  },
  {
    id: 'admin-note-eng-f4-essay-literature',
    title: 'English Language Form 4: Literary Works & Essay Composition (Notisi Kamili)',
    description: 'Literature analysis (Themes, Characterization, Poetic Devices), Formal Letters and Composition Writing for NECTA CSEE English.',
    category: 'Notes',
    documentType: 'Notes',
    type: 'notes',
    subject: 'English',
    classLevel: 'Form 4',
    educationLevel: 'O-Level',
    tags: ['English', 'Form 4', 'Literature', 'Essay', 'NECTA', 'Admin'],
    uploadedBy: 'admin',
    uploadedByName: 'Mwalimu / Admin Lupanulla',
    createdAt: Date.now() - 86400000 * 8,
    views: 1320,
    downloadsCount: 530,
    rating: 5,
    status: 'approved',
    driveUrl: 'https://drive.google.com/file/d/1EVTJRXa_4dL-oiyPzsts10_jJ5w9FoWy/view',
    content: `# ENGLISH LANGUAGE FORM 4: LITERARY ANALYSIS & ESSAY COMPOSITION
**Author:** Head of English Language Department - Lupanulla Hub (Admin)
**Target:** Form 4 NECTA National Examination Preparation

---

### 1. GUIDELINES FOR ANSWERING LITERATURE ESSAY QUESTIONS
In the NECTA English Paper, Section C requires thorough analysis of prescribed class readers (Plays, Novels, and Poetry).

#### Structure of a 15-Marks Literature Essay:
1. **Introduction (1.5 - 2 Marks):**
   - Define the keyword/theme asked in the question (e.g., "Betrayal", "Oppression", "Ignorance", "Position of Women").
   - Mention the titles of the two books you have chosen and the full names of their respective authors.
   - Provide a brief 1-2 sentence overview directly answering the question prompt.
2. **Body Paragraphs (10 - 11 Marks):**
   - Provide 3 strong, distinct points from Book 1 and 3 strong points from Book 2.
   - For every point: State the point clearly, name the characters involved, explain the specific context/incident from the plot, and show how it relates back to the question.
3. **Conclusion (1.5 - 2 Marks):**
   - Synthesize your arguments with a strong evaluation of how these literary lessons apply to modern African societies today.

---

### 2. CORE THEMES IN PRESCRIBED TANZANIAN READINGS
- **The Dilemma of a Ghost (Ama Ata Aidoo):** Conflicts between modern Westernized expectations and traditional African customs; cultural adaptation; marital misunderstandings.
- **Passed Like a Shadow (Bernard Mapalala):** The devastating scourge of HIV/AIDS; moral decay; importance of counseling, responsible sexual behavior, and parental guidance.
- **Unanswered Cries (Osman Conteh):** The fight against female genital mutilation (FGM); human rights of the girl child; courage in standing against harmful cultural dogmas.
- **A Wreath for Fr. Mayer (S.N. Ndunguru):** Greed, corruption, murder mystery, and social responsibility in community leadership.

---

### 3. FORMAL LETTER WRITING RULES
- Two addresses: Sender's address (top right) and Receiver's designation & address (left side).
- Date: Written in full format (e.g., *12th October 2026*).
- Salutation: *Dear Sir/Madam,*
- Heading / Reference: Capitalized or bold underlined (e.g., **RE: APPLICATION FOR EMPLOYMENT AS AN ASSISTANT TEACHER**).
- Complimentary close: *Yours faithfully,* followed by signature and full official name in block capitals.`
  }
];

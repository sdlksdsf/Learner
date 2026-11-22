/**
 * Subject catalogue and verified syllabus content.
 *
 * Provenance matters here. Every code and chapter in `verified` was read from
 * the board's own published syllabus, and `source` points at the document it
 * came from. Subjects without chapter data are listed with their official code
 * so the catalogue is complete, but the app never claims topics it has not
 * confirmed — an empty `topics` array means "not yet transcribed", not
 * "no content".
 */

export type SyllabusLevel = "IGCSE" | "O Level" | "AS" | "A Level";

export interface SyllabusTopic {
  /** Chapter heading as the syllabus numbers it. */
  code: string;
  name: string;
  /** Sub-topics, in the syllabus's own wording where short enough to quote. */
  points: string[];
}

export interface CatalogueEntry {
  id: string;
  name: string;
  code: string;
  levels: SyllabusLevel[];
  board: "CAIE" | "Edexcel" | "AQA" | "OCR";
  group: string;
  /** True when this subject has a question bank and can build a paper. */
  bank: boolean;
  topics?: SyllabusTopic[];
  source?: string;
}

const CAIE_IGCSE =
  "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/";
const CAIE_OL =
  "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-o-level/subjects/";
const CAIE_AL =
  "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-advanced/cambridge-international-as-and-a-levels/subjects/";

/* ------------------- Verified: Pakistan Studies 0448 (2026) ---------------- */
/* Source: 0448 syllabus for examination in 2026, sections 3 and 6. */

const pakistanStudiesTopics: SyllabusTopic[] = [
  {
    code: "P1 §1",
    name: "Cultural and historical background to the Pakistan Movement",
    points: [
      "Religious reformers: Shah Waliullah, Syed Ahmad Barelvi, Haji Shariatullah and the Faraizi Movement",
      "Decline of the Mughal Empire: Aurangzeb's policies, successors, Maratha and Sikh rise",
      "British expansion to 1857, Anglo-Sikh wars, annexation of the Punjab and Peshawar, the NW Frontier",
      "War of Independence 1857–58: causes, course, reasons for failure, consequences",
      "Sir Syed Ahmad Khan and the Aligarh Movement, the Two-Nation Theory, the Hindi–Urdu controversy",
      "Urdu as national language and the promotion of regional languages",
    ],
  },
  {
    code: "P1 §2",
    name: "The emergence of Pakistan 1906–47",
    points: [
      "Partition of Bengal 1905–11, Simla Deputation 1906, founding of the Muslim League",
      "Morley–Minto 1909, Lucknow Pact 1916, Rowlatt Act and Amritsar 1919, Montagu–Chelmsford 1919",
      "Khilafat and Hijrat Movements: origins, aims, reasons for failure",
      "Simon Commission, Nehru Report 1928, Jinnah's 14 Points 1929, Allahabad Address 1930",
      "Round Table Conferences 1930–32, Communal Award 1932, Government of India Act 1935",
      "1937 elections, Congress rule 1937–39, Day of Deliverance",
      "Pakistan Resolution 1940, Cripps Mission, Gandhi–Jinnah talks, Simla Conference, Cabinet Mission",
      "3 June Plan, Radcliffe Award, Indian Independence Act 1947",
      "Contributions of Jinnah, Allama Iqbal and Rahmat Ali",
    ],
  },
  {
    code: "P1 §3",
    name: "Nationhood 1947–99",
    points: [
      "Establishing the state: Radcliffe Award aftermath, Canal Water Dispute, division of assets, Kashmir, refugees",
      "Ministries 1948–58: Nazimuddin, Liaquat Ali Khan, Ghulam Muhammad, Iskander Mirza",
      "Ayub Khan and the Decade of Progress 1958–69; Yahya Khan",
      "Objectives Resolution 1949; constitutions of 1956, 1962 and 1973",
      "East Pakistan and the creation of Bangladesh: Six Points, Awami League, 1971 war",
      "Zulfikar Ali Bhutto 1971–77: nationalisation, 1973 constitution, Simla Agreement",
      "Zia-ul-Haq 1977–88: Islamisation, Eighth Amendment, Soviet invasion of Afghanistan",
      "Benazir Bhutto and Nawaz Sharif governments; Musharraf 1999",
      "Foreign policy: India, Afghanistan, Iran, China, USSR/Russia, USA, UK, Commonwealth, UN; nuclear programme",
    ],
  },
  {
    code: "P2 §1",
    name: "The land of Pakistan",
    points: [
      "Location: Tropic of Cancer, 30°N/36°N, 64°E/70°E/76°E, the Arabian Sea, neighbouring countries",
      "Administrative areas and named cities",
      "Natural topography and drainage: Balochistan Plateau, Sulaiman, Safed Koh, Potwar, Salt Range, Hindu Kush, Karakoram, Himalaya",
      "Rivers: Indus, Jhelum, Chenab, Ravi, Sutlej, Kabul, Hab, Dasht; deserts Thar, Thal, Kharan",
      "Climate: monsoon, depressions, convectional rain, cyclones; arid, semi-arid, humid and highland regions",
    ],
  },
  {
    code: "P2 §2",
    name: "Natural resources — an issue of sustainability",
    points: [
      "Water: Mangla, Tarbela and Warsak dams, barrages, the Indus Water Treaty",
      "Water supply problems including pollution; conservation and sustainable development",
      "Forests, fishing and mineral resources; feasibility studies and environmental impact",
    ],
  },
  {
    code: "P2 §3–5",
    name: "Power, agriculture and industry",
    points: [
      "Power: hydel, thermal, nuclear, alternative energy; supply and demand",
      "Agricultural development: cash crops, irrigation, waterlogging and salinity, land reform",
      "Industrial development: large and small scale, industrial estates, problems of industrialisation",
    ],
  },
  {
    code: "P2 §6–8",
    name: "Trade, transport, population and employment",
    points: [
      "Trade: exports, imports, balance of payments, trading partners",
      "Transport and telecommunications: road, rail, air, ports",
      "Population: growth, distribution, density, migration, employment structure",
    ],
  },
];

/* --------------------- Verified: Islamiyat 0493 (2026–27) ------------------ */
/* Source: 0493 syllabus for examination in 2026 and 2027, section 5. */

const islamiyatTopics: SyllabusTopic[] = [
  {
    code: "P1 §1",
    name: "Major themes of the Qur'an",
    points: [
      "God in himself",
      "God's relationship with the created world",
      "God's Messengers",
      "Themes in the lives of Muslims today",
    ],
  },
  {
    code: "P1 §2",
    name: "The history and importance of the Qur'an",
    points: [
      "Revelation to the Prophet (pbuh), 610–632",
      "Compilation under the Rightly Guided Caliphs",
      "Major themes of the Qur'an",
      "Use in legal thinking: relationship with Hadith, ijma' and qiyas",
      "Significance as the basis of thought and action in Islam",
    ],
  },
  {
    code: "P1 §3",
    name: "The life and importance of the Prophet Muhammad (pbuh)",
    points: [
      "Birth to the call to prophethood",
      "Activities in Makka and the experience of opposition",
      "Activities in Madina, leadership of the community and conflict with the Makkans",
      "Actions and character as examples for individuals and communities",
      "Significance as Seal of the Prophets",
    ],
  },
  {
    code: "P1 §4",
    name: "The first Islamic community",
    points: [
      "The Prophet's wives",
      "His descendants, including the line recognised by Shi'a Muslims as Imams",
      "Leading Companions, the Ten Blessed Companions, the Scribes",
      "The Emigrants and the Helpers; the four Rightly Guided Caliphs during his lifetime",
    ],
  },
  {
    code: "P2 §1",
    name: "Major teachings in the Hadiths",
    points: [
      "Individual conduct",
      "Life in the community",
      "Passages studied in Arabic and English translation",
    ],
  },
  {
    code: "P2 §2",
    name: "The history and importance of the Hadiths",
    points: [
      "Compilation of the Hadiths; earliest collections",
      "The main musnad and musannaf collections and their compilers",
      "Isnad and matn: testing the reliability of a Hadith",
      "The six Sunni collections and the four Shi'a collections",
      "Use in legal thinking alongside the Qur'an, ijma' and qiyas",
    ],
  },
  {
    code: "P2 §3",
    name: "The Rightly Guided Caliphs",
    points: [
      "Main events of the rule of the four Caliphs",
      "Policies in maintaining and expanding the state",
      "Approaches to leading the community",
    ],
  },
];

/* ------------------------------ The catalogue ----------------------------- */

interface Row {
  name: string;
  code: string;
  group: string;
  levels: SyllabusLevel[];
}

const igcseRows: Row[] = [
  { name: "Accounting", code: "0452", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Accounting (9-1)", code: "0985", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Afrikaans — Second Language", code: "0548", group: "Languages", levels: ["IGCSE"] },
  { name: "Agriculture", code: "0600", group: "Sciences", levels: ["IGCSE"] },
  { name: "Arabic — First Language", code: "0508", group: "Languages", levels: ["IGCSE"] },
  { name: "Arabic — Foreign Language", code: "0544", group: "Languages", levels: ["IGCSE"] },
  { name: "Art & Design", code: "0400", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Bahasa Indonesia", code: "0538", group: "Languages", levels: ["IGCSE"] },
  { name: "Biology", code: "0610", group: "Sciences", levels: ["IGCSE"] },
  { name: "Biology (9-1)", code: "0970", group: "Sciences", levels: ["IGCSE"] },
  { name: "Business", code: "0264", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Business Studies", code: "0450", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Chemistry", code: "0620", group: "Sciences", levels: ["IGCSE"] },
  { name: "Chemistry (9-1)", code: "0971", group: "Sciences", levels: ["IGCSE"] },
  { name: "Chinese — First Language", code: "0509", group: "Languages", levels: ["IGCSE"] },
  { name: "Chinese — Second Language", code: "0523", group: "Languages", levels: ["IGCSE"] },
  { name: "Commerce", code: "0715", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Computer Science", code: "0478", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Computer Science (9-1)", code: "0984", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Design & Technology", code: "0445", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Drama", code: "0411", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Economics", code: "0455", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "English — First Language", code: "0500", group: "English language and literature", levels: ["IGCSE"] },
  { name: "English — Literature in English", code: "0475", group: "English language and literature", levels: ["IGCSE"] },
  { name: "English as a Second Language", code: "0510", group: "English language and literature", levels: ["IGCSE"] },
  { name: "English as a Second Language (Count-in Speaking)", code: "0511", group: "English language and literature", levels: ["IGCSE"] },
  { name: "Enterprise", code: "0454", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Environmental Management", code: "0680", group: "Sciences", levels: ["IGCSE"] },
  { name: "Food & Nutrition", code: "0648", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "French — First Language", code: "0501", group: "Languages", levels: ["IGCSE"] },
  { name: "French — Foreign Language", code: "0520", group: "Languages", levels: ["IGCSE"] },
  { name: "Geography", code: "0460", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "German — First Language", code: "0505", group: "Languages", levels: ["IGCSE"] },
  { name: "German — Foreign Language", code: "0525", group: "Languages", levels: ["IGCSE"] },
  { name: "Global Perspectives", code: "0457", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Hindi as a Second Language", code: "0549", group: "Languages", levels: ["IGCSE"] },
  { name: "History", code: "0470", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "History — American (US)", code: "0409", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Information and Communication Technology", code: "0417", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Islamiyat", code: "0493", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "IsiZulu as a Second Language", code: "0531", group: "Languages", levels: ["IGCSE"] },
  { name: "Italian — Foreign Language", code: "0535", group: "Languages", levels: ["IGCSE"] },
  { name: "Latin", code: "0480", group: "Languages", levels: ["IGCSE"] },
  { name: "Malay — First Language", code: "0696", group: "Languages", levels: ["IGCSE"] },
  { name: "Malay — Foreign Language", code: "0546", group: "Languages", levels: ["IGCSE"] },
  { name: "Marine Science", code: "0697", group: "Sciences", levels: ["IGCSE"] },
  { name: "Mathematics", code: "0580", group: "Mathematics", levels: ["IGCSE"] },
  { name: "Mathematics — Additional", code: "0606", group: "Mathematics", levels: ["IGCSE"] },
  { name: "Mathematics — International", code: "0607", group: "Mathematics", levels: ["IGCSE"] },
  { name: "Mathematics (9-1)", code: "0980", group: "Mathematics", levels: ["IGCSE"] },
  { name: "Music", code: "0410", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Pakistan Studies", code: "0448", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Physical Education", code: "0413", group: "Creative and professional", levels: ["IGCSE"] },
  { name: "Physical Science", code: "0652", group: "Sciences", levels: ["IGCSE"] },
  { name: "Physics", code: "0625", group: "Sciences", levels: ["IGCSE"] },
  { name: "Physics (9-1)", code: "0972", group: "Sciences", levels: ["IGCSE"] },
  { name: "Portuguese — First Language", code: "0504", group: "Languages", levels: ["IGCSE"] },
  { name: "Psychology", code: "0266", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Religious Studies", code: "0490", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Sanskrit", code: "0499", group: "Languages", levels: ["IGCSE"] },
  { name: "Science — Combined", code: "0653", group: "Sciences", levels: ["IGCSE"] },
  { name: "Sciences — Co-ordinated (Double)", code: "0654", group: "Sciences", levels: ["IGCSE"] },
  { name: "Setswana — First Language", code: "0698", group: "Languages", levels: ["IGCSE"] },
  { name: "Sociology", code: "0495", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Spanish — First Language", code: "0502", group: "Languages", levels: ["IGCSE"] },
  { name: "Spanish — Foreign Language", code: "0530", group: "Languages", levels: ["IGCSE"] },
  { name: "Statistics", code: "0479", group: "Mathematics", levels: ["IGCSE"] },
  { name: "Swahili", code: "0262", group: "Languages", levels: ["IGCSE"] },
  { name: "Thai — First Language", code: "0518", group: "Languages", levels: ["IGCSE"] },
  { name: "Travel & Tourism", code: "0471", group: "Humanities and social sciences", levels: ["IGCSE"] },
  { name: "Turkish — First Language", code: "0513", group: "Languages", levels: ["IGCSE"] },
  { name: "Urdu as a Second Language", code: "0539", group: "Languages", levels: ["IGCSE"] },
  { name: "Vietnamese — First Language", code: "0695", group: "Languages", levels: ["IGCSE"] },
  { name: "World Literature", code: "0408", group: "English language and literature", levels: ["IGCSE"] },
];

const oLevelRows: Row[] = [
  { name: "Accounting", code: "7707", group: "Creative and professional", levels: ["O Level"] },
  { name: "Arabic", code: "3180", group: "Languages", levels: ["O Level"] },
  { name: "Art & Design", code: "6090", group: "Creative and professional", levels: ["O Level"] },
  { name: "Bangladesh Studies", code: "7094", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Bengali", code: "3204", group: "Languages", levels: ["O Level"] },
  { name: "Biblical Studies", code: "2035", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Biology", code: "5090", group: "Sciences", levels: ["O Level"] },
  { name: "Business", code: "7081", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Business Studies", code: "7115", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Chemistry", code: "5070", group: "Sciences", levels: ["O Level"] },
  { name: "Commerce", code: "7100", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Computer Science", code: "2210", group: "Creative and professional", levels: ["O Level"] },
  { name: "Economics", code: "2281", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "English Language", code: "1123", group: "English language and literature", levels: ["O Level"] },
  { name: "Environmental Management", code: "5014", group: "Sciences", levels: ["O Level"] },
  { name: "Fashion & Textiles", code: "6130", group: "Creative and professional", levels: ["O Level"] },
  { name: "Food & Nutrition", code: "6065", group: "Creative and professional", levels: ["O Level"] },
  { name: "Geography", code: "2217", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Global Perspectives", code: "2069", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "History", code: "2147", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Islamic Studies", code: "2068", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Islamiyat", code: "2058", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Literature in English", code: "2010", group: "English language and literature", levels: ["O Level"] },
  { name: "Mathematics — Additional", code: "4037", group: "Mathematics", levels: ["O Level"] },
  { name: "Mathematics (Syllabus D)", code: "4024", group: "Mathematics", levels: ["O Level"] },
  { name: "Pakistan Studies", code: "2059", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Physics", code: "5054", group: "Sciences", levels: ["O Level"] },
  { name: "Sanskrit", code: "3216", group: "Languages", levels: ["O Level"] },
  { name: "Science — Combined", code: "5129", group: "Sciences", levels: ["O Level"] },
  { name: "Sinhala", code: "3205", group: "Languages", levels: ["O Level"] },
  { name: "Sociology", code: "2251", group: "Humanities and social sciences", levels: ["O Level"] },
  { name: "Statistics", code: "4040", group: "Mathematics", levels: ["O Level"] },
  { name: "Tamil", code: "3226", group: "Languages", levels: ["O Level"] },
  { name: "Urdu — First Language", code: "3247", group: "Languages", levels: ["O Level"] },
  { name: "Urdu — Second Language", code: "3248", group: "Languages", levels: ["O Level"] },
];

const aLevelRows: Row[] = [
  { name: "Accounting", code: "9706", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Arabic", code: "9680", group: "Languages", levels: ["AS", "A Level"] },
  { name: "Art & Design", code: "9479", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Biology", code: "9700", group: "Sciences", levels: ["AS", "A Level"] },
  { name: "Business", code: "9609", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Chemistry", code: "9701", group: "Sciences", levels: ["AS", "A Level"] },
  { name: "Classical Studies", code: "9274", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Computer Science", code: "9618", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Design & Technology", code: "9705", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Digital Media & Design", code: "9481", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Drama", code: "9482", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Economics", code: "9708", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "English — Language and Literature", code: "8695", group: "English language and literature", levels: ["AS"] },
  { name: "English — Literature", code: "9695", group: "English language and literature", levels: ["AS", "A Level"] },
  { name: "English General Paper", code: "8021", group: "English language and literature", levels: ["AS"] },
  { name: "English Language", code: "9093", group: "English language and literature", levels: ["AS", "A Level"] },
  { name: "Environmental Management", code: "8291", group: "Sciences", levels: ["AS"] },
  { name: "French Language", code: "8028", group: "Languages", levels: ["AS"] },
  { name: "Geography", code: "9696", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "German Language", code: "8027", group: "Languages", levels: ["AS"] },
  { name: "Global Perspectives & Research", code: "9239", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Hinduism", code: "9487", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "History", code: "9489", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Information Technology", code: "9626", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Islamic Studies", code: "9488", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Law", code: "9084", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Marine Science", code: "9693", group: "Sciences", levels: ["AS", "A Level"] },
  { name: "Mathematics", code: "9709", group: "Mathematics", levels: ["AS", "A Level"] },
  { name: "Mathematics — Further", code: "9231", group: "Mathematics", levels: ["AS", "A Level"] },
  { name: "Media Studies", code: "9607", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Music", code: "9483", group: "Creative and professional", levels: ["AS", "A Level"] },
  { name: "Physics", code: "9702", group: "Sciences", levels: ["AS", "A Level"] },
  { name: "Psychology", code: "9990", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Sociology", code: "9699", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Spanish Language", code: "8022", group: "Languages", levels: ["AS"] },
  { name: "Sport & Physical Education", code: "8386", group: "Creative and professional", levels: ["AS"] },
  { name: "Tamil — Language", code: "8689", group: "Languages", levels: ["AS"] },
  { name: "Thinking Skills", code: "9694", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Travel & Tourism", code: "9395", group: "Humanities and social sciences", levels: ["AS", "A Level"] },
  { name: "Urdu — Language", code: "8686", group: "Languages", levels: ["AS"] },
  { name: "Urdu — Pakistan only", code: "9686", group: "Languages", levels: ["A Level"] },
  { name: "Urdu Language & Literature (Pakistan)", code: "9866", group: "Languages", levels: ["AS", "A Level"] },
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[—–]/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Subjects with a question bank, so a paper can actually be built. */
const BANKED = new Set([
  "0580", "9709", "0606",
  "0625", "9702",
  "0620", "9701",
  "0610", "9700",
  "9618",
  "9708",
]);

const topicFor: Record<string, SyllabusTopic[]> = {
  "0448": pakistanStudiesTopics,
  "0493": islamiyatTopics,
};

const build = (rows: Row[], board: CatalogueEntry["board"], source: string): CatalogueEntry[] =>
  rows.map((r) => ({
    id: `${slug(r.name)}-${r.code}`,
    name: r.name,
    code: r.code,
    levels: r.levels,
    board,
    group: r.group,
    bank: BANKED.has(r.code),
    topics: topicFor[r.code] ?? [],
    source,
  }));

export const catalogue: CatalogueEntry[] = [
  ...build(igcseRows, "CAIE", CAIE_IGCSE),
  ...build(oLevelRows, "CAIE", CAIE_OL),
  ...build(aLevelRows, "CAIE", CAIE_AL),
];

export const catalogueGroups = [
  "All",
  ...Array.from(new Set(catalogue.map((c) => c.group))).sort(),
];

export const catalogueLevels: (SyllabusLevel | "All")[] = [
  "All",
  "IGCSE",
  "O Level",
  "AS",
  "A Level",
];

export const verifiedCount = catalogue.filter((c) => (c.topics?.length ?? 0) > 0).length;

/** Syllabuses that can actually build a paper: chapters transcribed *and* a bank. */
export const buildableCount = catalogue.filter((c) => c.bank).length;

export const getCatalogueEntry = (id: string) => catalogue.find((c) => c.id === id);

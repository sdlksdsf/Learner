import type { Question } from "@/lib/types";

/**
 * Pakistan Studies 0448. Paper 1 is history (Key Questions 1–16); Paper 2 is
 * geography. Questions follow the paper's own shape: source work and short
 * explanation in P1, and the three-part "describe / explain / evaluate" run in
 * P2, with part marks matching the published scheme (4, 7 and 14 out of 25).
 */
export const pakStudiesQuestions: Question[] = [
  /* ------------------------- P1 §1 Reformers & 1857 ---------------------- */
  {
    id: "pk-p1-1",
    topicId: "p1-1",
    stage: "IGCSE",
    difficulty: 2,
    command: "Explain",
    source: "0448/1 M/J/24 Q1",
    parts: [
      {
        id: "pk-p1-1a",
        label: "(a)",
        prompt: "Explain the contribution of Shah Waliullah to the revival of Islam in the subcontinent.",
        marks: 4,
        type: "structured",
        answer:
          "Shah Waliullah translated the Qur'an into Persian so that ordinary Muslims could understand it without knowing Arabic. He wrote to Ahmad Shah Abdali asking him to stop the Marathas, which helped end their threat to Muslim rule. He worked to reduce the differences between Sunni sects and called for a return to the Qur'an and Sunnah rather than blind following of custom.",
        lines: 8,
        scheme: [
          {
            text: "Translated the Qur'an into Persian so ordinary Muslims could understand it",
            marks: 1,
            keywords: ["translated", "quran", "persian"],
          },
          {
            text: "Wrote to Ahmad Shah Abdali to resist the Marathas",
            marks: 1,
            keywords: ["abdali", "maratha", "wrote"],
          },
          {
            text: "Worked to reconcile Sunni sects / called for ijtihad",
            marks: 1,
            keywords: ["reconcile", "sects", "ijtihad", "sunnah"],
          },
          {
            text: "Argued for a return to the Qur'an and Sunnah rather than blind following",
            marks: 1,
            keywords: ["blind following", "taqlid", "quran and sunnah"],
          },
        ],
      },
      {
        id: "pk-p1-1b",
        label: "(b)",
        prompt: "Why did the War of Independence of 1857 fail? Explain two reasons.",
        marks: 7,
        type: "extended",
        answer:
          "The rebels were disunited: Hindus and Muslims fought for different grievances, and there was no single leader to coordinate them. The British had superior weapons, the telegraph and the railways, which let them move troops quickly, while the rebels depended on supplies that ran out during the siege. Many Indian princes and the Sikhs stayed loyal to the British, so the rebels never had the full support of the subcontinent.",
        lines: 12,
        scheme: [
          {
            text: "Explains that the rebels were disunited and lacked a single leader",
            marks: 3,
            keywords: ["disunited", "no single leader", "division"],
          },
          {
            text: "Explains British military and technological superiority",
            marks: 2,
            keywords: ["weapons", "telegraph", "railways", "superior"],
          },
          {
            text: "Explains that princes and Sikhs stayed loyal to the British",
            marks: 2,
            keywords: ["loyal", "princes", "sikhs"],
          },
        ],
      },
    ],
  },

  /* --------------------------- P1 §2 Sir Syed ---------------------------- */
  {
    id: "pk-p1-2",
    topicId: "p1-2",
    stage: "IGCSE",
    difficulty: 2,
    command: "Explain",
    source: "0448/1 O/N/23 Q2",
    parts: [
      {
        id: "pk-p1-2a",
        label: "(a)",
        prompt: "Describe the work of Sir Syed Ahmad Khan in the field of education.",
        marks: 4,
        type: "structured",
        answer:
          "Sir Syed founded the Scientific Society in Ghazipur to translate Western works into Urdu. He established schools in Muradabad and Ghazipur, and in 1875 he opened the Muhammadan Anglo-Oriental College at Aligarh, which became a university in 1920. He encouraged Muslims to learn English so they could enter government service.",
        lines: 8,
        scheme: [
          {
            text: "Founded the Scientific Society to translate Western works into Urdu",
            marks: 1,
            keywords: ["scientific society", "translate", "urdu"],
          },
          {
            text: "Established the Muhammadan Anglo-Oriental College at Aligarh in 1875",
            marks: 1,
            keywords: ["aligarh", "1875", "college"],
          },
          {
            text: "Opened schools at Muradabad and Ghazipur",
            marks: 1,
            keywords: ["muradabad", "ghazipur", "schools"],
          },
          {
            text: "Encouraged Muslims to learn English and enter government service",
            marks: 1,
            keywords: ["english", "government service", "education"],
          },
        ],
      },
      {
        id: "pk-p1-2b",
        label: "(b)",
        prompt: "Explain why Sir Syed Ahmad Khan opposed the Indian National Congress.",
        marks: 7,
        type: "extended",
        answer:
          "Sir Syed believed the Congress represented Hindu interests and that Muslims would lose in any system based on simple majority, because they were fewer and less educated. He argued that the Hindu community had advanced further in education, so joint electorates would let Hindus dominate. He preferred that Muslims stay out of politics until they had educated themselves, and he put his trust in the British rather than in agitation.",
        lines: 12,
        scheme: [
          {
            text: "Explains that Congress represented Hindu interests and Muslims would be outvoted",
            marks: 3,
            keywords: ["hindu interests", "majority", "outvoted"],
          },
          {
            text: "Explains that Hindus were more educated and would dominate",
            marks: 2,
            keywords: ["educated", "dominate", "advanced"],
          },
          {
            text: "Explains his preference for education first and loyalty to the British",
            marks: 2,
            keywords: ["education first", "british", "loyal"],
          },
        ],
      },
    ],
  },

  /* ---------------------- P1 §3 1906–1947 politics ----------------------- */
  {
    id: "pk-p1-3",
    topicId: "p1-2",
    stage: "IGCSE",
    difficulty: 3,
    command: "Explain",
    source: "0448/1 M/J/23 Q4",
    parts: [
      {
        id: "pk-p1-3a",
        label: "(a)",
        prompt: "Explain why the Lahore Resolution of 1940 was a turning point for the Muslim League.",
        marks: 4,
        type: "structured",
        answer:
          "It was the first time the Muslim League formally demanded separate states for Muslims, so the demand for Pakistan became the League's public aim. It united the League's leaders behind one demand, ending the uncertainty after the 1937 election results. It also gave the League a slogan it could take to the Muslim masses in the 1946 elections, which it then won decisively.",
        lines: 8,
        scheme: [
          {
            text: "It was the first formal demand for a separate Muslim state",
            marks: 1,
            keywords: ["first", "separate", "state", "pakistan"],
          },
          {
            text: "It united the League behind a single goal",
            marks: 1,
            keywords: ["united", "single", "aim"],
          },
          {
            text: "It provided a mass campaign slogan for 1946",
            marks: 1,
            keywords: ["slogan", "1946", "campaign", "masses"],
          },
          {
            text: "It followed and then reversed the disappointment of 1937",
            marks: 1,
            keywords: ["1937", "election", "reversed", "disappointment"],
          },
        ],
      },
      {
        id: "pk-p1-3b",
        label: "(b)",
        prompt: "State the provisions of the Indian Independence Act of 1947.",
        marks: 4,
        type: "short",
        answer:
          "Two independent dominions, India and Pakistan, were to be created with the right to leave the Commonwealth. The British would transfer power by 15 August 1947, and the princely states were free to join either dominion or stay independent. The Act also abolished the office of Secretary of State for India.",
        lines: 6,
        scheme: [
          {
            text: "Created two independent dominions, India and Pakistan",
            marks: 1,
            keywords: ["two dominions", "india", "pakistan"],
          },
          {
            text: "Set 15 August 1947 as the date of transfer of power",
            marks: 1,
            keywords: ["15 august", "1947", "transfer"],
          },
          {
            text: "Left princely states to decide their own future",
            marks: 1,
            keywords: ["princely states", "join", "independent"],
          },
          {
            text: "Abolished the Secretary of State for India",
            marks: 1,
            keywords: ["secretary of state", "abolished"],
          },
        ],
      },
    ],
  },

  /* ------------------------ P1 §3 Nationhood 1947–99 --------------------- */
  {
    id: "pk-p1-4",
    topicId: "p1-3",
    stage: "IGCSE",
    difficulty: 3,
    command: "Evaluate",
    source: "0448/1 M/J/24 Q5",
    parts: [
      {
        id: "pk-p1-4a",
        label: "(a)",
        prompt: "Explain the problems faced by Pakistan in its first year of independence.",
        marks: 4,
        type: "structured",
        answer:
          "Pakistan had no proper administrative buildings or staff, because offices, records and equipment had been left in Delhi. The Radcliffe Award gave disputed territory and split the Punjab and Bengal in a way that cut canals and railways. Millions of refugees crossed the border and had to be housed, fed and resettled, while the country had almost no industry and little capital to pay for it.",
        lines: 8,
        scheme: [
          {
            text: "Lack of administrative buildings, records and experienced staff",
            marks: 1,
            keywords: ["administrative", "records", "staff", "delhi"],
          },
          {
            text: "Refugees in their millions needing shelter and resettlement",
            marks: 1,
            keywords: ["refugees", "resettle", "migration"],
          },
          {
            text: "The Radcliffe Award divided the Punjab and Bengal and cut transport links",
            marks: 1,
            keywords: ["radcliffe", "punjab", "bengal", "divided"],
          },
          {
            text: "Little industry, capital or revenue to build the new state",
            marks: 1,
            keywords: ["industry", "capital", "revenue", "financial"],
          },
        ],
      },
      {
        id: "pk-p1-4b",
        label: "(b)",
        prompt: "To what extent was the 1973 Constitution a solution to Pakistan's constitutional problems?",
        marks: 14,
        type: "extended",
        answer:
          "The 1973 Constitution created a parliamentary system with a prime minister as chief executive and a ceremonial president, which ended the instability of the previous two decades. It was agreed unanimously by all parties in the National Assembly, and it provided a federal structure with clear lists of powers for the centre and the provinces. It also made Islam the state religion and set up the Council of Islamic Ideology. However, the Constitution could not prevent later military intervention: Zia's martial law suspended it, and amendments such as the Eighth Amendment restored presidential power to dismiss assemblies. It therefore settled the question of what institutions should exist but not the question of who would control them.",
        lines: 20,
        scheme: [
          {
            text: "Explains the parliamentary system with a prime minister as chief executive",
            marks: 4,
            keywords: ["parliamentary", "prime minister", "president"],
          },
          {
            text: "Explains the agreement by all parties and the federal division of powers",
            marks: 4,
            keywords: ["unanimous", "federal", "provinces", "all parties"],
          },
          {
            text: "Explains the Islamic provisions and the Council of Islamic Ideology",
            marks: 3,
            keywords: ["islam", "council", "ideology"],
          },
          {
            text: "Evaluates the limits: martial law, the Eighth Amendment, later amendments",
            marks: 3,
            keywords: ["eighth amendment", "martial law", "suspended", "limited"],
          },
        ],
      },
    ],
  },

  /* --------------------------- P2 §1 The land ---------------------------- */
  {
    id: "pk-p2-1",
    topicId: "p2-1",
    stage: "IGCSE",
    difficulty: 2,
    command: "Describe",
    source: "0448/2 M/J/24 Q1",
    parts: [
      {
        id: "pk-p2-1a",
        label: "(a)",
        prompt: "Describe the climatic conditions of the northern mountain regions of Pakistan.",
        marks: 4,
        type: "structured",
        answer:
          "Winters are long and very cold with heavy snowfall above about 3,000 metres, and the high passes are closed for months. Summers are short and cool, and the snowmelt feeds the rivers. Most of the precipitation falls in winter from westerly depressions and in spring from cloudbursts, while areas in the rain shadow of Nanga Parbat get very little rain.",
        lines: 8,
        scheme: [
          {
            text: "Long, very cold winters with heavy snowfall",
            marks: 1,
            keywords: ["cold", "snow", "winter"],
          },
          {
            text: "Short cool summers with snowmelt feeding the rivers",
            marks: 1,
            keywords: ["short summer", "cool", "snowmelt"],
          },
          {
            text: "Winter precipitation from westerly depressions",
            marks: 1,
            keywords: ["westerly", "depression", "winter rain"],
          },
          {
            text: "Rain-shadow areas receive very little rain",
            marks: 1,
            keywords: ["rain shadow", "dry", "little rainfall"],
          },
        ],
      },
      {
        id: "pk-p2-1b",
        label: "(b)",
        prompt: "Explain how the Indus Plain was formed and why it is important for Pakistan's agriculture.",
        marks: 7,
        type: "extended",
        answer:
          "The plain was built up from alluvium carried down by the Indus and its tributaries and spread across the floor of a former sea basin, so the soils are deep and fertile. Because the plain is almost level, canals can carry water across long distances, which allows crops to be grown outside the monsoon season. The level surface also makes mechanisation and road building cheap, so the plain carries most of the country's farmland and population.",
        lines: 12,
        scheme: [
          {
            text: "Explains the deposition of alluvium by the Indus and tributaries",
            marks: 3,
            keywords: ["alluvium", "deposited", "sediment", "indus"],
          },
          {
            text: "Explains level terrain and its value for canal irrigation",
            marks: 2,
            keywords: ["level", "canal", "irrigation", "flat"],
          },
          {
            text: "Explains deep fertile soils and ease of mechanisation",
            marks: 2,
            keywords: ["fertile", "soil", "mechanisation"],
          },
        ],
      },
    ],
  },

  /* -------------------------- P2 §2 Resources ---------------------------- */
  {
    id: "pk-p2-2",
    topicId: "p2-2",
    stage: "IGCSE",
    difficulty: 2,
    command: "Explain",
    source: "0448/2 O/N/23 Q3",
    parts: [
      {
        id: "pk-p2-2a",
        label: "(a)",
        prompt: "Explain the importance of the Mangla and Tarbela dams for Pakistan.",
        marks: 7,
        type: "extended",
        answer:
          "Both dams store water from the monsoon and snowmelt and release it during the dry season, which extends the growing season and allows two crops a year on the plains below. Their turbines generate hydroelectricity, reducing the cost of importing fuel. They also hold back silt and reduce the severity of floods downstream, and Tarbela in particular stores the surplus that Pakistan is allowed to use under the Indus Waters Treaty.",
        lines: 12,
        scheme: [
          {
            text: "Stores water and releases it in the dry season, extending the growing season",
            marks: 3,
            keywords: ["store", "dry season", "release", "growing season"],
          },
          {
            text: "Generates hydroelectricity, reducing fuel imports",
            marks: 2,
            keywords: ["hydroelectric", "electricity", "power"],
          },
          {
            text: "Controls flooding and traps silt",
            marks: 2,
            keywords: ["flood", "silt", "control"],
          },
        ],
      },
      {
        id: "pk-p2-2b",
        label: "(b)",
        prompt: "State the main provisions of the Indus Waters Treaty of 1960.",
        marks: 4,
        type: "short",
        answer:
          "The treaty gave India the eastern rivers — the Ravi, Beas and Sutlej — and Pakistan the western rivers — the Indus, Jhelum and Chenab. Pakistan was allowed a transitional period to build replacement canals, financed by the World Bank and other donors. A Permanent Indus Commission was set up to settle disputes, and the World Bank was named as a mediator.",
        lines: 6,
        scheme: [
          {
            text: "Gave India the Ravi, Beas and Sutlej",
            marks: 1,
            keywords: ["ravi", "beas", "sutlej", "eastern"],
          },
          {
            text: "Gave Pakistan the Indus, Jhelum and Chenab",
            marks: 1,
            keywords: ["indus", "jhelum", "chenab", "western"],
          },
          {
            text: "Set up the Permanent Indus Commission",
            marks: 1,
            keywords: ["commission", "permanent indus"],
          },
          {
            text: "Named the World Bank as mediator and financier of replacement works",
            marks: 1,
            keywords: ["world bank", "mediator", "finance"],
          },
        ],
      },
    ],
  },

  /* --------------------- P2 §3 Power, agriculture, industry -------------- */
  {
    id: "pk-p2-3",
    topicId: "p2-3-5",
    stage: "IGCSE",
    difficulty: 3,
    command: "Evaluate",
    source: "0448/2 M/J/23 Q5",
    parts: [
      {
        id: "pk-p2-3a",
        label: "(a)",
        prompt: "Explain the causes of the water shortage in Pakistan's canal system.",
        marks: 7,
        type: "extended",
        answer:
          "Siltation has reduced the storage capacity of the Mangla and Tarbela reservoirs, so less water can be held each year. The canal system loses a large share of its water to seepage and evaporation because many channels are unlined. Farmers at the head of a canal take more than their share, leaving the tail-enders short, and the rice and sugarcane they grow need far more water than wheat or cotton would.",
        lines: 12,
        scheme: [
          {
            text: "Siltation has reduced reservoir capacity",
            marks: 3,
            keywords: ["siltation", "capacity", "reservoir"],
          },
          {
            text: "Seepage and evaporation losses in unlined canals",
            marks: 2,
            keywords: ["seepage", "evaporation", "unlined", "loss"],
          },
          {
            text: "Unequal distribution, with head-enders taking too much",
            marks: 1,
            keywords: ["head-enders", "tail-enders", "unequal"],
          },
          {
            text: "Water-hungry crops such as rice and sugarcane",
            marks: 1,
            keywords: ["rice", "sugarcane", "water hungry"],
          },
        ],
      },
      {
        id: "pk-p2-3b",
        label: "(b)",
        prompt: "To what extent have Pakistan's industrial estates solved the country's unemployment problem?",
        marks: 14,
        type: "extended",
        answer:
          "The estates at Kotri, Landhi, Sialkot and Faisalabad created work in textiles, leather and sports goods and drew labour away from low-productivity farming. They also brought infrastructure, training and export earnings that paid for further investment. But much of the work is seasonal and low-paid, and the estates rely on imported machinery and fuel, so output falls sharply when the balance of payments worsens or when load-shedding stops the machines. Small firms outside the estates still employ more people than the estates do, and many graduates remain unemployed because the demand is for unskilled and semi-skilled labour.",
        lines: 20,
        scheme: [
          {
            text: "Explains job creation in textiles, leather and sports goods",
            marks: 4,
            keywords: ["textile", "leather", "sports goods", "jobs"],
          },
          {
            text: "Explains infrastructure, training and export earnings",
            marks: 4,
            keywords: ["infrastructure", "training", "export"],
          },
          {
            text: "Explains the limits: seasonal and low-paid work, import dependence",
            marks: 3,
            keywords: ["seasonal", "low paid", "import"],
          },
          {
            text: "Evaluates the balance, including unemployment among graduates",
            marks: 3,
            keywords: ["graduates", "unskilled", "limited", "extent"],
          },
        ],
      },
    ],
  },
];

import type { Question } from "@/lib/types";

/**
 * Islamiyat 0493. Paper 1 is Qur'an and the Prophet's life; Paper 2 is Hadith
 * and the Rightly Guided Caliphs. Part marks follow the published scheme: (a)
 * carries 4 or 10 marks assessed in levels, (b) carries 3–4 marks.
 */
export const islamiyatQuestions: Question[] = [
  /* ---------------------- P1 §1 Major themes of the Qur'an --------------- */
  {
    id: "is-p1-1",
    topicId: "p1-1",
    stage: "IGCSE",
    difficulty: 2,
    command: "Explain",
    source: "0493/1 M/J/24 Q1",
    parts: [
      {
        id: "is-p1-1a",
        label: "(a)",
        prompt: "Explain the main themes of the Qur'anic passages about God's relationship with His creation.",
        marks: 10,
        type: "extended",
        answer:
          "The passages teach that God is the sole creator and sustainer of everything, so nothing exists independently of Him. He is described as ar-Rahman and ar-Rahim, whose mercy covers all creation, and the passages call on people to observe the natural world as evidence of His power and wisdom. They present Him as the one who provides for every creature, sends rain, and will finally judge all that He has made. The human response the passages ask for is gratitude, worship of Him alone, and trust in His provision rather than in wealth or in other powers.",
        lines: 16,
        scheme: [
          {
            text: "Explains God as the sole creator and sustainer",
            marks: 3,
            keywords: ["creator", "sustainer", "sole", "everything"],
          },
          {
            text: "Explains His mercy and the names ar-Rahman and ar-Rahim",
            marks: 2,
            keywords: ["mercy", "rahman", "rahim", "compassion"],
          },
          {
            text: "Explains the natural world as evidence of His power and wisdom",
            marks: 3,
            keywords: ["nature", "evidence", "power", "wisdom", "signs"],
          },
          {
            text: "Explains the human response: gratitude, worship and trust",
            marks: 2,
            keywords: ["gratitude", "worship", "trust", "tawakkul"],
          },
        ],
      },
      {
        id: "is-p1-1b",
        label: "(b)",
        prompt: "How does the teaching of the Qur'an about God's unity affect a Muslim's daily life?",
        marks: 4,
        type: "short",
        answer:
          "Tawhid means a Muslim turns to God alone in prayer and need, so it removes fear of other powers and superstition. It makes wealth and status secondary, because everything belongs to God. It also gives a sense of accountability, since every action is seen and will be judged.",
        lines: 6,
        scheme: [
          {
            text: "Turns to God alone, rejecting superstition and other powers",
            marks: 2,
            keywords: ["alone", "superstition", "shirk", "other powers"],
          },
          {
            text: "Makes wealth and status secondary to God's ownership",
            marks: 1,
            keywords: ["wealth", "status", "belongs"],
          },
          {
            text: "Gives accountability for every action",
            marks: 1,
            keywords: ["accountab", "judged", "actions"],
          },
        ],
      },
    ],
  },

  /* ------------------- P1 §2 History and importance of the Qur'an -------- */
  {
    id: "is-p1-2",
    topicId: "p1-2",
    stage: "IGCSE",
    difficulty: 2,
    command: "Describe",
    source: "0493/1 O/N/23 Q2",
    parts: [
      {
        id: "is-p1-2a",
        label: "(a)",
        prompt: "Describe how the Qur'an was compiled during the lifetime of the Prophet (pbuh) and under the Rightly Guided Caliphs.",
        marks: 10,
        type: "extended",
        answer:
          "During the Prophet's lifetime the revelation came in portions over twenty-three years and was memorised by the Companions, while scribes such as Zayd ibn Thabit wrote it on whatever material was available. The verses were not gathered into one volume at that stage because revelation was still continuing. After the Battle of Yamama many memorisers were killed, so Abu Bakr asked Zayd to collect the written portions and the memories of reliable Companions into a single copy, which was kept with him and then with Umar and Hafsah. Uthman later had copies made from that text and sent them to the main centres, and he ordered variant copies to be destroyed so that one recitation would be used everywhere.",
        lines: 16,
        scheme: [
          {
            text: "Revelation came in portions over twenty-three years and was memorised",
            marks: 2,
            keywords: ["portions", "twenty-three", "memoris"],
          },
          {
            text: "Scribes such as Zayd ibn Thabit wrote it down during the Prophet's lifetime",
            marks: 2,
            keywords: ["zayd", "thabit", "scribes", "wrote"],
          },
          {
            text: "Abu Bakr ordered collection into one copy after Yamama",
            marks: 3,
            keywords: ["abu bakr", "yamama", "collected", "copy"],
          },
          {
            text: "Uthman standardised copies and sent them to the main centres",
            marks: 3,
            keywords: ["uthman", "copies", "standardis", "centres"],
          },
        ],
      },
      {
        id: "is-p1-2b",
        label: "(b)",
        prompt: "What is the difference between ijma' and qiyas as sources of Islamic law?",
        marks: 4,
        type: "short",
        answer:
          "Ijma' is the agreement of the scholars of a generation on a point of law, and once agreed it is accepted by the community. Qiyas is reasoning by analogy, where a new case is judged by the ruling on a similar case in the Qur'an, Sunnah or ijma'.",
        lines: 6,
        scheme: [
          {
            text: "Ijma' is the consensus of the scholars of a generation",
            marks: 2,
            keywords: ["consensus", "agreement", "scholars", "ijma"],
          },
          {
            text: "Qiyas is reasoning by analogy from an established ruling",
            marks: 2,
            keywords: ["analogy", "qiyas", "similar", "reasoning"],
          },
        ],
      },
    ],
  },

  /* ------------------ P1 §3 The life of the Prophet (pbuh) --------------- */
  {
    id: "is-p1-3",
    topicId: "p1-3",
    stage: "IGCSE",
    difficulty: 3,
    command: "Explain",
    source: "0493/1 M/J/23 Q3",
    parts: [
      {
        id: "is-p1-3a",
        label: "(a)",
        prompt: "Explain the significance of the Prophet's (pbuh) hijrah to Madina.",
        marks: 10,
        type: "extended",
        answer:
          "The hijrah marks the point at which the Muslims moved from a persecuted minority in Makka to a community able to organise its own affairs, and it is from this event that the Islamic calendar begins. In Madina the Prophet drew up the Constitution, which set out the rights of the Muhajirun, the Ansar and the Jewish tribes in a single agreement. It ended the blood feuds between the Aws and Khazraj by making them brothers in faith, and it allowed Islam to be taught openly and defended. It also changed the direction of prayer and gave the community its first masjid.",
        lines: 16,
        scheme: [
          {
            text: "Marks the move from persecution to an organised community",
            marks: 3,
            keywords: ["persecut", "community", "organised", "minority"],
          },
          {
            text: "The Islamic calendar begins from the hijrah",
            marks: 2,
            keywords: ["calendar", "hijri", "begins"],
          },
          {
            text: "The Constitution of Madina set out rights of all groups",
            marks: 3,
            keywords: ["constitution", "muhajirun", "ansar", "jewish"],
          },
          {
            text: "Ended the Aws–Khazraj feud and allowed open teaching",
            marks: 2,
            keywords: ["aws", "khazraj", "feud", "openly"],
          },
        ],
      },
      {
        id: "is-p1-3b",
        label: "(b)",
        prompt: "Why is the Prophet (pbuh) described as the Seal of the Prophets?",
        marks: 3,
        type: "short",
        answer:
          "He brought the final revelation, so his message completes and corrects the earlier scriptures. No prophet will come after him, which is what the title khatam an-nabiyyin means, and his guidance is preserved unchanged for all later generations.",
        lines: 5,
        scheme: [
          {
            text: "He brought the final revelation, completing earlier scriptures",
            marks: 1,
            keywords: ["final", "revelation", "complete"],
          },
          {
            text: "No prophet will come after him",
            marks: 1,
            keywords: ["no prophet", "after him", "last"],
          },
          {
            text: "His guidance is preserved unchanged for later generations",
            marks: 1,
            keywords: ["preserved", "unchanged", "generations"],
          },
        ],
      },
    ],
  },

  /* --------------------- P1 §4 The first Islamic community --------------- */
  {
    id: "is-p1-4",
    topicId: "p1-4",
    stage: "IGCSE",
    difficulty: 2,
    command: "Describe",
    source: "0493/1 O/N/24 Q4",
    parts: [
      {
        id: "is-p1-4a",
        label: "(a)",
        prompt: "Describe the role of the Ansar and the Muhajirun in the first Muslim community.",
        marks: 10,
        type: "extended",
        answer:
          "The Muhajirun were the emigrants from Makka who left their homes and property for the sake of their faith and arrived in Madina with almost nothing. The Ansar were the Muslims of Madina who took them in, shared their houses and businesses, and accepted them as brothers, and the Prophet paired each emigrant with a helper. The Ansar gave land and dates and even offered to divide their orchards, and they carried a heavy share of the fighting at Badr and Uhud. Their generosity set the example of brotherhood that the community followed, and it prevented the resentment that poverty among the newcomers could have caused.",
        lines: 16,
        scheme: [
          {
            text: "Muhajirun left homes and property in Makka for their faith",
            marks: 3,
            keywords: ["muhajirun", "emigrants", "left", "makka"],
          },
          {
            text: "Ansar took them in and shared houses and wealth",
            marks: 3,
            keywords: ["ansar", "shared", "houses", "took them in"],
          },
          {
            text: "The Prophet paired each emigrant with a helper",
            marks: 2,
            keywords: ["paired", "brother", "helper", "muakhat"],
          },
          {
            text: "Ansar fought at Badr and Uhud and set the example of brotherhood",
            marks: 2,
            keywords: ["badr", "uhud", "brotherhood", "example"],
          },
        ],
      },
      {
        id: "is-p1-4b",
        label: "(b)",
        prompt: "What lessons can Muslims today learn from the way the Ansar treated the Muhajirun?",
        marks: 4,
        type: "short",
        answer:
          "Wealth and property are held in trust and can be shared with those in need. Believers are responsible for one another, so a community must look after newcomers and the poor. Generosity given for God's sake is not a loss, and unity is stronger than ties of tribe or place.",
        lines: 6,
        scheme: [
          {
            text: "Wealth is held in trust and should be shared",
            marks: 2,
            keywords: ["trust", "shared", "wealth", "generos"],
          },
          {
            text: "Believers are responsible for one another",
            marks: 1,
            keywords: ["responsible", "one another", "community"],
          },
          {
            text: "Unity of faith is stronger than tribe or place",
            marks: 1,
            keywords: ["unity", "tribe", "faith"],
          },
        ],
      },
    ],
  },

  /* ---------------------- P2 §1 Major teachings in the Hadiths ----------- */
  {
    id: "is-p2-1",
    topicId: "p2-1",
    stage: "IGCSE",
    difficulty: 2,
    command: "Explain",
    source: "0493/2 M/J/24 Q1",
    parts: [
      {
        id: "is-p2-1a",
        label: "(a)",
        prompt: "Explain the teachings about individual conduct found in the Hadiths of the Prophet (pbuh).",
        marks: 10,
        type: "extended",
        answer:
          "The Hadiths teach that intention decides the worth of an action, so a good deed done for show earns nothing. Honesty in trade is rewarded, and the Prophet said that a truthful merchant is with the martyrs. They command kindness to parents even when they are old and difficult, control of anger, and speaking the truth even when it is bitter. They also forbid backbiting and envy, and they teach that the strong person is the one who controls himself when angry.",
        lines: 16,
        scheme: [
          {
            text: "Intention decides the worth of an action",
            marks: 3,
            keywords: ["intention", "niyyah", "action"],
          },
          {
            text: "Honesty in trade and speech is rewarded",
            marks: 3,
            keywords: ["honest", "truth", "trade", "merchant"],
          },
          {
            text: "Kindness to parents and control of anger",
            marks: 2,
            keywords: ["parents", "anger", "kindness", "control"],
          },
          {
            text: "Backbiting and envy are forbidden",
            marks: 2,
            keywords: ["backbiting", "envy", "forbidden"],
          },
        ],
      },
      {
        id: "is-p2-1b",
        label: "(b)",
        prompt: "How do the Hadiths guide relations between members of a community?",
        marks: 4,
        type: "short",
        answer:
          "The Prophet said that no one truly believes until he wishes for his brother what he wishes for himself, which makes fairness a duty. He taught that a Muslim is one from whose tongue and hand others are safe, which protects neighbours. He also taught that visiting the sick, feeding the hungry and greeting others build the ties of the community.",
        lines: 6,
        scheme: [
          {
            text: "Wishing for others what one wishes for oneself",
            marks: 2,
            keywords: ["wishes", "brother", "himself", "fairness"],
          },
          {
            text: "A Muslim is one from whose tongue and hand others are safe",
            marks: 1,
            keywords: ["tongue", "hand", "safe"],
          },
          {
            text: "Visiting the sick, feeding the hungry and greeting others",
            marks: 1,
            keywords: ["sick", "hungry", "greeting"],
          },
        ],
      },
    ],
  },

  /* --------------------- P2 §2 History of the Hadiths -------------------- */
  {
    id: "is-p2-2",
    topicId: "p2-2",
    stage: "IGCSE",
    difficulty: 2,
    command: "Describe",
    source: "0493/2 O/N/23 Q2",
    parts: [
      {
        id: "is-p2-2a",
        label: "(a)",
        prompt: "Describe how the Hadiths were collected and preserved in the generations after the Prophet (pbuh).",
        marks: 10,
        type: "extended",
        answer:
          "In the first century the Hadiths were mostly memorised and passed on orally, and Companions such as Abu Hurayrah and Aisha were known as the sources from whom others learned. Caliph Umar ibn Abd al-Aziz gave the first order to write them down, and scholars such as Imam Malik collected them in the Muwatta. Later, collectors travelled widely to hear a hadith directly from its transmitter, and Imam Bukhari examined thousands of chains before choosing the few hundred he included in his Sahih. Each hadith was checked through its isnad, the chain of transmitters, and its matn, the text, so that a report was only accepted if every link was known to be reliable, truthful and in continuous contact with the next.",
        lines: 16,
        scheme: [
          {
            text: "Hadiths were first memorised and passed on orally",
            marks: 2,
            keywords: ["memoris", "oral", "passed on"],
          },
          {
            text: "Umar ibn Abd al-Aziz ordered them to be written down",
            marks: 2,
            keywords: ["umar ibn abd", "written", "order"],
          },
          {
            text: "Collectors such as Imam Malik and Imam Bukhari compiled them",
            marks: 3,
            keywords: ["malik", "bukhari", "compiled", "collect"],
          },
          {
            text: "Each was checked through its isnad and matn",
            marks: 3,
            keywords: ["isnad", "matn", "chain", "text"],
          },
        ],
      },
      {
        id: "is-p2-2b",
        label: "(b)",
        prompt: "What is the difference between a musnad and a musannaf collection of Hadith?",
        marks: 4,
        type: "short",
        answer:
          "A musnad groups hadiths by the Companion who narrated them, so all the reports from one Companion are found together. A musannaf groups them by subject, so the chapters deal with prayer, trade or family law regardless of who narrated each one.",
        lines: 6,
        scheme: [
          {
            text: "Musnad arranges hadiths by the narrator or Companion",
            marks: 2,
            keywords: ["musnad", "narrator", "companion"],
          },
          {
            text: "Musannaf arranges them by subject or chapter",
            marks: 2,
            keywords: ["musannaf", "subject", "chapter"],
          },
        ],
      },
    ],
  },

  /* ------------------------ P2 §3 Rightly Guided Caliphs ----------------- */
  {
    id: "is-p2-3",
    topicId: "p2-3",
    stage: "IGCSE",
    difficulty: 3,
    command: "Explain",
    source: "0493/2 M/J/23 Q4",
    parts: [
      {
        id: "is-p2-3a",
        label: "(a)",
        prompt: "Explain the main achievements of Umar ibn al-Khattab as Caliph.",
        marks: 10,
        type: "extended",
        answer:
          "Umar expanded the Islamic state into Syria, Egypt, Iraq and Persia, and he removed the commanders Khalid ibn al-Walid and Sa'd ibn Abi Waqqas when their popularity seemed to threaten the state. He set up the diwan, a register that paid stipends to the soldiers and the poor, and he established the office of qadi with a salary so that judges would not depend on the parties before them. He fixed the beginning of the Islamic calendar from the hijrah, organised the night prayers in Ramadan, and appointed a committee to choose his successor rather than naming his own son. His justice was legendary: he refused to exempt his own family from the law and personally inspected the markets and the roads.",
        lines: 16,
        scheme: [
          {
            text: "Expanded the state into Syria, Egypt, Iraq and Persia",
            marks: 3,
            keywords: ["syria", "egypt", "iraq", "persia", "expanded"],
          },
          {
            text: "Set up the diwan and paid stipends",
            marks: 2,
            keywords: ["diwan", "stipend", "register"],
          },
          {
            text: "Established paid judges and the office of qadi",
            marks: 2,
            keywords: ["qadi", "judge", "salary"],
          },
          {
            text: "Fixed the Islamic calendar and organised tarawih",
            marks: 2,
            keywords: ["calendar", "hijrah", "tarawih", "ramadan"],
          },
          {
            text: "His justice extended to his own family",
            marks: 1,
            keywords: ["justice", "family", "law"],
          },
        ],
      },
      {
        id: "is-p2-3b",
        label: "(b)",
        prompt: "Why did Uthman ibn Affan face opposition during his caliphate?",
        marks: 4,
        type: "short",
        answer:
          "He appointed members of his own clan, the Banu Umayya, to important governorships, and his relatives were seen to grow rich from their posts. He was accused of favouritism in distributing the revenues of conquered lands, and discontented soldiers from Egypt and Iraq marched on Madina, which led to his death.",
        lines: 6,
        scheme: [
          {
            text: "He appointed relatives from the Banu Umayya to governorships",
            marks: 2,
            keywords: ["umayya", "relatives", "governor", "clan"],
          },
          {
            text: "Accusations of favouritism and wealth from office",
            marks: 1,
            keywords: ["favouritism", "wealth", "rich"],
          },
          {
            text: "Discontented soldiers marched on Madina",
            marks: 1,
            keywords: ["soldiers", "madina", "marched", "revolt"],
          },
        ],
      },
    ],
  },
];

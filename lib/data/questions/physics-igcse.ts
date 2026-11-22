import type { Question } from "@/lib/types";

export const physicsIgcse: Question[] = [
  /* ------------------------------- Forces ------------------------------- */
  {
    id: "pi-for-1",
    topicId: "forces",
    stage: "IGCSE",
    difficulty: 1,
    command: "Calculate",
    source: "0625/22/M/J/24 Q1",
    parts: [
      {
        id: "pi-for-1a",
        label: "",
        prompt: "A car travels 240 km in 3.0 hours. Calculate its average speed in km/h.",
        marks: 2,
        type: "calculation",
        answer: "80 km/h",
        lines: 2,
        scheme: [
          { text: "Uses speed = distance/time", marks: 1, keywords: ["distance", "time", "speed ="] },
          { text: "Obtains 80 km/h", marks: 1, numeric: 80, tol: 0.2 },
        ],
      },
    ],
  },
  {
    id: "pi-for-2",
    topicId: "forces",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/22/O/N/23 Q4",
    parts: [
      {
        id: "pi-for-2a",
        label: "",
        prompt: "A cyclist accelerates from 4.0 m/s to 20 m/s in 4.0 s. Calculate the acceleration.",
        marks: 2,
        type: "calculation",
        answer: "4.0 m/s²",
        lines: 2,
        scheme: [
          { text: "Uses a = (v − u)/t", marks: 1, keywords: ["v − u", "(20 − 4)", "change in velocity"] },
          { text: "Obtains 4.0 m/s²", marks: 1, numeric: 4, tol: 0.1 },
        ],
      },
    ],
  },
  {
    id: "pi-for-3",
    topicId: "forces",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/42/M/J/23 Q2",
    parts: [
      {
        id: "pi-for-3a",
        label: "",
        prompt: "A trolley of mass 2.5 kg accelerates at 3.2 m/s². Calculate the resultant force acting on it.",
        marks: 2,
        type: "calculation",
        answer: "8.0 N",
        lines: 2,
        scheme: [
          { text: "Uses F = ma", marks: 1, keywords: ["f = ma", "ma", "mass × acceleration"] },
          { text: "Obtains 8.0 N", marks: 1, numeric: 8, tol: 0.1 },
        ],
      },
    ],
  },
  {
    id: "pi-for-4",
    topicId: "forces",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/42/O/N/22 Q5",
    parts: [
      {
        id: "pi-for-4a",
        label: "",
        prompt: "A ball of mass 0.50 kg moves at 8.0 m/s. Calculate its momentum.",
        marks: 2,
        type: "calculation",
        answer: "4.0 kg m/s",
        lines: 2,
        scheme: [
          { text: "Uses p = mv", marks: 1, keywords: ["p = mv", "mv", "mass × velocity"] },
          { text: "Obtains 4.0 kg m/s", marks: 1, numeric: 4, tol: 0.1 },
        ],
      },
    ],
  },

  /* -------------------------------- Energy ------------------------------ */
  {
    id: "pi-en-1",
    topicId: "energy",
    stage: "IGCSE",
    difficulty: 1,
    command: "Calculate",
    source: "0625/22/M/J/24 Q6",
    parts: [
      {
        id: "pi-en-1a",
        label: "",
        prompt: "A force of 50 N moves an object 8.0 m in the direction of the force. Calculate the work done.",
        marks: 2,
        type: "calculation",
        answer: "400 J",
        lines: 2,
        scheme: [
          { text: "Uses W = Fd", marks: 1, keywords: ["w = fd", "fd", "force × distance"] },
          { text: "Obtains 400 J", marks: 1, numeric: 400, tol: 1 },
        ],
      },
    ],
  },
  {
    id: "pi-en-2",
    topicId: "energy",
    stage: "IGCSE",
    difficulty: 1,
    command: "Calculate",
    source: "0625/22/O/N/23 Q8",
    parts: [
      {
        id: "pi-en-2a",
        label: "",
        prompt: "A motor transfers 600 J of energy in 20 s. Calculate its power.",
        marks: 2,
        type: "calculation",
        answer: "30 W",
        lines: 2,
        scheme: [
          { text: "Uses P = E/t", marks: 1, keywords: ["p = e/t", "e/t", "energy/time"] },
          { text: "Obtains 30 W", marks: 1, numeric: 30, tol: 0.2 },
        ],
      },
    ],
  },
  {
    id: "pi-en-3",
    topicId: "energy",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/42/M/J/23 Q7",
    parts: [
      {
        id: "pi-en-3a",
        label: "",
        prompt: "A machine receives 800 J of energy and transfers 480 J as useful work. Calculate its efficiency as a percentage.",
        marks: 2,
        type: "calculation",
        answer: "60%",
        lines: 2,
        scheme: [
          { text: "Uses efficiency = useful output/total input", marks: 1, keywords: ["useful", "input", "480/800"] },
          { text: "Obtains 60%", marks: 1, numeric: 60, tol: 0.5 },
        ],
      },
    ],
  },

  /* --------------------------------- Waves ------------------------------ */
  {
    id: "pi-wa-1",
    topicId: "waves",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/22/M/J/24 Q9",
    parts: [
      {
        id: "pi-wa-1a",
        label: "",
        prompt: "A wave has a frequency of 50 Hz and a wavelength of 0.68 m. Calculate its speed.",
        marks: 2,
        type: "calculation",
        answer: "34 m/s",
        lines: 2,
        scheme: [
          { text: "Uses v = fλ", marks: 1, keywords: ["v = fλ", "fλ", "frequency × wavelength"] },
          { text: "Obtains 34 m/s", marks: 1, numeric: 34, tol: 0.2 },
        ],
      },
    ],
  },
  {
    id: "pi-wa-2",
    topicId: "waves",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/42/O/N/23 Q6",
    parts: [
      {
        id: "pi-wa-2a",
        label: "",
        prompt: "Light enters glass at an angle of incidence of 40°. The angle of refraction is 25°. Calculate the refractive index of the glass.",
        marks: 2,
        type: "calculation",
        answer: "1.52",
        lines: 2,
        scheme: [
          { text: "Uses n = sin i / sin r", marks: 1, keywords: ["sin i", "sin r", "refractive index", "n ="] },
          { text: "Obtains 1.52", marks: 1, numeric: 1.523, tol: 0.02 },
        ],
      },
    ],
  },
  {
    id: "pi-wa-3",
    topicId: "waves",
    stage: "IGCSE",
    difficulty: 1,
    command: "State",
    source: "0625/22/M/J/23 Q12",
    parts: [
      {
        id: "pi-wa-3a",
        label: "",
        prompt: "State the law of reflection.",
        marks: 2,
        type: "short",
        answer: "The angle of incidence equals the angle of reflection.",
        lines: 2,
        scheme: [
          { text: "States that the angle of incidence equals the angle of reflection", marks: 1, keywords: ["angle of incidence", "angle of reflection", "equal", "same"] },
          { text: "States that the incident ray, reflected ray and normal lie in the same plane", marks: 1, keywords: ["same plane", "normal", "plane"] },
        ],
      },
    ],
  },

  /* ------------------------------- Electricity -------------------------- */
  {
    id: "pi-el-1",
    topicId: "elec",
    stage: "IGCSE",
    difficulty: 1,
    command: "Calculate",
    source: "0625/22/M/J/24 Q10",
    parts: [
      {
        id: "pi-el-1a",
        label: "",
        prompt: "A resistor of resistance 4.0 Ω is connected to a 12 V supply. Calculate the current in the resistor.",
        marks: 2,
        type: "calculation",
        answer: "3.0 A",
        lines: 2,
        scheme: [
          { text: "Uses V = IR or I = V/R", marks: 1, keywords: ["v = ir", "i = v/r", "ohm"] },
          { text: "Obtains 3.0 A", marks: 1, numeric: 3, tol: 0.1 },
        ],
      },
    ],
  },
  {
    id: "pi-el-2",
    topicId: "elec",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/22/O/N/23 Q11",
    parts: [
      {
        id: "pi-el-2a",
        label: "",
        prompt: "Resistors of 3.0 Ω and 5.0 Ω are connected in series to a 24 V supply. Calculate the current in the circuit.",
        marks: 2,
        type: "calculation",
        answer: "3.0 A",
        lines: 2,
        scheme: [
          { text: "Adds the series resistances: 8.0 Ω", marks: 1, numeric: 8, tol: 0.1 },
          { text: "Obtains I = 24/8 = 3.0 A", marks: 1, numeric: 3, tol: 0.1 },
        ],
      },
    ],
  },
  {
    id: "pi-el-3",
    topicId: "elec",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/42/M/J/23 Q9",
    parts: [
      {
        id: "pi-el-3a",
        label: "",
        prompt: "An appliance connected to a 230 V supply draws a current of 2.0 A. Calculate the power it uses.",
        marks: 2,
        type: "calculation",
        answer: "460 W",
        lines: 2,
        scheme: [
          { text: "Uses P = VI", marks: 1, keywords: ["p = vi", "vi", "voltage × current"] },
          { text: "Obtains 460 W", marks: 1, numeric: 460, tol: 1 },
        ],
      },
    ],
  },
  {
    id: "pi-el-4",
    topicId: "elec",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/42/O/N/22 Q10",
    parts: [
      {
        id: "pi-el-4a",
        label: "",
        prompt: "A current of 0.50 A flows for 120 s. Calculate the charge that passes.",
        marks: 2,
        type: "calculation",
        answer: "60 C",
        lines: 2,
        scheme: [
          { text: "Uses Q = It", marks: 1, keywords: ["q = it", "current × time", "charge = current"] },
          { text: "Obtains 60 C", marks: 1, numeric: 60, tol: 0.5 },
        ],
      },
    ],
  },

  /* ------------------------------ Thermal ------------------------------- */
  {
    id: "pi-th-1",
    topicId: "therm",
    stage: "IGCSE",
    difficulty: 2,
    command: "Calculate",
    source: "0625/42/M/J/24 Q11",
    parts: [
      {
        id: "pi-th-1a",
        label: "",
        prompt: "Calculate the energy needed to raise the temperature of 0.50 kg of water by 20 °C. The specific heat capacity of water is 4200 J/(kg °C).",
        marks: 3,
        type: "calculation",
        answer: "42 000 J",
        lines: 3,
        scheme: [
          { text: "Uses E = mcΔT", marks: 1, keywords: ["e = mcat", "mcδt", "mc", "specific heat"] },
          { text: "Obtains 0.50 × 4200 × 20", marks: 1, accept: ["4200", "20", "0.5"] },
          { text: "Obtains 42 000 J", marks: 1, numeric: 42000, tol: 100 },
        ],
      },
    ],
  },
  {
    id: "pi-th-2",
    topicId: "therm",
    stage: "IGCSE",
    difficulty: 1,
    command: "Explain",
    source: "0625/22/O/N/23 Q14",
    parts: [
      {
        id: "pi-th-2a",
        label: "",
        prompt: "Explain, in terms of particles, why a solid has a fixed shape but a liquid does not.",
        marks: 3,
        type: "structured",
        answer: "In a solid, particles are held in fixed positions by strong forces and only vibrate. In a liquid, particles can move past each other, so the liquid flows and takes the shape of its container.",
        lines: 4,
        scheme: [
          { text: "States that solid particles are in fixed positions / regular arrangement", marks: 1, keywords: ["fixed", "regular", "locked", "strong forces"] },
          { text: "States that solid particles vibrate but do not move from place to place", marks: 1, keywords: ["vibrate", "vibration"] },
          { text: "States that liquid particles can move / slide past each other", marks: 1, keywords: ["move", "slide", "past each other", "flow"] },
        ],
      },
    ],
  },
];

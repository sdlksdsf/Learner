import type { Part, Question } from "@/lib/types";

/**
 * A2 follow-up questions.
 *
 * The A Level banks are assembled from AS and A2 questions. Every AS question
 * already carries a follow-up part; these questions give A2 candidates whole
 * A2-shaped questions rather than a paper of AS starters, so a full A Level
 * paper reaches its marks without padding.
 *
 * Prefixes follow the bank convention:
 *   maths → ma2-, physics → pa2-, chemistry → ca2-, biology → ba2-
 */

const px = (
  id: string,
  topicId: string,
  difficulty: 1 | 2 | 3,
  command: string,
  source: string,
  parts: Part[]
): Question => ({ id, topicId, stage: "A2", difficulty, command, source, parts });

const p = (
  id: string,
  label: string,
  prompt: string,
  marks: number,
  type: Part["type"],
  answer: string,
  lines: number,
  scheme: Part["scheme"]
): Part => ({ id, label, prompt, marks, type, answer, lines, scheme });

/* -------------------------------- Mathematics ----------------------------- */

export const mathsA2: Question[] = [
  px("ma2-calc-1", "calc", 3, "Calculate", "9709/32/M/J/24 Q4", [
    p(
      "ma2-calc-1a",
      "",
      "The curve y = x³ − 3x² + 4 has a stationary point at x = 0 and another at x = 2. Determine the nature of each stationary point.",
      4,
      "structured",
      "dy/dx = 3x² − 6x = 3x(x − 2). At x = 0, d²y/dx² = −6, so it is a maximum. At x = 2, d²y/dx² = 6, so it is a minimum.",
      4,
      [
        { text: "Differentiates to 3x² − 6x", marks: 1, accept: ["3x² − 6x", "3x2 - 6x", "3x(x - 2)"] },
        { text: "Evaluates the second derivative at x = 0 as −6", marks: 1, numeric: -6, tol: 0.1 },
        { text: "Evaluates the second derivative at x = 2 as 6", marks: 1, numeric: 6, tol: 0.1 },
        { text: "Concludes maximum at x = 0 and minimum at x = 2", marks: 1, keywords: ["maximum", "minimum"] },
      ]
    ),
  ]),
  px("ma2-calc-2", "calc", 3, "Find", "9709/32/O/N/23 Q6", [
    p(
      "ma2-calc-2a",
      "(a)",
      "Find ∫ x·e^(2x) dx.",
      4,
      "calculation",
      "½x·e^(2x) − ¼e^(2x) + C",
      4,
      [
        { text: "Uses integration by parts with u = x and dv = e^(2x) dx", marks: 1, keywords: ["by parts", "integration by parts", "u = x"] },
        { text: "Obtains ½x·e^(2x)", marks: 1, accept: ["½xe^2x", "0.5xe^2x", "x/2 e^2x"] },
        { text: "Obtains −¼e^(2x)", marks: 1, accept: ["−¼e^2x", "-1/4 e^2x", "0.25e^2x"] },
        { text: "Includes the constant of integration", marks: 1, keywords: ["+ c", "+c", "constant of integration"] },
      ]
    ),
    p(
      "ma2-calc-2b",
      "(b)",
      "Hence evaluate ∫₀¹ x·e^(2x) dx, giving your answer in exact form.",
      3,
      "calculation",
      "¼(e² + 1)",
      3,
      [
        { text: "Substitutes the limits into the antiderivative", marks: 1, keywords: ["substitute", "limits", "0 and 1", "1 and 0"] },
        { text: "Obtains ¼e² at x = 1", marks: 1, accept: ["e²/4", "0.25e^2", "¼e²"] },
        { text: "Obtains ¼(e² + 1)", marks: 1, accept: ["¼(e² + 1)", "(e^2 + 1)/4", "0.25(e^2 + 1)"] },
      ]
    ),
  ]),
  px("ma2-trig-1", "trig", 3, "Solve", "9709/32/M/J/23 Q3", [
    p(
      "ma2-trig-1a",
      "",
      "Express 3 sin θ + 4 cos θ in the form R sin(θ + α), where R > 0 and 0 < α < 90°.",
      3,
      "calculation",
      "R = 5 and α = 53.1°",
      3,
      [
        { text: "Finds R² = 3² + 4² = 25", marks: 1, numeric: 25, tol: 0.1 },
        { text: "Obtains R = 5", marks: 1, numeric: 5, tol: 0.05 },
        { text: "Obtains α = 53.1°", marks: 1, numeric: 53.1, tol: 0.2 },
      ]
    ),
    p(
      "ma2-trig-1b",
      "(b)",
      "Hence solve 3 sin θ + 4 cos θ = 4.5 for 0° ≤ θ ≤ 360°, giving answers to one decimal place.",
      3,
      "calculation",
      "θ = 11.1° or 72.7°",
      3,
      [
        { text: "Writes sin(θ + 53.1°) = 0.9", marks: 1, numeric: 0.9, tol: 0.01 },
        { text: "Finds one principal solution", marks: 1, numeric: 11.1, tol: 0.3 },
        { text: "Finds the second solution in range", marks: 1, numeric: 72.7, tol: 0.3 },
      ]
    ),
  ]),
  px("ma2-vec-1", "vec", 3, "Find", "9709/32/M/J/24 Q9", [
    p(
      "ma2-vec-1a",
      "",
      "The lines r = (1, 2, 3) + λ(2, −1, 1) and r = (4, 0, 5) + μ(1, 1, −1) intersect. Find the point of intersection.",
      4,
      "calculation",
      "(5, 0, 5)",
      4,
      [
        { text: "Forms three equations in λ and μ", marks: 1, keywords: ["simultaneous", "equations", "λ", "μ"] },
        { text: "Solves two equations to obtain λ = 2", marks: 1, numeric: 2, tol: 0.05 },
        { text: "Verifies the third equation", marks: 1, keywords: ["check", "verify", "third"] },
        { text: "Obtains the point (5, 0, 5)", marks: 1, accept: ["(5, 0, 5)", "5, 0, 5", "5i + 5k"] },
      ]
    ),
  ]),
  px("ma2-stat-1", "stat", 3, "Calculate", "9709/52/M/J/24 Q2", [
    p(
      "ma2-stat-1a",
      "",
      "The masses of apples are normally distributed with mean 120 g and standard deviation 8 g. Find the probability that a randomly chosen apple has a mass greater than 132 g.",
      3,
      "calculation",
      "0.0668",
      3,
      [
        { text: "Standardises to z = 1.5", marks: 1, numeric: 1.5, tol: 0.02 },
        { text: "Uses the normal distribution table or calculator", marks: 1, keywords: ["table", "normal", "calculator", "z"] },
        { text: "Obtains 0.0668", marks: 1, numeric: 0.0668, tol: 0.002 },
      ]
    ),
    p(
      "ma2-stat-1b",
      "(b)",
      "Find the mass exceeded by 90% of apples.",
      3,
      "calculation",
      "109.8 g",
      3,
      [
        { text: "Finds z = −1.2816 for the lower 10%", marks: 1, numeric: -1.2816, tol: 0.05 },
        { text: "Uses x = μ + zσ", marks: 1, keywords: ["μ + zσ", "mean + z", "x = 120"] },
        { text: "Obtains 109.8 g", marks: 1, numeric: 109.75, tol: 0.5 },
      ]
    ),
  ]),
  px("ma2-quad-1", "quad", 2, "Find", "9709/31/O/N/23 Q2", [
    p(
      "ma2-quad-1a",
      "",
      "Find the coordinates of the points where the line y = 2x + 1 meets the curve x² + y² = 25.",
      4,
      "calculation",
      "(3.2, 7.4) and (−4, −7)",
      4,
      [
        { text: "Substitutes y = 2x + 1 into the curve", marks: 1, keywords: ["substitute", "2x + 1", "replace"] },
        { text: "Obtains 5x² + 4x − 24 = 0", marks: 1, accept: ["5x² + 4x - 24", "5x^2 + 4x - 24"] },
        { text: "Solves to obtain x = 3.2", marks: 1, numeric: 3.2, tol: 0.05 },
        { text: "Obtains both points", marks: 1, accept: ["(3.2, 7.4)", "(−4, −7)", "(-4, -7)"] },
      ]
    ),
  ]),
];

/* --------------------------------- Physics -------------------------------- */

export const physicsA2: Question[] = [
  px("pa2-mech-1", "mech", 3, "Calculate", "9702/42/M/J/24 Q3", [
    p(
      "pa2-mech-1a",
      "",
      "A satellite of mass 800 kg orbits the Earth at a height of 600 km. The mass of the Earth is 5.97 × 10²⁴ kg and its radius is 6.37 × 10⁶ m. Calculate the orbital speed of the satellite.",
      3,
      "calculation",
      "7.58 × 10³ m/s",
      3,
      [
        { text: "Uses r = 6.37 × 10⁶ + 6.0 × 10⁵ = 6.97 × 10⁶ m", marks: 1, numeric: 6970000, tol: 20000 },
        { text: "Equates GMm/r² to mv²/r", marks: 1, keywords: ["gm/r", "gm/r²", "centripetal", "gravitational force"] },
        { text: "Obtains 7.58 × 10³ m/s", marks: 1, numeric: 7580, tol: 60 },
      ]
    ),
  ]),
  px("pa2-elec-1", "elec", 3, "Calculate", "9702/42/O/N/23 Q7", [
    p(
      "pa2-elec-1a",
      "",
      "Two parallel plates 4.0 mm apart have a potential difference of 600 V. An electron is released from the negative plate. Calculate its speed as it reaches the positive plate.",
      4,
      "calculation",
      "1.45 × 10⁷ m/s",
      4,
      [
        { text: "Calculates the electric field strength 600/4.0 × 10⁻³ = 1.5 × 10⁵ V/m", marks: 1, numeric: 150000, tol: 2000 },
        { text: "Uses work done = eV or ½mv²", marks: 1, keywords: ["ev", "half mv", "½mv²", "kinetic"] },
        { text: "Substitutes e = 1.6 × 10⁻¹⁹ and m = 9.11 × 10⁻³¹", marks: 1, keywords: ["1.6", "9.11"] },
        { text: "Obtains 1.45 × 10⁷ m/s", marks: 1, numeric: 1.45e7, tol: 3e5 },
      ]
    ),
  ]),
  px("pa2-waves-1", "waves", 2, "Calculate", "9702/42/M/J/23 Q5", [
    p(
      "pa2-waves-1a",
      "",
      "In a double-slit experiment the slit separation is 0.25 mm, the slit-to-screen distance is 2.4 m and the second-order maximum is 11 mm from the centre. Calculate the wavelength of the light.",
      3,
      "calculation",
      "5.7 × 10⁻⁷ m",
      3,
      [
        { text: "Uses x = λD/a", marks: 1, keywords: ["λd/a", "xd/a", "fringe spacing", "lambda"] },
        { text: "Uses the second-order fringe, so x = 11/2 = 5.5 mm", marks: 1, numeric: 0.0055, tol: 0.0002 },
        { text: "Obtains 5.7 × 10⁻⁷ m", marks: 1, numeric: 5.7e-7, tol: 1e-8 },
      ]
    ),
  ]),
  px("pa2-mat-1", "mat", 3, "Calculate", "9702/42/O/N/24 Q2", [
    p(
      "pa2-mat-1a",
      "",
      "A steel wire of length 2.0 m and cross-sectional area 4.0 × 10⁻⁷ m² is stretched by 1.2 mm by a force of 80 N. Calculate the Young modulus of steel.",
      3,
      "calculation",
      "2.8 × 10¹¹ Pa",
      3,
      [
        { text: "Calculates stress = 80/4.0 × 10⁻⁷ = 2.0 × 10⁸ Pa", marks: 1, numeric: 2e8, tol: 4e6 },
        { text: "Calculates strain = 1.2 × 10⁻³/2.0 = 6.0 × 10⁻⁴", marks: 1, numeric: 6e-4, tol: 2e-5 },
        { text: "Obtains 2.8 × 10¹¹ Pa", marks: 1, numeric: 2.8e11, tol: 5e9 },
      ]
    ),
  ]),
  px("pa2-nuc-1", "nuc", 2, "Calculate", "9702/42/M/J/24 Q8", [
    p(
      "pa2-nuc-1a",
      "",
      "The half-life of a radioactive isotope is 8.0 days. A sample has an activity of 640 Bq. Calculate the activity after 32 days.",
      3,
      "calculation",
      "40 Bq",
      3,
      [
        { text: "Uses four half-lives", marks: 1, numeric: 4, tol: 0.05 },
        { text: "Uses A = A₀ × (1/2)ⁿ", marks: 1, keywords: ["half-life", "halving", "2^4", "(1/2)"] },
        { text: "Obtains 40 Bq", marks: 1, numeric: 40, tol: 1 },
      ]
    ),
  ]),
];

/* -------------------------------- Chemistry ------------------------------- */

export const chemA2: Question[] = [
  px("ca2-org-1", "org", 3, "Explain", "9701/42/M/J/24 Q6", [
    p(
      "ca2-org-1a",
      "",
      "Propene reacts with HBr to give two products. Name them and state which is the major product, explaining your answer.",
      4,
      "structured",
      "1-bromopropane and 2-bromopropane. 2-bromopropane is the major product because the secondary carbocation is more stable than the primary one.",
      5,
      [
        { text: "Names 1-bromopropane", marks: 1, keywords: ["1-bromopropane", "1 bromopropane"] },
        { text: "Names 2-bromopropane", marks: 1, keywords: ["2-bromopropane", "2 bromopropane"] },
        { text: "States that 2-bromopropane is the major product", marks: 1, accept: ["2-bromopropane is the major", "major is 2-bromo"] },
        { text: "Explains via secondary carbocation stability", marks: 1, keywords: ["secondary carbocation", "carbocation", "more stable"] },
      ]
    ),
  ]),
  px("ca2-redox-1", "redox", 3, "Calculate", "9701/42/O/N/23 Q4", [
    p(
      "ca2-redox-1a",
      "",
      "A buffer is made from 0.10 mol dm⁻³ ethanoic acid (Ka = 1.8 × 10⁻⁵ mol dm⁻³) and 0.15 mol dm⁻³ sodium ethanoate. Calculate the pH of the buffer.",
      3,
      "calculation",
      "4.92",
      3,
      [
        { text: "Uses pH = pKa + log([salt]/[acid])", marks: 1, keywords: ["pka", "log", "salt", "acid"] },
        { text: "Calculates pKa = 4.74", marks: 1, numeric: 4.74, tol: 0.03 },
        { text: "Obtains pH = 4.92", marks: 1, numeric: 4.92, tol: 0.05 },
      ]
    ),
  ]),
  px("ca2-kin-1", "kin", 3, "Explain", "9701/42/M/J/23 Q3", [
    p(
      "ca2-kin-1a",
      "",
      "For the reaction A + 2B → C, doubling [A] doubles the rate and doubling [B] quadruples the rate. State the rate equation, the overall order and the units of k.",
      4,
      "structured",
      "Rate = k[A][B]². The overall order is 3. The units of k are dm⁶ mol⁻² s⁻¹.",
      4,
      [
        { text: "States rate = k[A][B]²", marks: 1, accept: ["k[a][b]²", "k[a][b]2", "rate = k[a][b]2"] },
        { text: "States overall order 3", marks: 1, numeric: 3, tol: 0.05 },
        { text: "Determines the units as dm⁶ mol⁻² s⁻¹", marks: 1, keywords: ["dm6", "dm⁶", "mol-2", "mol⁻²"] },
        { text: "Shows that order with respect to A is first", marks: 1, keywords: ["first order", "order 1"] },
      ]
    ),
  ]),
  px("ca2-energetics-1", "energetics", 2, "Calculate", "9701/42/O/N/24 Q2", [
    p(
      "ca2-energetics-1a",
      "",
      "Using the enthalpy changes given, calculate the enthalpy change of formation of ethanol. C(s) + O₂(g) → CO₂(g) ΔH = −394 kJ/mol; H₂(g) + ½O₂(g) → H₂O(l) ΔH = −286 kJ/mol; C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l) ΔH = −1367 kJ/mol.",
      4,
      "calculation",
      "−277 kJ/mol",
      4,
      [
        { text: "Writes a correct formation equation 2C + 3H₂ + ½O₂ → C₂H₅OH", marks: 1, keywords: ["formation", "2c", "3h₂"] },
        { text: "Uses 2 × (−394) = −788 kJ/mol", marks: 1, numeric: -788, tol: 3 },
        { text: "Uses 3 × (−286) = −858 kJ/mol", marks: 1, numeric: -858, tol: 3 },
        { text: "Obtains −277 kJ/mol", marks: 1, numeric: -277, tol: 4 },
      ]
    ),
  ]),
  px("ca2-struct-1", "struct", 2, "Explain", "9701/42/M/J/24 Q1", [
    p(
      "ca2-struct-1a",
      "",
      "Explain why the boiling point of water is much higher than that of hydrogen sulfide, even though hydrogen sulfide has a larger Mr.",
      3,
      "structured",
      "Water molecules form two hydrogen bonds per molecule because oxygen is highly electronegative and has lone pairs. Hydrogen sulfide only has weak permanent dipole–dipole and dispersion forces because sulfur is less electronegative.",
      3,
      [
        { text: "States that water forms hydrogen bonds", marks: 1, keywords: ["hydrogen bond", "hydrogen bonding"] },
        { text: "Explains that oxygen is more electronegative / has lone pairs", marks: 1, keywords: ["electronegative", "lone pair"] },
        { text: "States that hydrogen sulfide has only weaker dipole or dispersion forces", marks: 1, keywords: ["dipole", "dispersion", "van der waals"] },
      ]
    ),
  ]),
];

/* --------------------------------- Biology -------------------------------- */

export const bioA2: Question[] = [
  px("ba2-genetics-1", "genetics", 3, "Explain", "9700/42/M/J/24 Q6", [
    p(
      "ba2-genetics-1a",
      "",
      "Explain how crossing over and independent assortment increase genetic variation.",
      4,
      "structured",
      "Crossing over exchanges alleles between non-sister chromatids of homologous chromosomes in prophase I, producing new combinations of alleles on a chromosome. Independent assortment in metaphase I produces random combinations of maternal and paternal chromosomes.",
      4,
      [
        { text: "States that crossing over occurs in prophase I", marks: 1, keywords: ["prophase", "crossing over", "chiasma"] },
        { text: "Explains that new allele combinations are formed on a chromatid", marks: 1, keywords: ["new combination", "alleles", "exchange"] },
        { text: "States that independent assortment occurs in metaphase I", marks: 1, keywords: ["independent assortment", "metaphase"] },
        { text: "Explains the random orientation of homologous pairs", marks: 1, keywords: ["random", "orientation", "maternal", "paternal"] },
      ]
    ),
  ]),
  px("ba2-homeo-1", "homeo", 3, "Explain", "9700/42/O/N/23 Q7", [
    p(
      "ba2-homeo-1a",
      "",
      "Explain the role of negative feedback in the control of blood glucose concentration.",
      4,
      "structured",
      "A rise in blood glucose is detected by beta cells in the islets of Langerhans, which secrete insulin. Insulin increases glucose uptake by cells and glycogenesis in the liver, lowering blood glucose. A fall is detected by alpha cells, which secrete glucagon, stimulating glycogenolysis and raising blood glucose.",
      5,
      [
        { text: "States that beta cells detect a rise and secrete insulin", marks: 1, keywords: ["beta cells", "insulin", "islets"] },
        { text: "Explains glucose uptake or glycogenesis", marks: 1, keywords: ["glycogenesis", "uptake", "liver", "converted to glycogen"] },
        { text: "States that alpha cells detect a fall and secrete glucagon", marks: 1, keywords: ["alpha cells", "glucagon"] },
        { text: "Explains glycogenolysis returning glucose to the blood", marks: 1, keywords: ["glycogenolysis", "glycogen broken down", "glucose released"] },
      ]
    ),
  ]),
  px("ba2-eco-1", "eco", 2, "Explain", "9700/42/M/J/23 Q9", [
    p(
      "ba2-eco-1a",
      "",
      "Explain the difference between a population and a community, and state one abiotic factor that affects population size.",
      3,
      "structured",
      "A population is all the organisms of one species in a habitat; a community is all the populations of all species in a habitat. Abiotic factors include temperature, light intensity, water availability or pH.",
      3,
      [
        { text: "Defines population as one species in a habitat", marks: 1, keywords: ["one species", "same species"] },
        { text: "Defines community as all species present", marks: 1, keywords: ["all species", "all populations"] },
        { text: "States a valid abiotic factor", marks: 1, keywords: ["temperature", "light", "water", "ph", "oxygen"] },
      ]
    ),
  ]),
  px("ba2-cells-1", "cells", 2, "Explain", "9700/42/O/N/24 Q4", [
    p(
      "ba2-cells-1a",
      "",
      "Explain how the structure of a red blood cell is adapted to its function.",
      3,
      "structured",
      "It has no nucleus so there is more room for haemoglobin. It is biconcave, giving a large surface area to volume ratio for gas exchange. It is flexible so it can pass through narrow capillaries.",
      3,
      [
        { text: "States that there is no nucleus, allowing more haemoglobin", marks: 1, keywords: ["no nucleus", "more haemoglobin", "space"] },
        { text: "States the biconcave shape increases surface area", marks: 1, keywords: ["biconcave", "surface area", "large surface"] },
        { text: "States that flexibility allows passage through capillaries", marks: 1, keywords: ["flexible", "capillaries", "narrow"] },
      ]
    ),
  ]),
  px("ba2-gas-1", "gas", 3, "Explain", "9700/42/M/J/24 Q8", [
    p(
      "ba2-gas-1a",
      "",
      "Explain how the structure of the alveoli and the process of ventilation maintain a steep diffusion gradient for oxygen.",
      4,
      "structured",
      "Alveoli have a large total surface area and a very thin wall, one cell thick, so the diffusion distance is short. Ventilation replaces air in the alveoli, keeping the oxygen concentration high, while blood flow removes oxygen, keeping the concentration low, so a steep gradient is maintained.",
      5,
      [
        { text: "States the large surface area of the alveoli", marks: 1, keywords: ["large surface area", "many alveoli"] },
        { text: "States the thin walls, one cell thick, giving a short diffusion distance", marks: 1, keywords: ["thin", "one cell", "short diffusion"] },
        { text: "Explains that ventilation keeps oxygen concentration high in the alveoli", marks: 1, keywords: ["ventilation", "high concentration", "fresh air"] },
        { text: "Explains that blood flow maintains a low concentration in the blood", marks: 1, keywords: ["blood flow", "low concentration", "removes"] },
      ]
    ),
  ]),
];

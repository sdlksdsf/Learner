import type { Part } from "@/lib/types";
import type { PartExtras } from "@/lib/data/questions/extensions-maths";

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

/* ------------------------------- Physics IGCSE ---------------------------- */

export const physicsIgcseExtras: PartExtras = {
  "pi-for-1": [
    p("pi-for-1b", "(b)", "Convert this speed to m/s.", 1, "calculation", "22.2 m/s", 1, [
      { text: "Divides by 3.6 to obtain 22.2 m/s", marks: 1, numeric: 22.2, tol: 0.2 },
    ]),
  ],
  "pi-for-2": [
    p("pi-for-2b", "(b)", "Calculate the distance travelled during the 4.0 s.", 2, "calculation", "48 m", 2, [
      { text: "Uses s = ut + ½at²", marks: 1, keywords: ["ut", "½at²", "0.5at²"] },
      { text: "Obtains 16 + 32 = 48 m", marks: 1, numeric: 48, tol: 0.5 },
    ]),
  ],
  "pi-for-3": [
    p("pi-for-3b", "(b)", "Calculate the acceleration if the force is doubled.", 1, "calculation", "6.4 m/s²", 1, [
      { text: "Obtains 6.4 m/s²", marks: 1, numeric: 6.4, tol: 0.1 },
    ]),
  ],
  "pi-for-4": [
    p("pi-for-4b", "(b)", "The ball is caught and brought to rest in 0.20 s. Calculate the average force on the ball.", 2, "calculation", "20 N", 2, [
      { text: "Uses F = Δp/t", marks: 1, keywords: ["δp", "change in momentum", "4/0.2"] },
      { text: "Obtains 20 N", marks: 1, numeric: 20, tol: 0.5 },
    ]),
  ],
  "pi-en-1": [
    p("pi-en-1b", "(b)", "Calculate the power if the object moves in 8.0 s.", 2, "calculation", "50 W", 2, [
      { text: "Uses P = W/t", marks: 1, keywords: ["w/t", "work/time", "400/8"] },
      { text: "Obtains 50 W", marks: 1, numeric: 50, tol: 0.5 },
    ]),
  ],
  "pi-en-2": [
    p("pi-en-2b", "(b)", "Calculate the energy transferred in 2.0 minutes.", 2, "calculation", "3600 J", 2, [
      { text: "Converts 2.0 minutes to 120 s", marks: 1, numeric: 120, tol: 1 },
      { text: "Obtains 30 × 120 = 3600 J", marks: 1, numeric: 3600, tol: 10 },
    ]),
  ],
  "pi-en-3": [
    p("pi-en-3b", "(b)", "Calculate the energy wasted.", 1, "calculation", "320 J", 1, [
      { text: "Obtains 800 − 480 = 320 J", marks: 1, numeric: 320, tol: 2 },
    ]),
  ],
  "pi-wa-1": [
    p("pi-wa-1b", "(b)", "Calculate the period of the wave.", 2, "calculation", "0.020 s", 2, [
      { text: "Uses T = 1/f", marks: 1, keywords: ["1/f", "1/50", "period"] },
      { text: "Obtains 0.020 s", marks: 1, numeric: 0.02, tol: 0.001 },
    ]),
  ],
  "pi-wa-2": [
    p("pi-wa-2b", "(b)", "Calculate the critical angle for the glass.", 2, "calculation", "41.1°", 2, [
      { text: "Uses sin c = 1/n", marks: 1, keywords: ["sin c", "1/n", "1/1.52"] },
      { text: "Obtains 41.1°", marks: 1, numeric: 41.1, tol: 0.3 },
    ]),
  ],
  "pi-wa-3": [
    p("pi-wa-3b", "(b)", "State what happens to the angle of reflection if the angle of incidence increases.", 1, "short", "It increases by the same amount.", 1, [
      { text: "States that the angle of reflection increases equally", marks: 1, keywords: ["increases", "same", "equal"] },
    ]),
  ],
  "pi-el-1": [
    p("pi-el-1b", "(b)", "Calculate the resistance if the voltage is doubled to 24 V.", 1, "calculation", "8.0 Ω", 1, [
      { text: "Obtains 8.0 Ω", marks: 1, numeric: 8, tol: 0.1 },
    ]),
  ],
  "pi-el-2": [
    p("pi-el-2b", "(b)", "Calculate the potential difference across the 5.0 Ω resistor.", 2, "calculation", "15 V", 2, [
      { text: "Uses V = IR", marks: 1, keywords: ["v = ir", "ir", "current × resistance"] },
      { text: "Obtains 15 V", marks: 1, numeric: 15, tol: 0.2 },
    ]),
  ],
  "pi-el-3": [
    p("pi-el-3b", "(b)", "Calculate the energy transferred in 5.0 minutes.", 2, "calculation", "138 000 J", 2, [
      { text: "Converts 5.0 minutes to 300 s", marks: 1, numeric: 300, tol: 1 },
      { text: "Obtains 460 × 300 = 138 000 J", marks: 1, numeric: 138000, tol: 500 },
    ]),
  ],
  "pi-el-4": [
    p("pi-el-4b", "(b)", "Calculate the number of electrons that pass. (e = 1.6 × 10⁻¹⁹ C)", 2, "calculation", "3.75 × 10²⁰", 2, [
      { text: "Divides charge by e", marks: 1, keywords: ["1.6 × 10⁻¹⁹", "1.6 × 10-19", "q/e", "60/", "charge by"] },
      { text: "Obtains 3.75 × 10²⁰", marks: 1, numeric: 3.75e20, tol: 1e19 },
    ]),
  ],
  "pi-th-1": [
    p("pi-th-1b", "(b)", "Calculate the power if this energy is supplied in 2.0 minutes.", 2, "calculation", "350 W", 2, [
      { text: "Converts 2.0 minutes to 120 s", marks: 1, numeric: 120, tol: 1 },
      { text: "Obtains 350 W", marks: 1, numeric: 350, tol: 2 },
    ]),
  ],
  "pi-th-2": [
    p("pi-th-2b", "(b)", "Explain why a liquid can flow but a solid cannot.", 2, "structured", "Liquid particles can move past each other, while solid particles are held in fixed positions.", 3, [
      { text: "States that liquid particles can move/slide past each other", marks: 1, keywords: ["move", "slide", "past each other", "flow"] },
      { text: "States that solid particles are in fixed positions", marks: 1, keywords: ["fixed", "cannot move", "vibrate"] },
    ]),
  ],
};

/* ------------------------------ Physics AS/A2 ----------------------------- */

export const physicsAdvancedExtras: PartExtras = {
  "pa-me-1": [
    p("pa-me-1b", "(b)", "Calculate the time taken to reach the maximum height.", 2, "calculation", "2.04 s", 2, [
      { text: "Uses v = u − gt with v = 0", marks: 1, keywords: ["u/g", "20/9.8", "v = 0"] },
      { text: "Obtains 2.04 s", marks: 1, numeric: 2.04, tol: 0.03 },
    ]),
  ],
  "pa-me-2": [
    p("pa-me-2b", "(b)", "Calculate the acceleration if the frictional force doubles.", 2, "calculation", "2.0 m/s²", 2, [
      { text: "Finds the new resultant force 12 − 8 = 4 N", marks: 1, numeric: 4, tol: 0.1 },
      { text: "Obtains 4/2.0 = 2.0 m/s²", marks: 1, numeric: 2, tol: 0.1 },
    ]),
  ],
  "pa-me-3": [
    p("pa-me-3b", "(b)", "Calculate the total kinetic energy before and after the collision.", 3, "calculation", "9.0 J before; 2.25 J after", 3, [
      { text: "Calculates ½ × 0.50 × 6² = 9.0 J", marks: 1, numeric: 9, tol: 0.1 },
      { text: "Calculates ½ × 2.0 × 1.5² = 2.25 J", marks: 1, numeric: 2.25, tol: 0.05 },
      { text: "States that kinetic energy is not conserved (inelastic)", marks: 1, keywords: ["not conserved", "inelastic", "lost"] },
    ]),
  ],
  "pa-me-4": [
    p("pa-me-4b", "(b)", "Calculate the linear speed of the mass.", 2, "calculation", "1.5 m/s", 2, [
      { text: "Uses v = rω", marks: 1, keywords: ["rω", "0.50 × 3.0", "v ="] },
      { text: "Obtains 1.5 m/s", marks: 1, numeric: 1.5, tol: 0.05 },
    ]),
  ],
  "pa-el-1": [
    p("pa-el-1b", "(b)", "Calculate the resistance if the length doubles and the cross-sectional area halves.", 2, "calculation", "0.272 Ω", 2, [
      { text: "Recognises that R is quadrupled", marks: 1, keywords: ["4", "quadruple", "four times", "double"] },
      { text: "Obtains 0.272 Ω", marks: 1, numeric: 0.272, tol: 0.005 },
    ]),
  ],
  "pa-el-2": [
    p("pa-el-2b", "(b)", "Calculate the potential difference across the parallel combination.", 2, "calculation", "4.0 V", 2, [
      { text: "Uses V = IR with the parallel resistance 2.0 Ω", marks: 1, keywords: ["v = ir", "2.0", "parallel"] },
      { text: "Obtains 4.0 V", marks: 1, numeric: 4, tol: 0.1 },
    ]),
  ],
  "pa-el-3": [
    p("pa-el-3b", "(b)", "State the new output voltage if the 8.0 Ω resistor is replaced by a 4.0 Ω resistor.", 2, "calculation", "6.0 V", 2, [
      { text: "Uses 12 × 4/(4 + 4)", marks: 1, accept: ["4/8", "4 + 4", "0.5"] },
      { text: "Obtains 6.0 V", marks: 1, numeric: 6, tol: 0.1 },
    ]),
  ],
  "pa-el-4": [
    p("pa-el-4b", "(b)", "Calculate the energy dissipated in the external resistor in 5.0 minutes.", 3, "calculation", "6600 J", 3, [
      { text: "Calculates P = V²/R = 22 W", marks: 1, numeric: 22, tol: 0.5 },
      { text: "Converts 5.0 minutes to 300 s", marks: 1, numeric: 300, tol: 1 },
      { text: "Obtains 22 × 300 = 6600 J", marks: 1, numeric: 6600, tol: 50 },
    ]),
  ],
  "pa-wa-1": [
    p("pa-wa-1b", "(b)", "State what happens to the fringe spacing if the slit separation is doubled.", 2, "short", "It halves to 1.8 mm.", 2, [
      { text: "States that the spacing halves", marks: 1, keywords: ["halves", "half", "decreases"] },
      { text: "Obtains 1.8 mm", marks: 1, numeric: 1.8, tol: 0.05 },
    ]),
  ],
  "pa-wa-2": [
    p("pa-wa-2b", "(b)", "State what is meant by a node.", 1, "short", "A point of zero displacement on a stationary wave.", 1, [
      { text: "States zero displacement", marks: 1, keywords: ["zero", "no displacement", "minimum"] },
    ]),
  ],
  "pa-wa-3": [
    p("pa-wa-3b", "(b)", "Calculate the maximum number of diffraction orders visible.", 2, "calculation", "4", 2, [
      { text: "Uses d/λ = 4", marks: 1, numeric: 4, tol: 0.1 },
      { text: "States the maximum order is 4", marks: 1, numeric: 4, tol: 0.1 },
    ]),
  ],
  "pa-ma-1": [
    p("pa-ma-1b", "(b)", "Calculate the mass of a 0.010 m³ block of the same material.", 2, "calculation", "27 kg", 2, [
      { text: "Uses m = ρV", marks: 1, keywords: ["ρv", "density × volume", "2700 × 0.010"] },
      { text: "Obtains 27 kg", marks: 1, numeric: 27, tol: 0.2 },
    ]),
  ],
  "pa-ma-2": [
    p("pa-ma-2b", "(b)", "Calculate the stress when the load is 100 N.", 2, "calculation", "5.0 × 10⁷ Pa", 2, [
      { text: "Uses stress = F/A", marks: 1, keywords: ["f/a", "100/", "stress"] },
      { text: "Obtains 5.0 × 10⁷ Pa", marks: 1, numeric: 5e7, tol: 5e5 },
    ]),
  ],
  "pa-nu-1": [
    p("pa-nu-1b", "(b)", "Calculate the frequency of the photon.", 2, "calculation", "6.0 × 10¹⁴ Hz", 2, [
      { text: "Uses E = hf", marks: 1, keywords: ["e = hf", "hf", "h"] },
      { text: "Obtains 6.0 × 10¹⁴ Hz", marks: 1, numeric: 6e14, tol: 6e12 },
    ]),
  ],
  "pa-nu-2": [
    p("pa-nu-2b", "(b)", "Calculate the mass remaining after 60 minutes.", 2, "calculation", "4.0 g", 2, [
      { text: "Recognises 4 half-lives", marks: 1, numeric: 4, tol: 0.1 },
      { text: "Obtains 64/16 = 4.0 g", marks: 1, numeric: 4, tol: 0.1 },
    ]),
  ],
  "pa-nu-3": [
    p("pa-nu-3b", "(b)", "Explain why the total mass of the products is less than the mass of the original nucleus.", 2, "structured", "The mass difference is converted into energy according to E = mc².", 2, [
      { text: "States that some mass is converted to energy", marks: 1, keywords: ["mass", "energy", "mass defect"] },
      { text: "States E = mc² or binding energy", marks: 1, keywords: ["e = mc²", "mc²", "binding energy"] },
    ]),
  ],
};

/* -------------------------------- Chemistry IGCSE -------------------------- */

export const chemIgcseExtras: PartExtras = {
  "ci-at-1": [
    p("ci-at-1c", "(c)", "State the group and period of element X.", 2, "short", "Group 7, period 3", 2, [
      { text: "States group 7", marks: 1, accept: ["group 7", "vii", "halogen"] },
      { text: "States period 3", marks: 1, accept: ["period 3", "3"] },
    ]),
  ],
  "ci-at-2": [
    p("ci-at-2b", "(b)", "State the chemical formula of the compound formed.", 1, "short", "NaCl", 1, [
      { text: "States NaCl", marks: 1, accept: ["nacl", "sodium chloride"] },
    ]),
  ],
  "ci-at-3": [
    p("ci-at-3b", "(b)", "Explain why the bond between two hydrogen atoms is non-polar.", 1, "short", "The atoms have the same electronegativity, so the electrons are shared equally.", 1, [
      { text: "States equal electronegativity / equal sharing", marks: 1, keywords: ["equal", "same electronegativity", "equally"] },
    ]),
  ],
  "ci-at-4": [
    p("ci-at-4b", "(b)", "Explain why isotopes can have different physical properties.", 1, "short", "They have different mass numbers, so their masses and densities can differ.", 1, [
      { text: "States that isotopes have different masses", marks: 1, keywords: ["mass", "different mass number", "neutrons"] },
    ]),
  ],
  "ci-mo-1": [
    p("ci-mo-1b", "(b)", "Calculate the number of molecules in the sample. (L = 6.02 × 10²³)", 2, "calculation", "6.02 × 10²²", 2, [
      { text: "Multiplies moles by the Avogadro constant", marks: 1, keywords: ["avogadro", "6.02 × 10²³", "0.1 ×"] },
      { text: "Obtains 6.02 × 10²²", marks: 1, numeric: 6.02e22, tol: 6e20 },
    ]),
  ],
  "ci-mo-2": [
    p("ci-mo-2b", "(b)", "Calculate the number of oxygen atoms in the sample.", 2, "calculation", "4.52 × 10²³", 2, [
      { text: "Uses 3 oxygen atoms per formula unit", marks: 1, keywords: ["3", "three", "oxygen atoms"] },
      { text: "Obtains 4.52 × 10²³", marks: 1, numeric: 4.52e23, tol: 5e21 },
    ]),
  ],
  "ci-mo-3": [
    p("ci-mo-3b", "(b)", "Calculate the concentration in g/dm³. (Mᵣ of NaCl = 58.5)", 2, "calculation", "117 g/dm³", 2, [
      { text: "Multiplies 2.0 by 58.5", marks: 1, keywords: ["58.5", "2.0 ×", "molar mass"] },
      { text: "Obtains 117 g/dm³", marks: 1, numeric: 117, tol: 1 },
    ]),
  ],
  "ci-mo-4": [
    p("ci-mo-4b", "(b)", "Calculate the concentration of the sodium hydroxide in g/dm³. (Mᵣ of NaOH = 40)", 2, "calculation", "5.0 g/dm³", 2, [
      { text: "Multiplies 0.125 by 40", marks: 1, keywords: ["40", "0.125 ×", "molar mass"] },
      { text: "Obtains 5.0 g/dm³", marks: 1, numeric: 5, tol: 0.1 },
    ]),
  ],
  "ci-ac-1": [
    p("ci-ac-1c", "(c)", "State the effect of adding water on the pH of the solution.", 1, "short", "The pH increases towards 7.", 1, [
      { text: "States that pH increases towards 7", marks: 1, keywords: ["increases", "towards 7", "less acidic"] },
    ]),
  ],
  "ci-ac-2": [
    p("ci-ac-2c", "(c)", "Write the ionic equation for neutralisation.", 1, "short", "H⁺ + OH⁻ → H₂O", 1, [
      { text: "Writes H⁺ + OH⁻ → H₂O", marks: 1, accept: ["h+ + oh", "h2o", "h⁺ + oh⁻"] },
    ]),
  ],
  "ci-ac-3": [
    p("ci-ac-3b", "(b)", "Explain why ethanoic acid has a higher pH than hydrochloric acid at the same concentration.", 2, "structured", "Ethanoic acid is only partially ionised, so it produces fewer H⁺ ions.", 2, [
      { text: "States that ethanoic acid is partially ionised", marks: 1, keywords: ["partially", "not fully", "weak"] },
      { text: "States that it produces fewer H⁺ ions", marks: 1, keywords: ["fewer h⁺", "fewer hydrogen", "h+"] },
    ]),
  ],
  "ci-or-1": [
    p("ci-or-1c", "(c)", "State the test used to distinguish an alkene from an alkane.", 2, "short", "Add bromine water; the alkene decolourises it.", 2, [
      { text: "States bromine water", marks: 1, keywords: ["bromine water", "bromine"] },
      { text: "States that it decolourises / changes from orange to colourless", marks: 1, keywords: ["decolouris", "orange", "colourless"] },
    ]),
  ],
  "ci-or-2": [
    p("ci-or-2b", "(b)", "State the products of incomplete combustion of methane.", 2, "short", "Carbon monoxide and water (and possibly carbon).", 2, [
      { text: "States carbon monoxide", marks: 1, keywords: ["carbon monoxide", "co"] },
      { text: "States water", marks: 1, keywords: ["water", "h2o", "h₂o"] },
    ]),
  ],
  "ci-or-3": [
    p("ci-or-3b", "(b)", "Explain why fermentation must be carried out in the absence of oxygen.", 2, "structured", "Oxygen would oxidise the ethanol to ethanoic acid, and yeast would respire aerobically instead of fermenting.", 2, [
      { text: "States that oxygen oxidises ethanol", marks: 1, keywords: ["oxidis", "oxidize", "ethanoic acid", "vinegar"] },
      { text: "States that yeast would respire aerobically", marks: 1, keywords: ["aerobic", "respire", "oxygen"] },
    ]),
  ],
  "ci-me-1": [
    p("ci-me-1b", "(b)", "State why aluminium is higher than zinc in the reactivity series.", 1, "short", "Aluminium loses its outer electrons more readily / forms positive ions more easily.", 1, [
      { text: "States that aluminium is more reactive / loses electrons more easily", marks: 1, keywords: ["more reactive", "loses electrons", "higher"] },
    ]),
  ],
  "ci-me-2": [
    p("ci-me-2b", "(b)", "Explain why pure copper is a better electrical conductor than brass.", 2, "structured", "Pure copper has a regular lattice with more free electrons; the zinc atoms in brass scatter the electrons.", 2, [
      { text: "States that pure copper has more free electrons / a regular lattice", marks: 1, keywords: ["free electrons", "regular", "lattice"] },
      { text: "States that alloying atoms scatter electrons / increase resistance", marks: 1, keywords: ["scatter", "resistance", "zinc", "impurity"] },
    ]),
  ],
};

/* ------------------------------- Chemistry AS/A2 -------------------------- */

export const chemAdvancedExtras: PartExtras = {
  "ca-st-1": [
    p("ca-st-1b", "(b)", "State the shape of methane and its bond angle.", 2, "short", "Tetrahedral; 109.5°", 2, [
      { text: "States tetrahedral", marks: 1, keywords: ["tetrahedral", "tetrahedral shape"] },
      { text: "States 109.5°", marks: 1, numeric: 109.5, tol: 0.5 },
    ]),
  ],
  "ca-st-2": [
    p("ca-st-2b", "(b)", "Explain why water has a higher boiling point than hydrogen fluoride.", 2, "structured", "Water can form more hydrogen bonds per molecule (two lone pairs and two H atoms), so the total intermolecular attraction is greater.", 2, [
      { text: "States that water forms more hydrogen bonds per molecule", marks: 1, keywords: ["more hydrogen bonds", "two lone pairs", "two hydrogen"] },
      { text: "States that more energy is needed", marks: 1, keywords: ["more energy", "stronger", "higher boiling"] },
    ]),
  ],
  "ca-st-3": [
    p("ca-st-3b", "(b)", "Explain why ionic compounds have high melting points.", 2, "structured", "Strong electrostatic attraction between oppositely charged ions requires a lot of energy to overcome.", 2, [
      { text: "States strong electrostatic attraction", marks: 1, keywords: ["electrostatic", "strong attraction", "ions"] },
      { text: "States that a lot of energy is needed", marks: 1, keywords: ["energy", "overcome", "high temperature"] },
    ]),
  ],
  "ca-en-1": [
    p("ca-en-1b", "(b)", "State why the enthalpy change has a negative sign.", 1, "short", "The reaction is exothermic; heat is released to the surroundings.", 1, [
      { text: "States that the reaction is exothermic", marks: 1, keywords: ["exothermic", "released", "heat given out"] },
    ]),
  ],
  "ca-en-2": [
    p("ca-en-2b", "(b)", "Explain why the calculated value may differ from the experimental value.", 2, "structured", "Bond energies are average values, and the substances may not be in the gaseous state under the stated conditions.", 2, [
      { text: "States that bond energies are averages", marks: 1, keywords: ["average", "mean", "not exact"] },
      { text: "States that the state may differ / not gaseous", marks: 1, keywords: ["gaseous", "state", "conditions"] },
    ]),
  ],
  "ca-en-3": [
    p("ca-en-3b", "(b)", "Calculate the temperature at which the reaction becomes feasible.", 2, "calculation", "416.7 K", 2, [
      { text: "Uses T = ΔH/ΔS", marks: 1, keywords: ["δh/δs", "50/0.120", "t ="] },
      { text: "Obtains 416.7 K", marks: 1, numeric: 416.7, tol: 2 },
    ]),
  ],
  "ca-ki-1": [
    p("ca-ki-1b", "(b)", "State the order of reaction with respect to A and to B.", 2, "short", "First order with respect to each", 2, [
      { text: "States first order in A", marks: 1, keywords: ["first order", "order 1", "first"] },
      { text: "States first order in B", marks: 1, keywords: ["first order", "order 1", "first"] },
    ]),
  ],
  "ca-ki-2": [
    p("ca-ki-2b", "(b)", "State the effect of increasing temperature on the equilibrium, given that the forward reaction is exothermic.", 2, "structured", "The equilibrium shifts to the left, favouring the reverse reaction, because the system opposes the temperature rise.", 2, [
      { text: "States that the equilibrium shifts left / favours the reverse reaction", marks: 1, keywords: ["left", "reverse", "backward"] },
      { text: "Explains that the system opposes the temperature rise", marks: 1, keywords: ["opposes", "opposite", "reduce temperature"] },
    ]),
  ],
  "ca-ki-3": [
    p("ca-ki-3b", "(b)", "State whether a catalyst changes the position of equilibrium.", 1, "short", "No; it speeds up the forward and reverse reactions equally.", 1, [
      { text: "States no / no change", marks: 1, keywords: ["no", "not", "same position"] },
    ]),
  ],
  "ca-or-1": [
    p("ca-or-1b", "(b)", "State the role of the hydroxide ion in the mechanism.", 1, "short", "Nucleophile", 1, [
      { text: "States nucleophile", marks: 1, keywords: ["nucleophile", "nucleophilic"] },
    ]),
  ],
  "ca-or-2": [
    p("ca-or-2b", "(b)", "State the name of the organic product.", 1, "short", "Ethene", 1, [
      { text: "States ethene", marks: 1, keywords: ["ethene", "ethylene"] },
    ]),
  ],
  "ca-or-3": [
    p("ca-or-3b", "(b)", "State how optical isomers can be distinguished.", 2, "short", "They rotate plane-polarised light in opposite directions.", 2, [
      { text: "States plane-polarised light", marks: 1, keywords: ["plane-polarised", "plane polarised", "polarimeter"] },
      { text: "States opposite rotations", marks: 1, keywords: ["opposite", "clockwise", "anticlockwise"] },
    ]),
  ],
  "ca-or-4": [
    p("ca-or-4b", "(b)", "State one difference between addition polymerisation and condensation polymerisation.", 2, "short", "Addition polymerisation has no small molecule eliminated; condensation polymerisation eliminates a small molecule such as water.", 2, [
      { text: "States that addition polymerisation forms one product / no small molecule", marks: 1, keywords: ["no small molecule", "one product", "addition"] },
      { text: "States that condensation eliminates a small molecule", marks: 1, keywords: ["eliminates", "water", "small molecule"] },
    ]),
  ],
  "ca-re-1": [
    p("ca-re-1b", "(b)", "State the change in oxidation state when MnO₄⁻ is reduced to Mn²⁺.", 2, "short", "It decreases by 5, from +7 to +2.", 2, [
      { text: "States that Mn goes from +7 to +2", marks: 1, accept: ["+7", "+2", "7 to 2"] },
      { text: "States a decrease of 5", marks: 1, numeric: 5, tol: 0.1 },
    ]),
  ],
  "ca-re-2": [
    p("ca-re-2b", "(b)", "Explain why the anode must be made of an inert material.", 1, "short", "So that the electrode itself is not oxidised instead of the ions.", 1, [
      { text: "States that the electrode would otherwise react / be oxidised", marks: 1, keywords: ["inert", "not react", "oxidised", "oxidized"] },
    ]),
  ],
  "ca-re-3": [
    p("ca-re-3b", "(b)", "State which electrode is the anode.", 1, "short", "The zinc electrode", 1, [
      { text: "States zinc", marks: 1, keywords: ["zinc", "zn"] },
    ]),
  ],
};

/* --------------------------------- Biology IGCSE -------------------------- */

export const bioIgcseExtras: PartExtras = {
  "bi-ce-1": [
    p("bi-ce-1c", "(c)", "State the function of the cell surface membrane.", 1, "short", "It controls what enters and leaves the cell.", 1, [
      { text: "States that it controls movement of substances", marks: 1, keywords: ["control", "enter", "leave", "selectively permeable"] },
    ]),
  ],
  "bi-ce-2": [
    p("bi-ce-2b", "(b)", "State the function of red blood cells.", 1, "short", "To transport oxygen around the body.", 1, [
      { text: "States oxygen transport", marks: 1, keywords: ["oxygen", "transport", "carry"] },
    ]),
  ],
  "bi-ce-3": [
    p("bi-ce-3b", "(b)", "Explain why the enzyme denatures at high temperatures.", 2, "structured", "The high temperature breaks the bonds that hold the enzyme's tertiary structure, so the active site changes shape and the substrate no longer fits.", 2, [
      { text: "States that bonds break / the tertiary structure changes", marks: 1, keywords: ["bonds", "tertiary", "shape", "unfold"] },
      { text: "States that the active site changes and the substrate cannot bind", marks: 1, keywords: ["active site", "substrate", "fit", "bind"] },
    ]),
  ],
  "bi-tr-1": [
    p("bi-tr-1b", "(b)", "State two factors that affect the rate of diffusion.", 2, "short", "Surface area, concentration gradient, diffusion distance or temperature.", 2, [
      { text: "States surface area or concentration gradient", marks: 1, keywords: ["surface area", "concentration gradient", "distance"] },
      { text: "States temperature or distance", marks: 1, keywords: ["temperature", "distance", "surface area", "concentration"] },
    ]),
  ],
  "bi-tr-2": [
    p("bi-tr-2b", "(b)", "State the term used to describe a plant cell that has lost water in this way.", 1, "short", "Flaccid (or plasmolysed).", 1, [
      { text: "States flaccid or plasmolysed", marks: 1, keywords: ["flaccid", "plasmolysed", "plasmolyzed"] },
    ]),
  ],
  "bi-tr-3": [
    p("bi-tr-3b", "(b)", "Explain why the capillary wall is only one cell thick.", 1, "short", "To give a short diffusion distance.", 1, [
      { text: "States a short diffusion distance", marks: 1, keywords: ["short", "diffusion distance", "thin"] },
    ]),
  ],
  "bi-en-1": [
    p("bi-en-1b", "(b)", "State the source of energy for photosynthesis.", 1, "short", "Light energy from the Sun.", 1, [
      { text: "States light energy", marks: 1, keywords: ["light", "sun", "solar"] },
    ]),
  ],
  "bi-en-2": [
    p("bi-en-2b", "(b)", "State two other factors that could limit the rate of photosynthesis.", 2, "short", "Carbon dioxide concentration and temperature.", 2, [
      { text: "States carbon dioxide concentration", marks: 1, keywords: ["carbon dioxide", "co2", "co₂"] },
      { text: "States temperature", marks: 1, keywords: ["temperature", "heat"] },
    ]),
  ],
  "bi-en-3": [
    p("bi-en-3b", "(b)", "State what is meant by denaturation.", 2, "short", "The active site changes shape permanently, so the enzyme can no longer catalyse the reaction.", 2, [
      { text: "States that the active site changes shape", marks: 1, keywords: ["active site", "shape", "change"] },
      { text: "States that the enzyme no longer works", marks: 1, keywords: ["no longer", "cannot", "loss of function", "permanent"] },
    ]),
  ],
  "bi-ge-1": [
    p("bi-ge-1b", "(b)", "State the base found in RNA but not in DNA.", 1, "short", "Uracil", 1, [
      { text: "States uracil", marks: 1, keywords: ["uracil"] },
    ]),
  ],
  "bi-ge-2": [
    p("bi-ge-2b", "(b)", "State where meiosis occurs in humans.", 1, "short", "In the testes and ovaries.", 1, [
      { text: "States testes and ovaries", marks: 1, keywords: ["testes", "ovaries", "gonads", "reproductive organs"] },
    ]),
  ],
  "bi-ge-3": [
    p("bi-ge-3b", "(b)", "State the genotype of a short plant.", 1, "short", "tt", 1, [
      { text: "States tt", marks: 1, accept: ["tt", "t t"] },
    ]),
  ],
  "bi-ge-4": [
    p("bi-ge-4b", "(b)", "State the genotype of a female carrier for colour blindness.", 1, "short", "XᴮXᵇ", 1, [
      { text: "States the carrier genotype", marks: 1, accept: ["xᴮxᵇ", "xbxb", "x b x b", "carrier"] },
    ]),
  ],
  "bi-ec-1": [
    p("bi-ec-1b", "(b)", "Explain why a pyramid of biomass is usually pyramid-shaped.", 2, "structured", "Energy and biomass are lost at each trophic level, so the mass of organisms at the next level is smaller.", 2, [
      { text: "States that energy/biomass is lost at each level", marks: 1, keywords: ["lost", "energy", "respiration"] },
      { text: "States that less biomass is available at the next level", marks: 1, keywords: ["less", "smaller", "next level"] },
    ]),
  ],
  "bi-ec-2": [
    p("bi-ec-2b", "(b)", "State one way to reduce eutrophication.", 1, "short", "Use less fertiliser, or leave buffer zones near water.", 1, [
      { text: "States a valid measure", marks: 1, keywords: ["less fertiliser", "buffer", "treatment", "reduce"] },
    ]),
  ],
  "bi-ec-3": [
    p("bi-ec-3b", "(b)", "Explain why deforestation increases atmospheric carbon dioxide.", 2, "structured", "There is less photosynthesis to remove carbon dioxide, and burning or decomposing trees releases carbon dioxide.", 2, [
      { text: "States that photosynthesis is reduced", marks: 1, keywords: ["photosynthesis", "less", "remove"] },
      { text: "States that burning/decomposition releases carbon dioxide", marks: 1, keywords: ["burning", "decomposition", "release", "carbon dioxide"] },
    ]),
  ],
};

/* --------------------------------- Biology AS/A2 -------------------------- */

export const bioAdvancedExtras: PartExtras = {
  "ba-ce-1": [
    p("ba-ce-1b", "(b)", "State the function of lysosomes.", 1, "short", "They contain digestive enzymes that break down waste and worn-out organelles.", 1, [
      { text: "States digestion of waste / worn organelles", marks: 1, keywords: ["digest", "waste", "enzymes", "break down"] },
    ]),
  ],
  "ba-ce-2": [
    p("ba-ce-2b", "(b)", "State the role of cholesterol in the cell surface membrane.", 1, "short", "It regulates membrane fluidity and adds mechanical strength.", 1, [
      { text: "States fluidity / strength", marks: 1, keywords: ["fluidity", "strength", "rigid", "regulate"] },
    ]),
  ],
  "ba-ce-3": [
    p("ba-ce-3b", "(b)", "Explain why the secondary immune response is faster than the primary response.", 2, "structured", "Memory cells are already present, so they recognise the antigen quickly and divide rapidly into plasma cells.", 2, [
      { text: "States that memory cells are already present", marks: 1, keywords: ["memory", "already present", "recognise"] },
      { text: "States that they divide rapidly into plasma cells", marks: 1, keywords: ["divide", "plasma", "rapid", "antibody"] },
    ]),
  ],
  "ba-ga-1": [
    p("ba-ga-1b", "(b)", "Explain why the alveolar lining must be moist.", 1, "short", "Oxygen dissolves in the moisture before diffusing into the blood.", 1, [
      { text: "States that gases dissolve in the moisture", marks: 1, keywords: ["dissolve", "moist", "diffuse"] },
    ]),
  ],
  "ba-ga-2": [
    p("ba-ga-2b", "(b)", "Explain the Bohr effect.", 2, "structured", "A high partial pressure of carbon dioxide lowers the pH, which reduces the affinity of haemoglobin for oxygen, so oxygen is released more readily.", 2, [
      { text: "States that carbon dioxide lowers the pH", marks: 1, keywords: ["carbon dioxide", "ph", "acidic"] },
      { text: "States that haemoglobin's affinity for oxygen decreases", marks: 1, keywords: ["affinity", "reduced", "release", "dissociate"] },
    ]),
  ],
  "ba-ga-3": [
    p("ba-ga-3b", "(b)", "Explain why the ventricle wall is thicker than the atrium wall.", 2, "structured", "The ventricle must generate a higher pressure to pump blood to the lungs or the whole body, whereas the atria only pump into the ventricles.", 2, [
      { text: "States that the ventricle generates higher pressure", marks: 1, keywords: ["higher pressure", "pump", "thicker"] },
      { text: "States that the atria pump a short distance / ventricle pumps to body or lungs", marks: 1, keywords: ["body", "lungs", "short distance", "whole body"] },
    ]),
  ],
  "ba-ge-1": [
    p("ba-ge-1b", "(b)", "State the type of bond formed between amino acids in a polypeptide.", 1, "short", "Peptide bond", 1, [
      { text: "States peptide bond", marks: 1, keywords: ["peptide", "bond"] },
    ]),
  ],
  "ba-ge-2": [
    p("ba-ge-2b", "(b)", "Explain how the ratio would change if the genes were linked.", 2, "structured", "Linked genes tend to be inherited together, so the parental phenotypes would be more common than expected and the recombinant phenotypes less common.", 2, [
      { text: "States that parental types increase", marks: 1, keywords: ["parental", "inherited together", "more common"] },
      { text: "States that recombinant types decrease", marks: 1, keywords: ["recombinant", "fewer", "less common"] },
    ]),
  ],
  "ba-ge-3": [
    p("ba-ge-3b", "(b)", "Explain why completing the full antibiotic course reduces the chance of resistance developing.", 2, "structured", "It kills all the bacteria, including those with partial resistance, so fewer resistant bacteria survive to reproduce.", 2, [
      { text: "States that the full course kills all bacteria", marks: 1, keywords: ["all bacteria", "kill", "complete"] },
      { text: "States that fewer resistant bacteria survive to reproduce", marks: 1, keywords: ["survive", "reproduce", "fewer", "resistance"] },
    ]),
  ],
  "ba-ge-4": [
    p("ba-ge-4b", "(b)", "Calculate the frequency of the AA genotype.", 2, "calculation", "0.64", 2, [
      { text: "Uses p² = 0.8²", marks: 1, accept: ["p²", "0.8²", "0.64"] },
      { text: "Obtains 0.64", marks: 1, numeric: 0.64, tol: 0.005 },
    ]),
  ],
  "ba-ho-1": [
    p("ba-ho-1b", "(b)", "Explain what happens if the body temperature rises above the set point.", 2, "structured", "Thermoreceptors detect the rise and the hypothalamus triggers vasodilation and sweating, which increase heat loss.", 2, [
      { text: "States that thermoreceptors detect the rise", marks: 1, keywords: ["thermoreceptor", "detect", "hypothalamus"] },
      { text: "States vasodilation and sweating", marks: 1, keywords: ["vasodilation", "sweat", "heat loss"] },
    ]),
  ],
  "ba-ho-2": [
    p("ba-ho-2b", "(b)", "Explain why synaptic transmission is unidirectional.", 2, "structured", "Vesicles containing neurotransmitter are only in the presynaptic neurone, and receptors are only on the postsynaptic membrane.", 2, [
      { text: "States that vesicles are only in the presynaptic neurone", marks: 1, keywords: ["vesicle", "presynaptic", "only"] },
      { text: "States that receptors are only on the postsynaptic membrane", marks: 1, keywords: ["receptor", "postsynaptic", "only"] },
    ]),
  ],
  "ba-ho-3": [
    p("ba-ho-3b", "(b)", "State the main target cells of insulin.", 1, "short", "Liver and muscle cells (and other body cells).", 1, [
      { text: "States liver and/or muscle cells", marks: 1, keywords: ["liver", "muscle", "cells"] },
    ]),
  ],
  "ba-ec-1": [
    p("ba-ec-1b", "(b)", "Explain why a pyramid of energy is always upright.", 2, "structured", "Energy is lost as heat at each trophic level, so the energy available at the next level is always less.", 2, [
      { text: "States that energy is lost as heat", marks: 1, keywords: ["heat", "lost", "respiration"] },
      { text: "States that less energy is available at the next level", marks: 1, keywords: ["less", "next level", "decrease"] },
    ]),
  ],
  "ba-ec-2": [
    p("ba-ec-2b", "(b)", "Explain what causes the growth rate to slow in the stationary phase.", 2, "structured", "Resources such as food and space become limiting, and waste products accumulate, so the birth rate falls towards the death rate.", 2, [
      { text: "States that resources become limiting", marks: 1, keywords: ["limiting", "resources", "food", "space"] },
      { text: "States that waste accumulates / birth rate approaches death rate", marks: 1, keywords: ["waste", "birth rate", "death rate", "accumulate"] },
    ]),
  ],
  "ba-ec-3": [
    p("ba-ec-3b", "(b)", "Explain what is meant by a climax community.", 2, "structured", "The final stable community that is in balance with its environment and is not replaced by further succession.", 2, [
      { text: "States that it is the final stable community", marks: 1, keywords: ["final", "stable", "climax"] },
      { text: "States that it is in balance with the environment", marks: 1, keywords: ["balance", "equilibrium", "not replaced"] },
    ]),
  ],
};

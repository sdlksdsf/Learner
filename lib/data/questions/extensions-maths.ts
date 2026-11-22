import type { Part, Question } from "@/lib/types";

export type PartExtras = Record<string, Part[]>;

export const withExtras = (questions: Question[], extras: PartExtras): Question[] =>
  questions.map((q) => {
    const extra = extras[q.id];
    return extra ? { ...q, parts: [...q.parts, ...extra] } : q;
  });

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

export const mathsIgcseExtras: PartExtras = {
  "mi-num-1": [
    p("mi-num-1b", "(b)", "The jacket is then reduced by a further 10% of the sale price. Calculate the final price.", 2, "calculation", "$61.20", 2, [
      { text: "Finds 10% of 68 = 6.80", marks: 1, numeric: 6.8, tol: 0.05 },
      { text: "Obtains 68 − 6.80 = 61.20", marks: 1, numeric: 61.2, tol: 0.05 },
    ]),
  ],
  "mi-num-2": [
    p("mi-num-2b", "(b)", "The baker scales the recipe to use 300 g of flour. Calculate the new mass of sugar needed.", 2, "calculation", "120 g", 2, [
      { text: "Finds one part = 60", marks: 1, numeric: 60, tol: 0.2 },
      { text: "Obtains 120 g", marks: 1, numeric: 120, tol: 0.5 },
    ]),
  ],
  "mi-num-3": [
    p("mi-num-3b", "(b)", "Calculate the total interest earned over the 3 years.", 1, "calculation", "$130.46", 1, [
      { text: "Obtains 1330.46 − 1200 = 130.46", marks: 1, numeric: 130.46, tol: 0.1 },
    ]),
  ],
  "mi-num-4": [
    p("mi-num-4b", "(b)", "The bicycle is then sold at a 10% discount on $96. Calculate the sale price.", 2, "calculation", "$86.40", 2, [
      { text: "Finds 10% of 96 = 9.60", marks: 1, numeric: 9.6, tol: 0.05 },
      { text: "Obtains 86.40", marks: 1, numeric: 86.4, tol: 0.05 },
    ]),
  ],
  "mi-alg-1": [
    p("mi-alg-1b", "(b)", "Hence solve 3y − 7 = 2(y + 4) − 5.", 2, "calculation", "y = 10", 2, [
      { text: "Simplifies to 3y − 7 = 2y + 3", marks: 1, accept: ["2y + 3", "2y+3"] },
      { text: "Obtains y = 10", marks: 1, numeric: 10, tol: 0.1 },
    ]),
  ],
  "mi-alg-2": [
    p("mi-alg-2b", "(b)", "Hence solve x² − 9x + 20 = 0.", 2, "calculation", "x = 4 or x = 5", 2, [
      { text: "Uses the factorised form", marks: 1, accept: ["x − 4", "x - 4", "x − 5", "x - 5"] },
      { text: "Obtains x = 4 and x = 5", marks: 1, accept: ["x = 4", "x = 5", "4, 5"] },
    ]),
  ],
  "mi-alg-3": [
    p("mi-alg-3b", "(b)", "Solve the simultaneous equations 2a + 3b = 12 and a − b = 1.", 3, "calculation", "a = 3, b = 2", 3, [
      { text: "Rearranges a = b + 1 and substitutes", marks: 1, accept: ["a = b + 1", "substitute"] },
      { text: "Obtains 5b = 10 or b = 2", marks: 1, numeric: 2, tol: 0.1 },
      { text: "Obtains a = 3", marks: 1, numeric: 3, tol: 0.1 },
    ]),
  ],
  "mi-alg-4": [
    p("mi-alg-4b", "(b)", "Calculate the sum of the first 20 terms of the sequence.", 2, "calculation", "1030", 2, [
      { text: "Uses S = n/2(2a + (n − 1)d) or equivalent", marks: 1, keywords: ["n/2", "sum", "arithmetic series"] },
      { text: "Obtains 1030", marks: 1, numeric: 1030, tol: 1 },
    ]),
  ],
  "mi-geo-1": [
    p("mi-geo-1b", "(b)", "Calculate the area of the triangle, using A = ½ab sin C.", 3, "calculation", "43.8 cm²", 3, [
      { text: "Finds angle C = 180 − 40 − 65 = 75°", marks: 1, numeric: 75, tol: 0.5 },
      { text: "Uses ½ × 8 × 11.36 × sin 75°", marks: 1, accept: ["½", "sin 75", "0.5"] },
      { text: "Obtains 43.8 cm²", marks: 1, numeric: 43.8, tol: 0.2 },
    ]),
  ],
  "mi-geo-2": [
    p("mi-geo-2b", "(b)", "Explain why the angle in a semicircle is 90°.", 2, "short", "The diameter subtends an angle of 180° at the centre, so the angle at the circumference is half of 180° = 90°.", 3, [
      { text: "States that the diameter subtends 180° at the centre", marks: 1, keywords: ["180", "diameter", "straight line"] },
      { text: "States that the angle at the circumference is half the angle at the centre", marks: 1, keywords: ["half", "90", "twice"] },
    ]),
  ],
  "mi-geo-3": [
    p("mi-geo-3b", "(b)", "Calculate the total surface area of the cylinder, including both ends. Give your answer correct to 1 decimal place.", 3, "calculation", "340.8 cm²", 3, [
      { text: "Uses 2πr² + 2πrh", marks: 1, accept: ["2πr²", "2πrh", "surface area"] },
      { text: "Obtains 77 + 263.8", marks: 1, accept: ["77", "263.8", "340.8"] },
      { text: "Obtains 340.8 cm²", marks: 1, numeric: 340.8, tol: 0.3 },
    ]),
  ],
  "mi-geo-4": [
    p("mi-geo-4b", "(b)", "Calculate the direct distance from A to B.", 2, "calculation", "100 km", 2, [
      { text: "Uses Pythagoras' theorem: 60² + 80²", marks: 1, accept: ["60²", "80²", "pythagoras", "√"] },
      { text: "Obtains 100 km", marks: 1, numeric: 100, tol: 0.5 },
    ]),
  ],
  "mi-stat-1": [
    p("mi-stat-1b", "(b)", "Calculate the median number of emails.", 2, "calculation", "6", 2, [
      { text: "Finds the 10th and 11th values", marks: 1, accept: ["10th", "11th", "cumulative"] },
      { text: "Obtains (5 + 7)/2 = 6", marks: 1, numeric: 6, tol: 0.1 },
    ]),
  ],
  "mi-stat-2": [
    p("mi-stat-2b", "(b)", "Calculate the probability that at least one counter is red.", 2, "calculation", "25/28", 2, [
      { text: "Uses 1 − P(blue, blue)", marks: 1, accept: ["1 −", "1 -", "6/56"] },
      { text: "Obtains 25/28", marks: 1, accept: ["25/28", "0.893"] },
    ]),
  ],
  "mi-stat-3": [
    p("mi-stat-3b", "(b)", "Explain why the median is only an estimate.", 1, "short", "The data are grouped, so the exact values within each class are unknown.", 2, [
      { text: "States that the data are grouped / individual values are unknown", marks: 1, keywords: ["grouped", "estimate", "class", "unknown"] },
    ]),
  ],
  "mi-stat-4": [
    p("mi-stat-4c", "(c)", "Calculate the range of the data.", 1, "calculation", "36", 1, [
      { text: "Obtains 40 − 4 = 36", marks: 1, numeric: 36, tol: 0.1 },
    ]),
  ],
};

export const mathsAdvancedExtras: PartExtras = {
  "ma-quad-1": [
    p("ma-quad-1b", "(b)", "Hence solve 2y⁴ − 5y² − 3 = 0.", 2, "calculation", "y = ±√3", 2, [
      { text: "Substitutes x = y² and obtains y² = 3", marks: 1, accept: ["y² = 3", "y2 = 3"] },
      { text: "Obtains y = ±√3", marks: 1, accept: ["±√3", "√3", "1.73"] },
    ]),
  ],
  "ma-quad-2": [
    p("ma-quad-2b", "(b)", "For k = 3, find the roots of the equation.", 2, "calculation", "x = −1 (repeated)", 2, [
      { text: "Writes 3x² + 6x + 3 = 0", marks: 1, accept: ["3x² + 6x + 3", "3x2 + 6x + 3"] },
      { text: "Obtains x = −1 twice", marks: 1, accept: ["−1", "-1", "repeated"] },
    ]),
  ],
  "ma-quad-3": [
    p("ma-quad-3b", "(b)", "State the range of f⁻¹.", 1, "short", "f⁻¹(x) ≠ −3", 2, [
      { text: "States the excluded value −3", marks: 1, accept: ["−3", "-3", "not equal to -3"] },
    ]),
  ],
  "ma-quad-4": [
    p("ma-quad-4b", "(b)", "State the coordinates of the minimum point of the curve y = (x − 2)² + 5.", 1, "short", "(2, 5)", 1, [
      { text: "States (2, 5)", marks: 1, accept: ["(2, 5)", "(2,5)", "2, 5"] },
    ]),
  ],
  "ma-trig-1": [
    p("ma-trig-1b", "(b)", "Hence solve sin 2x = 0.6 for 0° ≤ x ≤ 180°.", 2, "calculation", "x = 18.45° or x = 71.55°", 2, [
      { text: "Uses 2x = 36.87° or 143.13°", marks: 1, accept: ["36.87", "143.13", "2x"] },
      { text: "Divides by 2 to obtain 18.45° and 71.55°", marks: 1, numeric: 18.45, tol: 0.1 },
    ]),
  ],
  "ma-trig-2": [
    p("ma-trig-2b", "(b)", "Hence solve (1 − cos²θ)/sin θ = 0.5 for 0 ≤ θ ≤ π.", 2, "calculation", "θ = π/6 or θ = 5π/6", 2, [
      { text: "Rewrites as sin θ = 0.5", marks: 1, accept: ["sin θ = 0.5", "0.5"] },
      { text: "Obtains π/6 and 5π/6", marks: 1, accept: ["π/6", "5π/6", "30°", "150°"] },
    ]),
  ],
  "ma-trig-3": [
    p("ma-trig-3b", "(b)", "Hence state the maximum and minimum values of 3 sin x + 4 cos x.", 2, "short", "Maximum 5, minimum −5", 2, [
      { text: "States the maximum is R = 5", marks: 1, accept: ["5", "maximum"] },
      { text: "States the minimum is −R = −5", marks: 1, accept: ["−5", "-5", "minimum"] },
    ]),
  ],
  "ma-trig-4": [
    p("ma-trig-4b", "(b)", "Write down the number of solutions of the equation in the interval 0 ≤ θ ≤ 4π.", 1, "short", "6", 1, [
      { text: "States 6", marks: 1, numeric: 6, tol: 0.1 },
    ]),
  ],
  "ma-calc-1": [
    p("ma-calc-1b", "(b)", "Find the x-coordinates of the stationary points of the curve.", 2, "calculation", "x = 1 and x = 5/3", 2, [
      { text: "Sets 3x² − 8x + 5 = 0", marks: 1, accept: ["3x² − 8x + 5 = 0", "3x2 - 8x + 5"] },
      { text: "Obtains x = 1 and x = 5/3", marks: 1, accept: ["1", "5/3", "1.67"] },
    ]),
  ],
  "ma-calc-2": [
    p("ma-calc-2b", "(b)", "Find the equation of the normal to the curve at the same point.", 2, "calculation", "y = −0.2x + 4.2", 2, [
      { text: "Uses the negative reciprocal gradient −1/5", marks: 1, accept: ["−1/5", "-1/5", "−0.2", "-0.2"] },
      { text: "Obtains y − 4 = −0.2(x − 1) or equivalent", marks: 1, accept: ["y = −0.2x + 4.2", "y = -0.2x + 4.2", "y - 4"] },
    ]),
  ],
  "ma-calc-3": [
    p("ma-calc-3b", "(b)", "The curve passes through the point (1, 4). Find the value of C.", 2, "calculation", "C = 1", 2, [
      { text: "Substitutes (1, 4) into the integral", marks: 1, accept: ["2 − 2 + 3 + c", "3 + c", "substitute"] },
      { text: "Obtains C = 1", marks: 1, numeric: 1, tol: 0.1 },
    ]),
  ],
  "ma-calc-4": [
    p("ma-calc-4b", "(b)", "Calculate the area between the curve and the x-axis from x = 2 to x = 3.", 2, "calculation", "19/3", 2, [
      { text: "Integrates x² to x³/3", marks: 1, accept: ["x³/3", "x3/3", "integral"] },
      { text: "Obtains 27/3 − 8/3 = 19/3", marks: 1, numeric: 6.333, tol: 0.02 },
    ]),
  ],
  "ma-calc-5": [
    p("ma-calc-5b", "(b)", "Evaluate the gradient when x = 1.", 2, "calculation", "7680", 2, [
      { text: "Substitutes x = 1 into 30x(3x² + 1)⁴", marks: 1, accept: ["30", "4⁴", "4^4"] },
      { text: "Obtains 7680", marks: 1, numeric: 7680, tol: 1 },
    ]),
  ],
  "ma-vec-1": [
    p("ma-vec-1b", "(b)", "Find a unit vector in the direction of 2a − b.", 2, "short", "(5/√89, −8/√89)", 2, [
      { text: "Divides the vector by its magnitude √89", marks: 1, accept: ["√89", "9.43", "magnitude"] },
      { text: "Obtains (5/√89, −8/√89) or equivalent", marks: 1, accept: ["5/√89", "−8/√89", "0.53", "-0.85"] },
    ]),
  ],
  "ma-vec-2": [
    p("ma-vec-2b", "(b)", "Determine whether the point (7, 0) lies on the line.", 2, "short", "Yes, because (7 − 1)/3 = 2 and 2 − 2 = 0.", 2, [
      { text: "Finds t = 2 from the x-coordinate", marks: 1, numeric: 2, tol: 0.1 },
      { text: "Verifies y = 0 and concludes yes", marks: 1, keywords: ["yes", "lies on", "0"] },
    ]),
  ],
  "ma-vec-3": [
    p("ma-vec-3b", "(b)", "Find the position vector of the midpoint of AC.", 1, "short", "(3, 2, 1)", 1, [
      { text: "Obtains (3, 2, 1)", marks: 1, accept: ["(3, 2, 1)", "(3,2,1)", "3, 2, 1"] },
    ]),
  ],
  "ma-stat-1": [
    p("ma-stat-1b", "(b)", "Calculate P(X ≤ 2).", 3, "calculation", "0.383", 3, [
      { text: "Finds P(X = 0) = 0.0282", marks: 1, numeric: 0.0282, tol: 0.001 },
      { text: "Finds P(X = 1) = 0.1211 and P(X = 2) = 0.2335", marks: 1, accept: ["0.1211", "0.2335", "0.3546"] },
      { text: "Obtains 0.383", marks: 1, numeric: 0.383, tol: 0.005 },
    ]),
  ],
  "ma-stat-2": [
    p("ma-stat-2b", "(b)", "Calculate P(42 < X < 58).", 2, "calculation", "0.683", 2, [
      { text: "Uses z = ±1", marks: 1, accept: ["z = ±1", "42 − 50", "58 − 50"] },
      { text: "Obtains 0.8413 − 0.1587 = 0.6826", marks: 1, numeric: 0.6826, tol: 0.005 },
    ]),
  ],
  "ma-stat-3": [
    p("ma-stat-3b", "(b)", "State the conclusion if the significance level is 1%.", 2, "short", "2.1 < 2.326, so do not reject H0.", 2, [
      { text: "Uses the critical value 2.326", marks: 1, numeric: 2.326, tol: 0.01 },
      { text: "States that H0 is not rejected", marks: 1, keywords: ["not reject", "do not reject", "accept h0"] },
    ]),
  ],
};

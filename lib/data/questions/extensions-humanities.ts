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

export const csExtras: PartExtras = {
  "cs-da-1": [
    p("cs-da-1b", "(b)", "Convert the binary number 101101 to denary.", 1, "calculation", "45", 1, [
      { text: "Obtains 45", marks: 1, numeric: 45, tol: 0.1 },
    ]),
  ],
  "cs-da-2": [
    p("cs-da-2b", "(b)", "State the range of numbers that can be represented by a 4-bit two's complement number.", 2, "short", "−8 to +7", 2, [
      { text: "States −8 as the minimum", marks: 1, accept: ["−8", "-8", "-8 to 7"] },
      { text: "States +7 as the maximum", marks: 1, accept: ["7", "+7", "−8 to 7"] },
    ]),
  ],
  "cs-da-3": [
    p("cs-da-3b", "(b)", "Convert D6 to denary.", 2, "calculation", "214", 2, [
      { text: "Uses D = 13 and 6 = 6", marks: 1, accept: ["13", "6", "13 × 16"] },
      { text: "Obtains 13 × 16 + 6 = 214", marks: 1, numeric: 214, tol: 0.1 },
    ]),
  ],
  "cs-da-4": [
    p("cs-da-4b", "(b)", "Calculate the file size in megabytes, using 1 MB = 1 000 000 bytes.", 2, "calculation", "0.92 MB", 2, [
      { text: "Divides by 1 000 000", marks: 1, keywords: ["1 000 000", "divide", "1000000"] },
      { text: "Obtains 0.92 MB", marks: 1, numeric: 0.9216, tol: 0.005 },
    ]),
  ],
  "cs-al-1": [
    p("cs-al-1b", "(b)", "State the time complexity of the algorithm.", 1, "short", "O(n)", 1, [
      { text: "States O(n)", marks: 1, accept: ["o(n)", "on", "linear"] },
    ]),
  ],
  "cs-al-2": [
    p("cs-al-2b", "(b)", "State the best-case time complexity of bubble sort.", 2, "short", "O(n)", 2, [
      { text: "States O(n)", marks: 1, accept: ["o(n)", "on", "linear"] },
      { text: "Explains that the list is already sorted after one pass", marks: 1, keywords: ["one pass", "already sorted", "no swaps"] },
    ]),
  ],
  "cs-al-3": [
    p("cs-al-3b", "(b)", "Explain why the recursive function eventually terminates.", 1, "short", "It reaches the base case F(0) = 3, so no further calls are made.", 1, [
      { text: "States the base case", marks: 1, keywords: ["base case", "f(0)", "terminates"] },
    ]),
  ],
  "cs-al-4": [
    p("cs-al-4b", "(b)", "State the condition required for binary search to work.", 1, "short", "The data must be sorted.", 1, [
      { text: "States that the data must be sorted", marks: 1, keywords: ["sorted", "order", "ascending"] },
    ]),
  ],
  "cs-st-1": [
    p("cs-st-1b", "(b)", "State one use of a stack.", 1, "short", "Storing return addresses during function calls, or the undo operation.", 1, [
      { text: "States a valid use", marks: 1, keywords: ["function", "return", "undo", "call"] },
    ]),
  ],
  "cs-st-2": [
    p("cs-st-2b", "(b)", "State one disadvantage of a linked list compared with an array.", 2, "short", "No random access; each element must be traversed from the head. It also needs extra memory for pointers.", 2, [
      { text: "States no random access", marks: 1, keywords: ["random access", "traverse", "sequential"] },
      { text: "States extra memory for pointers", marks: 1, keywords: ["pointer", "memory", "extra"] },
    ]),
  ],
  "cs-st-3": [
    p("cs-st-3b", "(b)", "State one advantage of an adjacency matrix over an adjacency list.", 2, "short", "Checking whether an edge exists is O(1), which is faster than searching a list.", 2, [
      { text: "States constant-time edge lookup", marks: 1, keywords: ["o(1)", "constant", "fast", "lookup"] },
      { text: "States that a list must be searched", marks: 1, keywords: ["search", "traverse", "list"] },
    ]),
  ],
  "cs-st-4": [
    p("cs-st-4b", "(b)", "State the order of nodes visited in a post-order traversal.", 2, "short", "D, B, C, A", 2, [
      { text: "States left, right, root order", marks: 1, keywords: ["left", "right", "root"] },
      { text: "Obtains D, B, C, A", marks: 1, accept: ["d, b, c, a", "d b c a"] },
    ]),
  ],
  "cs-lo-1": [
    p("cs-lo-1b", "(b)", "State the name of the law used to simplify A + AB to A.", 1, "short", "Absorption law", 1, [
      { text: "States absorption law", marks: 1, keywords: ["absorption", "absorptive"] },
    ]),
  ],
  "cs-lo-2": [
    p("cs-lo-2b", "(b)", "State the output when both inputs are 0.", 1, "short", "0", 1, [
      { text: "States 0", marks: 1, numeric: 0, tol: 0.1 },
    ]),
  ],
  "cs-lo-3": [
    p("cs-lo-3b", "(b)", "State one advantage of packet switching.", 2, "short", "It makes efficient use of network capacity, and packets can be routed around failures.", 2, [
      { text: "States efficient use of capacity", marks: 1, keywords: ["efficient", "capacity", "share"] },
      { text: "States that it is robust / can route around failures", marks: 1, keywords: ["robust", "failure", "route", "resilient"] },
    ]),
  ],
  "cs-lo-4": [
    p("cs-lo-4b", "(b)", "State one situation where symmetric encryption is preferred.", 1, "short", "Encrypting large amounts of data, because it is faster than asymmetric encryption.", 1, [
      { text: "States bulk/large data encryption or speed", marks: 1, keywords: ["large", "bulk", "fast", "speed"] },
    ]),
  ],
};

export const econExtras: PartExtras = {
  "ec-mi-1": [
    p("ec-mi-1b", "(b)", "Explain what is meant by a contraction in demand.", 2, "structured", "A contraction is a movement along the demand curve caused by a rise in price, so quantity demanded falls.", 2, [
      { text: "States that it is a movement along the demand curve", marks: 1, keywords: ["movement", "along", "contraction"] },
      { text: "States that it is caused by a price rise", marks: 1, keywords: ["price", "rise", "higher"] },
    ]),
  ],
  "ec-mi-2": [
    p("ec-mi-2b", "(b)", "State the effect of the price rise on total revenue.", 2, "short", "Total revenue is unchanged because demand is unit elastic (PED = −1).", 2, [
      { text: "States that total revenue is unchanged", marks: 1, keywords: ["unchanged", "same", "constant"] },
      { text: "Explains that demand is unit elastic", marks: 1, keywords: ["unit elastic", "−1", "-1", "ped"] },
    ]),
  ],
  "ec-mi-3": [
    p("ec-mi-3b", "(b)", "Explain what happens to the price over time if the price is initially below equilibrium.", 2, "structured", "The shortage causes the price to rise. As it rises, quantity demanded falls and quantity supplied rises until the market clears.", 2, [
      { text: "States that the price rises", marks: 1, keywords: ["rises", "rise", "increase"] },
      { text: "States that the market returns to equilibrium", marks: 1, keywords: ["equilibrium", "clears", "market"] },
    ]),
  ],
  "ec-mi-4": [
    p("ec-mi-4b", "(b)", "State one policy that could stabilise farmers' incomes.", 2, "short", "A buffer stock scheme, a subsidy, or a minimum price.", 2, [
      { text: "States a valid policy", marks: 1, keywords: ["buffer stock", "subsidy", "minimum price", "guaranteed"] },
      { text: "Briefly explains how it stabilises income", marks: 1, keywords: ["price", "income", "stable", "buy", "sell"] },
    ]),
  ],
  "ec-fa-1": [
    p("ec-fa-1b", "(b)", "State one example of a negative externality.", 1, "short", "Pollution from a factory, or traffic congestion.", 1, [
      { text: "States a valid example", marks: 1, keywords: ["pollution", "congestion", "smoking", "noise"] },
    ]),
  ],
  "ec-fa-2": [
    p("ec-fa-2b", "(b)", "State one example of a public good.", 1, "short", "Street lighting, national defence, or a lighthouse.", 1, [
      { text: "States a valid example", marks: 1, keywords: ["street lighting", "defence", "lighthouse", "public park"] },
    ]),
  ],
  "ec-fa-3": [
    p("ec-fa-3b", "(b)", "Explain why an indirect tax may be regressive.", 2, "structured", "Lower-income households spend a larger proportion of their income on the taxed good, so the tax takes a bigger share of their income.", 2, [
      { text: "States that the poor spend a larger share of income", marks: 1, keywords: ["larger proportion", "poor", "low income"] },
      { text: "States that the tax is therefore regressive", marks: 1, keywords: ["regressive", "bigger share", "burden"] },
    ]),
  ],
  "ec-fa-4": [
    p("ec-fa-4b", "(b)", "State one limitation of a cap-and-trade scheme.", 2, "short", "It is difficult to set the correct cap, and firms may pass the cost of permits on to consumers.", 2, [
      { text: "States difficulty setting the cap", marks: 1, keywords: ["cap", "difficult", "set", "correct"] },
      { text: "States cost pass-through / monitoring issues", marks: 1, keywords: ["pass on", "consumers", "monitor", "enforce"] },
    ]),
  ],
  "ec-ma-1": [
    p("ec-ma-1b", "(b)", "Explain why real GDP is a better measure of output than nominal GDP.", 2, "structured", "Real GDP removes the effect of price changes, so it measures the change in the volume of output rather than the change in prices.", 2, [
      { text: "States that real GDP removes price changes", marks: 1, keywords: ["price", "inflation", "remove", "constant"] },
      { text: "States that it measures the volume of output", marks: 1, keywords: ["volume", "output", "quantity"] },
    ]),
  ],
  "ec-ma-2": [
    p("ec-ma-2b", "(b)", "Explain one cost of inflation.", 2, "structured", "Inflation reduces the purchasing power of money, so households can buy less with the same income. It also creates uncertainty for firms planning investment.", 2, [
      { text: "States reduced purchasing power", marks: 1, keywords: ["purchasing power", "buy less", "real income"] },
      { text: "States uncertainty or menu/shoe-leather costs", marks: 1, keywords: ["uncertainty", "menu", "shoe", "investment"] },
    ]),
  ],
  "ec-ma-3": [
    p("ec-ma-3b", "(b)", "State one limitation of expansionary fiscal policy.", 2, "short", "Time lags, crowding out, or an increase in government debt.", 2, [
      { text: "States a valid limitation", marks: 1, keywords: ["time lag", "crowding out", "debt", "inflation"] },
      { text: "Briefly explains the limitation", marks: 1, keywords: ["delay", "interest rate", "borrowing", "debt", "crowding"] },
    ]),
  ],
  "ec-ma-4": [
    p("ec-ma-4b", "(b)", "State one policy that could reduce structural unemployment.", 2, "short", "Training and education programmes, or incentives for firms to locate in depressed areas.", 2, [
      { text: "States training/education or regional policy", marks: 1, keywords: ["training", "education", "skills", "regional"] },
      { text: "Explains how it addresses the mismatch", marks: 1, keywords: ["skills", "mismatch", "jobs", "employability"] },
    ]),
  ],
  "ec-tr-1": [
    p("ec-tr-1b", "(b)", "Explain why trade can benefit both countries even if one has an absolute advantage in both goods.", 2, "structured", "Each country should specialise in the good in which it has the lower opportunity cost. Total output rises when they trade, so both can consume beyond their own production possibility frontier.", 2, [
      { text: "States that specialisation is based on opportunity cost", marks: 1, keywords: ["opportunity cost", "specialise", "comparative"] },
      { text: "States that total output rises / both consume beyond PPF", marks: 1, keywords: ["output", "consume", "ppf", "both"] },
    ]),
  ],
  "ec-tr-2": [
    p("ec-tr-2b", "(b)", "Explain why a tariff may lead to retaliation.", 2, "structured", "Other countries may impose tariffs on the first country's exports, reducing its export revenue and welfare.", 2, [
      { text: "States that other countries impose tariffs", marks: 1, keywords: ["retaliate", "retaliation", "other countries", "tariffs"] },
      { text: "States that exports fall / welfare falls", marks: 1, keywords: ["exports", "revenue", "welfare", "fall"] },
    ]),
  ],
  "ec-tr-3": [
    p("ec-tr-3b", "(b)", "State one alternative measure of living standards.", 1, "short", "The Human Development Index (HDI) or GNI per head.", 1, [
      { text: "States HDI or GNI", marks: 1, keywords: ["hdi", "gni", "human development"] },
    ]),
  ],
  "ec-tr-4": [
    p("ec-tr-4b", "(b)", "Explain one effect of the appreciation on domestic consumers.", 2, "structured", "Imports become cheaper, so consumers pay less for imported goods and their real purchasing power rises.", 2, [
      { text: "States that imports become cheaper", marks: 1, keywords: ["imports", "cheaper", "price"] },
      { text: "States that purchasing power rises", marks: 1, keywords: ["purchasing power", "real income", "buy more"] },
    ]),
  ],
};

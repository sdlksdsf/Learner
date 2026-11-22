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

/**
 * Second follow-ups for the economics bank. Each AS question gains a short
 * application part so a full A Level paper reaches 60 marks without padding.
 */
export const econExtras2: PartExtras = {
  "ec-mi-1": [
    p("ec-mi-1c", "(c)", "A government imposes a maximum price below equilibrium. Explain one effect on the market.", 2, "structured", "A shortage develops because quantity demanded exceeds quantity supplied at the controlled price, so queues or a black market may appear.", 2, [
      { text: "States that a shortage develops", marks: 1, keywords: ["shortage", "excess demand", "queues"] },
      { text: "Explains a consequence such as a black market", marks: 1, keywords: ["black market", "rationing", "waiting lists"] },
    ]),
  ],
  "ec-mi-2": [
    p("ec-mi-2c", "(c)", "State one reason why a firm would want to know the PED for its product.", 1, "short", "To decide whether raising the price will increase or reduce total revenue.", 1, [
      { text: "Links PED to pricing or revenue decisions", marks: 1, keywords: ["revenue", "pricing", "price", "demand"] },
    ]),
  ],
  "ec-mi-3": [
    p("ec-mi-3c", "(c)", "Explain one factor that would shift the supply curve to the right.", 2, "structured", "A fall in the cost of production, for example a subsidy or cheaper raw materials, allows firms to supply more at every price.", 2, [
      { text: "States a valid supply factor", marks: 1, keywords: ["subsidy", "cost", "technology", "raw materials"] },
      { text: "Explains that more is supplied at each price", marks: 1, keywords: ["more", "supply", "each price", "shift right"] },
    ]),
  ],
  "ec-mi-4": [
    p("ec-mi-4c", "(c)", "Explain why price volatility harms farmers.", 2, "structured", "Unstable prices make incomes uncertain, so farmers cannot plan investment and may leave the market, reducing future supply.", 2, [
      { text: "States that income becomes uncertain", marks: 1, keywords: ["uncertain", "income", "unstable"] },
      { text: "Explains the effect on planning or investment", marks: 1, keywords: ["plan", "invest", "leave the market", "supply"] },
    ]),
  ],
  "ec-fa-1": [
    p("ec-fa-1c", "(c)", "Explain why a negative externality causes market failure.", 2, "structured", "The private cost of production is lower than the social cost, so the free market produces more than the socially efficient quantity.", 2, [
      { text: "States that social cost exceeds private cost", marks: 1, keywords: ["social cost", "private cost", "external cost"] },
      { text: "States that output is too high", marks: 1, keywords: ["overproduce", "too much", "excess", "over-produced"] },
    ]),
  ],
  "ec-fa-2": [
    p("ec-fa-2c", "(c)", "Explain why the private sector would not provide a public good.", 2, "structured", "Because the good is non-excludable, firms cannot charge consumers, so they cannot recover their costs; the free-rider problem makes provision unprofitable.", 2, [
      { text: "States that non-excludability prevents charging", marks: 1, keywords: ["non-excludable", "cannot charge", "free rider", "free-rider"] },
      { text: "States that provision would be unprofitable", marks: 1, keywords: ["unprofitable", "cost", "no profit", "revenue"] },
    ]),
  ],
  "ec-fa-3": [
    p("ec-fa-3c", "(c)", "State one alternative policy to an indirect tax for reducing a negative externality.", 1, "short", "Regulation, tradable permits, or an education campaign.", 1, [
      { text: "States a valid alternative policy", marks: 1, keywords: ["regulation", "permit", "education", "ban", "standard"] },
    ]),
  ],
  "ec-fa-4": [
    p("ec-fa-4c", "(c)", "Explain how tradable permits create an incentive to reduce emissions.", 2, "structured", "A firm that reduces emissions below its allowance can sell the surplus permits, so cutting pollution becomes a source of revenue.", 2, [
      { text: "States that surplus permits can be sold", marks: 1, keywords: ["sell", "surplus", "trade", "permits"] },
      { text: "States that this creates a financial incentive", marks: 1, keywords: ["incentive", "revenue", "profit", "cheaper"] },
    ]),
  ],
  "ec-ma-1": [
    p("ec-ma-1c", "(c)", "State one limitation of using GDP to compare living standards between countries.", 2, "short", "GDP ignores income distribution, unpaid work and differences in purchasing power.", 2, [
      { text: "States that GDP ignores distribution", marks: 1, keywords: ["distribution", "inequality", "average"] },
      { text: "States that GDP ignores other factors such as purchasing power or unpaid work", marks: 1, keywords: ["purchasing power", "unpaid", "informal", "quality of life"] },
    ]),
  ],
  "ec-ma-2": [
    p("ec-ma-2c", "(c)", "Explain one reason why a government might target an inflation rate of 2% rather than 0%.", 2, "structured", "A low positive target gives room to cut interest rates in a downturn and avoids the risk of deflation, which can delay spending.", 2, [
      { text: "States that it allows room to cut interest rates", marks: 1, keywords: ["interest rate", "room", "cut", "stimulate"] },
      { text: "States that it avoids deflation", marks: 1, keywords: ["deflation", "negative", "delayed spending"] },
    ]),
  ],
  "ec-ma-3": [
    p("ec-ma-3c", "(c)", "Explain how a cut in income tax could increase aggregate demand.", 2, "structured", "A cut raises disposable income, so consumption rises; this raises aggregate demand, and the multiplier may amplify the effect.", 2, [
      { text: "States that disposable income rises", marks: 1, keywords: ["disposable income", "take home", "net income"] },
      { text: "States that consumption and aggregate demand rise", marks: 1, keywords: ["consumption", "aggregate demand", "multiplier"] },
    ]),
  ],
  "ec-ma-4": [
    p("ec-ma-4c", "(c)", "Explain the difference between structural and cyclical unemployment.", 2, "structured", "Structural unemployment is caused by a mismatch between skills and jobs, often through industrial change. Cyclical unemployment is caused by a fall in aggregate demand during a recession.", 2, [
      { text: "Defines structural unemployment as a skills or occupational mismatch", marks: 1, keywords: ["mismatch", "skills", "structural", "decline"] },
      { text: "Defines cyclical unemployment as demand-deficient", marks: 1, keywords: ["cyclical", "demand", "recession", "deficient"] },
    ]),
  ],
  "ec-tr-1": [
    p("ec-tr-1c", "(c)", "Explain one reason why a country might still restrict trade despite the gains from specialisation.", 2, "structured", "It may protect infant industries from established foreign competitors, or protect jobs in vulnerable regions.", 2, [
      { text: "States a valid protectionist reason", marks: 1, keywords: ["infant", "protect", "jobs", "strategic", "security"] },
      { text: "Explains the benefit of that restriction", marks: 1, keywords: ["develop", "grow", "employment", "not depend"] },
    ]),
  ],
  "ec-tr-2": [
    p("ec-tr-2c", "(c)", "Explain one effect of a tariff on domestic consumers.", 2, "structured", "The tariff raises the price of imports, so consumers pay more and their real income falls; choice may also be reduced.", 2, [
      { text: "States that consumers pay higher prices", marks: 1, keywords: ["higher price", "more expensive", "pay more"] },
      { text: "States that real income or choice falls", marks: 1, keywords: ["real income", "choice", "less", "reduced"] },
    ]),
  ],
  "ec-tr-3": [
    p("ec-tr-3c", "(c)", "Explain why GDP per head may overstate living standards in a country with high income inequality.", 2, "structured", "GDP per head is an average, so a high figure can be driven by a small wealthy group while most households remain poor; it says nothing about distribution.", 2, [
      { text: "States that GDP per head is an average", marks: 1, keywords: ["average", "mean", "per head"] },
      { text: "States that inequality means most people may be worse off", marks: 1, keywords: ["inequality", "unequal", "distribution", "most people"] },
    ]),
  ],
  "ec-tr-4": [
    p("ec-tr-4c", "(c)", "Explain one effect of an appreciation on domestic exporters.", 2, "structured", "Export prices rise in foreign currency, so exports become less competitive and export revenue may fall.", 2, [
      { text: "States that exports become more expensive abroad", marks: 1, keywords: ["more expensive", "less competitive", "foreign currency"] },
      { text: "States that export revenue falls", marks: 1, keywords: ["revenue", "fall", "decline", "fewer"] },
    ]),
  ],
};

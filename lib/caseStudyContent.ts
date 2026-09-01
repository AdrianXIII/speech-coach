export type CaseProfession = "business" | "law" | "politics";

export interface CaseStudy {
  id: string;
  profession: CaseProfession;
  category: string;
  title: string;
  /** The problem/background shown to the user before they respond. */
  scenario: string;
  /** Core issues a strong answer needs to address — the grading rubric's backbone. */
  keyIssues: string[];
  /** Professional frameworks/jargon a strong answer would naturally use. */
  expectedConcepts: string[];
  /** 2-4 sentences describing what a strong answer looks like — context for the AI grader. */
  modelApproach: string;
  /** Concepts/frameworks worth reading up on, shown as a baseline regardless of AI feedback. */
  furtherReading: string[];
}

export const CASE_CATEGORIES: Record<CaseProfession, string[]> = {
  business: [
    "Strategy",
    "Finance",
    "Marketing",
    "Operations",
    "Leadership & HR",
    "Crisis Management",
    "Mergers & Acquisitions",
    "Entrepreneurship & Startups",
  ],
  law: [
    "Contract Law",
    "Corporate & Compliance",
    "Civil Litigation",
    "Criminal Law",
    "Constitutional & Regulatory",
  ],
  politics: [
    "Foreign Policy & Diplomacy",
    "Domestic Policy",
    "Crisis Response",
    "Campaign Strategy",
    "Legislative Negotiation",
  ],
};

export function casesForProfession(profession: CaseProfession): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.profession === profession);
}

export function casesForCategory(profession: CaseProfession, category: string): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.profession === profession && c.category === category);
}

export function getCaseById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.id === id);
}

export const CASE_STUDIES: CaseStudy[] = [
  // ============================================================ BUSINESS: Strategy
  {
    id: "biz-strategy-market-entry",
    profession: "business",
    category: "Strategy",
    title: "Entering a Crowded Market",
    scenario:
      "You're the VP of Strategy at a mid-sized consumer electronics company (annual revenue $400M) that makes wireless earbuds. Three larger competitors already dominate the market with 70% combined share. Your board wants a recommendation: enter this market with a differentiated product, or redirect the $30M R&D budget to strengthen your existing home-audio line where you already hold 15% share. Market research shows earbud demand growing 12% annually, but customer acquisition costs are rising fast.",
    keyIssues: [
      "Whether market attractiveness (growth, size) outweighs competitive intensity",
      "What sustainable differentiation would look like against entrenched incumbents",
      "Opportunity cost of not reinvesting in the core business where you have real share",
      "Realistic path to profitability given rising customer acquisition costs",
    ],
    expectedConcepts: [
      "barriers to entry",
      "differentiation strategy",
      "total addressable market",
      "customer acquisition cost",
      "core competency",
      "opportunity cost",
    ],
    modelApproach:
      "A strong answer frames this explicitly as a resource-allocation decision, not just 'is the market attractive.' It weighs the core-business reinvestment option against entry, names a specific differentiation angle (not just 'better product'), and gives a clear recommendation with a rationale tied to the company's actual capabilities.",
    furtherReading: [
      "Porter's Five Forces (competitive intensity analysis)",
      "Ansoff Matrix (market development vs. product development)",
      "Blue Ocean Strategy by Kim & Mauborgne",
    ],
  },
  {
    id: "biz-strategy-diversification",
    profession: "business",
    category: "Strategy",
    title: "Diversify or Double Down",
    scenario:
      "You run a regional chain of 40 fitness studios that has been profitable for eight years but is now facing flat growth as the local market saturates. Your leadership team is split: one faction wants to diversify into a new vertical (corporate wellness contracts), while another wants to double down on the core studio business by expanding into three new cities. Both require roughly the same $8M investment. You have 90 seconds to make the call to the board.",
    keyIssues: [
      "Whether the company's core capabilities transfer to the new vertical",
      "Risk profile of diversification vs. geographic expansion",
      "Signal that flat growth actually sends about market saturation vs. execution",
      "How to sequence the decision rather than treating it as strictly either/or",
    ],
    expectedConcepts: [
      "core competency",
      "adjacent market",
      "market saturation",
      "capital allocation",
      "risk-adjusted return",
    ],
    modelApproach:
      "A strong answer doesn't just pick a side — it interrogates whether flat growth is a market problem or an execution problem first, then evaluates capability transfer honestly (does running studios prepare you to sell B2B contracts?), and proposes a way to de-risk the bigger bet, e.g. a pilot before full commitment.",
    furtherReading: [
      "Related vs. unrelated diversification research",
      "Adjacent Possible strategy frameworks",
      "Real options thinking in capital allocation",
    ],
  },
  {
    id: "biz-strategy-low-cost-disruptor",
    profession: "business",
    category: "Strategy",
    title: "Responding to a Low-Cost Disruptor",
    scenario:
      "You lead a premium meal-kit delivery service charging $12/serving. A new entrant just launched at $6/serving using a leaner supply chain and no fresh-produce guarantee. They've captured 8% of the market in four months, mostly from your price-sensitive segment. Your gross margin is currently 42%. The CEO wants your recommendation in the next strategy meeting: match the price, hold firm on premium positioning, or something else entirely.",
    keyIssues: [
      "Whether matching price is even structurally possible given your cost base",
      "Which customer segment you actually risk losing vs. which you should protect",
      "Signal value of price as part of your brand positioning",
      "Whether there's a third option beyond the binary the CEO framed",
    ],
    expectedConcepts: [
      "cost structure",
      "price elasticity",
      "customer segmentation",
      "brand positioning",
      "unit economics",
    ],
    modelApproach:
      "A strong answer resists the false binary in the prompt. It identifies that matching price would likely destroy margin without matching the disruptor's cost structure, argues for segment-specific responses (e.g. a stripped-down tier for price-sensitive customers without cannibalizing the premium brand), and ties the recommendation back to unit economics.",
    furtherReading: [
      "The Innovator's Dilemma by Clayton Christensen",
      "Price segmentation and fighter brands",
      "Cost leadership vs. differentiation (Porter's generic strategies)",
    ],
  },
  {
    id: "biz-strategy-vertical-integration",
    profession: "business",
    category: "Strategy",
    title: "The Vertical Integration Decision",
    scenario:
      "Your furniture manufacturing company currently buys hardwood from three independent suppliers. Prices have risen 35% over two years due to supply shocks, squeezing your margins from 18% to 9%. Acquiring one of your suppliers would cost $22M but would lock in supply and potentially restore margins. Your CFO is skeptical: manufacturing and forestry are very different businesses to run. You need to recommend whether to proceed.",
    keyIssues: [
      "Whether supply volatility is a temporary shock or a structural risk worth permanently owning",
      "Organizational capability to run a business you have no experience in",
      "Alternative ways to secure supply without full ownership (long-term contracts, hedging)",
      "Return on the $22M relative to alternative uses of that capital",
    ],
    expectedConcepts: [
      "vertical integration",
      "supply chain risk",
      "make-vs-buy decision",
      "long-term supply contract",
      "capital expenditure",
    ],
    modelApproach:
      "A strong answer treats vertical integration as one option among several, not the default answer to a supply problem. It weighs contractual alternatives (long-term hedged contracts, dual-sourcing) against outright acquisition, and is honest about the operational risk of running an unfamiliar business.",
    furtherReading: [
      "Transaction cost economics (Oliver Williamson)",
      "Make-vs-buy decision frameworks",
      "Supply chain risk management",
    ],
  },
  {
    id: "biz-strategy-blue-ocean",
    profession: "business",
    category: "Strategy",
    title: "Escaping a Price War",
    scenario:
      "Your regional airline has been locked in a fare war with two competitors on the same routes for three years. Average fares have dropped 22%, and all three carriers are now unprofitable on those routes. The board wants a plan that doesn't involve simply outlasting competitors in a war of attrition. You have data showing an underserved segment of business travelers who value guaranteed on-time departure and flexible rebooking over price.",
    keyIssues: [
      "Whether continuing to compete on price is sustainable for anyone",
      "How to identify and serve a segment competitors aren't fighting over",
      "What trade-offs the company must make to serve that segment credibly",
      "Risk of alienating the existing price-sensitive customer base",
    ],
    expectedConcepts: [
      "value innovation",
      "blue ocean strategy",
      "market segmentation",
      "differentiation",
      "value curve",
    ],
    modelApproach:
      "A strong answer explicitly names the shift from competing within the existing market (price) to creating a new value proposition (reliability/flexibility) for an underserved segment, and is specific about what the airline would need to add, reduce, or eliminate to deliver on that promise credibly.",
    furtherReading: [
      "Blue Ocean Strategy by Kim & Mauborgne",
      "Value curve / strategy canvas analysis",
      "Segmentation, targeting, positioning (STP) framework",
    ],
  },

  // ============================================================ BUSINESS: Finance
  {
    id: "biz-finance-capital-structure",
    profession: "business",
    category: "Finance",
    title: "Debt or Equity",
    scenario:
      "Your manufacturing company needs $15M to build a new production line that will increase capacity by 40%. You can raise it through a bank loan at 7% interest, or through a new equity round that would dilute existing shareholders by roughly 12%. The company currently carries $20M in existing debt against $50M in annual EBITDA. The CFO wants your recommendation for the board memo.",
    keyIssues: [
      "Current leverage level and how much additional debt the balance sheet can safely absorb",
      "Cost of debt vs. cost of equity given the company's risk profile",
      "Signal each option sends to existing shareholders and lenders",
      "Sensitivity of the decision to whether the new capacity's returns are certain",
    ],
    expectedConcepts: [
      "leverage ratio",
      "cost of capital",
      "dilution",
      "EBITDA",
      "debt covenant",
      "capital structure",
    ],
    modelApproach:
      "A strong answer calculates or at least reasons through the debt capacity (e.g. debt-to-EBITDA ratio) before recommending anything, weighs the fixed obligation of debt against the flexibility-but-dilution of equity, and ties the recommendation to how certain the returns from the new capacity actually are.",
    furtherReading: [
      "Modigliani-Miller theorem and its real-world limits",
      "Weighted average cost of capital (WACC)",
      "Debt-to-EBITDA and interest coverage ratios",
    ],
  },
  {
    id: "biz-finance-cash-flow-crisis",
    profession: "business",
    category: "Finance",
    title: "The Working Capital Squeeze",
    scenario:
      "Your wholesale distribution business is profitable on paper (12% net margin) but is 45 days from running out of cash. Customers pay you on 60-day terms while your suppliers demand payment in 30 days, and a recent 25% sales surge has widened this gap further. You need to present a plan to the CEO this afternoon that avoids missing payroll.",
    keyIssues: [
      "Distinguishing a profitability problem from a working capital / cash conversion cycle problem",
      "Immediate levers: renegotiating supplier terms, factoring receivables, a short-term credit line",
      "Whether the sales surge itself is partly the cause and needs managing, not just celebrating",
      "Longer-term fix vs. the urgent 45-day problem",
    ],
    expectedConcepts: [
      "cash conversion cycle",
      "accounts receivable",
      "accounts payable",
      "invoice factoring",
      "working capital",
      "line of credit",
    ],
    modelApproach:
      "A strong answer immediately separates 'profitable' from 'solvent' and names the cash conversion cycle as the real issue. It proposes concrete near-term levers (factoring, renegotiated terms, a bridge line of credit) before touching longer-term fixes, matching the urgency in the prompt.",
    furtherReading: [
      "Cash conversion cycle calculation",
      "Invoice factoring and receivables financing",
      "Working capital management fundamentals",
    ],
  },
  {
    id: "biz-finance-investment-appraisal",
    profession: "business",
    category: "Finance",
    title: "Choosing Between Two Projects",
    scenario:
      "You have $10M to allocate between two projects. Project A returns $3M annually for 5 years starting next year (NPV positive, IRR 18%). Project B requires two years of investment before returning $6M annually for 4 years (IRR 24%, but higher risk and longer payback). The board asks you to recommend one, considering the company's current strategic need for near-term cash flow to service existing debt.",
    keyIssues: [
      "Whether IRR alone is the right decision criterion given the company's cash flow needs",
      "How project risk should be weighted against headline return",
      "Payback period relevance given the debt-servicing constraint mentioned",
      "What NPV tells you that IRR doesn't",
    ],
    expectedConcepts: [
      "net present value",
      "internal rate of return",
      "payback period",
      "discount rate",
      "risk-adjusted return",
    ],
    modelApproach:
      "A strong answer doesn't just pick the higher IRR — it explicitly connects the decision to the stated constraint (near-term cash flow needs for debt service), which argues for weighting Project A's earlier cash flows more heavily despite Project B's higher IRR, and explains the NPV vs. IRR trade-off in plain terms.",
    furtherReading: [
      "NPV vs. IRR: when they disagree and why",
      "Capital budgeting techniques",
      "Payback period as a liquidity-focused metric",
    ],
  },
  {
    id: "biz-finance-pricing-margins",
    profession: "business",
    category: "Finance",
    title: "The Margin Trap",
    scenario:
      "Your SaaS company has been discounting aggressively to win enterprise deals — average discount is now 35% off list price, and it's become an expectation among your sales team and customers. Gross margin has slipped from 78% to 61% over two years even as revenue grew 40%. The CEO wants a plan to fix pricing discipline without losing the growth momentum.",
    keyIssues: [
        "Why discounting became normalized and what incentive structure caused it",
      "Risk of a sudden pricing change to existing customer relationships and renewals",
      "Distinguishing volume growth from healthy growth",
      "How to change sales incentives, not just the price list",
    ],
    expectedConcepts: [
      "gross margin",
      "price discipline",
      "sales incentive alignment",
      "customer lifetime value",
      "anchoring price",
    ],
    modelApproach:
      "A strong answer identifies that the root cause is likely sales compensation structure (reps rewarded for closed revenue, not margin), not just weak pricing policy, and proposes a phased fix — e.g. margin-based commission, value-based pricing tiers, grandfathering existing renewals — rather than an abrupt policy change that risks churn.",
    furtherReading: [
      "Value-based pricing strategy",
      "Sales compensation design and incentive alignment",
      "Customer lifetime value (LTV) analysis",
    ],
  },
  {
    id: "biz-finance-downturn-tradeoff",
    profession: "business",
    category: "Finance",
    title: "Cutting Costs vs. Protecting R&D",
    scenario:
      "Your industrial equipment company needs to cut $12M in annual costs due to a demand downturn. Finance has proposed cutting the R&D budget by 60%, which would meet the target immediately but would delay your next-generation product by at least two years — a product two competitors are racing to launch first. The alternative is a broader but shallower set of cuts across all departments plus a hiring freeze.",
    keyIssues: [
      "Short-term survival vs. long-term competitive position",
      "Whether R&D cuts are reversible if the downturn is temporary",
      "Competitive timing risk of delaying the next-generation product",
      "Whether broader, shallower cuts actually achieve the same savings without the strategic risk",
    ],
    expectedConcepts: [
      "sunk cost",
      "opportunity cost",
      "competitive positioning",
      "cost rationalization",
      "strategic vs. operational spending",
    ],
    modelApproach:
      "A strong answer treats R&D spend as a strategic asset, not just a line item, and explicitly weighs the competitive risk of ceding a two-year head start to rivals against the immediate savings. It should propose a way to hit the savings target without a blunt 60% R&D cut, or make an explicit, reasoned case for why the cut is worth the risk.",
    furtherReading: [
      "Innovation investment during economic downturns (countercyclical R&D research)",
      "Zero-based budgeting",
      "Strategic cost management vs. across-the-board cuts",
    ],
  },

  // ============================================================ BUSINESS: Marketing
  {
    id: "biz-marketing-reputation-repositioning",
    profession: "business",
    category: "Marketing",
    title: "Rebuilding a Damaged Brand",
    scenario:
      "Your household cleaning products brand was hit six months ago by viral social media claims (later found to be exaggerated but not entirely false) that a flagship product caused skin irritation. Sales dropped 30% and haven't recovered. Brand tracking shows trust scores are still 25 points below pre-crisis levels. The marketing team is split between a reformulation-and-relaunch campaign versus a longer trust-rebuilding campaign with no product changes.",
    keyIssues: [
      "Whether the underlying product issue (even if exaggerated) needs a real fix, not just messaging",
      "Credibility of a relaunch if customers don't believe anything actually changed",
      "Time horizon: quick sales recovery vs. durable trust rebuilding",
      "Role of transparency and third-party validation in restoring credibility",
    ],
    expectedConcepts: [
      "brand equity",
      "crisis communications",
      "trust recovery",
      "third-party validation",
      "brand repositioning",
    ],
    modelApproach:
      "A strong answer doesn't treat this as a purely messaging problem — it asks whether there's a real product/safety response needed first, since a relaunch without substance risks a second credibility hit. It proposes third-party validation (independent safety testing, transparent reporting) as a trust-building lever, not just new ad creative.",
    furtherReading: [
      "Crisis communication frameworks (image repair theory)",
      "Brand trust and equity measurement",
      "Case studies on product-safety brand recoveries",
    ],
  },
  {
    id: "biz-marketing-product-cannibalization",
    profession: "business",
    category: "Marketing",
    title: "The Cannibalization Problem",
    scenario:
      "You launched a lower-priced version of your flagship software product to capture small-business customers. Six months in, 40% of its buyers are existing flagship customers downgrading, not new customers — and blended revenue per customer has dropped 18%. The product team wants to keep pushing the new tier; sales leadership wants to kill it. You need to present a recommendation.",
    keyIssues: [
      "Whether the cannibalization is destroying value or simply reflects customers who were overpaying",
      "Net effect on total revenue and customer lifetime value, not just the downgrade rate",
      "Whether the tier is attracting genuinely new customers who wouldn't have bought otherwise",
      "How to redesign tiering/packaging to reduce cannibalization rather than killing the tier outright",
    ],
    expectedConcepts: [
      "product cannibalization",
      "customer lifetime value",
      "price tiering",
      "product-market fit",
      "revenue per customer",
    ],
    modelApproach:
      "A strong answer looks past the headline cannibalization number to the net revenue and retention effect, and considers redesigning the tier boundaries (feature gating, usage limits) to reduce downgrades while still capturing new small-business customers, rather than a binary keep/kill decision.",
    furtherReading: [
      "Product-line cannibalization analysis",
      "SaaS pricing and packaging strategy",
      "Customer segmentation for tiered products",
    ],
  },
  {
    id: "biz-marketing-new-segment",
    profession: "business",
    category: "Marketing",
    title: "Targeting a New Customer Segment",
    scenario:
      "Your outdoor apparel brand has built a loyal base of serious hikers and climbers over 20 years. Growth has plateaued because that segment is saturated. Data shows a large, fast-growing segment of urban customers buying your products for everyday wear, not outdoor use — but your brand identity and marketing are built entirely around technical performance. Leadership wants your recommendation on whether and how to pursue this segment.",
    keyIssues: [
      "Risk of alienating the core loyal segment if the brand shifts toward lifestyle positioning",
      "Whether the two segments can be served under one brand or need separation (sub-brand)",
      "Product implications: does 'everyday wear' demand actually require different products",
      "Sizing the opportunity honestly against the risk to brand authenticity",
    ],
    expectedConcepts: [
      "brand authenticity",
      "market segmentation",
      "sub-branding",
      "brand extension",
      "positioning",
    ],
    modelApproach:
      "A strong answer takes the core-brand risk seriously rather than chasing growth reflexively, and proposes a structural solution — such as a distinct sub-line or marketing channel — that captures the new segment without diluting the core brand's technical credibility with its loyal base.",
    furtherReading: [
      "Brand extension and dilution research",
      "Segmentation, targeting, positioning (STP)",
      "Case studies on outdoor/lifestyle brand crossover (e.g. Patagonia, The North Face)",
    ],
  },
  {
    id: "biz-marketing-share-vs-profit",
    profession: "business",
    category: "Marketing",
    title: "Market Share vs. Profitability",
    scenario:
      "Your beverage brand is the #3 player in a category dominated by two giants. The board wants to become #1 within five years. Marketing proposes an aggressive promotional strategy (heavy discounting, buy-one-get-one) to grab share fast, projected to cost $40M in margin over two years but potentially double market share. Finance is alarmed at the margin hit with no guarantee competitors won't simply match the promotions.",
    keyIssues: [
      "Sustainability of share gains built on promotion once promotions stop",
      "Likely competitive response and whether a promotional war is winnable given relative resources",
      "Whether the five-year #1 goal is the right goal, or a proxy for something else (profitability, brand strength)",
      "Alternative paths to share gain that don't rely purely on price",
    ],
    expectedConcepts: [
      "market share",
      "price promotion",
      "competitive response",
      "brand loyalty",
      "sustainable growth",
    ],
    modelApproach:
      "A strong answer questions whether promotion-driven share is durable, models out the likely competitive response (the two giants can almost certainly outspend a promotional war), and proposes share gains anchored in differentiation or distribution rather than price alone.",
    furtherReading: [
      "Game theory in competitive pricing (price war dynamics)",
      "Share of voice vs. share of market",
      "Sustainable competitive advantage frameworks",
    ],
  },
  {
    id: "biz-marketing-digital-transformation",
    profession: "business",
    category: "Marketing",
    title: "A Legacy Brand Goes Digital",
    scenario:
      "Your 60-year-old furniture retailer has always relied on physical showrooms and print catalogs; 90% of sales still come through stores. Younger competitors selling online-only are growing fast with a fraction of your overhead. The board wants a digital transformation plan, but is worried about cannibalizing showroom traffic and alienating an older core customer base that values in-person service.",
    keyIssues: [
      "Whether digital and physical channels compete or can be made complementary",
      "Customer segment differences: what the older base needs vs. what's needed to win younger buyers",
      "Organizational and cultural resistance to change, not just the technology build",
      "Sequencing: pilot vs. full transformation, given the operational risk",
    ],
    expectedConcepts: [
      "omnichannel strategy",
      "digital transformation",
      "channel conflict",
      "customer journey",
      "showrooming",
    ],
    modelApproach:
      "A strong answer frames this as an omnichannel design problem, not 'stores vs. online' — e.g. using digital to drive showroom visits (book-a-consultation, augmented-reality previews) rather than replacing them outright, and proposes piloting in a subset of markets before a full rollout.",
    furtherReading: [
      "Omnichannel retail strategy",
      "Digital transformation change management",
      "Showrooming and webrooming consumer behavior",
    ],
  },

  // ============================================================ BUSINESS: Operations
  {
    id: "biz-ops-supply-chain-risk",
    profession: "business",
    category: "Operations",
    title: "The Single-Source Supplier Risk",
    scenario:
      "Your electronics company sources a critical semiconductor component from a single supplier in a region prone to natural disasters and geopolitical tension. That supplier accounts for 80% of your unit cost advantage over competitors. A recent near-miss (a two-week factory shutdown due to a regional event) exposed how exposed you are. The COO wants a risk mitigation plan that doesn't destroy your cost advantage.",
    keyIssues: [
      "Trade-off between cost efficiency (single-source) and resilience (diversified sourcing)",
      "Realistic timeline and cost of qualifying a second supplier",
      "Whether inventory buffering is a viable interim mitigation",
      "How to quantify the risk in dollar terms to justify the mitigation cost",
    ],
    expectedConcepts: [
      "single-source risk",
      "supply chain resilience",
      "dual sourcing",
      "safety stock",
      "risk quantification",
    ],
    modelApproach:
      "A strong answer avoids treating this as an all-or-nothing decision — it proposes a phased approach (safety stock as an immediate buffer, qualifying a second supplier over 12-18 months) and explicitly quantifies the cost of the 2024 near-miss against the cost of mitigation to make the case concrete.",
    furtherReading: [
      "Supply chain risk management frameworks",
      "Dual sourcing and supplier diversification strategy",
      "Business continuity planning for manufacturing",
    ],
  },
  {
    id: "biz-ops-quality-recall",
    profession: "business",
    category: "Operations",
    title: "The Recall Decision",
    scenario:
      "Quality control has flagged that 2% of a recent batch of your children's toys (500,000 units, already shipped to retailers) may have a choking-hazard defect. Testing so far is inconclusive on the exact failure rate. A full recall would cost an estimated $8M and significant brand damage; waiting for more conclusive testing risks a safety incident and regulatory action if the defect is confirmed. You must recommend action within the hour.",
    keyIssues: [
      "Safety-first principle when facing genuine uncertainty about risk severity",
      "Regulatory and legal exposure of delaying action on a potential safety issue",
      "How to communicate a recall in a way that preserves as much trust as possible",
      "What 'inconclusive testing' should mean for the decision timeline, not just the decision itself",
    ],
    expectedConcepts: [
      "product recall",
      "regulatory compliance",
      "precautionary principle",
      "risk exposure",
      "crisis communication",
    ],
    modelApproach:
      "A strong answer defaults to safety over cost avoidance given a child-safety context, recommends immediate voluntary recall rather than waiting for conclusive proof, and pairs the decision with a clear, transparent communication plan — not silence while testing continues.",
    furtherReading: [
      "Consumer Product Safety Commission (CPSC) recall procedures",
      "Precautionary principle in risk management",
      "Case studies: Johnson & Johnson Tylenol recall (gold-standard response)",
    ],
  },
  {
    id: "biz-ops-lean-resistance",
    profession: "business",
    category: "Operations",
    title: "Resistance to Lean Manufacturing",
    scenario:
      "You've been brought in to implement lean manufacturing principles at a 200-person factory that has operated the same way for 30 years. Six months into the rollout, defect rates and cycle times have improved on paper, but morale has dropped sharply and two experienced supervisors have quit, citing 'being told everything they know is wrong.' Leadership wants the program to continue but asks you to fix the people problem.",
    keyIssues: [
      "Whether the implementation approach itself (not lean principles) caused the resistance",
      "Balancing measurable process gains against real organizational/human cost",
      "How to involve frontline workers as participants rather than subjects of change",
      "Whether losing experienced supervisors undermines the very knowledge lean transformation needs",
    ],
    expectedConcepts: [
      "lean manufacturing",
      "change management",
      "kaizen",
      "employee buy-in",
      "organizational resistance",
    ],
    modelApproach:
      "A strong answer separates the technical success (lower defects, faster cycles) from the change-management failure, and proposes involving frontline staff and supervisors as co-designers of improvements (a genuine kaizen approach) rather than having lean imposed on them — addressing the root cause of the resistance, not just morale symptoms.",
    furtherReading: [
      "Toyota Production System and genuine kaizen culture",
      "Kotter's 8-step change management model",
      "Change resistance and employee engagement research",
    ],
  },
  {
    id: "biz-ops-outsourcing",
    profession: "business",
    category: "Operations",
    title: "Outsource or Keep In-House",
    scenario:
      "Your company's customer service center employs 300 people and costs $18M annually. An outsourcing firm has quoted $11M annually for the same service level, claiming equal or better satisfaction scores based on their other clients. Your current team has deep product knowledge and strong customer relationships built over years. The CFO wants the savings; the head of customer experience is strongly opposed.",
    keyIssues: [
      "Whether the outsourcer's claimed satisfaction scores are comparable given your product's complexity",
      "Value of institutional/product knowledge that would be lost, and how to quantify it",
      "Transition risk and cost not captured in the headline savings figure",
      "Middle-ground options (partial outsourcing, hybrid model) versus an all-or-nothing choice",
    ],
    expectedConcepts: [
      "outsourcing",
      "total cost of ownership",
      "customer experience",
      "institutional knowledge",
      "service level agreement",
    ],
    modelApproach:
      "A strong answer doesn't take the $7M savings at face value — it probes the total cost of ownership (transition costs, ramp-up quality dip, knowledge loss) and considers a hybrid model (outsource tier-1 routine inquiries, keep complex support in-house) rather than an all-or-nothing switch.",
    furtherReading: [
      "Total cost of ownership analysis for outsourcing decisions",
      "Business process outsourcing (BPO) case studies",
      "Service level agreement (SLA) design",
    ],
  },
  {
    id: "biz-ops-capacity-planning",
    profession: "business",
    category: "Operations",
    title: "Capacity Planning Under Uncertainty",
    scenario:
      "Your food manufacturing company is deciding whether to build a new $25M production facility to meet demand forecasts showing 30% growth over three years. However, two of your three forecast scenarios (from different analysts) show growth closer to 12%, which wouldn't justify the investment. Building too little risks losing customers to competitors who can fill orders; building too much risks a costly underutilized asset.",
    keyIssues: [
      "How to make a large, largely irreversible investment under genuine forecast uncertainty",
      "Whether a phased/modular capacity approach reduces risk versus one large commitment",
      "Cost of under-building (lost sales, customer defection) vs. cost of over-building (idle capacity)",
      "What additional information could reduce uncertainty before committing fully",
    ],
    expectedConcepts: [
      "demand forecasting",
      "capacity utilization",
      "real options",
      "scenario planning",
      "capital expenditure",
    ],
    modelApproach:
      "A strong answer treats this explicitly as a decision under uncertainty and proposes a real-options approach — e.g. building modular capacity in phases tied to actual demand signals — rather than committing to the full $25M based on the most optimistic forecast.",
    furtherReading: [
      "Real options analysis in capital investment",
      "Scenario planning methodology",
      "Capacity planning and demand forecasting techniques",
    ],
  },

  // ============================================================ BUSINESS: Leadership & HR
  {
    id: "biz-hr-underperforming-manager",
    profession: "business",
    category: "Leadership & HR",
    title: "The Underperforming Star Manager",
    scenario:
      "One of your department heads consistently delivers excellent individual results and is a favorite of senior leadership, but three team members have quietly reported a pattern of belittling behavior in meetings. No formal complaint has been filed, and HR has no documented policy violation to act on. Two high performers on the team have mentioned they're job-hunting. You need to decide how to handle this.",
    keyIssues: [
      "Risk of losing high performers if the behavior continues unaddressed",
      "How to act on credible but informal, undocumented reports",
      "Balancing the manager's business results against the cultural/retention cost",
      "What intervention is proportionate before a formal process is warranted",
    ],
    expectedConcepts: [
      "psychological safety",
      "toxic high performer",
      "employee retention",
      "360-degree feedback",
      "performance management",
    ],
    modelApproach:
      "A strong answer doesn't wait for a formal complaint to act, given the retention risk already visible. It proposes a direct, documented conversation with the manager backed by specific behavioral feedback (ideally via 360 input), with clear expectations and follow-up — treating this as a real performance issue, not just 'results excuse everything.'",
    furtherReading: [
      "The cost of toxic high performers (Cornerstone/Harvard research)",
      "360-degree feedback processes",
      "Psychological safety in teams (Amy Edmondson)",
    ],
  },
  {
    id: "biz-hr-layoffs-vs-paycuts",
    profession: "business",
    category: "Leadership & HR",
    title: "Layoffs or Across-the-Board Pay Cuts",
    scenario:
      "Your 200-person company needs to cut $4M from payroll due to a revenue shortfall. HR has modeled two options: laying off 15% of staff (30 people) while keeping remaining pay intact, or a 10% pay cut across the entire company with no layoffs. Employee morale is already fragile after a difficult year. The executive team is deadlocked and wants your recommendation with reasoning.",
    keyIssues: [
      "Concentrated pain (layoffs) vs. distributed pain (pay cuts) and their different morale effects",
      "Long-term talent and rehiring cost implications of each option",
      "Fairness and legal considerations in how layoffs would be selected",
      "Whether a hybrid approach could reduce the downside of both",
    ],
    expectedConcepts: [
      "survivor syndrome",
      "workforce reduction",
      "total compensation",
      "employer brand",
      "severance",
    ],
    modelApproach:
      "A strong answer weighs 'survivor syndrome' (remaining employees' guilt and anxiety after layoffs) against the resentment risk of pay cuts, considers the cost of losing institutional knowledge in layoffs versus disengagement risk from pay cuts, and can justify a clear recommendation or a reasoned hybrid (e.g., pay cuts plus voluntary buyouts).",
    furtherReading: [
      "Survivor syndrome research in organizational psychology",
      "Layoffs vs. pay cuts: comparative organizational outcomes",
      "WARN Act and legal considerations in workforce reductions",
    ],
  },
  {
    id: "biz-hr-culture-clash",
    profession: "business",
    category: "Leadership & HR",
    title: "Culture Clash After the Merger",
    scenario:
      "Six months after your fast-moving startup was acquired by a large, process-heavy corporation, half your original engineering team has quit, citing 'death by committee' and a loss of autonomy. The parent company insists its processes exist for good reasons (compliance, scale) and won't bend. You've been asked to propose a plan to stop the bleeding before losing the rest of the team that justified the acquisition price in the first place.",
    keyIssues: [
      "Whether the acquired team's value depended on conditions the merger is now destroying",
      "What specific processes are genuinely necessary vs. reflexively applied",
      "Realistic middle ground between full autonomy and full process compliance",
      "Retention urgency given the departures already happening",
    ],
    expectedConcepts: [
      "post-merger integration",
      "cultural due diligence",
      "organizational autonomy",
      "acqui-hire",
      "change fatigue",
    ],
    modelApproach:
      "A strong answer names the root tension explicitly — the acquisition's value was the startup's speed and autonomy, and process-heavy integration is destroying the asset that was purchased — and proposes a negotiated 'protected zone' (e.g., a semi-autonomous unit with lighter-touch processes) rather than either full compliance or full independence.",
    furtherReading: [
      "Post-merger integration failure research (why most M&A destroys value)",
      "Cultural due diligence in M&A",
      "Acqui-hire retention strategies",
    ],
  },
  {
    id: "biz-hr-succession-crisis",
    profession: "business",
    category: "Leadership & HR",
    title: "Sudden CEO Departure",
    scenario:
      "Your CEO has just resigned abruptly for personal reasons with no succession plan in place. The board must announce a plan within 48 hours to avoid spooking investors and key customers ahead of a major contract renewal. Internally, two VPs are seen as capable but neither has run a company before; an external search would take months. You're advising the board on next steps.",
    keyIssues: [
      "Balancing speed of decision against the risk of an unprepared internal promotion",
      "Interim leadership options (interim CEO, co-leadership) versus a rushed permanent choice",
      "External communication strategy to reassure investors and the key customer",
      "What support structure an internal promotion would need to succeed",
    ],
    expectedConcepts: [
      "succession planning",
      "interim leadership",
      "stakeholder confidence",
      "board governance",
      "leadership transition",
    ],
    modelApproach:
      "A strong answer separates the 48-hour communication need from the longer-term leadership decision — recommending a credible interim arrangement (e.g., an experienced board member as interim CEO, or a clearly time-boxed co-leadership) while running a proper process for the permanent choice, rather than rushing a permanent decision under time pressure.",
    furtherReading: [
      "CEO succession planning best practices",
      "Interim leadership research and case studies",
      "Crisis governance and board responsibilities",
    ],
  },
  {
    id: "biz-hr-dei-resistance",
    profession: "business",
    category: "Leadership & HR",
    title: "Internal Resistance to a DEI Initiative",
    scenario:
      "You launched a diversity and inclusion initiative six months ago, including revised hiring practices and mandatory training. A vocal minority of managers privately (and increasingly openly) complain it's 'lowering the bar' and creating resentment, despite data showing hiring quality metrics are unchanged. HR reports rising tension in several teams. Leadership asks you to recommend how to proceed.",
    keyIssues: [
      "Distinguishing data-backed outcomes from perception-driven resistance",
      "Whether communication, not the initiative itself, is the gap",
      "How to engage skeptical managers without abandoning the initiative's goals",
      "Risk of either capitulating to pressure or ignoring legitimate process concerns entirely",
    ],
    expectedConcepts: [
      "diversity, equity, and inclusion (DEI)",
      "unconscious bias",
      "change management",
      "stakeholder engagement",
      "organizational culture",
    ],
    modelApproach:
      "A strong answer leads with the data (hiring quality unchanged) to address the substance of the complaint directly, but doesn't dismiss the resistance as merely bigotry — it proposes structured engagement with skeptical managers to surface and address specific, legitimate process concerns, distinguishing those from resistance to the goal itself.",
    furtherReading: [
      "Evidence-based DEI program design",
      "Managing change resistance in organizational initiatives",
      "Research on DEI backlash and effective communication strategies",
    ],
  },

  // ============================================================ BUSINESS: Crisis Management
  {
    id: "biz-crisis-data-breach",
    profession: "business",
    category: "Crisis Management",
    title: "The Data Breach",
    scenario:
      "Your e-commerce platform discovered yesterday that hackers accessed a database containing 2 million customers' names, emails, and hashed passwords (not raw passwords or payment data) over the past three weeks. Legal counsel says you're not strictly required to disclose immediately under applicable law, but waiting risks a worse story if it leaks first. The CEO wants your recommendation for the next 24 hours.",
    keyIssues: [
      "Legal minimum disclosure requirement vs. what trust and reputation actually require",
      "Risk of the story breaking independently before you control the narrative",
      "What concrete remediation steps to offer affected customers",
      "Coordination needed across legal, PR, security, and customer service before any announcement",
    ],
    expectedConcepts: [
      "data breach disclosure",
      "incident response",
      "reputational risk",
      "customer trust",
      "regulatory compliance",
    ],
    modelApproach:
      "A strong answer recommends proactive disclosure ahead of any legal deadline, reasoning that reputational risk from a delayed or leaked disclosure outweighs short-term discomfort, and pairs the announcement with concrete remediation (forced password resets, credit monitoring where relevant, a clear security fix timeline).",
    furtherReading: [
      "Incident response planning frameworks (NIST)",
      "Data breach notification laws (GDPR, state-level US laws)",
      "Case studies: Equifax vs. other breach responses (a cautionary comparison)",
    ],
  },
  {
    id: "biz-crisis-executive-scandal",
    profession: "business",
    category: "Crisis Management",
    title: "The Executive Scandal",
    scenario:
      "Your company's co-founder and public-facing Chief Innovation Officer has been credibly accused (via multiple corroborating sources, not yet legal findings) of inappropriate conduct toward junior employees over several years. He denies wrongdoing. He's central to your brand identity and a major product launch is three weeks away. The board wants your recommendation on next steps before this becomes public.",
    keyIssues: [
      "Standard of evidence required for the company to act versus wait for formal findings",
      "Duty of care to potential victims and current employees regardless of legal proceedings",
      "Business risk of the product launch being overshadowed or tainted",
      "How the company's response itself becomes part of the story",
    ],
    expectedConcepts: [
      "duty of care",
      "reputational risk",
      "independent investigation",
      "crisis communications",
      "corporate governance",
    ],
    modelApproach:
      "A strong answer prioritizes a credible, independent investigation and protective measures for potential victims over the product launch timeline, and recognizes that how the company responds (transparency, taking allegations seriously) will shape the story as much as the underlying facts — recommending action rather than waiting silently.",
    furtherReading: [
      "Independent workplace investigation best practices",
      "Crisis communications and reputational risk management",
      "Corporate governance responses to executive misconduct allegations",
    ],
  },
  {
    id: "biz-crisis-disaster-supply",
    profession: "business",
    category: "Crisis Management",
    title: "Disaster Disrupts Your Supply Chain",
    scenario:
      "A major earthquake has just struck a region where 60% of your manufacturing capacity is located. Initial reports suggest facilities are intact but power and logistics are severely disrupted, likely for weeks. You have roughly two weeks of finished-goods inventory. Customers are already asking about order fulfillment. You need to brief the executive team on immediate priorities.",
    keyIssues: [
      "Employee safety and welfare as the immediate first priority, ahead of business continuity",
      "Realistic assessment of alternate capacity and how fast it could be activated",
      "Customer communication strategy given genuine uncertainty about timelines",
      "Sequencing: what needs deciding today versus what can wait a few days for better information",
    ],
    expectedConcepts: [
      "business continuity planning",
      "crisis communication",
      "supply chain resilience",
      "alternate sourcing",
      "stakeholder management",
    ],
    modelApproach:
      "A strong answer opens with employee welfare before any business consideration, then moves methodically through business continuity: assessing alternate capacity, communicating proactively and honestly with customers about uncertainty rather than overpromising, and explicitly separating decisions that must be made immediately from those that can wait for clearer information.",
    furtherReading: [
      "Business continuity planning (BCP) frameworks",
      "Supply chain resilience post-disaster case studies (e.g. 2011 Japan earthquake auto industry)",
      "Crisis leadership and decision-making under uncertainty",
    ],
  },
  {
    id: "biz-crisis-whistleblower",
    profession: "business",
    category: "Crisis Management",
    title: "The Whistleblower's Claim",
    scenario:
      "An employee has anonymously reported through your ethics hotline that a regional sales team has been falsifying customer contract terms to hit quarterly targets, potentially exposing the company to fraud liability. The regional VP is one of your top performers and denies any knowledge. You need to decide how to investigate and what to communicate, and to whom, in the next 48 hours.",
    keyIssues: [
      "Obligation to investigate credibly regardless of the accused's seniority or performance",
      "Independence of the investigation to preserve credibility",
      "Legal exposure and disclosure obligations if allegations are substantiated",
      "Protecting the whistleblower from retaliation throughout the process",
    ],
    expectedConcepts: [
      "whistleblower protection",
      "internal investigation",
      "fraud liability",
      "corporate compliance",
      "conflict of interest",
    ],
    modelApproach:
      "A strong answer insists on an investigation independent of the accused VP's chain of command, explicitly protects the whistleblower's anonymity and non-retaliation, and treats performance/seniority as irrelevant to whether the allegation gets taken seriously — while being careful not to presume guilt before findings.",
    furtherReading: [
      "Whistleblower protection laws (Sarbanes-Oxley, Dodd-Frank)",
      "Internal investigation best practices",
      "Corporate compliance and fraud risk management",
    ],
  },
  {
    id: "biz-crisis-viral-backlash",
    profession: "business",
    category: "Crisis Management",
    title: "The Viral Backlash",
    scenario:
      "A poorly-worded internal email from a junior marketing employee was leaked and is now going viral, being interpreted (somewhat unfairly, given missing context) as the company mocking a customer complaint about accessibility. Outrage is building on social media within hours. The employee is distraught; the actual intent was misunderstood but not malicious. You have to advise the CEO on a response within the next two hours.",
    keyIssues: [
      "Speed of response required in a fast-moving social media crisis versus getting the message right",
      "Whether to explain context or simply apologize, given that explanations often read as excuses",
      "Protecting the junior employee from disproportionate personal blame",
      "What concrete action (not just words) would demonstrate the company takes the underlying issue seriously",
    ],
    expectedConcepts: [
      "social media crisis management",
      "reputational risk",
      "stakeholder communication",
      "accountability",
      "brand trust",
    ],
    modelApproach:
      "A strong answer recommends a fast, genuine apology that doesn't over-explain or sound defensive, paired with a concrete commitment (e.g., an accessibility review or fix) rather than words alone, while also protecting the junior employee from public pile-on by keeping the response institutional, not individual-focused.",
    furtherReading: [
      "Social media crisis response frameworks",
      "Image repair theory (Benoit)",
      "Case studies in rapid-response corporate apologies",
    ],
  },

  // ============================================================ BUSINESS: Mergers & Acquisitions
  {
    id: "biz-ma-hostile-takeover",
    profession: "business",
    category: "Mergers & Acquisitions",
    title: "Defending Against a Hostile Bid",
    scenario:
      "A larger competitor has just launched an unsolicited tender offer for your company at a 20% premium to the current share price, which your board believes undervalues the company's long-term prospects. Some shareholders are eager to accept the premium now. The board has asked you to outline the company's options in the next emergency meeting.",
    keyIssues: [
      "Fiduciary duty to shareholders versus management's own interests in staying independent",
      "Available defensive measures and their real-world effectiveness and legal limits",
      "Whether the long-term value argument is credible and can be substantiated to shareholders",
      "Risk of appearing to entrench management rather than protect shareholder value",
    ],
    expectedConcepts: [
      "hostile takeover",
      "fiduciary duty",
      "poison pill",
      "white knight",
      "shareholder value",
    ],
    modelApproach:
      "A strong answer centers shareholder interest, not management self-preservation, and lays out real options (seeking a competing bid, articulating a credible standalone value-creation plan, or negotiating a higher price) rather than reflexively resisting — while being clear about the fiduciary duty constraints on any defensive action.",
    furtherReading: [
      "Fiduciary duty in takeover defense (Revlon and Unocal standards)",
      "Common takeover defense mechanisms (poison pills, staggered boards)",
      "Case studies in hostile takeover battles",
    ],
  },
  {
    id: "biz-ma-integration-failure",
    profession: "business",
    category: "Mergers & Acquisitions",
    title: "Post-Merger Integration Is Failing",
    scenario:
      "A year after acquiring a smaller competitor for $80M, expected synergies (projected at $15M annually) have not materialized. Two key product teams still operate on separate systems, customer complaints have risen due to confusion between overlapping product lines, and several key acquired employees have left. The board wants your assessment and turnaround plan.",
    keyIssues: [
      "Root-causing why synergies didn't materialize (planning failure vs. execution failure)",
      "Prioritizing which integration work to do now versus what can be deferred or abandoned",
      "Customer-facing fixes (overlapping products, confusion) as urgent versus internal systems work",
      "Retention risk for remaining acquired talent",
    ],
    expectedConcepts: [
      "post-merger integration",
      "synergy realization",
      "integration roadmap",
      "customer experience",
      "talent retention",
    ],
    modelApproach:
      "A strong answer diagnoses before prescribing — distinguishing whether the original synergy case was unrealistic or execution simply lagged — and prioritizes customer-facing confusion as urgent while sequencing the harder systems integration work, with an explicit retention plan for remaining key talent.",
    furtherReading: [
      "Why most M&A deals fail to realize synergies (McKinsey/HBR research)",
      "Post-merger integration playbooks",
      "Talent retention in acquisitions",
    ],
  },
  {
    id: "biz-ma-valuation-gap",
    profession: "business",
    category: "Mergers & Acquisitions",
    title: "Bridging a Valuation Gap",
    scenario:
      "You're negotiating to acquire a promising startup. Your valuation model puts fair value at $45M based on current revenue and realistic growth assumptions; the founders, citing a competing offer and their own more optimistic projections, want $70M. Walking away risks losing a strategically important asset to a competitor; overpaying risks a value-destroying deal your own board will question.",
    keyIssues: [
      "Whether the valuation gap reflects genuine information asymmetry or simple negotiation posturing",
      "Structuring mechanisms (earnouts, milestone payments) to bridge disagreement about future performance",
      "Strategic value beyond the standalone financial valuation that might justify a premium",
      "Walk-away discipline versus deal fever",
    ],
    expectedConcepts: [
      "valuation gap",
      "earnout structure",
      "due diligence",
      "strategic premium",
      "deal fever",
    ],
    modelApproach:
      "A strong answer proposes structural solutions to the gap — most notably an earnout tied to the founders' own growth projections proving true — rather than simply splitting the difference or capitulating, and is explicit about the discipline needed to walk away if the strategic premium can't be justified.",
    furtherReading: [
      "Earnout structures in M&A negotiations",
      "Valuation methodologies (DCF, comparable company analysis)",
      "Negotiation tactics for bridging valuation disagreements",
    ],
  },
  {
    id: "biz-ma-cultural-diligence",
    profession: "business",
    category: "Mergers & Acquisitions",
    title: "The Overlooked Cultural Due Diligence",
    scenario:
      "Your company is three weeks from closing a $50M acquisition. Financial and legal due diligence are complete and clean. During a routine site visit, your integration lead notices the target's engineering culture is highly hierarchical and risk-averse — the opposite of your fast-moving, flat-structure culture. No one flagged this earlier because due diligence focused entirely on financials and legal exposure. You must advise leadership on whether and how to proceed.",
    keyIssues: [
      "Whether a cultural mismatch this late should affect deal terms or timing, not just post-close planning",
      "Realistic assessment of whether cultural integration is achievable versus a fundamental incompatibility",
      "Cost of delaying close to properly assess this versus the risk of proceeding blind",
      "What integration plan changes this finding should trigger regardless of whether the deal proceeds",
    ],
    expectedConcepts: [
      "cultural due diligence",
      "organizational culture fit",
      "deal risk assessment",
      "integration planning",
      "change management",
    ],
    modelApproach:
      "A strong answer doesn't dismiss this as a soft, non-dealbreaking issue — cultural mismatch is one of the most common reasons M&A destroys value — and recommends a rapid but real cultural assessment before close, potentially adjusting the integration plan or, if warranted, deal terms, rather than proceeding on the assumption that culture will sort itself out.",
    furtherReading: [
      "Cultural due diligence frameworks in M&A",
      "Why culture clashes derail acquisitions (research on M&A failure causes)",
      "Organizational culture assessment tools",
    ],
  },
  {
    id: "biz-ma-divestiture",
    profession: "business",
    category: "Mergers & Acquisitions",
    title: "Selling an Underperforming Division",
    scenario:
      "Your conglomerate has a legacy print media division that has lost money for four consecutive years but still employs 800 people and carries brand history dating back decades. A buyer has offered $30M — well below book value but a genuine offer. Keeping the division a fifth year would cost an estimated $12M in further losses. The board is split between the financial logic of selling and the reputational/emotional weight of the brand's history.",
    keyIssues: [
      "Sunk cost fallacy risk in weighing the division's history against forward-looking economics",
      "Employee impact and severance/transition obligations in a divestiture",
      "Brand and reputational considerations that go beyond the balance sheet",
      "Whether $30M is a fair price or a signal to negotiate further, or explore alternative buyers",
    ],
    expectedConcepts: [
      "divestiture",
      "sunk cost fallacy",
      "book value",
      "portfolio strategy",
      "stakeholder impact",
    ],
    modelApproach:
      "A strong answer explicitly names the sunk cost trap (the division's history shouldn't drive a forward-looking financial decision) while still taking employee and brand impact seriously as legitimate factors to manage, not ignore — and considers whether the offer should be tested against alternative buyers before accepting.",
    furtherReading: [
      "Portfolio theory and divestiture strategy",
      "Sunk cost fallacy in corporate decision-making",
      "Employee transition planning in divestitures",
    ],
  },

  // ============================================================ BUSINESS: Entrepreneurship & Startups
  {
    id: "biz-startup-pivot",
    profession: "business",
    category: "Entrepreneurship & Startups",
    title: "The Pivot Decision",
    scenario:
      "Eighteen months and $2M of seed funding into your B2B software startup, customer acquisition has stalled at a level far below what your investors expect, despite a genuinely well-built product. User interviews reveal customers like a secondary feature more than the core product you built the company around. You have nine months of runway left. Your co-founders are divided on whether to pivot or push harder on the original vision.",
    keyIssues: [
      "Distinguishing a genuine product-market fit signal from noise in a small sample of interviews",
      "Runway constraint and how much time a pivot realistically needs to prove itself",
      "Sunk cost of the original vision versus following the evidence",
      "How to test the pivot hypothesis cheaply before fully committing",
    ],
    expectedConcepts: [
      "product-market fit",
      "pivot",
      "runway",
      "minimum viable product",
      "sunk cost fallacy",
    ],
    modelApproach:
      "A strong answer treats the secondary-feature signal as data worth testing rigorously, not as an automatic pivot trigger, and proposes a cheap, fast validation (a focused MVP or landing-page test) of the new direction before abandoning the original product entirely, explicitly accounting for the runway constraint.",
    furtherReading: [
      "The Lean Startup by Eric Ries",
      "Product-market fit signals and how to measure them",
      "Case studies of successful startup pivots (Slack, Instagram, Twitter)",
    ],
  },
  {
    id: "biz-startup-cofounder-conflict",
    profession: "business",
    category: "Entrepreneurship & Startups",
    title: "The Co-Founder Equity Dispute",
    scenario:
      "Two years into your startup, one co-founder (35% equity) has become significantly less engaged, working part-time while pursuing another venture, while the other two co-founders have carried the company through a difficult period. The disengaged co-founder still expects full equity and voting rights. There's no vesting schedule or founder agreement addressing this scenario. You need to propose a resolution before it damages the company's ability to raise its next round.",
    keyIssues: [
      "Fairness of continued full equity for reduced contribution, absent a vesting agreement",
      "Legal reality that without vesting terms, the disengaged founder may have a strong claim regardless of fairness",
      "Investor concerns about unresolved founder disputes ahead of fundraising",
      "How to negotiate a resolution that avoids costly, company-damaging conflict",
    ],
    expectedConcepts: [
      "vesting schedule",
      "founder equity",
      "cliff period",
      "buyback provision",
      "cap table",
    ],
    modelApproach:
      "A strong answer acknowledges the legal reality (no vesting means a weak negotiating position, not a moral argument) and proposes a negotiated resolution — e.g., a buyback of unvested-in-spirit equity at a fair valuation, or a reduced ongoing role with adjusted equity — framed as necessary to protect the company's fundability, not just fairness.",
    furtherReading: [
      "Founder vesting schedules and why they matter",
      "Cap table management and equity disputes",
      "Case studies in founder conflict resolution",
    ],
  },
  {
    id: "biz-startup-funding-choice",
    profession: "business",
    category: "Entrepreneurship & Startups",
    title: "Venture Capital or Bootstrap",
    scenario:
      "Your profitable but slow-growing software company (25% YoY growth, already cash-flow positive) has been offered a $5M venture capital investment at a valuation that would give investors 20% ownership and a board seat, with an expectation of 3-5x growth acceleration. Bootstrapping would preserve full control and current growth trajectory but limit your ability to compete against better-funded rivals entering your space.",
    keyIssues: [
      "Trade-off between control/ownership and growth capital/speed",
      "Whether the company's model can actually absorb capital productively to accelerate growth",
      "Competitive pressure from better-funded entrants as a forcing function",
      "Governance implications of a board seat and investor expectations",
    ],
    expectedConcepts: [
      "venture capital",
      "bootstrapping",
      "dilution",
      "growth capital",
      "board governance",
    ],
    modelApproach:
      "A strong answer doesn't treat this as VC-good/bootstrap-bad, but asks a sharper question: does the business have a credible plan to deploy $5M into meaningfully faster growth, or would it just accelerate spending without proportional results? It weighs competitive pressure honestly rather than assuming steady 25% growth is safe.",
    furtherReading: [
      "Bootstrapping vs. venture-backed growth strategies",
      "Understanding dilution and cap table impact of funding rounds",
      "Case studies: profitable bootstrapped companies vs. VC-backed competitors",
    ],
  },
  {
    id: "biz-startup-burn-rate",
    profession: "business",
    category: "Entrepreneurship & Startups",
    title: "Scaling Too Fast",
    scenario:
      "Your startup raised a large Series B eighteen months ago and has since tripled headcount to capture market share quickly. Monthly burn rate has grown to $1.8M against $600K in monthly revenue, giving you roughly seven months of runway at current trajectory, with the next funding round not guaranteed in the current market environment. The board wants an urgent plan.",
    keyIssues: [
      "How much runway extension is needed to reach a fundable milestone or profitability",
      "Whether cuts should be broad or targeted at specific underperforming growth bets",
      "Signal a sudden slowdown sends to the market versus the risk of running out of cash",
      "Realistic assessment of fundraising conditions rather than assuming a round will close",
    ],
    expectedConcepts: [
      "burn rate",
      "runway",
      "unit economics",
      "growth at all costs",
      "path to profitability",
    ],
    modelApproach:
      "A strong answer doesn't assume the next round will materialize and plans as if it might not — proposing targeted cuts toward a credible path to extended runway or profitability, prioritizing unit-economically sound growth over headcount for its own sake, and being explicit about the milestone the cuts need to buy time to reach.",
    furtherReading: [
      "Startup burn rate and runway management",
      "Unit economics and path-to-profitability frameworks",
      "Case studies in startup down-round and cash crisis navigation",
    ],
  },
  {
    id: "biz-startup-capital-competitor",
    profession: "business",
    category: "Entrepreneurship & Startups",
    title: "A Better-Funded Competitor Arrives",
    scenario:
      "You've spent three years building the leading product in a niche market with modest but growing revenue. A well-funded competitor, backed by $50M in venture capital, just launched a nearly identical product and is offering it free for the first year to grab market share fast. You can't match their spending. Your team and early customers are asking what the plan is.",
    keyIssues: [
      "Whether to compete directly on the same terms (impossible given the funding gap) or reposition",
      "What defensible advantages exist that money alone can't easily replicate (customer relationships, niche expertise, switching costs)",
      "Realistic timeline for the well-funded competitor's aggressive strategy to be sustainable for them",
      "How to communicate confidence to customers and team without denying the real threat",
    ],
    expectedConcepts: [
      "competitive moat",
      "switching costs",
      "customer relationships",
      "sustainable competitive advantage",
      "niche strategy",
    ],
    modelApproach:
      "A strong answer doesn't try to out-fund a better-funded rival, and instead identifies genuine, hard-to-replicate advantages (deep customer relationships, switching costs, specialized expertise) to double down on, while being realistic with the team about the real threat rather than false bravado.",
    furtherReading: [
      "Competitive moats and defensibility frameworks",
      "Switching costs and customer lock-in strategy",
      "Case studies: incumbents surviving well-funded new entrants",
    ],
  },

  // ============================================================ LAW: Contract Law
  {
    id: "law-contract-force-majeure",
    profession: "law",
    category: "Contract Law",
    title: "The Force Majeure Claim",
    scenario:
      "Your client, a manufacturing supplier, failed to deliver goods on time due to a regional power grid failure lasting nine days. The buyer is suing for breach of contract and lost profits, arguing the contract's force majeure clause only covers 'acts of God' and doesn't clearly list infrastructure failures. Your client argues the power failure was unforeseeable and outside their control. You need to present your legal argument for why the force majeure clause should apply.",
    keyIssues: [
      "Whether the force majeure clause's language is broad enough to cover infrastructure failure, or genuinely limited to natural disasters",
      "Foreseeability and the supplier's reasonable efforts to mitigate the delay",
      "Causation: whether the power failure directly and solely caused the breach",
      "Contra proferentem (ambiguity construed against the drafter) if the clause's wording is genuinely unclear",
    ],
    expectedConcepts: [
      "force majeure",
      "foreseeability",
      "causation",
      "mitigation of damages",
      "contra proferentem",
    ],
    modelApproach:
      "A strong answer engages directly with the contract's actual language rather than general fairness arguments, addresses foreseeability and mitigation efforts as necessary elements of the defense, and, if the clause is ambiguous, argues for interpretation against the drafter — grounding the argument in contract interpretation doctrine, not sympathy.",
    furtherReading: [
      "Force majeure clause drafting and interpretation",
      "UCC provisions on impracticability and excuse",
      "Contra proferentem doctrine in contract interpretation",
    ],
  },
  {
    id: "law-contract-noncompete",
    profession: "law",
    category: "Contract Law",
    title: "Enforcing a Non-Compete",
    scenario:
      "Your client, a mid-sized consulting firm, wants to enforce a non-compete clause against a former senior partner who left to join a direct competitor, taking with them relationships with several key clients. The clause bars competitive work within the same industry for two years, nationwide, with no compensation during that period. The former partner argues the clause is overbroad and unenforceable. You must advise your client on the strength of their position.",
    keyIssues: [
      "Reasonableness of scope (geographic reach, duration, activity restricted) under applicable state law",
      "Legitimate business interest the clause is meant to protect versus a bare restraint on competition",
      "Jurisdictional variation — some states heavily disfavor or ban non-competes entirely",
      "Whether narrower enforcement (e.g., limited to specific clients, shorter duration) is more defensible than the clause as written",
    ],
    expectedConcepts: [
      "restrictive covenant",
      "legitimate business interest",
      "reasonableness standard",
      "blue-penciling",
      "choice of law",
    ],
    modelApproach:
      "A strong answer doesn't assume the clause is automatically enforceable just because it was signed — it walks through the reasonableness test (scope, duration, geography) against the legitimate business interest, flags jurisdictional risk given how much this varies by state, and considers whether the client should seek narrower, more defensible relief.",
    furtherReading: [
      "State-by-state non-compete enforceability (e.g., California's near-total ban vs. other states)",
      "Legitimate business interest doctrine in restrictive covenants",
      "Blue-penciling and judicial modification of overbroad clauses",
    ],
  },

  // ============================================================ LAW: Corporate & Compliance
  {
    id: "law-corp-insider-trading",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Suspected Insider Trading",
    scenario:
      "Your company's compliance team flagged unusual trading activity by a mid-level finance employee shortly before a major earnings announcement, resulting in significant personal gains. The employee claims the trades were based on public information and coincidence. As in-house counsel, you must advise the board on how to proceed with an internal investigation and whether to self-report to the SEC.",
    keyIssues: [
      "Threshold of suspicion needed to justify a formal internal investigation",
      "Preserving evidence and communications before they can be altered or destroyed",
      "Weighing voluntary self-disclosure to regulators against potential leniency versus certainty of triggering scrutiny",
      "Protecting the company's own liability exposure regardless of the individual employee's culpability",
    ],
    expectedConcepts: [
      "insider trading",
      "material nonpublic information",
      "SEC self-reporting",
      "internal investigation",
      "safe harbor",
    ],
    modelApproach:
      "A strong answer moves quickly to preserve evidence and launch a genuinely independent investigation before assessing self-reporting, and weighs the SEC's cooperation credit framework (self-reporting often results in reduced penalties) against the certainty of drawing regulatory attention — advising based on regulatory incentive structures, not just intuition.",
    furtherReading: [
      "SEC Rule 10b-5 and insider trading enforcement",
      "SEC self-reporting and cooperation credit framework",
      "Corporate internal investigation best practices",
    ],
  },
  {
    id: "law-corp-fcpa",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Bribery Discovered Abroad",
    scenario:
      "During a routine audit, your multinational company discovered that a regional sales manager in a foreign subsidiary made payments to a local government official to expedite a contract approval, potentially violating the Foreign Corrupt Practices Act. The payments were relatively small but pattern-suggestive of a broader practice. Leadership wants your legal guidance on next steps.",
    keyIssues: [
      "Scope of the investigation needed to determine if this is isolated or systemic",
      "FCPA liability exposure for the parent company regardless of where the conduct occurred",
      "Voluntary disclosure considerations under DOJ/SEC FCPA enforcement policy",
      "Remediation steps needed regardless of the disclosure decision",
    ],
    expectedConcepts: [
      "Foreign Corrupt Practices Act (FCPA)",
      "books and records provision",
      "voluntary self-disclosure",
      "remediation",
      "third-party due diligence",
    ],
    modelApproach:
      "A strong answer immediately flags the parent company's exposure under the FCPA regardless of the payment's small size, recommends a scoped independent investigation to assess whether this is isolated, and walks through the DOJ's voluntary disclosure incentives (the FCPA Corporate Enforcement Policy) as a genuine factor in the recommendation, not an afterthought.",
    furtherReading: [
      "Foreign Corrupt Practices Act (FCPA) enforcement guide",
      "DOJ FCPA Corporate Enforcement Policy",
      "Anti-bribery compliance program design",
    ],
  },

  // ============================================================ LAW: Civil Litigation
  {
    id: "law-civil-product-liability",
    profession: "law",
    category: "Civil Litigation",
    title: "The Product Liability Suit",
    scenario:
      "Your client, a power-tool manufacturer, is being sued after a user was injured while operating a saw with the safety guard allegedly removed by the user prior to the accident. The plaintiff argues the guard was too easy to remove, constituting a design defect. Your client's engineering team maintains the guard meets all industry safety standards. You're preparing the defense strategy.",
    keyIssues: [
      "Whether meeting industry standards is sufficient defense against a design-defect claim, or just one factor",
      "Comparative/contributory negligence given the user's own modification of the safety guard",
      "Risk-utility test for design defect: could a safer, still-functional alternative design have existed",
      "Documentary evidence needed regarding design decisions and safety testing",
    ],
    expectedConcepts: [
      "design defect",
      "risk-utility test",
      "comparative negligence",
      "industry standard defense",
      "product liability",
    ],
    modelApproach:
      "A strong answer doesn't rest the defense solely on industry-standard compliance (which courts often treat as evidence, not a complete defense), and instead builds a risk-utility argument alongside a comparative negligence argument based on the user's own removal of the safety guard — using both doctrinal threads together.",
    furtherReading: [
      "Risk-utility test in products liability law",
      "Restatement (Third) of Torts: Products Liability",
      "Comparative negligence and its interaction with strict liability claims",
    ],
  },
  {
    id: "law-civil-wrongful-termination",
    profession: "law",
    category: "Civil Litigation",
    title: "The Wrongful Termination Claim",
    scenario:
      "Your corporate client terminated an employee for documented performance issues one week after she filed an internal complaint about a manager's conduct. She's now suing for wrongful termination and retaliation, arguing the timing is suspicious even though the performance issues predate the complaint. You must assess the strength of the company's defense.",
    keyIssues: [
      "Temporal proximity between the complaint and termination as circumstantial evidence of retaliation",
      "Quality and consistency of the documented performance record predating the complaint",
      "Whether similarly-situated employees without complaints received the same treatment for similar issues",
      "Pretext analysis: whether the stated reason is likely genuine or a cover for retaliation",
    ],
    expectedConcepts: [
      "retaliation claim",
      "pretext",
      "temporal proximity",
      "McDonnell Douglas burden-shifting framework",
      "at-will employment",
    ],
    modelApproach:
      "A strong answer takes the temporal proximity concern seriously rather than dismissing it, and focuses the defense on the McDonnell Douglas framework — showing a legitimate, well-documented, consistently-applied reason for termination and comparator evidence — rather than relying on 'she was at-will' alone.",
    furtherReading: [
      "McDonnell Douglas burden-shifting framework in employment discrimination/retaliation claims",
      "Temporal proximity as evidence of retaliatory intent",
      "Documentation best practices in performance-based terminations",
    ],
  },

  // ============================================================ LAW: Criminal Law
  {
    id: "law-criminal-fraud-defense",
    profession: "law",
    category: "Criminal Law",
    title: "Defending a White-Collar Fraud Case",
    scenario:
      "Your client, a former CFO, is charged with securities fraud for allegedly approving misleading financial disclosures. He maintains he relied in good faith on figures provided by subordinates and outside auditors, and had no intent to deceive. The prosecution has emails showing he raised internal concerns about the numbers but signed off anyway under pressure from the CEO. You're building the defense strategy.",
    keyIssues: [
      "Scienter (intent to defraud) as the critical element the prosecution must prove beyond reasonable doubt",
      "Good-faith reliance on subordinates and auditors as a defense, despite the concerning emails",
      "How to contextualize the internal emails without appearing to concede guilt",
      "Pressure from superiors as context for the decision, though not a full legal defense",
    ],
    expectedConcepts: [
      "scienter",
      "securities fraud",
      "good-faith defense",
      "burden of proof",
      "mens rea",
    ],
    modelApproach:
      "A strong answer centers the defense on scienter — arguing the emails show due diligence and internal concern-raising, not intent to deceive — while being realistic that this evidence is genuinely double-edged and needs careful framing, not denial. It should explicitly name the prosecution's burden to prove intent beyond a reasonable doubt.",
    furtherReading: [
      "Scienter requirement in securities fraud prosecutions",
      "Good-faith reliance defense in white-collar cases",
      "Case law on executive liability for subordinate-prepared disclosures",
    ],
  },
  {
    id: "law-criminal-evidence-admissibility",
    profession: "law",
    category: "Criminal Law",
    title: "Challenging Evidence Admissibility",
    scenario:
      "Police searched your client's home and found evidence central to the prosecution's case, based on a warrant that was later found to contain an address error (correct street, wrong apartment number in a multi-unit building). The prosecution argues the error was a harmless clerical mistake since officers still searched the right physical location the informant described. You're arguing to suppress the evidence.",
    keyIssues: [
      "Particularity requirement of the Fourth Amendment for warrants",
      "Whether the good-faith exception to the exclusionary rule applies despite the warrant defect",
      "Practical effect of the error: did it actually risk searching the wrong premises",
      "Precedent on clerical/technical warrant errors and their materiality",
    ],
    expectedConcepts: [
      "Fourth Amendment",
      "particularity requirement",
      "exclusionary rule",
      "good-faith exception",
      "suppression motion",
    ],
    modelApproach:
      "A strong answer engages directly with the good-faith exception (Leon), since that's the prosecution's likely strongest counter, and argues either that the error was significant enough to defeat good faith or that it satisfies particularity in substance despite the technical error — rather than relying on a bare particularity argument alone.",
    furtherReading: [
      "Fourth Amendment particularity requirement case law",
      "United States v. Leon and the good-faith exception",
      "Suppression motion strategy in criminal defense",
    ],
  },

  // ============================================================ LAW: Constitutional & Regulatory
  {
    id: "law-const-agency-enforcement",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Appealing a Regulatory Enforcement Action",
    scenario:
      "A federal environmental agency has issued a $2M fine against your manufacturing client for exceeding emissions thresholds, based on testing methodology your client's experts argue is scientifically outdated compared to current standards used elsewhere. You're advising on whether and how to appeal the enforcement action.",
    keyIssues: [
      "Standard of review courts apply to agency factual and methodological determinations (Chevron-style deference considerations)",
      "Strength of the scientific challenge to the testing methodology as a basis for appeal",
      "Procedural options: administrative appeal within the agency versus judicial review",
      "Cost-benefit of a prolonged appeal versus a negotiated settlement",
    ],
    expectedConcepts: [
      "administrative deference",
      "arbitrary and capricious standard",
      "administrative appeal",
      "judicial review",
      "regulatory settlement",
    ],
    modelApproach:
      "A strong answer is realistic about the high bar for overturning agency technical determinations under deference doctrines, while identifying whether the outdated-methodology argument is strong enough to meet an 'arbitrary and capricious' standard, and weighs a negotiated settlement against the cost and uncertainty of full judicial review.",
    furtherReading: [
      "Administrative deference doctrine post-Loper Bright",
      "Arbitrary and capricious standard of review",
      "Environmental enforcement appeal procedures",
    ],
  },
  {
    id: "law-const-content-moderation",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Free Speech vs. Platform Moderation",
    scenario:
      "A user is suing a social media platform (your client) for removing their political content, alleging a First Amendment violation. Your client is a private company, not a government actor. The plaintiff argues the platform has become a 'public square' functionally equivalent to state action given its market dominance. You're preparing the motion to dismiss.",
    keyIssues: [
      "State action doctrine and its limits — the First Amendment restrains government, not private actors",
      "Whether market dominance alone converts a private platform into a state actor (it generally doesn't under current law)",
      "Section 230 protections for content moderation decisions",
      "Distinguishing this from the narrow 'company town' state action exceptions",
    ],
    expectedConcepts: [
      "state action doctrine",
      "First Amendment",
      "Section 230",
      "company town doctrine",
      "motion to dismiss",
    ],
    modelApproach:
      "A strong answer leads with the state action doctrine as the dispositive issue — private platforms, regardless of size, are not bound by the First Amendment absent genuine government entanglement — and reinforces the argument with Section 230's protection for content moderation, rather than getting drawn into a debate about fairness or market power.",
    furtherReading: [
      "State action doctrine and the 'public square' argument in recent case law",
      "Section 230 of the Communications Decency Act",
      "Manhattan Community Access Corp. v. Halleck (state action limits)",
    ],
  },

  // ============================================================ POLITICS: Foreign Policy & Diplomacy
  {
    id: "pol-foreign-trade-dispute",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "Negotiating a Trade Dispute",
    scenario:
      "A key trading partner has imposed unexpected tariffs on your country's agricultural exports, citing unfair subsidy practices your government disputes. Domestic farmers are demanding retaliation; your foreign ministry warns that escalation could jeopardize a broader security cooperation agreement with the same partner currently under negotiation. You must advise on the government's response.",
    keyIssues: [
      "Balancing domestic political pressure for retaliation against broader strategic relationship costs",
      "Whether the underlying subsidy dispute has genuine merit worth contesting through trade bodies (e.g. WTO) versus bilateral negotiation",
      "Signaling resolve without triggering an escalatory spiral",
      "Linkage risk: whether tying this dispute to the security agreement helps or harms both objectives",
    ],
    expectedConcepts: [
      "trade retaliation",
      "linkage diplomacy",
      "World Trade Organization dispute resolution",
      "escalation dynamics",
      "domestic political constraints",
    ],
    modelApproach:
      "A strong answer resists purely reactive retaliation and considers a calibrated response — pursuing formal trade dispute mechanisms while keeping the security negotiation on a separate track — showing awareness that domestic political pressure and long-term strategic interest can pull in different directions and need explicit reconciliation.",
    furtherReading: [
      "WTO dispute settlement mechanisms",
      "Linkage diplomacy and its risks",
      "Game theory in trade negotiation and retaliation",
    ],
  },
  {
    id: "pol-foreign-ally-crisis",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "An Ally Acts Unilaterally",
    scenario:
      "A close allied nation has just conducted a military strike against a third country without consulting your government, despite a mutual consultation agreement. Domestic and international media are asking whether your government endorses the action. Your alliance is strategically important, but the unilateral strike risks destabilizing the region and undermining your credibility with other partners who expected consultation.",
    keyIssues: [
      "Immediate public messaging that neither endorses the action nor ruptures the alliance",
      "Private diplomatic response to the ally regarding the consultation agreement breach",
      "Reassurance needed for other partners questioning the alliance's reliability",
      "Distinguishing disagreement with the process (lack of consultation) from the substance of the action",
    ],
    expectedConcepts: [
      "alliance management",
      "strategic ambiguity",
      "public vs. private diplomacy",
      "credibility and reassurance",
      "consultation mechanisms",
    ],
    modelApproach:
      "A strong answer separates public messaging (careful, non-committal on substance, but clear that consultation matters) from private diplomatic channels (a direct, firmer message to the ally about the breach), and addresses third-party partner reassurance as a distinct, necessary task rather than an afterthought.",
    furtherReading: [
      "Alliance management theory in international relations",
      "Public vs. private diplomatic signaling",
      "Case studies in allied unilateral action and alliance strain",
    ],
  },

  // ============================================================ POLITICS: Domestic Policy
  {
    id: "pol-domestic-healthcare-tradeoff",
    profession: "politics",
    category: "Domestic Policy",
    title: "The Healthcare Reform Trade-off",
    scenario:
      "Your proposed healthcare reform would expand coverage to 2 million currently uninsured citizens, but independent budget analysis shows it requires either raising taxes on middle-income earners or running a significant deficit increase — both politically costly. Your coalition partners are divided on which trade-off is more acceptable. You must present a path forward to leadership.",
    keyIssues: [
      "Genuine trade-off between coverage expansion goals and fiscal/political cost",
      "Which constituencies bear the cost of each option and the political consequences",
      "Whether phased implementation could reduce the immediate fiscal or political shock",
      "Coalition management given genuine internal disagreement, not just messaging",
    ],
    expectedConcepts: [
      "fiscal impact analysis",
      "coalition politics",
      "policy phasing",
      "distributional impact",
      "political capital",
    ],
    modelApproach:
      "A strong answer doesn't pretend the trade-off doesn't exist, and instead proposes a specific way to manage it — such as phased implementation to spread fiscal impact, or a hybrid funding mechanism that distributes cost more broadly — while being explicit about the coalition management needed to hold the reform together politically.",
    furtherReading: [
      "Comparative healthcare financing models",
      "Policy phasing and implementation strategy",
      "Coalition government policy negotiation dynamics",
    ],
  },
  {
    id: "pol-domestic-tax-reform",
    profession: "politics",
    category: "Domestic Policy",
    title: "Tax Reform: Growth vs. Equity",
    scenario:
      "Your finance ministry has proposed a corporate tax cut projected to boost investment and GDP growth by economists across the political spectrum, but independent analysis also shows it would disproportionately benefit already-wealthy shareholders in the short term, worsening measured inequality before any broader benefits materialize. Opposition parties and some of your own base are attacking the plan as regressive. You must defend or revise the policy.",
    keyIssues: [
      "Genuine economic trade-off between growth incentives and near-term distributional fairness",
      "Time horizon mismatch: growth benefits materialize later than the distributional cost is felt",
      "Whether complementary measures (e.g., targeted low-income tax relief) could address the equity critique without abandoning the growth policy",
      "Political credibility of the growth argument given historical examples where promised benefits didn't fully materialize",
    ],
    expectedConcepts: [
      "supply-side economics",
      "distributional analysis",
      "trickle-down critique",
      "tax incidence",
      "policy sequencing",
    ],
    modelApproach:
      "A strong answer doesn't dismiss the equity critique as merely political noise — it engages with the genuine time-horizon mismatch between growth benefits and distributional cost, and proposes pairing the corporate tax cut with a complementary measure that addresses near-term equity concerns directly, rather than relying solely on the growth argument.",
    furtherReading: [
      "Tax incidence analysis and distributional effects of corporate tax policy",
      "Empirical research on corporate tax cuts and investment/growth outcomes",
      "Policy sequencing and complementary measure design",
    ],
  },

  // ============================================================ POLITICS: Crisis Response
  {
    id: "pol-crisis-disaster-response",
    profession: "politics",
    category: "Crisis Response",
    title: "Coordinating Disaster Response",
    scenario:
      "A major flood has devastated a region of your country, displacing 100,000 people. Local officials are requesting immediate federal resources, but initial reports are inconsistent about the scale of damage and specific needs. Political opponents are already criticizing the pace of the response, even as agencies are still assessing the situation. You're advising on the next public statement and resource deployment decision.",
    keyIssues: [
      "Balancing rapid visible action against the risk of misallocating resources based on incomplete information",
      "Public communication that shows urgency without overpromising on timelines that can't be met",
      "Coordination challenges between federal, state, and local authorities in the response",
      "Managing political criticism without letting it distort operational priorities",
    ],
    expectedConcepts: [
      "emergency management coordination",
      "crisis communication",
      "federalism in disaster response",
      "resource allocation under uncertainty",
      "public trust",
    ],
    modelApproach:
      "A strong answer prioritizes deploying resources for immediate life-safety needs even under incomplete information, rather than waiting for perfect data, while being honest in public communication about what is and isn't yet known — and treats political criticism as a communications challenge to manage, not a reason to change operational priorities reactively.",
    furtherReading: [
      "Emergency management coordination frameworks (e.g. FEMA's National Response Framework)",
      "Crisis communication best practices in government",
      "Federalism and intergovernmental coordination in disaster response",
    ],
  },
  {
    id: "pol-crisis-public-health",
    profession: "politics",
    category: "Crisis Response",
    title: "Public Health Emergency Messaging",
    scenario:
      "Health authorities have identified an emerging infectious disease outbreak with still-uncertain transmission and severity data. Early, cautious guidance risks being seen as an overreaction if the threat turns out to be mild; delayed action risks a severe outbreak if the threat is serious. Public trust in health authorities is already fragile from past inconsistent messaging. You're advising on the government's initial public communication.",
    keyIssues: [
      "Communicating genuine scientific uncertainty without either alarmism or false reassurance",
      "Precautionary action under uncertainty versus waiting for more complete data",
      "Rebuilding fragile public trust through consistent, transparent messaging",
      "Preparing the public for guidance that may change as more is learned",
    ],
    expectedConcepts: [
      "risk communication",
      "precautionary principle",
      "public health messaging",
      "institutional trust",
      "uncertainty communication",
    ],
    modelApproach:
      "A strong answer recommends transparent communication of what is and isn't known, framing precautionary measures as reasonable given uncertainty rather than certainty of severity, and explicitly prepares the public for guidance to evolve — addressing the trust deficit by being honest about uncertainty rather than projecting false confidence in either direction.",
    furtherReading: [
      "Risk communication frameworks in public health (CDC/WHO guidance)",
      "Precautionary principle in public health decision-making",
      "Research on public trust and health messaging consistency",
    ],
  },

  // ============================================================ POLITICS: Campaign Strategy
  {
    id: "pol-campaign-scandal-control",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Mid-Campaign Damage Control",
    scenario:
      "Six weeks before an election, a decade-old but genuine controversy involving your candidate has resurfaced with new documentation, confirming what was previously only alleged. Polling shows the race tightening. Your campaign must decide how to respond before the story dominates the final weeks.",
    keyIssues: [
      "Whether to acknowledge and address the issue directly versus minimizing engagement",
      "Distinguishing genuine accountability from a defensive posture that prolongs the story",
      "Timing: addressing it immediately and fully versus a drawn-out, incremental response",
      "Refocusing the remaining campaign narrative on substantive issues without appearing to dodge",
    ],
    expectedConcepts: [
      "crisis communication",
      "news cycle management",
      "accountability messaging",
      "narrative control",
      "damage control",
    ],
    modelApproach:
      "A strong answer generally favors a full, direct acknowledgment early — since incremental revelations prolong news cycles far more than a single complete statement — paired with genuine accountability language, and then a deliberate pivot back to substantive campaign issues rather than continuing to relitigate the story.",
    furtherReading: [
      "Crisis communication and the 'rip the band-aid off' strategy in political scandals",
      "News cycle dynamics and story lifecycle management",
      "Case studies in political scandal response effectiveness",
    ],
  },
  {
    id: "pol-campaign-debate-attack",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Preparing for a Debate Attack",
    scenario:
      "Your opponent is expected to attack your signature policy proposal in the upcoming debate, citing a genuine implementation flaw identified by independent analysts that your team has not yet fully resolved. You're preparing the candidate's response strategy.",
    keyIssues: [
      "Whether to concede the flaw exists while defending the policy's overall merit, or minimize it",
      "Credibility cost of denying a genuine, independently-verified flaw",
      "Redirecting to comparative strengths versus the opponent's own policy record",
      "Preparing a substantive fix or refinement to offer, not just a defensive talking point",
    ],
    expectedConcepts: [
      "debate strategy",
      "policy credibility",
      "comparative messaging",
      "issue ownership",
      "concede-and-pivot technique",
    ],
    modelApproach:
      "A strong answer recommends acknowledging the legitimate flaw rather than denying well-documented facts (which risks a bigger credibility hit if pressed), pairs the acknowledgment with a concrete refinement or fix, and pivots to a comparative contrast with the opponent's own record — rather than pure defense.",
    furtherReading: [
      "Debate strategy and concede-and-pivot messaging techniques",
      "Policy credibility and voter trust research",
      "Comparative political messaging strategy",
    ],
  },

  // ============================================================ POLITICS: Legislative Negotiation
  {
    id: "pol-legislative-bipartisan-holdouts",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Winning Over Holdout Votes",
    scenario:
      "Your major infrastructure bill has broad support but is three votes short of passage, with a small group of moderate legislators from the opposing party withholding support over a specific provision they consider fiscally risky. Your own party's progressive wing opposes removing or weakening that provision. You're advising leadership on how to secure passage.",
    keyIssues: [
      "Whether the holdout provision can be modified without losing progressive support entirely",
      "What the holdouts would genuinely accept versus their stated public position",
      "Sequencing: whether a separate vehicle for the contested provision could unlock the broader bill",
      "Cost of failure to the broader legislative agenda if the bill doesn't pass",
    ],
    expectedConcepts: [
      "legislative coalition-building",
      "logrolling",
      "vote counting",
      "bill severability",
      "compromise amendment",
    ],
    modelApproach:
      "A strong answer looks for a structural compromise — such as splitting the contested provision into separate legislation with its own timeline, or a modified version with safeguards — that could satisfy both the holdouts' fiscal concerns and the progressive wing's priorities, rather than assuming the two positions are fundamentally irreconcilable.",
    furtherReading: [
      "Legislative coalition-building and vote-counting strategy",
      "Bill severability and legislative vehicle strategy",
      "Case studies in bipartisan negotiation on major legislation",
    ],
  },
  {
    id: "pol-legislative-shutdown-threat",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Averting a Government Shutdown",
    scenario:
      "Budget negotiations have stalled with days remaining before funding expires, risking a government shutdown. The opposing party is demanding a policy rider unrelated to spending levels as a condition for their support; your side considers the rider a non-starter on principle. Both sides face political blame if a shutdown occurs. You're advising on negotiation strategy for the final days.",
    keyIssues: [
      "Whether a short-term continuing resolution could buy time without conceding on the rider",
      "Public messaging strategy to assign responsibility for the standoff without appearing solely obstructionist",
      "Identifying what each side actually needs versus their public negotiating position",
      "Cost-benefit of holding firm on principle against the real-world impact of a shutdown",
    ],
    expectedConcepts: [
      "continuing resolution",
      "brinkmanship",
      "blame attribution strategy",
      "negotiating leverage",
      "political cost-benefit analysis",
    ],
    modelApproach:
      "A strong answer considers a short-term continuing resolution as a genuine tool to de-escalate the immediate deadline while negotiations continue, rather than treating the choice as binary (concede or shut down), and is realistic about both the substantive stakes and the political messaging battle happening in parallel.",
    furtherReading: [
      "Continuing resolutions and government funding mechanisms",
      "Brinkmanship and negotiation theory in legislative standoffs",
      "Historical case studies of government shutdown negotiations",
    ],
  },
];

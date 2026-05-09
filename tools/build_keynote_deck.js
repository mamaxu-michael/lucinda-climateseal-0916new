ObjC.import("Foundation");

function readText(path) {
  const nsPath = $(path).stringByExpandingTildeInPath;
  const data = $.NSData.dataWithContentsOfFile(nsPath);
  if (!data) {
    throw new Error("Unable to read file: " + path);
  }
  const str = $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding);
  return ObjC.unwrap(str);
}

function writeText(path, text) {
  const nsText = $(text);
  nsText.writeToFileAtomicallyEncodingError($(path).stringByExpandingTildeInPath, true, $.NSUTF8StringEncoding, null);
}

function cleanBody(body) {
  return body
    .replace(/\*\*/g, "")
    .replace(/^###\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const system = Application.currentApplication();
system.includeStandardAdditions = true;

const keynote = Application("Keynote");
keynote.includeStandardAdditions = true;
keynote.activate();
delay(2);

const outPath = "/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_english_deck.pptx";
const logPath = "/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_english_deck.log";
const deck = {
  slides: [
    {
      title: "AI-Native Trust Infrastructure for the Green Economy",
      body: "Helping companies, products, and financial assets prove they are green, pass market and regulatory acceptance, and become the Visa layer for the green economy.\n\nClimate Seal (Beijing) Technology Co., Ltd.\nCredibility Drives Better Climate"
    },
    {
      title: "The market does not lack assets. It lacks trusted acceptance.",
      body: "What blocks circulation is not asset scarcity, but the difficulty of getting green claims accepted:\n\n- Proof is hard\n- Acceptance is hard\n- Around 80% of assets remain locked\n\nKey market signals:\n\n- Green economy: $10T+\n- Green assets: EUR7.4T\n- Carbon assets / RWA inventory: 1 billion tons\n- Supply chain companies: 1.4 million\n- Product batches: 2 billion\n- Annual compliance acceptance cost: ~$60B\n- Only 11% pass Taxonomy acceptance\n- Only 22% pass methodology-based acceptance\n- Releasing just 10% more could unlock ~$1T in circulation"
    },
    {
      title: "Root cause: proof is expensive, validation is expensive, and the two sides use different standards",
      body: "The issue is not that the entity is not green. The issue is that making green claims acceptable to markets and regulators is costly, fragmented, and inconsistent.\n\n- Submitters: enterprises, asset developers, lenders\n- Acceptors: brands, customs, asset buyers, banks\n- Proof side focuses on methodology compliance and evidence-chain compliance\n- Acceptance side focuses on eligibility rules, risk assessment, and transaction status\n- Green proof: 3-12 months, $5k-$300k, mostly consultant-led\n- Green acceptance: from 6 weeks, $5k-$400k, mostly risk experts working manually\n\nOutcome:\n\n- Recalculation and re-audit\n- Failed transactions or financing\n- 80% of assets stay blocked from circulation"
    },
    {
      title: "Different carbon scenarios are structurally one unified decision chain",
      body: "Across carbon compliance, carbon assets/RWA, and green finance, the same structure repeats:\n\nSubmitter proof -> Acceptor decision -> Compliance / capital / transaction flow\n\nUse cases:\n\n- Carbon compliance: 1.4M enterprises / 2B product batches\n- Carbon assets, RWA, and allowances: 1B tons of inventory / 10k+ participating enterprises\n- Green finance and RWA: EUR0.8T in loans and bonds\n\nDecision makers:\n\n- Brands, auditors, customs decide procurement, taxes, and access\n- Buyers and exchanges decide trading success and pricing\n- Banks, SPOs, and investors decide loan size and interest rate\n\nMarket size:\n\n- $40B external compliance consulting market\n- $30B external asset development market\n- $20B external assessment market"
    },
    {
      title: "Solution: one engine, two standardized AI products for proof and acceptance",
      body: "Passport = reusable dynamic digital proof\nGate = automated acceptance engine\n\nCore workflow:\n\n- Data collection\n- Methodology guidance\n- Modeling and calculation\n- Risk assessment\n- Evidence chain and audit\n- Acceptance rules\n- Due diligence and review\n- Transaction status and covenant triggers\n\nClimate Seal turns fragmented workflows into standardized acceptance:\n\n- Green proof compiler\n- AI acceptance execution engine\n- Multi-methodology engine\n- Self-auditing engine\n\nFrom:\n\n- 3-12 months\n- $5k-$300k\n- inconsistent standards\n\nTo:\n\n- hours to weeks\n- $0.2k-$30k\n- one shared acceptance standard"
    },
    {
      title: "Core technology: a self-auditing automated AI engine",
      body: "Climate Seal puts consulting and audit expertise into an AI pipeline so agents can independently complete compliance and acceptance work within auditable boundaries.\n\nTraditional workflow:\n\n- Manual methodology navigation\n- Manual data handling\n- Manual audit and evidence recording\n- Semi-black-box systems\n- Low precision\n- Slow, error-prone, and hard to trace\n\nClimate Seal workflow:\n\n- AI methodology navigation\n- AI data processing\n- AI audit and evaluation\n- Trusted data chain\n- Audit chain\n- White-box, high-precision, fully traceable execution\n\nResults:\n\n- Front-loads high-precision acceptance models\n- Bridges standard mismatches\n- Improves with usage over time\n- Supports compliance audit, asset evaluation, and financial risk control\n\nCurrent base:\n\n- 60+ methodology models\n- 50+ automated workflows\n- 20k+ factor validations\n- 20k+ benchmark models"
    },
    {
      title: "Business progress: the AI engine has already been commercialized",
      body: "Validated:\n\n- Commercial use in compliance scenarios\n- High-complexity LCA carbon footprint projects\n- France BV 5% materiality confidence standard achieved\n\nLaunching next:\n\n- Carbon asset + RWA modules\n- Asset/compliance passport\n- Asset verification / gate\n\nProgress:\n\n- 85% of modules completed\n- Go-live in 2 months\n- 10 customers across 5 countries\n- 10+ asset development consulting firms as channels\n- 10+ major buyers identified\n- 8 million tons of carbon assets already locked in"
    },
    {
      title: "Why now: green outcomes are starting to affect tax, orders, trading, and financing",
      body: "2026 is the turning point: carbon requirements move from voluntary reporting to mandatory, revenue-impacting enforcement.\n\nRegulatory timeline:\n\n- EU Taxonomy\n- CSRD\n- EU GBS\n- CBAM charging\n- CORSIA enforcement\n- DPP expansion\n- ETS2 / battery DPP\n- China ETS expansion\n- Paris Agreement Article 6\n\nThree windows are opening:\n\n- Compliance: the window is already open\n- Carbon assets: the window is opening now\n- Green finance: 6-12 month window\n\nBusiness impact:\n\n- Exporters face tax, customs, and supply-chain order pressure\n- Carbon assets must improve quality to circulate\n- Green finance is entering an eligibility era\n- Verifiability will directly affect loan pricing and credit limits"
    },
    {
      title: "Business strategy: win the compliance entry point, then expand into asset and finance agents",
      body: "Starting point:\n\n- Build precision on the submitter side\n- Embed standards into acceptance workflows\n- Expand into three scenarios with one engine\n\nPhase 1: Carbon compliance entry\n- 0-12 months\n- Channel: 100 carbon consulting firms\n- 20x higher delivery efficiency with AI\n- 1 brand = N supply-chain compliance opportunities\n\nPhase 2: Carbon asset upgrade and growth\n- 6-18 months\n- Channel: 30 asset developers\n- 200M tons of backlogged assets waiting to be sold\n- 1 developer = N asset projects\n\nPhase 3: Green finance, including RWA\n- 12-36 months\n- Channel: 30 loan consultants / banks\n- $30B in green loans waiting for certification\n- 1 bank = N borrowers\n\nEnd state:\n\nWhen passport usage is high enough and gate integration is deep enough, both sides rely on the same rails and Climate Seal becomes trust infrastructure."
    },
    {
      title: "Transaction amplifier: asset upgrade + RWA / ITC",
      body: "Climate Seal upgrades assets to clear trading and policy payout thresholds, then monetizes through lifecycle events across RWA and ITC pathways.\n\nScope:\n\n- RWA / ABS ready, without doing licensed issuance\n- If the on-chain path is delayed, the off-chain route can still grow at one-tenth the cost\n\nPain points:\n\n- 1B tons of backlogged low-quality carbon assets\n- Hard to trade, hard to finance\n- Hard to meet green policy thresholds\n- Hard to capture policy value\n\nClimate Seal engine:\n\n- Scans asset quality and identifies gaps\n- Fills gaps and maps them to standards and regulations\n- Produces signable, decision-ready packages\n\nResults:\n\n- Higher-quality carbon assets\n- ~10% price uplift\n- ~50% higher sell-through\n- Policy value realization through tax credits, subsidies, and rate support\n\nRevenue logic:\n\nEvery event in a 3-10 year lifecycle can trigger a green proof and verification fee:\n\n- Qualification\n- Issuance\n- Trading\n- Refinancing\n- Covenant triggers"
    },
    {
      title: "Business model: start with passport and gate fees, then expand into event verification and revenue sharing",
      body: "Revenue follows decision points and deepens as Climate Seal becomes more embedded.\n\n1. Passport fee\n- Output: proof package / passport\n- Trigger: create or update passport\n- Payer: submitter\n- Pricing: base $200+ usage-based\n\n2. Gate fee\n- Output: verification / risk score\n- Trigger: listing / eligibility / transaction\n- Payer: acceptor\n- Pricing: base $30k+ usage-based\n\n3. Transaction verification fee\n- Output: event verification record\n- Trigger: resale / financing / status update\n- Payer: triggering party\n- Pricing: base $500+ usage-based\n\n4. Outcome-based revenue share\n- Output: pricing, rate, or credit improvement\n- Trigger: premium uplift / spread improvement\n- Payer: beneficiary\n- Pricing: 15% of asset upside or 2-5 bps\n\nProjected revenue:\n\n- 2026: $3M\n- 2027: $10M\n- 2028: $30M\n- 2030: $100M+"
    },
    {
      title: "Defensibility: not just lower cost and higher speed, but embedding trust into workflow",
      body: "Competitors optimize calculation. Climate Seal rebuilds acceptance.\n\nThree layers of defensibility:\n\n1. Engineering and technical moat\n- Self-auditing automation AI engine\n- Audit-grade AI passport and gate\n- Only system positioned to deliver audit-grade outputs across multiple scenarios\n\n2. Cost and precision moat\n- Asset restructuring AI engine\n- High precision improves with scale\n- Trust cost drops by 90%+ with scale\n\n3. Protocol-like workflow moat\n- Hard to replace once embedded in acceptance workflows\n- More passports -> more gates -> more acceptance volume -> lower trust cost\n\nKnowledge base:\n\n- 60+ carbon asset process models\n- 50+ methodology automation workflows\n- 12k+ validation factor mappings\n- 20k+ benchmark product models"
    },
    {
      title: "Ecosystem position: provide trust capability to ecosystem players",
      body: "The trust layer is still missing across the ecosystem.\nEveryone is running business processes; no one is building the road.\n\nClimate Seal provides low-cost, high-efficiency trust capability across:\n\n- Carbon compliance\n- Carbon assets\n- Green finance\n\nPositioning:\n\n- Infrastructure covering compliance, assets, and finance\n- Serving submitter-side workflows, acceptor-side workflows, and event-based calls\n- Enabling ecosystem players rather than replacing them\n\nComparable ecosystem categories shown in the slide:\n\n- Software\n- Consulting\n- Verification\n- Rating\n- SPO\n- Trading"
    },
    {
      title: "Team and fundraising: experts across carbon, product, AI, and commercialization",
      body: "Climate Seal combines the capabilities required to build green trust infrastructure:\n\n- Founder with commercialization leadership from carbon and enterprise businesses\n- Product co-founder with top enterprise product background\n- AI co-founder with deep AI and data engineering experience\n- Market co-founder with sustainability and GTM experience\n- Verification, carbon, and finance domain experts\n\nFundraising:\n\n- Round: Seed\n- Amount: $2M\n- Runway: 12 months\n- Goal: 100 consulting firms + 5 asset projects\n\nUse of funds:\n\n- R&D: 50%\n- Channels: 25%\n- Marketing: 15%\n- Operations: 10%"
    },
    {
      title: "Team: top talent across carbon and AI",
      body: "The team combines:\n\n- Carbon commercialization leadership\n- Product leadership from top carbon-tech operators\n- AI scientists and engineers\n- Sustainability and carbon experts\n- Carbon asset and green finance expertise\n- International validation and verification expertise\n\nRepresentative strengths shown in the slide:\n\n- Former commercialization VP at a carbon company\n- Former China GM at multinational firms\n- Former senior product leaders in carbon software\n- AI scientists with CMU, Tsinghua, and other strong technical backgrounds\n- Sustainability leaders from major global companies\n- Verification experts with top audit credibility"
    },
    {
      title: "Team summary",
      body: "This slide continues the team overview and reinforces the same core message:\n\n- strong commercialization\n- strong product and AI capability\n- strong market execution\n- strong domain expertise in carbon, sustainability, and finance\n- seed fundraising plan and disciplined budget allocation"
    },
    {
      title: "End state: the Visa of the green economy",
      body: "Starting from compliance and asset RWA, Climate Seal aims to enter buyer, bank, and regulatory workflows and serve every transaction in the green economy.\n\nVisa is a credit network.\nClimate Seal aims to build the trust network for green assets.\n\nFuture vision:\n\n- Both submitters and acceptors become agents\n- Climate Seal becomes infrastructure for autonomous green transactions\n- Agents carry verifiable passports into markets\n- Agents pass access checks automatically\n- Agents trigger financing and trading actions based on verified status\n\nCore functions:\n\n- AI passport issuance\n- AI admission verification\n- Verification, routing, and settlement for green transactions"
    },
    {
      title: "Thank You",
      body: "Climate Seal\nCredibility Drives Better Climate"
    }
  ]
};
let log = [];

const theme = keynote.themes.byName("White");
const doc = keynote.Document({ documentTheme: theme });
keynote.documents.push(doc);
delay(1);

const masterNames = doc.masterSlides.name();
log.push("Master slides: " + masterNames.join(", "));

function resolveMaster(docRef) {
  const preferred = ["Title & Bullets", "Title - Top", "Title, Bullets & Photo", "Title, Bullets and Photo"];
  const names = docRef.masterSlides.name();
  for (let i = 0; i < preferred.length; i++) {
    if (names.indexOf(preferred[i]) >= 0) {
      return docRef.masterSlides.byName(preferred[i]);
    }
  }
  return docRef.masterSlides[0];
}

const master = resolveMaster(doc);
log.push("Using master: " + master.name());

function addSlide(title, body, isFirst) {
  let slide;
  if (isFirst && doc.slides.length > 0) {
    slide = doc.slides[0];
  } else {
    slide = keynote.Slide({ baseSlide: master });
    doc.slides.push(slide);
  }

  delay(0.1);
  try {
    slide.defaultTitleItem().objectText().set(title);
  } catch (e) {
    log.push("No title item for slide: " + title);
  }

  try {
    slide.defaultBodyItem().objectText().set(cleanBody(body));
  } catch (e) {
    log.push("No body item for slide: " + title);
  }
}

for (let i = 0; i < deck.slides.length; i++) {
  const slide = deck.slides[i];
  addSlide(slide.title, slide.body, i === 0);
}

delay(1);
keynote.export(doc, {
  to: Path(outPath),
  as: "Microsoft PowerPoint"
});
delay(1);

writeText(logPath, log.join("\n"));
doc.close({ saving: "no" });

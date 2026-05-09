from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


SRC_PPTX = Path("/Users/lucindaliu/Downloads/business plan -绿色经济采信基础设施04-19.pptx")
OUT_PPTX = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_english_deck_simple.pptx")

SLIDES = [
    {
        "number": 1,
        "title": "AI-Native Trust Infrastructure for the Green Economy",
        "body": "Helping companies, products, and financial assets prove they are green, pass market and regulatory acceptance, and become the Visa layer for the green economy.\n\nClimate Seal (Beijing) Technology Co., Ltd.\nCredibility Drives Better Climate",
    },
    {
        "number": 2,
        "title": "The market does not lack assets. It lacks trusted acceptance.",
        "body": "What blocks circulation is not asset scarcity, but the difficulty of getting green claims accepted:\n\n- Proof is hard\n- Acceptance is hard\n- Around 80% of assets remain locked\n\nKey market signals:\n\n- Green economy: $10T+\n- Green assets: EUR7.4T\n- Carbon assets / RWA inventory: 1 billion tons\n- Supply chain companies: 1.4 million\n- Product batches: 2 billion\n- Annual compliance acceptance cost: ~$60B\n- Only 11% pass Taxonomy acceptance\n- Only 22% pass methodology-based acceptance\n- Releasing just 10% more could unlock ~$1T in circulation",
    },
    {
        "number": 3,
        "title": "Root cause: proof is expensive, validation is expensive, and the two sides use different standards",
        "body": "The issue is not that the entity is not green. The issue is that making green claims acceptable to markets and regulators is costly, fragmented, and inconsistent.\n\n- Submitters: enterprises, asset developers, lenders\n- Acceptors: brands, customs, asset buyers, banks\n- Proof side focuses on methodology compliance and evidence-chain compliance\n- Acceptance side focuses on eligibility rules, risk assessment, and transaction status\n- Green proof: 3-12 months, $5k-$300k, mostly consultant-led\n- Green acceptance: from 6 weeks, $5k-$400k, mostly risk experts working manually\n\nOutcome:\n\n- Recalculation and re-audit\n- Failed transactions or financing\n- 80% of assets stay blocked from circulation",
    },
    {
        "number": 4,
        "title": "Different carbon scenarios are structurally one unified decision chain",
        "body": "Across carbon compliance, carbon assets/RWA, and green finance, the same structure repeats:\n\nSubmitter proof -> Acceptor decision -> Compliance / capital / transaction flow\n\nUse cases:\n\n- Carbon compliance: 1.4M enterprises / 2B product batches\n- Carbon assets, RWA, and allowances: 1B tons of inventory / 10k+ participating enterprises\n- Green finance and RWA: EUR0.8T in loans and bonds\n\nDecision makers:\n\n- Brands, auditors, customs decide procurement, taxes, and access\n- Buyers and exchanges decide trading success and pricing\n- Banks, SPOs, and investors decide loan size and interest rate\n\nMarket size:\n\n- $40B external compliance consulting market\n- $30B external asset development market\n- $20B external assessment market",
    },
    {
        "number": 5,
        "title": "Solution: one engine, two standardized AI products for proof and acceptance",
        "body": "Passport = reusable dynamic digital proof\nGate = automated acceptance engine\n\nCore workflow:\n\n- Data collection\n- Methodology guidance\n- Modeling and calculation\n- Risk assessment\n- Evidence chain and audit\n- Acceptance rules\n- Due diligence and review\n- Transaction status and covenant triggers\n\nClimate Seal turns fragmented workflows into standardized acceptance:\n\n- Green proof compiler\n- AI acceptance execution engine\n- Multi-methodology engine\n- Self-auditing engine\n\nFrom:\n\n- 3-12 months\n- $5k-$300k\n- inconsistent standards\n\nTo:\n\n- hours to weeks\n- $0.2k-$30k\n- one shared acceptance standard",
    },
    {
        "number": 6,
        "title": "Core technology: a self-auditing automated AI engine",
        "body": "Climate Seal puts consulting and audit expertise into an AI pipeline so agents can independently complete compliance and acceptance work within auditable boundaries.\n\nTraditional workflow:\n\n- Manual methodology navigation\n- Manual data handling\n- Manual audit and evidence recording\n- Semi-black-box systems\n- Low precision\n- Slow, error-prone, and hard to trace\n\nClimate Seal workflow:\n\n- AI methodology navigation\n- AI data processing\n- AI audit and evaluation\n- Trusted data chain\n- Audit chain\n- White-box, high-precision, fully traceable execution\n\nResults:\n\n- Front-loads high-precision acceptance models\n- Bridges standard mismatches\n- Improves with usage over time\n- Supports compliance audit, asset evaluation, and financial risk control\n\nCurrent base:\n\n- 60+ methodology models\n- 50+ automated workflows\n- 20k+ factor validations\n- 20k+ benchmark models",
    },
    {
        "number": 7,
        "title": "Business progress: the AI engine has already been commercialized",
        "body": "Validated:\n\n- Commercial use in compliance scenarios\n- High-complexity LCA carbon footprint projects\n- France BV 5% materiality confidence standard achieved\n\nLaunching next:\n\n- Carbon asset + RWA modules\n- Asset/compliance passport\n- Asset verification / gate\n\nProgress:\n\n- 85% of modules completed\n- Go-live in 2 months\n- 10 customers across 5 countries\n- 10+ asset development consulting firms as channels\n- 10+ major buyers identified\n- 8 million tons of carbon assets already locked in",
    },
    {
        "number": 8,
        "title": "Why now: green outcomes are starting to affect tax, orders, trading, and financing",
        "body": "2026 is the turning point: carbon requirements move from voluntary reporting to mandatory, revenue-impacting enforcement.\n\nRegulatory timeline:\n\n- EU Taxonomy\n- CSRD\n- EU GBS\n- CBAM charging\n- CORSIA enforcement\n- DPP expansion\n- ETS2 / battery DPP\n- China ETS expansion\n- Paris Agreement Article 6\n\nThree windows are opening:\n\n- Compliance: the window is already open\n- Carbon assets: the window is opening now\n- Green finance: 6-12 month window\n\nBusiness impact:\n\n- Exporters face tax, customs, and supply-chain order pressure\n- Carbon assets must improve quality to circulate\n- Green finance is entering an eligibility era\n- Verifiability will directly affect loan pricing and credit limits",
    },
    {
        "number": 9,
        "title": "Business strategy: win the compliance entry point, then expand into asset and finance agents",
        "body": "Starting point:\n\n- Build precision on the submitter side\n- Embed standards into acceptance workflows\n- Expand into three scenarios with one engine\n\nPhase 1: Carbon compliance entry\n- 0-12 months\n- Channel: 100 carbon consulting firms\n- 20x higher delivery efficiency with AI\n- 1 brand = N supply-chain compliance opportunities\n\nPhase 2: Carbon asset upgrade and growth\n- 6-18 months\n- Channel: 30 asset developers\n- 200M tons of backlogged assets waiting to be sold\n- 1 developer = N asset projects\n\nPhase 3: Green finance, including RWA\n- 12-36 months\n- Channel: 30 loan consultants / banks\n- $30B in green loans waiting for certification\n- 1 bank = N borrowers\n\nEnd state:\n\nWhen passport usage is high enough and gate integration is deep enough, both sides rely on the same rails and Climate Seal becomes trust infrastructure.",
    },
    {
        "number": 10,
        "title": "Transaction amplifier: asset upgrade + RWA / ITC",
        "body": "Climate Seal upgrades assets to clear trading and policy payout thresholds, then monetizes through lifecycle events across RWA and ITC pathways.\n\nScope:\n\n- RWA / ABS ready, without doing licensed issuance\n- If the on-chain path is delayed, the off-chain route can still grow at one-tenth the cost\n\nPain points:\n\n- 1B tons of backlogged low-quality carbon assets\n- Hard to trade, hard to finance\n- Hard to meet green policy thresholds\n- Hard to capture policy value\n\nClimate Seal engine:\n\n- Scans asset quality and identifies gaps\n- Fills gaps and maps them to standards and regulations\n- Produces signable, decision-ready packages\n\nResults:\n\n- Higher-quality carbon assets\n- ~10% price uplift\n- ~50% higher sell-through\n- Policy value realization through tax credits, subsidies, and rate support\n\nRevenue logic:\n\nEvery event in a 3-10 year lifecycle can trigger a green proof and verification fee:\n\n- Qualification\n- Issuance\n- Trading\n- Refinancing\n- Covenant triggers",
    },
    {
        "number": 11,
        "title": "Business model: start with passport and gate fees, then expand into event verification and revenue sharing",
        "body": "Revenue follows decision points and deepens as Climate Seal becomes more embedded.\n\n1. Passport fee\n- Output: proof package / passport\n- Trigger: create or update passport\n- Payer: submitter\n- Pricing: base $200+ usage-based\n\n2. Gate fee\n- Output: verification / risk score\n- Trigger: listing / eligibility / transaction\n- Payer: acceptor\n- Pricing: base $30k+ usage-based\n\n3. Transaction verification fee\n- Output: event verification record\n- Trigger: resale / financing / status update\n- Payer: triggering party\n- Pricing: base $500+ usage-based\n\n4. Outcome-based revenue share\n- Output: pricing, rate, or credit improvement\n- Trigger: premium uplift / spread improvement\n- Payer: beneficiary\n- Pricing: 15% of asset upside or 2-5 bps\n\nProjected revenue:\n\n- 2026: $3M\n- 2027: $10M\n- 2028: $30M\n- 2030: $100M+",
    },
    {
        "number": 12,
        "title": "Defensibility: not just lower cost and higher speed, but embedding trust into workflow",
        "body": "Competitors optimize calculation. Climate Seal rebuilds acceptance.\n\nThree layers of defensibility:\n\n1. Engineering and technical moat\n- Self-auditing automation AI engine\n- Audit-grade AI passport and gate\n- Only system positioned to deliver audit-grade outputs across multiple scenarios\n\n2. Cost and precision moat\n- Asset restructuring AI engine\n- High precision improves with scale\n- Trust cost drops by 90%+ with scale\n\n3. Protocol-like workflow moat\n- Hard to replace once embedded in acceptance workflows\n- More passports -> more gates -> more acceptance volume -> lower trust cost\n\nKnowledge base:\n\n- 60+ carbon asset process models\n- 50+ methodology automation workflows\n- 12k+ validation factor mappings\n- 20k+ benchmark product models",
    },
    {
        "number": 13,
        "title": "Ecosystem position: provide trust capability to ecosystem players",
        "body": "The trust layer is still missing across the ecosystem.\nEveryone is running business processes; no one is building the road.\n\nClimate Seal provides low-cost, high-efficiency trust capability across:\n\n- Carbon compliance\n- Carbon assets\n- Green finance\n\nPositioning:\n\n- Infrastructure covering compliance, assets, and finance\n- Serving submitter-side workflows, acceptor-side workflows, and event-based calls\n- Enabling ecosystem players rather than replacing them\n\nComparable ecosystem categories shown in the slide:\n\n- Software\n- Consulting\n- Verification\n- Rating\n- SPO\n- Trading",
    },
    {
        "number": 14,
        "title": "Team and fundraising: experts across carbon, product, AI, and commercialization",
        "body": "Climate Seal combines the capabilities required to build green trust infrastructure:\n\n- Founder with commercialization leadership from carbon and enterprise businesses\n- Product co-founder with top enterprise product background\n- AI co-founder with deep AI and data engineering experience\n- Market co-founder with sustainability and GTM experience\n- Verification, carbon, and finance domain experts\n\nFundraising:\n\n- Round: Seed\n- Amount: $2M\n- Runway: 12 months\n- Goal: 100 consulting firms + 5 asset projects\n\nUse of funds:\n\n- R&D: 50%\n- Channels: 25%\n- Marketing: 15%\n- Operations: 10%",
    },
    {
        "number": 15,
        "title": "Team: top talent across carbon and AI",
        "body": "The team combines:\n\n- Carbon commercialization leadership\n- Product leadership from top carbon-tech operators\n- AI scientists and engineers\n- Sustainability and carbon experts\n- Carbon asset and green finance expertise\n- International validation and verification expertise\n\nRepresentative strengths shown in the slide:\n\n- Former commercialization VP at a carbon company\n- Former China GM at multinational firms\n- Former senior product leaders in carbon software\n- AI scientists with CMU, Tsinghua, and other strong technical backgrounds\n- Sustainability leaders from major global companies\n- Verification experts with top audit credibility",
    },
    {
        "number": 16,
        "title": "Team summary",
        "body": "This slide continues the team overview and reinforces the same core message:\n\n- strong commercialization\n- strong product and AI capability\n- strong market execution\n- strong domain expertise in carbon, sustainability, and finance\n- seed fundraising plan and disciplined budget allocation",
    },
    {
        "number": 17,
        "title": "End state: the Visa of the green economy",
        "body": "Starting from compliance and asset RWA, Climate Seal aims to enter buyer, bank, and regulatory workflows and serve every transaction in the green economy.\n\nVisa is a credit network.\nClimate Seal aims to build the trust network for green assets.\n\nFuture vision:\n\n- Both submitters and acceptors become agents\n- Climate Seal becomes infrastructure for autonomous green transactions\n- Agents carry verifiable passports into markets\n- Agents pass access checks automatically\n- Agents trigger financing and trading actions based on verified status\n\nCore functions:\n\n- AI passport issuance\n- AI admission verification\n- Verification, routing, and settlement for green transactions",
    },
    {
        "number": 18,
        "title": "Thank You",
        "body": "Climate Seal\nCredibility Drives Better Climate",
    },
]


def font_size_for_body(text: str) -> int:
    n = len(text)
    if n > 1500:
        return 1100
    if n > 1100:
        return 1200
    if n > 800:
        return 1300
    return 1400


def para_xml(text: str, *, size: int, bold: bool = False, color: str = "20322F") -> str:
    text = escape(text)
    b = ' b="1"' if bold else ""
    return (
        f'<a:p><a:r><a:rPr lang="en-US" sz="{size}"{b} dirty="0" smtClean="0">'
        f'<a:solidFill><a:srgbClr val="{color}"/></a:solidFill></a:rPr>'
        f"<a:t>{text}</a:t></a:r></a:p>"
    )


def body_to_xml(text: str, *, size: int) -> str:
    paragraphs: list[str] = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            paragraphs.append('<a:p><a:endParaRPr lang="en-US" sz="200"/></a:p>')
            continue
        if line.startswith("- "):
            line = "• " + line[2:]
        paragraphs.append(para_xml(line, size=size))
    return "".join(paragraphs)


def make_slide_xml(title: str, body: str) -> str:
    body_size = font_size_for_body(body)
    title_xml = para_xml(title, size=2600, bold=True, color="0A5C54")
    body_xml = body_to_xml(body, size=body_size)
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="2" name="Title"/>
          <p:cNvSpPr txBox="1"/>
          <p:nvPr/>
        </p:nvSpPr>
        <p:spPr>
          <a:xfrm>
            <a:off x="457200" y="274320"/>
            <a:ext cx="11277600" cy="914400"/>
          </a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/>
          <a:ln><a:noFill/></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" anchor="t"><a:spAutoFit/></a:bodyPr>
          <a:lstStyle/>
          {title_xml}
        </p:txBody>
      </p:sp>
      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="3" name="Body"/>
          <p:cNvSpPr txBox="1"/>
          <p:nvPr/>
        </p:nvSpPr>
        <p:spPr>
          <a:xfrm>
            <a:off x="457200" y="1219200"/>
            <a:ext cx="11277600" cy="5181600"/>
          </a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/>
          <a:ln><a:noFill/></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" anchor="t"><a:spAutoFit/></a:bodyPr>
          <a:lstStyle/>
          {body_xml}
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>
"""


def build() -> None:
    with zipfile.ZipFile(SRC_PPTX, "r") as zin, zipfile.ZipFile(OUT_PPTX, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", item.filename):
                match = re.search(r"slide(\d+)\.xml", item.filename)
                assert match
                slide_no = int(match.group(1))
                slide = next((s for s in SLIDES if s["number"] == slide_no), None)
                if slide is None:
                    zout.writestr(item, zin.read(item.filename))
                else:
                    zout.writestr(item, make_slide_xml(slide["title"], slide["body"]))
            else:
                zout.writestr(item, zin.read(item.filename))


if __name__ == "__main__":
    build()
    print(OUT_PPTX)

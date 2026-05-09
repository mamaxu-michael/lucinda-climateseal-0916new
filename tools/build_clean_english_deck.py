from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


TEMPLATE = Path("/Users/lucindaliu/Downloads/business plan -绿色经济采信基础设施04-19.pptx")
OUT = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_clean_deck.pptx")

W = 12_192_000
H = 6_858_000

COLORS = {
    "bg": "F7FAF4",
    "white": "FFFFFF",
    "ink": "18312E",
    "muted": "6B7772",
    "green": "7FAA54",
    "dark_green": "0E4A43",
    "teal": "197A7C",
    "teal_dark": "0E5F61",
    "purple": "9A7A9E",
    "yellow": "F7BE16",
    "line": "C9D3CD",
    "soft_green": "EAF3E1",
    "soft_teal": "E1F1EF",
    "soft_purple": "F1E8F2",
}


def emu(inches: float) -> int:
    return int(round(inches * 914400))


class Ctx:
    def __init__(self) -> None:
        self.sid = 2

    def next_id(self) -> int:
        self.sid += 1
        return self.sid


def rpr(size: int, color: str, bold: bool = False) -> str:
    b = ' b="1"' if bold else ""
    return (
        f'<a:rPr lang="en-US" sz="{size}"{b} dirty="0">'
        f'<a:solidFill><a:srgbClr val="{color}"/></a:solidFill>'
        f'<a:latin typeface="Aptos"/></a:rPr>'
    )


def paragraph(text: str, size: int, color: str, bold: bool = False, align: str = "l") -> str:
    text = escape(text)
    return (
        f'<a:p><a:pPr algn="{align}"><a:lnSpc><a:spcPct val="90000"/></a:lnSpc>'
        f'<a:spcBef><a:spcPts val="0"/></a:spcBef><a:spcAft><a:spcPts val="0"/></a:spcAft>'
        f"</a:pPr><a:r>{rpr(size, color, bold)}<a:t>{text}</a:t></a:r>"
        f'<a:endParaRPr lang="en-US" sz="{size}"/></a:p>'
    )


def paragraphs(text: str, size: int, color: str, bold: bool = False, align: str = "l") -> str:
    parts = []
    for raw in text.split("\n"):
        line = raw.strip()
        if not line:
            parts.append('<a:p><a:endParaRPr lang="en-US" sz="400"/></a:p>')
            continue
        parts.append(paragraph(line, size, color, bold, align))
    return "".join(parts)


def shape(
    ctx: Ctx,
    x: int,
    y: int,
    w: int,
    h: int,
    *,
    text: str = "",
    font: int = 1500,
    color: str = COLORS["ink"],
    bold: bool = False,
    fill: str | None = None,
    line: str | None = None,
    radius: bool = False,
    align: str = "l",
    anchor: str = "t",
    name: str = "Shape",
) -> str:
    sid = ctx.next_id()
    geom = "roundRect" if radius else "rect"
    fill_xml = f'<a:solidFill><a:srgbClr val="{fill}"/></a:solidFill>' if fill else "<a:noFill/>"
    line_xml = f'<a:ln><a:solidFill><a:srgbClr val="{line}"/></a:solidFill></a:ln>' if line else "<a:ln><a:noFill/></a:ln>"
    body = paragraphs(text, font, color, bold, align) if text else '<a:p><a:endParaRPr lang="en-US"/></a:p>'
    return f"""
      <p:sp>
        <p:nvSpPr><p:cNvPr id="{sid}" name="{name}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm>
          <a:prstGeom prst="{geom}"><a:avLst/></a:prstGeom>
          {fill_xml}{line_xml}
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" anchor="{anchor}" lIns="91440" rIns="91440" tIns="60960" bIns="60960"><a:normAutofit fontScale="85000" lnSpcReduction="15000"/></a:bodyPr>
          <a:lstStyle/>
          {body}
        </p:txBody>
      </p:sp>"""


def line(ctx: Ctx, x1: int, y1: int, x2: int, y2: int, color: str = COLORS["line"], width: int = 19050) -> str:
    sid = ctx.next_id()
    x = min(x1, x2)
    y = min(y1, y2)
    w = abs(x2 - x1)
    h = abs(y2 - y1)
    return f"""
      <p:cxnSp>
        <p:nvCxnSpPr><p:cNvPr id="{sid}" name="Line"/><p:cNvCxnSpPr/><p:nvPr/></p:nvCxnSpPr>
        <p:spPr>
          <a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm>
          <a:prstGeom prst="line"><a:avLst/></a:prstGeom>
          <a:ln w="{width}"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill></a:ln>
        </p:spPr>
      </p:cxnSp>"""


def title(ctx: Ctx, title_text: str, subtitle: str = "") -> list[str]:
    els = [
        shape(ctx, emu(0.45), emu(0.26), emu(7.4), emu(0.58), text=title_text, font=2200, color=COLORS["dark_green"], bold=True),
        shape(ctx, emu(10.25), emu(0.25), emu(2.45), emu(0.36), text="Climate Seal", font=1050, color=COLORS["teal_dark"], bold=True, align="r"),
    ]
    if subtitle:
        els.append(shape(ctx, emu(0.48), emu(0.78), emu(8.4), emu(0.38), text=subtitle, font=1050, color=COLORS["muted"]))
    return els


def footer(ctx: Ctx) -> str:
    return shape(ctx, emu(9.65), emu(7.15), emu(3.15), emu(0.22), text="Credibility Drives Better Climate", font=760, color=COLORS["muted"], align="r")


def card(ctx: Ctx, x: float, y: float, w_: float, h_: float, header: str, body: str, fill: str, accent: str) -> list[str]:
    return [
        shape(ctx, emu(x), emu(y), emu(w_), emu(h_), fill=fill, line=accent, radius=True),
        shape(ctx, emu(x + 0.15), emu(y + 0.12), emu(w_ - 0.3), emu(0.36), text=header, font=1250, color=accent, bold=True),
        shape(ctx, emu(x + 0.15), emu(y + 0.58), emu(w_ - 0.3), emu(h_ - 0.7), text=body, font=950, color=COLORS["ink"]),
    ]


def slide_xml(elements: list[str]) -> str:
    ctx_xml = "\n".join(elements)
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      {ctx_xml}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""


def build_slides() -> list[str]:
    slides: list[str] = []

    # 1
    ctx = Ctx()
    els = [
        shape(ctx, 0, 0, W, H, fill=COLORS["bg"]),
        shape(ctx, emu(0.65), emu(0.75), emu(5.4), emu(0.45), text="Climate Seal", font=1800, color=COLORS["dark_green"], bold=True),
        shape(ctx, emu(0.65), emu(1.45), emu(6.2), emu(2.2), text="AI-native trust infrastructure\nfor the green economy", font=3000, color=COLORS["ink"], bold=True),
        shape(ctx, emu(0.70), emu(3.85), emu(6.3), emu(1.0), text="Helping companies, products, and financial assets prove they are green, pass market and regulatory acceptance, and move through green markets with confidence.", font=1250, color=COLORS["muted"]),
        shape(ctx, emu(7.55), emu(1.05), emu(4.2), emu(4.8), fill=COLORS["dark_green"], radius=True),
        shape(ctx, emu(8.0), emu(1.55), emu(3.3), emu(0.65), text="The Visa layer\nfor green trust", font=2100, color=COLORS["white"], bold=True),
        shape(ctx, emu(8.05), emu(3.0), emu(3.2), emu(1.35), text="Proof -> Acceptance -> Trade -> Finance", font=1450, color=COLORS["yellow"], bold=True, align="c"),
        shape(ctx, emu(0.7), emu(6.65), emu(4.0), emu(0.35), text="Climate Seal (Beijing) Technology Co., Ltd.", font=900, color=COLORS["muted"]),
        footer(ctx),
    ]
    slides.append(slide_xml(els))

    # 2
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "The market does not lack assets. It lacks trusted acceptance.", "80% of green assets are blocked by proof and approval friction.")
    metrics = [
        ("$10T+", "green economy"),
        ("EUR7.4T", "green assets"),
        ("1B tons", "carbon asset inventory"),
        ("$60B", "annual compliance acceptance spend"),
    ]
    for i, (num, lab) in enumerate(metrics):
        els += card(ctx, 0.55 + i * 3.0, 1.55, 2.55, 1.45, num, lab, COLORS["white"], [COLORS["green"], COLORS["teal"], COLORS["purple"], COLORS["yellow"]][i])
    els += [
        shape(ctx, emu(0.75), emu(3.65), emu(4.7), emu(1.6), text="Acceptance friction = proof friction + approval friction", font=1900, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(6.05), emu(3.55), emu(2.2), emu(1.8), text="11%\nTaxonomy accepted", font=1500, color=COLORS["teal_dark"], bold=True, fill=COLORS["soft_teal"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(8.45), emu(3.55), emu(2.2), emu(1.8), text="22%\nmethodology accepted", font=1500, color=COLORS["purple"], bold=True, fill=COLORS["soft_purple"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(4.8), emu(5.9), emu(3.0), emu(0.55), text="+10% acceptance = ~$1T unlocked", font=1450, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], radius=True, align="c", anchor="ctr"),
        footer(ctx),
    ]
    slides.append(slide_xml(els))

    # 3
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Root cause: proof and acceptance are separate, manual, and expensive.", "Green value exists, but standards, evidence, and risk views do not line up.")
    els += card(ctx, 0.65, 1.55, 3.25, 4.4, "Submitters", "- Enterprises\n- Asset developers\n- Lenders\n\nNeed to generate green proof\n3-12 months\n$5k-$300k", COLORS["soft_green"], COLORS["green"])
    els += card(ctx, 4.45, 1.55, 3.25, 4.4, "Standards gap", "- Methodology compliance\n- Evidence-chain compliance\n- Procurement rules\n- Risk assessment\n\nResult: recalculation and re-audit", COLORS["white"], COLORS["dark_green"])
    els += card(ctx, 8.25, 1.55, 3.25, 4.4, "Acceptors", "- Brands / customs\n- Asset buyers\n- Banks / investors\n\nNeed to decide eligibility\n6+ weeks\n$5k-$400k", COLORS["soft_teal"], COLORS["teal"])
    els += [shape(ctx, emu(4.55), emu(6.15), emu(3.2), emu(0.45), text="Outcome: failed trades, failed financing, locked assets", font=1150, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], radius=True, align="c", anchor="ctr"), footer(ctx)]
    slides.append(slide_xml(els))

    # 4
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "One decision chain across three carbon markets", "Submitter proof -> acceptor decision -> compliance, capital, or transaction flow.")
    columns = [
        ("Carbon Compliance", "1.4M enterprises\n2B product batches", "Export manufacturing\nSupply chains", "Brands / audit / customs", "Decides orders,\ntaxes, and access", "$40B market"),
        ("Carbon Assets / RWA", "1B tons inventory\n10k+ participants", "Forestry / fuel / aviation", "Buyers / exchanges", "Decides trade success\nand pricing", "$30B market"),
        ("Green Finance / RWA", "EUR0.8T loans\nand bonds", "Brands / governments", "Banks / SPO / investors", "Decides credit size\nand interest rate", "$20B market"),
    ]
    for i, c in enumerate(columns):
        x = 0.55 + i * 4.0
        accent = [COLORS["green"], COLORS["teal"], COLORS["purple"]][i]
        fill = [COLORS["soft_green"], COLORS["soft_teal"], COLORS["soft_purple"]][i]
        els += card(ctx, x, 1.45, 3.55, 4.75, c[0], f"{c[1]}\n\nSubmitter:\n{c[2]}\n\nAcceptor:\n{c[3]}\n\n{c[4]}", fill, accent)
        els.append(shape(ctx, emu(x + 0.4), emu(6.25), emu(2.75), emu(0.48), text=c[5], font=1200, color=COLORS["white"], bold=True, fill=COLORS["yellow"], radius=True, align="c", anchor="ctr"))
    slides.append(slide_xml(els))

    # 5
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Solution: one engine, two AI products", "Passport creates reusable proof. Gate automates acceptance decisions.")
    els += card(ctx, 0.8, 1.55, 4.5, 4.6, "Green Passport", "- Data collection\n- Methodology guidance\n- Calculation and modeling\n- Evidence chain\n- Audit-ready proof pack\n\nReusable, dynamic, and updateable", COLORS["soft_green"], COLORS["green"])
    els += card(ctx, 6.9, 1.55, 4.5, 4.6, "Acceptance Gate", "- Acceptance rules\n- Risk scoring\n- Due diligence review\n- Transaction status\n- Covenant triggers\n\nAutomated, traceable decisioning", COLORS["soft_teal"], COLORS["teal"])
    els += [shape(ctx, emu(5.48), emu(3.05), emu(1.0), emu(0.65), text="+", font=2700, color=COLORS["dark_green"], bold=True, align="c", anchor="ctr"), shape(ctx, emu(4.35), emu(6.15), emu(3.5), emu(0.5), text="From months and $5k-$300k to hours/weeks and $0.2k-$30k", font=1050, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], radius=True, align="c", anchor="ctr"), footer(ctx)]
    slides.append(slide_xml(els))

    # 6
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Core technology: self-auditing AI inside auditable boundaries", "We put consulting and audit expertise into an AI pipeline.")
    els += card(ctx, 0.65, 1.6, 3.1, 4.6, "Manual today", "- Manual methodology navigation\n- Manual data processing\n- Manual evidence logging\n- Semi-black-box tools\n- Low traceability", COLORS["soft_purple"], COLORS["purple"])
    els += card(ctx, 4.05, 1.6, 4.1, 4.6, "Climate Seal engine", "- AI methodology navigation\n- AI data processing\n- AI evidence orchestration\n- Trusted data chain\n- Audit chain\n- White-box execution", COLORS["white"], COLORS["dark_green"])
    els += card(ctx, 8.45, 1.6, 3.1, 4.6, "Knowledge base", "60+ methodology models\n50+ automated workflows\n20k+ factor validations\n20k+ benchmark models\n\nGets more accurate with use", COLORS["soft_teal"], COLORS["teal"])
    slides.append(slide_xml(els))

    # 7
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Business progress: compliance validated, asset modules launching", "The AI engine has already been commercialized.")
    els += card(ctx, 0.65, 1.6, 3.45, 4.5, "Validated", "- Commercial compliance use cases\n- Complex LCA carbon footprint projects\n- BV 5% materiality confidence\n- 10 customers in 5 countries", COLORS["soft_green"], COLORS["green"])
    els += card(ctx, 4.35, 1.6, 3.45, 4.5, "Launching", "- Carbon asset + RWA scenarios\n- Asset / compliance passport\n- Asset verification gate\n- 85% complete\n- Go-live in 2 months", COLORS["soft_teal"], COLORS["teal"])
    els += card(ctx, 8.05, 1.6, 3.45, 4.5, "Locked in", "- 10+ asset development channels\n- 10+ major buyers\n- 8M tons of carbon assets\n- Onboarding starts within 2 months", COLORS["soft_purple"], COLORS["purple"])
    slides.append(slide_xml(els))

    # 8
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Why now: green status now affects revenue and cost", "2026 is the turning point from voluntary reporting to mandatory, revenue-impacting rules.")
    els += [
        shape(ctx, emu(0.75), emu(1.7), emu(10.8), emu(0.18), fill=COLORS["line"]),
        shape(ctx, emu(0.75), emu(1.45), emu(1.15), emu(0.42), text="2024", font=1050, color=COLORS["muted"], bold=True, align="c"),
        shape(ctx, emu(3.05), emu(1.45), emu(1.15), emu(0.42), text="2026", font=1050, color=COLORS["muted"], bold=True, align="c"),
        shape(ctx, emu(5.35), emu(1.45), emu(1.15), emu(0.42), text="2027", font=1050, color=COLORS["muted"], bold=True, align="c"),
        shape(ctx, emu(7.65), emu(1.45), emu(1.15), emu(0.42), text="2028", font=1050, color=COLORS["muted"], bold=True, align="c"),
        shape(ctx, emu(9.95), emu(1.45), emu(1.15), emu(0.42), text="2030", font=1050, color=COLORS["muted"], bold=True, align="c"),
    ]
    windows = [
        ("Compliance", "CBAM / DPP /\nGreen supply chains\n1.4M firms must comply now", COLORS["green"], COLORS["soft_green"]),
        ("Carbon Assets", "CORSIA / Art.6.4\nCross-border demand rises\nQuality upgrade required", COLORS["teal"], COLORS["soft_teal"]),
        ("Green Finance", "EU GBS / Taxonomy\nEligibility era begins\nVerifiability affects rates", COLORS["purple"], COLORS["soft_purple"]),
    ]
    for i, (h, b, accent, fill) in enumerate(windows):
        els += card(ctx, 0.85 + i * 3.75, 2.35, 3.25, 3.45, h, b, fill, accent)
    slides.append(slide_xml(els))

    # 9
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "GTM: win compliance entry, then expand into asset and finance agents", "One engine expands across three adjacent markets.")
    phases = [
        ("Phase 1\n0-12 months", "Carbon compliance entry\n100 carbon consultancies\n20x delivery efficiency\n1 brand -> N suppliers", COLORS["green"], COLORS["soft_green"]),
        ("Phase 2\n6-18 months", "Carbon asset upgrade\n30 asset developers\n200M tons backlog\n1 developer -> N projects", COLORS["teal"], COLORS["soft_teal"]),
        ("Phase 3\n12-36 months", "Green finance / RWA\n30 loan advisors / banks\n$30B waiting certification\n1 bank -> N borrowers", COLORS["purple"], COLORS["soft_purple"]),
    ]
    for i, p in enumerate(phases):
        els += card(ctx, 0.65 + i * 3.9, 1.65, 3.45, 4.35, p[0], p[1], p[3], p[2])
    els += [shape(ctx, emu(2.7), emu(6.25), emu(6.8), emu(0.45), text="When passport volume and gate integration are deep enough, both sides depend on the same trust rails.", font=1000, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], radius=True, align="c", anchor="ctr")]
    slides.append(slide_xml(els))

    # 10
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Transaction amplifier: asset upgrade + RWA / ITC", "Upgrade assets to clear trading and policy thresholds, then monetize lifecycle events.")
    els += card(ctx, 0.65, 1.55, 3.4, 4.7, "Pain", "1B tons of low-quality\nbacklogged carbon assets\n\nHard to trade\nHard to finance\nHard to capture policy value", COLORS["soft_purple"], COLORS["purple"])
    els += card(ctx, 4.35, 1.55, 3.4, 4.7, "Climate Seal engine", "Scan asset quality\nFind gaps\nMap to standards\nProduce signable packages\n\nRWA / ABS ready\nNo licensed issuance", COLORS["white"], COLORS["dark_green"])
    els += card(ctx, 8.05, 1.55, 3.4, 4.7, "Outcome", "Higher-quality carbon assets\n~10% price uplift\n~50% higher sell-through\n\nFees at qualification,\nissuance, trading,\nrefinancing, triggers", COLORS["soft_teal"], COLORS["teal"])
    slides.append(slide_xml(els))

    # 11
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Business model: revenue follows decision points", "Start with passport and gate fees, then expand into event verification and outcome sharing.")
    revs = [
        ("Passport fee", "Proof package\nSubmitter pays\nBase $200+ usage", COLORS["green"], COLORS["soft_green"]),
        ("Gate fee", "Verification / risk score\nAcceptor pays\nBase $30K+ usage", COLORS["teal"], COLORS["soft_teal"]),
        ("Event verification", "Transfer / financing / update\nTriggering party pays\nBase $500+ usage", COLORS["purple"], COLORS["soft_purple"]),
        ("Outcome share", "Pricing / rate / limit uplift\nBeneficiary pays\n15% upside or 2-5 bps", COLORS["yellow"], "FFF6D6"),
    ]
    for i, r in enumerate(revs):
        els += card(ctx, 0.45 + i * 2.95, 1.55, 2.55, 3.65, r[0], r[1], r[3], r[2])
    els += [
        shape(ctx, emu(1.1), emu(5.7), emu(2.0), emu(0.5), text="2026\n$3M", font=1150, color=COLORS["white"], bold=True, fill=COLORS["green"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(3.7), emu(5.7), emu(2.0), emu(0.5), text="2027\n$10M", font=1150, color=COLORS["white"], bold=True, fill=COLORS["teal"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(6.3), emu(5.7), emu(2.0), emu(0.5), text="2028\n$30M", font=1150, color=COLORS["white"], bold=True, fill=COLORS["purple"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(8.9), emu(5.7), emu(2.0), emu(0.5), text="2030\n$100M+", font=1150, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], radius=True, align="c", anchor="ctr"),
    ]
    slides.append(slide_xml(els))

    # 12
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Defensibility: embedding trust into workflow", "Competitors optimize calculation. Climate Seal rebuilds acceptance.")
    moats = [
        ("Engineering moat", "Self-auditing automation\nAudit-grade AI passport and gate\nCross-scenario outputs", COLORS["green"], COLORS["soft_green"]),
        ("Cost and precision moat", "Asset restructuring AI\nPrecision improves with scale\nTrust cost drops 90%+", COLORS["teal"], COLORS["soft_teal"]),
        ("Protocol-like moat", "Embedded in acceptance workflows\nHard to replace once adopted\nMore passports -> better gates", COLORS["purple"], COLORS["soft_purple"]),
    ]
    for i, m in enumerate(moats):
        els += card(ctx, 0.65 + i * 3.9, 1.55, 3.45, 3.45, m[0], m[1], m[3], m[2])
    els += [shape(ctx, emu(1.05), emu(5.45), emu(10.1), emu(0.75), text="Knowledge base: 60+ carbon asset process models | 50+ methodology workflows | 12k+ validation mappings | 20k+ benchmarks", font=1000, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], radius=True, align="c", anchor="ctr")]
    slides.append(slide_xml(els))

    # 13
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Ecosystem position: provide trust capability to existing players", "Everyone is running business workflows. The acceptance layer is still missing.")
    cats = [
        ("Software", "Persefoni\n$150M funding"),
        ("Consulting", "ERM / South Pole\n$140M+ revenue"),
        ("Verification", "SGS and verifiers"),
        ("Ratings", "BeZero / Clarity\n$100M+ funding"),
        ("Trading", "Xpansiv\n$710M funding"),
    ]
    for i, (h, b) in enumerate(cats):
        els += card(ctx, 0.45 + i * 2.35, 1.6, 2.05, 2.35, h, b, COLORS["white"], COLORS["muted"])
    els += [
        shape(ctx, emu(3.2), emu(4.55), emu(5.8), emu(1.0), text="Climate Seal provides the missing trust layer across compliance, assets, and finance.", font=1500, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(2.1), emu(5.95), emu(7.9), emu(0.45), text="Submitter workflows + acceptor workflows + event-based verification calls", font=1050, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], radius=True, align="c", anchor="ctr"),
    ]
    slides.append(slide_xml(els))

    # 14
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Team and fundraising", "Experts across carbon, product, AI, and commercialization.")
    team = [
        ("Commercialization", "Carbon unicorn GTM leadership\nChina GM experience\nEnterprise sales background"),
        ("Product + Carbon AI", "Gartner-ranked product manager\nWageningen University\nSenior PM at top carbon company"),
        ("AI + Data Engineering", "Beihang University\n17 years AI engineering\nYC-backed AI startup experience"),
        ("Domain Experts", "Verification experts\nSustainability experts\nCarbon asset / finance experts"),
    ]
    for i, (h, b) in enumerate(team):
        els += card(ctx, 0.55 + i * 2.9, 1.55, 2.55, 3.5, h, b, COLORS["white"], [COLORS["green"], COLORS["teal"], COLORS["purple"], COLORS["dark_green"]][i])
    els += [
        shape(ctx, emu(1.0), emu(5.65), emu(2.4), emu(0.55), text="Seed\n$2M", font=1300, color=COLORS["white"], bold=True, fill=COLORS["green"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(3.75), emu(5.65), emu(2.4), emu(0.55), text="12-month runway", font=1300, color=COLORS["white"], bold=True, fill=COLORS["teal"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(6.5), emu(5.65), emu(2.4), emu(0.55), text="100 consultancies", font=1300, color=COLORS["white"], bold=True, fill=COLORS["purple"], radius=True, align="c", anchor="ctr"),
        shape(ctx, emu(9.25), emu(5.65), emu(2.4), emu(0.55), text="5 asset projects", font=1300, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], radius=True, align="c", anchor="ctr"),
    ]
    slides.append(slide_xml(els))

    # 15
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Team: top talent across carbon and AI", "A practical mix of commercialization, product, AI, and domain expertise.")
    grid = [
        ("Commercialization", "Carbon company VP\nMultinational China GM\nTan Zuji / Gradle / Xerox"),
        ("Product", "Gartner-listed PM\nWageningen University\nSenior carbon software PM"),
        ("AI Engineering", "Beihang University\n17 years AI engineering\nDart AI, YC-backed"),
        ("Market", "UC background\n7 years marketing\nMSC / SOS NGO"),
        ("AI Scientists", "CMU PhD\nTsinghua BS\nLBS & MLDM"),
        ("Sustainability", "Global sustainability lead\nCarbon asset / finance expert\nBV 5% audit confidence"),
    ]
    for i, (h, b) in enumerate(grid):
        x = 0.55 + (i % 3) * 3.9
        y = 1.55 + (i // 3) * 2.35
        els += card(ctx, x, y, 3.45, 1.95, h, b, COLORS["white"], [COLORS["green"], COLORS["teal"], COLORS["purple"]][i % 3])
    slides.append(slide_xml(els))

    # 16
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "Advisors and domain experts", "Deep validation, carbon, sustainability, and finance expertise.")
    experts = [
        ("Verification", "NTU PhD\nBSI expert\nUniversity professor"),
        ("Carbon emissions", "China University of Geosciences PhD\nInternational carbon expert\nHead of SOE carbon institute"),
        ("Carbon finance", "Former global sustainability lead\nCarbon asset and finance expert"),
        ("Use of funds", "R&D 50%\nChannels 25%\nMarketing 15%\nOperations 10%"),
    ]
    for i, (h, b) in enumerate(experts):
        els += card(ctx, 0.8 + i * 2.85, 1.75, 2.45, 3.9, h, b, COLORS["white"], [COLORS["green"], COLORS["teal"], COLORS["purple"], COLORS["yellow"]][i])
    slides.append(slide_xml(els))

    # 17
    ctx = Ctx()
    els = [shape(ctx, 0, 0, W, H, fill=COLORS["bg"])] + title(ctx, "End state: the Visa of the green economy", "Build the trust network for every green-economy transaction.")
    els += card(ctx, 0.75, 1.55, 4.65, 4.7, "Visa credit network", "Cardholder\nIssuing bank\nRouting / verification / settlement\nAcquiring bank\nMerchant", COLORS["soft_green"], COLORS["green"])
    els += card(ctx, 6.75, 1.55, 4.65, 4.7, "Climate Seal trust network", "Enterprise data\nAI passport issuance\nVerification / routing / settlement\nAI admission verification\nBanks / buyers / regulators", COLORS["soft_teal"], COLORS["teal"])
    els += [
        shape(ctx, emu(5.68), emu(3.15), emu(0.9), emu(0.65), text="->", font=2400, color=COLORS["dark_green"], bold=True, align="c", anchor="ctr"),
        shape(ctx, emu(2.2), emu(6.35), emu(7.8), emu(0.45), text="Future: submitter and acceptor agents carry verifiable passports into markets and execute financing/trading events autonomously.", font=930, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], radius=True, align="c", anchor="ctr"),
    ]
    slides.append(slide_xml(els))

    # 18
    ctx = Ctx()
    els = [
        shape(ctx, 0, 0, W, H, fill=COLORS["dark_green"]),
        shape(ctx, emu(3.4), emu(2.1), emu(5.4), emu(0.9), text="Thank You", font=3600, color=COLORS["white"], bold=True, align="c", anchor="ctr"),
        shape(ctx, emu(3.0), emu(3.25), emu(6.2), emu(0.6), text="Credibility Drives Better Climate", font=1800, color=COLORS["yellow"], bold=True, align="c", anchor="ctr"),
        shape(ctx, emu(4.0), emu(4.65), emu(4.2), emu(0.4), text="Climate Seal (Beijing) Technology Co., Ltd.", font=1000, color=COLORS["white"], align="c", anchor="ctr"),
    ]
    slides.append(slide_xml(els))

    return slides


def build() -> None:
    slides = build_slides()
    with zipfile.ZipFile(TEMPLATE, "r") as zin, zipfile.ZipFile(OUT, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", item.filename):
                slide_no = int(re.search(r"slide(\d+)\.xml", item.filename).group(1))
                if 1 <= slide_no <= len(slides):
                    zout.writestr(item, slides[slide_no - 1])
                else:
                    zout.writestr(item, zin.read(item.filename))
            else:
                zout.writestr(item, zin.read(item.filename))
    print(OUT)


if __name__ == "__main__":
    build()

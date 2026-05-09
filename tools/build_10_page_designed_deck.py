from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


BASE = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_clean_deck.pptx")
OUT = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_10page_designed.pptx")

W = 12_192_000
H = 6_858_000

COLORS = {
    "bg": "F7FAF4",
    "white": "FFFFFF",
    "ink": "17312D",
    "muted": "63716B",
    "line": "CAD6CF",
    "green": "7FAA54",
    "dark_green": "0E4A43",
    "teal": "197A7C",
    "teal_dark": "0D6062",
    "purple": "9A7A9E",
    "yellow": "F7BE16",
    "cream": "FFF6D6",
    "soft_green": "EAF3E1",
    "soft_teal": "E1F1EF",
    "soft_purple": "F1E8F2",
    "soft_gray": "EEF3EF",
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
        f'<a:latin typeface="Aptos Display"/></a:rPr>'
    )


def paragraph(text: str, size: int, color: str, bold: bool = False, align: str = "l") -> str:
    return (
        f'<a:p><a:pPr algn="{align}"><a:lnSpc><a:spcPct val="90000"/></a:lnSpc>'
        f'<a:spcBef><a:spcPts val="0"/></a:spcBef><a:spcAft><a:spcPts val="0"/></a:spcAft>'
        f"</a:pPr><a:r>{rpr(size, color, bold)}<a:t>{escape(text)}</a:t></a:r>"
        f'<a:endParaRPr lang="en-US" sz="{size}"/></a:p>'
    )


def paragraphs(text: str, size: int, color: str, bold: bool = False, align: str = "l") -> str:
    out = []
    for raw in text.split("\n"):
        line = raw.strip()
        if not line:
            out.append('<a:p><a:endParaRPr lang="en-US" sz="400"/></a:p>')
        else:
            out.append(paragraph(line, size, color, bold, align))
    return "".join(out)


def shape(
    ctx: Ctx,
    x: int,
    y: int,
    w: int,
    h: int,
    *,
    text: str = "",
    font: int = 1100,
    color: str = COLORS["ink"],
    bold: bool = False,
    fill: str | None = None,
    line: str | None = None,
    geom: str = "rect",
    align: str = "l",
    anchor: str = "t",
    inset: int = 76200,
    name: str = "Shape",
) -> str:
    sid = ctx.next_id()
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
          <a:bodyPr wrap="square" anchor="{anchor}" lIns="{inset}" rIns="{inset}" tIns="{inset}" bIns="{inset}"><a:normAutofit fontScale="85000" lnSpcReduction="12000"/></a:bodyPr>
          <a:lstStyle/>
          {body}
        </p:txBody>
      </p:sp>"""


def line(ctx: Ctx, x1: float, y1: float, x2: float, y2: float, color: str = COLORS["line"], width: int = 19050) -> str:
    sid = ctx.next_id()
    x = emu(min(x1, x2))
    y = emu(min(y1, y2))
    w = emu(abs(x2 - x1))
    h = emu(abs(y2 - y1))
    return f"""
      <p:cxnSp>
        <p:nvCxnSpPr><p:cNvPr id="{sid}" name="Line"/><p:cNvCxnSpPr/><p:nvPr/></p:nvCxnSpPr>
        <p:spPr>
          <a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm>
          <a:prstGeom prst="line"><a:avLst/></a:prstGeom>
          <a:ln w="{width}"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill></a:ln>
        </p:spPr>
      </p:cxnSp>"""


def bg(ctx: Ctx, dark: bool = False) -> list[str]:
    base = COLORS["dark_green"] if dark else COLORS["bg"]
    return [
        shape(ctx, 0, 0, W, H, fill=base),
        shape(ctx, emu(9.15), emu(-0.45), emu(4.1), emu(4.1), fill=COLORS["soft_teal"] if not dark else COLORS["teal"], geom="ellipse"),
        shape(ctx, emu(-0.75), emu(5.55), emu(3.3), emu(3.3), fill=COLORS["soft_green"] if not dark else COLORS["green"], geom="ellipse"),
    ]


def title(ctx: Ctx, heading: str, sub: str = "") -> list[str]:
    els = [
        shape(ctx, emu(0.55), emu(0.25), emu(8.4), emu(0.55), text=heading, font=2050, color=COLORS["dark_green"], bold=True, inset=0),
        shape(ctx, emu(10.25), emu(0.29), emu(1.75), emu(0.32), text="Climate Seal", font=850, color=COLORS["teal_dark"], bold=True, align="r", inset=0),
    ]
    if sub:
        els.append(shape(ctx, emu(0.58), emu(0.78), emu(8.5), emu(0.35), text=sub, font=900, color=COLORS["muted"], inset=0))
    return els


def footer(ctx: Ctx, page: int) -> str:
    return shape(ctx, emu(10.75), emu(7.06), emu(1.0), emu(0.22), text=f"{page:02d} / 10", font=650, color=COLORS["muted"], align="r", inset=0)


def pill(ctx: Ctx, x: float, y: float, w: float, text: str, fill: str, color: str = COLORS["white"]) -> str:
    return shape(ctx, emu(x), emu(y), emu(w), emu(0.38), text=text, font=850, color=color, bold=True, fill=fill, geom="roundRect", align="c", anchor="ctr", inset=45720)


def card(ctx: Ctx, x: float, y: float, w: float, h: float, head: str, body: str, fill: str, accent: str) -> list[str]:
    return [
        shape(ctx, emu(x), emu(y), emu(w), emu(h), fill=fill, line=accent, geom="roundRect"),
        shape(ctx, emu(x + 0.16), emu(y + 0.16), emu(w - 0.32), emu(0.36), text=head, font=1080, color=accent, bold=True, inset=0),
        shape(ctx, emu(x + 0.16), emu(y + 0.63), emu(w - 0.32), emu(h - 0.82), text=body, font=820, color=COLORS["ink"], inset=0),
    ]


def metric(ctx: Ctx, x: float, y: float, num: str, label: str, accent: str, w: float = 2.45) -> list[str]:
    return [
        shape(ctx, emu(x), emu(y), emu(w), emu(1.12), fill=COLORS["white"], line=accent, geom="roundRect"),
        shape(ctx, emu(x + 0.12), emu(y + 0.18), emu(w - 0.24), emu(0.38), text=num, font=1380, color=accent, bold=True, align="c", inset=0),
        shape(ctx, emu(x + 0.12), emu(y + 0.64), emu(w - 0.24), emu(0.28), text=label, font=720, color=COLORS["muted"], align="c", inset=0),
    ]


def slide_xml(elements: list[str]) -> str:
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      {"".join(elements)}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""


def build_slides() -> list[str]:
    slides: list[str] = []

    # 1. Cover
    ctx = Ctx()
    els = bg(ctx, dark=True)
    els += [
        shape(ctx, emu(0.75), emu(0.62), emu(2.7), emu(0.35), text="Climate Seal", font=1200, color=COLORS["yellow"], bold=True, inset=0),
        shape(ctx, emu(0.75), emu(1.25), emu(6.6), emu(1.65), text="Trust infrastructure\nfor the green economy", font=2950, color=COLORS["white"], bold=True, inset=0),
        shape(ctx, emu(0.8), emu(3.15), emu(5.8), emu(0.75), text="AI-native proof, acceptance, and transaction rails for carbon compliance, carbon assets, and green finance.", font=1180, color=COLORS["soft_green"], inset=0),
        shape(ctx, emu(7.6), emu(1.2), emu(3.55), emu(3.95), fill=COLORS["bg"], geom="roundRect"),
        pill(ctx, 8.08, 1.73, 2.6, "PROOF", COLORS["green"]),
        pill(ctx, 8.08, 2.64, 2.6, "ACCEPTANCE", COLORS["teal"]),
        pill(ctx, 8.08, 3.55, 2.6, "TRADE + FINANCE", COLORS["purple"]),
        line(ctx, 9.38, 2.10, 9.38, 2.64, COLORS["yellow"], 28575),
        line(ctx, 9.38, 3.02, 9.38, 3.55, COLORS["yellow"], 28575),
        shape(ctx, emu(0.75), emu(6.25), emu(4.8), emu(0.33), text="10-slide investor deck | English concise version", font=800, color=COLORS["soft_green"], inset=0),
    ]
    slides.append(slide_xml(els))

    # 2. Market
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "A huge green market is blocked by acceptance friction", "The issue is no longer whether assets exist. It is whether buyers, banks, and regulators can trust them.")
    for i, m in enumerate([
        ("$10T+", "green economy", COLORS["green"]),
        ("EUR7.4T", "green assets", COLORS["teal"]),
        ("1B tons", "carbon inventory", COLORS["purple"]),
        ("$60B", "acceptance spend", COLORS["yellow"]),
    ]):
        els += metric(ctx, 0.65 + i * 2.8, 1.45, m[0], m[1], m[2])
    els += [
        shape(ctx, emu(0.85), emu(3.2), emu(4.3), emu(2.2), text="80%\nof green assets fail to become accepted value", font=1750, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(6.0), emu(3.05), emu(2.15), emu(1.05), text="11%\nTaxonomy accepted", font=1100, color=COLORS["teal_dark"], bold=True, fill=COLORS["soft_teal"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(8.45), emu(3.05), emu(2.15), emu(1.05), text="22%\nMethodology accepted", font=1100, color=COLORS["purple"], bold=True, fill=COLORS["soft_purple"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(6.32), emu(4.65), emu(4.0), emu(0.65), text="+10% acceptance can unlock ~$1T of value", font=1250, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 2),
    ]
    slides.append(slide_xml(els))

    # 3. Pain
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "The broken loop: submitters prove; acceptors decide; neither side shares rails", "Every transaction restarts evidence collection, methodology interpretation, and risk review.")
    els += card(ctx, 0.65, 1.55, 3.0, 4.35, "Submitters", "Manufacturers\nAsset developers\nBorrowers\n\nNeed proof packages\n3-12 months\n$5k-$300k", COLORS["soft_green"], COLORS["green"])
    els += card(ctx, 8.55, 1.55, 3.0, 4.35, "Acceptors", "Brands\nCustoms / auditors\nBanks / investors\nExchanges\n\nNeed decisions\n6+ weeks\n$5k-$400k", COLORS["soft_purple"], COLORS["purple"])
    els += [
        shape(ctx, emu(4.22), emu(1.75), emu(3.7), emu(0.68), text="No shared acceptance layer", font=1280, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(4.45), emu(2.85), emu(3.25), emu(2.0), text="Evidence is fragmented\nRules are interpreted manually\nRisk views are not reusable", font=1050, color=COLORS["ink"], fill=COLORS["white"], line=COLORS["line"], geom="roundRect", align="c", anchor="ctr"),
        line(ctx, 3.65, 3.25, 4.45, 3.25, COLORS["teal"], 28575),
        line(ctx, 7.70, 3.25, 8.55, 3.25, COLORS["teal"], 28575),
        shape(ctx, emu(4.0), emu(5.65), emu(4.2), emu(0.48), text="Result: failed trades, delayed financing, locked green value", font=980, color=COLORS["white"], bold=True, fill=COLORS["teal_dark"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 3),
    ]
    slides.append(slide_xml(els))

    # 4. Product
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Climate Seal: one trust engine, two products", "Passport makes proof reusable. Gate makes acceptance decisions faster, traceable, and repeatable.")
    els += card(ctx, 0.75, 1.55, 4.55, 4.6, "Green Passport", "AI-assisted data collection\nMethodology selection\nCarbon / asset modeling\nEvidence-chain packaging\nAudit-ready proof pack\n\nOutput: reusable green identity", COLORS["soft_green"], COLORS["green"])
    els += card(ctx, 6.9, 1.55, 4.55, 4.6, "Acceptance Gate", "Acceptance rule engine\nRisk scoring\nDue diligence review\nTransaction status\nCovenant / event triggers\n\nOutput: accepted decision", COLORS["soft_teal"], COLORS["teal"])
    els += [
        shape(ctx, emu(5.58), emu(3.05), emu(0.9), emu(0.7), text="+", font=2600, color=COLORS["dark_green"], bold=True, align="c", anchor="ctr", inset=0),
        shape(ctx, emu(3.4), emu(6.32), emu(5.4), emu(0.42), text="From consulting-heavy proof to software-mediated trust rails", font=930, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 4),
    ]
    slides.append(slide_xml(els))

    # 5. Workflow
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "How the engine works", "A self-auditing AI pipeline converts messy data into decision-grade green proof.")
    steps = [
        ("01", "Ingest", "ERP, energy, bills,\nasset documents", COLORS["green"]),
        ("02", "Normalize", "Clean data,\nfactors, boundaries", COLORS["teal"]),
        ("03", "Apply Rules", "Methodologies,\ntaxonomies, buyer rules", COLORS["purple"]),
        ("04", "Package", "Evidence chain,\naudit trail, proof pack", COLORS["green"]),
        ("05", "Decide", "Score, accept,\nprice, finance", COLORS["teal"]),
    ]
    for i, (n, h, b, c) in enumerate(steps):
        x = 0.55 + i * 2.35
        els += [
            shape(ctx, emu(x), emu(1.8), emu(1.75), emu(1.75), text=n, font=1850, color=COLORS["white"], bold=True, fill=c, geom="ellipse", align="c", anchor="ctr", inset=0),
            shape(ctx, emu(x - 0.05), emu(3.85), emu(1.85), emu(1.15), text=f"{h}\n{b}", font=760, color=COLORS["ink"], fill=COLORS["white"], line=c, geom="roundRect", align="c", anchor="ctr"),
        ]
        if i < 4:
            els.append(line(ctx, x + 1.75, 2.68, x + 2.35, 2.68, COLORS["yellow"], 28575))
    els += [
        shape(ctx, emu(0.95), emu(5.75), emu(10.25), emu(0.52), text="Knowledge base: 60+ models | 50+ workflows | 20k+ factor validations | 20k+ benchmarks", font=930, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 5),
    ]
    slides.append(slide_xml(els))

    # 6. Why now
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Why now: green status is becoming a revenue and capital gate", "Regulation and market procurement are turning environmental proof into a transaction condition.")
    els.append(line(ctx, 0.95, 2.0, 11.1, 2.0, COLORS["line"], 28575))
    for x, year, text, c in [
        (0.85, "2024", "CBAM transition\nDPP / product data", COLORS["green"]),
        (3.05, "2026", "CBAM payments\nSupplier pressure", COLORS["teal"]),
        (5.25, "2027", "CORSIA demand\nArt.6.4 ramp", COLORS["purple"]),
        (7.45, "2028", "EU GBS / taxonomy\nFinance eligibility", COLORS["green"]),
        (9.65, "2030", "Green assets priced\nby proof quality", COLORS["teal"]),
    ]:
        els += [
            shape(ctx, emu(x), emu(1.65), emu(1.05), emu(0.52), text=year, font=1000, color=COLORS["white"], bold=True, fill=c, geom="roundRect", align="c", anchor="ctr"),
            shape(ctx, emu(x - 0.2), emu(2.75), emu(1.85), emu(1.35), text=text, font=730, color=COLORS["ink"], fill=COLORS["white"], line=c, geom="roundRect", align="c", anchor="ctr"),
        ]
    els += [
        shape(ctx, emu(1.2), emu(5.35), emu(9.75), emu(0.75), text="The winning infrastructure is not another calculator. It is the layer that turns proof into accepted market action.", font=1180, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 6),
    ]
    slides.append(slide_xml(els))

    # 7. Traction
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Progress: compliance validated; asset modules ready to launch", "The engine is already commercialized and expanding into higher-value transaction use cases.")
    for i, m in enumerate([
        ("10", "customers", COLORS["green"]),
        ("5", "countries", COLORS["teal"]),
        ("85%", "asset module complete", COLORS["purple"]),
        ("8M tons", "carbon assets in pipeline", COLORS["yellow"]),
    ]):
        els += metric(ctx, 0.75 + i * 2.75, 1.45, m[0], m[1], m[2], 2.35)
    els += card(ctx, 0.9, 3.15, 3.15, 2.35, "Validated now", "Complex LCA projects\nBV 5% materiality confidence\nCommercial compliance use cases", COLORS["soft_green"], COLORS["green"])
    els += card(ctx, 4.55, 3.15, 3.15, 2.35, "Launching next", "Asset / compliance passport\nAsset verification gate\nGo-live in ~2 months", COLORS["soft_teal"], COLORS["teal"])
    els += card(ctx, 8.2, 3.15, 3.15, 2.35, "Pipeline locked", "10+ development channels\n10+ major buyers\nOnboarding starts soon", COLORS["soft_purple"], COLORS["purple"])
    els += [footer(ctx, 7)]
    slides.append(slide_xml(els))

    # 8. GTM and business model
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "GTM and revenue: enter through compliance, expand into transactions", "One engine creates multiple paid decision points as it spreads across market workflows.")
    for i, p in enumerate([
        ("Phase 1", "Compliance entry\n100 consultancies\n1 brand -> N suppliers", COLORS["green"], COLORS["soft_green"]),
        ("Phase 2", "Carbon asset upgrade\n30 asset developers\n200M tons backlog", COLORS["teal"], COLORS["soft_teal"]),
        ("Phase 3", "Green finance / RWA\n30 advisors and banks\n$30B waiting certification", COLORS["purple"], COLORS["soft_purple"]),
    ]):
        els += card(ctx, 0.65 + i * 3.9, 1.35, 3.45, 2.55, p[0], p[1], p[3], p[2])
    for i, r in enumerate([
        ("Passport fee", "$200+ / proof"),
        ("Gate fee", "$30k+ / gate"),
        ("Event verification", "$500+ / trigger"),
        ("Outcome share", "15% upside or 2-5 bps"),
    ]):
        els += [
            shape(ctx, emu(0.75 + i * 2.75), emu(4.55), emu(2.35), emu(1.1), text=f"{r[0]}\n{r[1]}", font=820, color=COLORS["ink"], bold=True, fill=COLORS["white"], line=[COLORS["green"], COLORS["teal"], COLORS["purple"], COLORS["yellow"]][i], geom="roundRect", align="c", anchor="ctr")
        ]
    els += [
        shape(ctx, emu(3.15), emu(6.15), emu(5.9), emu(0.48), text="Target revenue: $3M in 2026 -> $100M+ by 2030", font=1050, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 8),
    ]
    slides.append(slide_xml(els))

    # 9. Moat
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Moat: a protocol-like trust layer, not a point solution", "The more both sides use the rail, the cheaper, faster, and more trusted each decision becomes.")
    els += [
        shape(ctx, emu(4.65), emu(1.6), emu(2.9), emu(2.9), text="Trust\nFlywheel", font=1650, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="ellipse", align="c", anchor="ctr", inset=0),
        shape(ctx, emu(1.0), emu(1.55), emu(2.55), emu(1.25), text="More passports", font=1050, color=COLORS["white"], bold=True, fill=COLORS["green"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(8.65), emu(1.55), emu(2.55), emu(1.25), text="Better gates", font=1050, color=COLORS["white"], bold=True, fill=COLORS["teal"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(1.0), emu(4.35), emu(2.55), emu(1.25), text="Lower trust cost", font=1050, color=COLORS["white"], bold=True, fill=COLORS["purple"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(8.65), emu(4.35), emu(2.55), emu(1.25), text="More transactions", font=1050, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], geom="roundRect", align="c", anchor="ctr"),
        line(ctx, 3.55, 2.15, 4.65, 2.85, COLORS["line"], 28575),
        line(ctx, 7.55, 2.85, 8.65, 2.15, COLORS["line"], 28575),
        line(ctx, 3.55, 4.9, 4.65, 4.1, COLORS["line"], 28575),
        line(ctx, 7.55, 4.1, 8.65, 4.9, COLORS["line"], 28575),
        shape(ctx, emu(3.25), emu(5.95), emu(5.7), emu(0.48), text="Defensible through workflow embedding, data memory, rule models, and network adoption", font=890, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 9),
    ]
    slides.append(slide_xml(els))

    # 10. Team / raise / vision
    ctx = Ctx()
    els = bg(ctx, dark=True)
    els += [
        shape(ctx, emu(0.65), emu(0.55), emu(6.6), emu(0.75), text="Team, raise, and end state", font=2150, color=COLORS["white"], bold=True, inset=0),
        shape(ctx, emu(0.7), emu(1.28), emu(6.6), emu(0.42), text="Commercialization + carbon product + AI engineering + domain experts", font=900, color=COLORS["soft_green"], inset=0),
    ]
    for i, t in enumerate([
        ("GTM", "Carbon unicorn leadership\nChina GM experience", COLORS["green"]),
        ("Product", "Top carbon PM\nWageningen background", COLORS["teal"]),
        ("AI", "17 years engineering\nYC-backed AI startup", COLORS["purple"]),
        ("Experts", "Verification, carbon,\nasset finance advisors", COLORS["yellow"]),
    ]):
        els += card(ctx, 0.75 + i * 2.85, 2.0, 2.45, 1.8, t[0], t[1], COLORS["bg"], t[2])
    els += [
        shape(ctx, emu(0.9), emu(4.45), emu(2.55), emu(0.7), text="Seed raise\n$2M", font=1300, color=COLORS["white"], bold=True, fill=COLORS["green"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(3.75), emu(4.45), emu(2.55), emu(0.7), text="Use of funds\nR&D 50%", font=1300, color=COLORS["white"], bold=True, fill=COLORS["teal"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(6.6), emu(4.45), emu(4.25), emu(0.7), text="End state: the Visa of the green economy", font=1300, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, emu(2.65), emu(6.05), emu(6.9), emu(0.42), text="Credibility Drives Better Climate", font=1250, color=COLORS["yellow"], bold=True, align="c", inset=0),
    ]
    slides.append(slide_xml(els))

    return slides


def trim_presentation_xml(xml: str, keep: int) -> str:
    def repl(match: re.Match[str]) -> str:
        entries = re.findall(r"<p:sldId\b[^>]*/>", match.group(1))
        return "<p:sldIdLst>" + "".join(entries[:keep]) + "</p:sldIdLst>"

    return re.sub(r"<p:sldIdLst>(.*?)</p:sldIdLst>", repl, xml, count=1, flags=re.S)


def trim_presentation_rels(xml: str, keep: int) -> str:
    return re.sub(
        r'<Relationship[^>]+Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide"[^>]+Target="slides/slide(\d+)\.xml"[^>]*/>',
        lambda m: m.group(0) if int(m.group(1)) <= keep else "",
        xml,
    )


def trim_content_types(xml: str, keep: int) -> str:
    return re.sub(
        r'<Override PartName="/ppt/slides/slide(\d+)\.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide\+xml"/>',
        lambda m: m.group(0) if int(m.group(1)) <= keep else "",
        xml,
    )


def build() -> None:
    slides = build_slides()
    keep = len(slides)
    with zipfile.ZipFile(BASE, "r") as zin, zipfile.ZipFile(OUT, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            name = item.filename
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", name):
                slide_no = int(re.search(r"slide(\d+)\.xml", name).group(1))
                if slide_no <= keep:
                    zout.writestr(item, slides[slide_no - 1])
                continue
            if re.fullmatch(r"ppt/slides/_rels/slide\d+\.xml\.rels", name):
                slide_no = int(re.search(r"slide(\d+)\.xml\.rels", name).group(1))
                if slide_no <= keep:
                    zout.writestr(item, zin.read(name))
                continue
            if name == "ppt/presentation.xml":
                zout.writestr(item, trim_presentation_xml(zin.read(name).decode("utf-8"), keep))
                continue
            if name == "ppt/_rels/presentation.xml.rels":
                zout.writestr(item, trim_presentation_rels(zin.read(name).decode("utf-8"), keep))
                continue
            if name == "[Content_Types].xml":
                zout.writestr(item, trim_content_types(zin.read(name).decode("utf-8"), keep))
                continue
            zout.writestr(item, zin.read(name))
    print(OUT)


if __name__ == "__main__":
    build()

from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


BASE = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_clean_deck.pptx")
OUT = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_10page_investor_visual.pptx")

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
    "red": "C25A4B",
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
    parts = []
    for raw in text.split("\n"):
        line = raw.strip()
        if not line:
            parts.append('<a:p><a:endParaRPr lang="en-US" sz="400"/></a:p>')
        else:
            parts.append(paragraph(line, size, color, bold, align))
    return "".join(parts)


def shape(
    ctx: Ctx,
    x: float,
    y: float,
    w: float,
    h: float,
    *,
    text: str = "",
    font: int = 1000,
    color: str = COLORS["ink"],
    bold: bool = False,
    fill: str | None = None,
    line: str | None = None,
    geom: str = "rect",
    align: str = "l",
    anchor: str = "t",
    inset: int = 60960,
    rot: int = 0,
    name: str = "Shape",
) -> str:
    sid = ctx.next_id()
    fill_xml = f'<a:solidFill><a:srgbClr val="{fill}"/></a:solidFill>' if fill else "<a:noFill/>"
    line_xml = f'<a:ln><a:solidFill><a:srgbClr val="{line}"/></a:solidFill></a:ln>' if line else "<a:ln><a:noFill/></a:ln>"
    body = paragraphs(text, font, color, bold, align) if text else '<a:p><a:endParaRPr lang="en-US"/></a:p>'
    rot_xml = f' rot="{rot}"' if rot else ""
    return f"""
      <p:sp>
        <p:nvSpPr><p:cNvPr id="{sid}" name="{name}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm{rot_xml}><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>
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
    x = min(x1, x2)
    y = min(y1, y2)
    w = abs(x2 - x1)
    h = abs(y2 - y1)
    return f"""
      <p:cxnSp>
        <p:nvCxnSpPr><p:cNvPr id="{sid}" name="Line"/><p:cNvCxnSpPr/><p:nvPr/></p:nvCxnSpPr>
        <p:spPr>
          <a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>
          <a:prstGeom prst="line"><a:avLst/></a:prstGeom>
          <a:ln w="{width}"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill></a:ln>
        </p:spPr>
      </p:cxnSp>"""


def bg(ctx: Ctx, dark: bool = False) -> list[str]:
    base = COLORS["dark_green"] if dark else COLORS["bg"]
    return [
        shape(ctx, 0, 0, 13.333, 7.5, fill=base),
        shape(ctx, 9.25, -0.55, 4.0, 4.0, fill=COLORS["teal"] if dark else COLORS["soft_teal"], geom="ellipse"),
        shape(ctx, -0.65, 5.55, 3.0, 3.0, fill=COLORS["green"] if dark else COLORS["soft_green"], geom="ellipse"),
    ]


def title(ctx: Ctx, heading: str, sub: str = "") -> list[str]:
    els = [
        shape(ctx, 0.58, 0.28, 8.7, 0.55, text=heading, font=2000, color=COLORS["dark_green"], bold=True, inset=0),
        shape(ctx, 10.25, 0.31, 1.72, 0.30, text="Climate Seal", font=820, color=COLORS["teal_dark"], bold=True, align="r", inset=0),
    ]
    if sub:
        els.append(shape(ctx, 0.60, 0.82, 8.7, 0.32, text=sub, font=820, color=COLORS["muted"], inset=0))
    return els


def footer(ctx: Ctx, n: int) -> str:
    return shape(ctx, 10.82, 7.08, 0.95, 0.18, text=f"{n:02d}/10", font=610, color=COLORS["muted"], align="r", inset=0)


def label(ctx: Ctx, x: float, y: float, w: float, text: str, fill: str, color: str = COLORS["white"]) -> str:
    return shape(ctx, x, y, w, 0.36, text=text, font=760, color=color, bold=True, fill=fill, geom="roundRect", align="c", anchor="ctr", inset=30480)


def icon_factory(ctx: Ctx, x: float, y: float, c: str) -> list[str]:
    return [
        shape(ctx, x, y + 0.68, 1.05, 0.52, fill=c, geom="rect"),
        shape(ctx, x + 0.10, y + 0.34, 0.16, 0.36, fill=c, geom="rect"),
        shape(ctx, x + 0.42, y + 0.24, 0.16, 0.46, fill=c, geom="rect"),
        shape(ctx, x + 0.75, y + 0.10, 0.16, 0.60, fill=c, geom="rect"),
        shape(ctx, x + 0.16, y + 0.86, 0.14, 0.14, fill=COLORS["bg"], geom="rect"),
        shape(ctx, x + 0.45, y + 0.86, 0.14, 0.14, fill=COLORS["bg"], geom="rect"),
        shape(ctx, x + 0.74, y + 0.86, 0.14, 0.14, fill=COLORS["bg"], geom="rect"),
    ]


def icon_bank(ctx: Ctx, x: float, y: float, c: str) -> list[str]:
    els = [shape(ctx, x + 0.05, y + 0.20, 1.12, 0.35, fill=c, geom="triangle"), shape(ctx, x, y + 1.05, 1.22, 0.16, fill=c)]
    for i in range(4):
        els.append(shape(ctx, x + 0.14 + i * 0.25, y + 0.58, 0.13, 0.42, fill=c))
    return els


def icon_leaf(ctx: Ctx, x: float, y: float, c: str) -> list[str]:
    return [
        shape(ctx, x + 0.18, y + 0.18, 0.86, 0.58, fill=c, geom="ellipse", rot=-2400000),
        line(ctx, x + 0.35, y + 0.82, x + 0.95, y + 0.35, COLORS["white"], 12700),
        line(ctx, x + 0.26, y + 1.05, x + 0.45, y + 0.78, c, 25400),
    ]


def icon_doc(ctx: Ctx, x: float, y: float, c: str) -> list[str]:
    return [
        shape(ctx, x + 0.18, y + 0.08, 0.86, 1.08, fill=COLORS["white"], line=c, geom="roundRect"),
        shape(ctx, x + 0.75, y + 0.08, 0.28, 0.28, fill=COLORS["soft_green"], line=c, geom="rtTriangle"),
        line(ctx, x + 0.34, y + 0.48, x + 0.86, y + 0.48, c, 12700),
        line(ctx, x + 0.34, y + 0.68, x + 0.86, y + 0.68, c, 12700),
        line(ctx, x + 0.34, y + 0.88, x + 0.70, y + 0.88, c, 12700),
    ]


def icon_gate(ctx: Ctx, x: float, y: float, c: str) -> list[str]:
    return [
        shape(ctx, x + 0.10, y + 0.25, 0.18, 0.92, fill=c),
        shape(ctx, x + 0.92, y + 0.25, 0.18, 0.92, fill=c),
        shape(ctx, x + 0.10, y + 0.25, 1.0, 0.16, fill=c),
        shape(ctx, x + 0.42, y + 0.64, 0.36, 0.36, text="OK", font=520, color=COLORS["white"], bold=True, fill=COLORS["teal"], geom="ellipse", align="c", anchor="ctr", inset=0),
    ]


def icon_ai(ctx: Ctx, x: float, y: float, c: str) -> list[str]:
    nodes = [(0.55, 0.18), (0.20, 0.58), (0.88, 0.58), (0.38, 0.98), (0.74, 0.98)]
    els = [shape(ctx, x + 0.42, y + 0.45, 0.34, 0.34, fill=c, geom="ellipse")]
    for nx, ny in nodes:
        els.append(line(ctx, x + 0.59, y + 0.62, x + nx, y + ny, c, 12700))
        els.append(shape(ctx, x + nx - 0.08, y + ny - 0.08, 0.16, 0.16, fill=c, geom="ellipse"))
    return els


def icon_shield(ctx: Ctx, x: float, y: float, c: str) -> list[str]:
    return [
        shape(ctx, x + 0.18, y + 0.08, 0.86, 1.04, fill=c, geom="homePlate", rot=5400000),
        shape(ctx, x + 0.43, y + 0.43, 0.36, 0.36, text="✓", font=850, color=COLORS["white"], bold=True, align="c", anchor="ctr", inset=0),
    ]


def visual_card(ctx: Ctx, x: float, y: float, w: float, h: float, head: str, body: str, accent: str, icon: str) -> list[str]:
    els = [
        shape(ctx, x, y, w, h, fill=COLORS["white"], line=accent, geom="roundRect"),
        shape(ctx, x + 0.24, y + 0.22, 1.1, 1.1, fill=COLORS["soft_gray"], geom="ellipse"),
    ]
    if icon == "factory":
        els += icon_factory(ctx, x + 0.42, y + 0.18, accent)
    elif icon == "bank":
        els += icon_bank(ctx, x + 0.36, y + 0.18, accent)
    elif icon == "leaf":
        els += icon_leaf(ctx, x + 0.38, y + 0.18, accent)
    elif icon == "doc":
        els += icon_doc(ctx, x + 0.34, y + 0.18, accent)
    elif icon == "gate":
        els += icon_gate(ctx, x + 0.34, y + 0.18, accent)
    elif icon == "ai":
        els += icon_ai(ctx, x + 0.32, y + 0.18, accent)
    elif icon == "shield":
        els += icon_shield(ctx, x + 0.33, y + 0.18, accent)
    els += [
        shape(ctx, x + 1.55, y + 0.24, w - 1.8, 0.35, text=head, font=1060, color=accent, bold=True, inset=0),
        shape(ctx, x + 1.55, y + 0.72, w - 1.8, h - 0.9, text=body, font=760, color=COLORS["ink"], inset=0),
    ]
    return els


def metric(ctx: Ctx, x: float, y: float, num: str, label_text: str, c: str) -> list[str]:
    return [
        shape(ctx, x, y, 2.2, 1.0, fill=COLORS["white"], line=c, geom="roundRect"),
        shape(ctx, x + 0.1, y + 0.16, 2.0, 0.38, text=num, font=1340, color=c, bold=True, align="c", inset=0),
        shape(ctx, x + 0.1, y + 0.62, 2.0, 0.25, text=label_text, font=660, color=COLORS["muted"], align="c", inset=0),
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

    # 1 Cover
    ctx = Ctx()
    els = bg(ctx, dark=True)
    els += [
        shape(ctx, 0.7, 0.58, 2.2, 0.36, text="Climate Seal", font=1120, color=COLORS["yellow"], bold=True, inset=0),
        shape(ctx, 0.7, 1.35, 5.8, 1.45, text="The trust rail\nfor green markets", font=3100, color=COLORS["white"], bold=True, inset=0),
        shape(ctx, 0.75, 3.15, 5.35, 0.58, text="AI-native proof and acceptance infrastructure for carbon compliance, carbon assets, and green finance.", font=1040, color=COLORS["soft_green"], inset=0),
        shape(ctx, 7.0, 1.1, 4.35, 4.65, fill=COLORS["bg"], geom="roundRect"),
        shape(ctx, 7.55, 1.85, 1.05, 1.05, fill=COLORS["soft_green"], geom="ellipse"),
        shape(ctx, 8.95, 1.85, 1.05, 1.05, fill=COLORS["soft_teal"], geom="ellipse"),
        shape(ctx, 10.35, 1.85, 1.05, 1.05, fill=COLORS["soft_purple"], geom="ellipse"),
        *icon_doc(ctx, 7.48, 1.74, COLORS["green"]),
        *icon_gate(ctx, 8.86, 1.74, COLORS["teal"]),
        *icon_bank(ctx, 10.26, 1.74, COLORS["purple"]),
        shape(ctx, 7.7, 3.45, 3.45, 0.46, text="Proof -> Acceptance -> Capital", font=1050, color=COLORS["dark_green"], bold=True, align="c", inset=0),
        shape(ctx, 7.82, 4.45, 3.25, 0.54, text="From green claims\nto trusted market action", font=1180, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
    ]
    slides.append(slide_xml(els))

    # 2 Market
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Green markets are large. Acceptance is the bottleneck.", "The investable wedge is the infrastructure that turns green data into trusted decisions.")
    els += [
        shape(ctx, 0.85, 1.55, 3.4, 3.4, text="$10T+\nGreen economy", font=1680, color=COLORS["white"], bold=True, fill=COLORS["green"], geom="ellipse", align="c", anchor="ctr"),
        shape(ctx, 4.35, 1.25, 3.9, 3.9, text="EUR7.4T\nGreen assets", font=1780, color=COLORS["white"], bold=True, fill=COLORS["teal"], geom="ellipse", align="c", anchor="ctr"),
        shape(ctx, 8.55, 1.65, 2.95, 2.95, text="1B tons\nCarbon inventory", font=1320, color=COLORS["white"], bold=True, fill=COLORS["purple"], geom="ellipse", align="c", anchor="ctr"),
        shape(ctx, 3.2, 5.45, 5.9, 0.55, text="$60B annual acceptance spend", font=1250, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 4.15, 6.18, 4.0, 0.35, text="Acceptance friction keeps value locked.", font=840, color=COLORS["muted"], align="c", inset=0),
        footer(ctx, 2),
    ]
    slides.append(slide_xml(els))

    # 3 Broken bridge
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Today, proof and approval live on opposite sides", "Every market participant pays to rebuild the same bridge.")
    els += [
        shape(ctx, 0.95, 2.25, 3.0, 2.55, fill=COLORS["soft_green"], line=COLORS["green"], geom="roundRect"),
        shape(ctx, 8.35, 2.25, 3.0, 2.55, fill=COLORS["soft_purple"], line=COLORS["purple"], geom="roundRect"),
        *icon_factory(ctx, 1.82, 2.65, COLORS["green"]),
        *icon_bank(ctx, 9.22, 2.65, COLORS["purple"]),
        shape(ctx, 1.25, 4.10, 2.4, 0.36, text="Submitters", font=980, color=COLORS["green"], bold=True, align="c", inset=0),
        shape(ctx, 8.65, 4.10, 2.4, 0.36, text="Acceptors", font=980, color=COLORS["purple"], bold=True, align="c", inset=0),
        shape(ctx, 4.05, 3.25, 1.55, 0.22, fill=COLORS["line"]),
        shape(ctx, 6.73, 3.25, 1.55, 0.22, fill=COLORS["line"]),
        shape(ctx, 5.70, 3.05, 0.95, 0.65, text="GAP", font=1050, color=COLORS["white"], bold=True, fill=COLORS["red"], geom="roundRect", align="c", anchor="ctr"),
        label(ctx, 1.12, 5.30, 2.65, "3-12 months", COLORS["green"]),
        label(ctx, 4.95, 5.30, 2.45, "manual review", COLORS["red"]),
        label(ctx, 8.55, 5.30, 2.65, "$5k-$400k", COLORS["purple"]),
        footer(ctx, 3),
    ]
    slides.append(slide_xml(els))

    # 4 Solution architecture
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Climate Seal creates the missing acceptance layer", "One AI trust engine serves both the party proving and the party deciding.")
    els += [
        shape(ctx, 0.82, 2.0, 3.25, 3.2, fill=COLORS["soft_green"], line=COLORS["green"], geom="roundRect"),
        shape(ctx, 8.25, 2.0, 3.25, 3.2, fill=COLORS["soft_teal"], line=COLORS["teal"], geom="roundRect"),
        shape(ctx, 4.72, 1.72, 2.9, 3.75, fill=COLORS["dark_green"], geom="roundRect"),
        *icon_doc(ctx, 1.85, 2.25, COLORS["green"]),
        *icon_gate(ctx, 9.28, 2.25, COLORS["teal"]),
        *icon_ai(ctx, 5.56, 2.35, COLORS["yellow"]),
        shape(ctx, 1.18, 3.75, 2.55, 0.45, text="Green Passport", font=1180, color=COLORS["green"], bold=True, align="c", inset=0),
        shape(ctx, 8.60, 3.75, 2.55, 0.45, text="Acceptance Gate", font=1180, color=COLORS["teal"], bold=True, align="c", inset=0),
        shape(ctx, 5.05, 3.85, 2.22, 0.62, text="AI Trust\nEngine", font=1450, color=COLORS["white"], bold=True, align="c", anchor="ctr", inset=0),
        shape(ctx, 4.05, 3.35, 0.85, 0.28, fill=COLORS["yellow"], geom="rightArrow"),
        shape(ctx, 7.45, 3.35, 0.85, 0.28, fill=COLORS["yellow"], geom="rightArrow"),
        shape(ctx, 1.14, 4.55, 2.55, 0.26, text="reusable proof", font=720, color=COLORS["muted"], align="c", inset=0),
        shape(ctx, 8.65, 4.55, 2.45, 0.26, text="trusted decision", font=720, color=COLORS["muted"], align="c", inset=0),
        footer(ctx, 4),
    ]
    slides.append(slide_xml(els))

    # 5 Engine workflow
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "From messy evidence to decision-grade proof", "Designed as a visual, auditable pipeline.")
    steps = [
        ("DATA", "Ingest", COLORS["green"], "factory"),
        ("RULES", "Map", COLORS["teal"], "doc"),
        ("AI", "Reason", COLORS["purple"], "ai"),
        ("PROOF", "Package", COLORS["green"], "shield"),
        ("GATE", "Accept", COLORS["teal"], "gate"),
    ]
    for i, (tag, word, c, icon) in enumerate(steps):
        x = 0.75 + i * 2.25
        els.append(shape(ctx, x, 2.05, 1.25, 1.25, fill=COLORS["white"], line=c, geom="ellipse"))
        if icon == "factory":
            els += icon_factory(ctx, x + 0.10, 2.08, c)
        elif icon == "doc":
            els += icon_doc(ctx, x + 0.04, 2.02, c)
        elif icon == "ai":
            els += icon_ai(ctx, x + 0.02, 2.06, c)
        elif icon == "shield":
            els += icon_shield(ctx, x + 0.02, 2.02, c)
        else:
            els += icon_gate(ctx, x + 0.04, 2.02, c)
        els += [
            shape(ctx, x - 0.10, 3.62, 1.45, 0.32, text=tag, font=760, color=c, bold=True, align="c", inset=0),
            shape(ctx, x - 0.10, 4.00, 1.45, 0.25, text=word, font=680, color=COLORS["muted"], align="c", inset=0),
        ]
        if i < 4:
            els.append(shape(ctx, x + 1.40, 2.57, 0.60, 0.22, fill=COLORS["yellow"], geom="rightArrow"))
    els += [
        shape(ctx, 1.52, 5.35, 9.25, 0.56, text="Every step leaves an audit trail: methodology, factor, evidence, risk score, and acceptance outcome.", font=960, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 5),
    ]
    slides.append(slide_xml(els))

    # 6 Three markets
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "One rail, three high-value markets", "Same trust engine, different acceptance decisions.")
    for x, head, body, c, icon in [
        (0.75, "Carbon\nCompliance", "Orders\ntaxes\nmarket access", COLORS["green"], "factory"),
        (4.65, "Carbon Assets\n/ RWA", "Trading\npricing\nasset upgrade", COLORS["teal"], "leaf"),
        (8.55, "Green Finance\n/ RWA", "Loan size\nrate\nbond eligibility", COLORS["purple"], "bank"),
    ]:
        els.append(shape(ctx, x, 1.65, 2.95, 4.25, fill=COLORS["white"], line=c, geom="roundRect"))
        els.append(shape(ctx, x + 0.82, 2.02, 1.25, 1.25, fill=COLORS["soft_gray"], geom="ellipse"))
        if icon == "factory":
            els += icon_factory(ctx, x + 0.92, 2.06, c)
        elif icon == "leaf":
            els += icon_leaf(ctx, x + 0.90, 2.05, c)
        else:
            els += icon_bank(ctx, x + 0.88, 2.06, c)
        els += [
            shape(ctx, x + 0.32, 3.55, 2.3, 0.72, text=head, font=1120, color=c, bold=True, align="c", anchor="ctr", inset=0),
            shape(ctx, x + 0.52, 4.62, 1.9, 0.86, text=body, font=830, color=COLORS["ink"], align="c", anchor="ctr", inset=0),
        ]
    els += [footer(ctx, 6)]
    slides.append(slide_xml(els))

    # 7 Traction
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Commercial proof is already in motion", "Compliance has validated the engine; asset transaction modules are next.")
    for i, m in enumerate([
        ("10", "customers", COLORS["green"]),
        ("5", "countries", COLORS["teal"]),
        ("85%", "asset module", COLORS["purple"]),
        ("8M tons", "pipeline", COLORS["yellow"]),
    ]):
        els += metric(ctx, 0.75 + i * 2.75, 1.55, *m)
    els += [
        shape(ctx, 1.1, 3.35, 2.0, 2.0, fill=COLORS["soft_green"], geom="ellipse"),
        shape(ctx, 5.15, 3.35, 2.0, 2.0, fill=COLORS["soft_teal"], geom="ellipse"),
        shape(ctx, 9.2, 3.35, 2.0, 2.0, fill=COLORS["soft_purple"], geom="ellipse"),
        *icon_shield(ctx, 1.49, 3.72, COLORS["green"]),
        *icon_ai(ctx, 5.56, 3.72, COLORS["teal"]),
        *icon_leaf(ctx, 9.58, 3.72, COLORS["purple"]),
        shape(ctx, 0.92, 5.62, 2.35, 0.34, text="BV 5% confidence", font=820, color=COLORS["green"], bold=True, align="c", inset=0),
        shape(ctx, 4.72, 5.62, 2.85, 0.34, text="Go-live in ~2 months", font=820, color=COLORS["teal"], bold=True, align="c", inset=0),
        shape(ctx, 8.78, 5.62, 2.85, 0.34, text="10+ buyer channels", font=820, color=COLORS["purple"], bold=True, align="c", inset=0),
        footer(ctx, 7),
    ]
    slides.append(slide_xml(els))

    # 8 GTM and revenue
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "Land through compliance. Expand into transaction revenue.", "A wedge that starts practical and compounds into infrastructure.")
    els += [
        shape(ctx, 0.85, 1.75, 2.7, 1.1, text="Compliance\nentry", font=1180, color=COLORS["white"], bold=True, fill=COLORS["green"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 4.85, 1.75, 2.7, 1.1, text="Asset\nupgrade", font=1180, color=COLORS["white"], bold=True, fill=COLORS["teal"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 8.85, 1.75, 2.7, 1.1, text="Finance\nactivation", font=1180, color=COLORS["white"], bold=True, fill=COLORS["purple"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 3.78, 2.18, 0.75, 0.28, fill=COLORS["yellow"], geom="rightArrow"),
        shape(ctx, 7.78, 2.18, 0.75, 0.28, fill=COLORS["yellow"], geom="rightArrow"),
    ]
    for i, r in enumerate([
        ("Passport", "$200+"),
        ("Gate", "$30k+"),
        ("Event", "$500+"),
        ("Upside", "15% / bps"),
    ]):
        els.append(shape(ctx, 0.95 + i * 2.75, 4.20, 2.20, 1.18, text=f"{r[0]}\n{r[1]}", font=1080, color=COLORS["ink"], bold=True, fill=COLORS["white"], line=[COLORS["green"], COLORS["teal"], COLORS["purple"], COLORS["yellow"]][i], geom="roundRect", align="c", anchor="ctr"))
    els += [
        shape(ctx, 3.35, 6.05, 5.55, 0.48, text="$3M in 2026 -> $100M+ by 2030", font=1120, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="roundRect", align="c", anchor="ctr"),
        footer(ctx, 8),
    ]
    slides.append(slide_xml(els))

    # 9 Moat flywheel
    ctx = Ctx()
    els = bg(ctx) + title(ctx, "The moat is workflow embedding plus network memory", "More passports make better gates; better gates create more accepted transactions.")
    els += [
        shape(ctx, 4.88, 2.08, 2.55, 2.55, text="Trust\nFlywheel", font=1500, color=COLORS["white"], bold=True, fill=COLORS["dark_green"], geom="ellipse", align="c", anchor="ctr"),
        shape(ctx, 1.02, 1.65, 2.55, 0.92, text="More passports", font=980, color=COLORS["white"], bold=True, fill=COLORS["green"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 8.68, 1.65, 2.55, 0.92, text="Better gates", font=980, color=COLORS["white"], bold=True, fill=COLORS["teal"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 1.02, 4.40, 2.55, 0.92, text="Lower trust cost", font=980, color=COLORS["white"], bold=True, fill=COLORS["purple"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 8.68, 4.40, 2.55, 0.92, text="More transactions", font=980, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 3.72, 2.05, 0.72, 0.24, fill=COLORS["line"], geom="rightArrow"),
        shape(ctx, 7.80, 2.05, 0.72, 0.24, fill=COLORS["line"], geom="rightArrow"),
        shape(ctx, 3.72, 4.80, 0.72, 0.24, fill=COLORS["line"], geom="rightArrow", rot=10800000),
        shape(ctx, 7.80, 4.80, 0.72, 0.24, fill=COLORS["line"], geom="rightArrow", rot=10800000),
        label(ctx, 3.02, 6.08, 6.2, "Data memory + rule models + acceptance workflow lock-in", COLORS["dark_green"]),
        footer(ctx, 9),
    ]
    slides.append(slide_xml(els))

    # 10 Team and raise
    ctx = Ctx()
    els = bg(ctx, dark=True)
    els += [
        shape(ctx, 0.7, 0.62, 5.6, 0.68, text="Built by carbon, AI, and GTM operators", font=2050, color=COLORS["white"], bold=True, inset=0),
        shape(ctx, 0.72, 1.30, 5.7, 0.32, text="The team combines commercialization, product, AI engineering, and verification expertise.", font=820, color=COLORS["soft_green"], inset=0),
    ]
    for i, t in enumerate([
        ("GTM", "carbon unicorn\nChina GM", COLORS["green"]),
        ("Product", "carbon PM\nWageningen", COLORS["teal"]),
        ("AI", "17 yrs eng.\nYC AI startup", COLORS["purple"]),
        ("Domain", "verification\nasset finance", COLORS["yellow"]),
    ]):
        x = 0.85 + i * 2.75
        els += [
            shape(ctx, x, 2.22, 1.38, 1.38, text=t[0], font=900, color=COLORS["white"] if i < 3 else COLORS["ink"], bold=True, fill=t[2], geom="ellipse", align="c", anchor="ctr"),
            shape(ctx, x - 0.30, 3.85, 1.98, 0.52, text=t[1], font=720, color=COLORS["soft_green"], align="c", anchor="ctr", inset=0),
        ]
    els += [
        shape(ctx, 1.05, 5.25, 2.6, 0.72, text="Seed raise\n$2M", font=1280, color=COLORS["white"], bold=True, fill=COLORS["green"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 4.10, 5.25, 2.6, 0.72, text="R&D\n50%", font=1280, color=COLORS["white"], bold=True, fill=COLORS["teal"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 7.15, 5.25, 3.85, 0.72, text="Vision: Visa of green economy", font=1280, color=COLORS["ink"], bold=True, fill=COLORS["yellow"], geom="roundRect", align="c", anchor="ctr"),
        shape(ctx, 3.30, 6.45, 5.65, 0.34, text="Credibility Drives Better Climate", font=1180, color=COLORS["yellow"], bold=True, align="c", inset=0),
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

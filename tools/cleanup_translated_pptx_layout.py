from __future__ import annotations

import copy
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


SRC = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_preserved_v2.pptx")
OUT = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_layout_cleaned.pptx")

NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
}
ET.register_namespace("a", NS["a"])
ET.register_namespace("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
ET.register_namespace("p", NS["p"])


DENSE_SLIDES = {5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 17}
VERY_DENSE_SLIDES = {11, 14, 15, 16}


def text_of(tx_body: ET.Element) -> str:
    return "".join(t.text for t in tx_body.findall(".//a:t", NS) if t.text)


def line_count(text: str) -> int:
    return len(text.splitlines()) if text else 0


def is_english_text(text: str) -> bool:
    return bool(text.strip()) and not re.search(r"[\u4e00-\u9fff]", text)


def get_font_nodes(tx_body: ET.Element) -> list[ET.Element]:
    return tx_body.findall(".//a:rPr", NS) + tx_body.findall(".//a:endParaRPr", NS)


def scale_size(raw: str | None, factor: float) -> str | None:
    if not raw:
        return raw
    try:
        value = int(raw)
    except ValueError:
        return raw
    new_value = max(900, int(round(value * factor)))
    return str(new_value)


def set_autofit(body_pr: ET.Element, font_scale: int, line_reduction: int) -> None:
    for child in list(body_pr):
        if child.tag in {
            f"{{{NS['a']}}}spAutoFit",
            f"{{{NS['a']}}}normAutofit",
            f"{{{NS['a']}}}noAutofit",
        }:
            body_pr.remove(child)
    body_pr.append(
        ET.Element(
            f"{{{NS['a']}}}normAutofit",
            {
                "fontScale": str(font_scale),
                "lnSpcReduction": str(line_reduction),
            },
        )
    )


def adjust_paragraph_spacing(tx_body: ET.Element, dense: bool) -> None:
    for p in tx_body.findall("a:p", NS):
        ppr = p.find("a:pPr", NS)
        if ppr is None:
            ppr = ET.Element(f"{{{NS['a']}}}pPr")
            p.insert(0, ppr)
        ln_spc = ppr.find("a:lnSpc", NS)
        if ln_spc is None:
            ln_spc = ET.Element(f"{{{NS['a']}}}lnSpc")
            ppr.insert(0, ln_spc)
        for child in list(ln_spc):
            ln_spc.remove(child)
        spc_pct = ET.Element(f"{{{NS['a']}}}spcPct")
        spc_pct.set("val", "85000" if dense else "92000")
        ln_spc.append(spc_pct)

        for tag, val in (("spcBef", "0"), ("spcAft", "0")):
            node = ppr.find(f"a:{tag}", NS)
            if node is None:
                node = ET.Element(f"{{{NS['a']}}}{tag}")
                ppr.append(node)
            for child in list(node):
                node.remove(child)
            pts = ET.Element(f"{{{NS['a']}}}spcPts")
            pts.set("val", val)
            node.append(pts)


def cleanup_slide(slide_no: int, root: ET.Element) -> None:
    for tx_body in root.findall(".//p:txBody", NS):
        text = text_of(tx_body)
        if not is_english_text(text):
            continue

        chars = len(text)
        lines = line_count(text)
        dense = slide_no in DENSE_SLIDES or chars > 180 or lines > 5
        very_dense = slide_no in VERY_DENSE_SLIDES or chars > 420 or lines > 10

        if very_dense:
            font_factor = 0.74
            font_scale = 72000
            line_reduction = 22000
        elif dense:
            font_factor = 0.82
            font_scale = 82000
            line_reduction = 16000
        elif chars > 80 or lines > 3:
            font_factor = 0.9
            font_scale = 90000
            line_reduction = 10000
        else:
            font_factor = 0.96
            font_scale = 96000
            line_reduction = 6000

        body_pr = tx_body.find("a:bodyPr", NS)
        if body_pr is not None:
            set_autofit(body_pr, font_scale, line_reduction)

        for node in get_font_nodes(tx_body):
            node.set("lang", "en-US")
            node.attrib.pop("altLang", None)
            node.attrib.pop("kumimoji", None)
            scaled = scale_size(node.get("sz"), font_factor)
            if scaled:
                node.set("sz", scaled)

        adjust_paragraph_spacing(tx_body, dense)


def main() -> None:
    with zipfile.ZipFile(SRC, "r") as zin, zipfile.ZipFile(OUT, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", item.filename):
                slide_no = int(re.search(r"slide(\d+)\.xml", item.filename).group(1))
                root = ET.fromstring(zin.read(item.filename))
                cleanup_slide(slide_no, root)
                zout.writestr(item, ET.tostring(root, encoding="utf-8", xml_declaration=True))
            else:
                zout.writestr(item, zin.read(item.filename))

    print(OUT)


if __name__ == "__main__":
    main()

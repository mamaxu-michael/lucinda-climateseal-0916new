from __future__ import annotations

import copy
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from translate_pptx_preserve_design import (
    GLOBAL_REPLACEMENTS,
    NS,
    SLIDE_REPLACEMENTS,
    maybe_translate,
    normalize_text,
    replace_text,
)


SRC = Path("/Users/lucindaliu/Downloads/business plan -绿色经济采信基础设施04-19.pptx")
OUT = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_en_10page_original_design.pptx")

# Original slide designs to keep, in investor-deck order.
# 1 cover, 2 market, 3 pain, 5 product, 6 tech, 7 traction,
# 8 why now, 9 GTM, 11 business model, 14 team / fundraising.
SELECTED_SLIDES = [1, 2, 3, 5, 6, 7, 8, 9, 11, 14]

P = f"{{{NS['p']}}}"
A = f"{{{NS['a']}}}"


EXTRA_REPLACEMENTS: dict[int, list[tuple[str, str]]] = {
    1: [
        (
            "Ai Native 绿色经济「采信」基础设施",
            "AI-Native Trust Infrastructure\nfor the Green Economy",
        ),
        (
            "—帮“企业/产品/金融资产”证明是否绿色, 通过市场和监管验收，构建绿色领域-Visa",
            "Helping companies, products, and financial assets prove green claims,\npass market and regulatory acceptance, and move through trusted green markets.",
        ),
    ],
    2: [
        ("绿色经济>$10T", "Green economy\n>$10T"),
        ("采信阀门多10%=释放$1T", "+10% acceptance\nunlocks ~$1T"),
        ("流通池=~20%", "Accepted flow\n~20%"),
        ("瓶颈：采信（绿色证明&验收）", "Bottleneck:\ntrusted acceptance"),
    ],
    3: [
        ("提交方：企业/资产开发方/贷款方", "Submitters:\ncompanies / asset developers / lenders"),
        ("验收方：品牌方海关/资产买方/银行", "Acceptors:\nbrands / customs / buyers / banks"),
        ("锁住80%资产流通", "80% of assets\nremain blocked"),
        ("口径差异", "Standards gap"),
        ("重算重审", "Recalculate\nRe-audit"),
        ("交易/融资失败", "Trade / financing\nfails"),
    ],
    5: [
        (
            "解决方案:把证明和验收,做成一套引擎+两套标准Ai产品",
            "Solution: one AI engine + two standard products\nGreen Passport creates reusable proof. Acceptance Gate automates market decisions.",
        ),
        ("绿色护照", "Green\nPassport"),
        ("验收闸机", "Acceptance\nGate"),
        ("Ai绿色证明编译器", "AI Proof\nCompiler"),
        ("Ai验收执行引擎", "AI Acceptance\nEngine"),
    ],
    6: [
        (
            "底层技术:自审计式自动化Ai引擎",
            "Core Technology: Self-Auditing AI Engine\nConsulting and audit expertise embedded in an auditable AI pipeline.",
        ),
        ("手工慢/易错", "Manual /\nslow /\nerror-prone"),
        ("自动快/高精度", "Automated /\nfast /\nhigh precision"),
        ("白盒/100%追溯", "White-box /\n100% traceable"),
    ],
    7: [
        (
            "业务进展:  Ai引擎已成功商用—合规场景已验证了Ai引擎能力, 正基于引擎构建资产开发模块",
            "Progress: AI engine commercialized in compliance;\nasset and RWA modules are launching next.",
        ),
        ("已验证 : 合规场景商用", "Validated:\ncompliance"),
        ("将上线 : 碳资产+RWA场景", "Launching:\nCarbon Assets + RWA"),
        ("已锁定 : 资产客户+买方", "Locked:\nclients + buyers"),
    ],
    8: [
        (
            "Why Now—绿色结果开始影响税费/订单/交易和融资2026是分水岭：碳要求从“自愿填表”转向“强制和营收影响”",
            "Why Now: green status now affects taxes, orders, trading, and financing.\n2026 shifts carbon rules from disclosure to revenue impact.",
        ),
    ],
    9: [
        (
            "业务战略:合规占领入口,再向资产/金融Agent延伸—从提交方积累精度，到写入验收流程，再扩展到三个场景",
            "GTM Strategy: enter through compliance, then expand into carbon assets and green finance.\nThe same passport + gate rail compounds across three markets.",
        ),
        (
            "当护照用量足够大、闸机嵌入足够深两端都依赖同一套轨道，构成采信的基础设施VISA",
            "At scale, both sides depend on the same rails: Visa-like trust infrastructure.",
        ),
    ],
    11: [
        (
            "商业模式: 先赚护照和闸机钱, 再扩成事件验证和分润—收费跟着决策节点走，随嵌入程度逐层变厚",
            "Business Model: revenue follows decision points.\nStart with passport and gate fees, then expand into event verification and upside sharing.",
        ),
    ],
    14: [
        (
            "团队和融资：碳×产品×AI×商业化专家",
            "Team & Fundraising: carbon × product × AI × commercialization",
        ),
        (
            "轮次: Seed金额: $200万Runway: 12个月目标：100咨询公司",
            "Seed round: $2M\nRunway: 12 months\nGoal: 100 consultancies + 5 asset projects",
        ),
        (
            "轮次:Seed金额:$200万Runway:12个月目标：100咨询公司",
            "Seed round: $2M\nRunway: 12 months\nGoal: 100 consultancies + 5 asset projects",
        ),
    ],
}


def all_replacements(src_slide_no: int) -> list[tuple[str, str]]:
    return (
        EXTRA_REPLACEMENTS.get(src_slide_no, [])
        + SLIDE_REPLACEMENTS.get(src_slide_no, [])
        + GLOBAL_REPLACEMENTS
    )


def translate_text_body(src_slide_no: int, tx_body: ET.Element) -> None:
    text = normalize_text(tx_body)
    if not text:
        return
    for fragment, replacement in all_replacements(src_slide_no):
        if fragment in text:
            replace_text(tx_body, replacement)
            make_text_english_friendly(tx_body)
            return
    maybe_translate(src_slide_no, tx_body)
    make_text_english_friendly(tx_body)


def make_text_english_friendly(tx_body: ET.Element) -> None:
    body_pr = tx_body.find("a:bodyPr", NS)
    if body_pr is not None:
        for child in list(body_pr):
            if child.tag in {f"{A}normAutofit", f"{A}spAutoFit", f"{A}noAutofit"}:
                body_pr.remove(child)
        ET.SubElement(body_pr, f"{A}normAutofit", {"fontScale": "76000", "lnSpcReduction": "18000"})
    for rpr in tx_body.findall(".//a:rPr", NS):
        rpr.set("lang", "en-US")
        sz = rpr.get("sz")
        if sz and sz.isdigit():
            # English tends to run longer than Chinese. Small reduction prevents overflow
            # while preserving the original visual layout.
            size = int(sz)
            if size >= 1200:
                rpr.set("sz", str(max(720, int(size * 0.82))))
        latin = rpr.find("a:latin", NS)
        if latin is None:
            latin = ET.SubElement(rpr, f"{A}latin")
        latin.set("typeface", "Aptos")


def translate_slide_xml(src_slide_no: int, xml: bytes) -> bytes:
    root = ET.fromstring(xml)
    for tx_body in root.findall(".//p:txBody", NS):
        translate_text_body(src_slide_no, tx_body)
    return ET.tostring(root, encoding="utf-8", xml_declaration=True)


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
    keep = len(SELECTED_SLIDES)
    slide_xml: dict[int, bytes] = {}
    slide_rels: dict[int, bytes | None] = {}

    with zipfile.ZipFile(SRC, "r") as zin:
        for dest_no, src_no in enumerate(SELECTED_SLIDES, start=1):
            slide_xml[dest_no] = translate_slide_xml(src_no, zin.read(f"ppt/slides/slide{src_no}.xml"))
            rel_name = f"ppt/slides/_rels/slide{src_no}.xml.rels"
            slide_rels[dest_no] = zin.read(rel_name) if rel_name in zin.namelist() else None

        with zipfile.ZipFile(OUT, "w", compression=zipfile.ZIP_DEFLATED) as zout:
            for item in zin.infolist():
                name = item.filename
                if re.fullmatch(r"ppt/slides/slide\d+\.xml", name):
                    dest_no = int(re.search(r"slide(\d+)\.xml", name).group(1))
                    if dest_no <= keep:
                        zout.writestr(item, slide_xml[dest_no])
                    continue
                if re.fullmatch(r"ppt/slides/_rels/slide\d+\.xml\.rels", name):
                    dest_no = int(re.search(r"slide(\d+)\.xml\.rels", name).group(1))
                    if dest_no <= keep and slide_rels[dest_no] is not None:
                        zout.writestr(item, slide_rels[dest_no])
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

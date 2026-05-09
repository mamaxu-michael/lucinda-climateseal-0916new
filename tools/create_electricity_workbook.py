from __future__ import annotations

import csv
import datetime as dt
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


SUMMARY_ROWS = [
    {
        "billing_month": "202402",
        "document_type": "detailed_bill",
        "source_files": "2月份电费.pdf",
        "settlement_period": "20240201-20240301",
        "total_amount_cny": 375359.27,
        "active_kwh": 354880,
        "reactive_kvarh": 150880,
        "super_peak_kwh": 0,
        "peak_kwh": 147360,
        "flat_kwh": 138240,
        "valley_kwh": 69120,
        "proxy_purchase_fee_cny": 182937.99,
        "transmission_distribution_fee_cny": 59813.68,
        "line_loss_fee_cny": 6458.81,
        "system_operation_total_cny": 8517.13,
        "government_funds_total_cny": 10245.39,
        "capacity_charge_cny": 104928,
        "billed_capacity_kw_or_kva": 2186,
        "power_adjustment_fee_cny": "",
        "power_factor": 0.92,
        "contract_capacity": 9500,
        "notes": "Parsed from OCR; minor mismatch may exist in TOU subtotal digits.",
    },
    {
        "billing_month": "202403",
        "document_type": "detailed_bill",
        "source_files": "3月份电费.pdf",
        "settlement_period": "20240301-20240401",
        "total_amount_cny": 861228.48,
        "active_kwh": 904800,
        "reactive_kvarh": 341600,
        "super_peak_kwh": 0,
        "peak_kwh": 388320,
        "flat_kwh": 369600,
        "valley_kwh": 146880,
        "proxy_purchase_fee_cny": 477865.30,
        "transmission_distribution_fee_cny": 156243.71,
        "line_loss_fee_cny": 16467.36,
        "system_operation_total_cny": 26121.56,
        "government_funds_total_cny": 41620.80,
        "capacity_charge_cny": 147600,
        "billed_capacity_kw_or_kva": 3075,
        "power_adjustment_fee_cny": -4690.25,
        "power_factor": 0.94,
        "contract_capacity": 9500,
        "notes": "Seasonal尖峰 charge noted in bill; TOU split recorded as peak/flat/valley.",
    },
    {
        "billing_month": "202404",
        "document_type": "detailed_bill",
        "source_files": "4月份电费.png",
        "settlement_period": "20240401-20240501",
        "total_amount_cny": 812422.29,
        "active_kwh": 785760,
        "reactive_kvarh": 261600,
        "super_peak_kwh": 0,
        "peak_kwh": 373920,
        "flat_kwh": 308960,
        "valley_kwh": 102880,
        "proxy_purchase_fee_cny": 437991.18,
        "transmission_distribution_fee_cny": 142639.50,
        "line_loss_fee_cny": 14300.83,
        "system_operation_total_cny": 58146.23,
        "government_funds_total_cny": 22684.88,
        "capacity_charge_cny": 142080,
        "billed_capacity_kw_or_kva": 2960,
        "power_adjustment_fee_cny": -5420.33,
        "power_factor": 0.95,
        "contract_capacity": 9500,
        "notes": "Month confirmed by user as 202404; source filename itself is misleading.",
    },
    {
        "billing_month": "202405",
        "document_type": "detailed_bill",
        "source_files": "5月份电费.png",
        "settlement_period": "20240501-20240601",
        "total_amount_cny": 833294.96,
        "active_kwh": 820320,
        "reactive_kvarh": 275520,
        "super_peak_kwh": 0,
        "peak_kwh": 394720,
        "flat_kwh": 319840,
        "valley_kwh": 105760,
        "proxy_purchase_fee_cny": 457027.27,
        "transmission_distribution_fee_cny": 149518.43,
        "line_loss_fee_cny": 14847.79,
        "system_operation_total_cny": 46019.95,
        "government_funds_total_cny": 23682.64,
        "capacity_charge_cny": 142848,
        "billed_capacity_kw_or_kva": 2976,
        "power_adjustment_fee_cny": -5620.45,
        "power_factor": 0.95,
        "contract_capacity": 9500,
        "notes": "",
    },
    {
        "billing_month": "202406",
        "document_type": "detailed_bill",
        "source_files": "6月份电费.png",
        "settlement_period": "20240601-20240701",
        "total_amount_cny": 620332.80,
        "active_kwh": 618560,
        "reactive_kvarh": 258720,
        "super_peak_kwh": 0,
        "peak_kwh": 279040,
        "flat_kwh": 236320,
        "valley_kwh": 103200,
        "proxy_purchase_fee_cny": 332286.98,
        "transmission_distribution_fee_cny": 108709.11,
        "line_loss_fee_cny": 11195.93,
        "system_operation_total_cny": 13051.60,
        "government_funds_total_cny": 17857.83,
        "capacity_charge_cny": 133344,
        "billed_capacity_kw_or_kva": 2778,
        "power_adjustment_fee_cny": -1723.02,
        "power_factor": 0.92,
        "contract_capacity": 9500,
        "notes": "",
    },
    {
        "billing_month": "202407",
        "document_type": "detailed_bill",
        "source_files": "7月份电费.png",
        "settlement_period": "20240701-20240801",
        "total_amount_cny": 688804.71,
        "active_kwh": 712640,
        "reactive_kvarh": 272000,
        "super_peak_kwh": 46080,
        "peak_kwh": 182880,
        "flat_kwh": 355680,
        "valley_kwh": 128000,
        "proxy_purchase_fee_cny": 361201.29,
        "transmission_distribution_fee_cny": 118031.20,
        "line_loss_fee_cny": 12970.06,
        "system_operation_total_cny": 18243.56,
        "government_funds_total_cny": 20573.92,
        "capacity_charge_cny": 150816,
        "billed_capacity_kw_or_kva": 3142,
        "power_adjustment_fee_cny": -2879.54,
        "power_factor": 0.93,
        "contract_capacity": 9500,
        "notes": "Includes尖峰加收 in the source bill.",
    },
    {
        "billing_month": "202408",
        "document_type": "detailed_bill",
        "source_files": "8月份电费.png",
        "settlement_period": "20240801-20240901",
        "total_amount_cny": 778029.52,
        "active_kwh": 812960,
        "reactive_kvarh": 286880,
        "super_peak_kwh": 43040,
        "peak_kwh": 206560,
        "flat_kwh": 437600,
        "valley_kwh": 125760,
        "proxy_purchase_fee_cny": 413260.29,
        "transmission_distribution_fee_cny": 135039.21,
        "line_loss_fee_cny": 14795.87,
        "system_operation_total_cny": 33981.73,
        "government_funds_total_cny": 23470.16,
        "capacity_charge_cny": 152544,
        "billed_capacity_kw_or_kva": 3178,
        "power_adjustment_fee_cny": -4260.25,
        "power_factor": 0.94,
        "contract_capacity": 9500,
        "notes": "Includes尖峰加收 in the source bill.",
    },
    {
        "billing_month": "202409",
        "document_type": "detailed_bill",
        "source_files": "9月份电费.png",
        "settlement_period": "20240901-20241001",
        "total_amount_cny": 698563.66,
        "active_kwh": 720640,
        "reactive_kvarh": 262080,
        "super_peak_kwh": 0,
        "peak_kwh": 225760,
        "flat_kwh": 362560,
        "valley_kwh": 132320,
        "proxy_purchase_fee_cny": 363297.38,
        "transmission_distribution_fee_cny": 118407.15,
        "line_loss_fee_cny": 13115.64,
        "system_operation_total_cny": 33293.58,
        "government_funds_total_cny": 20804.87,
        "capacity_charge_cny": 153456,
        "billed_capacity_kw_or_kva": 3197,
        "power_adjustment_fee_cny": -3810.96,
        "power_factor": 0.94,
        "contract_capacity": 9500,
        "notes": "",
    },
    {
        "billing_month": "202410",
        "document_type": "detailed_bill",
        "source_files": "10月份电费.png",
        "settlement_period": "20241001-20241101",
        "total_amount_cny": 729757.71,
        "active_kwh": 732160,
        "reactive_kvarh": 255360,
        "super_peak_kwh": 0,
        "peak_kwh": 329120,
        "flat_kwh": 279840,
        "valley_kwh": 123200,
        "proxy_purchase_fee_cny": 390564.22,
        "transmission_distribution_fee_cny": 127458.14,
        "line_loss_fee_cny": 13252.09,
        "system_operation_total_cny": 28993.51,
        "government_funds_total_cny": 21137.47,
        "capacity_charge_cny": 148368,
        "billed_capacity_kw_or_kva": 3091,
        "power_adjustment_fee_cny": -4016.35,
        "power_factor": 0.94,
        "contract_capacity": 9500,
        "notes": "",
    },
    {
        "billing_month": "202411",
        "document_type": "invoice_only",
        "source_files": "2024年11月绿沃：3400105041492.pdf",
        "settlement_period": "",
        "total_amount_cny": 339122.89,
        "active_kwh": 334560,
        "reactive_kvarh": "",
        "super_peak_kwh": "",
        "peak_kwh": "",
        "flat_kwh": "",
        "valley_kwh": "",
        "proxy_purchase_fee_cny": "",
        "transmission_distribution_fee_cny": "",
        "line_loss_fee_cny": "",
        "system_operation_total_cny": "",
        "government_funds_total_cny": "",
        "capacity_charge_cny": "",
        "billed_capacity_kw_or_kva": "",
        "power_adjustment_fee_cny": "",
        "power_factor": "",
        "contract_capacity": "",
        "notes": "Invoice only; detailed tariff breakdown not present in the provided source.",
    },
    {
        "billing_month": "202412",
        "document_type": "invoice_only_aggregated",
        "source_files": "2024年12月绿沃：3400105041492.pdf + 2024年12月绿沃：3400105041492 (2).pdf",
        "settlement_period": "",
        "total_amount_cny": 477950.66,
        "active_kwh": 499520,
        "reactive_kvarh": "",
        "super_peak_kwh": "",
        "peak_kwh": "",
        "flat_kwh": "",
        "valley_kwh": "",
        "proxy_purchase_fee_cny": "",
        "transmission_distribution_fee_cny": "",
        "line_loss_fee_cny": "",
        "system_operation_total_cny": "",
        "government_funds_total_cny": "",
        "capacity_charge_cny": "",
        "billed_capacity_kw_or_kva": "",
        "power_adjustment_fee_cny": "",
        "power_factor": "",
        "contract_capacity": "",
        "notes": "Aggregated from two December invoices provided in the folder.",
    },
]

SOURCE_ROWS = [
    {
        "billing_month": "202402",
        "source_file": "2月份电费.pdf",
        "document_type": "detailed_bill",
        "settlement_period": "20240201-20240301",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 354880,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 375359.27,
        "notes": "Detailed bill OCR extraction.",
    },
    {
        "billing_month": "202403",
        "source_file": "3月份电费.pdf",
        "document_type": "detailed_bill",
        "settlement_period": "20240301-20240401",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 904800,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 861228.48,
        "notes": "Detailed bill OCR extraction.",
    },
    {
        "billing_month": "202404",
        "source_file": "4月份电费.png",
        "document_type": "detailed_bill",
        "settlement_period": "20240401-20240501",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 785760,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 812422.29,
        "notes": "Month confirmed by user as 202404.",
    },
    {
        "billing_month": "202405",
        "source_file": "5月份电费.png",
        "document_type": "detailed_bill",
        "settlement_period": "20240501-20240601",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 820320,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 833294.96,
        "notes": "Detailed bill OCR extraction.",
    },
    {
        "billing_month": "202406",
        "source_file": "6月份电费.png",
        "document_type": "detailed_bill",
        "settlement_period": "20240601-20240701",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 618560,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 620332.80,
        "notes": "Detailed bill OCR extraction.",
    },
    {
        "billing_month": "202407",
        "source_file": "7月份电费.png",
        "document_type": "detailed_bill",
        "settlement_period": "20240701-20240801",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 712640,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 688804.71,
        "notes": "Detailed bill OCR extraction.",
    },
    {
        "billing_month": "202408",
        "source_file": "8月份电费.png",
        "document_type": "detailed_bill",
        "settlement_period": "20240801-20240901",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 812960,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 778029.52,
        "notes": "Detailed bill OCR extraction.",
    },
    {
        "billing_month": "202409",
        "source_file": "9月份电费.png",
        "document_type": "detailed_bill",
        "settlement_period": "20240901-20241001",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 720640,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 698563.66,
        "notes": "Detailed bill OCR extraction.",
    },
    {
        "billing_month": "202410",
        "source_file": "10月份电费.png",
        "document_type": "detailed_bill",
        "settlement_period": "20241001-20241101",
        "invoice_date": "",
        "sales_kwh_or_active_kwh": 732160,
        "pre_tax_amount_cny": "",
        "tax_amount_cny": "",
        "total_amount_cny": 729757.71,
        "notes": "Detailed bill OCR extraction.",
    },
    {
        "billing_month": "202411",
        "source_file": "2024年11月绿沃：3400105041492.pdf",
        "document_type": "invoice_only",
        "settlement_period": "",
        "invoice_date": "2024-12-06",
        "sales_kwh_or_active_kwh": 334560,
        "pre_tax_amount_cny": 300108.75,
        "tax_amount_cny": 39014.14,
        "total_amount_cny": 339122.89,
        "notes": "Invoice only; detailed bill breakdown not available.",
    },
    {
        "billing_month": "202412",
        "source_file": "2024年12月绿沃：3400105041492.pdf",
        "document_type": "invoice_only",
        "settlement_period": "",
        "invoice_date": "2025-01-07",
        "sales_kwh_or_active_kwh": 240800,
        "pre_tax_amount_cny": 204029.96,
        "tax_amount_cny": 26523.89,
        "total_amount_cny": 230553.85,
        "notes": "One of two December invoices in the folder.",
    },
    {
        "billing_month": "202412",
        "source_file": "2024年12月绿沃：3400105041492 (2).pdf",
        "document_type": "invoice_only",
        "settlement_period": "",
        "invoice_date": "2025-01-07",
        "sales_kwh_or_active_kwh": 258720,
        "pre_tax_amount_cny": 218935.23,
        "tax_amount_cny": 28461.58,
        "total_amount_cny": 247396.81,
        "notes": "One of two December invoices in the folder.",
    },
]

README_ROWS = [
    {
        "item": "Workbook scope",
        "detail": "Covers the files currently provided in the 中试车间用电量 folder.",
    },
    {
        "item": "Month coverage",
        "detail": "Detailed bills: 202402-202410. Invoice-only records: 202411-202412.",
    },
    {
        "item": "April file",
        "detail": "The file named 4月份电费.png was recorded as billing month 202404 based on the bill itself and user confirmation.",
    },
    {
        "item": "December invoices",
        "detail": "Two separate December 2024 invoices were present. Monthly summary aggregates both.",
    },
    {
        "item": "January gap",
        "detail": "No 202401 source file was included in the folder provided this turn.",
    },
]


def col_letter(index: int) -> str:
    result = ""
    while index > 0:
        index, remainder = divmod(index - 1, 26)
        result = chr(65 + remainder) + result
    return result


def xml_text(value: object) -> str:
    return escape(str(value), {'"': "&quot;"})


def sheet_xml(rows: list[dict[str, object]], headers: list[str]) -> str:
    cols = "".join(
        f'<col min="{i}" max="{i}" width="18" customWidth="1"/>'
        for i in range(1, len(headers) + 1)
    )
    row_xml = []
    all_rows = [headers] + [[row.get(header, "") for header in headers] for row in rows]

    for r_idx, row in enumerate(all_rows, start=1):
        cells = []
        for c_idx, value in enumerate(row, start=1):
            cell_ref = f"{col_letter(c_idx)}{r_idx}"
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                cells.append(f'<c r="{cell_ref}"><v>{value}</v></c>')
            elif value == "":
                cells.append(f'<c r="{cell_ref}" t="inlineStr"><is><t></t></is></c>')
            else:
                cells.append(
                    f'<c r="{cell_ref}" t="inlineStr"><is><t>{xml_text(value)}</t></is></c>'
                )
        row_xml.append(f'<row r="{r_idx}">{"".join(cells)}</row>')

    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<cols>{cols}</cols>'
        f'<sheetData>{"".join(row_xml)}</sheetData>'
        '</worksheet>'
    )


def workbook_xml(sheet_names: list[str]) -> str:
    sheets = []
    for idx, name in enumerate(sheet_names, start=1):
        sheets.append(
            f'<sheet name="{xml_text(name)}" sheetId="{idx}" r:id="rId{idx}"/>'
        )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f'<sheets>{"".join(sheets)}</sheets>'
        '</workbook>'
    )


def workbook_rels_xml(sheet_count: int) -> str:
    rels = []
    for idx in range(1, sheet_count + 1):
        rels.append(
            f'<Relationship Id="rId{idx}" '
            'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
            f'Target="worksheets/sheet{idx}.xml"/>'
        )
    rels.append(
        f'<Relationship Id="rId{sheet_count + 1}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" '
        'Target="styles.xml"/>'
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        f'{"".join(rels)}'
        '</Relationships>'
    )


def content_types_xml(sheet_count: int) -> str:
    overrides = [
        '<Override PartName="/xl/workbook.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
        '<Override PartName="/docProps/core.xml" '
        'ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>',
        '<Override PartName="/docProps/app.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>',
    ]
    for idx in range(1, sheet_count + 1):
        overrides.append(
            f'<Override PartName="/xl/worksheets/sheet{idx}.xml" '
            'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        f'{"".join(overrides)}'
        '</Types>'
    )


def root_rels_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
        'Target="xl/workbook.xml"/>'
        '<Relationship Id="rId2" '
        'Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" '
        'Target="docProps/core.xml"/>'
        '<Relationship Id="rId3" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" '
        'Target="docProps/app.xml"/>'
        '</Relationships>'
    )


def styles_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>'
        '<fills count="1"><fill><patternFill patternType="none"/></fill></fills>'
        '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        '<cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>'
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
        '</styleSheet>'
    )


def core_xml() -> str:
    now = dt.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:dcterms="http://purl.org/dc/terms/" '
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        '<dc:title>Electricity Bill Extraction</dc:title>'
        '<dc:creator>Codex</dc:creator>'
        '<cp:lastModifiedBy>Codex</cp:lastModifiedBy>'
        f'<dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created>'
        f'<dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified>'
        '</cp:coreProperties>'
    )


def app_xml(sheet_names: list[str]) -> str:
    titles = "".join(f"<vt:lpstr>{xml_text(name)}</vt:lpstr>" for name in sheet_names)
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
        '<Application>Microsoft Excel</Application>'
        f'<TitlesOfParts><vt:vector size="{len(sheet_names)}" baseType="lpstr">{titles}</vt:vector></TitlesOfParts>'
        '</Properties>'
    )


def write_csv(path: Path, rows: list[dict[str, object]]) -> None:
    headers = list(rows[0].keys())
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)


def write_xlsx(path: Path) -> None:
    sheet_specs = [
        ("Monthly Summary", SUMMARY_ROWS, list(SUMMARY_ROWS[0].keys())),
        ("Source Documents", SOURCE_ROWS, list(SOURCE_ROWS[0].keys())),
        ("README", README_ROWS, list(README_ROWS[0].keys())),
    ]
    sheet_names = [name for name, _, _ in sheet_specs]

    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types_xml(len(sheet_specs)))
        zf.writestr("_rels/.rels", root_rels_xml())
        zf.writestr("xl/workbook.xml", workbook_xml(sheet_names))
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml(len(sheet_specs)))
        zf.writestr("xl/styles.xml", styles_xml())
        zf.writestr("docProps/core.xml", core_xml())
        zf.writestr("docProps/app.xml", app_xml(sheet_names))

        for idx, (_, rows, headers) in enumerate(sheet_specs, start=1):
            zf.writestr(f"xl/worksheets/sheet{idx}.xml", sheet_xml(rows, headers))


def main() -> None:
    base = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main")
    xlsx_path = base / "electricity_data_extracted.xlsx"
    csv_path = base / "electricity_monthly_summary.csv"
    write_xlsx(xlsx_path)
    write_csv(csv_path, SUMMARY_ROWS)
    print(xlsx_path)
    print(csv_path)


if __name__ == "__main__":
    main()

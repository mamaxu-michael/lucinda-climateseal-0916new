from __future__ import annotations

import json
import re
from pathlib import Path


SRC = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_english_translation.md")
OUT = Path("/Users/lucindaliu/Downloads/lucinda-climateseal-0916new-main/business_plan_0419_english_translation.json")


def clean_text(text: str) -> str:
    text = text.strip()
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def parse_markdown(md: str) -> list[dict[str, str]]:
    parts = re.split(r"^## Slide \d+\s*$", md, flags=re.M)
    headings = re.findall(r"^## Slide (\d+)\s*$", md, flags=re.M)
    slides: list[dict[str, str]] = []

    for idx, body in enumerate(parts[1:]):
        slide_no = int(headings[idx])
        lines = [line.rstrip() for line in body.strip().splitlines()]
        title = ""
        body_lines: list[str] = []

        for line in lines:
            if not title and line.startswith("**") and line.endswith("**"):
                title = line.strip("*").strip()
                continue
            body_lines.append(line)

        if not title:
            title = f"Slide {slide_no}"

        body = clean_text("\n".join(body_lines))
        slides.append({"number": slide_no, "title": title, "body": body})

    return slides


def main() -> None:
    md = SRC.read_text(encoding="utf-8")
    slides = parse_markdown(md)
    OUT.write_text(json.dumps({"slides": slides}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(OUT)


if __name__ == "__main__":
    main()

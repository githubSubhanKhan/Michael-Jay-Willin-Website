#!/usr/bin/env python3
"""
Resizes and compresses the landing page images for fast loading.

Setup (once):  pip install Pillow
Run:           cd images && python optimize_images.py

Shrinks each source PNG to the size it actually displays at on screen,
then saves it as a compressed JPEG (quality 78) and deletes the original
PNG. A typical 5-7MB source photo comes out to roughly 100-350KB with no
visible quality loss at normal viewing sizes.
"""
from PIL import Image
import os

# source filename -> max width in pixels (matches how large each image ever displays)
TARGETS = {
    "hero.png": 1920,       # full-bleed hero, widest image on the page
    "about.png": 900,
    "colonial.png": 900,
    "georgian.png": 900,
    "french.png": 900,
    "tudor.png": 900,
    "craftsman.png": 900,
}

total_before = 0
total_after = 0

for name, max_width in TARGETS.items():
    if not os.path.exists(name):
        print(f"skip {name} (not found)")
        continue

    before = os.path.getsize(name)
    img = Image.open(name).convert("RGB")
    if img.width > max_width:
        ratio = max_width / img.width
        img = img.resize((max_width, round(img.height * ratio)), Image.LANCZOS)

    jpg_name = os.path.splitext(name)[0] + ".jpg"
    img.save(jpg_name, "JPEG", quality=78, optimize=True, progressive=True)
    after = os.path.getsize(jpg_name)

    os.remove(name)

    total_before += before
    total_after += after
    print(f"{name}: {before/1024:.0f}KB -> {jpg_name}: {after/1024:.0f}KB [{img.width}x{img.height}]")

print(f"\nTotal: {total_before/1024:.0f}KB -> {total_after/1024:.0f}KB")
print("Done. Update any .png references to .jpg in index.html/script.js, commit, and push.")

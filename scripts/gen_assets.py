#!/usr/bin/env python3
"""
Generate local placeholder assets for the ell. portfolio site.
Editorial placeholder system: warm cream / pure black / electric blue.
Outputs to /home/z/my-project/public/assets/...
"""
import os
import math
import random
import subprocess
from PIL import Image, ImageDraw, ImageFont

BASE = "/home/z/my-project/public/assets"
PROJ = f"{BASE}/images/projects"
PROFILE = f"{BASE}/images/profile"
VID = f"{BASE}/videos"
TMP = "/tmp/ell_frames"

CREAM = (243, 239, 230)
CREAM2 = (236, 231, 218)
PAPER = (250, 247, 240)
INK = (20, 20, 18)
BLUE = (46, 75, 255)
MUTED = (138, 132, 116)
LINE = (180, 175, 162)

F = "/usr/share/fonts/truetype"


def font(path, size):
    return ImageFont.truetype(path, size)


def pick(*paths):
    for p in paths:
        if os.path.exists(p):
            return p
    raise FileNotFoundError(paths)


SERIF_B = pick(f"{F}/dejavu/DejaVuSerif-Bold.ttf")
SERIF_I = pick(f"{F}/liberation/LiberationSerif-Italic.ttf", f"{F}/dejavu/DejaVuSerif-Italic.ttf")
SANS = pick(f"{F}/dejavu/DejaVuSans.ttf")
SANS_B = pick(f"{F}/dejavu/DejaVuSans-Bold.ttf")
MONO = pick(f"{F}/dejavu/DejaVuSansMono.ttf")


def canvas(w, h, color=CREAM):
    img = Image.new("RGB", (w, h), color)
    return img, ImageDraw.Draw(img)


def hairlines(d, w, h, n_v=3, n_h=2):
    for i in range(1, n_v + 1):
        x = w * i / (n_v + 1)
        d.line([(x, 0), (x, h)], fill=LINE, width=1)
    for i in range(1, n_h + 1):
        y = h * i / (n_h + 1)
        d.line([(0, y), (w, y)], fill=LINE, width=1)


def crop_marks(d, w, h, pad=28, ln=26, color=INK):
    for cx, cy, dx, dy in [(pad, pad, 1, 1), (w - pad, pad, -1, 1), (pad, h - pad, 1, -1), (w - pad, h - pad, -1, -1)]:
        d.line([(cx - dx * ln, cy), (cx, cy)], fill=color, width=2)
        d.line([(cx, cy - dy * ln), (cx, cy)], fill=color, width=2)


def label(d, xy, text, size=22, color=INK, anchor="la", font_path=None):
    f = font(font_path or SANS_B, size)
    d.text(xy, text, font=f, fill=color, anchor=anchor)


def wordmark(d, xy, size=34, color=INK, anchor="ra"):
    f = font(SERIF_B, size)
    d.text(xy, "ell", font=f, fill=color, anchor=anchor)
    x0, y0, x1, y1 = d.textbbox(xy, "ell", font=f, anchor=anchor)
    d.ellipse([x1 + 6, y1 - 9, x1 + 6 + 13, y1 + 4], fill=BLUE)


def grain(img, seed=1, n=500, alpha=26):
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    rng = random.Random(seed)
    w, h = img.size
    for _ in range(n):
        x, y = rng.randint(0, w - 2), rng.randint(0, h - 2)
        d.point((x, y), fill=(20, 20, 18, alpha))
    img.paste(ov, (0, 0), ov)


def save(img, path, quality=88):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if path.endswith(".webp"):
        img.save(path, "WEBP", quality=quality, method=6)
    else:
        img.save(path, "JPEG", quality=quality, optimize=True)
    print("saved", path, os.path.getsize(path) // 1024, "KB")


# ---------------------------------------------------------------- covers

def cover_01():  # Graphic design - landscape, big circle
    w, h = 1600, 1200
    img, d = canvas(w, h)
    hairlines(d, w, h)
    cx, cy, r = int(w * 0.62), int(h * 0.52), 330
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=INK)
    d.ellipse([cx - r - 70, cy - r - 70, cx + r + 70, cy + r + 70], outline=BLUE, width=3)
    d.polygon([(cx, cy), (cx + r, cy), (cx, cy + r)], fill=CREAM)
    d.text((cx + 60, cy - 40), "N°01", font=font(SERIF_B, 72), fill=CREAM, anchor="mm")
    d.rectangle([120, h - 190, 260, h - 160], fill=BLUE)
    d.text((120, h - 150), "MONOCHROME / TYPE / RHYTHM", font=font(SANS, 24), fill=INK)
    label(d, (120, 64), "PROJECT 01 — GRAPHIC DESIGN", 26)
    wordmark(d, (w - 64, h - 64), 40)
    grain(img, 7, 600)
    save(img, f"{PROJ}/p1.webp")


def cover_02():  # Brand identity - portrait, letterform
    w, h = 1200, 1600
    img, d = canvas(w, h, PAPER)
    d.rectangle([70, 70, w - 70, h - 70], outline=INK, width=2)
    d.text((w * 0.5 - 40, h * 0.44), "K", font=font(SERIF_B, 560), fill=INK, anchor="mm")
    d.ellipse([w * 0.5 + 130, h * 0.44 + 130, w * 0.5 + 230, h * 0.44 + 230], fill=BLUE)
    d.text((140, h * 0.68), "Arom Kopi", font=font(SERIF_I, 120), fill=INK, anchor="lm")
    d.text((142, h * 0.68 + 90), "— CONCEPT IDENTITY", font=font(SANS_B, 30), fill=MUTED, anchor="lm")
    d.text((142, h * 0.68 + 150), "WORDMARK / CUP / STICKER / SIGN", font=font(SANS, 24), fill=INK)
    label(d, (142, 142), "PROJECT 02 — BRAND IDENTITY", 26)
    wordmark(d, (w - 140, h - 140), 40)
    crop_marks(d, w, h, 46, 30)
    grain(img, 11, 500)
    save(img, f"{PROJ}/p2.webp")


def cover_03():  # Social media kit - square grid
    w, h = 1400, 1400
    img, d = canvas(w, h)
    gx, gy, gap, n = 190, 190, 22, 3
    cell = (w - 2 * gx - (n - 1) * gap) // n
    glyphs = ["A", "B", "C", "1", "2", "3", "x", "y", "z"]
    rng = random.Random(3)
    blue_cell = rng.randint(0, 8)
    for i in range(n):
        for j in range(n):
            k = i * n + j
            x, y = gx + j * (cell + gap), gy + i * (cell + gap)
            if k == blue_cell:
                d.rectangle([x, y, x + cell, y + cell], fill=BLUE)
                d.text((x + cell / 2, y + cell / 2), glyphs[k], font=font(SERIF_I, 150), fill=CREAM, anchor="mm")
            else:
                fill = INK if (i + j) % 2 == 0 else CREAM2
                d.rectangle([x, y, x + cell, y + cell], fill=fill)
                if fill == CREAM2:
                    d.text((x + cell / 2, y + cell / 2), glyphs[k], font=font(SERIF_B, 150), fill=INK, anchor="mm")
                else:
                    d.text((x + cell / 2, y + cell / 2), glyphs[k], font=font(SERIF_I, 150), fill=CREAM, anchor="mm")
    label(d, (190, 84), "PROJECT 03 — SOCIAL MEDIA KIT", 26)
    d.text((190, w - 150), "9 TILES / 1 TEMPLATE / 1 FEED", font=font(SANS, 26), fill=INK)
    wordmark(d, (w - 190, w - 90), 40)
    grain(img, 13, 550)
    save(img, f"{PROJ}/p3.webp")


def cover_04():  # Launch carousel - portrait phone frame
    w, h = 1200, 1600
    img, d = canvas(w, h, CREAM2)
    fx, fy, fw, fh = w * 0.22, h * 0.16, w * 0.56, h * 0.6
    d.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=48, outline=INK, width=4)
    d.rounded_rectangle([fx + 18, fy + 18, fx + fw - 18, fy + fh - 18], radius=36, fill=PAPER)
    d.text((fx + fw / 2, fy + fh * 0.30), "01", font=font(SERIF_B, 130), fill=INK, anchor="mm")
    d.text((fx + fw / 2, fy + fh * 0.30 + 130), "/ 03", font=font(SERIF_I, 56), fill=BLUE, anchor="mm")
    d.text((fx + fw / 2, fy + fh * 0.62), "HOOK — DETAIL — CTA", font=font(SANS_B, 28), fill=INK, anchor="mm")
    for i in range(3):
        cx = fx + fw / 2 - 44 + i * 44
        color = BLUE if i == 0 else INK
        r = 9 if i == 0 else 7
        d.ellipse([cx - r, fy + fh * 0.80 - r, cx + r, fy + fh * 0.80 + r], fill=color)
    d.text((w / 2, h * 0.84), "SWIPE  →", font=font(SANS_B, 40), fill=INK, anchor="mm")
    label(d, (120, 96), "PROJECT 04 — LAUNCH CAROUSEL", 26)
    wordmark(d, (w - 120, h - 120), 40)
    grain(img, 17, 450)
    save(img, f"{PROJ}/p4.webp")


def cover_05():  # Short-form reel - filmstrip
    w, h = 1600, 1000
    img, d = canvas(w, h, INK)
    d.rectangle([90, 70, w - 90, h - 70], outline=CREAM, width=3)
    for x in range(140, w - 120, 90):
        d.rounded_rectangle([x, 110, x + 44, 150], radius=8, fill=CREAM)
        d.rounded_rectangle([x, h - 150, x + 44, h - 110], radius=8, fill=CREAM)
    fw, fh = 360, 620
    xs = [w / 2 - fw / 2 - fw - 40, w / 2 - fw / 2, w / 2 + fw / 2 + 40]
    for i, x in enumerate(xs):
        y = (h - fh) / 2
        if i == 1:
            d.rectangle([x, y, x + fw, y + fh], fill=CREAM)
            d.ellipse([x + fw / 2 - 52, y + fh / 2 - 52, x + fw / 2 + 52, y + fh / 2 + 52], fill=BLUE)
            d.polygon([(x + fw / 2 - 14, y + fh / 2 - 26), (x + fw / 2 - 14, y + fh / 2 + 26), (x + fw / 2 + 30, y + fh / 2)], fill=CREAM)
        else:
            d.rectangle([x, y, x + fw, y + fh], outline=CREAM, width=2)
            for k in range(1, 6):
                yy = y + fh * k / 6
                d.line([(x, yy), (x + fw, yy)], fill=(70, 70, 66), width=2)
    d.text((120, h - 46), "REEL — 9:16 — SOUND OFF", font=font(MONO, 30), fill=CREAM, anchor="lm")
    d.text((120, 46), "PROJECT 05 — SHORT-FORM REEL", font=font(SANS_B, 30), fill=CREAM, anchor="lm")
    wordmark(d, (w - 110, h - 46), 40, CREAM)
    grain(img, 23, 700)
    save(img, f"{PROJ}/p5.webp")


def cover_06():  # Event recap - timeline
    w, h = 1600, 1000
    img, d = canvas(w, h)
    ruler_y = 150
    d.line([(90, ruler_y), (w - 90, ruler_y)], fill=INK, width=3)
    for i in range(7):
        x = 90 + (w - 180) * i / 6
        d.line([(x, ruler_y - 16), (x, ruler_y + 16)], fill=INK, width=3)
        d.text((x, ruler_y - 46), f"00:0{i}", font=font(MONO, 26), fill=INK, anchor="mm")
    tracks = [(0.36, 3), (0.52, 4), (0.68, 2)]
    rng = random.Random(6)
    for ty, n in tracks:
        y = h * ty
        d.line([(90, y), (w - 90, y)], fill=LINE, width=2)
        x = 120
        for k in range(n):
            bw = rng.randint(180, 340)
            color = [INK, BLUE, CREAM2][k % 3]
            if color == CREAM2:
                d.rectangle([x, y - 46, x + bw, y + 46], fill=CREAM2, outline=INK, width=3)
            else:
                d.rectangle([x, y - 46, x + bw, y + 46], fill=color)
            x += bw + 26
            if x > w - 220:
                break
    d.text((90, h - 110), "CUT / GRADE / PACE", font=font(SERIF_I, 64), fill=INK)
    label(d, (90, 60), "PROJECT 06 — EVENT RECAP", 26)
    wordmark(d, (w - 90, h - 60), 40)
    grain(img, 29, 550)
    save(img, f"{PROJ}/p6.webp")


def cover_07():  # Street photography - tall, overlapping circles
    w, h = 1200, 1800
    img, d = canvas(w, h, CREAM)
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    rng = random.Random(9)
    for i in range(9):
        r = rng.randint(120, 300)
        x = rng.randint(150, w - 150)
        y = rng.randint(150, h - 150)
        a = rng.randint(40, 90)
        od.ellipse([x - r, y - r, x + r, y + r], fill=(20, 20, 18, a))
    img.paste(ov, (0, 0), ov)
    d = ImageDraw.Draw(img)
    d.rectangle([100, 100, w - 100, h - 100], outline=INK, width=2)
    d.rectangle([w * 0.5 - 260, h * 0.42, w * 0.5 + 260, h * 0.42 + 400], outline=INK, width=3)
    d.line([(w * 0.5, h * 0.42), (w * 0.5, h * 0.42 + 400)], fill=INK, width=2)
    d.line([(w * 0.5 - 260, h * 0.42 + 200), (w * 0.5 + 260, h * 0.42 + 200)], fill=INK, width=2)
    d.ellipse([w * 0.5 - 70, h * 0.42 + 130, w * 0.5 + 70, h * 0.42 + 270], fill=BLUE)
    label(d, (130, 140), "PROJECT 07 — STREET SERIES", 26)
    f_v = font(SANS_B, 30)
    tx = w - 150
    for i, ch in enumerate("35MM — NEAR MONO"):
        d.text((tx, 180 + i * 40), ch, font=f_v, fill=INK)
    d.text((130, h - 170), "FRAMES 01–09 / LAYERED SHADOWS", font=font(SANS, 24), fill=INK)
    wordmark(d, (w - 130, h - 110), 40)
    grain(img, 31, 1400, 34)
    save(img, f"{PROJ}/p7.webp")


def cover_08():  # Studio product - square pedestal
    w, h = 1400, 1400
    img, d = canvas(w, h, PAPER)
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    od.polygon([(w * 0.5, 0), (w * 0.5 + 420, h * 0.62), (w * 0.5 - 420, h * 0.62)], fill=(20, 20, 18, 22))
    img.paste(ov, (0, 0), ov)
    d = ImageDraw.Draw(img)
    base = h * 0.72
    d.line([(w * 0.16, base), (w * 0.84, base)], fill=INK, width=4)
    d.rectangle([w * 0.5 - 210, base - 46, w * 0.5 + 210, base], fill=CREAM2, outline=INK, width=3)
    d.ellipse([w * 0.5 - 120, base - 346, w * 0.5 + 120, base - 106], fill=INK)
    d.ellipse([w * 0.5 + 60, base - 306, w * 0.5 + 116, base - 250], fill=BLUE)
    d.line([(0, base + 90), (w, base + 90)], fill=LINE, width=2)
    d.text((w * 0.16, base + 120), "OBJECT — 01", font=font(SANS_B, 30), fill=INK)
    d.text((w * 0.84, base + 120), "1 LIGHT / 1 BACKDROP", font=font(SANS, 26), fill=INK, anchor="ra")
    label(d, (140, 130), "PROJECT 08 — STUDIO PRODUCT", 26)
    wordmark(d, (w - 140, h - 130), 40)
    crop_marks(d, w, h, 60, 34)
    grain(img, 37, 500)
    save(img, f"{PROJ}/p8.webp")


def portrait():
    w, h = 1200, 1500
    img, d = canvas(w, h, CREAM)
    d.rectangle([60, 60, w - 60, h - 60], outline=INK, width=3)
    # abstract silhouette: head + shoulders
    d.ellipse([w * 0.5 - 240, h * 0.16, w * 0.5 + 240, h * 0.16 + 520], fill=INK)
    d.rounded_rectangle([w * 0.5 - 430, h * 0.62, w * 0.5 + 430, h + 60], radius=220, fill=INK)
    d.ellipse([w * 0.5 + 150, h * 0.30, w * 0.5 + 260, h * 0.30 + 110], fill=BLUE)
    d.text((130, h - 260), "PORTRAIT", font=font(SERIF_I, 110), fill=CREAM, anchor="lm")
    d.text((134, h - 130), "REPLACE THIS FILE — assets/images/profile/portrait.webp", font=font(SANS, 24), fill=CREAM)
    label(d, (130, 130), "PROFILE PHOTO — 4:5", 26)
    wordmark(d, (w - 130, 160), 44)
    grain(img, 41, 700)
    save(img, f"{PROFILE}/portrait.webp")


def og_image():
    w, h = 1200, 630
    img, d = canvas(w, h, INK)
    d.text((90, 190), "ell", font=font(SERIF_B, 260), fill=CREAM, anchor="lm")
    bb = d.textbbox((90, 190), "ell", font=font(SERIF_B, 260), anchor="lm")
    d.ellipse([bb[2] + 18, bb[3] - 44, bb[2] + 74, bb[3] + 12], fill=BLUE)
    d.line([(90, 420), (w - 90, 420)], fill=(90, 90, 84), width=2)
    d.text((90, 470), "RAFAEL DAMANIK", font=font(SANS_B, 40), fill=CREAM)
    d.text((90, 530), "GRAPHIC DESIGNER & VIDEO EDITOR", font=font(SANS, 30), fill=(160, 158, 148))
    d.text((w - 90, 470), "PORTFOLIO", font=font(SANS_B, 30), fill=BLUE, anchor="ra")
    grain(img, 43, 600)
    save(img, f"{BASE}/images/og-image.jpg", 85)


def apple_icon():
    w = 180
    img, d = canvas(w, w, INK)
    d.text((w * 0.5 - 22, w * 0.5), "ell", font=font(SERIF_B, 64), fill=CREAM, anchor="lm")
    d.ellipse([w * 0.5 + 22, w * 0.5 + 8, w * 0.5 + 34, w * 0.5 + 20], fill=BLUE)
    save(img, f"{BASE}/images/apple-touch-icon.png")


# ---------------------------------------------------------------- videos

def make_video(name, w, h, frames, fps, draw_frame):
    os.makedirs(TMP, exist_ok=True)
    for i in range(frames):
        img = Image.new("RGB", (w, h), CREAM)
        d = ImageDraw.Draw(img)
        draw_frame(d, i, w, h)
        grain(img, 100 + i, 300, 18)
        img.save(f"{TMP}/{name}_{i:04d}.png")
    out = f"{VID}/{name}.mp4"
    os.makedirs(VID, exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-y", "-framerate", str(fps), "-i", f"{TMP}/{name}_%04d.png",
         "-c:v", "libx264", "-preset", "veryfast", "-crf", "30", "-pix_fmt", "yuv420p",
         "-movflags", "+faststart", "-an", out],
        check=True, capture_output=True,
    )
    for i in range(frames):
        os.remove(f"{TMP}/{name}_{i:04d}.png")
    print("saved", out, os.path.getsize(out) // 1024, "KB")


def reel_frame(d, i, w, h):
    n = 84
    t = i / n
    # sweeping ink band
    band_h = 120
    y = int((h + band_h) * ((i * 1.6) % n) / n) - band_h
    d.rectangle([0, y, w, y + band_h], fill=INK)
    d.text((24, y + band_h / 2), "SAMPLE  REEL", font=font(SERIF_I, 64), fill=CREAM, anchor="lm")
    # blue circle drifting
    cx = w / 2 + math.sin(i * 0.11) * w * 0.28
    cy = h * 0.42 + math.cos(i * 0.07) * h * 0.12
    r = 90 + math.sin(i * 0.15) * 26
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=BLUE)
    # timecode
    tc = f"00:00:{i // 24:02d}:{i % 24:02d}"
    d.text((24, 24), tc, font=font(MONO, 34), fill=INK)
    # rec dot blink
    if i % 12 < 6:
        d.ellipse([w - 64, 30, w - 40, 54], fill=BLUE)
    d.text((w - 76, 30), "REC", font=font(SANS_B, 26), fill=INK, anchor="ra")
    # progress bar
    d.line([(0, h - 14), (w, h - 14)], fill=LINE, width=6)
    d.line([(0, h - 14), (w * t, h - 14)], fill=INK, width=6)


def recap_frame(d, i, w, h):
    n = 96
    # two ink panels sliding opposite ways, blue flash between
    p1x = int(-w * 0.5 + (w * 1.2) * ((i * 1.1) % n) / n)
    d.rectangle([p1x, 0, p1x + int(w * 0.35), h], fill=INK)
    p2x = int(w - (w * 1.2) * ((i * 0.9 + 20) % n) / n)
    d.rectangle([p2x, 0, p2x + int(w * 0.3), h], fill=INK)
    if abs(p1x + w * 0.35 - p2x) < 60:
        d.rectangle([0, 0, w, h], fill=CREAM)
        d.rectangle([0, h * 0.42, w, h * 0.58], fill=BLUE)
    d.rectangle([0, 0, w, 70], fill=INK)
    d.text((24, 35), "EVENT RECAP — TIMELINE", font=font(SANS_B, 28), fill=CREAM, anchor="lm")
    d.text((w - 24, 35), f"00:0{i // 24:02d}", font=font(MONO, 30), fill=CREAM, anchor="rm")
    # letterbox bars
    d.rectangle([0, 0, w, 8], fill=INK)
    d.rectangle([0, h - 8, w, h], fill=INK)
    # bottom clip blocks
    x = 0
    k = 0
    while x < w:
        bw = 70 + (k * 37) % 120
        color = [BLUE, INK, CREAM2][k % 3]
        d.rectangle([x + 4, h - 58, min(x + bw, w - 4), h - 22], fill=color, outline=INK, width=2)
        x += bw
        k += 1


if __name__ == "__main__":
    cover_01()
    cover_02()
    cover_03()
    cover_04()
    cover_05()
    cover_06()
    cover_07()
    cover_08()
    portrait()
    og_image()
    apple_icon()
    make_video("reel-sample", 540, 960, 84, 24, reel_frame)
    make_video("recap-sample", 960, 540, 96, 24, recap_frame)
    print("DONE")

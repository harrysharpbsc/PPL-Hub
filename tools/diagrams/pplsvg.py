"""Shared PPL Hub SVG helpers (mirror src/labs80.js) and the mock-up page writer."""
import base64
from pathlib import Path

FONTS = Path(__file__).resolve().parents[2] / "tests" / "fonts"

TOKENS = """
:root{--bg:#F5F7F3;--surface:#FFFFFF;--surface-2:#E4EBD6;--ink:#16284A;--ink-2:#4F5D7A;--line:#D9DED6;
 --accent:#1E5FA6;--accent-soft:#E3ECF7;--bad:#B0302F;--good:#2E7A43;--mid:#A86F00;--warm:#A2186F;
 --ch-land:#f3efd9;--ch-tx:#5a5440;--ch-l2:#eadfb8;--rwy:#555c6b;--burst-r:#d33a2c;--burst-g:#2f9a4a}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0E1A2E;--surface:#15233B;--surface-2:#1C2C34;
 --ink:#E8EDF6;--ink-2:#A6B3CB;--line:#24344F;--accent:#82B4F0;--accent-soft:#1B3155;--bad:#FF8B84;--good:#6CCB86;
 --mid:#E8B04A;--warm:#F07ABF;--ch-land:#1a2230;--ch-tx:#a0a8b4;--ch-l2:#2a2d29;--burst-r:#ff6b5e;--burst-g:#5fd17c;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0E1A2E;--surface:#15233B;--surface-2:#1C2C34;--ink:#E8EDF6;--ink-2:#A6B3CB;--line:#24344F;
 --accent:#82B4F0;--accent-soft:#1B3155;--bad:#FF8B84;--good:#6CCB86;--mid:#E8B04A;--warm:#F07ABF;--ch-land:#1a2230;
 --ch-tx:#a0a8b4;--ch-l2:#2a2d29;--burst-r:#ff6b5e;--burst-g:#5fd17c;color-scheme:dark}
"""
def _app_chart_tokens():
    """The app's chart-paper colours (--ch-*), light and dark, read from src/hub.html so previews match the app."""
    import re
    hub = (Path(__file__).resolve().parents[2] / "src" / "hub.html").read_text()
    light = re.search(r':root\{(--ch-land:[^}]*)\}', hub).group(1)
    dark = re.search(r':root\[data-theme="dark"\]\{(--ch-land:[^}]*)\}', hub).group(1)
    return (f":root{{{light}}}\n@media (prefers-color-scheme:dark){{:root:not([data-theme=\"light\"]){{{dark}}}}}\n"
            f":root[data-theme=\"dark\"]{{{dark}}}\n")


def _app_main_tokens():
    """The app's main colours and font stacks, light and dark, read from src/hub.html (first :root block)."""
    import re
    hub = (Path(__file__).resolve().parents[2] / "src" / "hub.html").read_text()
    light = re.search(r'\n:root\{([^}]*)\}', hub).group(1)
    dark = re.search(r':root\[data-theme="dark"\]\{(--bg:[^}]*)\}', hub).group(1)
    return (f":root{{{light}}}\n@media (prefers-color-scheme:dark){{:root:not([data-theme=\"light\"]){{{dark}}}}}\n"
            f":root[data-theme=\"dark\"]{{{dark}}}\n")


TOKENS += _app_main_tokens() + _app_chart_tokens()


SVGCSS = """
.ch-paper{fill:var(--ch-land)} .ch-pg{fill:none;stroke:var(--ch-tx);stroke-width:.4;opacity:.25}
.ch-tk{fill:none;stroke:var(--ch-tx);stroke-width:.7}
svg text{font-family:Barlow,system-ui,sans-serif}
svg text{paint-order:stroke;stroke:var(--ch-land);stroke-width:2.2px;stroke-linejoin:round}
svg text.n,svg text.mono,svg text.dk,svg text[font-family]{stroke:none}
text.d1{font-weight:600;font-size:10px;fill:var(--ink)}
text.d2{font-weight:500;font-size:7.8px;fill:var(--ink-2)}
text.d3{font-family:'Barlow Semi Condensed',Barlow,sans-serif;font-weight:700;font-size:12px;fill:var(--ink)}
text.n{font-weight:600;font-size:9px;fill:#fff}
text.mono{font-family:'Barlow Semi Condensed',Barlow,sans-serif;font-weight:700;font-size:11px;fill:var(--ink)}
tspan.b{font-weight:600;fill:var(--ink)}
text.h{font-weight:600;font-size:8px;fill:var(--bad)}
"""


def font_faces():
    out = []
    for fam, f, wt in [("Barlow", "barlow-latin-500-normal", 500), ("Barlow", "barlow-latin-600-normal", 600),
                       ("Barlow Semi Condensed", "barlow-semi-condensed-latin-700-normal", 700)]:
        b64 = base64.b64encode((FONTS / f"{f}.woff2").read_bytes()).decode()
        out.append(f"@font-face{{font-family:'{fam}';font-weight:{wt};src:url(data:font/woff2;base64,{b64}) format('woff2')}}")
    return "".join(out)


# ---- helpers mirroring src/labs80.js (dzT, dzL, dzB, chartPaper, dzP, dzSide) ------------------
def T(x, y, s, c="d2", a=None, extra=""):
    return f'<text x="{x}" y="{y}" class="{c}"' + (f' text-anchor="{a}"' if a else "") + f"{extra}>{s}</text>"


def lines(x, y, rows, c="d2", dy=10.5):
    """Multi-line text; a row may start with 'Bold: ' which is set in ink semibold."""
    out = []
    for i, r in enumerate(rows):
        if ": " in r and r.split(": ")[0] in ("Interceptor", "You", "Both"):
            h, t = r.split(": ", 1)
            r = f'<tspan class="b">{h}:</tspan> {t}'
        out.append(T(x, y + i * dy, r, c))
    return "".join(out)


def L(d, c="var(--ink)", w=1.4, dash=None, f="none", extra=""):
    return f'<path d="{d}" stroke="{c}" stroke-width="{w}" fill="{f}"' + (f' stroke-dasharray="{dash}"' if dash else "") + f"{extra}/>"


def B(x, y, w, h, fill="var(--surface)", stroke="var(--line)", r=4, sw=1, dash=None):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"'
            + (f' stroke-dasharray="{dash}"' if dash else "") + "/>")


def paper(w, h):
    g = "".join(f"M{i} 0V{h}" for i in range(20, w, 20)) + "".join(f"M0 {i}H{w}" for i in range(20, h, 20))
    t = "".join(f"M{i} 0v{6 if i % 50 == 0 else 3}M{i} {h}v-{6 if i % 50 == 0 else 3}" for i in range(0, w + 1, 10))
    t += "".join(f"M0 {i}h{6 if i % 50 == 0 else 3}M{w} {i}h-{6 if i % 50 == 0 else 3}" for i in range(0, h + 1, 10))
    return f'<rect width="{w}" height="{h}" class="ch-paper" rx="6"/><path class="ch-pg" d="{g}"/><path class="ch-tk" d="{t}"/>'


def badge(x, y, n, col="var(--bad)", r=9):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{col}"/>' + T(x, y + 3.2, n, "n", "middle")


def head(x, y, ang, col, s=4.5):
    """Arrowhead at (x,y) pointing at angle ang (degrees, 0 = east, 90 = south)."""
    return f'<path d="M0 0L{-2*s} {-s}L{-2*s} {s}Z" fill="{col}" transform="translate({x} {y}) rotate({ang})"/>'


ACPATH = ('M0 -10.2L1.15 -9.9L1.7 -8.2L1.75 -5.6L10.1 -5.1L10.4 -4.3L10.3 -2.3L1.7 -1.9L1.45 5.2L1 7.1L4.7 7.4'
          'L4.9 8L4.8 9.4L0.6 9.6L0 10.4L-0.6 9.6L-4.8 9.4L-4.9 8L-4.7 7.4L-1 7.1L-1.45 5.2L-1.7 -1.9L-10.3 -2.3'
          'L-10.4 -4.3L-10.1 -5.1L-1.75 -5.6L-1.7 -8.2L-1.15 -9.9ZM-3.4 -10.9H3.4V-10.4H-3.4Z')


def P(x, y, hdg=0, col="var(--accent)", sc=1.0):
    return (f'<g transform="translate({x} {y}) rotate({hdg}) scale({sc})"><path d="{ACPATH}" fill="{col}" '
            'stroke="var(--surface)" stroke-width=".6" stroke-linejoin="round"/></g>')


def side(x, y, sc, col="var(--accent)", flip=False):
    w = "var(--surface)"
    return (f'<g transform="translate({x} {y}) scale({-sc if flip else sc} {sc})">'
            f'<path d="M16.6-6.7L27.4-15.8Q28.4-16.3 29.4-15.8L30.8-4Z" fill="{col}"/>'
            f'<path d="M23.5-3.1L33.6-2.7Q34.3-2.2 33.6-1.8L23.5-1.4Z" fill="{col}"/>'
            f'<path d="M-28.4-1.6C-28.4-3.2-27.5-4.2-26-4.5L-17-5.6L-13.4-6.1L-7.1-9.6C-5.6-10.1-3-10.2 0-10.2L6.5-10C8.5-9.8 9.8-9.1 11-8L27-4.6L31.6-3.8L31.7-2.6L26-1.6L12 0.6C5 1.8-2 2.6-8 2.8L-20 2.6C-24 2.4-26.5 1.6-27.5 0.6C-28.2 0-28.4-0.6-28.4-1.6Z" fill="{col}"/>'
            f'<path d="M-28.3-3.3Q-31.6-1.6-28.3 0.1Z" fill="{col}"/>'
            f'<path d="M-14.5 1.6Q-15.6 3.7-12.4 3.9L8.2 3.4Q10.2 3.1 10.2 1.6Z" fill="{col}"/>'
            f'<path d="M-29.5-1.8L-27.3-10.5Q-26.7-11.1-26.8-10.2L-28.9-1.4ZM-29.3-1.4L-31.6 7.3Q-32.2 7.9-32.1 7L-30.1-1.8Z" fill="{col}"/>'
            f'<path d="M-12.1-6.3L-7.3-9.1H-5.4V-6.3Z" fill="{w}" opacity=".85"/><rect x="-4.2" y="-9.1" width="6" height="2.8" rx=".6" fill="{w}" opacity=".85"/>'
            f'<path d="M3-9.1H6.2C8-9 9-8.5 9.8-7.7L9.2-6.3H3Z" fill="{w}" opacity=".85"/></g>')


def rock(x, y, col):
    """Small 'rocking wings' marks either side of a plan-view aircraft."""
    return (L(f"M{x-15} {y-6}q-3 4 0 8", col, 1.1) + L(f"M{x+15} {y-6}q3 4 0 8", col, 1.1))




def page(path, figs, eyebrow, h1, intro, title, extra=""):
    ff = font_faces()
    cards = "".join(
        f'<section><p class="where">Note section · {sec}</p><figure class="dg">{svg}'
        f'<figcaption><b>{t}</b>{cap}</figcaption></figure></section>' for slug, t, svg, cap, sec, w, h in figs)
    html = f"""<title>{title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Layout: one reading column of the app's figure cards, each tagged with the note section it would sit in. */
{ff}{TOKENS}
body{{background:var(--bg);color:var(--ink);font:400 16px/1.5 Barlow,system-ui,sans-serif;margin:0}}
main{{max-width:760px;margin:0 auto;padding-block:28px 48px;padding-left:max(16px,env(safe-area-inset-left,0px));
 padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:26px}}
header{{display:grid;gap:6px}}
.eyebrow{{font:700 .8rem 'Barlow Semi Condensed',Barlow,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}}
h1{{font:700 2.1rem/1.1 'Barlow Semi Condensed',Barlow,sans-serif;margin:0;text-wrap:balance}}
header p{{margin:0;max-width:65ch;color:var(--ink-2)}}
section{{display:grid;gap:8px}}
.where{{margin:0;font:700 .78rem 'Barlow Semi Condensed',Barlow,sans-serif;letter-spacing:.04em;color:var(--ink-2)}}
.dg{{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px}}
.dg svg{{width:100%;height:auto;display:block}}
.dg img{{width:100%;height:auto;display:block;border-radius:6px}}
.dg figcaption{{font-size:.84rem;color:var(--ink-2);margin-top:8px;line-height:1.45}}
.dg figcaption b{{display:block;color:var(--ink);font-size:.92rem}}
{SVGCSS}
</style>
<main>
<header><span class="eyebrow">{eyebrow}</span><h1>{h1}</h1><p>{intro}</p></header>
{cards}{extra}
</main>"""
    Path(path).write_text(html)
    for slug, t, svg, cap, sec, w, h in figs:
        (Path(path).parent / f"{slug}.svg").write_text(svg.replace(">", f"><defs><style>{ff}{TOKENS}{SVGCSS}</style></defs>", 1))


# ---------- The app's own helpers (src/labs80.js dzT, dzA, dzB, dzL, dzP, dzSide), output identical to the JS ----------
# Used by the figures ported from the hand-written labs8x.js code; new figures can use them too.
from decimal import ROUND_HALF_UP, Decimal  # noqa: E402
import math as _m  # noqa: E402
import re as _re  # noqa: E402


def _t(v):
    """JavaScript truthiness."""
    return not (v is None or v is False or v == 0 or v == "" or (isinstance(v, float) and v != v))


def js(v):
    """String(v) as JavaScript writes it."""
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, float):
        if v.is_integer() and abs(v) < 1e21:
            return str(int(v))
        r = repr(v)
        if "e" in r:
            r = format(Decimal(r), "f")
        return r
    return str(v)


def fixed(v, n=1):
    """Number.prototype.toFixed: exact value, halves rounded away from zero."""
    q = Decimal(v).quantize(Decimal(1).scaleb(-n), rounding=ROUND_HALF_UP)
    s = format(q, "f")
    return s


def dT(x, y, s, c=None, a=None, fs=None, fill=None):
    dk = _t(fill) and bool(_re.match(r"^#([9a-f7][0-9a-f]{2}|[9a-f7][0-9a-f]{5})$", str(fill), _re.I))
    out = f'<text x="{js(x)}" y="{js(y)}"' + (f' text-anchor="{js(a)}"' if _t(a) else "")
    out += f' class="{js(c) if _t(c) else "d1"}{" dk" if dk else ""}"'
    if _t(fs) or _t(fill):
        out += ' style="' + (f"font-size:{js(fs)}px;" if _t(fs) else "") + (f"fill:{js(fill)}" if _t(fill) else "") + '"'
    return out + f">{js(s)}</text>"


def dA(x1, y1, x2, y2, c=None, w=None, dash=None):
    c = c if _t(c) else "var(--ink)"; w = w if _t(w) else 1.6
    a = _m.atan2(y2 - y1, x2 - x1); Ln = 6 + w * 1.5
    hx = x2 - _m.cos(a) * Ln; hy = y2 - _m.sin(a) * Ln; px = _m.sin(a) * Ln * .45; py = -_m.cos(a) * Ln * .45
    return (f'<path d="M{fixed(x1)} {fixed(y1)}L{fixed(hx)} {fixed(hy)}" stroke="{c}" stroke-width="{js(w)}" fill="none"'
            + (f' stroke-dasharray="{js(dash)}"' if _t(dash) else "")
            + f'/><path d="M{fixed(x2)} {fixed(y2)}L{fixed(hx+px)} {fixed(hy+py)}L{fixed(hx-px)} {fixed(hy-py)}Z" fill="{c}"/>')


def dB(x, y, w, h, fill=None, stroke=None, r=None, sw=None):
    return (f'<rect x="{js(x)}" y="{js(y)}" width="{js(w)}" height="{js(h)}" rx="{js(4 if r is None else r)}" '
            f'fill="{js(fill) if _t(fill) else "var(--surface)"}" stroke="{js(stroke) if _t(stroke) else "var(--ink-2)"}" '
            f'stroke-width="{js(sw) if _t(sw) else 1}"/>')


def dL(d, c=None, w=None, dash=None, f=None):
    return (f'<path d="{js(d)}" stroke="{js(c) if _t(c) else "var(--ink)"}" stroke-width="{js(w) if _t(w) else 1.4}" '
            f'fill="{js(f) if _t(f) else "none"}"' + (f' stroke-dasharray="{js(dash)}"' if _t(dash) else "") + "/>")


def dP(x, y, h=None, col=None, sc=None):
    return (f'<g transform="translate({js(x)} {js(y)}) rotate({js(h) if _t(h) else 0}) scale({js(sc) if _t(sc) else 1.4})">'
            f'<path d="{ACPATH}" fill="{js(col) if _t(col) else "var(--accent)"}" stroke="var(--surface)" stroke-width=".6" '
            'stroke-linejoin="round"/></g>')


def dSide(x, y, sc, col=None, flip=None):
    col = js(col) if _t(col) else "var(--accent)"; w = "var(--surface)"
    return (f'<g transform="translate({js(x)} {js(y)}) scale({js(-sc) if _t(flip) else js(sc)} {js(sc)})">'
            f'<path d="M16.6-6.7L27.4-15.8Q28.4-16.3 29.4-15.8L30.8-4Z" fill="{col}"/>'
            f'<path d="M23.5-3.1L33.6-2.7Q34.3-2.2 33.6-1.8L23.5-1.4Z" fill="{col}"/>'
            f'<path d="M-28.4-1.6C-28.4-3.2-27.5-4.2-26-4.5L-17-5.6L-13.4-6.1L-7.1-9.6C-5.6-10.1-3-10.2 0-10.2L6.5-10C8.5-9.8 9.8-9.1 11-8L27-4.6L31.6-3.8L31.7-2.6L26-1.6L12 0.6C5 1.8-2 2.6-8 2.8L-20 2.6C-24 2.4-26.5 1.6-27.5 0.6C-28.2 0-28.4-0.6-28.4-1.6Z" fill="{col}"/>'
            f'<path d="M-28.3-3.3Q-31.6-1.6-28.3 0.1Z" fill="{col}"/>'
            f'<path d="M-14.5 1.6Q-15.6 3.7-12.4 3.9L8.2 3.4Q10.2 3.1 10.2 1.6Z" fill="{col}"/>'
            f'<path d="M-29.5-1.8L-27.3-10.5Q-26.7-11.1-26.8-10.2L-28.9-1.4ZM-29.3-1.4L-31.6 7.3Q-32.2 7.9-32.1 7L-30.1-1.8Z" fill="{col}"/>'
            f'<path d="M-12.1-6.3L-7.3-9.1H-5.4V-6.3Z" fill="{w}" opacity=".85"/><rect x="-4.2" y="-9.1" width="6" height="2.8" rx=".6" fill="{w}" opacity=".85"/><path d="M3-9.1H6.2C8-9 9-8.5 9.8-7.7L9.2-6.3H3Z" fill="{w}" opacity=".85"/>'
            f'<path d="M2-10.1L4.6-13.1M14-7.3L16.6-9.8" stroke="{col}" stroke-width=".55" stroke-linecap="round"/>'
            f'<path d="M-21.8 2.5L-21.3 5.4M-2 3.6L-1.7 5.4" stroke="{col}" stroke-width="1.1"/><circle cx="-21.3" cy="7.1" r="1.5" fill="var(--ink)"/><circle cx="-1.8" cy="7.3" r="1.7" fill="var(--ink)"/>'
            f'<path d="M-23.9 6.8Q-23.9 4.8-21.4 4.8L-19.2 5.4Q-18.4 6.3-19.2 7L-21.4 7.3Q-23.9 7.4-23.9 6.8ZM-4.6 7Q-4.6 4.8-1.8 4.8L1 5.4Q2 6.4 1 7.2L-1.8 7.6Q-4.6 7.7-4.6 7Z" fill="{col}"/></g>')

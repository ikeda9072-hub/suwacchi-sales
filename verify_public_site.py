from pathlib import Path


ROOT = Path(__file__).parent
PUBLIC = ROOT / "public"
HTML = (PUBLIC / "index.html").read_text(encoding="utf-8")
STAFF_HTML = (PUBLIC / "staff/index.html").read_text(encoding="utf-8")
JS = (PUBLIC / "demo.js").read_text(encoding="utf-8")
STAFF_JS = (PUBLIC / "staff/staff-demo.js").read_text(encoding="utf-8")
BLUEPRINT = (ROOT / "render.yaml").read_text(encoding="utf-8")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


require("体験用デモ" in HTML, "fixed demo label is missing")
for page_name, page in (("owner", HTML), ("staff", STAFF_HTML)):
    require("あなたを覚えて、" in page and "あなたを支える。" in page, f"brand catchcopy is missing: {page_name}")
    require("あなた専用AI相談アプリ" in page, f"service name is missing: {page_name}")
    require("いい会社は、" in page and "みんなでつくる。" in page, f"company philosophy is missing: {page_name}")
    for character in ("すわっち", "しおり", "みけ", "レイ"):
        require(character in page, f"character is missing from {page_name}: {character}")
    require("帰りに豆腐を買う" in page and "明日ゴミを出す" in page, f"daily memo examples are missing: {page_name}")
    require("何でも無制限に記憶するものではありません" in page, f"memory boundary is missing: {page_name}")
require("応募受付 準備中" in HTML, "application form must stay disabled")
require("application-form\" novalidate" not in HTML, "live application form must not be public")
require("fetch(" not in JS + STAFF_JS, "public demos must not make network requests")
require("/api/" not in JS + STAFF_JS and "supabase" not in (JS + STAFF_JS).lower(), "private API reference detected")
require("runtime: static" in BLUEPRINT, "Render service must be static")
require("staticPublishPath: ./public" in BLUEPRINT, "only public/ may be published")
require("connect-src 'none'" in BLUEPRINT and "form-action 'none'" in BLUEPRINT, "restrictive CSP is missing")
for asset in ("styles.css", "demo.js", "assets/icon-192.png", "assets/icon-512.png", "assets/apple-touch-icon.png", "assets/suwacchi-mascot.png", "assets/characters/shiori/wave.webp", "assets/characters/mike/smile.webp", "assets/characters/rei/book.webp"):
    require((PUBLIC / asset).is_file(), f"missing public asset: {asset}")

print("public sales site verification: OK")

from pathlib import Path


ROOT = Path(__file__).parent
PUBLIC = ROOT / "public"
HTML = (PUBLIC / "index.html").read_text(encoding="utf-8")
JS = (PUBLIC / "demo.js").read_text(encoding="utf-8")
BLUEPRINT = (ROOT / "render.yaml").read_text(encoding="utf-8")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


require("体験用デモ" in HTML, "fixed demo label is missing")
require("応募受付 準備中" in HTML, "application form must stay disabled")
require("application-form\" novalidate" not in HTML, "live application form must not be public")
require("fetch(" not in JS, "public demo must not make network requests")
require("/api/" not in JS and "supabase" not in JS.lower(), "private API reference detected")
require("runtime: static" in BLUEPRINT, "Render service must be static")
require("staticPublishPath: ./public" in BLUEPRINT, "only public/ may be published")
require("connect-src 'none'" in BLUEPRINT and "form-action 'none'" in BLUEPRINT, "restrictive CSP is missing")
for asset in ("styles.css", "demo.js", "assets/icon-192.png", "assets/icon-512.png", "assets/apple-touch-icon.png", "assets/suwacchi-mascot.png"):
    require((PUBLIC / asset).is_file(), f"missing public asset: {asset}")

print("public sales site verification: OK")

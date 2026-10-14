from pathlib import Path
import re


ROOT = Path(__file__).parent
PUBLIC = ROOT / "public"
HTML = (PUBLIC / "index.html").read_text(encoding="utf-8")
STAFF_HTML = (PUBLIC / "staff/index.html").read_text(encoding="utf-8")
HTML_TEXT = re.sub(r"<[^>]*>", "", HTML)
STAFF_HTML_TEXT = re.sub(r"<[^>]*>", "", STAFF_HTML)
JS = (PUBLIC / "demo.js").read_text(encoding="utf-8")
STAFF_JS = (PUBLIC / "staff/staff-demo.js").read_text(encoding="utf-8")
BLUEPRINT = (ROOT / "render.yaml").read_text(encoding="utf-8")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


require("体験用デモ" in HTML_TEXT, "fixed demo label is missing")
for page_name, page in (("owner", HTML_TEXT), ("staff", STAFF_HTML_TEXT)):
    require("あなた専用AI相談アプリ" in page, f"service name is missing: {page_name}")
    require("いい会社は、" in page and "みんなでつくる。" in page, f"company philosophy is missing: {page_name}")
    for character in ("すわっち", "しおり", "みけ", "レイ"):
        require(character in page, f"character is missing from {page_name}: {character}")
    require("帰りに豆腐を買う" in page and "明日ゴミを出す" in page, f"daily memo examples are missing: {page_name}")
    require("何でも無制限に記憶するものではありません" in page, f"memory boundary is missing: {page_name}")
require("応募受付 準備中" in HTML_TEXT, "application form must stay disabled")
require("application-form\" novalidate" not in HTML, "live application form must not be public")
require("ひとりで抱えない社長へ。" in HTML_TEXT, "owner-first hero is missing")
require("5〜20名ほどの会社向け" in HTML_TEXT, "target company size is missing")
require("無料体験を事前登録する" in HTML_TEXT, "pre-registration CTA is missing")
require("使うかどうかは自由です" in STAFF_HTML_TEXT, "optional-use guidance is missing")
for page_name, page in (("owner", HTML_TEXT), ("staff", STAFF_HTML_TEXT)):
    require("見えるもの・見えないもの" in page, f"visibility boundary is missing: {page_name}")
    require("自動通知や即時対応は行いません" in page, f"no automatic emergency response warning is missing: {page_name}")
    require("ヘルプの利用回数・カテゴリ・緊急度・本文" in page, f"help report exclusion is missing: {page_name}")
require("ご意見ポスト" not in HTML_TEXT + STAFF_HTML_TEXT, "retired opinion-post copy remains")
require("demo-opinion" not in HTML + JS and "staff-opinion" not in STAFF_HTML + STAFF_JS, "retired opinion demo remains")
require("経営者の方はこちら" not in STAFF_HTML_TEXT, "owner link must not appear in the staff header")
require("企業・店舗への導入をお考えの方へ" in STAFF_HTML_TEXT, "discreet owner link is missing from the staff footer")
require("毎日に、もっと" in STAFF_HTML_TEXT and "便利と安心を。" in STAFF_HTML_TEXT, "daily-use heading is missing")
require("気になること、" in STAFF_HTML_TEXT and "何でも話してね。" in STAFF_HTML_TEXT, "consultation heading is missing")
require("社長にも、ホッと話せる場所を。" in HTML_TEXT, "owner care heading is missing")
for phrase in (
    "誰かに、ちょっと話を聞いてほしい",
    "ひとりで抱えている気持ちを言葉にしたい",
    "大切な話をする前に、伝え方を考えたい",
    "社長もスタッフも、無理なく働ける会社にしたい",
    "お互いの頑張りを認め合える職場にしたい",
):
    require(phrase in HTML_TEXT, f"owner care copy is missing: {phrase}")
for page_name, page in (("owner", HTML_TEXT), ("staff", STAFF_HTML_TEXT)):
    require("文字でも、声でも。あなたに合った話し方で。" in page, f"voice option heading is missing: {page_name}")
    require("社長もスタッフも利用できる音声会話オプションを提供予定です。" in page, f"planned voice option copy is missing: {page_name}")
for discouraged_copy in ("スタッフに何度も同じことを言っている", "仕事を教えてもなかなか伝わらない", "スタッフが何を考えているか分からない", "会社の理念をスタッフに理解してほしい"):
    require(discouraged_copy not in HTML_TEXT + JS, f"discouraged owner copy remains: {discouraged_copy}")
require("スタッフとして体験する" not in STAFF_HTML_TEXT and "スタッフとして、触ってみる" not in STAFF_HTML_TEXT, "staff-specific demo wording remains")
require("fetch(" not in JS + STAFF_JS, "public demos must not make network requests")
require("/api/" not in JS + STAFF_JS and "supabase" not in (JS + STAFF_JS).lower(), "private API reference detected")
require("runtime: static" in BLUEPRINT, "Render service must be static")
require("staticPublishPath: ./public" in BLUEPRINT, "only public/ may be published")
require("connect-src 'none'" in BLUEPRINT and "form-action 'none'" in BLUEPRINT, "restrictive CSP is missing")
for asset in ("styles.css", "demo.js", "assets/icon-192.png", "assets/icon-512.png", "assets/apple-touch-icon.png", "assets/characters/suwacchi.png", "assets/characters/shiori.png", "assets/characters/mike.png", "assets/characters/rei.png"):
    require((PUBLIC / asset).is_file(), f"missing public asset: {asset}")

print("public sales site verification: OK")

(() => {
  "use strict";

  const VERIFIED_ON = "2026-10-16";
  const PREFECTURES = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
  ];

  const CATEGORIES = Object.freeze({
    staff: [
      ["staff_harassment", "職場のいじめ・ハラスメント"],
      ["staff_labor", "給料・労働時間・解雇など"],
      ["staff_mental", "こころの悩み・職場のストレス"],
      ["staff_other", "その他・どこに相談したらよいか分からない"],
    ],
    president: [
      ["president_general", "経営全般・売上・集客"],
      ["president_finance", "資金繰り・融資・創業"],
      ["president_labor", "雇用・労務・ハラスメント対応"],
      ["president_ip", "特許・商標・知的財産"],
      ["president_mental", "こころの悩み・経営の孤独"],
      ["president_other", "その他・どこに相談したらよいか分からない"],
    ],
  });

  const RESOURCES = Object.freeze([
    {
      id: "ibaraki-labor-bureau-general",
      area: "茨城県",
      roles: ["staff"],
      categories: ["staff_harassment", "staff_labor", "staff_other"],
      name: "茨城労働局 総合労働相談コーナー",
      operator: "厚生労働省 茨城労働局",
      topics: "解雇、賃金引下げ、募集・採用、いじめ・嫌がらせ、パワーハラスメントなど、幅広い労働問題。",
      eligibility: "労働者、求職者、事業主など。茨城県内の各コーナーも公式ページから選べます。",
      hours: "茨城労働局コーナーは8:30～17:00。土日祝・年末年始を除く。専門相談員が不在の場合があります。",
      reservation: "予約制ではありませんが、事前の電話確認が推奨されています。",
      cost: "相談無料。電話の通話料は公式ページで確認してください。",
      phones: [["029-277-8201", "電話する"]],
      website: "https://jsite.mhlw.go.jp/ibaraki-roudoukyoku/roudoukyoku/kanren_shisetsu/sougou_roudou_soudan/annai02.html",
      sourceUrls: ["https://www.mhlw.go.jp/general/seido/chihou/kaiketu/soudan.html"],
    },
    {
      id: "ibaraki-prefecture-labor-center",
      area: "茨城県",
      roles: ["staff", "president"],
      categories: ["staff_harassment", "staff_labor", "staff_other", "president_labor", "president_other"],
      name: "いばらき労働相談センター",
      operator: "茨城県 産業戦略部 労働政策課",
      topics: "労働条件、解雇、配置転換、賃金不払い、職場のいじめ・ハラスメントなどの労働相談。",
      eligibility: "茨城県内の企業の経営者・労務担当者、労働者。県央以外の出張面談にも対応。",
      hours: "平日9:00～19:00（受付18:30まで）、第2・第4土曜9:00～15:00（受付14:30まで）。休業日は公式ページで確認。",
      reservation: "電話相談の予約要否は公式ページで確認してください。県央以外の出張面談は事前連絡が必要です。",
      cost: "相談無料。電話の通話料は公式ページで確認してください。",
      phones: [["029-233-1560", "電話する"]],
      website: "https://www.pref.ibaraki.jp/shokorodo/rosei/rodo/rodosodan/sodan.html",
      sourceUrls: ["https://yell.pref.ibaraki.jp/communication/others.html"],
    },
    {
      id: "rengo-labor-hotline",
      area: "茨城県",
      roles: ["staff"],
      categories: ["staff_harassment", "staff_labor", "staff_other"],
      name: "連合 なんでも労働相談ホットライン（茨城県から利用）",
      operator: "日本労働組合総連合会（連合。地方連合会・地域協議会を含む相談体制）",
      topics: "働くこと、賃金・労働時間・解雇、ハラスメント、労働組合づくりなど。",
      eligibility: "働くことで困っている方。",
      hours: "電話の受付時間は公式ページで確認できなかったため掲載していません。メール相談は常時受付、LINE相談は期間限定です。",
      reservation: "電話の予約要否は公式ページで確認できませんでした。",
      cost: "フリーダイヤル。相談無料・秘密厳守と公式資料に記載があります。",
      phones: [["0120-154-052", "電話する（フリーダイヤル）"]],
      website: "https://www.jtuc-rengo.or.jp/soudan/",
      snsUrl: "https://www.jtuc-rengo.or.jp/soudan/",
      sourceUrls: ["https://www.jtuc-rengo.or.jp/about_rengo/jtuc/locals.html"],
    },
    {
      id: "ibaraki-sanpo-mental",
      area: "茨城県",
      roles: ["staff"],
      categories: ["staff_mental", "staff_other"],
      name: "茨城産業保健総合支援センター 職場のメンタルヘルス相談室",
      operator: "独立行政法人 労働者健康安全機構 茨城産業保健総合支援センター",
      topics: "職場の人間関係、仕事の能率低下、いら立ちや緊張、家族の仕事上の悩みなど。治療・カウンセリングは行いません。",
      eligibility: "茨城県内の労働者本人と家族、上司・同僚、産業保健スタッフ、企業の労務担当者等。離職者・公務員は対象外。",
      hours: "相談枠は金曜15:00～15:45、または第4木曜10:00～10:45／11:00～11:45。電話受付は平日9:00～16:45。最新日程は申込フォームで確認。",
      reservation: "事前予約制。申込締切は相談日の約1週間前。利用は1人年度内1回。",
      cost: "相談無料。電話の通話料は公式ページで確認してください。",
      phones: [["029-300-1221", "予約について電話する"]],
      website: "https://ibarakis.johas.go.jp/consultation-mental/",
      sourceUrls: ["https://ibarakis.johas.go.jp/consultation/"],
    },
    {
      id: "ibaraki-yorozu",
      area: "茨城県",
      roles: ["president"],
      categories: ["president_general", "president_finance", "president_other"],
      name: "茨城県よろず支援拠点",
      operator: "公益財団法人いばらき中小企業グローバル推進機構（国が設置するよろず支援拠点）",
      topics: "売上拡大、経営改善、販路開拓、IT活用、生産性向上、事業承継、人手不足、創業など経営上の相談。",
      eligibility: "茨城県内の中小企業・小規模事業者、創業予定者など。",
      hours: "月～金曜9:00～17:00（祝日・年末年始等を除く）。",
      reservation: "窓口・訪問相談は事前に電話で申し込み。",
      cost: "何度でも相談無料。電話の通話料は公式ページで確認してください。",
      phones: [["029-224-5339", "電話する"]],
      website: "https://www.ibaraki-yorozu.go.jp/",
      sourceUrls: ["https://www.iis-net.or.jp/page?kind=sougyou", "https://yorozu.smrj.go.jp/base/"],
    },
    {
      id: "ibaraki-credit-guarantee",
      area: "茨城県",
      roles: ["president"],
      categories: ["president_finance"],
      name: "茨城県信用保証協会 経営金融・創業相談窓口",
      operator: "茨城県信用保証協会",
      topics: "経営・金融、金融機関の紹介、経営改善、保証・条件変更、創業・独立の相談。保証や融資を必ず受けられるものではありません。",
      eligibility: "茨城県内の中小企業・小規模事業者、創業予定者。所在地により水戸営業部または土浦営業部を選びます。担当市町村は公式ページに掲載。",
      hours: "平日9:00～17:00（土日祝を除く）。平日夜間の創業相談は事前予約で19:00まで。",
      reservation: "通常窓口は事前に電話で確認。夜間の創業相談は予約制。",
      cost: "相談費用は公式ページで確認してください。信用保証を利用する場合は保証料が発生します。",
      phones: [["029-224-7812", "水戸営業部へ電話"], ["029-826-7812", "土浦営業部へ電話"]],
      website: "https://icgc.or.jp/contact/",
      sourceUrls: ["https://www.icgc.or.jp/info/"],
    },
    {
      id: "ibaraki-inpit",
      area: "茨城県",
      roles: ["president"],
      categories: ["president_ip"],
      name: "INPIT 茨城県知財総合支援窓口",
      operator: "独立行政法人工業所有権情報・研修館（INPIT）／受託運営：株式会社ひたちなかテクノセンター",
      topics: "中小企業等の特許・商標など知的財産の悩み。必要に応じて弁理士・弁護士等と連携。",
      eligibility: "中小企業等。訪問支援は中小企業等の場合のみ。",
      hours: "平日9:00～12:00、13:00～17:00。土日祝・12月29日～1月3日は休館。",
      reservation: "あらかじめ電話が必要。専門家相談会は予約制。",
      cost: "窓口担当者・専門家への相談無料。電話の通話料は発信者負担。",
      phones: [["029-264-2237", "電話する"]],
      website: "https://chizai-portal.inpit.go.jp/madoguchi/ibaraki/info/details/",
      sourceUrls: ["https://chizai-portal.inpit.go.jp/madoguchi/ibaraki/consultation/consult_regular/"],
    },
    {
      id: "ibaraki-kokoro",
      area: "茨城県",
      roles: ["president"],
      categories: ["president_mental"],
      name: "いばらきこころのホットライン／こころのSNS相談＠いばらき",
      operator: "茨城県",
      topics: "対人関係、社会生活、家庭問題など、こころの悩み全般。経営者専用ではない一般の相談窓口です。",
      eligibility: "SNS相談は茨城県内在住または県内に通勤・通学している方。電話相談の地域条件は公式案内で明記されていません。匿名相談可。",
      hours: "電話：平日9:00～12:00／13:00～16:00、土日9:00～12:00／13:00～16:00。SNS：月～土17:00～22:00、日16:00～22:00。休止日は公式サイトで確認。",
      reservation: "予約手続きの記載はありません。利用方法・混雑状況は公式サイトで確認してください。",
      cost: "相談無料。土日の電話はフリーダイヤル。平日電話の通話料は公式ページで確認してください。",
      phones: [["029-244-0556", "平日に電話する"], ["0120-236-556", "土日に電話する（無料）"]],
      website: "https://kokoronosoudan.pref.ibaraki.jp/",
      snsUrl: "https://www.pref.ibaraki.jp/hokenfukushi/shofuku/seishin/shofuku/j/j-1.html",
      sourceUrls: ["https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/kokoro_dial.html"],
    },
    {
      id: "national-labor-corners",
      area: "全国",
      roles: ["staff", "president"],
      categories: ["staff_harassment", "staff_labor", "staff_other", "president_labor", "president_other"],
      name: "総合労働相談コーナー（全国の窓口検索）",
      operator: "厚生労働省・各都道府県労働局",
      topics: "解雇、賃金、募集・採用、いじめ・嫌がらせ、パワーハラスメントなど幅広い労働問題。",
      eligibility: "労働者、求職者、事業主など。選んだ都道府県の窓口を公式一覧から確認できます。",
      hours: "窓口ごとに異なります。公式一覧に開庁時間を掲載。",
      reservation: "原則予約制ではありませんが、窓口ごとの案内を確認してください。",
      cost: "相談無料。通話料は各窓口の案内を確認してください。",
      phones: [],
      website: "https://www.mhlw.go.jp/general/seido/chihou/kaiketu/soudan.html",
      sourceUrls: [],
    },
    {
      id: "national-labor-hotline",
      area: "全国",
      roles: ["staff", "president"],
      categories: ["staff_labor", "president_labor"],
      name: "労働条件相談ほっとライン",
      operator: "厚生労働省委託事業（令和8年度受託：株式会社東京リーガルマインド）",
      topics: "違法な時間外労働、過重労働による健康障害、賃金不払残業など労働基準関係法令。事業場への指導は行いません。",
      eligibility: "労働者・使用者を問わず、全国から利用可能。匿名相談可。",
      hours: "月～金17:00～22:00、土日祝9:00～21:00（12月29日～1月3日を除く）。",
      reservation: "電話相談。予約不要。",
      cost: "相談・通話無料（フリーダイヤル）。",
      phones: [["0120-811-610", "電話する（無料）"]],
      website: "https://www.check-roudou.mhlw.go.jp/lp/hotline/index.html",
      sourceUrls: [],
    },
    {
      id: "national-kokoro-ear",
      area: "全国",
      roles: ["staff", "president"],
      categories: ["staff_mental", "president_mental"],
      name: "働く人の「こころの耳」相談窓口",
      operator: "厚生労働省委託事業",
      topics: "働く人のメンタルヘルス不調、仕事・人間関係の悩み、過重労働、ストレスチェックなど。",
      eligibility: "全国の働く方とその家族、企業の人事労務担当者。経営者専用ではありません。匿名相談可。",
      hours: "電話・SNS：平日17:00～22:00、土日10:00～16:00（受付締切あり。祝日・振替休日・年末年始を除く）。メールは24時間受付。",
      reservation: "電話・SNSは予約不要。利用規約への同意が必要。",
      cost: "相談無料。電話はフリーダイヤル。",
      phones: [["0120-565-455", "電話する（無料）"]],
      website: "https://b.ns.kokoro.mhlw.go.jp/soudan/",
      snsUrl: "https://b.ns.kokoro.mhlw.go.jp/soudan/",
      sourceUrls: ["https://b.ns.kokoro.mhlw.go.jp/tel-soudan/"],
    },
    {
      id: "national-yorozu",
      area: "全国",
      roles: ["president"],
      categories: ["president_general", "president_finance", "president_other"],
      name: "よろず支援拠点（全国の拠点検索）",
      operator: "国が設置／全国本部：独立行政法人中小企業基盤整備機構",
      topics: "売上、商品開発、経営改善、IT活用、生産性向上、人手不足、事業承継、創業など経営上の相談。",
      eligibility: "中小企業・小規模事業者、これらに類する法人、創業予定者。",
      hours: "拠点ごとに異なります。各都道府県の公式ページで確認。",
      reservation: "各拠点で電話・メール・FAX等により予約受付。",
      cost: "何度でも相談無料。通話料は各拠点の案内を確認してください。",
      phones: [],
      website: "https://yorozu.smrj.go.jp/base/",
      sourceUrls: ["https://yorozu.smrj.go.jp/about/"],
    },
    {
      id: "national-credit-guarantee",
      area: "全国",
      roles: ["president"],
      categories: ["president_finance"],
      name: "お近くの信用保証協会",
      operator: "各地域の信用保証協会／案内：一般社団法人全国信用保証協会連合会",
      topics: "創業支援、経営支援、地域の信用保証制度。保証や融資を必ず受けられるものではありません。",
      eligibility: "原則として事業を営む都道府県・市の中小企業・小規模事業者など。条件は各協会で確認。",
      hours: "協会ごとに異なります。",
      reservation: "協会ごとに異なります。",
      cost: "相談費用は各協会で確認。信用保証の利用時は保証料が発生します。",
      phones: [],
      website: "https://www.zenshinhoren.or.jp/nearest/",
      sourceUrls: ["https://www.zenshinhoren.or.jp/basic/"],
    },
    {
      id: "national-inpit",
      area: "全国",
      roles: ["president"],
      categories: ["president_ip"],
      name: "INPIT 知財総合支援窓口（全国の窓口検索）",
      operator: "独立行政法人工業所有権情報・研修館（INPIT）",
      topics: "特許、商標、営業秘密など知的財産の悩み。全国47都道府県の窓口を案内。",
      eligibility: "中小企業等。詳しい条件は各窓口で確認。",
      hours: "窓口ごとに異なります。",
      reservation: "窓口ごとに異なります。全国共通番号は近くの窓口へ接続。",
      cost: "相談無料。全国共通番号・各窓口への通話料は発信者負担。",
      phones: [["0570-082100", "全国共通番号へ電話"]],
      website: "https://chizai-portal.inpit.go.jp/contact-list/",
      sourceUrls: ["https://chizai-portal.inpit.go.jp/madoguchi/"],
    },
    {
      id: "national-mental-search",
      area: "全国",
      roles: ["staff", "president"],
      categories: ["staff_mental", "staff_other", "president_mental", "president_other"],
      name: "厚生労働省「まもろうよ こころ」相談窓口案内",
      operator: "厚生労働省",
      topics: "こころの悩みについて、電話・SNS・地域別・悩み別の相談窓口を探せます。経営者専用ではありません。",
      eligibility: "窓口ごとに年齢・地域などの条件が異なります。公式案内で確認してください。",
      hours: "窓口ごとに異なります。",
      reservation: "窓口ごとに異なります。",
      cost: "窓口ごとに相談料・通話料が異なります。",
      phones: [],
      website: "https://www.mhlw.go.jp/mamorouyokokoro/soudan/",
      sourceUrls: [],
    },
  ]);

  function externalLink(url, label, className = "support-action") {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.referrerPolicy = "no-referrer";
    link.className = className;
    link.textContent = label;
    return link;
  }

  function detailRow(label, value) {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    return [dt, dd];
  }

  function resourceCard(resource) {
    const card = document.createElement("article");
    card.className = "support-resource-card";
    const heading = document.createElement("div");
    heading.className = "support-resource-heading";
    const title = document.createElement("h3");
    title.textContent = resource.name;
    const badge = document.createElement("span");
    badge.textContent = resource.area === "全国" ? "全国対応・検索" : resource.area;
    heading.append(title, badge);
    const dl = document.createElement("dl");
    [
      ["運営主体", resource.operator],
      ["相談できる内容", resource.topics],
      ["利用対象・地域", resource.eligibility],
      ["受付時間", resource.hours],
      ["予約", resource.reservation],
      ["費用・通話料", resource.cost],
    ].forEach(([label, value]) => dl.append(...detailRow(label, value)));
    const actions = document.createElement("div");
    actions.className = "support-resource-actions";
    resource.phones.forEach(([number, label]) => {
      const phone = document.createElement("a");
      phone.href = `tel:${number.replace(/[^0-9+]/g, "")}`;
      phone.className = "support-action support-action--phone";
      phone.textContent = `☎ ${label}`;
      actions.append(phone);
    });
    actions.append(externalLink(resource.website, "公式サイトを開く"));
    if (resource.snsUrl) actions.append(externalLink(resource.snsUrl, "公式のSNS相談案内を開く"));
    const verified = document.createElement("small");
    verified.className = "support-verified";
    verified.textContent = `公式情報確認日：${VERIFIED_ON.replaceAll("-", "/")}。掲載内容は変更される場合があります。`;
    card.append(heading, dl, actions, verified);
    return card;
  }

  function setRole(root, role) {
    const safeRole = role === "president" ? "president" : "staff";
    root.dataset.supportRole = safeRole;
    const category = root.querySelector("[data-support-category]");
    category.replaceChildren(new Option("相談内容を選んでください", ""));
    CATEGORIES[safeRole].forEach(([value, label]) => category.add(new Option(label, value)));
    const results = root.querySelector("[data-support-results]");
    results.hidden = true;
    root.querySelector("[data-support-picker]").hidden = false;
  }

  function render(root) {
    const role = root.dataset.supportRole === "president" ? "president" : "staff";
    const category = root.querySelector("[data-support-category]").value;
    const prefecture = root.querySelector("[data-support-prefecture]").value;
    if (!category || !prefecture) return;
    const local = RESOURCES.filter((item) => item.area === prefecture && item.roles.includes(role) && item.categories.includes(category));
    const national = RESOURCES.filter((item) => item.area === "全国" && item.roles.includes(role) && item.categories.includes(category));
    const list = root.querySelector("[data-support-list]");
    list.replaceChildren(...[...local, ...national].map(resourceCard));
    const note = root.querySelector("[data-support-region-note]");
    note.textContent = local.length
      ? `${prefecture}の確認済み窓口を先に表示し、続けて全国対応・地域別検索の公式案内を表示しています。`
      : `${prefecture}の個別窓口は現在未登録です。全国対応の公式窓口または地域別窓口を探せる公式ページを表示しています。`;
    root.querySelector("[data-support-picker]").hidden = true;
    root.querySelector("[data-support-results]").hidden = false;
  }

  function init(root) {
    const prefecture = root.querySelector("[data-support-prefecture]");
    prefecture.replaceChildren(new Option("都道府県を選んでください", ""));
    PREFECTURES.forEach((name) => prefecture.add(new Option(name, name)));
    setRole(root, root.dataset.supportRole);
    root.querySelector("[data-support-search]").addEventListener("click", () => render(root));
    root.querySelector("[data-support-back]").addEventListener("click", () => {
      root.querySelector("[data-support-results]").hidden = true;
      root.querySelector("[data-support-picker]").hidden = false;
      root.querySelector("[data-support-category]").focus();
    });
  }

  document.querySelectorAll("[data-support-finder]").forEach(init);
  window.SuwacchiSupport = Object.freeze({ verifiedOn: VERIFIED_ON, categories: CATEGORIES, resources: RESOURCES, setRole, render });
})();

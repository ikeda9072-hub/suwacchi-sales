const demoTabs = [...document.querySelectorAll("[data-demo-tab]")];
const demoPanels = [...document.querySelectorAll("[data-demo-panel]")];

function showDemoPanel(name) {
  demoTabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.demoTab === name)));
  demoPanels.forEach((panel) => { panel.hidden = panel.dataset.demoPanel !== name; });
}

demoTabs.forEach((tab) => tab.addEventListener("click", () => showDemoPanel(tab.dataset.demoTab)));

const chatSamples = {
  president: {
    greeting: "社長、おつかれさま〜。ここでは社長自身の悩みを、ほかの人に見せずに話せるよ。",
    prompts: [
      ["同じ説明を何度もして疲れた", "何度も伝え直すのは、気力を使うよね。まずは『覚える気がない』と決めつけず、手順の見え方や確認方法を一緒に整理してみる？ 今日はただ聞いてほしい気分かな。"],
      ["改善方法を一緒に考えたい", "うん、一緒に考えよう〜。口頭説明を写真つきの短い手順にして、教えた直後に本人の言葉で確認してもらう方法があるよ。まず一つの作業だけで試して、声かけの回数が変わったかを記録してみよう。"],
    ],
  },
  staff: {
    greeting: "おかえり〜。今日もおつかれさま。なにかあった？ なんでも聞くよ〜。",
    prompts: [
      ["今日はちょっと疲れた", "そっか、今日は疲れたんだね。無理に元気にならなくて大丈夫だよ。よかったら、いちばんしんどかったところだけ聞かせてくれる？"],
      ["仕事の順番が分からなくなった", "途中で順番が分からなくなると、焦るよね。いま抱えている作業を短く並べて、急ぐものと確認が必要なものに分けてみようか。"],
    ],
  },
};

let demoRole = "president";
const messageBox = document.querySelector("#demo-messages");
const promptBox = document.querySelector("#demo-prompts");

function bubble(text, kind) {
  const node = document.createElement("div");
  node.className = `mini-bubble ${kind}`;
  node.textContent = text;
  return node;
}

function renderDemoChat() {
  const sample = chatSamples[demoRole];
  messageBox.replaceChildren(bubble(sample.greeting, "bot"));
  promptBox.replaceChildren();
  sample.prompts.forEach(([question, answer]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = question;
    button.addEventListener("click", () => {
      messageBox.append(bubble(question, "user"), bubble(answer, "bot"));
      promptBox.querySelectorAll("button").forEach((item) => { item.disabled = true; });
      messageBox.scrollTop = messageBox.scrollHeight;
    });
    promptBox.append(button);
  });
}

document.querySelectorAll("[data-demo-role]").forEach((button) => {
  button.addEventListener("click", () => {
    demoRole = button.dataset.demoRole;
    document.querySelectorAll("[data-demo-role]").forEach((item) => item.classList.toggle("active", item === button));
    renderDemoChat();
  });
});
renderDemoChat();

document.querySelector("#demo-opinion-send").addEventListener("click", () => {
  const result = document.querySelector("#demo-opinion-result");
  result.hidden = false;
  result.replaceChildren();
  const strong = document.createElement("strong");
  strong.textContent = "体験用のお手紙を受け付けました";
  const body = document.createElement("p");
  body.textContent = "会社からの返信例：ご意見ありがとう。来週から朝礼メモを共有ボードに残す方法を試します。匿名のまま、この画面で返信を確認できます。";
  result.append(strong, body);
});

document.querySelector("#demo-mission-create").addEventListener("click", (event) => {
  document.querySelector("#demo-mission-card").hidden = false;
  event.currentTarget.disabled = true;
});
document.querySelectorAll("[data-mission-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const status = document.querySelector("#demo-mission-status");
    status.textContent = button.dataset.missionAction === "submit"
      ? "承認待ちへ提出しました（体験用）。承認者には提案文だけが届き、元の相談は届きません。"
      : "この画面で文章を修正してから提出できます（体験用）。";
  });
});

document.querySelector("#demo-point-send").addEventListener("click", () => {
  const person = document.querySelector("#demo-point-person").value;
  document.querySelector("#demo-point-status").textContent = `${person}へ1ポイントを贈りました（体験用・保存なし）。`;
});

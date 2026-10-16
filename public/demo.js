const demoTabs = [...document.querySelectorAll("[data-demo-tab]")];
const demoPanels = [...document.querySelectorAll("[data-demo-panel]")];

function showDemoPanel(name) {
  demoTabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.demoTab === name)));
  demoPanels.forEach((panel) => { panel.hidden = panel.dataset.demoPanel !== name; });
}

demoTabs.forEach((tab) => tab.addEventListener("click", () => showDemoPanel(tab.dataset.demoTab)));

const chatSamples = {
  president: {
    greeting: "社長、おつかれさま〜。ここでは社長自身の気持ちや考えを、安心してAIに話せるよ。",
    prompts: [
      ["誰かに、ちょっと話を聞いてほしい", "うん、ここで聞かせてね。結論を急がなくても大丈夫。いま心に浮かんでいることから、話しやすい言葉で話してみる？"],
      ["大切な話の伝え方を考えたい", "一緒に整理してみよう〜。まず、相手にいちばん伝えたい想いと、お願いしたいことを分けてみようか。お互いを大切にできる言葉を考えてみよう。"],
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

let helpDemoRole = "president";
const helpDestination = document.querySelector("#demo-help-destination");
const helpFinder = document.querySelector("[data-demo-panel=\"help\"] [data-support-finder]");

function configureHelpDemo() {
  helpDestination.replaceChildren(new Option("相談先を選んでください", ""));
  if (helpDemoRole === "president") {
    helpDestination.add(new Option("社外の相談窓口を探す", "external"));
  } else {
    helpDestination.add(new Option("責任者に伝える", "responsible"));
    helpDestination.add(new Option("社長に直接伝える", "president"));
    helpDestination.add(new Option("社外の相談窓口を探す", "external"));
  }
  document.querySelector("#demo-help-internal").hidden = true;
  document.querySelector("#demo-help-external").hidden = true;
  document.querySelector("#demo-help-result").hidden = true;
  window.SuwacchiSupport?.setRole(helpFinder, helpDemoRole);
}

document.querySelectorAll("[data-help-demo-role]").forEach((button) => {
  button.addEventListener("click", () => {
    helpDemoRole = button.dataset.helpDemoRole;
    document.querySelectorAll("[data-help-demo-role]").forEach((item) => item.classList.toggle("active", item === button));
    configureHelpDemo();
  });
});

helpDestination.addEventListener("change", () => {
  const internal = helpDestination.value === "responsible" || helpDestination.value === "president";
  document.querySelector("#demo-help-internal").hidden = !internal;
  document.querySelector("#demo-help-external").hidden = helpDestination.value !== "external";
  document.querySelector("#demo-help-result").hidden = true;
});

document.querySelector("#demo-help-preview").addEventListener("click", () => {
  const result = document.querySelector("#demo-help-result");
  result.hidden = false;
  result.replaceChildren();
  const strong = document.createElement("strong");
  strong.textContent = "送信前の確認画面（体験用）";
  const body = document.createElement("p");
  body.textContent = `${helpDestination.selectedOptions[0].textContent}を選びました。実際の画面では、送る内容、送信先、名前の扱いをもう一度確認し、本人が送信を決めます。`;
  result.append(strong, body);
});
configureHelpDemo();

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

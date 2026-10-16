const staffDemoTabs = [...document.querySelectorAll("[data-staff-demo-tab]")];
const staffDemoPanels = [...document.querySelectorAll("[data-staff-demo-panel]")];

function showStaffDemoPanel(name) {
  staffDemoTabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.staffDemoTab === name)));
  staffDemoPanels.forEach((panel) => { panel.hidden = panel.dataset.staffDemoPanel !== name; });
}

staffDemoTabs.forEach((tab) => tab.addEventListener("click", () => showStaffDemoPanel(tab.dataset.staffDemoTab)));

const staffChatSamples = [
  ["仕事の順番を整理したい", "もちろん〜。いま抱えている作業を短く並べて、今日中のもの、確認が必要なもの、あとでよいものに分けてみようか。"],
  ["今日はちょっと落ち込んだ", "そっか、今日は落ち込むことがあったんだね。無理に元気にならなくて大丈夫だよ。話せるところから聞かせてね。"],
];
const staffMessageBox = document.querySelector("#staff-demo-messages");
const staffPromptBox = document.querySelector("#staff-demo-prompts");

function staffBubble(text, kind) {
  const node = document.createElement("div");
  node.className = `mini-bubble ${kind}`;
  node.textContent = text;
  return node;
}

staffMessageBox.append(staffBubble("おかえり〜。今日もおつかれさま。仕事のことも、個人的なことも話してね♡", "bot"));
staffChatSamples.forEach(([question, answer]) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = question;
  button.addEventListener("click", () => {
    staffMessageBox.append(staffBubble(question, "user"), staffBubble(answer, "bot"));
    staffPromptBox.querySelectorAll("button").forEach((item) => { item.disabled = true; });
    staffMessageBox.scrollTop = staffMessageBox.scrollHeight;
  });
  staffPromptBox.append(button);
});

const sharedTasks = [
  { title: "備品の在庫を確認", meta: "明日・担当：みんな", fresh: true },
  { title: "入口の案内を差し替える", meta: "今日・担当：佐藤さん", fresh: false },
];
const personalTasks = [
  { title: "業者へ電話する", meta: "来週月曜日・自分だけに表示", fresh: false },
  { title: "帰りに豆腐を買う", meta: "今日・日常／プライベート・自分だけに表示", fresh: false },
];
let taskScope = "shared";

function renderStaffTasks() {
  const tasks = taskScope === "shared" ? sharedTasks : personalTasks;
  document.querySelector("#staff-task-summary").textContent = taskScope === "shared"
    ? "同じ会社のみんなが確認・登録できます"
    : "本人だけが確認できる非公開メモです";
  const list = document.querySelector("#staff-task-list");
  list.replaceChildren();
  tasks.forEach((task) => {
    const article = document.createElement("article");
    const check = document.createElement("button");
    check.type = "button";
    check.className = "staff-task-check";
    check.setAttribute("aria-label", `${task.title}を完了にする`);
    check.textContent = "✓";
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = task.title;
    const meta = document.createElement("small");
    meta.textContent = task.meta;
    copy.append(title, meta);
    if (task.fresh) {
      const badge = document.createElement("span");
      badge.textContent = "新着";
      copy.append(badge);
    }
    check.addEventListener("click", () => {
      article.classList.toggle("is-complete");
      check.setAttribute("aria-pressed", String(article.classList.contains("is-complete")));
    });
    article.append(check, copy);
    list.append(article);
  });
}

document.querySelectorAll("[data-task-scope]").forEach((button) => {
  button.addEventListener("click", () => {
    taskScope = button.dataset.taskScope;
    document.querySelectorAll("[data-task-scope]").forEach((item) => item.classList.toggle("active", item === button));
    renderStaffTasks();
  });
});
renderStaffTasks();

document.querySelector("#staff-task-draft").addEventListener("click", (event) => {
  const card = document.querySelector("#staff-task-draft-card");
  card.hidden = false;
  card.replaceChildren();
  const scope = document.createElement("strong");
  scope.textContent = "保存先：わたしのやること（本人専用）";
  const detail = document.createElement("p");
  detail.textContent = "タスク：帰りに豆腐を買う／期限：今日／分類：日常・プライベート";
  const confirm = document.createElement("button");
  confirm.type = "button";
  confirm.className = "demo-button";
  confirm.textContent = "登録する（体験）";
  confirm.addEventListener("click", () => {
    confirm.textContent = "登録を体験しました（保存なし）";
    confirm.disabled = true;
  });
  card.append(scope, detail, confirm);
  event.currentTarget.disabled = true;
});

const staffHelpDestination = document.querySelector("#staff-help-destination");
staffHelpDestination.addEventListener("change", () => {
  const internal = staffHelpDestination.value === "responsible" || staffHelpDestination.value === "president";
  document.querySelector("#staff-help-internal").hidden = !internal;
  document.querySelector("#staff-help-external").hidden = staffHelpDestination.value !== "external";
  document.querySelector("#staff-help-result").hidden = true;
});

document.querySelector("#staff-help-preview").addEventListener("click", () => {
  const result = document.querySelector("#staff-help-result");
  result.hidden = false;
  result.replaceChildren();
  const strong = document.createElement("strong");
  strong.textContent = "送信前の確認画面（体験用）";
  const body = document.createElement("p");
  body.textContent = `${staffHelpDestination.selectedOptions[0].textContent}を選びました。実際の画面では、送る内容、送信先、名前の扱いをもう一度確認し、本人が送信を決めます。`;
  result.append(strong, body);
});

document.querySelector("#staff-point-send").addEventListener("click", () => {
  const person = document.querySelector("#staff-point-person").value;
  document.querySelector("#staff-point-status").textContent = `${person}へ1ポイントを贈りました（体験用・保存なし）。`;
});

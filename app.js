// 初期予算
let budgets = JSON.parse(localStorage.getItem("wagaya_budgets")) || {
  "食費": 40000,
  "外食/レジャー費": 8000,
  "日用品費": 20000,
  "ガソリン費": 5000
};

// 支出データ
let data = JSON.parse(localStorage.getItem("wagaya_data")) || [];

// 支出追加
function addExpense() {

  const category = document.getElementById("category").value;
  const amount = Number(document.getElementById("amount").value);
  const memo = document.getElementById("memo").value;

  if (!amount) return;

  data.push({
    category: category,
    amount: amount,
    memo: memo
  });

  localStorage.setItem("wagaya_data", JSON.stringify(data));

  document.getElementById("amount").value = "";
  document.getElementById("memo").value = "";

  render();
}

// 予算保存
function saveBudgets() {

  budgets["食費"] =
    Number(document.getElementById("budgetFood").value);

  budgets["外食/レジャー費"] =
    Number(document.getElementById("budgetLeisure").value);

  budgets["日用品費"] =
    Number(document.getElementById("budgetDaily").value);

  budgets["ガソリン費"] =
    Number(document.getElementById("budgetGas").value);

  localStorage.setItem(
    "wagaya_budgets",
    JSON.stringify(budgets)
  );

  render();
}

// 削除
function del(index) {

  data.splice(index, 1);

  localStorage.setItem(
    "wagaya_data",
    JSON.stringify(data)
  );

  render();
}

// リセット
function resetMonth() {

  if (!confirm("今月の履歴を削除しますか？")) return;

  data = [];

  localStorage.setItem(
    "wagaya_data",
    JSON.stringify(data)
  );

  render();
}

// 表示更新
function render() {

  // 予算欄
  document.getElementById("budgetFood").value =
    budgets["食費"];

  document.getElementById("budgetLeisure").value =
    budgets["外食/レジャー費"];

  document.getElementById("budgetDaily").value =
    budgets["日用品費"];

  document.getElementById("budgetGas").value =
    budgets["ガソリン費"];

  // 合計
  let totalBudget = 0;

  Object.values(budgets).forEach(function (value) {
    totalBudget += value;
  });

  let spent = 0;

  const used = {
    "食費": 0,
    "外食/レジャー費": 0,
    "日用品費": 0,
    "ガソリン費": 0
  };

  data.forEach(function (item) {

    spent += item.amount;

    used[item.category] += item.amount;

  });

  document.getElementById("totalBudget").innerHTML =
    "¥" + totalBudget.toLocaleString();

  document.getElementById("spent").innerHTML =
    "¥" + spent.toLocaleString();

  document.getElementById("remaining").innerHTML =
    "¥" + (totalBudget - spent).toLocaleString();

  // 予算表
  let budgetHtml = "";

  Object.keys(budgets).forEach(function (key) {

    const remain = budgets[key] - used[key];

    budgetHtml += `
      <tr>
        <td>${key}</td>
        <td class="${remain < 0 ? 'over' : ''}">
          ¥${remain.toLocaleString()}
        </td>
      </tr>
    `;
  });

  document.getElementById("budgetTable").innerHTML =
    budgetHtml;

  // 履歴
  let historyHtml = "";

  data.forEach(function (item, index) {

    historyHtml += `
      <tr>
        <td>${item.category}</td>
        <td>¥${item.amount.toLocaleString()}</td>
        <td>${item.memo}</td>
        <td>
          <button onclick="del(${index})">
            削除
          </button>
        </td>
      </tr>
    `;
  });

  document.getElementById("history").innerHTML =
    historyHtml;

}

// 初期表示
render();

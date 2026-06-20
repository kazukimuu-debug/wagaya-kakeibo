let budgets=JSON.parse(localStorage.getItem(“wagaya_budgets”)) || {
“食費”:40000,
“外食/レジャー費”:8000,
“日用品費”:20000,
“ガソリン費”:5000
};

let data=JSON.parse(localStorage.getItem(“wagaya_data”)) || [];

function saveBudgets(){

budgets[“食費”]=
Number(document.getElementById(“budgetFood”).value);

budgets[“外食/レジャー費”]=
Number(document.getElementById(“budgetLeisure”).value);

budgets[“日用品費”]=
Number(document.getElementById(“budgetDaily”).value);

budgets[“ガソリン費”]=
Number(document.getElementById(“budgetGas”).value);

localStorage.setItem(
“wagaya_budgets”,
JSON.stringify(budgets)
);

render();

}

function addExpense(){

const amount=
Number(document.getElementById(“amount”).value);

if(!amount)return;

data.push({

category:
document.getElementById(“category”).value,

amount:amount,

memo:
document.getElementById(“memo”).value

});

localStorage.setItem(
“wagaya_data”,
JSON.stringify(data)
);

document.getElementById(“amount”).value=””;
document.getElementById(“memo”).value=””;

render();

}

function del(i){

data.splice(i,1);

localStorage.setItem(
“wagaya_data”,
JSON.stringify(data)
);

render();

}

function resetMonth(){

if(!confirm(“今月の履歴を削除しますか？”))
return;

data=[];

localStorage.setItem(
“wagaya_data”,
JSON.stringify(data)
);

render();

}

function render(){

document.getElementById(“budgetFood”).value=
budgets[“食費”];

document.getElementById(“budgetLeisure”).value=
budgets[“外食/レジャー費”];

document.getElementById(“budgetDaily”).value=
budgets[“日用品費”];

document.getElementById(“budgetGas”).value=
budgets[“ガソリン費”];

let totalBudget=0;

Object.values(budgets).forEach(x=>{
totalBudget+=x;
});

let spent=0;

const used={};

Object.keys(budgets).forEach(k=>{
used[k]=0;
});

data.forEach(x=>{

spent+=x.amount;

used[x.category]+=x.amount;

});

document.getElementById(“totalBudget”).innerHTML=
“¥”+totalBudget.toLocaleString();

document.getElementById(“spent”).innerHTML=
“¥”+spent.toLocaleString();

document.getElementById(“remaining”).innerHTML=
“¥”+(totalBudget-spent).toLocaleString();

let budgetHtml=””;

Object.keys(budgets).forEach(k=>{

const remain=budgets[k]-used[k];

budgetHtml+=`

<tr>
<td>${k}</td>
<td class="${remain<0?'over':''}">
¥${remain.toLocaleString()}
</td>
</tr>
`;

});

document.getElementById(“budgetTable”).innerHTML=
budgetHtml;

let hist=””;

data.forEach((x,i)=>{

hist+=`

<tr>
<td>${x.category}</td>
<td>¥${x.amount.toLocaleString()}</td>
<td>${x.memo||""}</td>
<td>
<button onclick="del(${i})">
削除
</button>
</td>
</tr>
`;

});

document.getElementById(“history”).innerHTML=
hist;

}

render();

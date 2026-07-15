const dateCard = document.getElementById("dateTime");

function updateTime() {
    const now = new Date();

    dateCard.innerHTML = `
        ${now.toLocaleDateString()} <br><br>
        ${now.toLocaleTimeString()}
    `;
}

setInterval(updateTime, 1000);
updateTime();

const btn = document.querySelector("button");

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        btn.innerHTML = "☀️";
    } else {
        btn.innerHTML = "🌙";
    }
});


const todoInput = document.getElementById("todoInput");
const addTask = document.getElementById("addTask");
const todoList = document.getElementById("todoList");

addTask.addEventListener("click", () => {

    let task = todoInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    todoInput.value = "";
});

const planner = document.getElementById("planner");
const savePlan = document.getElementById("savePlan");

planner.value = localStorage.getItem("planner") || "";

savePlan.addEventListener("click", () => {

    localStorage.setItem("planner", planner.value);

    alert("Planner Saved");

});

const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let time = 25 * 60;
let interval;

function updateTimer(){

    let minutes = Math.floor(time/60);
    let seconds = time%60;

    timer.innerHTML =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

updateTimer();

startBtn.addEventListener("click",()=>{

    clearInterval(interval);

    interval = setInterval(()=>{

        if(time>0){

            time--;

            updateTimer();

        }

    },1000);

});

resetBtn.addEventListener("click",()=>{

    clearInterval(interval);

    time = 25*60;

    updateTimer();

});

const goalInput = document.getElementById("goalInput");
const goalList = document.getElementById("goalList");
const addGoal = document.getElementById("addGoal");

addGoal.addEventListener("click", function () {

    if (goalInput.value.trim() === "") return;

    const li = document.createElement("li");
    li.textContent = goalInput.value;

    goalList.appendChild(li);

    goalInput.value = "";
});

let todos=JSON.parse(localStorage.getItem("todos")) || [];

function saveTodo(){

localStorage.setItem("todos",JSON.stringify(todos));

}

function renderTodo(){

todoList.innerHTML="";

todos.forEach((item,index)=>{

const li=document.createElement("li");

li.innerHTML=`
${item}

<button onclick="deleteTodo(${index})">
</button>
`;

todoList.appendChild(li);

});

}

function addTodo(){

const task=todoInput.value;

if(task==="") return;

todos.push(task);

saveTodo();

renderTodo();

todoInput.value="";

}

function deleteTodo(index){

todos.splice(index,1);

saveTodo();

renderTodo();

}

renderTodo();
async function getQuote() {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

    document.getElementById("quote").innerHTML = `
        "${data.quote}"<br><br>
        <b>- ${data.author}</b>
    `;
}

getQuote();


document.getElementById("newQuote").addEventListener("click", getQuote);
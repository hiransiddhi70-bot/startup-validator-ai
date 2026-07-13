/* ===========================================
   STARTUP VALIDATOR AI
   script.js
=========================================== */

// =======================
// DOM Elements
// =======================

const startupForm = document.getElementById("startupForm");

const startupName = document.getElementById("startupName");

const industry = document.getElementById("industry");

const problem = document.getElementById("problem");

const audience = document.getElementById("audience");

const scoreValue = document.getElementById("startupScore");

const innovationValue = document.getElementById("innovationScore");

const scalabilityValue = document.getElementById("scalabilityScore");

const investorValue = document.getElementById("investorScore");

const swotContainer = document.getElementById("swotContainer");

const roadmapContainer = document.getElementById("roadmapContainer");

const pitchContainer = document.getElementById("pitchContainer");

const revenueContainer = document.getElementById("revenueContainer");


// =======================
// Populate Dropdown
// =======================

window.addEventListener("load",()=>{

industries.forEach(item=>{

const option=document.createElement("option");

option.value=item;

option.textContent=item;

industry.appendChild(option);

});

});


// =======================
// Random Helper
// =======================

function random(arr){

return arr[Math.floor(Math.random()*arr.length)];

}


// =======================
// Generate Score
// =======================

function randomScore(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}


// =======================
// Startup Evaluation
// =======================

function evaluateStartup(){

const name=startupName.value.trim();

const prob=problem.value.trim();

const ind=industry.value;

const aud=audience.value.trim();

if(

name===""

||

prob===""

||

ind===""

||

aud===""

){

alert("Please fill all required fields.");

return;

}


// Base Scores

let startupScore=randomScore(70,98);

let innovation=randomScore(65,99);

let scalability=randomScore(60,98);

let investor=randomScore(55,95);


// Smart Adjustments

if(prob.length>120){

startupScore+=2;

innovation+=2;

}

if(ind==="Artificial Intelligence"){

innovation+=3;

}

if(prob.toLowerCase().includes("ai")){

innovation+=2;

}

if(aud.split(" ").length>3){

startupScore+=2;

}


// Limit Scores

startupScore=Math.min(startupScore,100);

innovation=Math.min(innovation,100);

scalability=Math.min(scalability,100);

investor=Math.min(investor,100);


// Update UI

scoreValue.textContent=startupScore+"%";

innovationValue.textContent=innovation+"%";

scalabilityValue.textContent=scalability+"%";

investorValue.textContent=investor+"%";


// Generate Everything

generateSWOT();

generateRevenue();

generateRoadmap();

generatePitch();

drawChart(

startupScore,

innovation,

scalability,

investor

);

saveHistory();

  }
/* ===========================================
   SWOT GENERATOR
=========================================== */

function generateSWOT(){

swotContainer.innerHTML="";

const data=[
{
title:"Strengths",
class:"strength",
items:strengths
},
{
title:"Weaknesses",
class:"weakness",
items:weaknesses
},
{
title:"Opportunities",
class:"opportunity",
items:opportunities
},
{
title:"Threats",
class:"threat",
items:threats
}
];

data.forEach(section=>{

const box=document.createElement("div");

box.className=`box ${section.class}`;

box.innerHTML=`
<h2>${section.title}</h2>
<ul>
<li>${random(section.items)}</li>
<li>${random(section.items)}</li>
<li>${random(section.items)}</li>
</ul>
`;

swotContainer.appendChild(box);

});

}

/* ===========================================
   REVENUE MODEL
=========================================== */

function generateRevenue(){

let html="";

for(let i=0;i<4;i++){

html+=`
<div class="card">
<h3>${revenueModels[i]}</h3>
<p>
Recommended revenue strategy for your startup.
</p>
</div>
`;

}

revenueContainer.innerHTML=html;

}

/* ===========================================
   ROADMAP
=========================================== */

function generateRoadmap(){

roadmapContainer.innerHTML=`

<div class="step">
<div class="circle">30</div>
<div class="content">
<h3>First 30 Days</h3>
<ul>
${roadmap.day30.map(x=>`<li>${x}</li>`).join("")}
</ul>
</div>
</div>

<div class="step">
<div class="circle">90</div>
<div class="content">
<h3>90 Days</h3>
<ul>
${roadmap.day90.map(x=>`<li>${x}</li>`).join("")}
</ul>
</div>
</div>

<div class="step">
<div class="circle">6M</div>
<div class="content">
<h3>6 Months</h3>
<ul>
${roadmap.month6.map(x=>`<li>${x}</li>`).join("")}
</ul>
</div>
</div>

<div class="step">
<div class="circle">1Y</div>
<div class="content">
<h3>1 Year</h3>
<ul>
${roadmap.year1.map(x=>`<li>${x}</li>`).join("")}
</ul>
</div>
</div>

`;

}

/* ===========================================
   ELEVATOR PITCH
=========================================== */

function generatePitch(){

const name=startupName.value;

const ind=industry.value;

const aud=audience.value;

const text=random(pitchTemplates)

.replace("{AUDIENCE}",aud)

.replace("{PROBLEM}","a real-world challenge")

.replace("{SOLUTION}",name)

.replace("{CATEGORY}",ind)

.replace("{INDUSTRY}",ind);

pitchContainer.innerHTML=`

<div class="card">

<h2>🚀 Elevator Pitch</h2>

<p style="margin-top:20px;line-height:1.8;">

${text}

</p>

</div>

`;

}
/* ===========================================
   CHART.JS
=========================================== */

let startupChart=null;

function drawChart(startup,innovation,scalability,investor){

const ctx=document.getElementById("chart").getContext("2d");

if(startupChart){

startupChart.destroy();

}

startupChart=new Chart(ctx,{

type:"radar",

data:{

labels:[

"Startup",

"Innovation",

"Scalability",

"Investor",

"Growth",

"Market"

],

datasets:[{

label:"Startup Analysis",

data:[

startup,

innovation,

scalability,

investor,

Math.floor((startup+innovation)/2),

Math.floor((startup+investor)/2)

],

fill:true,

backgroundColor:"rgba(108,99,255,.25)",

borderColor:"#6C63FF",

pointBackgroundColor:"#00D4FF",

pointRadius:5,

borderWidth:3

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:"#fff"

}

}

},

scales:{

r:{

min:0,

max:100,

ticks:{

color:"#fff"

},

grid:{

color:"rgba(255,255,255,.15)"

},

angleLines:{

color:"rgba(255,255,255,.15)"

},

pointLabels:{

color:"#fff"

}

}

}

}

});

}

/* ===========================================
   SAVE HISTORY
=========================================== */

function saveHistory(){

const history=

JSON.parse(

localStorage.getItem("startupHistory")

)||[];

history.unshift({

name:startupName.value,

industry:industry.value,

score:scoreValue.textContent,

date:new Date().toLocaleString()

});

if(history.length>10){

history.pop();

}

localStorage.setItem(

"startupHistory",

JSON.stringify(history)

);

}

/* ===========================================
   VIEW HISTORY
=========================================== */

function viewHistory(){

const history=

JSON.parse(

localStorage.getItem("startupHistory")

)||[];

if(history.length===0){

alert("No startup history found.");

return;

}

let text="Saved Startup Ideas\n\n";

history.forEach((item,index)=>{

text+=

`${index+1}. ${item.name}

Industry : ${item.industry}

Score : ${item.score}

Date : ${item.date}

-------------------------

`;

});

alert(text);

}

/* ===========================================
   DOWNLOAD REPORT
=========================================== */

function downloadReport(){

const report=`

===== STARTUP VALIDATOR AI =====

Startup :

${startupName.value}

Industry :

${industry.value}

Target Audience :

${audience.value}

Startup Score :

${scoreValue.textContent}

Innovation :

${innovationValue.textContent}

Scalability :

${scalabilityValue.textContent}

Investor Readiness :

${investorValue.textContent}

Generated using Startup Validator AI

`;

const blob=new Blob(

[report],

{

type:"text/plain"

}

);

const link=document.createElement("a");

link.href=

URL.createObjectURL(blob);

link.download=

`${startupName.value}-Report.txt`;

link.click();

}

/* ===========================================
   DARK MODE
=========================================== */

function toggleTheme(){

document.body.classList.toggle("light");

}

/* ===========================================
   RESET
=========================================== */

function resetForm(){

startupForm.reset();

scoreValue.textContent="0%";

innovationValue.textContent="0%";

scalabilityValue.textContent="0%";

investorValue.textContent="0%";

swotContainer.innerHTML="";

roadmapContainer.innerHTML="";

pitchContainer.innerHTML="";

revenueContainer.innerHTML="";

if(startupChart){

startupChart.destroy();

startupChart=null;

}

}

/* ===========================================
   END OF SCRIPT
=========================================== */

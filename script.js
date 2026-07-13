/* ===========================================
   STARTUP VALIDATOR AI
   script.js
   Version 2.0
=========================================== */

// ---------- DOM Elements ----------

const form = document.getElementById("startupForm");

const startupName = document.getElementById("startupName");
const industry = document.getElementById("industry");
const audience = document.getElementById("audience");
const problem = document.getElementById("problem");

const startupScore = document.getElementById("startupScore");
const innovationScore = document.getElementById("innovationScore");
const scalabilityScore = document.getElementById("scalabilityScore");
const investorScore = document.getElementById("investorScore");

const revenueContainer = document.getElementById("revenueContainer");
const swotContainer = document.getElementById("swotContainer");
const roadmapContainer = document.getElementById("roadmapContainer");
const pitchContainer = document.getElementById("pitchContainer");

// Progress Rings

const ringStartup = document.getElementById("ringStartup");
const ringInnovation = document.getElementById("ringInnovation");
const ringScale = document.getElementById("ringScale");
const ringInvestor = document.getElementById("ringInvestor");

// Chart

let startupChart = null;

// ---------- Initialize ----------

document.addEventListener("DOMContentLoaded", () => {

loadIndustries();

loadTheme();

loadHistory();

});

// ---------- Load Industries ----------

function loadIndustries() {

industry.innerHTML =
'<option value="">Select Industry</option>';

INDUSTRIES.forEach(item => {

const option = document.createElement("option");

option.value = item;

option.textContent = item;

industry.appendChild(option);

});

}

// ---------- Random Utility ----------

function randomItem(array){

return array[Math.floor(Math.random()*array.length)];

}

// ---------- Average ----------

function average(...numbers){

const total=numbers.reduce((a,b)=>a+b,0);

return Math.round(total/numbers.length);

}

// ---------- Clamp ----------

function clamp(value,min,max){

return Math.max(min,Math.min(max,value));

}

// ---------- Badge ----------

function getBadge(score){

return BADGES.find(item=>

score>=item.min && score<=item.max

).name;

}

// ---------- Theme ----------

function loadTheme(){

const theme=

localStorage.getItem("theme");

if(theme==="light"){

document.body.classList.add("light");

}

}

function toggleTheme(){

document.body.classList.toggle("light");

localStorage.setItem(

"theme",

document.body.classList.contains("light")

? "light"

: "dark"

);

}

// ---------- Reset ----------

function resetForm(){

form.reset();

startupScore.textContent="0%";

innovationScore.textContent="0%";

scalabilityScore.textContent="0%";

investorScore.textContent="0%";

ringStartup.textContent="0%";

ringInnovation.textContent="0%";

ringScale.textContent="0%";

ringInvestor.textContent="0%";

revenueContainer.innerHTML="";

swotContainer.innerHTML="";

roadmapContainer.innerHTML="";

pitchContainer.innerHTML="";

if(startupChart){

startupChart.destroy();

startupChart=null;

}

}

// ---------- Local Storage ----------

function loadHistory(){

if(!localStorage.getItem("startupHistory")){

localStorage.setItem(

"startupHistory",

JSON.stringify([])

);

}

}
/* ===========================================
   STARTUP SCORING ENGINE
=========================================== */

function evaluateStartup(){

const name = startupName.value.trim();
const selectedIndustry = industry.value;
const targetAudience = audience.value.trim();
const problemStatement = problem.value.trim();

if(
!name ||
!selectedIndustry ||
!targetAudience ||
!problemStatement
){

alert("Please fill all fields.");

return;

}

let startup = 35;
let innovation = 30;
let scalability = 30;
let investor = 30;

/* =============================
   Startup Name
============================= */

if(name.length>=5){

startup+=5;

innovation+=4;

}

if(name.length>=10){

startup+=3;

}

/* =============================
   Problem Statement
============================= */

const words = problemStatement.split(/\s+/).length;

if(words>20){

startup+=10;

innovation+=10;

}

if(words>40){

startup+=5;

investor+=5;

}

const lowerProblem = problemStatement.toLowerCase();

const keywords=[
"ai",
"automation",
"security",
"health",
"education",
"student",
"finance",
"travel",
"cloud",
"productivity",
"sustainability",
"marketplace"
];

keywords.forEach(word=>{

if(lowerProblem.includes(word)){

innovation+=3;

}

});

/* =============================
   Audience
============================= */

const audienceWords=targetAudience.split(/\s+/).length;

if(audienceWords>=2){

startup+=5;

}

if(audienceWords>=4){

investor+=5;

}

/* =============================
   Industry Scores
============================= */

switch(selectedIndustry){

case "Artificial Intelligence":

innovation+=18;
investor+=10;
break;

case "HealthTech":

innovation+=14;
startup+=8;
break;

case "FinTech":

innovation+=12;
investor+=8;
break;

case "SaaS":

startup+=10;
scalability+=15;
break;

case "Marketplace":

scalability+=15;
startup+=10;
break;

case "EdTech":

startup+=8;
innovation+=6;
break;

default:

startup+=6;
innovation+=6;

}

/* =============================
   Final Adjustments
============================= */

scalability=

average(

startup,

innovation,

65

);

investor=

average(

startup,

innovation,

scalability,

investor

);

startup=

clamp(startup,0,100);

innovation=

clamp(innovation,0,100);

scalability=

clamp(scalability,0,100);

investor=

clamp(investor,0,100);

/* =============================
   Update Dashboard
============================= */

startupScore.textContent=startup+"%";
innovationScore.textContent=innovation+"%";
scalabilityScore.textContent=scalability+"%";
investorScore.textContent=investor+"%";

ringStartup.textContent=startup+"%";
ringInnovation.textContent=innovation+"%";
ringScale.textContent=scalability+"%";
ringInvestor.textContent=investor+"%";

/* =============================
   Generate Report
============================= */

generateRevenue(selectedIndustry);

generateSWOT();

generateRoadmap();

generatePitch(
selectedIndustry,
targetAudience,
problemStatement
);

drawChart(
startup,
innovation,
scalability,
investor
);

saveStartup({

name,

industry:selectedIndustry,

audience:targetAudience,

startup,

innovation,

scalability,

investor,

badge:getBadge(startup)

});

showBadge(getBadge(startup));

}

/* ===========================================
   GENERATE REVENUE
=========================================== */

function generateRevenue(selectedIndustry){

revenueContainer.innerHTML="";

let recommendations=[...REVENUE_MODELS];

if(selectedIndustry==="SaaS"){

recommendations=[
REVENUE_MODELS[0],
REVENUE_MODELS[5],
REVENUE_MODELS[7]
];

}

else if(selectedIndustry==="Marketplace"){

recommendations=[
REVENUE_MODELS[2],
REVENUE_MODELS[6],
REVENUE_MODELS[3]
];

}

else if(selectedIndustry==="EdTech"){

recommendations=[
REVENUE_MODELS[0],
REVENUE_MODELS[1],
REVENUE_MODELS[6]
];

}

recommendations.forEach(model=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<h3>${model.name}</h3>

<p>${model.description}</p>

`;

revenueContainer.appendChild(card);

});

}

/* ===========================================
   SWOT
=========================================== */

function generateSWOT(){

swotContainer.innerHTML="";

const sections=[

{
title:"💪 Strengths",
className:"strength",
list:SWOT.strengths
},

{
title:"⚠ Weaknesses",
className:"weakness",
list:SWOT.weaknesses
},

{
title:"🚀 Opportunities",
className:"opportunity",
list:SWOT.opportunities
},

{
title:"🛑 Threats",
className:"threat",
list:SWOT.threats
}

];

sections.forEach(section=>{

const card=document.createElement("div");

card.className=`box ${section.className}`;

let html=`<h2>${section.title}</h2><ul>`;

for(let i=0;i<3;i++){

html+=`<li>${randomItem(section.list)}</li>`;

}

html+="</ul>";

card.innerHTML=html;

swotContainer.appendChild(card);

});

}

/* ===========================================
   ROADMAP
=========================================== */

function generateRoadmap(){

roadmapContainer.innerHTML="";

const roadmapData=[

{

title:"Month 1",

tasks:ROADMAP.month1

},

{

title:"Month 3",

tasks:ROADMAP.month3

},

{

title:"Month 6",

tasks:ROADMAP.month6

},

{

title:"Year 1",

tasks:ROADMAP.year1

}

];

roadmapData.forEach((phase,index)=>{

const step=document.createElement("div");

step.className="step";

step.innerHTML=`

<div class="circle">

${index+1}

</div>

<div class="content">

<h3>${phase.title}</h3>

<ul>

${phase.tasks.map(task=>`<li>${task}</li>`).join("")}

</ul>

</div>

`;

roadmapContainer.appendChild(step);

});

}

/* ===========================================
   ELEVATOR PITCH
=========================================== */

function generatePitch(

industry,

audience,

problem

){

let pitch=randomItem(PITCHES);

pitch=pitch
.replace("{AUDIENCE}",audience)
.replace("{INDUSTRY}",industry)
.replace("{PROBLEM}",problem.toLowerCase());

pitchContainer.innerHTML=`

<div class="card">

<h2>🎤 Elevator Pitch</h2>

<p style="margin-top:20px;line-height:1.8;">

${pitch}

</p>

</div>

`;

}

/* ===========================================
   BADGE
=========================================== */

function showBadge(badge){

const badgeCard=document.createElement("div");

badgeCard.className="card";

badgeCard.style.marginTop="30px";

badgeCard.innerHTML=`

<h2>🏆 Startup Rating</h2>

<h1 style="margin-top:20px;">

${badge}

</h1>

<p style="margin-top:15px;">

Your startup has been evaluated using our rule-based validation engine.

</p>

`;

pitchContainer.appendChild(badgeCard);

}
/* ===========================================
   CHART.JS
=========================================== */

function drawChart(startup, innovation, scalability, investor){

const canvas=document.getElementById("chart");

if(!canvas) return;

const ctx=canvas.getContext("2d");

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

"Market",

"Growth"

],

datasets:[{

label:"Startup Analysis",

data:[

startup,

innovation,

scalability,

investor,

average(startup,innovation),

average(scalability,investor)

],

fill:true,

backgroundColor:"rgba(108,99,255,.25)",

borderColor:"#6C63FF",

pointBackgroundColor:"#00D4FF",

borderWidth:3,

pointRadius:5

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:getComputedStyle(document.body).color

}

}

},

scales:{

r:{

min:0,

max:100,

ticks:{

stepSize:20,

backdropColor:"transparent",

color:getComputedStyle(document.body).color

},

pointLabels:{

color:getComputedStyle(document.body).color

},

grid:{

color:"rgba(255,255,255,.15)"

},

angleLines:{

color:"rgba(255,255,255,.15)"

}

}

}

}

});

}

/* ===========================================
   SAVE STARTUP
=========================================== */

function saveStartup(data){

const history=

JSON.parse(

localStorage.getItem("startupHistory")

)||[];

history.unshift({

...data,

date:new Date().toLocaleString()

});

if(history.length>15){

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

let report="===== Startup History =====\n\n";

history.forEach((item,index)=>{

report+=

`${index+1}. ${item.name}

Industry : ${item.industry}

Audience : ${item.audience}

Startup : ${item.startup}%

Innovation : ${item.innovation}%

Scalability : ${item.scalability}%

Investor : ${item.investor}%

Badge : ${item.badge}

Date : ${item.date}

----------------------------

`;

});

alert(report);

}

/* ===========================================
   DOWNLOAD REPORT
=========================================== */

function downloadReport(){

if(startupScore.textContent==="0%"){

alert("Please evaluate a startup first.");

return;

}

const report=

`============================

STARTUP VALIDATOR AI REPORT

============================

Startup :

${startupName.value}

Industry :

${industry.value}

Audience :

${audience.value}

Problem :

${problem.value}

Startup Score :

${startupScore.textContent}

Innovation :

${innovationScore.textContent}

Scalability :

${scalabilityScore.textContent}

Investor :

${investorScore.textContent}

Badge :

${getBadge(parseInt(startupScore.textContent))}

Generated using Startup Validator AI

`;

const blob=

new Blob(

[report],

{

type:"text/plain"

}

);

const link=

document.createElement("a");

link.href=

URL.createObjectURL(blob);

link.download=

`${startupName.value.replace(/\s+/g,"_")}_Report.txt`;

link.click();

URL.revokeObjectURL(link.href);

}

/* ===========================================
   FORM SUBMIT
=========================================== */

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

evaluateStartup();

});

}

/* ===========================================
   END OF FILE
=========================================== */

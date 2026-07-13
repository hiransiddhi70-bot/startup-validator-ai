/* ===========================================
   Startup Validator AI
   data.js
   Version 2.0
=========================================== */

/* ---------- Industries ---------- */

const INDUSTRIES = [
  "Artificial Intelligence",
  "EdTech",
  "HealthTech",
  "FinTech",
  "Cybersecurity",
  "SaaS",
  "E-Commerce",
  "Agritech",
  "Travel",
  "FoodTech",
  "Productivity",
  "Fitness",
  "Gaming",
  "Social Media",
  "Real Estate",
  "Logistics",
  "Education",
  "Marketplace",
  "IoT",
  "Blockchain"
];

/* ---------- Revenue Models ---------- */

const REVENUE_MODELS = [
  {
    name:"Subscription",
    description:"Charge customers monthly or yearly for premium features."
  },
  {
    name:"Freemium",
    description:"Offer basic features free and premium upgrades."
  },
  {
    name:"Marketplace Commission",
    description:"Earn a commission from every transaction."
  },
  {
    name:"Advertising",
    description:"Generate revenue through advertisements."
  },
  {
    name:"One-Time Purchase",
    description:"Users pay once for lifetime access."
  },
  {
    name:"Enterprise Licensing",
    description:"Sell business plans to companies."
  },
  {
    name:"Affiliate Marketing",
    description:"Earn commission by recommending products."
  },
  {
    name:"Usage Based",
    description:"Customers pay according to usage."
  }
];

/* ---------- SWOT ---------- */

const SWOT = {

strengths:[
"Strong value proposition",
"Simple user experience",
"Scalable technology",
"Growing digital demand",
"Recurring revenue potential",
"Low operational cost",
"Modern technology stack",
"Fast MVP development",
"Easy global expansion",
"High customer retention potential"
],

weaknesses:[
"Limited brand awareness",
"Competitive market",
"Requires marketing investment",
"Small development team",
"Customer acquisition challenges",
"Needs continuous improvements",
"Limited initial funding",
"Product validation required",
"Feature prioritization needed",
"Early-stage uncertainty"
],

opportunities:[
"AI adoption is increasing",
"International expansion",
"Government startup support",
"Strategic partnerships",
"Rapid digital transformation",
"Growing smartphone users",
"Enterprise adoption",
"Emerging markets",
"Subscription economy growth",
"Technology innovation"
],

threats:[
"Strong competitors",
"Changing regulations",
"Economic slowdown",
"Cybersecurity risks",
"Rapid technology changes",
"Funding difficulties",
"Market saturation",
"Changing customer expectations",
"Privacy concerns",
"Platform dependency"
]

};

/* ---------- Startup Badges ---------- */

const BADGES = [

{
min:0,
max:39,
name:"🌱 Beginner Idea"
},

{
min:40,
max:59,
name:"🚀 Promising Startup"
},

{
min:60,
max:79,
name:"⭐ High Potential"
},

{
min:80,
max:94,
name:"💎 Investor Ready"
},

{
min:95,
max:100,
name:"🦄 Unicorn Potential"
}

];

/* ---------- Roadmap ---------- */

const ROADMAP = {

month1:[
"Validate the problem",
"Research competitors",
"Identify target audience",
"Build wireframes",
"Develop MVP"
],

month3:[
"Launch beta version",
"Collect feedback",
"Improve user experience",
"Fix bugs",
"Acquire first users"
],

month6:[
"Release Version 2",
"Start monetization",
"Expand marketing",
"Build community",
"Improve scalability"
],

year1:[
"Grow nationally",
"Build a larger team",
"Seek funding",
"Launch mobile app",
"Expand internationally"
]

};

/* ---------- Investor Tips ---------- */

const INVESTOR_TIPS = [

"Validate your idea with real users.",

"Keep customer acquisition cost low.",

"Focus on solving one important problem.",

"Build an MVP before scaling.",

"Track user retention.",

"Create a sustainable revenue model.",

"Show measurable growth.",

"Keep your product simple.",

"Understand your competitors.",

"Iterate using customer feedback."

];

/* ---------- Elevator Pitch Templates ---------- */

const PITCHES = [

"Our startup helps {AUDIENCE} solve {PROBLEM} through an innovative {INDUSTRY} platform.",

"We are building a scalable {INDUSTRY} solution focused on making {PROBLEM} easier.",

"Our mission is to transform the {INDUSTRY} industry by helping {AUDIENCE}.",

"We empower {AUDIENCE} with smarter technology that solves {PROBLEM}.",

"We believe technology can simplify {PROBLEM} for millions of users."

];

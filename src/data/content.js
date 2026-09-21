export const EMAIL = "amansoni.strive@gmail.com";
export const PHONE = "+91-9352460755";
export const LOCATION = "Jhalawar, Rajasthan, India";
export const LINKEDIN = "https://www.linkedin.com/in/aman-updates/";
export const GITHUB = "https://github.com/built-with-aman";
export const RESUME = "/resume.pdf";

export const PROJECTS = [
  {
    id: "jigsaw",
    index: "01",
    name: "Jigsaw",
    tag: "Structured learning platform",
    period: "2025 →",
    status: "In progress — content + backend expansion underway",
    desc: "A structured learning platform that curates resources, learning pathways, and coursework into one place — with a community hub built around discussions and shared progress. Built on React 19 and Vite 6, it treats learning like a system, not a scroll.",
    stack: ["React 19", "Vite 6", "React Router 7", "Tailwind CSS 3", "GSAP", "Lenis", "Lucide React"],
    note: "next: backend + persistence for user progress and community threads",
    media: [],
    liveUrl: "https://jigsawresourcehub.vercel.app/",
    githubUrl: "https://github.com/built-with-aman/JIGSAW",
    demoVideo: null,
    highlights: [
      "A structured learning platform organizing curated resources, learning pathways, and coursework into one navigable experience.",
      "Built with React 19 + Vite 6, React Router 7 for routing, and Tailwind CSS 3 with CSS variables for theming — light/dark toggle persisted to localStorage.",
      "Motion via Motion, GSAP, and Lenis for smooth scrolling and reveal animations, with Lucide React icons throughout.",
      "Modular architecture: reusable components (Navbar, Footer, Reveal, SpotlightCard, StatCounter), custom hooks (useTheme, useReveal, useSmoothScroll, useMagnetic, useFormValidation), and a data layer driving resources, courses, pathways, and discussions.",
      "Next: backend and persistence so progress and community discussions survive a refresh.",
    ],
  },
  {
    id: "sheetcraft",
    index: "02",
    name: "SheetCraft",
    tag: "Spreadsheet-style web app",
    period: "2025 →",
    status: "In progress — auth + persistence underway",
    desc: "A React-built take on the spreadsheet — cell selection, multi-edit workflows and real-time UI updates, structured into components that don't fight each other.",
    stack: ["React", "JavaScript", "Node.js", "MySQL"],
    note: "next: auth + persistent storage, so the data outlives the tab",
    media: [],
    liveUrl: null,
    githubUrl: "https://github.com/built-with-aman",
    demoVideo: null,
    highlights: [
      "A spreadsheet-style web app for creating, editing and managing tabular data through an interactive browser interface.",
      "Cell selection, multi-edit workflows and real-time UI updates, built with React.js and JavaScript.",
      "Reusable frontend components and responsive layouts, chosen for maintainability over cleverness.",
      "Next: Node.js and MySQL for authentication and persistent storage — the parts a spreadsheet quietly depends on.",
    ],
  },
  {
    id: "memix",
    index: "03",
    name: "Memix Overlay",
    tag: "Always-on-top meme & gif overlay",
    period: "2025 →",
    status: "Early build — full write-up coming soon",
    desc: "A lightweight always-on-top desktop overlay for pinning memes, stickers and looping gifs while you work, without ever stealing window focus.",
    stack: ["JavaScript", "CSS3", "Electron"],
    note: "full case study in progress",
    media: [],
    liveUrl: null,
    githubUrl: "https://github.com/built-with-aman",
    demoVideo: null,
    highlights: [
      "An always-on-top overlay window with adjustable opacity, so it never blocks the app underneath it.",
      "A small dashboard for pinning memes, stickers and gif loops, with quick toggle controls.",
      "Built for a fast context-switch and an even faster return to actual work.",
    ],
  },
  {
    id: "forge",
    index: "04",
    name: "Forge Draw",
    tag: "Freehand + shape drawing tool",
    period: "2025 →",
    status: "Early build — full write-up coming soon",
    desc: "A browser-based drawing tool that pairs freehand sketching with resizable shapes, built to export clean PNG and SVG output on the first try.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3"],
    note: "full case study in progress",
    media: [],
    liveUrl: null,
    githubUrl: "https://github.com/built-with-aman",
    demoVideo: null,
    highlights: [
      "Freehand drawing alongside resizable shape primitives, complete with selection handles that behave.",
      "One-click export to PNG and SVG, ready to drop straight into a doc.",
      "Built for quick diagramming without opening a heavyweight design tool just to draw a box.",
    ],
  },
];

export const LEVELS = [
  {
    t: 0.05,
    lvl: "01",
    year: "2021 – 2025",
    title: "B.Tech, Computer Science (Cyber Security)",
    text: "Poornima College of Engineering, Jaipur — CGPA 8.17/10, and a syllabus heavy enough to make DSA, OOP, DBMS, Operating Systems and Computer Networks feel like second nature.",
    side: "up",
  },
  {
    t: 0.29,
    lvl: "02",
    year: "Early 2025 →",
    title: "Deep DSA practice",
    text: "Started Deep DSA at the beginning of 2025 — 300+ problems across LeetCode, Code360 and HackerRank, plus enough SQL and CRUD practice to stop fearing a JOIN clause.",
    side: "down",
  },
  {
    t: 0.5,
    lvl: "03",
    year: "May 2025 – Aug 2025",
    title: "React Developer Intern",
    text: "The Entrepreneurship Network (Remote) — shipped reusable React UI, hunted down frontend bugs, and survived enough Git/GitHub code reviews to start enjoying them.",
    side: "down",
  },
  {
    t: 0.72,
    lvl: "04",
    year: "2025 →",
    title: "Product-shaped projects",
    text: "Jigsaw, SheetCraft and a few other shipped experiments — full-stack and front-end builds, one repo (and one merge conflict) at a time.",
    side: "down",
  },
  {
    t: 0.95,
    lvl: "05",
    year: "2025 – 26",
    title: "SDE path active",
    text: "This portfolio is the proof, AI-assisted workflows are the daily habit. Actively looking for SDE 2026 roles — recruiters, the inbox is open.",
    side: "down",
    boss: true,
  },
];

export const SIDE_QUESTS = [
  {
    label: "React Developer Intern",
    period: "May 2025 – Aug 2025",
    detail: "Shipped reusable React UI at The Entrepreneurship Network — component architecture, state management, API integration, and responsive layouts.",
  },
  {
    label: "Deep DSA practice",
    period: "Early 2025 → present",
    detail: "Started at the beginning of 2025. 300+ problems across LeetCode, Code360 and HackerRank — patterns over memorizing, every miss annotated.",
  },
  {
    label: "AI-assisted workflows",
    period: "Daily habit",
    detail: "Claude, ChatGPT, Gemini, Grok and Emergent — the pair programmers who never need coffee — used for prototyping, debugging and shipping faster.",
  },
  {
    label: "SQL practice",
    period: "HackerRank certified",
    detail: "Queries, joins and CRUD operations written clearly enough to pass for prose — no ORM required.",
  },
  {
    label: "CodePen prototyping",
    period: "Ongoing",
    detail: "UI components built once, published, and reused without an ounce of guilt.",
  },
  {
    label: "Cross-platform grind",
    period: "Ongoing",
    detail: "LeetCode, Code360, HackerRank — a three-front consistency habit rather than a one-site sprint.",
  },
];

export const PRINCIPLES = [
  {
    num: "01",
    title: "Own the primitive",
    text: "Build it without the library first. An abstraction has to be earned — not imported on faith and a changelog nobody read. If you can't explain what the black box does, you don't get to use it.",
    foot: "no magic imports",
  },
  {
    num: "02",
    title: "Failure is data",
    text: "Broken states get logged, not swept under the rug. A failure journal compounds faster than a highlight reel ever could. Every miss gets an honest note — because the next bug doesn't care how good the last demo looked.",
    foot: "300+ problems · every miss annotated",
  },
  {
    num: "03",
    title: "Ship the argument",
    text: "A thing is finished when the design can be defended — not the moment the happy path limps across the finish line. If you can't argue for the decision, you didn't make one. You guessed and got lucky.",
    foot: "green squares are a side effect",
  },
  {
    num: "04",
    title: "Boring beats clever",
    text: "Nobody has ever been fired for code that reads like prose. The clever one-liner you're proud of is the same line that ruins someone's Tuesday six months later — usually yours.",
    foot: "readability > cleverness",
  },
  {
    num: "05",
    title: "Small, honest commits",
    text: "One change. One reason. One commit message your future self won't curse. The 4,000-line mega-commit is not a flex — it's a hostage situation with a deadline.",
    foot: "git log that reads like a diary",
  },
  {
    num: "06",
    title: "Spacing is the design",
    text: "You can hide a lot behind gradients and motion, but never behind bad spacing. The eye notices rhythm before it notices color — every single time. Get the whitespace right and half the design is done.",
    foot: "borderline OCD, properly applied",
  },
  {
    num: "07",
    title: "Respect the platform",
    text: "The browser, the OS, the language — they're not obstacles. They're collaborators with strong opinions. Fight them and you lose. Learn their rules and you get to ship things that don't randomly break on Tuesdays.",
    foot: "no re-inventing the scrollbar",
  },
  {
    num: "08",
    title: "Own the outcome, not the excuse",
    text: "Deadlines slip. Bugs happen. Designs change. What doesn't change is who's accountable for the result. 'The client moved the goalpost' is a footnote, never a headline.",
    foot: "shipped > sorry",
  },
  {
    num: "09",
    title: "Read before you write",
    text: "Half of engineering is reading — docs, diffs, other people's code, your own from last year. Skipping this step is how you end up rebuilding something that already existed, worse.",
    foot: "the best fix is often a delete",
  },
  {
    num: "10",
    title: "Done is a real word",
    text: "Refactoring forever is not perfectionism — it's procrastination wearing a nicer jacket. Ship it, live with it for a week, and let reality tell you what actually needs fixing. The roadmap you never release is worth exactly nothing.",
    foot: "perfect unpublished = unpublished",
  },
];

export const CREDENTIALS = [
  {
    id: "fullstack-genai",
    title: "Full Stack Web Development with Generative AI",
    status: "Ongoing",
    note: "React, Node.js, REST APIs, MySQL — built with AI as a very fast, occasionally wrong pair programmer.",
    verifyUrl: null,
  },
  {
    id: "dsa-cpp",
    title: "Data Structures & Algorithms in C++",
    status: "Certified",
    note: "The paperwork behind the 300+ problems solved across LeetCode, Code360 and HackerRank.",
    verifyUrl: null,
  },
  {
    id: "intro-ai",
    title: "Introduction to Artificial Intelligence",
    status: "Certified",
    note: "The core concepts behind how AI systems actually reason and learn — not just prompt it and pray.",
    verifyUrl: null,
  },
  {
    id: "intro-nlp",
    title: "Introduction to Natural Language Processing",
    status: "Certified",
    note: "Text processing and language-model fundamentals, minus the buzzwords.",
    verifyUrl: null,
  },
  {
    id: "intro-ds",
    title: "Introduction to Data Science",
    status: "Certified",
    note: "Data analysis and statistical foundations — the part before the fancy dashboard.",
    verifyUrl: null,
  },
  {
    id: "hackerrank-sql",
    title: "HackerRank SQL Certificate",
    status: "Certified",
    note: "SQL queries, joins and CRUD operations — no ORM required.",
    verifyUrl: null,
  },
  {
    id: "amcat",
    title: "AMCAT Employability Assessment Certification",
    status: "Certified",
    note: "Employability and aptitude, assessed and on record.",
    verifyUrl: null,
  },
];

export const PRACTICE_TRAIL = [
  {
    title: "LeetCode",
    author: "Problem-solving trail",
    quote: "First 20 minutes I'm lost. Next 20 I'm drawing the pattern. Last 10 I'm actually typing. Every single time.",
  },
  {
    title: "Code360",
    author: "Coding Ninjas",
    quote: "300+ solved. Every miss has a one-line note. The list is ugly and that's exactly why it's useful — a log, not a trophy.",
  },
  {
    title: "HackerRank",
    author: "SQL certified",
    quote: "SQL isn't glamorous. But a JOIN that reads like a proper sentence is a win I'll happily take.",
  },
];

export const LIFE = [
  {
    id: "books",
    slug: "books",
    time: "01",
    label: "Reading",
    title: "Two chapters. One before bed, one with chai.",
    text: "Paper, not a screen. Not a streak, not a goal. It's just the one habit in my day that doesn't beg for attention or argue back. Some books get finished. Most don't. That's not failure — that's reading.",
  },
  {
    id: "gym",
    slug: "gym",
    time: "02",
    label: "Gym",
    title: "Squat. Deadlift. Bench. Row. Press.",
    text: "Four days a week. 200g paneer on alternate days. No whey, no creatine, no before-after flex. The body doesn't lie about who showed up — and it doesn't care what you planned to do.",
  },
  {
    id: "travel",
    slug: "travel",
    time: "03",
    label: "Travel",
    title: "Mostly a promise. Occasionally a temple.",
    text: "Ladakh, Bir Billing, Udaipur — still on the list, always on the list. Until then, four years in Jaipur taught me how to be a stranger in my own city. Middle-class travel is a temple, a blessing, one WhatsApp photo. We'd still pick the blessing.",
  },
  {
    id: "routine",
    slug: "routine",
    time: "04",
    label: "Day to day",
    title: "Morning DSA. Afternoon build. Evening people.",
    text: "CodePen when bored. Jigsaw and SheetCraft when stubborn. Not a system. Not a schedule. Just the days that stopped feeling random after enough of them looked the same.",
  },
];

export const SOCIALS = [
  { id: "linkedin", label: "LinkedIn", handle: "aman-updates", href: LINKEDIN, note: "profile & roles" },
  { id: "github", label: "GitHub", handle: "built-with-aman", href: "https://github.com/built-with-aman", note: "source & commits" },
  { id: "leetcode", label: "LeetCode", handle: "AmanSoniCodes", href: "https://leetcode.com/u/AmanSoniCodes/", note: "DSA practice trail" },
  {
    id: "code360",
    label: "Code360",
    handle: "Aetherion",
    href: "https://www.naukri.com/code360/profile/Aetherion",
    note: "Code360 profile",
  },
  { id: "codepen", label: "CodePen", handle: "built-with-aman", href: "https://codepen.io/built-with-aman", note: "UI experiments" },
  { id: "medium", label: "Medium", handle: "EdgeWithAman", href: "https://medium.com/@EdgeWithAman", note: "writing & notes" },
  { id: "hackerrank", label: "HackerRank", handle: "HackerRank_aman", href: "https://www.hackerrank.com/profile/HackerRank_aman", note: "SQL + challenges" },
];
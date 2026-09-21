import parachuteCover from "./parachute.jpg";
import psychoCover from "./psycho.jpg";

export const CURRENTLY_READING = {
  title: "What Color Is Your Parachute?",
  author: "Richard N. Bolles",
  year: "2023",
  cover: parachuteCover,
  note:
    "Career design, not job hunting. The flower exercise at the back is doing most of the work.",
  progress: 0.02,
  status: "Ongoing",
};

export const SHELF = [
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    year: "2016",
    cover: "https://covers.openlibrary.org/b/id/8231990-L.jpg",
    takeaway: "Choose what to care about. Everything else is noise you're paying rent on.",
    status: "Completed",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: "2020",
    cover: psychoCover,
    takeaway:
      "Doing well with money has almost nothing to do with how smart you are and almost everything to do with how you behave.",
    status: "Completed",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    year: "2016",
    cover: "https://covers.openlibrary.org/b/id/7988607-L.jpg",
    takeaway: "Focus is the scarce resource. Everything worth building comes out of it.",
    status: "Wishlisted",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    year: "2018",
    cover: "https://covers.openlibrary.org/b/id/12539702-L.jpg",
    takeaway: "You don't rise to the level of your goals. You fall to the level of your systems.",
    status: "Wishlisted",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    year: "2020",
    cover: "https://covers.openlibrary.org/b/id/10449931-L.jpg",
    takeaway: "Play long-term games with long-term people. Everything else is a distraction.",
    status: "Wishlisted",
  },
];

export const GYM_IMAGES = {
  floor: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  build: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
  long:  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
};

export const GYM_STATS = [
  { value: 19, suffix: " kg", label: "Lost in 4 months" },
  { value: 3,  suffix: "×",   label: "Sessions a day" },
  { value: 7,  suffix: "×",   label: "Days a week" },
];

export const GYM_PRINCIPLES = [
  {
    title: "Movement was the deficit",
    text: "Running every morning, gym every evening, basketball on the alternate evenings in between. Three sessions a day, seven days a week. No crash diet — the burn did the work.",
  },
  {
    title: "Protein without the supplement aisle",
    text: "Hostel life, not a perfect diet. Most days, I ate normal hostel food and focused on avoiding junk. Whenever I could afford it, I'd have around 200g of boiled paneer on alternate days for some extra protein. No fancy diet, no supplements — just making the best choices I could with what I had.",
  },
  {
    title: "Compound lifts first",
    text: "Squat, deadlift, bench, row, overhead press. Everything else is accessory work. Four sessions a week, same five movements, more weight or more reps every time.",
  },
  {
    title: "Show up on the bad days",
    text: "The transformation came from the mornings I didn't want to run and the evenings I didn't want to lift, not from the ones I did. Consistency over intensity, every single week.",
  },
];

export const HABITS = [
  {
    key: "learning",
    label: "Learning",
    cadence: "Daily · 60 min",
    note: "Something new every day. Docs, a course, a paper. The habit matters more than the topic.",
  },
  {
    key: "dsa",
    label: "DSA",
    cadence: "5× week · 45 min",
    note: "One easy to stay sharp, one hard to stay humble. Every weekday morning.",
  },
  {
    key: "reading",
    label: "Reading",
    cadence: "Daily · 30 min",
    note: "Morning with breakfast, evening before sleep. Paper, not a screen.",
  },
  {
    key: "rest",
    label: "Rest",
    cadence: "Nightly · 7 hrs+",
    note: "One full off-day a week. Rest isn't what's left over — it's the foundation the other four sit on.",
  },
  {
    key: "people",
    label: "People",
    cadence: "2–3× week",
    note: "Friends, family, calls home. Scheduled first, because it's the first thing to disappear when everything else gets busy.",
  },
];

export const TRAVEL_HERO = {
  headline: "Not well-travelled. Yet.",
  sub: "Four years in Jaipur for college counts as something. The rest was dharmik yatra with parents — temples, prayers, and a lot of 'beta photo kheech do.' Beautiful, but let's be honest: that's not travel, that's a pilgrimage with biryani stops. The real trips are coming. This page will look completely different in two years.",
};

export const TRAVEL_IMAGES = {
  road:  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
  hills: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  old:   "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
};

export const TRAVEL_STATS = [
  { value: 1, suffix: "", label: "Real trip so far" },
  { value: 3, suffix: "", label: "Destinations on the list" },
  { value: 0, suffix: "", label: "Himachal trips (yet)" },
];

export const TRAVEL_PRINCIPLES = [
  {
    title: "Jaipur was the warm-up",
    text: "Four years in one city, and I still found corners I'd never noticed. College gave me the taste — the actual travelling hasn't started.",
  },
  {
    title: "Dharmik yatra isn't travel",
    text: "Loved every temple, every prayer, every plate of prasad. But a pilgrimage has a destination and a routine. Travel is when the plan falls apart and you're still okay. Different sport.",
  },
  {
    title: "Himachal first, no debate",
    text: "Ladakh, Spiti, Dhauladhar, Shimla — this is the priority list, not a wishlist. Mountains don't need a filter, and neither does the plan.",
  },
  {
    title: "Bir Billing · the paragliding day",
    text: "Not 'if' — 'when'. Tandem first, solo later. The plan is a proper run off the ridge at Billing, land in Bir, chai, then sit quietly and pretend it was no big deal. It will be a big deal.",
  },
  {
    title: "Ladakh · two bikes, one friend",
    text: "The real one. Two friends, two bikes, one route through Leh, Khardung La and Nubra. No backup van, no tour group, no plan B — just the kind of trip that either becomes a story or a lesson. Preferably both.",
  },
  {
    title: "Daman, Diu, Udaipur — in that order",
    text: "Daman and Diu for the quiet Portuguese hangover. Udaipur because it's almost home and still somehow the best chai of the year is waiting there.",
  },
  {
    title: "And the one city everyone must see",
    text: "Leh. Not a tourist checklist — a place that quietly rearranges your head. Thin air, big silences, strangers who become friends over shared cold. If you only ever do one mountain trip in your life, make it this.",
  },
  {
    title: "This section is embarrassingly thin",
    text: "Give it two years. The photos will be better, the stories longer, and this page will finally deserve its place on the site.",
  },
];

export const TRAVEL_TRIPS = [
  {
    place: "Jaipur",
    region: "Rajasthan",
    period: "2021 – 2025",
    note: "Home for four years. College, chai, cheap food, and the slow realisation that you can live somewhere and still not know it. First real taste of being away.",
  },
  {
    place: "Dharmik yatras",
    region: "Various",
    period: "Childhood",
    note: "Temples, prayers, family, and long car rides that felt endless. Beautiful in its own way — but not travel. Different thing entirely.",
  },
  {
    place: "Leh · Ladakh",
    region: "Wishlist #1 · Must visit",
    period: "Coming soon",
    note: "The one that matters most. Leh, Khardung La, Nubra valley, Pangong — two bikes, one friend, zero tour guides. The kind of trip that turns into a story you tell for the next twenty years.",
  },
  {
    place: "Bir Billing",
    region: "Himachal · Wishlist #2",
    period: "Coming soon",
    note: "Paragliding off the ridge at Billing, land in Bir, tea in a café that plays soft music and judges nobody. The first flight is booked in the head already.",
  },
  {
    place: "Spiti · Dhauladhar · Shimla",
    region: "Himachal · Wishlist #3",
    period: "Coming soon",
    note: "Cold air, quiet monasteries, and roads that make you a better driver or a worse one — no middle ground. Adding this to the same trip loop as Ladakh if the timing allows.",
  },
  {
    place: "Daman & Diu",
    region: "West Coast · Wishlist #4",
    period: "Coming soon",
    note: "Quiet coast, Portuguese leftovers, no crowd. Off-season, mid-week, unplanned — exactly how a beach town should be seen.",
  },
  {
    place: "Udaipur",
    region: "Rajasthan · Wishlist #5",
    period: "Coming soon",
    note: "Lakes, ghats, and the best chai of the year waiting somewhere. Already close to home — no excuse left not to go.",
  },
];

/* ─────────────────────────────────────────────────────────────────
   SOCIAL — frogItguy
   New channel. No fixed genre. Gym clips, singing shorts, vlogs.
   Still figuring it out, enjoying the reps.
   ───────────────────────────────────────────────────────────────── */

export const SOCIAL_HERO = {
  headline: "figuring it out, on camera.",
  sub: "No fixed genre yet. Some days it's a gym clip, some days it's a song, some days it's just the walk home. New channel, real reps, enjoying the process.",
};

export const SOCIAL_CHANNEL = {
  platform: "YouTube",
  handle: "@frogItguy",
  url: "https://www.youtube.com/@frogItguy",
  note: "Started recently. Gym sessions, singing shorts, vlog cuts — the lane is still being drawn. Whatever the day gives, that's what goes up.",
};

export const SOCIAL_STATS = [
  { value: 3, suffix: "",  label: "Formats live" },
  { value: 1, suffix: "×", label: "Upload a week (target)" },
  { value: 0, suffix: "",  label: "Genres locked" },
];

export const SOCIAL_PRINCIPLES = [
  {
    title: "Post the rough cut",
    text: "Perfection is the enemy of published. A rough clip today teaches more than a perfect one six months from now. Real and out beats polished and private.",
  },
  {
    title: "Sing, even off-key",
    text: "Some of it is songs — shorts of me singing, covers mostly, a few originals hiding in voice notes. Not training for a stage. Just not letting the mic stay cold.",
  },
  {
    title: "Document the gym honestly",
    text: "The training log was already running off-screen. Now some of it ends up on camera. No flexing reels, no filter — just the work, the sets, the mornings I almost skipped.",
  },
  {
    title: "No genre, no rush",
    text: "Everyone says pick a niche. I'm not picking yet. Gym, singing, vlogs — the through-line is me, and I'm still figuring out what that looks like on video.",
  },
];

export const SOCIAL_WORK = [
  {
    title: "Gym shorts",
    format: "Short-form",
    note: "Lift clips, form checks, the mornings I almost didn't go. Raw footage, minimal edit, on the way out the door.",
  },
  {
    title: "Singing shorts",
    format: "Short-form",
    note: "Covers, mostly. A line or two that wouldn't leave my head. No studio, no autotune — just the voice and the moment.",
  },
  {
    title: "Vlogs",
    format: "Long-form",
    note: "The day as it happened. Half-formed thoughts, a walk, a conversation, a coffee. Not destination content — just company.",
  },
  {
    title: "Experiments",
    format: "Mixed",
    note: "New ideas when they show up. A skit, a monologue, a song the shower produced. Format decided by the idea, not the other way around.",
  },
];
# SAT Elite Performance Hub

A high-performance, data-driven SAT preparation platform engineered for the top 1% of students. This interface bridges the gap between traditional academic tools and elite competitive environments, utilizing a modern tech stack to deliver real-time ranking updates, complex performance analytics, and high-impact visual feedback.

## 🚀 Vision

The SAT Elite Platform is built on the philosophy that preparation should be as rigorous and competitive as the test itself. It moves away from "playful" gamification towards a serious, elite academic "Arena" where students don't just study—they dominate.

## 🎨 Design System

The visual identity is defined by high contrast, precision typography, and a striking primary palette that signals urgency and excellence.

- **Primary Color:** Rose Red / Deep Rose (`#E11D48`)
- **Background:** Ultra-clean white with subtle warm-gray (`#F8F9FA`) elevations.
- **Typography:** Sharp, modern sans-serif (Inter/Geist style) with heavy weights for statistical emphasis.
- **Motion:** Powered by **GSAP**, featuring orbital podium transitions, water-flow background animations for top ranks, and non-distracting micro-interactions.

## 🛠 Technical Stack

- **Framework:** React 19
- **State Management:** Redux Toolkit (Centralized store for student data, filtering logic, and competition states)
- **Styling:** Tailwind CSS (Utility-first, responsive grid systems)
- **Animation:** GSAP (GreenSock Animation Platform) for high-performance SVG and DOM motion.
- **Icons:** Lucide React
- **Data Visualization:** Custom SVG-based Sparklines and Progress Rings (zero-dependency approach for maximum performance).

## 💎 Core Features

### 1. The Global Leaderboard

The core "engine" of the platform. It features:

- **Orbital Podium:** A unique visual representation of the top 3 scorers with massive, blurred background rank indicators.
- **Sticky Filter Bar:** A persistent, backdrop-blurred filter system (Group/Squad, Subject, Arena) that stays active even during deep vertical scrolls.
- **Statistical Tooltips:** Hover states on desktop and modal views on mobile that reveal granular data: Math Median, English Median, Accuracy %, and Total Time Spent.

### 2. Competition Hub

A premium portal for time-limited academic challenges:

- **Arena Entry:** Seamlessly transitions the entire leaderboard to show only participants of a specific "Duel" or "Sprint."
- **Progress Tracking:** Dynamic gradient bars showing the global completion of ongoing tournaments.
- **Elite Recaps:** Post-event statistics for finished competitions.

### 3. Analytics & Stats

Inline data visualization including:

- **Sparklines:** Real-time trend lines showing score growth over the last 5 tests.
- **Performance Rings:** Precision SVG rings showing accuracy and domain mastery.
- **Projected Scoring:** Dynamic SAT score projections (Math + RW) that update instantly based on filter selections.

## 📂 Project Structure

```text
├── components/
│   ├── Competitions.jsx    # The "Arena" listing and registration UI
│   ├── Header.jsx          # Search and global user tiering
│   ├── Leaderboard.jsx     # Complex ranking table and Podium logic
│   ├── Sidebar.jsx         # Navigation with collapse/expand states
│   └── StatCharts.jsx      # Reusable SVG charting primitives
├── store.js                # Redux store configuration
├── usersSlice.js           # Central state for mock data & filtering logic
├── constants.js            # Mock data and global theme variables
├── App.jsx                 # View routing and main layout
└── index.html              # Custom CSS animations and core font loading
```

## 🔧 Installation & Setup

Use Node.js 22.12+ and npm. JSX source needs Vite transformation; a plain static server is not sufficient.

```sh
git clone https://github.com/sanjarbekweb/sat-edu.git
cd sat-edu
npm install
npm run dev
```

Open `http://localhost:3000`, or the alternative URL printed by Vite. Run `npm run build` to create `dist/` and `npm run preview` to preview it.

The current platform is a frontend demonstration using mock data in `constants.js` and `usersSlice.js`. Rankings update from local state; no live competition server, authentication, or real SAT scoring engine is connected. No Gemini key is needed by the current interface, and no automated test script is declared.

## 📈 Roadmap

- [ ] **Live API Integration:** Real-time WebSocket updates for ongoing duels.
- [ ] **Adaptive Testing Module:** Directly linking competition entries to actual digital SAT practice test engines.
- [ ] **Advanced Analytics:** Predictive AI models for score plateau identification.

---

_This platform is designed to produce top scorers. Professional. Elite. Data-Driven._

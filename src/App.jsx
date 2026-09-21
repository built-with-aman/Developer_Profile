import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/theme/ThemeContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* Pattern: Lazy Loading — code-split pages for faster first paint */
const Home = lazy(() => import("@/pages/Home"));
const Work = lazy(() => import("@/pages/Work"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Journey = lazy(() => import("@/pages/Journey"));
const Manifesto = lazy(() => import("@/pages/Manifesto"));
const Certifications = lazy(() => import("@/pages/Certifications"));
const OutsideTheIDE = lazy(() => import("@/pages/OutsideTheIDE"));
const LifeBooks = lazy(() => import("@/pages/life/Books"));
const LifeGym = lazy(() => import("@/pages/life/Gym"));
const LifeTravel = lazy(() => import("@/pages/life/Travel"));
const LifeRoutine = lazy(() => import("@/pages/life/Routine"));
const LifeSocial = lazy(() => import("@/pages/life/Social"));
const Contact = lazy(() => import("@/pages/Contact"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Loading…</p>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col bg-bg text-fg">
            <Navbar />
            <main id="main" className="flex-1">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:id" element={<ProjectDetail />} />
                  <Route path="/journey" element={<Journey />} />
                  <Route path="/manifesto" element={<Manifesto />} />
                  <Route path="/certifications" element={<Certifications />} />
                  <Route path="/outside-the-ide" element={<Navigate to="/life/books" replace />} />
                  <Route path="/life" element={<Navigate to="/life/books" replace />} />
                  <Route path="/life/books" element={<LifeBooks />} />
                  <Route path="/life/gym" element={<LifeGym />} />
                  <Route path="/life/travel" element={<LifeTravel />} />
                  <Route path="/life/routine" element={<LifeRoutine />} />
                  <Route path="/life/social" element={<LifeSocial />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

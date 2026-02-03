import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import Login from './components/Login.jsx'
import Home from './pages/Home.jsx'

// Love – Main Vibes
import Funny from './pages/love/main-vibes/Funny.jsx'
import Romantic from './pages/love/main-vibes/Romantic.jsx'
import Flirty from './pages/love/main-vibes/Flirty.jsx'
import Mixed from './pages/love/main-vibes/Mixed.jsx'

// Love – Romantic Moments
import Hug from './pages/love/romantic-moments/Hug.jsx'
import Kiss from './pages/love/romantic-moments/Kiss.jsx'
import MissYou from './pages/love/romantic-moments/MissYou.jsx'
import Reunion from './pages/love/romantic-moments/Reunion.jsx'
import Hands from './pages/love/romantic-moments/Hands.jsx'
import Cuddle from './pages/love/romantic-moments/Cuddle.jsx'
import LateNight from './pages/love/romantic-moments/LateNight.jsx'
import SleepCall from './pages/love/romantic-moments/SleepCall.jsx'
import Laugh from './pages/love/romantic-moments/Laugh.jsx'
import Safe from './pages/love/romantic-moments/Safe.jsx'
import Goodbye from './pages/love/romantic-moments/Goodbye.jsx'
import Surprise from './pages/love/romantic-moments/Surprise.jsx'
import TightHug from './pages/love/romantic-moments/TightHug.jsx'
import Understanding from './pages/love/romantic-moments/Understanding.jsx'
import HomePerson from './pages/love/romantic-moments/HomePerson.jsx'

// Love – Emoji Vibes
import HugVibes from './pages/love/emoji-vibes/HugVibes.jsx'
import KissEnergy from './pages/love/emoji-vibes/KissEnergy.jsx'
import MissYouVibes from './pages/love/emoji-vibes/MissYouVibes.jsx'
import CuddleMode from './pages/love/emoji-vibes/CuddleMode.jsx'
import LateNightLove from './pages/love/emoji-vibes/LateNightLove.jsx'
import SoftRomance from './pages/love/emoji-vibes/SoftRomance.jsx'
import Heartbeats from './pages/love/emoji-vibes/Heartbeats.jsx'
import LoveMood from './pages/love/emoji-vibes/LoveMood.jsx'
import TogetherFeel from './pages/love/emoji-vibes/TogetherFeel.jsx'
import Warmth from './pages/love/emoji-vibes/Warmth.jsx'

// Love – Love Stories
import SendThisToYourPerson from './pages/love/love-stories/SendThisToYourPerson.jsx'
import AnswerMeHonestly from './pages/love/love-stories/AnswerMeHonestly.jsx'
import OnlyForMyLove from './pages/love/love-stories/OnlyForMyLove.jsx'
import DoYouFeelThisToo from './pages/love/love-stories/DoYouFeelThisToo.jsx'
import QuietLoveQuestions from './pages/love/love-stories/QuietLoveQuestions.jsx'
import LateNightThoughts from './pages/love/love-stories/LateNightThoughts.jsx'
import RealLoveCheck from './pages/love/love-stories/RealLoveCheck.jsx'
import SoftConfession from './pages/love/love-stories/SoftConfession.jsx'
import HeartToHeart from './pages/love/love-stories/HeartToHeart.jsx'

// Love – Interactive Stories
import IfYouLoveMe from './pages/love/interactive-stories/IfYouLoveMe.jsx'
import LoveCheck from './pages/love/interactive-stories/LoveCheck.jsx'
import AnswerHonestly from './pages/love/interactive-stories/AnswerHonestly.jsx'
import UsFeeling from './pages/love/interactive-stories/UsFeeling.jsx'
import SendThisToMe from './pages/love/interactive-stories/SendThisToMe.jsx'

// Valentine Week (reel-optimized)
import RoseDay from './pages/love/valentine-week/RoseDay.jsx'
import ProposeDay from './pages/love/valentine-week/ProposeDay.jsx'
import ChocolateDay from './pages/love/valentine-week/ChocolateDay.jsx'
import TeddyDay from './pages/love/valentine-week/TeddyDay.jsx'
import PromiseDay from './pages/love/valentine-week/PromiseDay.jsx'
import HugDay from './pages/love/valentine-week/HugDay.jsx'
import KissDay from './pages/love/valentine-week/KissDay.jsx'

// Education
import VocabularyStory from './pages/education/VocabularyStory.jsx'

// Admin (full access only)
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminPages from './pages/admin/AdminPages.jsx'
import AdminRoutes from './pages/admin/AdminRoutes.jsx'
import AdminSettings from './pages/admin/AdminSettings.jsx'
import { getDashboardConfig, getRouteAliases } from './utils/dashboardConfig.js'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthentication = () => {
      const authStatus = localStorage.getItem('isAuthenticated')
      const loginTimestamp = localStorage.getItem('loginTimestamp')

      if (authStatus === 'true' && loginTimestamp) {
        const now = Date.now()
        const loginTime = parseInt(loginTimestamp, 10)
        const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60) // Convert to hours

        // Check if 24 hours have passed
        if (hoursSinceLogin >= 24) {
          // Session expired, clear authentication
          localStorage.removeItem('isAuthenticated')
          localStorage.removeItem('loginTimestamp')
          localStorage.removeItem('userRole')
          localStorage.removeItem('username')
          localStorage.removeItem('userDisplayName')
          setIsAuthenticated(false)
        } else {
          // Still within 24 hours
          setIsAuthenticated(true)
        }
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuthentication()

    // Check authentication every hour to catch expiration
    const interval = setInterval(checkAuthentication, 60 * 60 * 1000) // Check every hour

    return () => clearInterval(interval)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('loginTimestamp')
    localStorage.removeItem('userRole')
    localStorage.removeItem('username')
    localStorage.removeItem('userDisplayName')
    setIsAuthenticated(false)
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
        <div style={{ color: 'white', fontSize: '20px' }}>Loading...</div>
      </div>
    )
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  // Route guard: education-only → / and /education/*; love-only → no /education/*
  const RoleRouteGuard = ({ children }) => {
    const location = useLocation()
    const userRole = localStorage.getItem('userRole')
    const isEducationPath =
      location.pathname === '/' || location.pathname.startsWith('/education/')
    if (userRole === 'education' && !isEducationPath) {
      return <Navigate to="/" replace />
    }
    if (userRole === 'love' && location.pathname.startsWith('/education/')) {
      return <Navigate to="/" replace />
    }
    // Admin area: only full access
    if (location.pathname.startsWith('/admin') && userRole !== 'full') {
      return <Navigate to="/" replace />
    }
    return children
  }

  // Show app if authenticated
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <RoleRouteGuard>
        <Navigation onLogout={handleLogout} />
        <Routes>
          {/* Route aliases (custom URLs → redirect to page) */}
          {Object.entries(getRouteAliases(getDashboardConfig())).map(([slug, target]) => (
            <Route key={slug} path={slug} element={<Navigate to={target} replace />} />
          ))}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="routes" element={<AdminRoutes />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Main Vibes */}
          <Route path="/funny" element={<Funny />} />
          <Route path="/romantic" element={<Romantic />} />
          <Route path="/flirty" element={<Flirty />} />
          <Route path="/mixed" element={<Mixed />} />

          {/* Romantic Moments */}
          <Route path="/hug" element={<Hug />} />
          <Route path="/kiss" element={<Kiss />} />
          <Route path="/miss-you" element={<MissYou />} />
          <Route path="/reunion" element={<Reunion />} />
          <Route path="/hands" element={<Hands />} />
          <Route path="/cuddle" element={<Cuddle />} />
          <Route path="/late-night" element={<LateNight />} />
          <Route path="/sleep-call" element={<SleepCall />} />
          <Route path="/laugh" element={<Laugh />} />
          <Route path="/safe" element={<Safe />} />
          <Route path="/goodbye" element={<Goodbye />} />
          <Route path="/surprise" element={<Surprise />} />
          <Route path="/tight-hug" element={<TightHug />} />
          <Route path="/understanding" element={<Understanding />} />
          <Route path="/home" element={<HomePerson />} />

          {/* Emoji Vibes */}
          <Route path="/hug-vibes" element={<HugVibes />} />
          <Route path="/kiss-energy" element={<KissEnergy />} />
          <Route path="/miss-you-vibes" element={<MissYouVibes />} />
          <Route path="/cuddle-mode" element={<CuddleMode />} />
          <Route path="/late-night-love" element={<LateNightLove />} />
          <Route path="/soft-romance" element={<SoftRomance />} />
          <Route path="/heartbeats" element={<Heartbeats />} />
          <Route path="/love-mood" element={<LoveMood />} />
          <Route path="/together-feel" element={<TogetherFeel />} />
          <Route path="/warmth" element={<Warmth />} />

          {/* Love Stories */}
          <Route path="/send-this-to-your-person" element={<SendThisToYourPerson />} />
          <Route path="/answer-me-honestly" element={<AnswerMeHonestly />} />
          <Route path="/only-for-my-love" element={<OnlyForMyLove />} />
          <Route path="/do-you-feel-this-too" element={<DoYouFeelThisToo />} />
          <Route path="/quiet-love-questions" element={<QuietLoveQuestions />} />
          <Route path="/late-night-thoughts" element={<LateNightThoughts />} />
          <Route path="/real-love-check" element={<RealLoveCheck />} />
          <Route path="/soft-confession" element={<SoftConfession />} />
          <Route path="/heart-to-heart" element={<HeartToHeart />} />

          {/* Interactive Stories */}
          <Route path="/if-you-love-me" element={<IfYouLoveMe />} />
          <Route path="/love-check" element={<LoveCheck />} />
          <Route path="/answer-honestly" element={<AnswerHonestly />} />
          <Route path="/us-feeling" element={<UsFeeling />} />
          <Route path="/send-this-to-me" element={<SendThisToMe />} />

          {/* Valentine Week */}
          <Route path="/rose-day" element={<RoseDay />} />
          <Route path="/propose-day" element={<ProposeDay />} />
          <Route path="/chocolate-day" element={<ChocolateDay />} />
          <Route path="/teddy-day" element={<TeddyDay />} />
          <Route path="/promise-day" element={<PromiseDay />} />
          <Route path="/hug-day" element={<HugDay />} />
          <Route path="/kiss-day" element={<KissDay />} />

          {/* Education */}
          <Route path="/education/vocabulary-story" element={<VocabularyStory />} />
        </Routes>
      </RoleRouteGuard>
    </Router>
  )
}

export default App

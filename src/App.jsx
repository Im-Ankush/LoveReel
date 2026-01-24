import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import Home from './pages/Home.jsx'
import Funny from './pages/Funny.jsx'
import Romantic from './pages/Romantic.jsx'
import Flirty from './pages/Flirty.jsx'
import Mixed from './pages/Mixed.jsx'
import Hug from './pages/Hug.jsx'
import Kiss from './pages/Kiss.jsx'
import MissYou from './pages/MissYou.jsx'
import Reunion from './pages/Reunion.jsx'
import Hands from './pages/Hands.jsx'
import Cuddle from './pages/Cuddle.jsx'
import LateNight from './pages/LateNight.jsx'
import SleepCall from './pages/SleepCall.jsx'
import Laugh from './pages/Laugh.jsx'
import Safe from './pages/Safe.jsx'
import Goodbye from './pages/Goodbye.jsx'
import Surprise from './pages/Surprise.jsx'
import TightHug from './pages/TightHug.jsx'
import Understanding from './pages/Understanding.jsx'
import HomePerson from './pages/HomePerson.jsx'
import HugVibes from './pages/HugVibes.jsx'
import KissEnergy from './pages/KissEnergy.jsx'
import MissYouVibes from './pages/MissYouVibes.jsx'
import CuddleMode from './pages/CuddleMode.jsx'
import LateNightLove from './pages/LateNightLove.jsx'
import SoftRomance from './pages/SoftRomance.jsx'
import Heartbeats from './pages/Heartbeats.jsx'
import LoveMood from './pages/LoveMood.jsx'
import TogetherFeel from './pages/TogetherFeel.jsx'
import Warmth from './pages/Warmth.jsx'
import IfYouLoveMe from './pages/IfYouLoveMe.jsx'
import SendThisToYourPerson from './pages/SendThisToYourPerson.jsx'
import AnswerMeHonestly from './pages/AnswerMeHonestly.jsx'
import OnlyForMyLove from './pages/OnlyForMyLove.jsx'
import DoYouFeelThisToo from './pages/DoYouFeelThisToo.jsx'
import QuietLoveQuestions from './pages/QuietLoveQuestions.jsx'
import LateNightThoughts from './pages/LateNightThoughts.jsx'
import RealLoveCheck from './pages/RealLoveCheck.jsx'
import SoftConfession from './pages/SoftConfession.jsx'
import HeartToHeart from './pages/HeartToHeart.jsx'
import LoveCheck from './pages/LoveCheck.jsx'
import AnswerHonestly from './pages/AnswerHonestly.jsx'
import UsFeeling from './pages/UsFeeling.jsx'
import SendThisToMe from './pages/SendThisToMe.jsx'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funny" element={<Funny />} />
        <Route path="/romantic" element={<Romantic />} />
        <Route path="/flirty" element={<Flirty />} />
        <Route path="/mixed" element={<Mixed />} />
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
        <Route path="/if-you-love-me" element={<IfYouLoveMe />} />
        <Route path="/send-this-to-your-person" element={<SendThisToYourPerson />} />
        <Route path="/answer-me-honestly" element={<AnswerMeHonestly />} />
        <Route path="/only-for-my-love" element={<OnlyForMyLove />} />
        <Route path="/do-you-feel-this-too" element={<DoYouFeelThisToo />} />
        <Route path="/quiet-love-questions" element={<QuietLoveQuestions />} />
        <Route path="/late-night-thoughts" element={<LateNightThoughts />} />
        <Route path="/real-love-check" element={<RealLoveCheck />} />
        <Route path="/soft-confession" element={<SoftConfession />} />
        <Route path="/heart-to-heart" element={<HeartToHeart />} />
        <Route path="/love-check" element={<LoveCheck />} />
        <Route path="/answer-honestly" element={<AnswerHonestly />} />
        <Route path="/us-feeling" element={<UsFeeling />} />
        <Route path="/send-this-to-me" element={<SendThisToMe />} />
      </Routes>
    </Router>
  )
}

// Debug: Log when App renders
console.log('App component rendered')

export default App

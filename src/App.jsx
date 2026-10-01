import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navigation/Navbar';

import Hero from './components/sections/Hero/Hero';
import Paths from './components/sections/Paths/Paths';
import Capabilities from './components/sections/Capabilities/Capabilities';
import Work from './components/sections/Work/Work';
import WhyDceetechbro from './components/sections/WhyDceetechbro/WhyDceetechbro';
import Contact from './components/sections/Contact/Contact';
import BuildSolution from './components/sections/BuildSolution/BuildSolution';
import HireTalent from './components/sections/HireTalent/HireTalent';

import AdminLogin from './admin/pages/AdminLogin/AdminLogin';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import Footer from './components/layout/Footer/Footer';

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Paths />
        <Capabilities />
        <Work />
        <WhyDceetechbro />
        <Contact />
        <BuildSolution />
        <HireTalent />
        <Footer />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main website */}
        <Route path="/" element={<Home />} />

        {/* Admin login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.12),_transparent_25%),linear-gradient(135deg,_#06070d_0%,_#0b1020_100%)] text-slate-100">

      <Navbar />

      <main className="flex-grow relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

        <div className="relative">

          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Login */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* Forgot Password */}
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            {/* Register */}
            <Route
              path="/register"
              element={<Register />}
            />

            {/* Reset Password */}
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Profile */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </div>

      </main>

      <Footer />

    </div>
  )
}

export default App
import React, { useState } from 'react'
import LogInPage from './authentication/LogInPage'
import SignUpPage from './authentication/SignUpPage'
import './PublicLayout.css'
import ResetPasswordPage from './authentication/ResetPasswordPage';
import { useAuth } from '../../context/AuthContext'

export default function PublicLayout() {

  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');

  const goLogin = () => setMode("login");
  const goSignup = () => setMode("signup");
  const goReset = () => setMode("reset");

  const { 
    // Login
    loginForm, setLoginForm, handleLogIn, handleGoogleLogIn, handleFacebookLogIn,
    // Signup
    registerForm, setRegisterForm, handleSignUp,
    // Reset
    resetForm, setResetForm, handleResetPassword 
  } = useAuth();

  return (
    <>
      <div className="public-layout-page-container">
        <div className="public-layout-container">

          {mode === 'login' &&
            <LogInPage
              onModeChangeSignUp={goSignup}
              onModeChangeReset={goReset}
              loginForm={loginForm}
              setLoginForm={setLoginForm}
              onLogin={handleLogIn}
              onGoogleLogIn={handleGoogleLogIn}
              onFacebookLogIn={handleFacebookLogIn}
            />
          }
          {mode === 'signup' &&
            <SignUpPage
              onModeChange={goLogin}
              registerForm={registerForm}
              setRegisterForm={setRegisterForm}
              onSignUp={handleSignUp}
            />
          }
          {mode === 'reset' &&
            <ResetPasswordPage
              onModeChange={goLogin}
              resetForm={resetForm}
              setResetForm={setResetForm}
              onResetPassword={handleResetPassword}
            />
          }
        </div>
      </div>


    </>
  )
}



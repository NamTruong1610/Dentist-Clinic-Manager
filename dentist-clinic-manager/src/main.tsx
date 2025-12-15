import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './pages/auth/AuthLayout.tsx'
import { ForgetPasswordPage, LoginPage, ResetPasswordPage, SignUpPage, VerifyOTPPage } from './pages/auth/index.ts'
import PrivateLayout from './Layout.tsx'
import PageNotFound from './pages/auth/PageNotFound.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route index element={<App />}></Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/forget-password' element={<ForgetPasswordPage />}></Route>
          <Route path='/reset-password' element={<ResetPasswordPage />}></Route>
          <Route path='/verify-otp' element={<VerifyOTPPage />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

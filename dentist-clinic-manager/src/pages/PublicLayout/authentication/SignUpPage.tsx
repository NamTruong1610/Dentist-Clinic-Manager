import React from 'react'
import './AuthenticationForm.css'
import { ConfirmPasswordField } from '../../../components/ConfirmPasswordField';
import type { RegisterForm } from '../../../context/AuthContext';

interface SignUpPageProps {
  onModeChange: () => void;
  registerForm: RegisterForm; // <-- NEW: Use form object
  setRegisterForm: React.Dispatch<React.SetStateAction<RegisterForm>>; // <-- NEW: Use single setter
  onSignUp: () => void;
}

export default function SignUpPage({
  onModeChange,
  registerForm,
  setRegisterForm,
  onSignUp
}: SignUpPageProps) {
  const setEmail = (email: string) => setRegisterForm(prev => ({ ...prev, email }));
  const setPassword = (password: string) => setRegisterForm(prev => ({ ...prev, password }));
  const setConfirmPassword = (confirmPassword: string) => setRegisterForm(prev => ({ ...prev, confirmPassword }));

  return (
    <>
      <div className='title'>Signup</div>
      <div className="email-input-container">
        <input
          className="user-id"
          type='email'
          placeholder="Email"
          value={registerForm.email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <ConfirmPasswordField
        password={registerForm.password}
        confirmPassword={registerForm.confirmPassword}
        onSetPassword={setPassword}
        onSetConfirmPassword={setConfirmPassword}
      />
      <button className="submit-btn" type="submit" onClick={onSignUp} >Sign Up</button>
      <div className="redirect-text">Already have an account? <span onClick={onModeChange}>Login</span></div>
      <div className="divider"><span>or log in with</span></div>
      <div className="third-party-login-container">
        <div className="facebook-submit-btn">Facebook <img src="https://api.iconify.design/logos:facebook.svg" /></div>
        <div className="google-submit-btn">Google <img src="https://api.iconify.design/logos:google-icon.svg" /></div>
      </div>

    </>
  )
}

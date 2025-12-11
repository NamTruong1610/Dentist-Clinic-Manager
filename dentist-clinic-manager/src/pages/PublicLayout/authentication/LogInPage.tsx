import './AuthenticationForm.css'
import { PasswordField } from "../../../components/PasswordField";
import type { LoginForm } from '../../../context/AuthContext';

interface LogInPageProps {
  onModeChangeSignUp: () => void;
  onModeChangeReset: () => void;
  loginForm: LoginForm; 
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>;
  onLogin: () => void;
  onGoogleLogIn: () => void;
  onFacebookLogIn: () => void;
}

export default function LogInPage({ 
  onModeChangeSignUp, 
  onModeChangeReset, 
  loginForm, 
  setLoginForm, 
  onLogin, 
  onGoogleLogIn, 
  onFacebookLogIn 
}: LogInPageProps) {

  const setEmail = (email: string) => setLoginForm(prev => ({ ...prev, email }));
  const setPassword = (password: string) => setLoginForm(prev => ({ ...prev, password }));

  return (
    <>
      <div className='title'>Login</div>
      <div className="email-input-container">
        <input
          className="user-id"
          type='email'
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) => setEmail(e.target.value)} 
        ></input>
      </div>
      <PasswordField
        password={loginForm.password} 
        onSetPassword={setPassword} 
      />
      <div className="forgot-password" onClick={onModeChangeReset}>Forgot password?</div>
      <button className="submit-btn" type="submit" onClick={onLogin}>Log In</button>
      <div className="redirect-text">Don't have an account? <span onClick={onModeChangeSignUp}>Signup</span></div>
      <div className="divider"><span>or log in with</span></div>
      <div className="third-party-login-container">
        <div className="facebook-submit-btn" onClick={onFacebookLogIn}>Facebook <img src="https://api.iconify.design/logos:facebook.svg" /></div>
        <div className="google-submit-btn" onClick={onGoogleLogIn}>Google <img src="https://api.iconify.design/logos:google-icon.svg" /></div>
      </div>
    </>
  )
}


import './AuthenticationForm.css'
import { PasswordField } from "../../components/PasswordField";
import { Link } from 'react-router';


export default function LogInPage(){

  return (
    <>
      <div className='title'>Login</div>
      <div className="email-input-container">
        <input
          className="user-id"
          type='email'
          placeholder="Email"
        ></input>
      </div>
      <PasswordField />
      <div className="forgot-password" ><span> <Link to="/reset-password" >Forgot password?</Link> </span></div>
      <button className="submit-btn" type="submit">Log In</button>
      <div className="redirect-text">Don't have an account?<span> <Link to="/signup" >Signup</Link> </span></div>
      <div className="divider"><span>or log in with</span></div>
      <div className="third-party-login-container">
        <div className="facebook-submit-btn">Facebook <img src="https://api.iconify.design/logos:facebook.svg" /></div>
        <div className="google-submit-btn">Google <img src="https://api.iconify.design/logos:google-icon.svg" /></div>
      </div>
    </>
  )
}


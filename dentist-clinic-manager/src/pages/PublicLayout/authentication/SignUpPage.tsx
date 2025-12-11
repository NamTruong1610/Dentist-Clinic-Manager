import React from 'react'
import './AuthenticationForm.css'
import { ConfirmPasswordField } from '../../../components/ConfirmPasswordField';


export default function SignUpPage(){

  return (
    <>
      <div className='title'>Signup</div>
      <div className="email-input-container">
        <input
          className="user-id"
          type='email'
          placeholder="Email"
        ></input>
      </div>
      <ConfirmPasswordField />
      <button className="submit-btn" type="submit" >Sign Up</button>
      <div className="redirect-text">Already have an account? <span >Login</span></div>
      <div className="divider"><span>or log in with</span></div>
      <div className="third-party-login-container">
        <div className="facebook-submit-btn">Facebook <img src="https://api.iconify.design/logos:facebook.svg" /></div>
        <div className="google-submit-btn">Google <img src="https://api.iconify.design/logos:google-icon.svg" /></div>
      </div>

    </>
  )
}

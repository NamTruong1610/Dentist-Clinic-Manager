import React from 'react'
import './AuthenticationForm.css'
import { ConfirmPasswordField } from '../../components/ConfirmPasswordField';
import { Link } from 'react-router';


export default function ResetPasswordPage(){

  return (
    <>
      <div className='title'>Reset Password</div>
      <ConfirmPasswordField />
      <button className="submit-btn" type="submit" >Submit</button>

    </>
  )
}
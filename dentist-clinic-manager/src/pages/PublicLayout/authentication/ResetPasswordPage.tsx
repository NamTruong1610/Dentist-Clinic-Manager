import './AuthenticationForm.css'


export default function ResetPasswordPage(){

  return (
    <>
      <div className='title'>Reset Password</div>
      <div className="email-input-container">
        <input
          className="user-id"
          type='email'
          placeholder="Email"
        ></input>
      </div>
      <button className="submit-btn" type="submit">Send Verification Email</button>
      <div className="redirect-text">
        <span>Go back to Login</span>
      </div>
    </>
  )
}
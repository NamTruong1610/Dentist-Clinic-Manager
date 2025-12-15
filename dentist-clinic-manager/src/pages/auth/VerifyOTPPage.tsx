import './AuthenticationForm.css'


export default function VerifyOTPPage(){

  return (
    <>
      <div className='title'>Verify Email By OTP</div>
      <div className="email-input-container">
        <input
          className="user-id"
          type='text'
          placeholder="Email"
        ></input>
      </div>
      <button className="submit-btn" type="submit">Verify Email OTP</button>
    </>
  )
}
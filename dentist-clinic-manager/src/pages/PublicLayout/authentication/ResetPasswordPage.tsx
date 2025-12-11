import './AuthenticationForm.css'
import type { ResetForm } from '../../../context/AuthContext';

interface ResetPasswordPageProps {
  onModeChange: () => void;
  resetForm: ResetForm; // <-- NEW: Use form object
  setResetForm: React.Dispatch<React.SetStateAction<ResetForm>>; // <-- NEW: Use single setter
  onResetPassword: () => void;
}

export default function ResetPasswordPage({ 
  onModeChange, 
  resetForm, 
  setResetForm, 
  onResetPassword 
}: ResetPasswordPageProps) {
  const setEmailForReset = (emailForReset: string) => setResetForm(prev => ({ ...prev, emailForReset }));

  return (
    <>
      <div className='title'>Reset Password</div>
      <div className="email-input-container">
        <input
          className="user-id"
          type='email'
          placeholder="Email"
          value={resetForm.emailForReset}
          onChange={(e) => setEmailForReset(e.target.value)}
        ></input>
      </div>
      <button className="submit-btn" type="submit" onClick={onResetPassword}>Send Verification Email</button>
      <div className="redirect-text">
        <span onClick={onModeChange}>Go back to Login</span>
      </div>
    </>
  )
}
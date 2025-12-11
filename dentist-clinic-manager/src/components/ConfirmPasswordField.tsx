import { Eye, EyeOff } from "lucide-react";
import { useState, memo } from "react";


function ConfirmPasswordFieldComponent(){
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="password-input-container">
        <input
          className="user-id"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />

        <div onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <Eye className="eye-icon" /> : <EyeOff className="eye-icon" />}
        </div>
      </div>

      <div className="password-input-container">
        <input
          className="user-id"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
        />

        <div onClick={() => setShowConfirmPassword((prev) => !prev)}>
          {showConfirmPassword ? <Eye className="eye-icon" /> : <EyeOff className="eye-icon" />}
        </div>
      </div>
    </>
  );
}

export const ConfirmPasswordField = memo(ConfirmPasswordFieldComponent);
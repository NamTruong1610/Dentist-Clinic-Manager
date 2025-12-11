import { Eye, EyeOff } from "lucide-react";
import { useState, memo } from "react";

interface ConfirmPasswordFieldProps {
  password: string;
  confirmPassword: string;
  onSetPassword: (password: string) => void;
  onSetConfirmPassword: (confirmPassword: string) => void;
}

function ConfirmPasswordFieldComponent({ password, confirmPassword, onSetPassword, onSetConfirmPassword }: ConfirmPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="password-input-container">
        <input
          className="user-id"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => onSetPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => onSetConfirmPassword(e.target.value)}
        />

        <div onClick={() => setShowConfirmPassword((prev) => !prev)}>
          {showConfirmPassword ? <Eye className="eye-icon" /> : <EyeOff className="eye-icon" />}
        </div>
      </div>
    </>
  );
}

export const ConfirmPasswordField = memo(ConfirmPasswordFieldComponent);
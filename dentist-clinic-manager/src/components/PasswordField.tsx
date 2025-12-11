import { Eye, EyeOff } from "lucide-react";
import { useState, memo } from "react";

interface PasswordFieldProps {
  password: string;
  onSetPassword: (password: string) => void;
}

function PasswordFieldComponent({ password, onSetPassword }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-input-container">
      <input
        className="user-id"
        type={show ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => onSetPassword(e.target.value)}
      />

      <div onClick={() => setShow((prev) => !prev)}>
        {show ? <Eye className="eye-icon" /> : <EyeOff className="eye-icon" />}
      </div>
    </div>
  );
}

export const PasswordField = memo(PasswordFieldComponent);
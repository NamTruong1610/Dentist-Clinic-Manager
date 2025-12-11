import { Eye, EyeOff } from "lucide-react";
import { useState, memo } from "react";


function PasswordFieldComponent() {
  const [show, setShow] = useState(false);

  return (
    <div className="password-input-container">
      <input
        className="user-id"
        type={show ? "text" : "password"}
        placeholder="Password"
      />

      <div onClick={() => setShow((prev) => !prev)}>
        {show ? <Eye className="eye-icon" /> : <EyeOff className="eye-icon" />}
      </div>
    </div>
  );
}

export const PasswordField = memo(PasswordFieldComponent);
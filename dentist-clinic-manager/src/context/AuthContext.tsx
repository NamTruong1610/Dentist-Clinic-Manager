// src/context/AuthContext.tsx

import React, { createContext, useContext } from 'react';
import type { User } from 'firebase/auth';

// --- Form Data Structures ---
interface LoginForm { email: string; password: string; }
interface RegisterForm { email: string; password: string; confirmPassword: string; }
interface ResetForm { emailForReset: string; }

interface AuthContextType {
  user: User | null | undefined;
  handleLogOut: () => Promise<void>;

  loginForm: LoginForm;
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>;
  handleLogIn: () => Promise<void>;
  handleGoogleLogIn: () => Promise<void>;
  handleFacebookLogIn: () => Promise<void>;

  registerForm: RegisterForm;
  setRegisterForm: React.Dispatch<React.SetStateAction<RegisterForm>>; 
  handleSignUp: () => Promise<void>;

  resetForm: ResetForm;
  setResetForm: React.Dispatch<React.SetStateAction<ResetForm>>; 
  handleResetPassword: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = AuthContext.Provider;
export type { LoginForm, RegisterForm, ResetForm };
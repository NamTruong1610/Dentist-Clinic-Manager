import React, { useCallback, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, type User, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router';

import { AuthProvider as ContextProvider, type LoginForm, type RegisterForm, type ResetForm } from '../context/AuthContext';
import { auth, googleProvider, facebookProvider } from '../firebase/firebase';

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialLoginForm: LoginForm = { email: '', password: '' };
const initialRegisterForm: RegisterForm = { email: '', password: '', confirmPassword: '' };
const initialResetForm: ResetForm = { emailForReset: '' };

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const [loginForm, setLoginForm] = useState<LoginForm>(initialLoginForm);
  const [registerForm, setRegisterForm] = useState<RegisterForm>(initialRegisterForm);
  const [resetForm, setResetForm] = useState<ResetForm>(initialResetForm);

  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) { 
        /* empty */ 
      } else {
        setLoginForm(initialLoginForm);
        setRegisterForm(initialRegisterForm);
        setResetForm(initialResetForm);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogIn = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      setLoginForm(initialLoginForm);
      navigate('/private/home');
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to log in. Please check your credentials.");
    }
  }, [loginForm, navigate]);

  const handleLogOut = useCallback(async () => {
    try {
      await signOut(auth);
      setLoginForm(initialLoginForm);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out");
    }
  }, [navigate]);

  const handleSignUp = useCallback(async () => {

    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Error: Passwords do not match. Please try again.");
      console.error("Signup failed: Passwords do not match.");
      return; 
    }
    
    // 2. Check if password length is acceptable (Firebase requires min 6 chars)
    if (registerForm.password.length < 6) {
        alert("Error: Password must be at least 6 characters long.");
        console.error("Signup failed: Password too short.");
        return; 
    }

    try {
      await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.confirmPassword);
      setRegisterForm(initialRegisterForm);
      alert('You are successfully signed up!')
      navigate('/');
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Failed to sign up");
    }
  }, [registerForm, navigate]);

  const handleGoogleLogIn = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/private/home');
    }
    catch (error) {
      console.error("Login with Google failed:", error);
      alert("Failed to log in with Google");
    }
  }, [navigate])

  const handleFacebookLogIn = useCallback(async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/private/home');
    }
    catch (error) {
      console.error("Login with Facebook failed:", error);
      alert("Failed to log in with Facebook");
    }
  }, [navigate])

  const handleResetPassword = useCallback(async () => {
    try {
      await sendPasswordResetEmail(auth, resetForm.emailForReset);
      setResetForm(initialResetForm);
      alert(`Password reset email sent to ${resetForm.emailForReset}.`);
    } catch (error) {
      console.error("Password Reset failed:", error);
      alert("Failed to send password reset email");
    }
  }, [resetForm])


  const contextValue = {
    user,
    loginForm, setLoginForm, handleLogIn, handleGoogleLogIn, handleFacebookLogIn,
    registerForm, setRegisterForm, handleSignUp,
    resetForm, setResetForm, handleResetPassword,
    handleLogOut,
  };

  if (user === undefined) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <ContextProvider value={contextValue}>
      {children}
    </ContextProvider>
  )
}
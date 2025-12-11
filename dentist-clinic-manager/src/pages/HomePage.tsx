import type { User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from 'react-router'

interface HomePageProps {
  user: User | null;
}

export default function HomePage({user} : HomePageProps) {
    
  return (
    <>
      <div>HomePage</div>
      <div>Email: {user?.email}</div>
      <div>User ID: {user?.uid}</div>
    </>
    
  )
}

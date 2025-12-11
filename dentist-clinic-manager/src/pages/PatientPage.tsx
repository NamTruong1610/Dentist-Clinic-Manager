import type { User } from 'firebase/auth';
import React from 'react'
import { Link, useNavigate } from 'react-router'

interface PatientPageProps {
  user: User | null;
}

export default function PatientPage({ user }: PatientPageProps) {

  return (
    <>
      <div>PatientPage for user {user?.uid}</div>
    </>
  )
}

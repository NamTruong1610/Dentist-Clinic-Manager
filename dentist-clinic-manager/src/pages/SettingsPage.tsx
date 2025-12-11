import type { User } from 'firebase/auth';
import React from 'react'
import { Link, useNavigate } from 'react-router'

interface SettingsPageProps {
  user: User | null;
}

export default function SettingsPage({ user }: SettingsPageProps) {

  return (
    <>
      <div>SettingsPage for user {user?.uid}</div>
    </>
  )
}

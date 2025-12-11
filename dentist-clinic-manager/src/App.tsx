import HomePage from './pages/HomePage'
import PatientPage from './pages/PatientPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import PrivateLayout from './pages/PrivateLayout/PrivateLayout'
import PublicLayout from './pages/PublicLayout/PublicLayout'
import { useAuth } from './context/AuthContext'

function App() {
  const { user, handleLogOut } = useAuth(); 

  if (user === undefined) {
    return null; 
  }

  // Guarding for Flash of Unauthenticated Component
  if (user === undefined) {
    return <div>Loading authentication status...</div>;
  }


  return (
    <>
      {/* <AuthProvider> */}
        <Routes>
          <Route index element={
            <PublicLayout />
          }/>

          <Route element={<PrivateLayout user={user} onSignOut={handleLogOut}/>} path='private'>
            <Route index element={<HomePage user={user} />} />
            <Route path='home' element={<HomePage user={user} />} />
            <Route path='patients' element={<PatientPage user={user}/>} />
            <Route path='settings' element={<SettingsPage user={user}/>} />
          </Route>

        </Routes>
      {/* </AuthProvider> */}

    </>
  )
}

export default App

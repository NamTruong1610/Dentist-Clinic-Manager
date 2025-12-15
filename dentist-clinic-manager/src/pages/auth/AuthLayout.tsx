
import { Outlet } from 'react-router'
import './AuthLayout.css'

export default function PublicLayout() {


  return (
    <>
      <div className="public-layout-page-container">
        <div className="public-layout-container">
          <Outlet />
        </div>
      </div>


    </>
  )
}



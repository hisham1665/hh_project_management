import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { avatar_links } from '../assets/Links/Avatar.js'
import ProfileDrawer from './SideDrawer.jsx'

function Navbar() {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  // Pick avatar based on user or fallback
  const avatarUrl = user && user.avatarIndex !== undefined
    ? avatar_links[user.avatarIndex % avatar_links.length]
    : avatar_links[0];
  const handlegoBack = () => {
    navigate('/dashboard');
  }
  return (
    <div>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3">
        <div className="flex items-center gap-4 text-[#0d141c]">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]" onClick={handlegoBack}>
            HH Project Manager
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer"
            loading="lazy"
            onClick={() => setDrawerOpen(true)}
          />
        </div>
      </header>
      <ProfileDrawer open={drawerOpen} setOpen={setDrawerOpen} />
    </div>
  )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import { IoSearchOutline } from 'react-icons/io5'
import { FaUserCircle } from 'react-icons/fa'
import { navigation } from '../constant/Navigation'

const Header = () => {
  const location = useLocation()
  const [searchInput, setSearchInput] = useState(location.search.split('=')[1] || '')
  const navigate = useNavigate()

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`)
    }
  }, [searchInput])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
      <div className='container h-full mx-auto px-4 flex items-center '>
        <Link to={'/'}>
          <img src={logo} alt='logo' width={90} />
        </Link>

        <nav className='hidden lg:flex items-center  gap-1 ml-5'>
          {navigation.map((nav, index) => {
            return (
              <div key={index}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && 'text-neutral-100'}`}
                >
                  {nav.label}
                </NavLink>
              </div>
            )
          })}
        </nav>

        <div className=' ml-auto flex items-center gap-5'>
          <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Search here...'
              className='bg-transparent  px-4 py-1 outline-none border-none hidden lg:block'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type='submit' className=' text-2xl text-white'>
              <IoSearchOutline className='' />
            </button>
          </form>

          <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
            <FaUserCircle className='w-full h-full' />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

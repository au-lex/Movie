import React, { useEffect, useState } from 'react'
import logo from '../assets/Logo-dark.png'
import { Link } from 'react-router-dom'
import sidebar from '../data/sidebar'
import { LogoutIcon } from '../assets/DevIcons'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
const SideBar = ({ open, location }: { open?: boolean; location?: any }) => {
  let locations = useLocation()

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <aside
      id="logo-sidebar"
      className={classNames(
        'fixed top-0 left-0 z-40 w-72  h-screen transition-transform  sm:translate-x-0',
        { '-translate-x-full': open === false }
      )}
      aria-label="Sidebar"
    >
      <div className="h-full pb-4 overflow-y-auto bg-gray-50 ">
        <div className="border border-black/30  rounded-r-[100px] w-full">
          <Link
            to="/"
            className={classNames(
              'flex items-center pl-2.5 mb-5 sticky top-0 py-6 ',
              { 'bg-white': scrollY > 20 }
            )}
          >
            <img src={logo} className="h-10 " alt="movieBox Logo" />
          </Link>
          <ul className="space-y-2 font-medium ">
            {sidebar.map(({ title, icon, link }, index) => (
              <li key={index}>
                <Link
                  to={link}
                  className={classNames(
                    'flex items-center py-10  hover:text-rose  hover:bg-rose/10  group',
                    {
                      'border-r-4 border-rose bg-rose/10 text-rose':
                        (location.pathname.slice(0, 6) ||
                          locations.pathname) === link,
                    },
                    {
                      'text-text-gray':
                        (location.pathname.slice(0, 6) ||
                          locations.pathname) !== link,
                    }
                  )}
                >
                  <div className="pl-10 flex items-center">
                    {icon}
                    <span className="ml-3 text-lg font-bold">{title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="p-6 py-8 border border-rose bg-[#FCF5F7] m-4 rounded-md">
            <h6 className="text-gray-900 text-xl font-black">
              Play movie quizzes and earn free tickets
            </h6>

            <p className="text-text-gray font-medium pt-2">
              50k people are playing now
            </p>
            <div className=" flex items-center justify-center">
              <button
                type="button"
                className="text-rose hover:text-white font-bold bg-rose/20 hover:bg-rose/90 focus:outline-none focus:ring-4 focus:ring-rose/30 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  mt-5"
              >
                Start playing
              </button>
            </div>
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center py-10 text-text-gray group"
              >
                <div className="pl-10 flex items-center">
                  <LogoutIcon />
                  <span className="ml-3 text-lg font-bold">LogOut</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default SideBar

import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import LogoIcon from '../assets/LogoIcon.svg'

import { Container } from '../components/container'

import { MenuIcon } from '../assets/DevIcons'
import classNames from 'classnames'
import SearchMovies from '../components/SearchMovies'

export function debounce(func: Function, delay: number) {
  let timer: number
  return function (this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export const Header = () => {
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
    <div
      className={classNames(' bg-transparent fixed top-0 z-[99] w-full py-1', {
        'bg-gray-900': scrollY > 50,
      })}
    >
      <Container className="flex items-center justify-between  ">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold">
            <Link to={'/'}>
              <img src={Logo} alt="logo" className="h-14 hidden lg:block" />
              <img src={LogoIcon} alt="logo" className="h-14 lg:hidden " />
            </Link>
          </h1>
        </div>

        <SearchMovies />

        <div className="lg:flex items-center gap-6 hidden">
          <Link className="" to={'/sign-in'}>
            <span className=" text-xl font-bold">Sign In</span>
          </Link>
          <MenuIcon />
        </div>
      </Container>
    </div>
  )
}

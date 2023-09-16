import { useEffect, useRef, useState } from 'react'

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import Logo from '../assets/Logo.png'
import LogoIcon from '../assets/LogoIcon.svg'

import { Container } from '../components/container'
import { SearchResult } from '../components/search-result'
import { mergeClassName } from '../utils'
import { MenuIcon, SearchIcon } from '../assets/DevIcons'
import classNames from 'classnames'
import { searchMoviesByTitle } from '../api/tmdb-api'
import SearchMovies from '../components/SearchMovies'

const MENU_CLASS = `
  py-1
  px-1.5
  hover:bg-primary
  rounded-md
  mobile:px-6
`

const MENU_CLASS_ACTIVE = `
  bg-primary
`
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
  const location = useLocation()
  const [params, _] = useSearchParams()
  const navigate = useNavigate()

  const [pathname, setPathname] = useState('')
  const pathnameRef = useRef('')
  const defaultKeyword = useRef('')

  const [keyword, setKeyword] = useState('')
  const [isSearchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword
      navigate(`/search?q=${keyword}`)
      setSearchFocus(false)
      searchRef.current?.blur()
    }
  }

  const initKeyword = () => {
    if (pathnameRef.current === '/search') {
      setKeyword(defaultKeyword.current)
    } else {
      setKeyword('')
    }
  }

  const onWindowClick = () => {
    setSearchFocus(false)
    initKeyword()
  }

  const getMenuClass = (path: string) => {
    if (path === pathname) {
      return mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE)
    }

    return mergeClassName(MENU_CLASS, '')
  }

  useEffect(() => {
    setPathname(location.pathname)
    pathnameRef.current = location.pathname
    defaultKeyword.current = params.get('q') || ''
    initKeyword()
  }, [location.pathname])

  useEffect(() => {
    window.addEventListener('click', onWindowClick)

    return () => {
      window.removeEventListener('click', onWindowClick)
    }
  }, [])

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
        {/* brand & menu */}
        <div className="flex items-center gap-6">
          {/* brand */}
          <h1 className="text-2xl font-semibold">
            <Link to={'/'}>
              <img src={Logo} alt="logo" className="h-14 hidden lg:block" />
              <img src={LogoIcon} alt="logo" className="h-14 lg:hidden " />
            </Link>
          </h1>
        </div>

        {/* search */}
        {/* <div
          className=" min-w-[270px] border-2  border-gray-300 flex items-center px-2 py-3 flex-[0.5] rounded-lg focus-within:border-rose  relative
        "
        >
          <input
            onClick={(e) => {
              e.stopPropagation()
              setSearchFocus(true)
            }}
            onKeyDown={(e) => (e.key === 'Enter' ? goToSearchPage() : '')}
            onInput={(e) => setKeyword(e.currentTarget.value)}
            value={keyword}
            type="text"
            className="bg-transparent outline-0 flex-1 placeholder:text-white"
            placeholder="What do you want to watch?"
          />
          <SearchIcon />

          {isSearchFocus && keyword ? (
            <SearchResult
              keyword={keyword}
              goToSearchPage={goToSearchPage}
            ></SearchResult>
          ) : (
            ''
          )}
        </div> */}

        <SearchMovies />

        <div className="lg:flex items-center gap-2 hidden">
          <Link className={getMenuClass('/movies')} to={'/sign-in'}>
            <span className=" text-xl font-bold">Sign In</span>
          </Link>
          <MenuIcon />
        </div>
      </Container>
    </div>
  )
}

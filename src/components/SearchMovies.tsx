import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { searchMoviesByTitle } from '../api/tmdb-api'
import { formatUTCDate, tmdbImageSrc } from '../utils'
import { useGlobalContext } from './app-container'
import { SearchIcon } from '../assets/DevIcons'
import { Loading } from './loading'

const SearchMovies: React.FC = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (searchTerm: string) => {
    setLoading(true)

    try {
      const results = await searchMoviesByTitle(searchTerm)
      setMovies(results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = debounce(handleSearch, 3000)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setQuery(searchTerm)

    if (searchTerm.length >= 2) {
      debouncedSearch(searchTerm)
    } else {
      setMovies([])
    }
  }
  const globalContext = useGlobalContext()

  const movieGenre = (id: any) =>
    globalContext.genres['movie']?.find((g: any) => g.id === id)?.name
  //   console.log('searchMovies', movies)

  //   console.log('query', query)

  const location = useLocation()
  const [params, _] = useSearchParams()
  const navigate = useNavigate()

  const [pathname, setPathname] = useState('')
  const pathnameRef = useRef('')
  const defaultKeyword = useRef('')

  const [isSearchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const goToSearchPage = () => {
    if (query) {
      defaultKeyword.current = query
      navigate(`/search?q=${query}`)
      setSearchFocus(false)
      searchRef.current?.blur()
    }
  }

  // console.log('query', query)
  const initKeyword = () => {
    if (pathnameRef.current === '/search') {
      setQuery(defaultKeyword.current)
    } else {
      setQuery('')
    }
  }

  const onWindowClick = () => {
    setSearchFocus(false)
    initKeyword()
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
  return (
    <div>
      <div
        className="min-w-[270px] border-2 lg:w-[450px] border-gray-300 flex items-center px-2 py-3 flex-[0.5] rounded-lg focus-within:border-rose  relative
        "
      >
        <input
          onClick={(e) => {
            e.stopPropagation()
            setSearchFocus(true)
          }}
          onKeyDown={(e) => (e.key === 'Enter' ? goToSearchPage() : '')}
          onInput={(e) => setQuery(e.currentTarget.value)}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="What do you want to watch?"
          className="bg-transparent outline-0 flex-1 placeholder:text-white"
        />
        <SearchIcon />
      </div>
      {isSearchFocus && query && (
        <div className=" ">
          <div className="min-w-[280px] centeredSearchResults scrollbar scrollbar-thumb-primary scrollbar-track-header  cursor-pointer max-h-[500px] overflow-y-auto">
            {loading && <Loading></Loading>}

            <div className="bg-primary lg:w-[450px] relative">
              <div className=" space-y-1">
                {movies?.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="flex items-center gap-4 hover:bg-black/30 rounded-md cursor-pointer search-card"
                  >
                    <div className=" rounded-md">
                      <img
                        src={tmdbImageSrc(movie.poster_path)}
                        className="h-[100px] min-w-[80px] max-h-[120px] rounded-md "
                        alt="poster"
                      />
                    </div>
                    <div className="">
                      <p className=" font-bold line-clamp-1">{movie.title}</p>
                      <p className="text-sm font-bold">
                        {formatUTCDate(movie.release_date)}
                      </p>
                      <div className="flex items-center gap-1 flex-wrap">
                        {movie.genre_ids.map((id: any, index: number) => (
                          <p
                            key={id}
                            className="font-bold text-sm text-gray-400"
                          >
                            {index === movie.genre_ids.length - 1
                              ? movieGenre(id)
                              : movieGenre(id) + ','}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {movies.length > 5 ? (
                <button
                  onClick={() => goToSearchPage()}
                  className="px-3 py-1.5 font-bold  lg:text-lg bg-rose text-white w-full hover:text-rose hover:bg-white  sticky bottom-0 shadow-lg"
                >
                  More results
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchMovies

export function debounce(func: Function, delay: number) {
  let timer: number
  return function (this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

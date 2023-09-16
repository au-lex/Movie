import React, { useEffect, useState } from 'react'
import { getPopularMovies } from '../api/tmdb-api'
import { tmdbImageSrc } from '../utils'
import MovieSlide from './MovieSlide'
import { useNavigate } from 'react-router-dom'

const Slide = require('react-reveal/Slide')
const makeCarousel = require('react-reveal/makeCarousel')

interface TrendingItem {
  title: string
  release_date?: string
  overview?: any
  vote_average?: number
  backdrop_path?: any
  poster_path?: any
  genreIds?: number[]
  id: number
}
type CarouselUIProps = {
  position?: any
  total?: number
  handleClick?: any
  children?: any
}
const MovieCarosel = () => {
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies()
        setMovies(data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }

    fetchMovies()
  }, [])

  const discoverMovies = movies.slice(0, 5)

  // console.log('discovered movies', discoverMovies)

  const defaultMovie: TrendingItem = {
    title: 'John Wick 3 : Parabellum',
    poster_path: '/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg',
    backdrop_path: '/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg',

    overview:
      'Super-assassin John Wick returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin’s guild, the High Table, John Wick is excommunicado, but the world’s most ruthless hit men and women await his every turn.',
    vote_average: 8.7,
    genreIds: [28, 53, 80],
    id: 458156,
  }

  const trendingMovies = [defaultMovie, ...discoverMovies]

  // console.log('trendingMovies', trendingMovies)

  const CarouselUI = ({
    position,
    total,
    handleClick,
    children,
  }: CarouselUIProps) => (
    <div className="relative overflow-hidden w-full h-screen">
      <section>{children}</section>

      <div className="centeredRight z-40 cursor-pointer">
        <div className="flex flex-col gap-1 items-end ">
          {Array(...Array(total)).map((val, index) => (
            <div key={index} onClick={handleClick} data-position={index}>
              {index === position ? (
                <div
                  className="flex items-center gap-2 "
                  onClick={handleClick}
                  data-position={position - 1}
                >
                  <div className=" bg-white w-6 h-1 lg:w-8 lg:h-1.5 rounded-3xl"></div>
                  <p className="!text-2xl !text-white !font-bold">
                    {index + 1}
                  </p>
                </div>
              ) : (
                <p
                  onClick={handleClick}
                  data-position={position + 1}
                  className="paraBold"
                >
                  {index + 1}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const Carousel = makeCarousel(CarouselUI)

  return (
    <>
      <Carousel defaultWait={5000}>
        {trendingMovies?.map(
          ({ title, overview, poster_path, id, vote_average }, index) => (
            <Slide key={index} right>
              <MovieSlide
                title={title}
                overview={overview}
                poster_path={tmdbImageSrc(poster_path)}
                onClick={() => navigate(`/movie/${id}`)}
                vote_average={vote_average}
              />
            </Slide>
          )
        )}
      </Carousel>
    </>
  )
}

export default MovieCarosel

import React, { useState } from 'react'
import { HeartIcon } from '../assets/DevIcons'
import ImdbLogoIcon from '../assets/imdb.png'
import AppleIcon from '../assets/apple.svg'
import classNames from 'classnames'
import { useGlobalContext } from '../components/app-container'
import { MediaType } from '../types'
import { formatUTCDate, getFirstThreeDigits, roundUpDecimal } from '../utils'

type movieCardType = {
  poster?: any
  title: string
  category?: string
  onClick?: () => void
  genreIds?: any
  mediaType?: MediaType
  release_date?: any
  popularity?: number
  vote_average?: number
}
const MovieCard = ({
  poster,
  title,
  onClick,
  genreIds,
  mediaType = 'movie',
  release_date,
  popularity,
  vote_average,
}: movieCardType) => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen((prevState) => !prevState)
  }
  const globalContext = useGlobalContext()

  const movieGenre = (id: any) =>
    globalContext.genres[mediaType]?.find((g: any) => g.id === id)?.name

  return (
    <div data-testid="movie-card" className="w-full relative">
      <div className="group overflow-hidden ">
        <img
          data-testid="movie-poster"
          src={poster}
          className=" w-screen cursor-pointer object-cover h-full  transition-transform duration-[1600ms]  group-hover:scale-110 scale-100 min-h-[400px] max-h-[500px]"
          alt="poster"
          onClick={() => (onClick ? onClick() : '')}
        />
      </div>

      <div className=" w-full absolute left-0 top-3">
        <div className="flex items-center  justify-between px-4">
          <div>
            <p className=" uppercase text-sm p-1 px-3 text-gray-900 font-bold rounded-2xl bg-[#F3F4F6]/50">
              Movies
            </p>
          </div>
          <div
            className="rounded-full cursor-pointer p-2 bg-[#F3F4F6]/50 "
            onClick={toggle}
          >
            <HeartIcon
              className={classNames(
                { 'fill-[#D1D5DB]': open === false },
                { 'fill-red-600': open === true }
              )}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2 ">
        <p
          data-testid="movie-release-date"
          className="pt-4 font-bold text-gray-400"
        >
          USA, {formatUTCDate(release_date)}
        </p>
        <h4
          data-testid="movie-title"
          className="text-gray-900 font-bold text-xl cursor-pointer"
          onClick={() => (onClick ? onClick() : '')}
        >
          {title}
        </h4>
        <div className=" flex items-center justify-between text-gray-900">
          <div className=" flex items-center gap-2">
            <img src={ImdbLogoIcon} className="h-5" alt="imdb logo" />
            <p>{Number(vote_average) * 10} / 100</p>
          </div>
          <div className=" flex items-center gap-3">
            <img src={AppleIcon} alt="imdb logo" />
            <p>{roundUpDecimal(popularity)}%</p>
          </div>
        </div>
        <div className=" flex items-center gap-2 flex-wrap">
          {genreIds.map((id: any, index: number) => (
            <p key={id} className="font-bold text-gray-400">
              {
                index === genreIds.length - 1
                  ? movieGenre(id)
                  : movieGenre(id) + ','

                // globalContext.genres[mediaType]?.find((g: any) => g.id === id)
                //   ?.name
              }
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieCard

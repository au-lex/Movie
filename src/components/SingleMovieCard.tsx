import React, { useState } from 'react'
import {
  DownArrowIcon,
  ListIcon,
  MoviePlayIcons,
  StarIcon,
  TicketIcon,
} from '../assets/DevIcons'
import Badge from './Badge'
import Button from './Button'
import Ticket from '../../src/assets/movie-poster-small.png'
import { useGlobalContext } from './app-container'
import { MediaType } from '../types'
import { TrailerModal } from './trailer-modal'
import { singleMovieType } from '../interfaces'

const SingleMovieCard = ({
  coverPath,
  description,
  title,
  mediaType = 'movie',
  genreIds,
  onClick,
  id,
  trailers,
  movieRelatedate,
}: singleMovieType) => {
  const globalContext = useGlobalContext()
  const [trailerSrc, setTrailerSrc] = useState('')

  const playTrailer = async (key: string) => {
    setTrailerSrc(`https://www.youtube.com/embed/${key}?autoplay=1`)
  }

  return (
    <>
      <TrailerModal
        onHide={() => setTrailerSrc('')}
        src={trailerSrc}
      ></TrailerModal>
      <div className="relative  rounded-3xl">
        <img
          src={coverPath}
          alt="movie poster"
          className="relative w-full max-h-[500px] min-h-[300px] rounded-3xl  "
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-3xl"></div>
        {trailers.slice(0, 1).map((trailer: any, i: any) => (
          <div
            key={i}
            onClick={() => playTrailer(trailer.key)}
            className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <div className=" flex flex-col gap-5 items-center justify-center">
              <div className=" p-6 px-7 bg-white/30 rounded-full ">
                <MoviePlayIcons />
              </div>

              <p className="text-white font-bold text-xl"> Watch Trailer</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-8 pt-6">
        <div className=" lg:col-span-2">
          <div className=" flex flex-col lg:flex-row items-center justify-start lg:justify-between  ">
            <div className="flex items-center gap-1 text-gray-800 font-bold text-lg lg:text-xl flex-wrap">
              <p className=" capitalize">{mediaType}:</p>
              <p data-testid="movie-title">{title} </p>
              <p className=" "> • </p>
              <p data-testid="movie-release-date">{movieRelatedate} </p>
              <p className=" "> •</p>
              <p className=" ">PG-13 </p>
              <p className=" ">• </p>
              <p data-testid="movie-runtime">2h 10m</p>
            </div>
            <div className="flex items-start flex-wrap lg:items-center pt-2 gap-3">
              {genreIds.map((id: any) => (
                <Badge key={id}>
                  {
                    globalContext.genres[mediaType]?.find(
                      (g: any) => g.id === id
                    )?.name
                  }
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-gray-600 lg:text-lg font-medium space-y-6">
            <p data-testid="movie-overview" className=" pt-6">
              {description}
            </p>
            <p>
              Director : <span className="text-rose">Joseph Kosinski</span>
            </p>
            <p>
              Writers :{' '}
              <span className="text-rose">
                Jim Cash, Jack Epps Jr, Peter Craig
              </span>
            </p>
            <p>
              Stars :
              <span className="text-rose">
                {' '}
                Tom Cruise, Jennifer Connelly, Miles Teller
              </span>
            </p>
            <div className="flex item items-center justify-between w-full border border-gray-300 rounded-xl cursor-pointer">
              <div className="flex items-center gap-2">
                <Button title="Top rated movie #65" className="" />{' '}
                <p className="text-gray-600 text-lg font-medium ">
                  Awards 9 nominations
                </p>
              </div>
              <div className="pr-4">
                <DownArrowIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="bg- grid-cols-3 lg:grid-cols-1">
          <div className=" inline-flex items-center justify-end gap-2 float-right pb-4">
            <StarIcon />
            <p className="text-gray-400 text-lg font-bold ">
              8.5 <span className="text-gray-900">| 350k</span>
            </p>
          </div>
          <Button
            leftIcon={<TicketIcon />}
            title="See Showtimes"
            className="w-full"
          />
          <Button
            leftIcon={<ListIcon />}
            title="More watch options"
            color="secondary"
            className="w-full mt-4"
          />
          <div className="pt-5 relative cursor-pointer ">
            <img src={Ticket} alt="movie poster small" className="rounded-xl" />
            <div className=" absolute bg-black/80 p-3 w-full bottom-0 rounded-t rounded-xl">
              <div className=" flex items-center gap-2  justify-center ">
                <ListIcon />
                <p className="text-sm">
                  The Best Movies and Shows in September
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleMovieCard

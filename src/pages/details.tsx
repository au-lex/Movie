import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import {
  DownArrowIcon,
  ListIcon,
  MoviePlayIcons,
  StarIcon,
  TicketIcon,
  XIcon,
} from '../assets/DevIcons'
import movieImage from '../assets/movie-poster.png'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Ticket from '../../src/assets/movie-poster-small.png'

const MovieDetails = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen((prevState) => !prevState)
  }
  return (
    <div className="">
      <button
        onClick={toggle}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-900 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      {open === true && (
        <div
          className=" float-right cursor-pointer mt-2 mr-2 bg-rose/10 rounded"
          onClick={toggle}
        >
          <XIcon />
        </div>
      )}
      {/* sidebar */}
      <SideBar open={open} />
      <div className="p-4 sm:ml-72">
        <div className="relative  rounded-3xl">
          <img
            src={movieImage}
            alt="movie poster"
            className="relative max-h-[500px] min-h-[300px] rounded-3xl  "
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-3xl"></div>
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
            <div className=" flex flex-col gap-5 items-center justify-center">
              <div className=" p-6 bg-white/30 rounded-full ">
                <MoviePlayIcons />
              </div>

              <p className="text-white font-bold text-xl"> Watch Trailer</p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 pt-6">
          <div className=" lg:col-span-2">
            <div className=" flex flex-col lg:flex-row items-center justify-start lg:justify-between  ">
              <div className="flex items-center gap-1 text-gray-800 font-bold text-lg lg:text-xl flex-wrap">
                <p className=" ">Top Gun:</p>
                <p className=" ">Maverick </p>
                <p className=" "> • </p>
                <p className=" ">2022 </p>
                <p className=" "> •</p>
                <p className=" ">PG-13 </p>
                <p className=" ">• </p>
                <p className=" ">2h 10m</p>
              </div>
              <div className="flex items-start lg:items-center gap-3">
                <Badge>Action</Badge>
                <Badge>Drama</Badge>
              </div>
            </div>
            <div className="text-gray-600 lg:text-lg font-medium space-y-6">
              <p className=" pt-6">
                After thirty years, Maverick is still pushing the envelope as a
                top naval aviator, but must confront ghosts of his past when he
                leads TOP GUN's elite graduates on a mission that demands the
                ultimate sacrifice from those chosen to fly it.
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
              <img
                src={Ticket}
                alt="movie poster small"
                className="rounded-xl"
              />
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
      </div>
    </div>
  )
}

export default MovieDetails

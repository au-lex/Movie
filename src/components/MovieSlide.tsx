import React, { useState } from 'react'
import Button from './Button'
import { PlayIcon } from '../assets/DevIcons'
import ImdbLogoIcon from '../assets/imdb.png'
import AppleIcon from '../assets/apple.svg'
import { singleMovieType } from '../interfaces'
import { TrailerModal } from './trailer-modal'

const MovieSlide = ({
  title,
  poster_path,
  backdrop_path,
  overview,
  vote_average,
  onClick,
}: singleMovieType) => {
  const [trailerSrc, setTrailerSrc] = useState('')
  // const playTrailer = async (key: string) => {
  //   setTrailerSrc(`https://www.youtube.com/embed/${key}?autoplay=1`)
  // }

  const divStyle = {
    backgroundImage: `url(${poster_path})`,
    postion: 'relative',
  }

  const vote = Number(vote_average) * 10
  return (
    <>
      <TrailerModal
        onHide={() => setTrailerSrc('')}
        src={trailerSrc}
      ></TrailerModal>
      <section
        className="relative bg-overlay w-full h-screen top-0 left-0 object-cover object-[83%] bg-cover bg-center  "
        style={divStyle}
      >
        <div className="  ">
          <div className="centeredLeft">
            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-black max-w-sm">
              {title}
            </h1>
            <div className=" flex items-center gap-10 py-6">
              <div className=" flex items-center gap-2">
                <img src={ImdbLogoIcon} className="h-5" alt="imdb logo" />
                <p>{vote}/ 100</p>
              </div>
              <div className=" flex items-center gap-3">
                <img src={AppleIcon} alt="imdb logo" />
                <p>97%</p>
              </div>
            </div>
            <p className="text-sm lg:text-xl max-w-[300px] line-clamp-4 lg:max-w-lg">
              {overview}
            </p>
            <div className="pt-6">
              <Button
                onClick={() => (onClick ? onClick() : '')}
                title="Watch trailer"
                leftIcon={<PlayIcon />}
                className="uppercase"
              />
            </div>
          </div>
          {/* <div className="centeredRight">
            <div className="flex flex-col gap-1 items-end paraBold">
              <p>1</p>
              <p>2</p>
              <div className="flex items-center gap-2 ">
                <div className=" bg-white w-8 h-1 lg:w-12 lg:h-1.5 rounded-3xl"></div>
                <p className="!text-2xl !text-white !font-bold">3</p>
              </div>
              <p>4</p>
              <p>5</p>
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default MovieSlide

import React from 'react'
import ImdbLogoIcon from '../assets/imdb.png'
import AppleIcon from '../assets/apple.svg'
import { ChevonRightIcon, HeartIcon, PlayIcon } from '../assets/DevIcons'
import { Container } from '../components/container'
import Poster from '../assets/Poster-1.png'
import Button from '../components/Button'

const Design = () => {
  return (
    <div className="">
      <section className="relative bg-overlay w-full h-screen top-0 left-0 object-cover object-[83%] bg-cover bg-center  bg-[url('./assets/Poster.png')] ">
        <div className="  ">
          <div className="centeredLeft">
            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-black max-w-sm">
              John Wick 3 : Parabellum
            </h1>
            <div className=" flex items-center gap-10 py-6">
              <div className=" flex items-center gap-2">
                <img src={ImdbLogoIcon} className="h-5" alt="imdb logo" />
                <p>86.0 / 100</p>
              </div>
              <div className=" flex items-center gap-3">
                <img src={AppleIcon} alt="imdb logo" />
                <p>97%</p>
              </div>
            </div>
            <p className="text-sm lg:text-xl max-w-[300px] lg:max-w-lg">
              John Wick is on the run after killing a member of the
              international assassins' guild, and with a $14 million price tag
              on his head, he is the target of hit men and women everywhere.
            </p>
            <div className="pt-6">
              <Button
                title="Watch trailer"
                leftIcon={<PlayIcon />}
                className="uppercase"
              />
            </div>
          </div>
          <div className="centeredRight">
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
          </div>
        </div>
      </section>
      <Container>
        <section>
          <div className=" flex items-center justify-between py-10">
            <h2 className="text-xl lg:text-4xl text-black font-black">
              Featured Movie
            </h2>

            <p className="text-rose font-semibold lg:text-lg cursor-pointer inline-flex items-center gap-1">
              See more <ChevonRightIcon />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:gap-10  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div data-testid="movie-card" className="w-full relative">
              <img
                data-testid="movie-poster"
                src={Poster}
                className=" w-screen"
                alt="poster"
              />
              <div className=" w-full absolute left-0 top-3">
                <div className="flex items-center  justify-between px-4">
                  <div>
                    <p className=" uppercase p-1 px-3 text-gray-900 font-bold rounded-2xl bg-[#F3F4F6]/50">
                      Tv Series
                    </p>
                  </div>
                  <div className="rounded-full cursor-pointer p-2 bg-[#F3F4F6]/50">
                    <HeartIcon className="fill-[#D1D5DB]" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 ">
                <p
                  data-testid="movie-release-date"
                  className="pt-4 font-bold text-gray-400"
                >
                  USA, 2016 - Current
                </p>
                <h4
                  data-testid="movie-title"
                  className="text-gray-900 font-bold text-xl"
                >
                  Stranger Things
                </h4>
                <div className=" flex items-center justify-between text-gray-900">
                  <div className=" flex items-center gap-2">
                    <img src={ImdbLogoIcon} className="h-5" alt="imdb logo" />
                    <p>86.0 / 100</p>
                  </div>
                  <div className=" flex items-center gap-3">
                    <img src={AppleIcon} alt="imdb logo" />
                    <p>97%</p>
                  </div>
                </div>
                <div className=" flex items-center gap-1 flex-wrap">
                  <p className="font-bold text-gray-400">Action,</p>
                  <p className="font-bold text-gray-400">Adventure,</p>
                  <p className="font-bold text-gray-400">Horror</p>
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <img src={Poster} className=" w-screen" alt="poster" />
              <div className=" w-full absolute left-0 top-3">
                <div className="flex items-center  justify-between px-4">
                  <div>
                    <p className=" uppercase p-1 px-3 text-gray-900 font-bold rounded-2xl bg-[#F3F4F6]/50">
                      Tv Series
                    </p>
                  </div>
                  <div className="rounded-full cursor-pointer p-2 bg-[#F3F4F6]/50">
                    <HeartIcon />
                  </div>
                </div>
              </div>
              <div className="space-y-2 ">
                <p className="pt-4 font-bold text-gray-400">
                  USA, 2016 - Current
                </p>
                <h4 className="text-gray-900 font-bold text-xl">
                  Stranger Things
                </h4>
                <div className=" flex items-center justify-between text-gray-900">
                  <div className=" flex items-center gap-2">
                    <img src={ImdbLogoIcon} className="h-5" alt="imdb logo" />
                    <p>86.0 / 100</p>
                  </div>
                  <div className=" flex items-center gap-3">
                    <img src={AppleIcon} alt="imdb logo" />
                    <p>97%</p>
                  </div>
                </div>
                <div className=" flex items-center gap-1 flex-wrap">
                  <p className="font-bold text-gray-400">Action,</p>
                  <p className="font-bold text-gray-400">Adventure,</p>
                  <p className="font-bold text-gray-400">Horror</p>
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <img src={Poster} className=" w-screen" alt="poster" />
              <div className=" w-full absolute left-0 top-3">
                <div className="flex items-center  justify-between px-4">
                  <div>
                    <p className=" uppercase p-1 px-3 text-gray-900 font-bold rounded-2xl bg-[#F3F4F6]/50">
                      Tv Series
                    </p>
                  </div>
                  <div className="rounded-full cursor-pointer p-2 bg-[#F3F4F6]/50">
                    <HeartIcon />
                  </div>
                </div>
              </div>
              <div className="space-y-2 ">
                <p className="pt-4 font-bold text-gray-400">
                  USA, 2016 - Current
                </p>
                <h4 className="text-gray-900 font-bold text-xl">
                  Stranger Things
                </h4>
                <div className=" flex items-center justify-between text-gray-900">
                  <div className=" flex items-center gap-2">
                    <img src={ImdbLogoIcon} className="h-5" alt="imdb logo" />
                    <p>86.0 / 100</p>
                  </div>
                  <div className=" flex items-center gap-3">
                    <img src={AppleIcon} alt="imdb logo" />
                    <p>97%</p>
                  </div>
                </div>
                <div className=" flex items-center gap-1 flex-wrap">
                  <p className="font-bold text-gray-400">Action,</p>
                  <p className="font-bold text-gray-400">Adventure,</p>
                  <p className="font-bold text-gray-400">Horror</p>
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <img src={Poster} className=" w-screen" alt="poster" />
              <div className=" w-full absolute left-0 top-3">
                <div className="flex items-center  justify-between px-4">
                  <div>
                    <p className=" uppercase p-1 px-3 text-gray-900 font-bold rounded-2xl bg-[#F3F4F6]/50">
                      Tv Series
                    </p>
                  </div>
                  <div className="rounded-full cursor-pointer p-2 bg-[#F3F4F6]/50">
                    <HeartIcon />
                  </div>
                </div>
              </div>
              <div className="space-y-2 ">
                <p className="pt-4 font-bold text-gray-400">
                  USA, 2016 - Current
                </p>
                <h4 className="text-gray-900 font-bold text-xl">
                  Stranger Things
                </h4>
                <div className=" flex items-center justify-between text-gray-900">
                  <div className=" flex items-center gap-2">
                    <img src={ImdbLogoIcon} className="h-5" alt="imdb logo" />
                    <p>86.0 / 100</p>
                  </div>
                  <div className=" flex items-center gap-3">
                    <img src={AppleIcon} alt="imdb logo" />
                    <p>97%</p>
                  </div>
                </div>
                <div className=" flex items-center gap-1 flex-wrap">
                  <p className="font-bold text-gray-400">Action,</p>
                  <p className="font-bold text-gray-400">Adventure,</p>
                  <p className="font-bold text-gray-400">Horror</p>
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <img src={Poster} className=" w-screen" alt="poster" />
              <div className=" w-full absolute left-0 top-3">
                <div className="flex items-center  justify-between px-4">
                  <div>
                    <p className=" uppercase p-1 px-3 text-gray-900 font-bold rounded-2xl bg-[#F3F4F6]/50">
                      Tv Series
                    </p>
                  </div>
                  <div className="rounded-full cursor-pointer p-2 bg-[#F3F4F6]/50">
                    <HeartIcon />
                  </div>
                </div>
              </div>
              <div className="space-y-2 ">
                <p className="pt-4 font-bold text-gray-400">
                  USA, 2016 - Current
                </p>
                <h4 className="text-gray-900 font-bold text-xl">
                  Stranger Things
                </h4>
                <div className=" flex items-center justify-between text-gray-900">
                  <div className=" flex items-center gap-2">
                    <img src={ImdbLogoIcon} className="h-5" alt="imdb logo" />
                    <p>86.0 / 100</p>
                  </div>
                  <div className=" flex items-center gap-3">
                    <img src={AppleIcon} alt="imdb logo" />
                    <p>97%</p>
                  </div>
                </div>
                <div className=" flex items-center gap-1 flex-wrap">
                  <p className="font-bold text-gray-400">Action,</p>
                  <p className="font-bold text-gray-400">Adventure,</p>
                  <p className="font-bold text-gray-400">Horror</p>
                </div>
              </div>
            </div>
            <div className="h-96  bg-rose"></div>
            <div className="h-96  bg-rose/70"></div>
            <div className="h-96  bg-rose/90"></div>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default Design

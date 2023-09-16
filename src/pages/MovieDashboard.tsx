import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import SideBar from '../components/SideBar'
import { XIcon } from '../assets/DevIcons'

import { getTrailers } from '../api/tmdb-api'
import { fetchSingleMovie } from '../api/tmdb-api'

import { Loading } from '../components/loading'

import { TrailerModal } from '../components/trailer-modal'
import { Trailer, singleMovieType } from '../interfaces'
// import { MediaType } from '../types'
import {
  tmdbImageSrc,
  // youtubeThumbnail,
} from '../utils'

import SingleMovieDetail from '../components/SingleMovieDetail'

// interface Props {
//   mediaType: MediaType
// }

const MovieDashboard = () => {
  // const navigate = useNavigate()
  const { id } = useParams<any>()

  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen((prevState) => !prevState)
  }

  const [trailerSrc, setTrailerSrc] = useState('')

  const [trailers, setTrailers] = useState<Trailer[]>([])

  let locations = useLocation()

  const [loading, setLoading] = useState<boolean>(true)
  const [movieData, setMovieData] = useState<singleMovieType | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetch = async () => {
    //  const film = await getDetail(props.mediaType, parseInt(id as string))
    if (movieData) {
      setTrailers(await getTrailers('movie', movieData.id))
    }
  }

  useEffect(() => {
    const movieId = parseInt(id as string)

    fetchSingleMovie(movieId)
      .then((data) => {
        setMovieData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  // console.log('trailers', trailers)

  if (movieData === null) {
    // redirect to 404 page
    return <></>
  } else if (movieData === undefined) {
    return (
      <div className="text-center p-6 pt-20 h-full flex-1">
        <Loading></Loading>
      </div>
    )
  }

  interface CrewMember {
    job: string
    name: string
  }

  interface castMember {
    name?: string
  }
  interface Credits {
    crew: CrewMember[]
    cast?: castMember[]
  }

  interface MovieData {
    credits?: Credits
  }

  const director: string | undefined = (
    movieData as MovieData
  )?.credits?.crew?.find((g) => g.job === 'Director')?.name

  const movieDirector =
    director === undefined || director === null ? ' Joseph Kosinsk' : director
  const Writers = (movieData as MovieData)?.credits?.crew?.find(
    (g) => g.job === 'Producer'
  )?.name

  const moviesWriter =
    Writers === undefined ? 'Jim Cash, Jack Epps Jr,  Peter Craig' : Writers

  const cast = (movieData as MovieData)?.credits?.cast?.map(({ name }) => name)

  const stars = cast?.slice(0, 4)

  const moveieStar =
    stars === undefined || stars === null
      ? 'Tom Cruise, Jennifer Connelly, Miles Teller'
      : stars

  return (
    <>
      <TrailerModal
        onHide={() => setTrailerSrc('')}
        src={trailerSrc}
      ></TrailerModal>

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
      <SideBar open={open} location={locations} />
      <div className="p-4 sm:ml-72">
        <SingleMovieDetail
          backdrop_path={tmdbImageSrc(movieData?.backdrop_path)}
          overview={movieData?.overview}
          title={movieData?.title}
          vote_average={movieData?.vote_average}
          runtime={movieData?.runtime}
          release_date={movieData?.release_date}
          directors={movieDirector}
          Writers={moviesWriter}
          stars={moveieStar}
          genres={movieData?.genres}
          vote_count={movieData?.vote_count}
          trailers={trailers}
        />
      </div>
    </>
  )
}

export default MovieDashboard

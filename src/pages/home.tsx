import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchTopRatedMovies } from '../api/tmdb-api'
import { TrailerModal } from '../components/trailer-modal'
import { tmdbImageSrc } from '../utils'
import { Container } from '../components/container'
import { ChevonRightIcon } from '../assets/DevIcons'
import MovieCard from '../components/MovieCard'

import MovieCarosel from '../components/MovieCarosel'
import Layout from '../layouts/Layout'

export const Home = () => {
  const navigate = useNavigate()

  const [trailerSrc, setTrailerSrc] = useState('')

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData: any = await fetchTopRatedMovies()
        setMovies(moviesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // console.log('fetching data', movies)

  return (
    <>
      <Layout>
        <TrailerModal
          onHide={() => setTrailerSrc('')}
          src={trailerSrc}
        ></TrailerModal>

        <MovieCarosel />

        <Container>
          <section>
            <div className=" flex items-center justify-between py-10">
              <h2 className="text-xl lg:text-4xl text-black font-black">
                Featured Movie
              </h2>
              <Link to="/movies">
                <p className="text-rose font-semibold lg:text-lg cursor-pointer inline-flex items-center gap-1">
                  See more <ChevonRightIcon />
                </p>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:gap-10  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies
                ?.slice(0, 10)
                ?.map(
                  (
                    {
                      title,
                      poster_path,
                      id,
                      popularity,
                      release_date,
                      genre_ids,
                      vote_average,
                    },
                    index
                  ) => (
                    <MovieCard
                      title={title}
                      key={index}
                      poster={tmdbImageSrc(poster_path)}
                      onClick={() => navigate(`/movie/${id}`)}
                      popularity={popularity}
                      genreIds={genre_ids}
                      release_date={release_date}
                      vote_average={vote_average}
                    />
                  )
                )}
            </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTopRatedMovies } from '../api/tmdb-api'
import MovieCard from '../components/MovieCard'
import { tmdbImageSrc } from '../utils'
import Layout from '../layouts/Layout'
import { Container } from '../components/container'

const AllMovies = () => {
  const navigate = useNavigate()

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
  return (
    <Layout>
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>
      <Container>
        <div className=" flex items-center justify-between py-10">
          <h2 className="text-xl lg:text-4xl text-black font-black">
            Top Rated Movies
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:gap-10  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies?.map(
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
      </Container>
    </Layout>
  )
}

export default AllMovies

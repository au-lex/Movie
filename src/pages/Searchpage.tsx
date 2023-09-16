import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchMovies } from '../api/tmdb-api'
import { Container } from '../components/container'
import MovieCard from '../components/MovieCard'
import { tmdbImageSrc } from '../utils'
import Layout from '../layouts/Layout'

const Searchpage = () => {
  const [params] = useSearchParams()
  const query: any = params.get('q')
  //   console.log('show search page', params.get('q'))
  const navigate = useNavigate()

  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const data = await searchMovies(query)
        setResults(data.results)
      } catch (error) {
        console.error(error)
      }
    }

    handleSearch()
  }, [query])

  console.log('results', results)

  return (
    <>
      <Layout>
        {/* background */}
        <div className="h-[120px] left-0 right-0 top-0 relative">
          <div className="overlay-film-cover"></div>
          <div className="h-full w-full bg-rose/20"></div>
        </div>

        <Container>
          <section>
            <div className=" flex items-center justify-between py-10">
              <h2 className="text-xl lg:text-4xl text-black font-black">
                Search results for <i className=" capitalize">{query}</i>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:gap-10  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results?.map(
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

export default Searchpage

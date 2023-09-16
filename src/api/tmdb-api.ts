import axios, { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import {
  Cast,
  Episode,
  Film,
  Genre,
  ReleaseDate,
  Season,
  Trailer,
} from '../interfaces'
import { MediaType } from '../types'
import { formatResult } from '../utils'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_URL,
})

axiosClient.interceptors.request.use((config) => {
  return {
    ...config,

    params: {
      ...config.params,
      api_key: process.env.REACT_APP_TMDB_API_KEY,
    },
  }
})

// export const getTrendings = async (mediaType: MediaType): Promise<Film[]> => {
//   try {
//     const { data } = await axiosClient.get<
//       any,
//       AxiosResponse<{
//         results: unknown[]
//       }>
//     >(`/trending/${mediaType}/week`)

//     return data.results.map((val) => formatResult(val, mediaType))
//   } catch (error) {
//     console.error(error)
//   }

//   return []
// }

export const getMovieReleaseDates = async (
  movieId: number
): Promise<ReleaseDate[]> => {
  const apiKey = '535ae11ce858546f3e1ecf6edc9a5475' // Replace with your TMDB API key
  const url = `https://api.themoviedb.org/3/movie/${movieId}/release_dates`

  try {
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error fetching release dates:', error)
    return []
  }
}

// export const getInTheaters = async (): Promise<Film[]> => {
//   try {
//     const { data } = await axiosClient.get<
//       any,
//       AxiosResponse<{
//         results: unknown[]
//       }>
//     >(`/movie/now_playing`)

//     return data.results.map((val) => formatResult(val, 'movie'))
//   } catch (error) {
//     console.error(error)
//   }

//   return []
// }

// export const getPopulars = async (
//   mediaType: MediaType,
//   page = 1
// ): Promise<Film[]> => {
//   try {
//     const { data } = await axiosClient.get<
//       any,
//       AxiosResponse<{
//         results: unknown[]
//       }>
//     >(`/${mediaType}/popular`, {
//       params: {
//         page,
//       },
//     })

//     return data.results.map((val) => formatResult(val, mediaType))
//   } catch (error) {
//     console.error(error)
//   }

//   return []
// }

// export const getTopRated = async (
//   mediaType: MediaType,
//   page = 1
// ): Promise<{
//   films: Film[]
//   totalPages: number
// }> => {
//   try {
//     const { data } = await axiosClient.get<
//       any,
//       AxiosResponse<{
//         results: unknown[]
//         total_pages: number
//       }>
//     >(`/${mediaType}/top_rated`, {
//       params: {
//         page,
//       },
//     })

//     return {
//       films: data.results.map((val) => formatResult(val, mediaType)),
//       totalPages: data.total_pages,
//     }
//   } catch (error) {
//     console.error(error)
//   }

//   return {
//     films: [],
//     totalPages: 0,
//   }
// }

export const search = async (
  query: string,
  page = 1
): Promise<{
  totalPages: number
  totalResults: number
  films: Film[]
}> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        total_pages: number
        total_results: number
        results: unknown[]
      }>
    >(`/search/multi`, {
      params: {
        query,
        page,
      },
    })

    return {
      totalPages: data.total_pages,
      totalResults: data.total_results,
      films: data.results.map((val) => formatResult(val)),
    }
  } catch (error) {
    console.error(error)
  }

  return {
    totalPages: 0,
    totalResults: 0,
    films: [],
  }
}

export const getGenres = async (mediaType: MediaType): Promise<Genre[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        genres: unknown[]
      }>
    >(`/genre/${mediaType}/list`)

    return data.genres as Genre[]
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getDetail = async (
  mediaType: MediaType,
  id: number
): Promise<null | Film> => {
  try {
    const { data } = await axiosClient.get(`/${mediaType}/${id}`)

    return formatResult(data, mediaType)
  } catch (error) {
    console.error(error)
  }

  return null
}

export const getCasts = async (
  mediaType: MediaType,
  id: number
): Promise<Cast[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        cast: any[]
      }>
    >(`/${mediaType}/${id}/credits`)

    return (
      data.cast.map((cast) => ({
        id: cast.id,
        characterName: cast.character,
        name: cast.name,
        profilePath: cast.profile_path,
      })) ?? []
    )
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getTrailers = async (
  mediaType: MediaType,
  id: number
): Promise<Trailer[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: any[]
      }>
    >(`/${mediaType}/${id}/videos`)

    return (
      data.results
        .filter((res) => res.site.toLowerCase() === 'youtube')
        .map((res) => ({
          id: res.id,
          key: res.key,
        })) ?? []
    )
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getRecommendations = async (
  mediaType: MediaType,
  id: number
): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[]
      }>
    >(`/${mediaType}/${id}/recommendations`)

    return data.results.map((val) => formatResult(val, mediaType))
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getSeason = async (
  tvId: number,
  seasonNumber: number
): Promise<Season | null> => {
  try {
    const { data } = await axiosClient.get<any, any>(
      `/tv/${tvId}/season/${seasonNumber}`
    )

    const film = await getDetail('tv', tvId)

    return {
      id: data.id,
      filmName: film?.title || '',
      name: data.name,
      posterPath: data.poster_path,
      seasonNumber: data.season_number,
      airDate: data.air_date,
      episodes: data.episodes.map(
        (episode: any) =>
          ({
            id: episode.id,
            title: episode.name,
            overview: episode.overview,
            airDate: episode.air_date,
            stillPath: episode.still_path,
            episodeNumber: episode.episode_number,
          } satisfies Episode)
      ),
    }
  } catch (error) {
    console.error(error)
  }

  return null
}

export const discover = async (
  mediaType: MediaType,
  page = 1
): Promise<{
  films: Film[]
  totalPages: number
}> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        total_pages: number
        results: unknown[]
      }>
    >(`/discover/${mediaType}`, {
      params: {
        page,
      },
    })

    return {
      films: data.results.map((val) => formatResult(val, mediaType)),
      totalPages: data.total_pages,
    }
  } catch (error) {
    console.error(error)
  }

  return {
    films: [],
    totalPages: 0,
  }
}
// https://api.themoviedb.org/3/movie/top_rated?api_key=535ae11ce858546f3e1ecf6edc9a5475&append_to_response=genres

// const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=images,credits`

//  https://api.themoviedb.org/3/search/movie?query=Blade&api_key=535ae11ce858546f3e1ecf6edc9a5475

export interface Movie {
  id: number
  title: string
  genres: Array<{ id: number; name: string }>
  overview: string
  release_date?: string
  poster_path?: string
  backdrop_path?: string
  popularity?: number
}

export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/top_rated',
      {
        params: {
          api_key: '535ae11ce858546f3e1ecf6edc9a5475',
          append_to_response: 'genres',
        },
      }
    )
    return response.data.results as Movie[]
  } catch (error) {
    throw new Error('Error fetching data')
  }
}

const apiKey = '535ae11ce858546f3e1ecf6edc9a5475'
const baseUrl = 'https://api.themoviedb.org/3'

export const searchMoviesByTitle = async (query: string) => {
  try {
    const response = await axios.get(`${baseUrl}/search/movie`, {
      params: {
        query,
        api_key: apiKey,
      },
    })

    return response.data.results
  } catch (error) {
    throw new Error(`Error searching movies: ${error}`)
  }
}

// api.ts

const API_KEY = '535ae11ce858546f3e1ecf6edc9a5475'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'

export const fetchSingleMovie = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'images,credits',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(`Error fetching movie: ${error}`)
  }
}

export const getMovieTrailers = async (movieId: number) => {
  try {
    const response = await axios.get(
      `/movie/${movieId}/videos?api_key=${API_KEY}`,
      {
        baseURL: BASE_URL,
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const searchMovies = async (query: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw new Error('Error fetching data from TMDb API')
  }
}

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
    )
    return response.data.results
  } catch (error) {
    throw error
  }
}

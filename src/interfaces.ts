import { ReactNode } from 'react'

import { MediaType } from './types'

export interface CustomComponentProps {
  children?: ReactNode
  className?: string
}

export interface Episode {
  id: number
  title: string
  overview: string
  airDate: string
  stillPath: string
  episodeNumber: number
}

export interface Season {
  id: number
  filmName: string
  name: string
  seasonNumber: number
  posterPath: string
  episodes: Episode[]
  airDate: string
}

export interface Film {
  id: number
  mediaType: MediaType
  title: string
  description: string
  posterPath: string
  coverPath: string
  genreIds: number[]
  seasons: Season[]
}

export interface Cast {
  id: number
  name: string
  characterName: string
  profilePath: string
}

export interface Trailer {
  id: number
  key: string
}

export interface Genre {
  id: number
  name: string
}

export interface ReleaseDate {
  release_date?: string
  type?: number
  note?: string
  certification?: string
}

export interface ReleaseDatesResponse {
  release_dates: ReleaseDate[]
}

export type singleMovieType = {
  backdrop_path?: any
  poster_path?: any
  runtime?: number
  release_date?: string
  vote_average?: number
  genres?: any
  directors?: any
  Writers?: any
  stars?: any
  overview?: string
  vote_count?: number
  coverPath?: string
  description?: string
  title?: string
  mediaType?: MediaType
  genreIds?: any
  onClick?: () => void
  id?: any
  trailers?: any
  movieRelatedate?: string
}

import { useEffect, useState } from 'react'
import { Film, ReleaseDatesResponse, Season } from './interfaces'
import { MediaType } from './types'
import { getMovieReleaseDates } from './api/tmdb-api'

export const mergeClassName = (val1: string, val2?: string) => {
  return val1 + ' ' + (val2 || '')
}

export const formatResult = (obj: any, mediaType?: MediaType): Film => {
  return {
    id: obj.id,
    title: obj.title || obj.name,
    description: obj.overview,
    coverPath: obj.backdrop_path,
    posterPath: obj.poster_path,
    genreIds: obj.genre_ids || obj.genres?.map((g: any) => g.id) || [],
    mediaType: mediaType || obj.media_type,
    seasons:
      obj.seasons?.map(
        (season: any) =>
          ({
            id: season.id,
            filmName: obj.title,
            name: season.name,
            posterPath: season.poster_path,
            seasonNumber: season.season_number,
            airDate: season.air_date,
            episodes: [],
          } satisfies Season)
      ) || [],
  }
}

export const isFilm = (film: any): film is Film => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return <Film>film !== undefined
}

export const tmdbImageSrc = (path: string) => {
  if (!path) return ''

  return `https://image.tmdb.org/t/p/original/${path}`
}

export const mergeFilms = (movies: Film[], tvs: Film[], limit = 6) => {
  const arrs: Film[] = []

  for (let i = 0; i < limit; i++) {
    let film: unknown

    if (i % 2 === 1) {
      if (tvs[i - 1]) {
        film = tvs[i - 1]
      }
    } else {
      if (movies[i - 1]) {
        film = tvs[i - 1]
      }
    }

    if (isFilm(film)) arrs.push(film)
  }

  return arrs
}

export const youtubeThumbnail = (key: string) => {
  return `https://img.youtube.com/vi/${key}/mqdefault.jpg`
}

export const formatDate = (val: string) => {
  const d = new Date(val)

  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
}

export const ShowReleaseDate = (movieId: any) => {
  const [releaseDates, setReleaseDates] = useState([])
  //  const movieId = 240

  useEffect(() => {
    getMovieReleaseDates(movieId)
      .then((dates: any) => {
        setReleaseDates(dates)
      })
      .catch((error) => {
        console.error('Error setting release dates:', error)
      })
  }, [movieId])

  const firstDate = releaseDates.map(
    ({ release_dates }: ReleaseDatesResponse) => release_dates
  )
  const realdate = firstDate.slice(0, 1)
  const movieCreationDate = realdate[0]?.map((item) => item.release_date)

  // console.log('moveiCreationDate ', movieCreationDate)

  return movieCreationDate
}

export type ISODateString = any
export type FormattedDateString = string

export function formatUTCDate(dateStr: ISODateString): FormattedDateString {
  const dateInUTC = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return dateInUTC.toLocaleDateString('en-US', options)
}

export function roundUpDecimal(num: any) {
  return Math.floor(Math.ceil(num))
}

export function roundToOneDecimalPlace(number: any) {
  return Math.round(number * 10) / 10
}
export function convertToMinutes(minutes: any) {
  var hours = Math.floor(minutes / 60)
  var remainingMinutes = minutes % 60
  return hours + ' h ' + remainingMinutes + ' m'
}

export function convertToShortForm(num: any) {
  if (num >= 10000) {
    return num / 100
  }
  return parseInt(num)
}

export function getFirstThreeDigits(number: any) {
  let numberString = number.toString()
  let dotIndex = numberString.indexOf('.')
  if (dotIndex !== -1) {
    return numberString.substring(0, dotIndex + 3)
  }

  return numberString
}

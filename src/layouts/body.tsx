import { Route, Routes } from 'react-router-dom'

// import { Film } from '../pages/Film'
import { Home } from '../pages/home'

import Design from '../pages/design'
// import MovieDetails from '../pages/details'

import Searchpage from '../pages/Searchpage'
import MovieDashboard from '../pages/MovieDashboard'
import AllMovies from '../pages/allMovies'
// import { Film } from '../pages/film'

export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/design" element={<Design />}></Route>
      <Route path="/movies" element={<AllMovies />}></Route>
      <Route path="/search" element={<Searchpage />}></Route>
      <Route path="/movie/:id" element={<MovieDashboard />}></Route>
    </Routes>
  )
}

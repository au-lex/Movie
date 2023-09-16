import { CalendarIcon, HomeIcon, MovieIcon, TvIcon } from '../assets/DevIcons'

const sidebar = [
  {
    title: 'Home',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    title: 'Movies',
    link: '/movie',
    icon: <MovieIcon />,
  },
  {
    title: 'TV Series',
    link: '/tv-series',
    icon: <TvIcon />,
  },
  {
    title: 'Upcoming',
    link: '/upcoming',
    icon: <CalendarIcon />,
  },
]

export default sidebar

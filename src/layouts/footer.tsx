import Facebook from '../assets/facebook.svg'
import Instagram from '../assets/instagram.svg'
import twitter from '../assets/twitter.svg'
import youtube from '../assets/facebook.svg'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className="p-6 pb-10 mt-20 text-center">
      <div className=" flex items-center justify-center cursor-pointer gap-6">
        <img src={Facebook} alt="icon" />
        <img src={Instagram} alt="icon" />
        <img src={twitter} alt="icon" />
        <img src={youtube} alt="icon" />
      </div>
      <div className=" flex flex-col lg:flex-row items-center  justify-center pt-4 gap-6">
        <Link to="#">
          <p className="text-gray-900 text-lg font-bold">Conditions of Use</p>
        </Link>
        <Link to="#">
          <p className="text-gray-900 text-lg font-bold">Privacy & Policy</p>
        </Link>
        <Link to="#">
          <p className="text-gray-900 text-lg font-bold">Press Room</p>
        </Link>
      </div>
      <p className="font-bold pt-4 text-gray-400 ">
        &#169; {new Date().getFullYear()} MovieBox by{' '}
        <a
          target="_blank"
          href="https://github.com/RACHID-WEBDEV"
          rel="noreferrer"
          className="text-gray-800"
        >
          RACHID
        </a>
      </p>
    </div>
  )
}

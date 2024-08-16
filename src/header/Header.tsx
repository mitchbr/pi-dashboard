import { Link } from "react-router-dom";
import './Header.css';

import logo from '../../raspberry-pi.svg';


function Header() {

  return (
    <header className="header">
      <div className="header__front">
        <span><Link to="/"><img src={logo} className="header__logo" alt="Review" /></Link></span>
        <span><Link to="/"><h2 className="header__title">Mitchell's Pi Hub</h2></Link></span>
      </div>
      <div className='header__links'>
        <span><Link to="/stats"> Stats </Link></span>
        <span><Link to="/portfolio"> Portfolio </Link></span>
        </div>
    </header>
  )
}

export default Header

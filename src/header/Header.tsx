import { Link } from "react-router-dom";
import './Header.css';

import logo from '../../raspberry-pi.svg';


function Header() {

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <span><Link to="/"><img src={logo} className="header__logo" alt="Review" /></Link></span>
          <span><Link to="/"><h2 className="header-text">Mitchell's Pi Hub</h2></Link></span>
        </div>
        <div className='header__right'>
          <div className='header__right-internal__links'>
            <span><Link className="header-text" to="/stats"> Stats </Link></span>
            <span><Link className="header-text" to="/portfolio"> Portfolio </Link></span>
          </div>
          <div className='header__right-external__links'>
            <span><a className="header-text" href="https://mitchbr.github.io/grocery_list_web/" target="_blank"> Groceries </a></span>
            <span><a className="header-text" href="https://github.com/mitchbr" target="_blank"> GitHub </a></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

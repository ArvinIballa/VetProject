import React, {useState} from 'react'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from '../ClientPage/SidebarData' 
import './Navbar.css'
import { IconContext } from 'react-icons/lib'
import * as CgIcons from 'react-icons/cg'
const Navbar = () => {

    const [sidebar, setSidebar] = useState(false)

    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }

    const forLogout = () => {
      console.log('logout')
      sessionStorage.clear()
    }

    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaBars onClick={toggleSidebar} />
          </Link>
          <label className='icon'>Petra</label>
          
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={toggleSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li onClick={forLogout} className='nav-text'>
              <Link to='/'>
                  <CgIcons.CgLogOut/>
                  <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
    )
}

export default Navbar

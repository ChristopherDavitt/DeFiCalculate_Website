import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { NodeData, LPData, NFTData } from './SidebarData';
import { IconContext } from 'react-icons';
import CoinGecko from '../Assets/images/CoinGecko.png'
import twitterLogo from '../Assets/images/twitter.png'
import patreonLogo from '../Assets/images/patreon2.png'
import coinIcon from '../../components/Assets/images/coinIcon.svg'

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
          <IconContext.Provider value={{ color: 'fff' }}>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className='nav-header'>
                  <div className='nav-header-text' style={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>
                  <h1 style={{color: 'white'}}>Defi Calculate</h1>
                  <img style={{width: '40px'}} src={coinIcon} />
                  </div>
                  <div style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}} onClick={showSidebar}>
                  <FaIcons.FaBars style={{width: '33px', height: '35px'}} /></div>
                </div>
              
              <ul className='nav-menu-items' >
                <li>
                    <div className='aboutme' >
                      <a href='https://twitter.com/CalculateFi' target='_blank' rel='noopener noreferrer'>  
                        <img className='iconbutton' style={{backgroundColor: 'white', borderRadius:'5px'}} src={twitterLogo} />
                      </a>
                      <a href='https://www.patreon.com/deficalculate' target='_blank' rel='noopener noreferrer'>
                        <img className='iconbutton' style={{backgroundColor: 'white', borderRadius: '5px'}} src={patreonLogo}/>
                      </a>
                    </div>
                </li>
                <li style={{
                  marginTop: '1.2rem'
                }} className='navLabels'>
                  <h3 color='white'>Node Tools</h3>
                </li>
                {NodeData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <NavLink to={item.path}>
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                })}
                <li className='navLabels'>
                  <h3 color='white'>Liquidity Pools</h3>
                </li>
                {LPData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <NavLink to={item.path}>
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                })}
                <li className='navLabels'>
                  <h3 color='white'>NFT's</h3>
                </li>
                {NFTData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <NavLink to={item.path}>
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                })}
                
              </ul>
                <div className='coingecko'>
                  <h3>Powered by</h3>
                  <a href='https://www.coingecko.com' target='_blank' rel='noopener noreferrer'>
                  <img src={CoinGecko} width='50px' alt="coingecko-logo" /></a>
                </div>
            </nav>
          </IconContext.Provider>
        </>
      );
    }
    
export default Navbar;
import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { NodeData, LPData, NFTData } from './SidebarData';
import { IconContext } from 'react-icons';
import { Hr } from '../sharedComponents/styledComponents'
import CoinGecko from '../Assets/images/CoinGecko.png'
import twitterLogo from '../Assets/images/twittericon.png'
import discordLogo from '../Assets/images/discordicon.png'

function Navbar() {
    
    return (
        <>
          <IconContext.Provider value={{ color: 'fff' }}>
            <nav className='nav-menu active nav-menu'>
              <ul className='nav-menu-items' >
                <li>
                    <div className='aboutme'>
                      <img className='iconbutton' src={discordLogo} />
                      <img className='iconbutton' src={twitterLogo}/>
                  
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
                  <img src={CoinGecko} width='50px' alt="coingecko-logo" />
                </div>
            </nav>
            
            
          </IconContext.Provider>
        </>
      );
    }
    
export default Navbar;
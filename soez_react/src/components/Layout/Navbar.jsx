import React, {useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import {SidebarData} from "./SidebarData";
import './Navbar.css';
import {IconContext} from "react-icons";

const StyledDiv = styled.div`
  background-color: black;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const StyledLink = styled(Link)``;

const StyledNav = styled.nav``;

const StyledUl = styled.ul``;

const StyledLi = styled.li``;

const StyledSpan = styled.span``;

const Navbar = () => {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    /*

    return(
        <>
            <StyledDiv>
                <StyledLink to={"#"}>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </StyledLink>
            </StyledDiv>
            <StyledNav>
                <StyledUl>
                    <StyledLi>
                        <StyledLink to={"#"}>
                            <AiIcons.AiOutlineClose/>
                        </StyledLink>
                    </StyledLi>
                    {SidebarData.map((item, index) => {
                        return(
                            <StyledLi>
                                <StyledLink to={item.path}>
                                    {item.icon}
                                    <StyledSpan>{item.title}</StyledSpan>
                                </StyledLink>
                            </StyledLi>
                        )
                    })}
                </StyledUl>
            </StyledNav>
        </>
    )

     */

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} style={{color: 'black'}}/>
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );

}

export default Navbar;

//https://www.youtube.com/watch?v=CXa0f4-dWi4 23:01
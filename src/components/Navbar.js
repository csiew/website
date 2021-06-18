import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';
import profile from '../assets/img/profile.jpg';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter';

function NavMenu(props) {
  const navMenuRef = useRef(null);
  useOutsideAlerter(navMenuRef, props.closeNavMenu);

  if (!props.isNavMenuOpen) {
    return null;
  }

  return (
    <div ref={navMenuRef} className="menu-dropdown">
      <div className="list-selectable">
        <NavLink onClick={props.closeNavMenu} activeClassName="active" to="/" title="Home" exact={true}>Home</NavLink>
        <NavLink onClick={props.closeNavMenu} activeClassName="active" to="/blog" title="Blog">Blog</NavLink>
        <NavLink onClick={props.closeNavMenu} activeClassName="active" to="/projects" title="Projects">Projects</NavLink>
        <NavLink onClick={props.closeNavMenu} activeClassName="active" to="/playlists" title="Playlists">Playlists</NavLink>
        <a onClick={props.closeNavMenu} href="https://csiew-portfolio.netlify.app/" target="_blank" rel="noreferrer" title="Portfolio">Portfolio</a>
      </div>
    </div>
  );
}

function Navbar(props) {
  const iconSize = "1.75rem";
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const scrollToTop = (e) => {
    e.preventDefault();
    document.querySelector('main').scrollTo(0, 0);
  }

  const toggleNavMenu = () => {
    const prevState = isNavMenuOpen;
    setIsNavMenuOpen(!prevState);
  }

  const closeNavMenu = () => {
    setIsNavMenuOpen(false);
  }

  return (
    <div className="z-index-200 width-full position-sticky anchor-top">
      <header className={props.className ? props.className : null}>
        <NavLink onClick={closeNavMenu} to="/" className="title">
          <img
            src={profile}
            className="nodrag noselect margin-xs-right"
            alt="profile"
            onContextMenu={scrollToTop}
          />
          <h1>Clarence Siew</h1>
        </NavLink>
        <div className="width-auto grid grid-auto-flow-column grid-gap-s align-center">
          <div className="tab-bar">
            <NavLink to="/" title="Home" exact={true}>Home</NavLink>
            <NavLink to="/blog" title="Blog">Blog</NavLink>
            <NavLink to="/projects" title="Projects">Projects</NavLink>
            <NavLink to="/playlists" title="Playlists">Playlists</NavLink>
            <a href="https://csiew-portfolio.netlify.app/" target="_blank" rel="noreferrer" title="Portfolio">Portfolio</a>
          </div>
          {
            isNavMenuOpen ?
              <button
                id="navMenuButton"
                className="button-selected border-radius-100pct padding-none hstack align-center justify-center"
                onClick={closeNavMenu}
                style={{
                  width: "2.5rem",
                  height: "2.5rem"
                }}
              >
                <MdArrowDropUp size={iconSize} />
              </button>
            :
              <button
                id="navMenuButton"
                className="border-radius-100pct padding-none hstack align-center justify-center"
                onClick={toggleNavMenu}
                style={{
                  width: "2.5rem",
                  height: "2.5rem"
                }}
              >
                <MdArrowDropDown size={iconSize} />
              </button>
          }
        </div>
      </header>
      <NavMenu isNavMenuOpen={isNavMenuOpen} closeNavMenu={closeNavMenu} />
    </div>
  );
}

export default Navbar;

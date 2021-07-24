import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter';

export default function NavMenu(props) {
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

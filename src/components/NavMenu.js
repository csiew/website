import { HStack, List, ListItem } from 'brioche';
import { useRef } from 'react';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter';

export default function NavMenu(props) {
  const navMenuRef = useRef(null);
  useOutsideAlerter(navMenuRef, props.closeNavMenu);

  return (
    <HStack
      forwardRef={navMenuRef}
      align="center"
      justify="center"
      fullWidth
      fullHeight
      className="z-index-1000 position-absolute bg-color-primary text-align-center font-scale-xl"
    >
      <List>
        <ListItem onClick={props.closeNavMenu} activeClassName="active" to="/" tooltip="Home" exact={true}>Home</ListItem>
        <ListItem onClick={props.closeNavMenu} activeClassName="active" to="/blog" tooltip="Blog">Blog</ListItem>
        <ListItem onClick={props.closeNavMenu} activeClassName="active" to="/projects" tooltip="Projects">Projects</ListItem>
        <ListItem onClick={props.closeNavMenu} activeClassName="active" to="/playlists" tooltip="Playlists">Playlists</ListItem>
        <ListItem onClick={props.closeNavMenu} href="https://csiew-portfolio.netlify.app/" openInNewTab tooltip="Portfolio">Portfolio</ListItem>
      </List>
    </HStack>
  );
}

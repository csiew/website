import { useEffect, useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { AppContainer, Navbar, TabBar, TabBarItem } from 'brioche';
import Footer from './components/Footer.js';
import Home from './views/Home.js';
import Blog from './views/Blog.js';
import Post from './views/Post.js';
import Projects from './views/Projects.js';
import Playlists from './views/Playlists.js';
import Changelog from './views/Changelog.js';
import BackToTop from './components/BackToTop.js';
import NotFound from './views/NotFound.js';
import profile from './assets/img/profile.jpg';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import NavMenu from './components/NavMenu.js';

function App() {
  const iconSize = "1.75rem";
  const [isAwayFromTop, setIsAwayFromTop] = useState(true);
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

  const detectAwayFromTop = () => {
    const main = document.querySelector("main");
    setIsAwayFromTop(main.scrollTop > main.getBoundingClientRect().top);
  }

  useEffect(() => {
    document.title = "Clarence Siew";
    detectAwayFromTop();
  });

  return (
    <AppContainer styleOverride={{ fontSize: "1.0625rem" }}>
      <NavMenu isNavMenuOpen={isNavMenuOpen} closeNavMenu={closeNavMenu} />
      <main className="overflow-auto transition-enter-pop" onScroll={detectAwayFromTop}>
        <Navbar
          className="position-sticky anchor-top"
          left={
            <NavLink
              onClick={closeNavMenu}
              to="/"
              className="title hstack align-center"
              style={{ color: "black", textDecoration: "none" }}
            >
              <img
                src={profile}
                className="nodrag noselect margin-xs-right"
                alt="profile"
                onContextMenu={scrollToTop}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "100%",
                }}
              />
              <h1>Clarence Siew</h1>
            </NavLink>
          }
          right={
            <>
              <TabBar>
                <TabBarItem to="/" title="Home" exact={true}>Home</TabBarItem>
                <TabBarItem to="/blog" title="Blog">Blog</TabBarItem>
                <TabBarItem to="/projects" title="Projects">Projects</TabBarItem>
                <TabBarItem to="/playlists" title="Playlists">Playlists</TabBarItem>
                <TabBarItem href="https://portfolio.clarencesiew.com/" openInNewTab>Portfolio</TabBarItem>
              </TabBar>
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
            </>
          }
        />
        <BackToTop isVisible={isAwayFromTop} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/blog" component={Blog} />
          <Route path="/post/:id" component={Post} />
          <Route path="/projects" component={Projects} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/changelog" component={Changelog} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </main>
    </AppContainer>
  );
}

export default App;

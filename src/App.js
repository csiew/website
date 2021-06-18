import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MdArrowUpward } from 'react-icons/md';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './views/Home.js';
import Blog from './views/Blog.js';
import Post from './views/Post.js';
import Projects from './views/Projects.js';
import Playlists from './views/Playlists.js';
import { scrollToTop } from './utils/Scroll.js';

function BackToTop(props) {
  return (
    <>
      {
        props.isVisible ?
          <div className="z-index-200 position-fixed padding-l anchor-bottom anchor-right transition-enter-up">
            <button
              className="button-primary border-radius-100pct padding-none"
              style={{
                width: "2.5rem",
                height: "2.5rem"
              }}
              onClick={scrollToTop}
            >
              <MdArrowUpward size="1.5rem" />
            </button>
          </div>
        :
          null
      }
    </>
  );
}

function App() {
  const [isAwayFromTop, setIsAwayFromTop] = useState(true);

  useEffect(() => {
    document.title = "Clarence Siew";
    detectAwayFromTop();
  });

  const detectAwayFromTop = () => {
    const main = document.querySelector('main');
    setIsAwayFromTop(main.scrollTop > main.getBoundingClientRect().top);
  }

  return (
    <div id="App" className="vstack width-full height-full overflow-hidden">
      <Navbar className="transition-enter-down" />
      <main className="overflow-y-auto transition-enter-pop" onScroll={detectAwayFromTop}>
        <BackToTop isVisible={isAwayFromTop} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/blog" component={Blog} />
          <Route path="/post/:id" component={Post} />
          <Route path="/projects" component={Projects} />
          <Route path="/playlists" component={Playlists} />
        </Switch>
        <Footer />
      </main>
    </div>
  );
}

export default App;

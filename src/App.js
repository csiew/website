import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './views/Home.js';
import Blog from './views/Blog.js';
import Post from './views/Post.js';
import Projects from './views/Projects.js';
import Playlists from './views/Playlists.js';
import Changelog from './views/Changelog.js';
import BackToTop from './components/BackToTop.js';
import NotFound from './views/NotFound.js';

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
      <Navbar />
      <main className="overflow-y-auto" onScroll={detectAwayFromTop}>
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
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import { PageLayout } from 'brioche';
import HelloWorld from '../components/HelloWorld.js';
import Skills from '../components/Skills.js';
import Places from '../components/Places.js';
import Links from '../components/Links.js';
import { scrollToTop } from '../utils/Scroll.js';

function Home() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <PageLayout
      className="width-max-1280"
      sidebarClassName="width-min-240"
      main={(
        <>
          <HelloWorld />
          <Skills />
        </>
      )}
      sidebar={(
        <>
          <Places />
          <Links />
        </>
      )}
    />
  );
}

export default Home;

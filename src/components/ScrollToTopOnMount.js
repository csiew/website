import { useEffect } from 'react';

function ScrollToTopOnMount() {
  useEffect(() => {
    document.querySelector('body').scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTopOnMount;

import { MdArrowUpward } from 'react-icons/md';
import { scrollToTop } from '../utils/Scroll.js';

function BackToTop(props) {
  return (
    <>
      {
        props.isVisible ?
          <div className="z-index-200 position-fixed margin-l anchor-bottom anchor-right transition-enter-pop-bounce" title="Back to top">
            <button
              className="button-primary border-radius-100pct padding-none scale-strong"
              style={{
                width: "2.5rem",
                height: "2.5rem"
              }}
              onClick={() => scrollToTop(true)}
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

export default BackToTop;

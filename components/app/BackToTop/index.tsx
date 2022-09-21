import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";
import config from "../../../config";
import { scrollPageToTop } from "../../../lib/scroll";
import Button from "../../ui/Button";
import { ButtonVariant } from "../../ui/Button/@types";

const BackToTop = () => {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  const handleScrollEvent = () => {
    const rootEl = document.getElementById(config.rootElementId);
    setIsAtTop(rootEl?.scrollTop === 0);
  };

  useEffect(() => {
    const rootEl = document.getElementById(config.rootElementId);
    rootEl?.addEventListener("scroll", handleScrollEvent);
  }, []);

  if (isAtTop) return <></>;
  return (
    <div className="backToTopFloat">
      <Button variant={ButtonVariant.PLAIN} callback={scrollPageToTop} alt="Back to top">
        <MdArrowUpward />
      </Button>
    </div>
  );
};

export default BackToTop;

import { ReactElement } from "react";

type NavigationViewProps = {
  nav?: string | ReactElement | ReactElement[];
  content?: string | ReactElement | ReactElement[];
};

const NavigationView = ({ nav, content }: NavigationViewProps) => {
  return (
    <div className="navigation-view">
      {
        nav ?
          <div className="navigation-view-nav">
            {nav}
          </div>
          :
          <></>
      }
      <div className="navigation-view-content">
        {content}
      </div>
    </div>
  );
};

export default NavigationView;

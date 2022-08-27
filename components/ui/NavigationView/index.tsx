import React, { ReactElement } from "react";

type NavigationViewProps = {
  nav?: string | ReactElement | ReactElement[];
  content?: string | ReactElement | ReactElement[];
};

const NavigationView = ({ nav, content }: NavigationViewProps) => {
  return (
    <div className="navigationView">
      {
        nav ?
          <div className="navigationViewNav">
            {nav}
          </div>
          :
          <></>
      }
      <div className="navigationViewContent">
        {content}
      </div>
    </div>
  );
};

export default NavigationView;

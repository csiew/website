import { useEffect, useRef, useState } from 'react';
import { scrollFocus, scrollToTop } from '../utils/Scroll.js';
import ReactMarkdown from 'react-markdown';
import { MdClose } from 'react-icons/md';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter.js';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardTitle, CardBody } from '../components/Card.js';
import projects from '../assets/data/projects.json';

function ProjectCard(props) {
  const getProjectImg = (imgUrl) => {
    if (imgUrl.length > 0) {
      return (
        <img
          src={`/assets/img/projects/${imgUrl}`}
          alt="Project"
          className="project-img cursor-pointer nodrag noselect"
          width="100%"
          onClick={props.viewImg}
        />
      );
    } else {
      return null;
    }
  }
  
  return (
    <Card id={props.project.id}>
      <CardTitle className="flex-inline flex-flow-row-wrap">
        <div className="flex-inline flex-flow-column align-start justify-center">
          <h4 className="font-scale-xxl">{props.project.name}</h4>
          <span className="subtitle">{props.project.timeRange}</span>
        </div>
        <div className="grid grid-col-2 grid-gap-s">
          <a href={props.project.github} rel="noreferrer" target="_blank" className={ "button" + (props.project.github.length === 0 ? ' disabled' : '') } disabled={props.project.github.length === 0}>Repository</a>
          <a href={props.project.url} rel="noreferrer" target="_blank" className={ "button" + (props.project.url.length === 0 ? ' disabled' : '') } disabled={props.project.url.length === 0}>Website</a>
        </div>
      </CardTitle>
      <CardBody className="grid grid-col-1 grid-gap-xl">
        { getProjectImg(props.project.imgUrl) }
        <div>
          <ReactMarkdown>
            {props.project.description}
          </ReactMarkdown>
        </div>
      </CardBody>
    </Card>
  );
}

function ProjectImageModalView(props) {
  const imgViewRef = useRef(null);
  useOutsideAlerter(imgViewRef, () => props.toggleImgView(false));

  return (
    <div
      className="modal-container padding-xl vstack align-center justify-center transition-enter-fade"
      style={{
        height: `${document.querySelector('main').getBoundingClientRect().height}px`,
        top: `${document.querySelector('header').getBoundingClientRect().height}px`
      }}
    >
      <div ref={imgViewRef} className="card width-auto transition-enter-pop">
        <CardTitle className="padding-xs hstack align-center justify-end">
          <button
            onClick={() => props.toggleImgView(false)}
            className="padding-none border-radius-100pct"
            style={{
              width: "1.75rem",
              height: "1.75rem"
            }}
          >
            <MdClose size="1.25rem" />
          </button>
        </CardTitle>
        <CardBody className="padding-xs padding-none-top">
          <img
            src={`/assets/img/projects/${props.imgUrl}`}
            alt="Project"
            className="project-img nodrag noselect"
            width="100%"
            height="100%"
            style={{
              width: "auto",
              height: "auto",
              maxHeight: `${document.querySelector('main').getBoundingClientRect().height * 0.75}px`
            }}
          />
        </CardBody>
      </div>
    </div>
  );
}

function Projects() {
  const [isImgViewVisible, setIsImgViewVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  const toggleImgView = (newState=false, url=null) => {
    setIsImgViewVisible(newState);
    setImgUrl(url);
  }

  return (
    <DynamicPageView
      title="Projects"
      className="width-max-1280"
      sidebarClassName="width-min-240 position-sticky anchor-top"
      main={(
        <div className="width-full margin-auto grid grid-col-1 grid-gap-xl">
          {
            projects["projects"].map(item => {
              return (
                <ProjectCard
                  key={item.id}
                  project={item}
                  viewImg={() => toggleImgView(true, item.imgUrl)}
                />
              );
            })
          }
        </div>
      )}
      sidebar={(
        <>
          <Card className="position-sticky anchor-top">
            <CardTitle>
              <h3>All projects</h3>
            </CardTitle>
            <CardBody className="padding-none-left padding-none-right padding-none-top padding-s-bottom">
              <div className="list-selectable">
                {
                  projects["projects"].map(item => {
                    return (
                      <div
                        key={item.id}
                        className="item flex-inline flex-flow-row-wrap align-center justify-space-between"
                        onClick={() => scrollFocus(item.id)}
                      >
                        <span className="width-auto">{item.name}</span>
                        <span className="width-auto font-scale-xs text-color-secondary">{item.timeRange}</span>
                      </div>
                    );
                  })
                }
              </div>
            </CardBody>
          </Card>
        </>
      )}
    >
      {
        isImgViewVisible ?
          <ProjectImageModalView
            toggleImgView={toggleImgView}
            imgUrl={imgUrl}
          />
        :
          ''
      }
    </DynamicPageView>
  );
}

export default Projects;

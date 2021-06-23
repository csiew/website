import { useEffect, useRef, useState } from 'react';
import { scrollFocus, scrollToTop } from '../utils/Scroll.js';
import ReactMarkdown from 'react-markdown';
import { MdClose } from 'react-icons/md';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter.js';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardTitle, CardBody, CardToggleButton } from '../components/Card.js';
import projects from '../assets/data/projects.json';

function ProjectCard(props) {

  const getProjectImg = (imgUrl) => {
    if (imgUrl.length > 0) {
      return (
        <img
          src={`/assets/img/projects/${imgUrl}`}
          alt="Project"
          className="bordered-img cursor-pointer transition active-scale-down-subtle nodrag noselect"
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
          <sub>{props.project.timeRange}</sub>
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

function ImagePopoutModal(props) {
  const toolbarRef = useRef(null);
  const imgViewRef = useRef(null);
  useOutsideAlerter(toolbarRef, () => props.toggle(false));
  useOutsideAlerter(imgViewRef, () => props.toggle(false));

  return (
    <div
      className="modal-container vstack align-stretch justify-stretch transition-enter-fade"
      style={{
        height: `${document.querySelector('main').getBoundingClientRect().height}px`,
        top: `${document.querySelector('header').getBoundingClientRect().height}px`
      }}
    >
      <div className="padding-xl vstack align-center justify-center">
        <div ref={imgViewRef} className="card width-auto transition-enter-pop">
          <CardTitle className="hstack align-center justify-space-between padding-s padding-xs-top padding-xs-bottom">
            <h3>{props.alt}</h3>
            <button
              onClick={() => props.toggle(false)}
              className="padding-none border-radius-100pct"
              style={{
                width: "1.75rem",
                height: "1.75rem"
              }}
            >
              <MdClose size="1.25rem" />
            </button>
          </CardTitle>
          <CardBody className="padding-xs">
            <img
              src={props.src}
              alt={props.alt ? props.alt : 'No alt text provided'}
              className="bordered-img nodrag noselect"
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
    </div>
  );
}

function Projects() {
  const [isImagePopoutModalVisible, setIsImagePopoutModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgAltText, setImgAltText] = useState(null);
  const [isProjectListVisible, setIsProjectListVisible] = useState(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  const toggleImagePopoutModal = (newState=false, url=null, altText=null) => {
    setImgUrl(url);
    setImgAltText(altText);
    setIsImagePopoutModalVisible(newState);
  }

  const toggleProjectList = () => {
    setIsProjectListVisible(!isProjectListVisible);
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
                  viewImg={() => toggleImagePopoutModal(true, `/assets/img/projects/${item.imgUrl}`, item.name)}
                />
              );
            })
          }
        </div>
      )}
      sidebar={(
        <>
          <Card>
            <CardTitle className={isProjectListVisible ? '' : 'card-border-radius'}>
              <h3>All projects</h3>
              <CardToggleButton cardName="Project List" isVisible={isProjectListVisible} toggle={toggleProjectList} />
            </CardTitle>
            {
              isProjectListVisible ?
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
              :
                ''
            }
          </Card>
        </>
      )}
    >
      {
        isImagePopoutModalVisible ?
          <ImagePopoutModal
            toggle={toggleImagePopoutModal}
            src={imgUrl}
            alt={imgAltText}
          />
        :
          ''
      }
    </DynamicPageView>
  );
}

export default Projects;

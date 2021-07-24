import { useEffect, useRef, useState } from 'react';
import { scrollFocus, scrollToTop } from '../utils/Scroll.js';
import ReactMarkdown from 'react-markdown';
import { MdClose } from 'react-icons/md';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter.js';
import { Card, CardTitle, CardBody, PageLayout, List, ListItem, Button } from 'brioche';
import projects from '../assets/data/projects.json';

function ProjectCard(props) {
  const getProjectImg = (imgUrl) => {
    if (imgUrl.length > 0) {
      return (
        <img
          src={`/assets/img/projects/${imgUrl}`}
          alt="Project"
          className="bordered-img cursor-pointer nodrag noselect"
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
          <Button
            href={props.project.github}
            openInNewTab
            disabled={props.project.github.length === 0}
            label="Repository"
          />
          <Button
            href={props.project.url}
            openInNewTab
            disabled={props.project.url.length === 0}
            label="Website"
          />
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
  const imgViewRef = useRef(null);
  useOutsideAlerter(imgViewRef, () => props.toggle(false));

  return (
    <div
      className="modal-container padding-xl vstack align-center justify-center transition-enter-fade"
      style={{
        height: `${document.querySelector('main').getBoundingClientRect().height}px`,
        top: `${document.querySelector('header').getBoundingClientRect().height}px`
      }}
    >
      <div ref={imgViewRef} className="card width-auto transition-enter-pop">
        <CardTitle className="padding-xs hstack align-center justify-space-between">
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
        <CardBody className="padding-xs padding-none-top">
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
  );
}

function Projects() {
  const [isImagePopoutModalVisible, setIsImagePopoutModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgAltText, setImgAltText] = useState(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  const toggleImagePopoutModal = (newState=false, url=null, altText=null) => {
    setImgUrl(url);
    setImgAltText(altText);
    setIsImagePopoutModalVisible(newState);
  }

  return (
    <PageLayout
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
          <Card
            isCollapsedValue="Show"
            isNotCollapsedValue="Hide"
            isCollapsible
          >
            <CardTitle>
              <h3>All projects</h3>
            </CardTitle>
            <CardBody className="padding-none">
              <List>
                {
                  projects["projects"].map(item => {
                    return (
                      <ListItem
                        key={item.id}
                        className="flex-inline flex-flow-row-wrap align-center justify-space-between"
                        onClick={() => scrollFocus(item.id)}
                      >
                        <span className="width-auto">{item.name}</span>
                        <span className="width-auto font-scale-xs text-color-secondary">{item.timeRange}</span>
                      </ListItem>
                    );
                  })
                }
              </List>
            </CardBody>
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
    </PageLayout>
  );
}

export default Projects;

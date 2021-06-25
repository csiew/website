import { useEffect, useRef, useState } from 'react';
import { scrollFocus, scrollToTop } from '../utils/Scroll.js';
import ReactMarkdown from 'react-markdown';
import { MdCheck, MdClose } from 'react-icons/md';
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

  const getStatusTagStyleClass = (statusCode) => {
    switch (statusCode) {
      case 2:
        return "status-tag-active";
      case 1:
        return "status-tag-hiatus";
      case 0:
        return "status-tag-discontinued";
      default:
        return "";
    }
  }
  
  return (
    <Card id={props.project.id}>
      <CardTitle className="flex-inline flex-flow-row-wrap">
        <div className="flex-inline flex-flow-column align-start justify-center">
          <h4 className="font-scale-xxl">{props.project.name}</h4>
          <div className="grid grid-auto-flow-column grid-gap-s align-center">
            <span className={`status-tag ${getStatusTagStyleClass(props.project.status)}`}>{projects["projectStatus"][props.project.status]}</span>
            <sub>{props.project.timeRange}</sub>
          </div>
        </div>
        <div className="grid grid-col-2 grid-gap-s">
          <a href={props.project.github} rel="noreferrer" target="_blank" className={ "button" + (props.project.github.length === 0 ? ' disabled' : '') } disabled={props.project.github.length === 0}>Repository</a>
          <a href={props.project.url} rel="noreferrer" target="_blank" className={ "button" + (props.project.url.length === 0 ? ' disabled' : '') } disabled={props.project.url.length === 0}>Website</a>
        </div>
      </CardTitle>
      <CardBody className="grid grid-col-1 grid-gap-xl">
        { getProjectImg(props.project.imgUrl) }
        {
          Object.keys(props.project).includes("note") ?
            <Card className="note">
              <CardBody>
                <ReactMarkdown>
                  {props.project.note}
                </ReactMarkdown>
              </CardBody>
            </Card>
          :
            ""
        }
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

function ProjectsList(props) {
  const [isProjectListVisible, setIsProjectListVisible] = useState(true);

  const toggleProjectList = () => {
    setIsProjectListVisible(!isProjectListVisible);
  }

  return (
    <Card>
      <CardTitle className={isProjectListVisible ? '' : 'card-border-radius hug-bottom'}>
        <h3>All projects</h3>
        <CardToggleButton cardName="Project List" isVisible={isProjectListVisible} toggle={toggleProjectList} />
      </CardTitle>
      {
        isProjectListVisible ?
          <CardBody className="padding-none">
          <div className="list-selectable">
            {
              props.projects.map(item => {
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
  );
}

function ProjectsFilter(props) {
  const [isProjectsFilterVisible, setIsProjectsFilterVisible] = useState(true);

  const toggleProjectsFilter = () => {
    setIsProjectsFilterVisible(!isProjectsFilterVisible);
  }

  const generateCheckmark = (enable=false) => {
    if (enable) return <MdCheck size="1.5rem" className="transition-enter-pop-bounce" />
  }

  return (
    <Card>
      <CardTitle className={isProjectsFilterVisible ? '' : 'card-border-radius hug-bottom'}>
        <h3>Filter by status</h3>
        <div className="width-auto hstack align-center justify-end">
          <sub hidden={isProjectsFilterVisible} className="margin-xs-right transition-enter-right">{props.projectStatus[props.selectedStatus] ? props.projectStatus[props.selectedStatus] : "All"}</sub>
          <CardToggleButton cardName="Project List" isVisible={isProjectsFilterVisible} toggle={toggleProjectsFilter} />
        </div>
      </CardTitle>
      {
        isProjectsFilterVisible ?
          <CardBody className="padding-none">
          <div className="list-selectable">
            <div
              className={`item flex-inline flex-flow-row align-center justify-space-between ${props.selectedStatus === -1 ? 'active' : ''}`}
              onClick={() => props.handleSelectStatus(-1)}
            >
              <span className="width-auto">All</span>
              {generateCheckmark(props.selectedStatus === -1)}
            </div>
            {
              Object.entries(props.projectStatus).reverse().map(item => {
                return (
                  <div
                    key={Number(item[0])}
                    className={`item flex-inline flex-flow-row align-center justify-space-between ${props.selectedStatus === Number(item[0]) ? 'active' : ''}`}
                    onClick={() => props.handleSelectStatus(Number(item[0]))}
                  >
                    <span className="width-auto">{item[1]}</span>
                    {generateCheckmark(props.selectedStatus === Number(item[0]))}
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
  );
}

function Projects() {
  const [isImagePopoutModalVisible, setIsImagePopoutModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgAltText, setImgAltText] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(-1);

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  }

  const toggleImagePopoutModal = (newState=false, url=null, altText=null) => {
    setImgUrl(url);
    setImgAltText(altText);
    setIsImagePopoutModalVisible(newState);
  }

  const filterBySelectedStatus = () => {
    let filterResults = [];
    switch (selectedStatus) {
      case 2:
        filterResults = projects["projects"].filter(item => item.status === 2);
        break;
      case 1:
        filterResults = projects["projects"].filter(item => item.status === 1);
        break;
      case 0:
        filterResults = projects["projects"].filter(item => item.status === 0);
        break;
      default:
        filterResults = projects["projects"];
    }
    return filterResults;
  }

  const generateProjectsContent = () => {
    if (selectedStatus !== -1) {
      let filterResults = filterBySelectedStatus();
      if (filterResults.length === 0) {
        return (
          <Card className="note">
            <CardBody className="width-full height-full padding-xxl hstack align-center justify-center">
              <span>No projects matching filter criteria found.</span>
            </CardBody>
          </Card>
        );
      }
      return filterResults.map(item => {
        return (
          <ProjectCard
            key={item.id}
            project={item}
            viewImg={() => toggleImagePopoutModal(true, `/assets/img/projects/${item.imgUrl}`, item.name)}
          />
        );
      });
    }

    return projects["projects"].map(item => {
      return (
        <ProjectCard
          key={item.id}
          project={item}
          viewImg={() => toggleImagePopoutModal(true, `/assets/img/projects/${item.imgUrl}`, item.name)}
        />
      );
    });
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <DynamicPageView
      title="Projects"
      className="width-max-1280"
      sidebarClassName="width-min-240 position-sticky anchor-top"
      main={(
        <div className="width-full margin-auto grid grid-col-1 grid-gap-xl">
          {generateProjectsContent()}
        </div>
      )}
      sidebar={(
        <>
          <ProjectsFilter projectStatus={projects["projectStatus"]} selectedStatus={selectedStatus} handleSelectStatus={handleSelectStatus} />
          <ProjectsList projects={projects["projects"]} />
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

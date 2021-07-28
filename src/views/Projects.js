import {  useEffect, useRef, useState } from 'react';
import { scrollFocus, scrollToTop } from '../utils/Scroll.js';
import ReactMarkdown from 'react-markdown';
import { MdArrowDropDown, MdArrowDropUp, MdCheck, MdClose } from 'react-icons/md';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter.js';
import { Card, CardTitle, CardBody, PageHeader, PageLayout, List, ListItem, Button } from 'brioche';
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
      className="modal-container position-fixed anchor-bottom vstack height-full align-center justify-center transition-enter-fade"
      style={{ height: `${document.querySelector('main').getBoundingClientRect().height}px` }}
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

function ProjectsList() {
  return (
    <Card
      isCollapsible
      collapseButtonClassName="border-radius-100pct padding-none"
      collapseButtonStyle={{
        width: "2.5rem",
        height: "2.5rem",
      }}
      isCollapsedValue={<MdArrowDropDown size="1.5rem" />}
      isNotCollapsedValue={<MdArrowDropUp size="1.5rem" />}
      title="All projects"
      bodyClassName="padding-none"
      body={
        <List>
          {
            projects["projects"].map(item => {
              return (
                <ListItem
                  key={item.id}
                  className="flex-inline flex-flow-row-wrap align-center justify-space-between cursor-pointer"
                  onClick={() => scrollFocus(item.id)}
                >
                  <span className="width-auto">{item.name}</span>
                  <span className="width-auto font-scale-xs text-color-secondary">{item.timeRange}</span>
                </ListItem>
              );
            })
          }
        </List>
      }
    />
  );
}

function ProjectsFilter(props) {
  const generateCheckmark = (enable=false) => {
    if (enable) return <MdCheck size="1.5rem" className="transition-enter-pop-bounce" />
  }

  return (
    <Card
      isCollapsible
      collapseButtonClassName="border-radius-100pct padding-none"
      collapseButtonStyle={{
        width: "2.5rem",
        height: "2.5rem",
      }}
      isCollapsedValue={<MdArrowDropDown size="1.5rem" />}
      isNotCollapsedValue={<MdArrowDropUp size="1.5rem" />}
      title="Filter by status"
      bodyClassName="padding-none"
      body={
        <List>
          <ListItem
            className="flex-inline flex-flow-row align-center justify-space-between cursor-pointer"
            selected={props.selectedStatus === -1}
            onClick={() => {
              props.handleSelectStatus(-1);
              scrollToTop();
            }}
          >
            <span className="width-auto">All</span>
            {generateCheckmark(props.selectedStatus === -1)}
          </ListItem>
          {
            Object.entries(props.projectStatus).reverse().map(item => {
              return (
                <ListItem
                  key={Number(item[0])}
                  className="item flex-inline flex-flow-row align-center justify-space-between cursor-pointer"
                  selected={props.selectedStatus === Number(item[0])}
                  onClick={() => {
                    props.handleSelectStatus(Number(item[0]));
                    scrollToTop();
                  }}
                >
                  <span className="width-auto">{item[1]}</span>
                  {generateCheckmark(props.selectedStatus === Number(item[0]))}
                </ListItem>
              );
            })
          }
        </List>
      }
    />
  );
}

function Projects() {
  const [imgUrl, setImgUrl] = useState(null);
  const [imgAltText, setImgAltText] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(-1);

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  }

  const toggleImagePopoutModal = (url=null, altText=null) => {
    setImgUrl(url);
    setImgAltText(altText);
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
            viewImg={() => toggleImagePopoutModal(`/assets/img/projects/${item.imgUrl}`, item.name)}
          />
        );
      });
    }

    return projects["projects"].map(item => {
      return (
        <ProjectCard
          key={item.id}
          project={item}
          viewImg={() => toggleImagePopoutModal(`/assets/img/projects/${item.imgUrl}`, item.name)}
        />
      );
    });
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      {
        imgUrl ?
          <ImagePopoutModal
            toggle={toggleImagePopoutModal}
            src={imgUrl}
            alt={imgAltText}
          />
        :
          ''
      }
      <PageLayout
        className="width-max-1280"
        sidebarClassName="width-min-240 position-sticky anchor-top"
        header={
          <PageHeader title="Projects" />
        }
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
      />
    </>
  );
}

export default Projects;

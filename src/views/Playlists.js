import { useEffect, useState } from 'react';
import { generateId } from '../utils/Strings.js';
import { scrollFocus, scrollToTop } from '../utils/Scroll.js';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardTitle, CardBody } from '../components/Card.js';
import playlists from '../assets/data/playlists.json';

function PlaylistGroupCard(props) {
  const sectionId = generateId(props.subcollection.title);

  useEffect(() => {
    if (props.currentSection === sectionId) {
      scrollFocus(sectionId);
    }
  });

  const standardPlaylists = (playlists) => {
    if (playlists.length > 0) {
      return (
        <div className="grid grid-col-3 grid-col-responsive grid-gap-s">
          {
            playlists.map(playlist => {
              return (
                <a href={playlist["url"]} target="_blank" className="button" rel="noreferrer" key={playlist["name"].toLowerCase().replace(' ','')}>{playlist["name"]}</a>
              );
            })
          }
        </div>
      );
    } else {
      return null;
    }
  }

  const specialPlaylists = (playlists) => {
    if (playlists.length > 0) {
      return (
        <div className="grid grid-col-3 grid-col-responsive grid-gap-s">
          {
            playlists.map(playlist => {
              return (
                <a href={playlist["url"]} target="_blank" className="button" rel="noreferrer" key={playlist["name"].toLowerCase().replace(' ','')}>{playlist["name"]}</a>
              );
            })
          }
        </div>
      );
    } else {
      return null;
    }
  }
  
  return (
    <Card id={sectionId}>
      <CardTitle>
        <h3>{props.subcollection["title"]}</h3>
      </CardTitle>
      <CardBody className="grid grid-col-1 grid-gap-xl">
        { standardPlaylists(props.subcollection["playlists"]["standard"]) }
        { specialPlaylists(props.subcollection["playlists"]["special"]) }
      </CardBody>
    </Card>
  );
}

function Playlists() {
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <DynamicPageView
      title="Playlists"
      className="width-max-1280"
      sidebarClassName="width-min-240 position-sticky anchor-top"
      main={(
        <div className="width-full grid grid-col-1 grid-gap-xl">
          {
            playlists["collection"].map(item => {
              return (
                <PlaylistGroupCard
                  key={generateId(item.title)}
                  subcollection={item}
                  currentSection={currentSection}
                />
              );
            })
          }
        </div>
      )}
      sidebar={(
        <Card className="position-sticky anchor-top">
          <CardBody className="padding-none-left padding-none-right padding-s-top padding-s-bottom">
            <div className="list-selectable">
              {
                playlists["collection"].map(item => {
                  return (
                    <span
                      key={generateId(item.title)}
                      className="item"
                      onClick={() => setCurrentSection(generateId(item.title))}
                    >
                      {item.title}
                    </span>
                  );
                })
              }
            </div>
          </CardBody>
        </Card>
      )}
    />
  );
}

export default Playlists;

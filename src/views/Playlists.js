import { useEffect, useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import playlists from '../assets/data/playlists.json';
import { generateId } from '../utils/Strings.js';
import { scrollFocus, scrollToTop } from '../utils/Scroll.js';
import { Card, CardTitle, CardBody, List, ListItem, PageLayout, PageHeader } from 'brioche';

function PlaylistGroupCard(props) {
  const sectionId = generateId(props.subcollection.title);

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
  const [loadFeaturedPlaylist, setLoadFeaturedPlaylist] = useState(false);

  const toggleFeaturedPlaylist = () => {
    setLoadFeaturedPlaylist(!loadFeaturedPlaylist);
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <PageLayout
      className="width-max-1280"
      sidebarClassName="width-min-240 position-sticky anchor-top"
      header={
        <PageHeader title="Playlists" />
      }
      main={(
        <div className="width-full grid grid-col-1 grid-gap-xl">
          {
            playlists["collection"].map((item, index) => {
              return (
                <PlaylistGroupCard
                  key={index}
                  subcollection={item}
                />
              );
            })
          }
        </div>
      )}
      sidebar={(
        <>
          <Card
            isCollapsible
            collapseButtonClassName="border-radius-100pct padding-none"
            collapseButtonStyle={{
              width: "2.5rem",
              height: "2.5rem",
            }}
            isCollapsedValue={<MdArrowDropDown size="1.5rem" />}
            isNotCollapsedValue={<MdArrowDropUp size="1.5rem" />}
            title="All playlists"
            bodyClassName="padding-none"
            body={
              <List>
                {
                  playlists["collection"].map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        className="cursor-pointer"
                        onClick={() => scrollFocus(generateId(item.title))}
                      >
                        {item.title}
                      </ListItem>
                    );
                  })
                }
              </List>
            }
          />
          <Card
            isCollapsible
            collapseButtonClassName="border-radius-100pct padding-none"
            collapseButtonStyle={{
              width: "2.5rem",
              height: "2.5rem",
            }}
            isCollapsedValue={<MdArrowDropDown size="1.5rem" />}
            isNotCollapsedValue={<MdArrowDropUp size="1.5rem" />}
            title="Winter 2021"
            body={
              loadFeaturedPlaylist ?
                <iframe title="Spotify" className="card-border-radius" src="https://open.spotify.com/embed/playlist/3GPJP97e46YnzDWjQcYfv9?theme=0" width="100%" height="380" frameBorder="0" allowtransparency="false" allow="encrypted-media"></iframe>
              :
                <div
                  className="width-full padding-xl vstack align-center justify-center card-border-radius nodrag noselect"
                  style={{
                    color: "lightgray",
                    background: "#333333"
                  }}>
                    <button title="Load featured playlist" onClick={toggleFeaturedPlaylist}>Load featured playlist</button>
                    <sub className="text-align-center margin-s-top">Loading a featured playlist will load a Spotify <code>iframe</code> within this card.</sub>
                </div>
            }
          />
        </>
      )}
    />
  );
}

export default Playlists;

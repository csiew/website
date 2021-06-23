import { useEffect, useState } from 'react';
import { generateId } from '../utils/Strings.js';
import { scrollFocus, scrollToTop } from '../utils/Scroll.js';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardTitle, CardBody, CardToggleButton } from '../components/Card.js';
import playlists from '../assets/data/playlists.json';

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
  const [isPlaylistListVisible, setIsPlaylistListVisible] = useState(true);
  const [isFeaturedPlaylistVisible, setIsFeaturedPlaylistVisible] = useState(true);
  const [loadFeaturedPlaylist, setLoadFeaturedPlaylist] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  const togglePlaylistList = () => {
    setIsPlaylistListVisible(!isPlaylistListVisible);
  }

  const toggleFeaturedPlaylist = () => {
    if (isFeaturedPlaylistVisible === true) {
      setLoadFeaturedPlaylist(false);
    }
    setIsFeaturedPlaylistVisible(!isFeaturedPlaylistVisible);
  }

  const toggleLoadFeaturedPlaylist = () => {
    setLoadFeaturedPlaylist(!loadFeaturedPlaylist);
  }

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
                />
              );
            })
          }
        </div>
      )}
      sidebar={(
        <>
          <Card>
            <CardTitle className={isPlaylistListVisible ? '' : 'card-border-radius'}>
              <h3>All playlists</h3>
              <CardToggleButton cardName="Playlist List" isVisible={isPlaylistListVisible} toggle={togglePlaylistList} />
            </CardTitle>
            {
              isPlaylistListVisible ?
                <CardBody className="padding-none">
                  <div className="list-selectable">
                    {
                      playlists["collection"].map(item => {
                        return (
                          <span
                            key={generateId(item.title)}
                            className="item"
                            onClick={() => scrollFocus(generateId(item.title))}
                          >
                            {item.title}
                          </span>
                        );
                      })
                    }
                  </div>
                </CardBody>
              :
                ''
            }
          </Card>
          <Card>
            <CardTitle className={isFeaturedPlaylistVisible ? '' : 'card-border-radius'}>
              <div className="grid grid-col-1">
                <h3>Winter 2021</h3>
                <sub className="text-color-secondary">Featured playlist</sub>
              </div>
              <CardToggleButton cardName="Featured Playlist" isVisible={isFeaturedPlaylistVisible} toggle={toggleFeaturedPlaylist} />
            </CardTitle>
            {
              isFeaturedPlaylistVisible ?
                <CardBody>
                  {
                    loadFeaturedPlaylist ?
                      <iframe title="Spotify" className="card-border-radius" src="https://open.spotify.com/embed/playlist/3GPJP97e46YnzDWjQcYfv9?theme=0" width="100%" height="380" frameBorder="0" allowtransparency="false" allow="encrypted-media"></iframe>
                    :
                      <div
                        className="width-full padding-xl vstack align-center justify-center card-border-radius nodrag noselect"
                        style={{
                          color: "lightgray",
                          background: "dimgray"
                        }}>
                          <button title="Load featured playlist" onClick={toggleLoadFeaturedPlaylist}>Load featured playlist</button>
                          <sub className="text-align-center margin-s-top">Loading a featured playlist will load a Spotify <code>iframe</code> within this card.</sub>
                      </div>
                  }
                </CardBody>
              :
                ''
            }
          </Card>
        </>
      )}
    />
  );
}

export default Playlists;

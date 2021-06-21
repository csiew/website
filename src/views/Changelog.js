import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardBody } from '../components/Card.js';
import { scrollToTop } from '../utils/Scroll.js';
import versionHistoryDoc from '../assets/data/version_history.md';
import githubApiRepository from '../repositories/githubApiRepository.js';

function ChangelogSummary(props) {
  return (
    <div className="padding-l padding-none-top grid grid-col-1">
      <ReactMarkdown children={props.summary} />
    </div>
  );
}

function ChangelogPullRequests(props) {
  return (
    <div className="list-selectable padding-s padding-none-top">
      {
        props.pullRequests.map(pullRequest => {
          return (
            <a
              key={pullRequest.id}
              href={pullRequest.html_url}
              target="_blank"
              rel="noreferrer"
              className="item"
            >
              <div className="grid grid-col-1">
                <h3>{pullRequest.title}</h3>
                <sub>{new Date(pullRequest.closed_at).toLocaleString()}</sub>
              </div>
            </a>
          )
        })
      }
    </div>
  );
}

function ChangelogContent(props) {
  switch (Number(props.selectedTab)) {
    case 1:
      return <ChangelogPullRequests pullRequests={props.pullRequests} />
    default:
    case 0:
      return <ChangelogSummary summary={props.summary} />
  }
}

function ChangelogTab(props) {
  return (
    <span
      className={`item text-align-center cursor-pointer noselect ${String(props.selectedTab) === props.tabIndex ? 'active' : ''}`}
      onClick={() => props.setSelectedTab(props.tabIndex)}
    >
      {props.title}
    </span>
  );
}

function Changelog() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [summary, setSummary] = useState(null);
  const [pullRequests, setPullRequests] = useState([]);

  const getSummary = () => {
    return fetch(versionHistoryDoc)
      .then((r) => r.text())
      .then(text  => {
        setSummary(text);
      })
      .catch(e => console.debug(e));
  }

  const getPullRequests = () => {
    return githubApiRepository.getClosedPullRequests()
      .then(result => {
        setPullRequests(result.data);
      })
      .catch(e => console.debug(e));
  }

  const handleSelectTab = (tabIndex=0) => {
    setSelectedTab(tabIndex);
    switch (tabIndex) {
      case 1:
        window.history.pushState("", "", "/changelog/pull_requests");
        break;
      default:
      case 0:
        window.history.pushState("", "", "/changelog/summary");
    }
  }

  useEffect(() => {
    scrollToTop();
    let path = window.location.pathname.split('/');
    if (path[1] === "changelog") {
      switch (path[2]) {
        case "pull_requests":
          setSelectedTab(1);
          break;
        default:
        case "summary":
          setSelectedTab(0);
      }
    }
    getSummary()
      .then(() => getPullRequests())
      .then(() => setIsLoading(false));
  }, []);

  return (
    <DynamicPageView
      title="Changelog"
      className="width-max-800"
      main={
        isLoading ?
          <div className="width-full height-full hstack align-center justify-center">
            <span className="font-scale-s text-color-secondary">Loading...</span>
          </div>
        :
          <div className="width-full grid grid-col-1 grid-gap-xl">
            <Card className="width-max-800 img-respect-bounds nodrag">
              <CardBody className="padding-none grid grid-col-1 grid-gap-m">
                <div
                  className="card-border-top-radius bg-color-acryllic position-sticky anchor-top margin-none-top padding-s"
                >
                  <div className="tab-bar width-auto">
                    <ChangelogTab tabIndex="0" selectedTab={selectedTab} setSelectedTab={handleSelectTab} title="Summary" />
                    <ChangelogTab tabIndex="1" selectedTab={selectedTab} setSelectedTab={handleSelectTab} title="Pull Requests" />
                  </div>
                </div>
                <ChangelogContent selectedTab={selectedTab} summary={summary} pullRequests={pullRequests} />
              </CardBody>
            </Card>
          </div>
      }
    />
  );
}

export default Changelog;

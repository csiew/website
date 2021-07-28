import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MdOpenInNew } from 'react-icons/md';
import { scrollToTop } from '../utils/Scroll.js';
import versionHistoryDoc from '../assets/data/version_history.md';
import githubApiRepository from '../repositories/GitHubApiRepository.js';
import { friendlyTimestamp } from '../utils/Timestamp.js';
import { Card, CardBody, HStack, List, ListItem, PageHeader, PageLayout, TabBar, TabBarItem } from 'brioche';

function ChangelogSummary(props) {
  return (
    <div className="padding-l padding-none-top grid grid-col-1">
      <ReactMarkdown children={props.summary} />
    </div>
  );
}

function ChangelogPullRequests(props) {
  return (
    <List>
      {
        props.pullRequests.map(pullRequest => {
          return (
            <ListItem
              key={pullRequest.id}
              href={pullRequest.html_url}
              openInNewTab
            >
              <HStack align="center" justify="space-between" className="width-full">
                <div className="grid grid-col-1">
                  <h3>{pullRequest.title}</h3>
                  <sub className="text-color-secondary">{friendlyTimestamp(pullRequest.closed_at)}</sub>
                </div>
                <MdOpenInNew
                  size="1.5rem"
                  className="text-color-secondary"
                />
              </HStack>
            </ListItem>
          )
        })
      }
    </List>
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

function ChangelogTabBarItem(props) {
  return (
    <TabBarItem
      title={props.title}
      className={String(props.selectedTab) === props.tabIndex ? 'active' : ''}
      onClick={() => props.setSelectedTab(props.tabIndex)}
    >
      {props.title}
    </TabBarItem>
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
    switch (Number(tabIndex)) {
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
    <PageLayout
      className="width-max-800"
      header={<PageHeader title="Changelog" />}
      main={
        isLoading ?
          <div className="width-full height-full hstack align-center justify-center">
            <span className="font-scale-s text-color-secondary">Loading...</span>
          </div>
        :
          <div className="width-full grid grid-col-1 grid-gap-xl">
            <Card className="width-max-800 img-respect-bounds nodrag">
              <CardBody className="padding-none grid grid-col-1 grid-gap-m">
                <Card
                  className="position-sticky anchor-top hug-bottom padding-xs"
                  body={
                    <TabBar className="width-auto">
                      <ChangelogTabBarItem tabIndex="0" selectedTab={selectedTab} setSelectedTab={handleSelectTab} title="Summary" />
                      <ChangelogTabBarItem tabIndex="1" selectedTab={selectedTab} setSelectedTab={handleSelectTab} title="Pull Requests" />
                    </TabBar>
                  }
                />
                <ChangelogContent selectedTab={selectedTab} summary={summary} pullRequests={pullRequests} />
              </CardBody>
            </Card>
          </div>
      }
    />
  );
}

export default Changelog;

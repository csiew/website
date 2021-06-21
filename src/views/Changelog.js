import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardBody, CardTitle } from '../components/Card.js';
import { scrollToTop } from '../utils/Scroll.js';
import versionHistoryDoc from '../assets/data/version_history.md';
import githubApiRepository from '../repositories/githubApiRepository.js';

function ChangelogSummary() {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch(versionHistoryDoc)
      .then((r) => r.text())
      .then(text  => {
        setContent(text);
        setIsLoading(false);
      })
      .catch(e => console.debug(e));
  }, []);

  if (isLoading) {
    return (
      <div className="hstack align-center justify-center">
        <span className="text-color-secondary">Loading summary...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-col-1">
      <ReactMarkdown children={content} />
    </div>
  );
}

function ChangelogPullRequests() {
  const [isLoading, setIsLoading] = useState(true);
  const [pullRequests, setPullRequests] = useState([]);

  useEffect(() => {
    githubApiRepository.getClosedPullRequests()
      .then(result => {
        console.log(result);
        setPullRequests(result.data);
        setIsLoading(false);
      })
      .catch(e => console.debug(e));
  }, []);

  if (isLoading) {
    return (
      <div className="hstack align-center justify-center">
        <span className="text-color-secondary">Loading pull requests...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-col-1 grid-gap-xl">
      {
        pullRequests.map(pullRequest => {
          return (
            <Card>
              <CardTitle className={`grid grid-col-1 ${pullRequest.body.length === 0 ? 'card-border-bottom-radius padding-s-bottom' : ''}`}>
                <h3>{pullRequest.title}</h3>
                <sub>{pullRequest.closed_at}</sub>
              </CardTitle>
              {
                pullRequest.body.length > 0 ?
                  <CardBody>
                    {pullRequest.body}
                  </CardBody>
                :
                  ''
              }
            </Card>
          )
        })
      }
    </div>
  );
}

function ChangelogTab(props) {
  return (
    <span
      className={`item text-align-center cursor-pointer noselect ${props.selectedTab === props.tabIndex ? 'active' : ''}`}
      onClick={props.setSelectedTab(props.tabIndex)}
    >
      {props.title}
    </span>
  );
}

function ChangelogContent() {
  const [selectedTab, setSelectedTab] = useState(0);

  const contentBody = () => {
    switch (selectedTab) {
      case 1:
        return <ChangelogPullRequests />
      default:
      case 0:
        return <ChangelogSummary />
    }
  }

  return (
    <Card className="width-max-800 img-respect-bounds nodrag">
      <CardBody className="grid grid-col-1 grid-gap-xl">
        <div className="tab-bar width-auto margin-s">
          <ChangelogTab tabIndex="0" selectedTab={selectedTab} setSelectedTab={setSelectedTab} title="Summary" />
          <ChangelogTab tabIndex="1" selectedTab={selectedTab} setSelectedTab={setSelectedTab} title="Pull Requests" />
        </div>
        { contentBody() }
      </CardBody>
    </Card>
  );
}

function Changelog() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <DynamicPageView
      title="Changelog"
      className="width-max-800"
      main={(
        <div className="width-full grid grid-col-1 grid-gap-xl">
          <ChangelogContent />
        </div>
      )}
    />
  );
}

export default Changelog;

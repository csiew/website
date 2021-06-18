import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardBody } from '../components/Card.js';
import { scrollToTop } from '../utils/Scroll.js';
import versionHistoryDoc from '../assets/data/version_history.md';

function ChangelogContent() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch(versionHistoryDoc)
      .then((r) => r.text())
      .then(text  => {
        setContent(text);
      })
      .catch(e => console.debug(e));
  }, []);

  return (
    <Card className="width-max-800 img-respect-bounds nodrag">
      <CardBody>
        <ReactMarkdown children={content} />
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

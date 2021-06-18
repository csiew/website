import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardBody, CardTitle } from '../components/Card.js';
import BlogSidebar from '../components/BlogSidebar.js';
import { scrollToTop } from '../utils/Scroll.js';
import postManifest from '../assets/post_manifest.json';

function PostContent(props) {
  if (!props.post) {
    return (
      <Card>
        <CardBody className="hstack align-center justify-center">
          <span className="text-color-secondary">Loading...</span>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle className="grid grid-col-1 grid-gap-xs align-start justify-center">
        <h2 className="font-scale-xl">{props.post.title}</h2>
        <span className="font-scale-s text-color-secondary">{new Date(props.post.date.year, props.post.date.month, props.post.date.day, props.post.date.hr, props.post.date.mins, props.post.date.sec).toDateString()}</span>
      </CardTitle>
      <CardBody>
        <ReactMarkdown children={props.postBody} />
      </CardBody>
    </Card>
  );
}

function Post() {
  const { id } = useParams();
  const [postMetadata, setPostMetadata] = useState(null);
  const [postBody, setPostBody] = useState(null);

  useEffect(() => {
    scrollToTop();
    const results = postManifest.posts.filter(post => post.id === id);
    if (results.length > 0) {
      setPostMetadata(results[0]);
      axios.get(results[0].path)
        .then(response => {
          setPostBody(response.data);
        })
        .catch(e => {
          console.warn(e)
        });
    }
  }, [id, postMetadata]);

  if (postMetadata == null || postBody == null) {
    return (
      <div className="hstack width-full height-full align-center justify-center">
        <span className="text-color-secondary">Loading...</span>
      </div>
    );
  }

  return (
    <DynamicPageView
      className="width-max-1280"
      sidebarClassName="width-min-240 position-sticky anchor-top"
      main={(
        <div className="width-full grid grid-col-1 grid-gap-xl">
          <PostContent post={postMetadata} postBody={postBody} />
        </div>
      )}
      sidebar={(
        <BlogSidebar isViewingPost={true} />
      )}
    />
  );
}

export default Post;

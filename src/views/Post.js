import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { MdArrowBack } from 'react-icons/md';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardBody } from '../components/Card.js';
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
      <CardBody>
        <article>
          <ReactMarkdown children={props.postBody} />
        </article>
      </CardBody>
    </Card>
  );
}

function PostHeader(props) {
  return (
    <div className="toolbar anchor-top margin-none-top padding-none transition-enter-down">
      <div className="width-max-1280 hstack align-center justify-start margin-auto-horizontal padding-s padding-m-left padding-m-right">
        <NavLink
          className="button button-icon-only margin-m-right padding-none"
          to="/blog"
        >
          <MdArrowBack size="1.75rem" />
        </NavLink>
        <div className="vstack align-start justify-center">
          <h2 className="font-scale-xxl">{props.title}</h2>
          <sub className="font-scale-s text-color-secondary">{new Date(props.date.year, props.date.month, props.date.day, props.date.hr, props.date.mins, props.date.sec).toLocaleString()}</sub>
        </div>
      </div>
    </div>
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
    } else {
      window.location.href = "/404";
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
    <>
      <PostHeader title={postMetadata.title} date={postMetadata.date} />
      <DynamicPageView
        className="width-max-1280 anchor-top margin-none-top margin-auto-bottom"
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
    </>
  );
}

export default Post;

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { DynamicPageView } from '../components/PageLayout.js';
import { Card, CardBody, CardTitle } from '../components/Card.js';
import BlogSidebar from '../components/BlogSidebar.js';
import { scrollToTop } from '../utils/Scroll.js';
import postManifest from '../assets/post_manifest.json';

function BlogPostPreview(props) {
  const [postBody, setPostBody] = useState("");

  useEffect(() => {
    axios.get(props.post.path)
      .then(response => {
        setPostBody(`${response.data.slice(0, 255)}...`);
      })
      .catch(e => {
        console.warn(e)
      });
  });

  return (
    <Card>
      <NavLink
        key={props.post.id}
        className="link-no-decoration text-color-primary"
        to={`/post/${props.post.id}`}
        title={`${props.post.title}`}
      >
        <CardTitle className="grid grid-col-1 grid-gap-xs align-start justify-center">
          <h3 className="font-scale-xl">{props.post.title}</h3>
          <span className="font-scale-s text-color-secondary">{new Date(props.post.date.year, props.post.date.month, props.post.date.day, props.post.date.hr, props.post.date.mins, props.post.date.sec).toDateString()}</span>
        </CardTitle>
      </NavLink>
      <CardBody>
        <ReactMarkdown children={postBody} className="pointer-events-none" />
        <NavLink
          key={props.post.id}
          className="button width-full margin-s-top"
          to={`/post/${props.post.id}`}
          title={`${props.post.title}`}
        >
          Read more
        </NavLink>
      </CardBody>
    </Card>
  );
}

function Blog() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <DynamicPageView
      title="Blog"
      className="width-max-1280"
      sidebarClassName="width-min-240 position-sticky anchor-top"
      main={(
        <div className="width-full grid grid-col-1 grid-gap-xl">
          {
            postManifest.posts.map(post => {
              return (
                <BlogPostPreview key={post.id} post={post} disallowedElements={["hyperlink", "a", "p"]} />
              );
            })
          }
        </div>
      )}
      sidebar={(
        <BlogSidebar />
      )}
    />
  );
}

export default Blog;

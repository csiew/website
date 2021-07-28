import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { MdArrowForward } from 'react-icons/md';
import BlogSidebar from '../components/BlogSidebar.js';
import { scrollToTop } from '../utils/Scroll.js';
import { friendlyTimestamp } from '../utils/Timestamp.js';
import postManifest from '../assets/post_manifest.json';
import { Card, CardBody, CardTitle, Button, PageHeader, PageLayout } from 'brioche';

function BlogPostPreview(props) {
  const [postBody, setPostBody] = useState("");

  useEffect(() => {
    axios.get(props.post.path)
      .then(response => {
        setPostBody(response.data);
      })
      .catch(e => {
        console.warn(e)
      });
  });

  return (
    <Card>
      <NavLink
        className="link-no-decoration text-color-primary"
        to={`/post/${props.post.id}`}
        title={`${props.post.title}`}
      >
        <CardTitle className="grid grid-col-1 grid-gap-xs align-start justify-center">
          <h3 className="font-scale-xl">{props.post.title}</h3>
          <sub>{friendlyTimestamp(props.post.date)}</sub>
        </CardTitle>
      </NavLink>
      <CardBody className="position-relative padding-none">
        <article className="blog-post-preview-body card-border-bottom-radius padding-s">
          <ReactMarkdown children={postBody} className="pointer-events-none" />
        </article>
        <NavLink
          className="flex-inline flex-flow-column align-center justify-end position-absolute anchor-top anchor-bottom margin-none padding-none width-full height-full"
          to={`/post/${props.post.id}`}
          title={`${props.post.title}`}
        >
          <Button
            primary
            className="position-absolute anchor-bottom margin-l-bottom margin-auto-top transition scale-subtle"
            label={
              <>
                <span>Read more</span>
                <MdArrowForward className="margin-xxs-left" size="1rem" />
              </>
            }
          />
        </NavLink>
      </CardBody>
    </Card>
  );
}

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    scrollToTop();
    setPosts(postManifest.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  return (
    <PageLayout
      className="width-max-1280"
      sidebarClassName="width-min-240 position-sticky anchor-top"
      header={
        <PageHeader title="Blog" />
      }
      main={(
        <div className="width-full grid grid-col-1 grid-gap-xl">
          {
            posts.map(post => {
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

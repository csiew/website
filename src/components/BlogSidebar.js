import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle } from './Card.js';
import postManifest from '../assets/post_manifest.json';
import archivedBlogs from '../assets/data/archived_blogs.json';

function RecentPostsList(props) {
  return (
    <Card>
      <CardTitle className="hstack align-center justify-space-between">
        <h3>Recent Posts</h3>
        {
          props.isViewingPost ?
            <NavLink className="button button-small padding-xs padding-none-top padding-none-bottom font-scale-s" to="/blog" title="See all posts">See all</NavLink>
          :
            ''
        }
      </CardTitle>
      <CardBody className="padding-none">
        <div className="list-selectable">
          {
            postManifest.posts.slice(0, 5).map(post => {
              return (
                <NavLink
                  key={post.id}
                  className="vstack align-start justify-center"
                  to={`/post/${post.id}`}
                  title={post.title}
                >
                  <span>{post.title}</span>
                  <sub className="font-scale-s text-color-secondary">{new Date(post.date.year, post.date.month, post.date.day, post.date.hr, post.date.mins, post.date.sec).toLocaleString()}</sub>
                </NavLink>
              );
            })
          }
        </div>
      </CardBody>
    </Card>
  )
}

function ArchivedBlogsList() {
  return (
    <Card>
      <CardTitle>
        <h3>Archived Blogs</h3>
      </CardTitle>
      <CardBody className="grid grid-col-3 grid-col-responsive grid-gap-s">
        {
          archivedBlogs["links"].map(link => {
            return (
              <a href={link["url"]} target="_blank" className="button" rel="noreferrer" key={link["id"]}>{link["name"]}</a>
            );
          })
        }
      </CardBody>
    </Card>
  );
}

function BlogSidebar(props) {
  return (
    <>
      <RecentPostsList isViewingPost={props.isViewingPost} />
      <ArchivedBlogsList />
    </>
  )
}

export default BlogSidebar;

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle } from './Card.js';
import { List, ListItem } from './List.js';
import postManifest from '../assets/post_manifest.json';
import archivedBlogs from '../assets/data/archived_blogs.json';

function RecentPostsList(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postManifest.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

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
        <List>
          {
            posts.slice(0, 5).map(post => {
              return (
                <ListItem
                  key={post.id}
                  className="vstack align-start justify-center"
                  to={`/post/${post.id}`}
                  title={post.title}
                >
                  <h4>{post.title}</h4>
                  <sub className="font-scale-s text-color-secondary">{new Date(post.date).toLocaleDateString()}</sub>
                </ListItem>
              );
            })
          }
        </List>
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

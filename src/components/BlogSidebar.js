import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'brioche';
import { List, ListItem } from 'brioche';
import postManifest from '../assets/post_manifest.json';
import archivedBlogs from '../assets/data/archived_blogs.json';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

function RecentPostsList(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postManifest.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  return (
    <Card
      isCollapsible
      collapseButtonClassName="border-radius-100pct padding-none"
      collapseButtonStyle={{
        width: "2.5rem",
        height: "2.5rem",
      }}
      isCollapsedValue={<MdArrowDropDown size="1.5rem" />}
      isNotCollapsedValue={<MdArrowDropUp size="1.5rem" />}
      title="Recent Posts"
      bodyClassName="padding-none"
      body={
        <List>
          {
            posts.slice(0, 5).map(post => {
              return (
                <ListItem
                  key={post.id}
                  className="vstack align-start justify-center"
                  to={`/post/${post.id}`}
                  tooltip={post.title}
                >
                  <h4>{post.title}</h4>
                  <sub className="font-scale-s text-color-secondary">{new Date(post.date).toLocaleDateString()}</sub>
                </ListItem>
              );
            })
          }
        </List>
      }
    />
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

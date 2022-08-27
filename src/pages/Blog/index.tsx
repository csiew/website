import NavigationView from "../../components/ui/NavigationView";

const Blog = () => {
  return (
    <NavigationView
      content={(
        <article id="page-blog" className="top-level-page">
          <h2>Blog</h2>
        </article>
      )}
    />
  );
};

export default Blog;

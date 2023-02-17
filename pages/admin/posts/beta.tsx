import MultiContentList from "../../../components/templates/admin/multi-content-list";
import { savePost, deletePost } from "../../../firebase/posts";

const PostsBeta = ({ isLoggedIn }: any) => {
  return <MultiContentList
    isLoggedIn={isLoggedIn}
    terminology={{
      pageTitle: "Posts",
      itemPlural: "posts",
      itemSingular: "post",
      urlSlug: "posts"
    }}
    firebaseCallbacks={{
      save: savePost,
      delete: deletePost
    }}
    contextRefs={{
      storePropName: "posts"
    }} />;
};

export default PostsBeta;

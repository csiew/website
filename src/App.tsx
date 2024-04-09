import { useRoutes } from "react-router-dom";
import AppContext from "./AppContext";
import NavBar from "./components/app/NavBar/NavBar";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import Post from "./pages/Posts/Post/Post";
import Feed from "./pages/Feed/Feed";

export default function App() {
  return (
    <AppContext>
      <NavBar />
      <main>
        {useRoutes([
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/posts",
            element: <Posts />
          },
          {
            path: "/posts/:slug",
            element: <Post />
          },
          {
            path: "/feed",
            element: <Feed />
          },
          {
            path: "*",
            element: <NotFound />
          }
        ])}
      </main>
      <footer>
        &copy; 2024 Clarence Siew
      </footer>
    </AppContext>
  )
}

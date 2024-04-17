import { useRoutes } from "react-router-dom";
import AppContext from "./AppContext";
import NavBar from "./components/app/NavBar/NavBar";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Feed from "./pages/Feed/Feed";
import Posts from "./pages/Posts/Posts";
import Post from "./pages/Posts/Post/Post";
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Projects/Project/Project";
import PersonalLinks from "./components/app/PersonalLinks/PersonalLinks";

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
            path: "/feed",
            element: <Feed />
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
            path: "/projects",
            element: <Projects />
          },
          {
            path: "/projects/:slug",
            element: <Project />
          },
          {
            path: "*",
            element: <NotFound />
          }
        ])}
      </main>
      <footer>
        <PersonalLinks />
        &copy; 2024 Clarence Siew
      </footer>
    </AppContext>
  )
}

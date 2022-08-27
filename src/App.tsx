import { Routes, Route } from "react-router-dom";
import { PageRoute } from "./common/@types";
import NavBar from "./components/app/NavBar";
import Footer from "./components/app/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Playlists from "./pages/Playlists";

const pages: PageRoute[] = [
  {
    title: "Home",
    path: "/",
    element: <Home />,
    hideFromNavBar: true,
  },
  {
    title: "Blog",
    path: "/blog",
    element: <Blog />,
  },
  {
    title: "Projects",
    path: "/projects",
    element: <Projects />,
  },
  {
    title: "Playlists",
    path: "/playlists",
    element: <Playlists />,
  }
];

const App = () => {
  return (
    <>
      <NavBar pages={pages} />
      <main>
        <Routes>
          {
            pages.map((page) => <Route key={page.path.replace("/", "app-route-")} path={page.path} element={page.element} />)
          }
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;

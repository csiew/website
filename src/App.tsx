import { Routes, Route } from "react-router-dom";
import NavBar from "./components/app/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { PageRoute } from "./common/@types";

const pages: PageRoute[] = [
  {
    title: "Home",
    path: "/",
    element: <Home />,
  },
  {
    title: "About",
    path: "/about",
    element: <About />,
  },
  {
    title: "Projects",
    path: "/projects",
    element: <Projects />,
  }
];

const App = () => {
  return (
    <div className="App">
      <NavBar pages={pages} />
      <main>
        <Routes>
          {
            pages.map((page) => <Route key={page.path.replace("/", "app-route-")} path={page.path} element={page.element} />)
          }
        </Routes>
      </main>
    </div>
  );
};

export default App;

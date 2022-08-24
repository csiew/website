import { Routes, Route } from "react-router-dom";
import NavBar from "./components/app/NavBar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { PageRoute } from "./common/@types";
import Footer from "./components/app/Footer";

const pages: PageRoute[] = [
  {
    title: "Home",
    path: "/",
    element: <Home />,
    hideFromNavBar: true,
  },
  {
    title: "Projects",
    path: "/projects",
    element: <Projects />,
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

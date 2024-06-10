import React from "react";
import { Route, Switch } from "wouter";
import { Helmet, HelmetProvider } from "react-helmet-async";
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

const helmetContext = {};

export default function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>Clarence Siew</title>
        <link rel="canonical" href="https://www.clarencesiew.com/" />
      </Helmet>
      <AppContext>
        <NavBar />
        <main>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/feed" component={Feed} />
            <Route path="/posts" component={Posts} />
            <Route path="/posts/:slug">
              {(params) => <Post slug={params.slug} />}
            </Route>
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:slug">
              {(params) => <Project slug={params.slug} />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </main>
        <footer>
          <PersonalLinks />
          &copy; 2024 Clarence Siew
        </footer>
      </AppContext>
    </HelmetProvider>
  );
}

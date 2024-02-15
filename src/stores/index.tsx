"use client";

import React, { ComponentPropsWithRef, useEffect, useState } from "react";
import { AdminAuthContext, AdminSession } from "./auth";
import { BlogPost, Project } from "../@types";
import { DataContext } from "./data";

export default function AppContext(props: ComponentPropsWithRef<any>) {
  const [{ isLoading, isError, isHydrated }, setFetchState] = useState<{ isLoading: boolean, isError: boolean, isHydrated: boolean }>({ isLoading: false, isError: false, isHydrated: false });
  const [session, setSession] = useState<AdminSession>({});
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  function restoreAuthSession() {
    const token = window.sessionStorage.getItem("token");
    const expiresAt = Number(window.sessionStorage.getItem("expires_at") ?? -1);

    if (token && Date.now() < expiresAt) {
      setSession({ token, expiresAt });
    } else {
      setSession({});
    }
  }

  async function getData() {
    try {
      setFetchState({ isLoading: true, isError: false, isHydrated: false });

      // Fetch posts
      const postsResult = await fetch("/api/posts");
      if (!postsResult.ok) {
        throw new Error(`Failed to fetch posts: ${postsResult.status} ${postsResult.statusText}`);
      }
      const postsData = await postsResult.json();
      postsData.forEach((p: BlogPost) => p.body = atob(p.body));

      // Fetch projects
      const projectsResult = await fetch("/api/projects");
      if (!projectsResult.ok) {
        throw new Error(`Failed to fetch projects: ${projectsResult.status} ${projectsResult.statusText}`);
      }
      const projectsData = await projectsResult.json();
      projectsData.forEach((p: Project) => p.body = atob(p.body));

      setPosts(postsData);
      setProjects(projectsData);

      setFetchState({ isLoading: false, isError: false, isHydrated: true });
    } catch (err) {
      console.error(err);
      setFetchState({ isLoading: false, isError: true, isHydrated: false });
    }
  }

  useEffect(() => {
    if (!isHydrated) {
      restoreAuthSession();
      getData();
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ session, setSession }}>
      <DataContext.Provider value={{ isLoading, isError, posts, setPosts, projects, setProjects }}>
        {props.children}
      </DataContext.Provider>
    </AdminAuthContext.Provider>
  );
}

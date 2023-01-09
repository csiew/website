import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, query, QuerySnapshot, Timestamp, updateDoc } from "@firebase/firestore/lite";
import { merge } from "lodash";
import firebaseAppInstance from ".";
import { decodeContent } from "../lib/encoding";
import { ProjectStatus, ProjectV2 } from "../lib/projects";

export const getRemoteProjects = async (): Promise<QuerySnapshot<DocumentData>> => {
  const q = query(collection(firebaseAppInstance.db, "projects"));
  return await getDocs(q);
};

export const mapDocumentDataToProjects = (
  projectData: (DocumentData & { id: string })[]
): ProjectV2[] => {
  return projectData
    .map((p) => {
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        startYear: p.startYear,
        endYear: p.endYear,
        status: p.status,
        description: decodeContent(p.description ?? ""),
        imgUrl: p.imgUrl,
        siteUrl: p.siteUrl,
        gitRepoUrl: p.gitRepoUrl,
        createdAt: (p.createdAt as Timestamp)?.toDate(),
        lastModified: (p.lastModified as Timestamp)?.toDate()
      };
    })
    .sort((a, b) => {
      const dateA = Number(a.startYear);
      const dateB = Number(b.startYear);
      return dateB - dateA;
    });
};

export const saveProject = async (
  project: { [k: string]: any },
  id?: string,
  overrideProps?: { [k: string]: any }
): Promise<void> => {
  if (overrideProps) {
    merge(project, overrideProps);
  }
  if (id) {
    // Existing post
    const docReference = doc(firebaseAppInstance.db, "projects", id);
    await updateDoc(docReference, project);
  } else {
    // New post
    await addDoc(
      collection(firebaseAppInstance.db, "projects"),
      project
    );
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const docReference = doc(firebaseAppInstance.db, "project", id);
  await deleteDoc(docReference);
};

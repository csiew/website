import { collection, DocumentData, getDocs, query, QuerySnapshot, Timestamp } from "@firebase/firestore/lite";
import firebaseAppInstance from ".";
import { BlogPost } from "../lib/blog";

export const getRemotePosts = async (): Promise<QuerySnapshot<DocumentData>> => {
  const q = query(collection(firebaseAppInstance.db, "posts"));
  return await getDocs(q);
};

export const mapDocumentDataToPosts = (postData: DocumentData[]): BlogPost[] => {
  return postData.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    author: p.author,
    publishedOn: (p.publishedOn as Timestamp).toDate(),
    lastModified: (p.lastModified as Timestamp)?.toDate(),
    content: Buffer.from(p.content, "base64").toString("ascii"),
    isPublished: p.isPublished
  }));
};

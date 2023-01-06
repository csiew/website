import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, query, QuerySnapshot, Timestamp, updateDoc } from "@firebase/firestore/lite";
import { merge } from "lodash";
import firebaseAppInstance from ".";
import { BlogPost } from "../lib/blog";

export const getRemotePosts = async (): Promise<QuerySnapshot<DocumentData>> => {
  const q = query(collection(firebaseAppInstance.db, "posts"));
  return await getDocs(q);
};

export const mapDocumentDataToPosts = (postData: (DocumentData & { id: string })[]): BlogPost[] => {
  return postData.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    author: p.author,
    publishedOn: p.publishedOn ? (p.publishedOn as Timestamp).toDate(): undefined,
    createdAt: (p.createdAt as Timestamp).toDate(),
    lastModified: (p.lastModified as Timestamp)?.toDate(),
    content: Buffer.from(p.content, "base64").toString("utf-8"),
    isPublished: p.isPublished
  }));
};

export const savePost = async (post: { [k: string]: any }, id?: string, overrideProps?: { [k: string]: any }) => {
  if (overrideProps) {
    merge(post, overrideProps);
  }
  if (id) {
    // Existing post
    const docReference = doc(firebaseAppInstance.db, "posts", id);
    await updateDoc(docReference, post);
  } else {
    // New post
    await addDoc(
      collection(firebaseAppInstance.db, "posts"),
      post
    );
  }
};

export const deletePost = async (id: string) => {
  const docReference = doc(firebaseAppInstance.db, "posts", id);
  await deleteDoc(docReference);
};

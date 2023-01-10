import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, query, QuerySnapshot, Timestamp, updateDoc } from "@firebase/firestore/lite";
import { merge } from "lodash";
import firebaseAppInstance from ".";
import { BlogPost } from "../lib/blog";
import { decodeContent } from "../lib/encoding";

export const getRemotePosts = async (): Promise<QuerySnapshot<DocumentData>> => {
  const q = query(collection(firebaseAppInstance.db, "posts"));
  return await getDocs(q);
};

export const mapDocumentDataToPosts = (
  postData: (DocumentData & { id: string })[]
): BlogPost[] => {
  return postData
    .map((p) => {
      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        author: p.author,
        publishedOn: p.publishedOn ? (p.publishedOn as Timestamp).toDate(): undefined,
        createdAt: (p.createdAt as Timestamp)?.toDate(),
        lastModified: (p.lastModified as Timestamp)?.toDate(),
        content: decodeContent(p.content ?? ""),
        isPublished: p.isPublished
      };
    })
    .sort((a, b) => {
      const dateA = a.createdAt.getTime();
      const dateB = b.createdAt.getTime();
      return dateB - dateA;
    });
};

export const savePost = async (
  post: { [k: string]: any },
  id?: string,
  overrideProps?: { [k: string]: any }
): Promise<void> => {
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

export const deletePost = async (id: string): Promise<void> => {
  const docReference = doc(firebaseAppInstance.db, "posts", id);
  await deleteDoc(docReference);
};

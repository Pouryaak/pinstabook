import { useEffect, useState } from "react";
import { database } from "../firebase";

export default function useFirebase() {
  const [data, setData] = useState({
    postsLoading: true,
    fetchedPosts: null,
  });
  useEffect(() => {
    const postsRef = database.ref("posts");
    let posts = [];
    postsRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        posts.push(childSnapshot.val());
      });
    });
  }, []);
  return data;
}

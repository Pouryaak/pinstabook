import { createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase";

const initialState = {
  posts: [],
};

const postsSlicer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift({
        postId: Date.now(),
        userId: action.payload.userId,
        content: action.payload.content,
        date: action.payload.date,
        image: action.payload.image,
        likes: 0,
      });
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addLike: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (String(post.postId) === String(action.payload)) {
          post.likes = post.likes + 1;
        }
        return post;
      });
    },
  },
});

export const getPostsData = () => {
  return async (dispatch) => {
    // const postsRef = database.ref("posts");
    // let posts = [];
    // postsRef.on("value", (snapshot) => {
    //   snapshot.forEach((childSnapshot) => {
    //     posts.push(childSnapshot.val());
    //   });
    // });
    let posts = [];
    const resp = await fetch(
      "https://pinstabook-99575-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
    );
    const data = await resp.json();
    for (const key in data) {
      posts.unshift({
        postId: key,
        userId: data[key].userId,
        content: data[key].content,
        date: data[key].date,
        image: data[key].image,
        likes: data[key].likes,
      });
    }

    dispatch(setPosts(posts));
  };
};

export const addPostData = ({ userId, content, date, image }) => {
  return (dispatch) => {
    database.ref("posts/" + Date.now()).set({
      userId,
      content,
      date,
      image,
      likes: 0,
    });
    dispatch(addPost({ userId, content, date, image }));
  };
};
export const addLikeData = (postId) => {
  return (dispatch, getState) => {
    dispatch(addLike(postId));
    const post = getState().posts.posts.find(
      (post) => String(post.postId) === String(postId)
    );
    const postsRef = database.ref("posts");
    postsRef.child(String(postId)).set(post);
  };
};

export const { addPost, setPosts, addLike } = postsSlicer.actions;
export const selectPosts = (state) => state.posts.posts;
export default postsSlicer.reducer;

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
        comments: action.payload.comments,
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
    addComment: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.postId === action.payload.id) {
          post.comments.push({
            uid: action.payload.uid,
            commentCont: action.payload.commentCont,
          });
        }
        return post;
      });
    },
  },
});

export const getPostsData = () => {
  return async (dispatch) => {
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
        comments: data[key].comments,
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
      comments: [{ uid: "asdas", comment: "test comment" }],
      likes: 0,
    });
    dispatch(addPost({ userId, content, date, image, comments: [] }));
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
export const addCommentData = (uid, comment, postId) => {
  return (dispatch, getState) => {
    dispatch(
      addComment({
        id: postId,
        uid,
        commentCont: comment,
      })
    );
    const currentPost = getState().posts.posts.find(
      (post) => post.postId === postId
    );
    const dbRef = database.ref("posts");
    const postRef = dbRef.child(String(postId));
    postRef.update({
      comments: currentPost.comments,
    });
  };
};

export const { addPost, setPosts, addLike, addComment } = postsSlicer.actions;
export const selectPosts = (state) => state.posts.posts;
export default postsSlicer.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userSlicerReducer from "../feature/userSlicer";
import postsSlicerReducer from "../feature/postsSlicer";

export default configureStore({
  reducer: {
    posts: postsSlicerReducer,
    user: userSlicerReducer,
  },
});

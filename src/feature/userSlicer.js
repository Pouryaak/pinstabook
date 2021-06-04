import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
  userImage: null,
  uid: null,
};

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userImage = action.payload.userImage;
      state.uid = action.payload.uid;
    },
    setUserLogOutState: (state, action) => {
      state.userName = null;
      state.userEmail = null;
      state.userImage = null;
      state.uid = null;
    },
  },
});

export const { setActiveUser, setUserLogOutState } = userSlicer.actions;

export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserImage = (state) => state.user.userImage;
export const selectUserId = (state) => state.user.uid;

export default userSlicer.reducer;

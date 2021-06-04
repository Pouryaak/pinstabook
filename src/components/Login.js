import React from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Icon, Image, Segment } from "semantic-ui-react";
import pic from "../assets/loginPic.svg";
import { setActiveUser } from "../feature/userSlicer";
import { auth, provider, database } from "../firebase";
import useFirebase from "../helpers/useFirebase";

export default function Login() {
  const dispatch = useDispatch();
  const { postsLoading, fetchedPosts } = useFirebase();

  const handleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch(
          setActiveUser({
            userName: res.user.displayName,
            userEmail: res.user.email,
            userImage: res.user.photoURL,
            uid: res.user.uid,
          })
        );
        if (!postsLoading) {
          dispatch(fetchedPosts);
        }
        if (res.additionalUserInfo.isNewUser) {
          database.ref("users/" + res.user.uid).set({
            userName: res.user.displayName,
            userEmail: res.user.email,
            userImage: res.user.photoURL,
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Segment>
      <Grid padded="vertically">
        <Grid.Column textAlign="center">
          <h2 header> Welcome! Please Login to view your amazing posts. </h2>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width={9}>
          <Image src={pic} />
        </Grid.Column>
        <Grid.Column width={6} textAlign="center">
          <h3>Login with your Google Account</h3>
          <Button color="google plus" fluid onClick={handleSignIn}>
            <Icon name="google" /> Google Login
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

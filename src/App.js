import { Container, Dimmer, Loader } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts/Posts";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { getPostsData, setPosts } from "./feature/postsSlicer";
import { setActiveUser, selectUserName } from "./feature/userSlicer";
import { useEffect, useState } from "react";
import Login from "./components/Login";

function App() {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getPostsData());
    auth.onAuthStateChanged((user) => {
      // fetchPosts.then((res) => {
      //   console.log(res);
      // });
      if (user) {
        const userObj = auth.currentUser;
        dispatch(
          setActiveUser({
            userName: userObj.displayName,
            userEmail: userObj.email,
            userImage: userObj.photoURL,
            uid: userObj.uid,
          })
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        {isLoading && (
          <Dimmer active inverted>
            <Loader size="big">Loading...</Loader>
          </Dimmer>
        )}

        {userName ? <Posts /> : <Login />}
      </Container>
    </>
  );
}

export default App;

import React from "react";
import Post from "./Post";
import { Grid } from "semantic-ui-react";
import { selectPosts } from "../../feature/postsSlicer";
import { useSelector } from "react-redux";

//
export default function Posts() {
  const posts = useSelector(selectPosts);
  return (
    <Grid centered padded container doubling columns={2}>
      <Grid.Column>
        {posts.map((post) => (
          <Post post={post} key={post.postId} />
        ))}
      </Grid.Column>
    </Grid>
  );
}

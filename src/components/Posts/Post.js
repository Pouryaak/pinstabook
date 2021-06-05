import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Dropdown,
  Icon,
  Image,
  Input,
  List,
} from "semantic-ui-react";
import {
  selectUserName,
  selectUserImage,
  selectUserId,
} from "../../feature/userSlicer";
import { addCommentData, addLikeData } from "../../feature/postsSlicer";
import moment from "moment";
import useUserData from "../../helpers/useUserData";

export default function Post(props) {
  const dispatch = useDispatch();
  const userNames = useSelector(selectUserName);
  const userImages = useSelector(selectUserImage);
  const userId = useSelector(selectUserId);
  const [commentCont, setCommentCont] = useState("");

  const { isloading, user } = useUserData(props.post.userId);
  const { isloaded, userComment } = useUserData(userId);

  const addLikeHandler = () => {
    dispatch(addLikeData(props.post.postId));
  };
  const addCommentHandler = () => {
    dispatch(addCommentData(userId, commentCont, props.post.postId));
    setCommentCont("");
  };

  const commentSec = props.post.comments?.map((com) => {
    return (
      <List.Item key={Date.now() + Math.random()}>
        {userComment?.userName} {com.commentCont}
      </List.Item>
    );
  });
  console.log(userId);
  return (
    <Card fluid>
      <Card.Content>
        {/* <Dropdown
          text="Dropdown"
          options={options}
          simple
          item
          floated="right"
        /> */}
        <Button floated="right" basic icon>
          <Icon name="ellipsis horizontal" />
        </Button>
        <Image src={user?.userImage} avatar />
        <span>{user?.userName}</span>
      </Card.Content>
      <Image
        src={
          props.post.image
            ? props.post.image
            : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
        }
        wrapped
      />
      <Card.Content>
        <div className="content">
          <span className="right floated">
            <i className="heart outline like icon" onClick={addLikeHandler}></i>
            {props.post.likes} likes
          </span>
          <i className="comment icon"></i>
          {props.post.comments.length - 1} comments
        </div>
      </Card.Content>
      <Card.Content>
        <Card.Meta>
          <span className="date">{moment(props.post.date).fromNow()}</span>
        </Card.Meta>
        <Card.Description>
          <h4 className="ui header">{props.post.content}</h4>
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Icon name="comment outline" />
        Comments
        <List divided>{commentSec}</List>
      </Card.Content>
      <Card.Content extra>
        <Input
          fluid
          transparent
          placeholder="Add Comment..."
          onChange={(e) => setCommentCont(e.target.value)}
          value={commentCont}
        >
          <input />

          <Button content="Post" onClick={addCommentHandler} />
        </Input>
      </Card.Content>
    </Card>
  );
}

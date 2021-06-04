import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Icon, Image, Input } from "semantic-ui-react";
import { selectUserName, selectUserImage } from "../../feature/userSlicer";
import { addLikeData } from "../../feature/postsSlicer";
import moment from "moment";

export default function Post(props) {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userImage = useSelector(selectUserImage);

  const addLikeHandler = () => {
    dispatch(addLikeData(props.post.postId));
    console.log(props.post.postId);
  };

  return (
    <Card fluid>
      <Card.Content>
        <Button floated="right" basic icon>
          <Icon name="ellipsis horizontal" />
        </Button>
        <Image src={userImage} avatar />
        <span>{userName}</span>
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
          <i className="comment icon"></i>3 comments
        </div>
      </Card.Content>
      <Card.Content>
        <Card.Meta>
          <span className="date">{moment(props.post.date).fromNow()}</span>
        </Card.Meta>
        <Card.Description>{props.post.content}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="comment outline" />
        Comments
        <Input fluid action="Post" transparent placeholder="Add Comment..." />
      </Card.Content>
    </Card>
  );
}

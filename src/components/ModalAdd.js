import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid, Image, Modal } from "semantic-ui-react";
import { addPostData } from "../feature/postsSlicer";
import moment from "moment";
import { selectUserId } from "../feature/userSlicer";
import Webcam from "react-webcam";
import imageHolder from "../assets/profile-placeholder.png";

const videoConstraints = {
  width: 50,
  height: 50,
  facingMode: "user",
};

export default function ModalAdd(props) {
  const [content, setContent] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [imageTaken, setImageTaken] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageTaken(imageSrc);
  }, [webcamRef]);

  const fileUploadHandler = (event) => {
    setFileUpload(event.target.files[0]);
  };
  const onAddPost = () => {
    dispatch(
      addPostData({
        userId,
        content,
        image: imageTaken,
        date: moment().format(),
      })
    );
    // addPostFB(userId, content, moment().format(), 0);
    setContent("");
    setImageTaken(null);
    props.closeShowModal();
  };

  return (
    <Modal open={props.show} onClose={props.closeShowModal}>
      <Modal.Header>Add a new post</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Form.TextArea
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Field>
          {/* <Form.Field>
            <label>Choose an Image</label>
            <input type="file" onChange={fileUploadHandler} />
          </Form.Field> */}
          <Form.Group widths="equal">
            <Form.Field>
              <Webcam
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={400}
                videoConstraints={videoConstraints}
              />
              <Button onClick={capture} primary>
                Capture photo
              </Button>
            </Form.Field>

            <Form.Field>
              <Image
                src={imageTaken ? imageTaken : imageHolder}
                alt="pic-taken"
                size="big"
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={onAddPost}>
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

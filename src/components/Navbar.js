import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Image, Input, Menu } from "semantic-ui-react";
import logo from "../assets/pinstabook.png";
import { selectUserName, setUserLogOutState } from "../feature/userSlicer";
import { auth } from "../firebase";
import ModalAdd from "./ModalAdd";

export default function Navbar() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const [showModalAdd, setShowModalAdd] = useState();

  const authUser = auth.onAuthStateChanged((user) => (user ? true : false));

  const logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUserLogOutState());
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addPostClicked = () => {
    setShowModalAdd(true);
  };

  const closeShowModal = () => {
    setShowModalAdd(false);
  };

  const menuButtons = (
    <>
      <ModalAdd show={showModalAdd} closeShowModal={closeShowModal} />
      <Button animated="vertical" color="green" onClick={addPostClicked}>
        <Button.Content hidden>Add Post</Button.Content>
        <Button.Content visible>
          <Icon name="add" />
        </Button.Content>
      </Button>
      &nbsp;&nbsp;
      <Button animated="vertical" color="blue">
        <Button.Content hidden>Profile</Button.Content>
        <Button.Content visible>
          <Icon name="user" />
        </Button.Content>
      </Button>
      &nbsp;&nbsp;
      <Button animated="vertical" color="red" onClick={logoutHandler}>
        <Button.Content hidden>Logout</Button.Content>
        <Button.Content visible>
          <Icon name="sign-out" />
        </Button.Content>
      </Button>
    </>
  );

  return (
    <Menu borderless>
      <Menu.Item>
        <Image src={logo} size="small" />
      </Menu.Item>
      <Menu.Item position="right">
        <Input className="icon" icon="search" placeholder="Search..." />
      </Menu.Item>
      <Menu.Item position="right">{userName && menuButtons}</Menu.Item>
    </Menu>
  );
}

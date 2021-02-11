import * as React from "react";
import { Launcher } from "react-chat-window";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = ({ username }) => {
  const [connected, setConnected] = useState(false);
  const socket = io("http://localhost:3000", {
    withCredentials: true,
    autoConnect: false,
    query: {
      username,
    },
  });

  if (!connected) {
    socket.connect();
    setConnected(true);
  }

  socket.on("connect_error", (err) => {
    console.log("err", err);
    if (err.message === "invalid username") {
      this.usernameAlreadySelected = false;
    }
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [latestMessage, setLatestMessage] = useState(undefined);
  const URL = "http://localhost:3000";

  const [messageList, setMessageList] = useState([]);

  socket.on("users", (users) => {
    console.log(users);
    users.forEach((user) => {
      user.self = user.userID === socket.id;
    });
    // put the current user first, and then sort by username
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    setUsers(users);
  });

  socket.on("user connected", (user) => {
    setUsers([...users, user]);
  });

  socket.on("private message", ({ content, from }) => {
    if (!content) {
      return;
    }
    console.log(messageList);
    content.author = "them";
    setMessageList([...messageList, content]);
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.userID === from) {
        user.messages.push({
          content,
          fromSelf: false,
        });
        if (user !== selectedUser) {
          user.hasNewMessages = true;
        }
        break;
      }
    }
  });

  const _sendMessage = (text) => {
    if (text.data.text.length > 0) {
      setMessageList([
        ...messageList,
        {
          author: "them",
          type: "text",
          data: { text },
        },
      ]);
      console.log(users[0].userID);
      setLatestMessage(text);
    }
  };

  const _onMessageWasSent = (message) => {
    _sendMessage(message);
    setMessageList([...messageList, message]);
  };

  useEffect(() => {
    socket.connect();
    socket.emit("private message", {
      content: latestMessage,
    });
  }, [latestMessage]);

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "Chat",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={_onMessageWasSent}
        messageList={messageList}
        showEmoji
      />
    </div>
  );
};

export default Chat;

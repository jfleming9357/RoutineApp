const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://jfleming9357:${process.env.MONGO_PASSWORD}@cluster0.rwkhx.mongodb.net/gatsby?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.put("/update", (req, res) => {
  console.log(req.body.routines);
  let replacement = req.body.routines;
  replacement.routineID = parseInt(replacement.routineID);
  client.connect((err) => {
    const collection = client.db("gatsby").collection("routines");
    collection
      .replaceOne({ routineID: parseInt(req.body.routineId) }, replacement)
      .then(() => {
        console.log("updated");
        res.send("done");
      })
      .catch((err) => {
        res.status(400).send(err);
        console.log(err);
      });
  });
});

app.post("/addRoutine", (req, res) => {
  console.log(req.body);
  client.connect((err) => {
    const collection = client.db("gatsby").collection("routines");
    collection
      .insertOne(req.body)
      .then(() => {
        console.log("added to db");
        res.send("done");
      })
      .catch((err) => {
        res.status(400).send(err);
        console.log(err);
      });
  });
});

app.listen(3002, () => {
  console.log("dbAPI listening on 3002");
});

const httpServer = require("http")
  .createServer()
  .listen(3000, () => {
    console.log("http listening on 3000");
  });

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8000",
    credentials: true,
  },
  allowEIO3: true,
});

io.use((socket, next) => {
  const username = socket.handshake.query.username;
  console.log(socket.handshake.query.username);
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  console.log(users);
  socket.emit("users", users);
  // ...
  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
  socket.on("private message", ({ content, to }) => {
    console.log(content);
    socket.broadcast.emit("private message", {
      content,
      from: socket.id,
    });
  });
});

io.on("connect_failed", () => {
  console.log("err");
});

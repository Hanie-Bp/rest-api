import "dotenv/config";

import express from "express";
import sequelize from "./db/connection.js";
import User from "./models/User.js";
import Post from "./models/Post.js";

import usersRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";


const app = express();

const PORT = process.env.APP_PORT;

app.use(express.json());

app.use('/users',usersRoute);
app.use('/posts',postRoute);

const connection = async () => {
  try {
    await sequelize.sync({alter:true});
    console.log(`tables created successfully`);
  } catch (err) {
    console.log(`error for creating tabel: ${err}`);
  }
};

connection()

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

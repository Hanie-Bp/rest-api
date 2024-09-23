import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";
// import User from "./User.js";

const Post = sequelize.define("post", {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
    },
    title: {
      type:DataTypes.STRING(50),
      allowNull: false,
    },
    content: DataTypes.STRING,
  });


// Post.belongsTo(User)

  export default Post;
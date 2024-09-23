import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";
import Post from './Post.js';

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true,
  },
  name: {
    type:DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    validate: {
        isEmail:true,
    }
  }
});

User.hasMany(Post);
Post.belongsTo(User);

export default User;
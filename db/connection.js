import { Sequelize } from "sequelize";

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

const sequelize = new Sequelize({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log(`successfully connected to database`))
  .catch((err) => console.log(`error: ${err}`));

export default sequelize;

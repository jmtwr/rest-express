import dotenv from "dotenv";
dotenv.config();
import { app } from "./src/app";
import { connect } from "./src/plugins/db";

const PORT = process.env.PORT;
const isDev = process.env.NODE_ENV !== "prod";
const entitiesPath = "src/entities/**/*";
const DB_CONFIG = {
  entities: [isDev ? `${entitiesPath}.ts` : `build/${entitiesPath}.js`],
  migrations: [],
  logging: true
}

const startServer = async () => {
  app.request.db = await connect(DB_CONFIG);
  app.listen(PORT, () => console.log(`server run at port: ${PORT}`));
}

startServer();

process.on('uncaughtException', error => {
  console.error(error, 'uncaughtException:');
  process.exit(1)
});

process.on('unhandledRejection', error => {
  console.error('unhandledRejection');
  throw error;
});
import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server run at port: ${PORT}`));

process.on('uncaughtException', error => {
  console.error(error, 'uncaughtException:');
  process.exit(1)
});

process.on('unhandledRejection', error => {
  console.error('unhandledRejection');
  throw error;
});
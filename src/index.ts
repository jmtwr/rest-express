import express from "express";
import dotenv from "dotenv";
import { auth } from "./plugins/Auth";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/health", (_req, res) => res.status(200).send({ status: "ok" }));
app.use(auth);

app.get("*", (_req, res) => res.status(404).send({ status: "error", message: "not found" }));

app.listen(PORT, () => console.log(`server run at port: ${PORT}`));
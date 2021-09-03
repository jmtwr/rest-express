import express from "express";
import { auth } from "./plugins/Auth";

const app = express();

app.use(express.json());
app.get("/health", (_req, res) => res.status(200).send({ status: "ok" }));
app.use(auth);

app.get("*", (_req, res) => res.status(404).send({ status: "error", message: "not found" }));

export { app };
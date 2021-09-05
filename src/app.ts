import express from "express";
import { auth } from "./plugins/Auth";
import { authRoutes } from "./routes/User/User";

const app = express();

app.use(express.json());
app.get("/health", (_req, res) => res.status(200).send({ status: "ok" }));
app.use(auth);
app.use(authRoutes);

app.get("*", (_req, res) => res.status(404).send({ status: "error", message: "not found" }));

export { app };
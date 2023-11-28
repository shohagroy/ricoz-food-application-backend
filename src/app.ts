import express, { Request, Response } from "express";
import cors from "cors";
import mainRoute from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandelat";
import cookiepParser from "cookie-parser";

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookiepParser());
app.use("/api/v1", mainRoute);
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("ricoz food application server is running...");
});

app.all("*", (req: Request, res: Response) => {
  res.status(500).send("No Route Found");
});

export default app;

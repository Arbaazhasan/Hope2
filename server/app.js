import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import { config } from "dotenv";
import cors from "cors";

config({
    path: "./data/config.env"
});

// middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"]
}));

// App APIs

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);


// App HOme Page
app.get("/", (req, res) => {
    res.send("working");
});


// Server 
app.listen("4000", () => {
    console.log("Server woriking ");
});
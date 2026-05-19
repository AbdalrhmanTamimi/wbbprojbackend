import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import api from "./api/api";
import errorHandler from "./errorHandel";
import successfully from "./class/successfully";

dotenv.config();
const app = express();

app.set("trust proxy", 1);

app.use(
    cors({
        origin: "https://jsv-ev14.onrender.com",
        credentials: true,
    })
);

app.use(express.json());

app.use(
    session({
        name: "jsv.sid",
        secret: process.env.secret_key_session || "secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        },
    })
);

mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
    res
        .status(successfully.homePage().status)
        .json(successfully.homePage().json);
});

app.use("/api", api);

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log("server running");
});

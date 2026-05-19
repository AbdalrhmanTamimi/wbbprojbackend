import dns from "dns";
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

const corsOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";
app.use(
    cors({
        origin: corsOrigin,
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
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        },
    })
);

let mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/backend";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

if (mongoUrl.includes("<db_password>")) {
    console.warn("MONGO_URL contains placeholder <db_password>. Falling back to local MongoDB for local testing.");
    mongoUrl = "mongodb://127.0.0.1:27017/backend";
}

mongoose
    .connect(mongoUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });

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

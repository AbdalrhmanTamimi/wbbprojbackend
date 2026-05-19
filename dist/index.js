"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = __importDefault(require("dns"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api/api"));
const errorHandel_1 = __importDefault(require("./errorHandel"));
const successfully_1 = __importDefault(require("./class/successfully"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("trust proxy", 1);
const corsOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";
app.use((0, cors_1.default)({
    origin: corsOrigin,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    name: "jsv.sid",
    secret: process.env.secret_key_session || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
}));
let mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/backend";
dns_1.default.setServers(["8.8.8.8", "8.8.4.4"]);
if (mongoUrl.includes("<db_password>")) {
    console.warn("MONGO_URL contains placeholder <db_password>. Falling back to local MongoDB for local testing.");
    mongoUrl = "mongodb://127.0.0.1:27017/backend";
}
mongoose_1.default
    .connect(mongoUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});
app.get("/", (req, res) => {
    res
        .status(successfully_1.default.homePage().status)
        .json(successfully_1.default.homePage().json);
});
app.use("/api", api_1.default);
app.use(errorHandel_1.default);
app.listen(process.env.PORT || 3001, () => {
    console.log("server running");
});

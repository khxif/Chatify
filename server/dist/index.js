"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const MessageRoutes_1 = __importDefault(require("./routes/MessageRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const socket_1 = __importDefault(require("./socket/socket"));
const { app, server } = socket_1.default;
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://chatify-khxif.vercel.app"],
    credentials: true,
}));
app.use("/api/auth", AuthRoutes_1.default);
app.use("/api/user", UserRoutes_1.default);
app.use("/api/message", MessageRoutes_1.default);
app.get("/", (req, res) => {
    res.send("hi");
});
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
})
    .catch(() => {
    console.log("MongoDB Error!");
});

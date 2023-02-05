"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const URI = `mongodb+srv://PouriaRezaei:${process.env.MONGODB_PASS}@cluster0.uxmyd.mongodb.net/timeline?retryWrites=true&w=majority`;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use((0, cors_1.default)({ origin: "*", optionsSuccessStatus: 200 }));
app.use((req, res, next) => {
    console.log("+++++++++++++++++++++++ Body: ", req.body);
    next();
});
app.use(user_1.default);
mongoose_1.default
    .connect(URI)
    .then(() => app.listen(4000, () => {
    console.log("Server is running...");
}))
    .catch((err) => console.log(err));

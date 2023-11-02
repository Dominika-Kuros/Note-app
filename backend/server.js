"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./dist/src/app"));
const validateEnv_1 = __importDefault(require("./dist/src/util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = validateEnv_1.default.PORT;
app_1.default.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://note-app-project-6hm3.onrender.com/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongoose_1.default
    .connect(validateEnv_1.default.MONGO_CONNECTION_STRING)
    .then(() => {
    console.log("Mongoose connected");
    app_1.default.listen(port, () => {
        console.log("Server running on port: " + port);
    });
})
    .catch(console.error);

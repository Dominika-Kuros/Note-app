"use strict";
exports.__esModule = true;
require("dotenv/config");
var express_1 = require("express");
var notes_1 = require("./routes/notes");
var users_1 = require("./routes/users");
var morgan_1 = require("morgan");
var http_errors_1 = require("http-errors");
var express_session_1 = require("express-session");
var validateEnv_1 = require("./util/validateEnv");
var connect_mongo_1 = require("connect-mongo");
var auth_1 = require("./middleware/auth");
var cors_1 = require("cors");
var app = (0, express_1["default"])();
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.use((0, express_session_1["default"])({
    secret: validateEnv_1["default"].SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store: connect_mongo_1["default"].create({
        mongoUrl: validateEnv_1["default"].MONGO_CONNECTION_STRING
    })
}));
app.use("/api/users", users_1["default"]);
app.use("/api/notes", auth_1["default"], notes_1["default"]);
app.use(function (req, res, next) {
    next((0, http_errors_1["default"])(404, "Endpoint not found"));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (error, req, res, next) {
    console.error(error);
    var errorMessage = "An unknown error occurred";
    var statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
exports["default"] = app;

"use strict";

var app_1 = require("./src/app");
var validateEnv_1 = require("./src/util/validateEnv");
var mongoose_1 = require("mongoose");
var port = validateEnv_1["default"].PORT;
mongoose_1["default"]
    .connect(validateEnv_1["default"].MONGO_CONNECTION_STRING)
    .then(function () {
    console.log("Mongoose connected");
    app_1["default"].listen(port, function () {
        console.log("Server running on port: " + port);
    });
})["catch"](console.error);

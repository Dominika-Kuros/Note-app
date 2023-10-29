"use strict";

import app_1 from "./src/app";
import validateEnv_1 from "./src/util/validateEnv";
import mongoose_1 from "mongoose";
var port = validateEnv_1["default"].PORT;
mongoose_1["default"]
    .connect(validateEnv_1["default"].MONGO_CONNECTION_STRING)
    .then(function () {
    console.log("Mongoose connected");
    app_1["default"].listen(port, function () {
        console.log("Server running on port: " + port);
    });
})["catch"](console.error);

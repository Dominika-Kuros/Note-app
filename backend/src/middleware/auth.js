"use strict";
exports.__esModule = true;
var http_errors_1 = require("http-errors");
var requiresAuth = function (req, res, next) {
    if (req.session.userId) {
        next();
    }
    else {
        next((0, http_errors_1["default"])(401, "User not authenticated"));
    }
};
exports["default"] = requiresAuth;

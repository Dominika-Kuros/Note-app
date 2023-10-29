"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.logout = exports.login = exports.signUp = exports.getAuthenticatedUser = void 0;
var http_errors_1 = require("http-errors");
var user_1 = require("../models/user");
var bcrypt_1 = require("bcrypt");
var getAuthenticatedUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1["default"].findById(req.session.userId).select("+email").exec()];
            case 1:
                user = _a.sent();
                res.status(200).json(user);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAuthenticatedUser = getAuthenticatedUser;
var signUp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, email, passwordRaw, existingUsername, existingEmail, passwordHashed, newUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                email = req.body.email;
                passwordRaw = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!username || !email || !passwordRaw) {
                    throw (0, http_errors_1["default"])(400, "Parameters missing");
                }
                return [4 /*yield*/, user_1["default"].findOne({ username: username }).exec()];
            case 2:
                existingUsername = _a.sent();
                if (existingUsername) {
                    throw (0, http_errors_1["default"])(409, "Username already taken. Please choose a different one or log in instead.");
                }
                return [4 /*yield*/, user_1["default"].findOne({ email: email }).exec()];
            case 3:
                existingEmail = _a.sent();
                if (existingEmail) {
                    throw (0, http_errors_1["default"])(409, "A user with this email address already exists. Please log in instead.");
                }
                return [4 /*yield*/, bcrypt_1["default"].hash(passwordRaw, 10)];
            case 4:
                passwordHashed = _a.sent();
                return [4 /*yield*/, user_1["default"].create({
                        username: username,
                        email: email,
                        password: passwordHashed
                    })];
            case 5:
                newUser = _a.sent();
                req.session.userId = newUser._id;
                res.status(201).json(newUser);
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, user, passwordMatch, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!username || !password) {
                    throw (0, http_errors_1["default"])(400, "Parameters missing");
                }
                return [4 /*yield*/, user_1["default"].findOne({ username: username }).select("+password +email").exec()];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw (0, http_errors_1["default"])(401, "Invalid credentials");
                }
                return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
            case 3:
                passwordMatch = _a.sent();
                if (!passwordMatch) {
                    throw (0, http_errors_1["default"])(401, "Invalid credentials");
                }
                req.session.userId = user._id;
                res.status(201).json(user);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res, next) {
    req.session.destroy(function (error) {
        if (error) {
            next(error);
        }
        else {
            res.sendStatus(200);
        }
    });
};
exports.logout = logout;

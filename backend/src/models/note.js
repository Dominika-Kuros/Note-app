"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var noteSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Note", noteSchema);

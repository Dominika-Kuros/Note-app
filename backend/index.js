"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = await require("./backend/dist/src/app");
const validateEnv_1 = await require("./backend/dist/src/util/validateEnv");
const mongoose_1 = await require("mongoose");
const port = validateEnv_1.default.PORT;
mongoose_1.default
  .connect(validateEnv_1.default.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app_1.default.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch(console.error);

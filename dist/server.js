"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', express_1.default.static(__dirname + '/../public_static'));
app.use('/', index_1.default);
let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("server running");
});

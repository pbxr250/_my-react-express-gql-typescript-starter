"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var test_1 = __importDefault(require("./test"));
var router = express_1.Router();
router.use('/test', test_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.dbg = void 0;
var debug_1 = __importDefault(require("debug"));
var fs_1 = __importDefault(require("fs"));
var winston_1 = __importDefault(require("winston"));
var PATHS = {
    LOG: process.cwd() + "/logs",
    LOG_ERROR: process.cwd() + "/logs/_error.log",
    LOG_INFO: process.cwd() + "/logs/_info.log",
};
// ensure log directory exists
(function () { return fs_1.default.existsSync(PATHS.LOG) || fs_1.default.mkdirSync(PATHS.LOG); })();
exports.dbg = debug_1.default('express:server');
exports.logger = winston_1.default.createLogger({
    exitOnError: false,
    format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.simple()),
    transports: [
        new winston_1.default.transports.File({
            filename: PATHS.LOG_INFO,
            handleExceptions: true,
            level: 'info',
            maxFiles: 2,
            maxsize: 5242880, // 5MB
        }),
        new winston_1.default.transports.File({
            filename: PATHS.LOG_ERROR,
            handleExceptions: true,
            level: 'error',
            maxFiles: 2,
            maxsize: 5242880, // 5MB
        }),
        new winston_1.default.transports.Console({
            handleExceptions: true,
            level: 'debug',
        }),
    ],
});
//# sourceMappingURL=logger.js.map
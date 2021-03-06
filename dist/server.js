"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var GraphQLServer = require("graphql-yoga").GraphQLServer;
var cors_1 = __importDefault(require("cors"));
var http_status_codes_1 = require("http-status-codes");
var services_1 = require("./services");
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
var schema_1 = require("./graphql/schema");
var server = new GraphQLServer({ typeDefs: schema_1.typeDefs, resolvers: schema_1.resolvers });
server.express.use(morgan_1.default('tiny', {
    stream: {
        write: function (message) { return services_1.logger.info(message.trim()); },
    },
}));
server.express.use(cors_1.default());
server.express.use(express_1.default.json());
server.express.use(express_1.default.urlencoded({ extended: true }));
server.express.get("/", function (req, res) {
    res.status(200).send("Hello World!");
});
server.express.use(routes_1.default);
// error handler
server.express.use(function (err, req, res, next) {
    services_1.logger.log({
        level: 'debug',
        message: err.message
    });
    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
        error: err.message,
    });
});
var options = {
    port: process.env.PORT || '3100',
    endpoint: '/graphql',
    playground: '/playground',
};
server.start(options, function () {
    services_1.logger.log({
        level: 'debug',
        message: 'Server Started at Port: 3100'
    });
});
exports.default = server;
//# sourceMappingURL=server.js.map
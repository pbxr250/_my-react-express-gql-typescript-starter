"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var sampleItems = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Orange' },
    { name: 'Melon' },
];
exports.typeDefs = "\ntype Query {\n    items: [Item!]!\n}\ntype Item {\n    name: String!\n}\n";
exports.resolvers = {
    Query: {
        items: function () { return sampleItems; },
    },
};
//# sourceMappingURL=schema.js.map
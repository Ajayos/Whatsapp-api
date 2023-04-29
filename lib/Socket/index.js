"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const business_1 = require("./business");
const makeWASocket = (config) => ((0, business_1.makeBusinessSocket)({
    ...Base_1.DEFAULT_CONNECTION_CONFIG,
    ...config
}));
exports.default = makeWASocket;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const registration_1 = require("./registration");
// export the last socket layer
const makeWASocket = (config) => (0, registration_1.makeRegistrationSocket)({
    ...Base_1.DEFAULT_CONNECTION_CONFIG,
    ...config,
});
exports.default = makeWASocket;

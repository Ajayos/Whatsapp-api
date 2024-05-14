"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketClient = void 0;
const ws_1 = __importDefault(require("ws"));
const abstract_socket_client_1 = require("./abstract-socket-client");
class WebSocketClient extends abstract_socket_client_1.AbstractSocketClient {
    constructor() {
        super(...arguments);
        this.socket = null;
    }
    get isOpen() {
        var _a;
        return ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.readyState) === ws_1.default.OPEN;
    }
    get isClosed() {
        var _a;
        return this.socket === null || ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.readyState) === ws_1.default.CLOSED;
    }
    get isClosing() {
        var _a;
        return (this.socket === null || ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.readyState) === ws_1.default.CLOSING);
    }
    get isConnecting() {
        var _a;
        return ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.readyState) === ws_1.default.CONNECTING;
    }
    async connect() {
        var _a;
        if (this.socket) {
            return;
        }
        this.socket = new ws_1.default(this.url, {
            origin: 'https://web.whatsapp.com',
            headers: {},
            handshakeTimeout: 20000,
            timeout: 20000,
            agent: undefined,
        });
        this.socket.setMaxListeners(0);
        const events = [
            'close',
            'error',
            'upgrade',
            'message',
            'open',
            'ping',
            'pong',
            'unexpected-response',
        ];
        for (const event of events) {
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.on(event, (...args) => this.emit(event, ...args));
        }
    }
    async close() {
        if (!this.socket) {
            return;
        }
        this.socket.close();
        this.socket = null;
    }
    send(str, cb) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(str, cb);
        return Boolean(this.socket);
    }
}
exports.WebSocketClient = WebSocketClient;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSocketClient = void 0;
const events_1 = require("events");
class AbstractSocketClient extends events_1.EventEmitter {
  constructor(url) {
    super();
    this.url = url;
    this.setMaxListeners(0);
  }
}
exports.AbstractSocketClient = AbstractSocketClient;

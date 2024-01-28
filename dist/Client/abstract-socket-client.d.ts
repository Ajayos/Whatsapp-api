/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from "events";
import { URL } from "url";
export declare abstract class AbstractSocketClient extends EventEmitter {
    url: URL;
    abstract get isOpen(): boolean;
    abstract get isClosed(): boolean;
    abstract get isClosing(): boolean;
    abstract get isConnecting(): boolean;
    constructor(url: URL);
    abstract connect(): Promise<void>;
    abstract close(): Promise<void>;
    abstract send(str: Uint8Array | string, cb?: (err?: Error) => void): boolean;
}

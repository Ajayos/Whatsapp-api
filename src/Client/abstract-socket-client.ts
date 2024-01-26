import { EventEmitter } from 'events'
import { URL } from 'url'

export abstract class AbstractSocketClient extends EventEmitter {
  abstract get isOpen(): boolean;
  abstract get isClosed(): boolean;
  abstract get isClosing(): boolean;
  abstract get isConnecting(): boolean;

  constructor(public url: URL) {
  	super()
  	this.setMaxListeners(0)
  }

  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
  abstract send(str: Uint8Array | string, cb?: (err?: Error) => void): boolean;
}

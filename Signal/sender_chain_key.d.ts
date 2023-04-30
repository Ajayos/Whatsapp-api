export = SenderChainKey;
declare class SenderChainKey {
    constructor(iteration: any, chainKey: any);
    MESSAGE_KEY_SEED: Buffer;
    CHAIN_KEY_SEED: Buffer;
    iteration: number;
    chainKey: Buffer;
    getIteration(): number;
    getSenderMessageKey(): SenderMessageKey;
    getNext(): SenderChainKey;
    getSeed(): Buffer;
    getDerivative(seed: any, key: any): any;
}
import SenderMessageKey = require("./sender_message_key");

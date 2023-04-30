const SenderMessageKey = require('./sender_message_key');
//const HKDF = require('./hkdf');
const crypto = require('@ajayos/libsignal/src/crypto');
class SenderChainKey {
    constructor(iteration, chainKey) {
        this.MESSAGE_KEY_SEED = Buffer.from([0x01]);
        this.CHAIN_KEY_SEED = Buffer.from([0x02]);
        this.iteration = 0;
        this.chainKey = Buffer.alloc(0);
        this.iteration = iteration;
        this.chainKey = chainKey;
    }
    getIteration() {
        return this.iteration;
    }
    getSenderMessageKey() {
        return new SenderMessageKey(this.iteration, this.getDerivative(this.MESSAGE_KEY_SEED, this.chainKey));
    }
    getNext() {
        return new SenderChainKey(this.iteration + 1, this.getDerivative(this.CHAIN_KEY_SEED, this.chainKey));
    }
    getSeed() {
        return typeof this.chainKey === 'string' ? Buffer.from(this.chainKey, 'base64') : this.chainKey;
    }
    getDerivative(seed, key) {
        key = typeof key === 'string' ? Buffer.from(key, 'base64') : key;
        const hash = crypto.calculateMAC(key, seed);
        //const hash = new Hash().hmac_hash(key, seed, 'sha256', '');
        return hash;
    }
}
module.exports = SenderChainKey;

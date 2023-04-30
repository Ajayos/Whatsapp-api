export = SenderKeyMessage;
declare class SenderKeyMessage extends CiphertextMessage {
    constructor(keyId?: null, iteration?: null, ciphertext?: null, signatureKey?: null, serialized?: null);
    SIGNATURE_LENGTH: number;
    serialized: Buffer;
    messageVersion: number;
    keyId: any;
    iteration: any;
    ciphertext: any;
    signature: any;
    getKeyId(): any;
    getIteration(): any;
    getCipherText(): any;
    verifySignature(signatureKey: any): void;
    getSignature(signatureKey: any, serialized: any): Buffer;
    serialize(): Buffer;
    getType(): number;
}
import CiphertextMessage = require("./ciphertext_message");

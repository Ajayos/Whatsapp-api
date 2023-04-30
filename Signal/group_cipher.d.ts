export = GroupCipher;
declare class GroupCipher {
    constructor(senderKeyStore: any, senderKeyName: any);
    senderKeyStore: any;
    senderKeyName: any;
    encrypt(paddedPlaintext: any): Promise<Buffer>;
    decrypt(senderKeyMessageBytes: any): Promise<any>;
    getSenderKey(senderKeyState: any, iteration: any): any;
    getPlainText(iv: any, key: any, ciphertext: any): any;
    getCipherText(iv: any, key: any, plaintext: any): any;
}

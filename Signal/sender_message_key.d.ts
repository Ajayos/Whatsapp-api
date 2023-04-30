export = SenderMessageKey;
declare class SenderMessageKey {
    constructor(iteration: any, seed: any);
    iteration: number;
    iv: Buffer;
    cipherKey: Buffer;
    seed: Buffer;
    getIteration(): number;
    getIv(): Buffer;
    getCipherKey(): Buffer;
    getSeed(): Buffer;
}

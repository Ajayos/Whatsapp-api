import { BinaryNode } from "../Binary";
import { proto } from "../Proto";
import type { AuthenticationCreds, SignalCreds, SocketConfig } from "../Types";
export declare const generateMobileNode: (config: SocketConfig) => proto.IClientPayload;
export declare const generateLoginNode: (userJid: string, config: SocketConfig) => proto.IClientPayload;
export declare const generateRegistrationNode: ({ registrationId, signedPreKey, signedIdentityKey }: SignalCreds, config: SocketConfig) => proto.ClientPayload;
export declare const configureSuccessfulPairing: (stanza: BinaryNode, { advSecretKey, signedIdentityKey, signalIdentities, }: Pick<AuthenticationCreds, "advSecretKey" | "signedIdentityKey" | "signalIdentities">) => {
    creds: Partial<AuthenticationCreds>;
    reply: BinaryNode;
};
export declare const encodeSignedDeviceIdentity: (account: proto.IADVSignedDeviceIdentity, includeSignatureKey: boolean) => Uint8Array;

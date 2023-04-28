/// <reference types="node" />
/// <reference types="node" />
import { AxiosRequestConfig } from 'axios';
import type { Agent } from 'https';
import type { Logger } from 'pino';
import type { URL } from 'url';
import { proto } from '../Proto';
import { AuthenticationState, SignalAuthState, TransactionCapabilityOptions } from './Auth';
import { MediaConnInfo } from './Message';
import { SignalRepository } from './Signal';
export declare type WAVersion = [number, number, number];
export declare type WABrowserDescription = [string, string, string];
export declare type CacheStore = {
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T): void;
    del(key: string): void;
    flushAll(): void;
};
export declare type SocketConfig = {
    waWebSocketUrl: string | URL;
    connectTimeoutMs: number;
    defaultQueryTimeoutMs: number | undefined;
    keepAliveIntervalMs: number;
    agent?: Agent;
    logger: Logger;
    version: WAVersion;
    browser: WABrowserDescription;
    fetchAgent?: Agent;
    printQRInTerminal: boolean;
    emitOwnEvents: boolean;
    customUploadHosts: MediaConnInfo['hosts'];
    retryRequestDelayMs: number;
    qrTimeout?: number;
    auth: AuthenticationState;
    shouldSyncHistoryMessage: (msg: proto.Message.IHistorySyncNotification) => boolean;
    transactionOpts: TransactionCapabilityOptions;
    markOnlineOnConnect: boolean;
    mediaCache?: CacheStore;
    /**
     * map to store the retry counts for failed messages;
     * used to determine whether to retry a message or not */
    msgRetryCounterCache?: CacheStore;
    /** provide a cache to store a user's device list */
    userDevicesCache?: CacheStore;
    /** cache to store call offers */
    callOfferCache?: CacheStore;
    /** width for link preview images */
    linkPreviewImageThumbnailWidth: number;
    /** Should Keerthana ask the phone for full history, will be received async */
    syncFullHistory: boolean;
    /** Should Keerthana fire init queries automatically, default true */
    fireInitQueries: boolean;
    /**
     * generate a high quality link preview,
     * entails uploading the jpegThumbnail to WA
     * */
    generateHighQualityLinkPreview: boolean;
    /**
     * Returns if a jid should be ignored,
     * no event for that jid will be triggered.
     * Messages from that jid will also not be decrypted
     * */
    shouldIgnoreJid: (jid: string) => boolean | undefined;
    /**
     * Optionally patch the message before sending out
     * */
    patchMessageBeforeSending: (msg: proto.IMessage, recipientJids: string[]) => Promise<proto.IMessage> | proto.IMessage;
    /** verify app state MACs */
    appStateMacVerification: {
        patch: boolean;
        snapshot: boolean;
    };
    options: AxiosRequestConfig<{}>;
    /**
     * fetch a message from your store
     * implement this so that messages failed to send
     * (solves the "this message can take a while" issue) can be retried
     * */
    getMessage: (key: proto.IMessageKey) => Promise<proto.IMessage | undefined>;
    makeSignalRepository: (auth: SignalAuthState) => SignalRepository;
};

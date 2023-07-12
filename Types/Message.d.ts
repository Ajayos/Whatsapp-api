/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { AxiosRequestConfig } from 'axios';
import type { Logger } from 'pino';
import type { Readable } from 'stream';
import type { URL } from 'url';
import { proto } from '../Proto';
import { MEDIA_HKDF_KEY_MAPPING } from '../Base';
import type { GroupMetadata } from './GroupMetadata';
import { CacheStore } from './Socket';
export { proto as WAProto };
export type WAMessage = proto.IWebMessageInfo;
export type WAMessageContent = proto.IMessage;
export type WAContactMessage = proto.Message.IContactMessage;
export type WAContactsArrayMessage = proto.Message.IContactsArrayMessage;
export type WAMessageKey = proto.IMessageKey;
export type WATextMessage = proto.Message.IExtendedTextMessage;
export type WAContextInfo = proto.IContextInfo;
export type WALocationMessage = proto.Message.ILocationMessage;
export type WAGenericMediaMessage = proto.Message.IVideoMessage | proto.Message.IImageMessage | proto.Message.IAudioMessage | proto.Message.IDocumentMessage | proto.Message.IStickerMessage;
export import WAMessageStubType = proto.WebMessageInfo.StubType;
export import WAMessageStatus = proto.WebMessageInfo.Status;
export type WAMediaUpload = Buffer | {
    url: URL | string;
} | {
    stream: Readable;
};
/** Set of message types that are supported by the library */
export type MessageType = keyof proto.Message;
export type DownloadableMessage = {
    mediaKey?: Uint8Array | null;
    directPath?: string | null;
    url?: string | null;
};
export type MessageReceiptType = 'read' | 'read-self' | 'hist_sync' | 'peer_msg' | 'sender' | 'inactive' | 'played' | undefined;
export type MediaConnInfo = {
    auth: string;
    ttl: number;
    hosts: {
        hostname: string;
        maxContentLengthBytes: number;
    }[];
    fetchDate: Date;
};
export interface WAUrlInfo {
    'canonical-url': string;
    'matched-text': string;
    title: string;
    description?: string;
    jpegThumbnail?: Buffer;
    highQualityThumbnail?: proto.Message.IImageMessage;
    originalThumbnailUrl?: string;
}
type Mentionable = {
    mentions?: string[];
};
type Editable = {
    edit?: WAMessageKey;
};
type Contextable = {
    contextInfo?: proto.IContextInfo;
};
type ViewOnce = {
    viewOnce?: boolean;
};
type Buttonable = {
    buttons?: proto.Message.ButtonsMessage.IButton[];
};
type Templatable = {
    templateButtons?: proto.IHydratedTemplateButton[];
    footer?: string;
};
type Listable = {
    sections?: proto.Message.ListMessage.ISection[];
    title?: string;
    buttonText?: string;
};
type WithDimensions = {
    width?: number;
    height?: number;
};
export type PollMessageOptions = {
    name: string;
    selectableCount?: number;
    values: Array<string>;
    /** 32 byte message secret to encrypt poll selections */
    messageSecret?: Uint8Array;
};
export type MediaType = keyof typeof MEDIA_HKDF_KEY_MAPPING;
export type AnyMediaMessageContent = (({
    image: WAMediaUpload;
    caption?: string;
    jpegThumbnail?: string;
} & Contextable & Mentionable & Buttonable & Templatable & WithDimensions) | ({
    video: WAMediaUpload;
    caption?: string;
    gifPlayback?: boolean;
    jpegThumbnail?: string;
} & Contextable & Mentionable & Buttonable & Templatable & WithDimensions) | {
    audio: WAMediaUpload;
    ptt?: boolean;
    seconds?: number;
} | ({
    sticker: WAMediaUpload;
    isAnimated?: boolean;
} & WithDimensions & Contextable) | ({
    document: WAMediaUpload;
    mimetype: string;
    fileName?: string;
    caption?: string;
} & Contextable & Buttonable & Templatable)) & {
    mimetype?: string;
} & Editable;
export type ButtonReplyInfo = {
    displayText: string;
    id: string;
    index: number;
};
export type WASendableProduct = Omit<proto.Message.ProductMessage.IProductSnapshot, 'productImage'> & {
    productImage: WAMediaUpload;
};
export type AnyRegularMessageContent = (({
    text: string;
    linkPreview?: WAUrlInfo | null;
} & Contextable & Mentionable & Buttonable & Templatable & Listable & Editable) | AnyMediaMessageContent | ({
    poll: PollMessageOptions;
} & Contextable & Mentionable & Buttonable & Templatable & Editable) | {
    contacts: {
        displayName?: string;
        contacts: proto.Message.IContactMessage[];
    };
} | {
    location: WALocationMessage;
} | {
    react: proto.Message.IReactionMessage;
} | {
    buttonReply: ButtonReplyInfo;
    type: 'template' | 'plain';
} | {
    listReply: Omit<proto.Message.IListResponseMessage, 'contextInfo'>;
} | {
    product: WASendableProduct;
    businessOwnerJid?: string;
    body?: string;
    footer?: string;
}) & ViewOnce & Contextable & Editable;
export type AnyMessageContent = AnyRegularMessageContent | {
    forward: WAMessage;
    force?: boolean;
} | {
    delete: WAMessageKey;
} | {
    disappearingMessagesInChat: boolean | number;
};
export type GroupMetadataParticipants = Pick<GroupMetadata, 'participants'>;
type MinimalRelayOptions = {
    messageId?: string;
    cachedGroupMetadata?: (jid: string) => Promise<GroupMetadataParticipants | undefined>;
};
export type MessageRelayOptions = MinimalRelayOptions & {
    participant?: {
        jid: string;
        count: number;
    };
    additionalAttributes?: {
        [_: string]: string;
    };
    useUserDevicesCache?: boolean;
};
export type MiscMessageGenerationOptions = MinimalRelayOptions & {
    timestamp?: Date;
    quoted?: WAMessage;
    ephemeralExpiration?: number | string;
    mediaUploadTimeoutMs?: number;
};
export type MessageGenerationOptionsFromContent = MiscMessageGenerationOptions & {
    userJid: string;
};
export type WAMediaUploadFunction = (readStream: Readable, opts: {
    fileEncSha256B64: string;
    mediaType: MediaType;
    timeoutMs?: number;
}) => Promise<{
    mediaUrl: string;
    directPath: string;
}>;
export type MediaGenerationOptions = {
    logger?: Logger;
    mediaTypeOverride?: MediaType;
    upload: WAMediaUploadFunction;
    mediaCache?: CacheStore;
    mediaUploadTimeoutMs?: number;
    options?: AxiosRequestConfig;
};
export type MessageContentGenerationOptions = MediaGenerationOptions & {
    getUrlInfo?: (text: string) => Promise<WAUrlInfo | undefined>;
};
export type MessageGenerationOptions = MessageContentGenerationOptions & MessageGenerationOptionsFromContent;
/**
 * Type of message upsert
 * 1. notify => notify the user, this message was just received
 * 2. append => append the message to the chat history, no notification required
 */
export type MessageUpsertType = 'append' | 'notify';
export type MessageUserReceipt = proto.IUserReceipt;
export type WAMessageUpdate = {
    update: Partial<WAMessage>;
    key: proto.IMessageKey;
};
export type WAMessageCursor = {
    before: WAMessageKey | undefined;
} | {
    after: WAMessageKey | undefined;
};
export type MessageUserReceiptUpdate = {
    key: proto.IMessageKey;
    receipt: MessageUserReceipt;
};
export type MediaDecryptionKeyInfo = {
    iv: Buffer;
    cipherKey: Buffer;
    macKey?: Buffer;
};
export type MinimalMessage = Pick<proto.IWebMessageInfo, 'key' | 'messageTimestamp'>;

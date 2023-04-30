import type { proto } from '../Proto';
import type { AccountSettings } from './Auth';
import type { BufferedEventData } from './Events';
import type { MinimalMessage } from './Message';
export declare type WAPresence = 'unavailable' | 'available' | 'composing' | 'recording' | 'paused';
export declare type WAPrivacyValue = 'all' | 'contacts' | 'contact_blacklist' | 'none';
export declare type WAPrivacyOnlineValue = 'all' | 'match_last_seen';
export declare type WAReadReceiptsValue = 'all' | 'none';
export declare const ALL_WA_PATCH_NAMES: readonly ["critical_block", "critical_unblock_low", "regular_high", "regular_low", "regular"];
export declare type WAPatchName = typeof ALL_WA_PATCH_NAMES[number];
export interface PresenceData {
    lastKnownPresence: WAPresence;
    lastSeen?: number;
}
export declare type ChatMutation = {
    syncAction: proto.ISyncActionData;
    index: string[];
};
export declare type WAPatchCreate = {
    syncAction: proto.ISyncActionValue;
    index: string[];
    type: WAPatchName;
    apiVersion: number;
    operation: proto.SyncdMutation.SyncdOperation;
};
export declare type Chat = proto.IConversation & {
    lastMessageRecvTimestamp?: number;
};
export declare type ChatUpdate = Partial<Chat & {
    /**
     * if specified in the update,
     * the EV buffer will check if the condition gets fulfilled before applying the update
     * Right now, used to determine when to release an app state sync event
     *
     * @returns true, if the update should be applied;
     * false if it can be discarded;
     * undefined if the condition is not yet fulfilled
     * */
    conditional: (bufferedData: BufferedEventData) => boolean | undefined;
}>;
/**
 * the last messages in a chat, sorted reverse-chronologically. That is, the latest message should be first in the chat
 * for MD modifications, the last message in the array (i.e. the earlist message) must be the last message recv in the chat
 * */
export declare type LastMessageList = MinimalMessage[] | proto.SyncActionValue.ISyncActionMessageRange;
export declare type ChatModification = {
    archive: boolean;
    lastMessages: LastMessageList;
} | {
    pushNameSetting: string;
} | {
    pin: boolean;
} | {
    mute: number | null;
} | {
    clear: 'all' | {
        messages: {
            id: string;
            fromMe?: boolean;
            timestamp: number;
        }[];
    };
} | {
    star: {
        messages: {
            id: string;
            fromMe?: boolean;
        }[];
        star: boolean;
    };
} | {
    markRead: boolean;
    lastMessages: LastMessageList;
} | {
    delete: true;
    lastMessages: LastMessageList;
};
export declare type InitialReceivedChatsState = {
    [jid: string]: {
        lastMsgRecvTimestamp?: number;
        lastMsgTimestamp: number;
    };
};
export declare type InitialAppStateSyncOptions = {
    accountSettings: AccountSettings;
};

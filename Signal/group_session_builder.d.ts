export = GroupSessionBuilder;
declare class GroupSessionBuilder {
    constructor(senderKeyStore: any);
    senderKeyStore: any;
    process(senderKeyName: any, senderKeyDistributionMessage: any): Promise<void>;
    create(senderKeyName: any): Promise<SenderKeyDistributionMessage>;
}
import SenderKeyDistributionMessage = require("./sender_key_distribution_message");

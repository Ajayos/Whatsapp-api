export = SenderKeyName;
/**
 * 将js页面的number类型转换为java的int类型
 * @param num
 * @return intValue
 */
declare class SenderKeyName {
    constructor(groupId: any, sender: any);
    groupId: any;
    sender: any;
    getGroupId(): any;
    getSender(): any;
    serialize(): string;
    toString(): string;
    equals(other: any): boolean;
    hashCode(): number;
}

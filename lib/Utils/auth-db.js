"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDBAuthState = void 0;
const Proto_1 = require("../Proto");
const auth_utils_1 = require("./auth-utils");
const generics_1 = require("./generics");
const nodedb_1 = require("@ajayos/nodedb");
const useDBAuthState = async () => {
    const writeData = (data, file) => {
        return (0, nodedb_1.setDATA)('Authentication', file, JSON.stringify(data, generics_1.BufferJSON.replacer));
    };
    const readData = async (file) => {
        try {
            const data_ = await (0, nodedb_1.getDATA)('Authentication', file);
            const data = JSON.parse(data_, generics_1.BufferJSON.reviver);
            return data;
        }
        catch (error) {
            return null;
        }
    };
    const removeData = async (file) => {
        try {
            return await (0, nodedb_1.deleteDATA)('Authentication', file);
        }
        catch (_a) {
            return false;
        }
    };
    const fixFileName = (file) => { var _a; return (_a = file === null || file === void 0 ? void 0 : file.replace(/\//g, '__')) === null || _a === void 0 ? void 0 : _a.replace(/:/g, '-'); };
    const creds = await readData('keerthana') || (0, auth_utils_1.initAuthCreds)();
    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    await Promise.all(ids.map(async (id) => {
                        let value = await readData(`${type}-${id}`);
                        if (type === 'app-state-sync-key' && value) {
                            value = Proto_1.proto.Message.AppStateSyncKeyData.fromObject(value);
                        }
                        data[id] = value;
                    }));
                    return data;
                },
                set: async (data) => {
                    const tasks = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];
                            const file = `${category}-${id}`;
                            if (value) {
                                tasks.push(writeData(value, file));
                            }
                            else {
                                tasks.push(removeData(file));
                            }
                        }
                    }
                    await Promise.all(tasks);
                }
            }
        },
        saveCreds: () => {
            return writeData(creds, 'keerthana');
        }
    };
};
exports.useDBAuthState = useDBAuthState;

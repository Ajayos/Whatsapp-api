import makeWASocket from "./Socket";

export * from "./Proto";
export * from "./Utils";
export * from "./Types";
export * from "./Base";
export * from "./Binary";

export type WASocket = ReturnType<typeof makeWASocket>;
export { makeWASocket };
export default makeWASocket;

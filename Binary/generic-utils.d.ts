/// <reference types="node" />
import { proto } from '../Proto';
import { BinaryNode } from './types';
export declare const getBinaryNodeChildren: (node: BinaryNode | undefined, childTag: string) => any[];
export declare const getAllBinaryNodeChildren: ({ content }: BinaryNode) => any[];
export declare const getBinaryNodeChild: (node: BinaryNode | undefined, childTag: string) => any;
export declare const getBinaryNodeChildBuffer: (node: BinaryNode | undefined, childTag: string) => Uint8Array | Buffer | undefined;
export declare const getBinaryNodeChildString: (node: BinaryNode | undefined, childTag: string) => string | undefined;
export declare const getBinaryNodeChildUInt: (node: BinaryNode, childTag: string, length: number) => number | undefined;
export declare const assertNodeErrorFree: (node: BinaryNode) => void;
export declare const reduceBinaryNodeToDictionary: (node: BinaryNode, tag: string) => any;
export declare const getBinaryNodeMessages: ({ content }: BinaryNode) => proto.WebMessageInfo[];
export declare function binaryNodeToString(node: BinaryNode | BinaryNode['content'], i?: number): any;

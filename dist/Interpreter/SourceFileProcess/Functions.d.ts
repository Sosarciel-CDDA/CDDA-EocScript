import { KindToNodeMappings, SyntaxKind, Node } from "ts-morph";
export declare function checkKind<TKind extends SyntaxKind>(node: Node, kind: TKind, message?: string): asserts node is KindToNodeMappings[TKind];
export declare function throwLog(node: Node, message?: string): string;
export declare function logKind(node: Node): void;

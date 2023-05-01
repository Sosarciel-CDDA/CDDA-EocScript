import { Node } from "ts-morph";
import { JToken } from "Utils";
import { SourceFileData } from "../Interfaces";
import { ProcessReturn } from "./NPInterfaces";
export declare function CodeBlockProcess(node: Node | Array<Node>, sfd: SourceFileData, blockId?: string, condition?: JToken): ProcessReturn;
export declare function ReturnProcess(node: Node, sfd: SourceFileData, blockId?: string): ProcessReturn;
export default CodeBlockProcess;

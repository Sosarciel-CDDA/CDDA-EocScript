import { Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ProcessReturn } from "../NPInterfaces";
import { ExpProcessReturn } from "./EPInterface";
import { CodeBlock } from "../CodeBlock";
export declare function ExpressionProcess(this: CodeBlock, node: Node): ProcessReturn;
export declare function AutoExpProcess(node: Node, sfd: SourceFileData): ExpProcessReturn;

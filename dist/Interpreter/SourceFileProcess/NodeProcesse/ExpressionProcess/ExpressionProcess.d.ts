import { Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ProcessReturn } from "../NPInterfaces";
import { ExpProcessReturn } from "./EPInterface";
export declare function ExpStatementProcess(node: Node, sfd: SourceFileData): ProcessReturn;
export declare function ExpressionProcess(node: Node, sfd: SourceFileData): ExpProcessReturn;

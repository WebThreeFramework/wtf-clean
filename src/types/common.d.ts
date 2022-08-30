import { FunctionComponent } from "react";
import { WTComponentArguments } from "./component";
import { WTExternal_Component } from "./external";

export type WTComponent<T = WTComponentArguments> = WTExternal_Component<T>;
import { MTComponentType } from "types/app-common";
import { MTViewType } from "../WTView/types";

export interface WTControllerArguments {
    ViewerComponent: MTViewType,
    Controller: any;
    model?: any;
    as?: string;
}

export interface WTControllerTriggers {
    [key: MTControllerTriggerTypes]: MTControllerMethods
};

export interface WTControllerMethods {
    [key: string]: any
};

export enum WTControllerTriggerTypes {
    change,
    click
};

type WTMasterControllerType = (c: any, i?: any) => any;
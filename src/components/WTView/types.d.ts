import { ReactNode } from "react";
import { MTControllerMethods } from "../WTController/types";

export interface MTViewArguments {
    data: any;
    methods: MTControllerMethods;
}

export type MTViewType = (args: any) => any;
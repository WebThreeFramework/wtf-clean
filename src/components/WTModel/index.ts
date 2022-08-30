import { useEffect, useReducer, useState } from "react";
import { WTModelData } from "types/gateways/models";
import { WTModelResponse } from "./types";

export const MTModel = (initialData: WTModelData = <WTModelData>({})): WTModelResponse => {
    const [state, setState] = useState<WTModelData>(initialData);
    const generator = () => ({
        data: state,
        refreshData: refreshData
    })

    const refreshData = (incomingData: WTModelData) => {
        /* For use with formik values */
        setState(incomingData)
    }

    const [gateway, setGateway] = useState<WTModelResponse>(generator());
    useEffect(() => setGateway(generator()), [state])

    return gateway;
}
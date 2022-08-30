import { createContext, useContext, useEffect, useState } from "react";
import { WTComponent } from "types/common";
import { MTModel } from "../WTModel";
import MTView from "../WTView";
import { WTControllerArguments, WTControllerMethods, WTControllerTriggerTypes, WTMasterControllerType } from "./types";

const WTControllerContext = createContext({
    model: {},
    methods: {},
    attach: null,
    trigger: null,
    internalForceRefreshData: null
});

export const WTController: WTComponent<WTControllerArguments> = (props: WTControllerArguments) => {
    const { ViewerComponent, Controller, as, model: initialModel } = props;
    const useableController = Controller ? Controller : () => {};
    const state = WTMasterController(useableController, initialModel);
    const {methods, model, triggers} = state;

    return (
        <WTControllerContext.Provider value={state}>
            <MTView as={as}>
                <ViewerComponent
                    methods={methods}
                    data={model}
                />
            </MTView>
        </WTControllerContext.Provider>
    )
}

export const WTMasterController: WTMasterControllerType = (controller: any, incomingData: any = {}) => {
    const [methods, setMethods] = useState<WTControllerMethods>({});
    const [triggers, setTriggers] = useState<WTControllerMethods>({});
    const {data, refreshData} = MTModel(incomingData);

    const attach = (methodName: string, incomingMethod: any) => {
        const useableMethods = {...methods};

        useableMethods[methodName] = incomingMethod;
        setMethods(useableMethods)
    }

    const trigger = (triggerType: WTControllerTriggerTypes, incomingMethod: any) => {
        const useableTriggers = {...triggers};
        if(!useableTriggers[triggerType])
            useableTriggers[triggerType] = []

        useableTriggers[triggerType].push(incomingMethod);
        setTriggers(useableTriggers);
    }

    const internalForceRefreshData = (incomingData: any) => {
        refreshData(incomingData)
    }

    const [hookInterface, setHookInterface] = useState<any>({
        methods: {},
        attach: attach,
        trigger: trigger,
        model: data,
        internalForceRefreshData: internalForceRefreshData
    });

    useEffect(
        () => {
            /* Inefficiently run onChange */
            const runnableTriggers = triggers?.change;
            if(runnableTriggers && runnableTriggers.length)
                for(const index in runnableTriggers) {
                    const trigger = runnableTriggers[index];
                    trigger({
                        data: data
                    });
                }
        },
        [data]
    );

    useEffect(() => {
        setHookInterface({
            methods: {...methods},
            trigger: trigger,
            attach: attach,
            model: data,
            internalForceRefreshData: internalForceRefreshData
        })
    }, [methods, triggers, controller, incomingData, data])
    
    useEffect(() => controller({attach, trigger}), [controller])

    return hookInterface;
}

export const useController = (): {methods: any; attach: any; model: any; trigger: any; internalForceRefreshData: any;} => {
    const context = useContext(WTControllerContext);
    if(!context)
        throw new Error("Not in MTControllerContext")

    return context
}

export default WTController;
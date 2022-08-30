import { useController } from "components/WTController";
import { useFormikContext } from "formik";
import { ReactNode, useEffect } from "react";
import WTForm from "wrapper/WTForm";

const MTView = ({children, as}: {children: ReactNode; as?: string;}) => {
    let output = <>{children}</>;
    const {methods, model} = useController();

    switch(as) {
        case 'form':
            output = (
                <WTForm
                    submit={methods.submit}
                    initial={model}
                    values={model}
                >
                    <MTViewContainer>
                        {children}
                    </MTViewContainer>
                </WTForm>
            )
        break;
    }

    return output;
}

const MTViewContainer = ({children}: any) => {
    const {values} = useFormikContext();
    const controller = useController();

    useEffect(() => {
        const {internalForceRefreshData: refreshModel} = controller;
        refreshModel(values)
    }, [values]);

    return (
        <>
            {children}
        </>
    )
}

export default MTView;
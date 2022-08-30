import { WTExternal_FormComponent } from "constants/external";
import { WTComponent } from "types/common";

const WTForm: WTComponent<any> = ({initial, submit, children}: any) => {
    if(!initial) return null;

    const FormModule = WTExternal_FormComponent;

    return (
        <FormModule
            initialValues={initial}
            onSubmit={submit}
        >
            {children}
        </FormModule>
    )
}

export default WTForm;
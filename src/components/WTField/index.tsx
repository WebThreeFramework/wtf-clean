import { WTExternal_FieldComponent } from "constants/external";
import { WTComponent } from "types/common";
import { MTFieldArguments } from "./types";

const WTField: WTComponent<MTFieldArguments> = ({name}: MTFieldArguments) => {
    const FieldComponent = WTExternal_FieldComponent;

    return (
        <FieldComponent name={name} />
    )
}

export default WTField;
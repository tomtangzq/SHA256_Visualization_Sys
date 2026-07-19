import InputStep from "./steps/InputStep";
import AsciiStep from "./steps/AsciiStep";
import BinaryStep from "./steps/BinaryStep";

type Props = {
    currentStep: number;
    generatedInput: string;
};

function StepViewer({
    currentStep,
    generatedInput,
}: Props) {

    if (!generatedInput)
        return <p>Please enter a message first.</p>;

    switch (currentStep) {
        case 0:
            return <InputStep input={generatedInput} />;

        case 1:
            return <AsciiStep input={generatedInput} />;

        case 2:
            return <BinaryStep input={generatedInput} />;

        case 3:
            return <p>Padding Step</p>;

        default:
            return <p>Coming soon...</p>;
    }
}

export default StepViewer;
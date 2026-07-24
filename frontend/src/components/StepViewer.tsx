import InputStep from "./steps/InputStep";
import AsciiStep from "./steps/AsciiStep";
import BinaryStep from "./steps/BinaryStep";
import PaddingStep from "./steps/PaddingStep";
import MessageScheduleStep from "./steps/MessageScheduleStep";
import WordExpansionStep from "./steps/WordExpansionStep";
import CompressionStep from "./steps/CompressionStep";
import { binaryString } from "../utils/binary";
import { generateMessageSchedule } from "../utils/messageSchedule";
import { calculatePadding } from "../utils/padding";


type Props = {
    currentStep: number;
    generatedInput: string;

};

function StepViewer({
    currentStep,
    generatedInput,
}: Props) {

    const binary = binaryString(generatedInput);

    const padding = calculatePadding(binary);

    const words = generateMessageSchedule(padding.finalBlock512);

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
            return <PaddingStep input={generatedInput} />;

        case 4:
            return <MessageScheduleStep words={words} />;

        case 5:
            return <WordExpansionStep input={generatedInput} />;

        case 6:
            return <CompressionStep words={words} />;

        default:
            return <p>Coming soon...</p>;
    }
}

export default StepViewer;
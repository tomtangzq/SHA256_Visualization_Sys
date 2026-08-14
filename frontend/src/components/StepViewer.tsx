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
import FinalHashStep from "./steps/FinalHashStep";
import RotateAnimation from "./animation/RotateAnimation";
import HashStep from "./steps/HashStep";

type Props = {
    currentStep: number;
    generatedInput: string;
    selectedCharacterIndex: number | null;
    selectedPaddingStep: number;

    scheduleMode: "initial" | "expanded";
    selectedWord: number;

    compressionView: "overview" | "t1" | "t2" | "working";
};

function StepViewer({
    currentStep,
    generatedInput,
    selectedCharacterIndex,
    selectedPaddingStep,
    scheduleMode,
    selectedWord,
    compressionView,
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
            return (
                <AsciiStep
                    input={generatedInput}
                    selectedCharacterIndex={selectedCharacterIndex}
                />
            );

        case 2:
            return (
                <BinaryStep
                    input={generatedInput}
                    selectedCharacterIndex={selectedCharacterIndex}
                />
            );

        case 3:
            return <PaddingStep
                input={generatedInput}
                selectedPaddingStep={selectedPaddingStep}
            />

        case 4:
            return <MessageScheduleStep
                words={words}
                scheduleMode={scheduleMode}
                selectedWord={selectedWord}
            />

        case 5:
            return (
                <CompressionStep
                    words={words}
                    compressionView={compressionView}
                />
            );

        case 6:
            return <HashStep input={generatedInput} />;

        case 7:
            return <FinalHashStep input={generatedInput} />;

        default:
            return <p>Unknown Step</p>;
    }
}

export default StepViewer;
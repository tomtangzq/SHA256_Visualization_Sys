import { detailContent } from "./DetailContent";
import AsciiDetail from "./detail/CharacterSelector";


interface DetailPanelProps {
    currentStep: number;
    input: string;
    selectedCharacterIndex: number | null;
    onCharacterSelect: (index: number) => void;

    selectedPaddingStep: number;
    onPaddingStepSelect: (step: number) => void;
}


export default function DetailPanel({
    currentStep,
    input,
    selectedCharacterIndex,
    onCharacterSelect,
    selectedPaddingStep,
    onPaddingStepSelect,

}: DetailPanelProps) {
    const current = detailContent[currentStep];
    const totalSteps = detailContent.length;

    const paddingSteps = [
        "Original Binary",
        "Append '1'",
        "Append Zero Bits",
        "Final Result",
    ];

    return (
        <aside className="panel detail-panel">

            <h2>Step Details</h2>

            <div className="step-badge">
                Step {currentStep + 1} / {totalSteps}
            </div>

            <h3>{current.title}</h3>

            {(currentStep === 1 || currentStep === 2) && (
                <AsciiDetail
                    input={input}
                    selectedCharacterIndex={selectedCharacterIndex}
                    onCharacterSelect={onCharacterSelect}
                />
            )}

            {currentStep === 3 && (

                <div style={{ marginBottom: "20px" }}>

                    <h3>Padding Steps</h3>

                    {paddingSteps.map((step, index) => (

                        <button
                            key={index}
                            onClick={() => onPaddingStepSelect(index)}
                            style={{
                                display: "block",
                                width: "100%",
                                marginBottom: "8px",
                                padding: "10px",
                                cursor: "pointer",

                                background:
                                    selectedPaddingStep === index
                                        ? "#1976d2"
                                        : "#ffffff",

                                color:
                                    selectedPaddingStep === index
                                        ? "white"
                                        : "black",

                                border: "1px solid #ccc",

                                borderRadius: "6px",
                            }}
                        >
                            {step}
                        </button>

                    ))}

                </div>

            )}

            <div className="detail-section">
                <h4>Description</h4>
                <p>{current.description}</p>
            </div>

            <div className="detail-section">
                <h4>Learning Goal</h4>
                <p>{current.goal}</p>
            </div>

            <div className="detail-section">
                <h4>Key Information</h4>

                <ul>
                    {current.keyInformation.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="detail-section">
                <h4>Tips</h4>

                <ul>
                    {current.tips.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>



        </aside>
    );
}
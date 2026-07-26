import { detailContent } from "./DetailContent";
import AsciiDetail from "./detail/CharacterSelector";


interface DetailPanelProps {
    currentStep: number;
    input: string;
    selectedCharacterIndex: number | null;
    onCharacterSelect: (index: number) => void;
}


export default function DetailPanel({
    currentStep,
    input,
    selectedCharacterIndex,
    onCharacterSelect,
}: DetailPanelProps) {
    const current = detailContent[currentStep];
    const totalSteps = detailContent.length;

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
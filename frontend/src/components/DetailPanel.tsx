import { Weight } from "lucide-react";
import { detailContent } from "./DetailContent";
import AsciiDetail from "./detail/CharacterSelector";


interface DetailPanelProps {
    currentStep: number;
    input: string;
    selectedCharacterIndex: number | null;
    onCharacterSelect: (index: number) => void;

    selectedPaddingStep: number;
    onPaddingStepSelect: (step: number) => void;

    scheduleMode: "initial" | "expanded";

    onScheduleModeChange: (
        mode: "initial" | "expanded"
    ) => void;

    selectedWord: number;

    onSelectedWordChange: (
        word: number
    ) => void;

    compressionView:
    "t1" | "t2" | "working";

    onCompressionViewChange:
    (
        view: "t1" | "t2" | "working"
    ) => void;
}


export default function DetailPanel({
    currentStep,
    input,
    selectedCharacterIndex,
    onCharacterSelect,
    selectedPaddingStep,
    onPaddingStepSelect,
    scheduleMode,
    selectedWord,
    onScheduleModeChange,
    onSelectedWordChange,
    compressionView,
    onCompressionViewChange,

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

            {currentStep === 4 && (
                <div style={controlGroupStyle}>
                    <div style={controlStyle}>
                        <label style={labelStyle}>
                            Learning Mode
                        </label>

                        <select
                            style={selectStyle}
                            value={scheduleMode}
                            onChange={(e) => {
                                const mode = e.target.value as "initial" | "expanded";

                                onScheduleModeChange(mode);

                                if (mode === "initial") {
                                    onSelectedWordChange(0);
                                } else {
                                    onSelectedWordChange(16);
                                }
                            }}
                        >
                            <option value="initial">
                                Initial Words (W0–W15)
                            </option>

                            <option value="expanded">
                                Expanded Words (W16–W63)
                            </option>
                        </select>
                    </div>

                    <div style={controlStyle}>
                        <label style={labelStyle}>
                            Selected Word
                        </label>

                        <select
                            style={selectStyle}
                            value={selectedWord}
                            onChange={(e) =>
                                onSelectedWordChange(Number(e.target.value))
                            }
                        >
                            {(scheduleMode === "initial"
                                ? Array.from({ length: 16 }, (_, i) => i)
                                : Array.from({ length: 48 }, (_, i) => i + 16)
                            ).map((word) => (
                                <option
                                    key={word}
                                    value={word}
                                >
                                    W{word}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {currentStep === 5 && (

                <div style={controlGroupStyle}>

                    <button
                        style={{
                            ...compressionButtonStyle,
                            backgroundColor:
                                compressionView === "t1"
                                    ? "#1976d2"
                                    : "#ffffff",
                            color:
                                compressionView === "t1"
                                    ? "#ffffff"
                                    : "#171717",
                        }}
                        onClick={() =>
                            onCompressionViewChange("t1")
                        }
                    >
                        T1 Formula
                    </button>


                    <button
                        style={{
                            ...compressionButtonStyle,
                            backgroundColor:
                                compressionView === "t2"
                                    ? "#1976d2"
                                    : "#ffffff",
                            color:
                                compressionView === "t2"
                                    ? "#ffffff"
                                    : "#171717",
                        }}
                        onClick={() =>
                            onCompressionViewChange("t2")
                        }
                    >
                        T2 Formula
                    </button>


                    <button
                        style={{
                            ...compressionButtonStyle,
                            backgroundColor:
                                compressionView === "working"
                                    ? "#1976d2"
                                    : "#ffffff",
                            color:
                                compressionView === "working"
                                    ? "#ffffff"
                                    : "#171717",
                        }}
                        onClick={() =>
                            onCompressionViewChange("working")
                        }
                    >
                        Working Values
                    </button>

                </div>

            )}


            <div className="detail-section">
                <h4>Description</h4>
                <p style={pLable}>{current.description}</p>
            </div>

            <div className="detail-section">
                <h4>Learning Goal</h4>
                <p style={pLable}>{current.goal}</p>
            </div>


            <div className="detail-section">
                <h4>Tips</h4>

                <ul>
                    {current.tips.map((item) => (
                        <li style={pLable} key={item}>{item}</li>
                    ))}
                </ul>
            </div>



        </aside>
    );
}

const controlGroupStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
    marginBottom: "20px",
};

const controlStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
};

const labelStyle = {
    fontSize: "14px",
    fontWeight: 500,
};

const selectStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #4b5563",
    backgroundColor: "#2d2d2d",   // 深灰背景
    color: "#f9fafb",             // 白色文字
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
};

const pLable = {
    fontSize: "17px",
    Weight: "400"

}

const compressionButtonStyle = {
    width: "100%",
    padding: "11px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    textAlign: "left" as const,
};
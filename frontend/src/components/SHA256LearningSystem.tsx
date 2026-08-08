import { useState } from "react";
import "../App.css";
import InputPanel from "./InputPanel";
import StepViewer from "./StepViewer";
import DetailPanel from "./DetailPanel";
import Sidebar from "./Sidebar";

function SHA256LearningSystem() {
    const [input, setInput] = useState("");
    const [generatedInput, setGeneratedInput] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<number | null>(null);
    const [selectedPaddingStep, setSelectedPaddingStep] = useState(3);

    const [scheduleMode, setScheduleMode] = useState<"initial" | "expanded">("initial");

    const [selectedWord, setSelectedWord] = useState(0);

    const handleGenerate = () => {
        setGeneratedInput(input);
        setCurrentStep(0);
        setSelectedCharacterIndex(null);
        setSelectedPaddingStep(3);
        setScheduleMode("initial");
        setSelectedWord(0);
    };

    const steps = [
        "Input",
        "ASCII",
        "Binary",
        "Padding",
        "Message Schedule",
        "Compression",
        "Hash",
        "Digest",
    ];



    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <h1>HashPro</h1>
                <p>Demo v2.0</p>
            </header>

            <div className="layout">

                <Sidebar
                    currentStep={currentStep}
                    onStepChange={setCurrentStep}
                />

                {/* Main Layout */}
                <main className="content">


                    <div className="workspace">

                        {/* 左侧 */}
                        <div className="main-column">

                            {/* Input */}
                            <section className="panel input-card">

                                <InputPanel
                                    input={input}
                                    onInputChange={setInput}

                                />

                                <div className="input-actions">
                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            setCurrentStep((step) => Math.max(step - 1, 0))
                                        }
                                    >
                                        ◀ Previous
                                    </button>

                                    <button
                                        className="primary-button"
                                        onClick={handleGenerate}
                                    >
                                        Generate
                                    </button>

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            setCurrentStep((step) => Math.min(step + 1, steps.length - 1))
                                        }
                                    >
                                        Next ▶
                                    </button>
                                </div>
                            </section>

                            {/* Visualization */}
                            <div className="panel visualization-card">

                                <h2>Visualization</h2>

                                <div className="visualization-content">

                                    <StepViewer
                                        currentStep={currentStep}
                                        generatedInput={generatedInput}
                                        selectedCharacterIndex={selectedCharacterIndex}
                                        selectedPaddingStep={selectedPaddingStep}
                                        scheduleMode={scheduleMode}
                                        selectedWord={selectedWord}
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Right */}
                        <DetailPanel
                            currentStep={currentStep}
                            input={generatedInput}

                            selectedCharacterIndex={selectedCharacterIndex}
                            onCharacterSelect={setSelectedCharacterIndex}

                            selectedPaddingStep={selectedPaddingStep}
                            onPaddingStepSelect={setSelectedPaddingStep}

                            scheduleMode={scheduleMode}
                            onScheduleModeChange={setScheduleMode}

                            selectedWord={selectedWord}
                            onSelectedWordChange={setSelectedWord}

                        />

                    </div>
                </main>

            </div>

        </div>
    );
}

export default SHA256LearningSystem;
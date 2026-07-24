import { useState } from "react";
import "./App.css";
import InputPanel from "./components/InputPanel";
import StepViewer from "./components/StepViewer";

function App() {
  const [input, setInput] = useState("");
  const [generatedInput, setGeneratedInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const handleGenerate = () => {
    setGeneratedInput(input);
    setCurrentStep(0);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>SHA-256 Visualization System</h1>
        <p>Demo v1.0</p>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <h2>Steps</h2>

          <ul>
            <li>① Input</li>
            <li>② ASCII</li>
            <li>③ Binary</li>
            <li>④ Padding</li>
            <li>⑤ Message Block</li>
            <li>⑥ Message Schedule</li>
            <li>⑦ Compression</li>
            <li>⑧ Digest</li>
          </ul>
        </aside>

        <section className="content">
          <h2>SHA-256 Explorer</h2>

          <InputPanel
            input={input}
            onInputChange={setInput}
            onGenerate={handleGenerate}
          />

          <hr style={{ margin: "30px 0" }} />

          <StepViewer
            currentStep={currentStep}
            generatedInput={generatedInput}
          />

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() =>
                setCurrentStep((step) => Math.max(step - 1, 0))
              }
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentStep((step) => Math.min(step + 1, 7))
              }
            >
              Next
            </button>
          </div>



        </section>
      </main>
    </div>
  );
}

export default App;
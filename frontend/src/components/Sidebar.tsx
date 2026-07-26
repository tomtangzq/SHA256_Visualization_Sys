interface SidebarProps {
    currentStep: number;
    onStepChange: (step: number) => void;
}

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

export default function Sidebar({
    currentStep,
    onStepChange,
}: SidebarProps) {
    return (
        <aside className="sidebar">
            <h2>Steps</h2>

            <ul>
                {steps.map((step, index) => (
                    <li
                        key={step}
                        className={currentStep === index ? "active" : ""}
                        onClick={() => onStepChange(index)}
                    >
                        <span className="step-index">{index + 1}</span>
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
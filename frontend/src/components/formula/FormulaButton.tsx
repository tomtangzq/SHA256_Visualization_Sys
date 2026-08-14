interface FormulaButtonProps {
    label: string;
    selected?: boolean;
    onClick?: () => void;
}

export default function FormulaButton({
    label,
    selected = false,
    onClick,
}: FormulaButtonProps) {

    return (
        <button
            className={`formula-button ${selected ? "selected" : ""
                }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
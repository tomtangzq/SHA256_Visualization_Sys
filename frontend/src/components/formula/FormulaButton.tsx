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

            onClick={onClick}

            style={{

                padding: "8px 14px",

                borderRadius: 4,

                border: "1px solid #666",

                background: selected ? "#8B5CF6" : "white",

                color: selected ? "white" : "black",

                cursor: "pointer",

                fontSize: 12,

                fontWeight: 500,

                minWidth: 60,

            }}

        >

            {label}

        </button>

    );

}
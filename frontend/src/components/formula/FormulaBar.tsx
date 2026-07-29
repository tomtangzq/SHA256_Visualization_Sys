import FormulaButton from "./FormulaButton";
import type { FormulaItem } from "./type";

interface FormulaBarProps {
    currentWordIndex: number;

    resultBinary: string;

    items: FormulaItem[];

    selected: FormulaItem;

    onSelect: (item: FormulaItem) => void;

}

export default function FormulaBar({

    items,
    selected,
    onSelect,
    currentWordIndex,
    resultBinary,

}: FormulaBarProps) {

    return (

        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "8px",
                marginTop: "10px",
            }}
        >

            {/* W16 = */}

            <span
                style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                }}
            >

                W{currentWordIndex}

            </span>

            <span
                style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                }}
            >

                =

            </span>

            {items.map((item, index) => (

                <div
                    key={item.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >

                    <FormulaButton

                        label={item.label}

                        selected={selected.id === item.id}

                        onClick={() => onSelect(item)}

                    />

                    {

                        index !== items.length - 1 && (

                            <span
                                style={{
                                    fontSize: "28px",
                                    fontWeight: "bold",
                                }}
                            >

                                +

                            </span>

                        )

                    }

                </div>

            ))}

            {/* <span
                style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                }}
            >

                =

            </span>

            <span
                style={{

                    fontFamily: "monospace",

                    fontSize: "22px",

                    whiteSpace: "nowrap",

                }}
            >

                {resultBinary}

            </span> */}

        </div>

    );

}
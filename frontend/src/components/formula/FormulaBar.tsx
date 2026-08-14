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
}: FormulaBarProps) {

    return (
        <div className="formula-bar">

            <span className="formula-result">
                W{currentWordIndex}
            </span>

            <span className="formula-equals">
                =
            </span>

            {items.map((item, index) => (

                <div
                    key={item.id}
                    className="formula-item"
                >

                    <FormulaButton
                        label={item.label}
                        selected={
                            selected.id === item.id
                        }
                        onClick={() =>
                            onSelect(item)
                        }
                    />

                    {index !== items.length - 1 && (
                        <span className="formula-operator">
                            +
                        </span>
                    )}

                </div>

            ))}

        </div>
    );
}
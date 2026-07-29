import FormulaButton from "./FormulaButton";
import type { FormulaItem } from "./type";

interface FormulaBarProps {

    items: FormulaItem[];

    selected: FormulaItem;

    onSelect: (item: FormulaItem) => void;

}

export default function FormulaBar({

    items,
    selected,
    onSelect,

}: FormulaBarProps) {

    return (

        <div

            style={{

                display: "flex",

                alignItems: "center",

                gap: 10,

                flexWrap: "wrap",

            }}

        >

            {

                items.map((item) => (

                    <FormulaButton

                        key={item.label}

                        label={item.label}

                        selected={selected.id === item.id}

                        onClick={() => onSelect(item)}

                    />

                ))

            }

        </div>

    );

}
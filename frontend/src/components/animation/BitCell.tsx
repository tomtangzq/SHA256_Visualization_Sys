interface BitCellProps {
    value: string;
    active?: boolean;
    injected?: boolean;
}

export default function BitCell({
    value,
    active = false,
    injected = false,
}: BitCellProps) {

    return (
        <div
            className={`
                bit-cell
                ${active ? "active" : ""}
                ${injected ? "injected" : ""}
            `}
        >
            {value}
        </div>
    );
}
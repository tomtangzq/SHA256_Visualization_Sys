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
            style={{

                width: 24,

                height: 28,

                border: "1px solid orange",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                backgroundColor: active
                    ? "#9b6cff"
                    : injected
                        ? "#e53935"
                        : "transparent",

                opacity: injected ? 1 : 0.95,

                color: active ? "white" : "black",

                borderRadius: 3,

                fontFamily: "monospace",

                transition: "background-color 0.01s",

            }}
        >

            {value}

        </div>

    );

}
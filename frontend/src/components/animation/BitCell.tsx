interface BitCellProps {

    value: string;

    active?: boolean;

}

export default function BitCell({

    value,

    active = false,

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
                    : "transparent",

                color: active ? "white" : "black",

                borderRadius: 3,

                fontFamily: "monospace",

                transition: "background-color 0.2s",

            }}
        >

            {value}

        </div>

    );

}
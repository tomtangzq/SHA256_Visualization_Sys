type Props = {

    binary: string;

    groupSize?: number;

    compareBinary?: string;

};

function BinaryDisplay({

    binary,

    groupSize = 8,

    compareBinary

}: Props) {

    const groups = [];

    for (let i = 0; i < binary.length; i += groupSize) {

        const chars = [];

        const group = binary.slice(i, i + groupSize);

        for (let j = 0; j < group.length; j++) {

            const index = i + j;

            const bit = group[j];

            const changed =
                compareBinary &&
                compareBinary[index] !== bit;

            chars.push(

                <span
                    key={index}
                    style={{

                        color: changed ? "#d32f2f" : "inherit",

                        fontWeight: changed ? "bold" : "normal"

                    }}
                >

                    {bit}

                </span>

            );

        }

        groups.push(

            <span key={i}>

                {chars}

                {" "}

            </span>

        );

    }

    return (

        <code
            style={{

                display: "block",

                fontFamily: "monospace",

                background: "#f5f5f5",

                color: "black",          // ← 新增

                fontSize: "18px",        // ← 新增

                letterSpacing: "1px",    // ← 新增


                padding: "10px",

                borderRadius: "6px",

                lineHeight: "1.8",

                wordBreak: "break-word"

            }}
        >

            {groups}

        </code>

    );

}

export default BinaryDisplay;
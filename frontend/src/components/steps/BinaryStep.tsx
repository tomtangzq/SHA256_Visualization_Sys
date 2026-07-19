import { textToBinary } from "../../utils/binary";

type Props = {
    input: string;
};

function BinaryStep({ input }: Props) {
    const binary = textToBinary(input);

    return (
        <>
            <h3>Step 3 - Binary Encoding</h3>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={headerStyle}>Character</th>
                        <th style={headerStyle}>ASCII</th>
                        <th style={headerStyle}>Binary (8-bit)</th>
                    </tr>
                </thead>

                <tbody>
                    {binary.map((item, index) => (
                        <tr key={index}>
                            <td style={cellStyle}>{item.character}</td>
                            <td style={cellStyle}>{item.ascii}</td>
                            <td
                                style={{
                                    ...cellStyle,
                                    fontFamily: "monospace",
                                }}
                            >
                                {item.binary}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

const headerStyle = {
    border: "1px solid #ccc",
    padding: "10px",
};

const cellStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center" as const,
};

export default BinaryStep;
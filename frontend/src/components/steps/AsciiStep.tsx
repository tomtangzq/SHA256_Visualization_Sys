import { textToAscii } from "../../utils/ascii";

type Props = {
    input: string;
};

function AsciiStep({ input }: Props) {
    const ascii = textToAscii(input);

    return (
        <>
            <h3>Step 2 - ASCII Encoding</h3>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                            Character
                        </th>

                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                            ASCII
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {ascii.map((item, index) => (
                        <tr key={index}>
                            <td
                                style={{
                                    border: "1px solid #ccc",
                                    textAlign: "center",
                                    padding: "10px",
                                }}
                            >
                                {item.character}
                            </td>

                            <td
                                style={{
                                    border: "1px solid #ccc",
                                    textAlign: "center",
                                    padding: "10px",
                                }}
                            >
                                {item.ascii}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AsciiStep;
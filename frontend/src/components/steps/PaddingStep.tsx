import { binaryString } from "../../utils/binary";
import { calculatePadding } from "../../utils/padding";

type Props = {
    input: string;
};

function PaddingStep({ input }: Props) {
    const binary = binaryString(input);

    const padding = calculatePadding(binary);


    return (
        <>
            <div style={{ marginBottom: "25px" }}>
                <h4>Padding Information</h4>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <tbody>
                        <tr>
                            <td style={labelStyle}>Original Length</td>
                            <td style={valueStyle}>
                                {padding.originalLength} bits
                            </td>
                        </tr>

                        <tr>
                            <td style={labelStyle}>After Append '1'</td>
                            <td style={valueStyle}>
                                {padding.lengthAfterAppendOne} bits
                            </td>
                        </tr>

                        <tr>
                            <td style={labelStyle}>Need Zero Padding</td>
                            <td style={valueStyle}>
                                {padding.zeroPaddingLength} bits
                            </td>
                        </tr>

                        <tr>
                            <td style={labelStyle}>Target Length</td>
                            <td style={valueStyle}>
                                448 bits
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Step 4 - Padding</h3>

            <h4>Original Binary</h4>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                }}
            >
                {padding.originalBinary}
            </pre>



            <h4>Append One Bit</h4>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                }}
            >
                {padding.afterAppendOne}
            </pre>



            <h4>After Zero Padding</h4>
            <p>
                Current Length:
                <strong> {padding.afterZeroPadding.length} bits</strong>
            </p>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    maxHeight: "180px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    padding: "10px",
                }}
            >
                {padding.afterZeroPadding}
            </pre>



            <h4>Original Length (64-bit)</h4>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    border: "1px solid #ccc",
                    padding: "10px",
                }}
            >
                {padding.lengthBinary64}
            </pre>




            <h4>Final 512-bit Message Block</h4>

            <p>
                Length:
                <strong>
                    {" "}
                    {padding.finalBlock512.length} bits
                </strong>
            </p>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    maxHeight: "220px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    padding: "10px",
                }}
            >
                {padding.finalBlock512}
            </pre>

        </>


    );
}

const labelStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    fontWeight: "bold" as const,
    width: "40%",
};

const valueStyle = {
    border: "1px solid #ccc",
    padding: "10px",
};

export default PaddingStep;


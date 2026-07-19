import { binaryString } from "../../utils/binary";
import { appendOneBit } from "../../utils/padding";

type Props = {
    input: string;
};

function PaddingStep({ input }: Props) {
    const binary = binaryString(input);

    const padding = appendOneBit(binary);

    return (
        <>
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
        </>
    );
}

export default PaddingStep;
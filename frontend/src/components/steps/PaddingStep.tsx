import { getAsciiInfo } from "../../utils/ascii";
import { getPaddingInfo } from "../../utils/padding";
import { formatBinary } from "../../utils/formatBinary";
import { getPaddingSections } from "../../utils/paddingSections";

type Props = {
    input: string;
    selectedPaddingStep: number;
};


function PaddingStep({
    input,
    selectedPaddingStep,
}: Props) {

    const characters = getAsciiInfo(input);

    const messageBinary = characters
        .map(character => character.binary)
        .join("");

    const padding = getPaddingInfo(messageBinary);

    const sections = getPaddingSections(padding);

    switch (selectedPaddingStep) {

        case 0:

            return (
                <>
                    <h3 style={titleStyle}>Original Binary</h3>

                    <p>
                        Original Length:
                        <strong> {padding.originalLength} bits</strong>
                    </p>

                    <pre style={preStyle}>
                        {formatBinary(padding.originalBinary)}
                    </pre>
                </>
            );

        case 1:

            return (
                <>
                    <h3 style={titleStyle}>Append '1'</h3>

                    <p style={infoStyle}>
                        Current Length:
                        <strong> {padding.lengthAfterAppendOne} bits</strong>
                    </p>

                    <pre style={preStyle}>
                        {formatBinary(padding.afterAppendOne)}
                    </pre>
                </>
            );

        case 2:

            return (
                <>
                    <h3 style={titleStyle}>Append Zero Bits</h3>

                    <p style={infoStyle}>
                        Zero Padding Length:
                        <strong> {padding.zeroPaddingLength} bits</strong>
                    </p>

                    <pre style={preStyle}>
                        {formatBinary(padding.afterZeroPadding)}
                    </pre>
                </>
            );


        case 3:

            return (
                <>
                    <h3 style={titleStyle}>Final 512-bit Message Block</h3>
                    <p style={infoStyle}>After appending original message length</p>

                    <p style={infoStyle}>
                        Message Length:
                        <strong> {padding.finalLength} bits</strong>
                    </p>

                    <pre style={preStyle}>

                        {formatBinary(padding.finalBlock512)}

                    </pre>

                </>
            );

        default:

            return null;
    }


}

const preStyle = {

    whiteSpace: "pre-wrap",

    wordBreak: "break-all" as const,

    border: "1px solid #ccc",

    padding: "12px",

    borderRadius: "8px",

};

const titleStyle = {
    marginBottom: "8px",
};

const infoStyle = {
    display: "block",
    marginBottom: "8px",
};

export default PaddingStep;


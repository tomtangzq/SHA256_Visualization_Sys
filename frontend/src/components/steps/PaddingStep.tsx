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
                <div className="padding-stage">

                    <h3 className="padding-title">
                        Original Binary
                    </h3>

                    <p className="padding-info">
                        Original Length:
                        <strong>
                            {" "}
                            {padding.originalLength} bits
                        </strong>
                    </p>

                    <pre className="padding-binary">
                        {formatBinary(padding.originalBinary)}
                    </pre>

                </div>
            );


        case 1:

            return (
                <div className="padding-stage">

                    <h3 className="padding-title">
                        Append '1'
                    </h3>

                    <p className="padding-info">
                        Current Length:
                        <strong>
                            {" "}
                            {padding.lengthAfterAppendOne} bits
                        </strong>
                    </p>

                    <pre className="padding-binary">
                        {formatBinary(padding.afterAppendOne)}
                    </pre>

                </div>
            );


        case 2:

            return (
                <div className="padding-stage">

                    <h3 className="padding-title">
                        Append Zero Bits
                    </h3>

                    <p className="padding-info">
                        Zero Padding Length:
                        <strong>
                            {" "}
                            {padding.zeroPaddingLength} bits
                        </strong>
                    </p>

                    <pre className="padding-binary">
                        {formatBinary(padding.afterZeroPadding)}
                    </pre>

                </div>
            );


        case 3:

            return (
                <div className="padding-stage">

                    <h3 className="padding-title">
                        Final 512-bit Message Block
                    </h3>

                    <p className="padding-description">
                        After appending original message length
                    </p>

                    <p className="padding-info">
                        Message Length:
                        <strong>
                            {" "}
                            {padding.finalLength} bits
                        </strong>
                    </p>

                    <pre className="padding-binary padding-final">
                        {formatBinary(padding.finalBlock512)}
                    </pre>

                </div>
            );


        default:
            return null;
    }
}

export default PaddingStep;
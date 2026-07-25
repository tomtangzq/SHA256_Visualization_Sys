import { calculatePadding } from "../../utils/padding";
import { binaryString } from "../../utils/binary";
import { generateMessageSchedule } from "../../utils/messageSchedule";
import { INITIAL_HASH } from "../../utils/constants";
import { calculateCompressionRounds } from "../../utils/compressionRounds";
import { calculateFinalHash } from "../../utils/finalHash";

type Props = {
    input: string;
};

export default function FinalHashStep({ input }: Props) {

    const binary = binaryString(input);

    const padding = calculatePadding(binary);

    const words = generateMessageSchedule(
        padding.finalBlock512
    );

    const compressionResult =
        calculateCompressionRounds(
            INITIAL_HASH,
            words
        );

    const finalHash =
        calculateFinalHash(
            INITIAL_HASH,
            compressionResult.finalWorkingVariables
        );

    return (
        <div>

            <h2>Final Hash</h2>

            <p>
                {finalHash.hex}
            </p>

        </div>
    );
}
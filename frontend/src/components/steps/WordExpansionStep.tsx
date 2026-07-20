import { binaryString } from "../../utils/binary";
import { calculatePadding } from "../../utils/padding";
import { splitIntoWords } from "../../utils/messageSchedule";
import { calculateWord } from "../../utils/wordExpansion";


type Props = {
    input: string;
};

function WordExpansionStep({ input }: Props) {
    const binary = binaryString(input);

    const padding = calculatePadding(binary);

    const words = splitIntoWords(padding.finalBlock512);

    const expansion = calculateWord(words, 16);


    return (

        <>

            <h2>Step 6 - Word Expansion</h2>

            <h3>Target Word</h3>

            <p>
                <strong>W16</strong>
            </p>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Hex</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>σ1(W14)</td>
                        <td>{expansion.sigma1.hex}</td>
                    </tr>

                    <tr>
                        <td>W9</td>
                        <td>{expansion.wordMinus7.hex}</td>
                    </tr>

                    <tr>
                        <td>σ0(W1)</td>
                        <td>{expansion.sigma0.hex}</td>
                    </tr>

                    <tr>
                        <td>W0</td>
                        <td>{expansion.wordMinus16.hex}</td>
                    </tr>

                    <tr>
                        <td>
                            <strong>W16</strong>
                        </td>

                        <td>
                            <strong>
                                {expansion.result.hex}
                            </strong>
                        </td>

                    </tr>

                </tbody>

            </table>

        </>
    );


}

export default WordExpansionStep;
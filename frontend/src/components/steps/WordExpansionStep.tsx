import { binaryString } from "../../utils/binary";
import { calculatePadding } from "../../utils/padding";
import { generateInitialWords } from "../../utils/messageSchedule";
import { calculateWord } from "../../utils/wordExpansion";
import { useState } from "react";
import { expandWords } from "../../utils/wordExpansion";

type Props = {
    input: string;
};

function WordExpansionStep({ input }: Props) {
    const binary = binaryString(input);

    const padding = calculatePadding(binary);

    const words = generateInitialWords(padding.finalBlock512);

    // const expansion = calculateWord(words, 16);
    const initialWords = generateInitialWords(padding.finalBlock512);

    const allWords = expandWords(initialWords);

    const [selectedWord, setSelectedWord] = useState(16);
    const expansion = calculateWord(allWords, selectedWord);


    return (

        <>

            <h2>Step 6 - Word Expansion</h2>

            <h3>
                Target Word : W{selectedWord}
            </h3>

            <div style={{ marginBottom: "20px" }}>
                <label>
                    <strong>Select Word: </strong>
                </label>

                <select
                    value={selectedWord}
                    onChange={(e) =>
                        setSelectedWord(Number(e.target.value))
                    }
                >
                    {Array.from({ length: 48 }, (_, i) => {

                        const value = i + 16;

                        return (
                            <option
                                key={value}
                                value={value}
                            >
                                W{value}
                            </option>
                        );

                    })}
                </select>
            </div>

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
                        <td>
                            σ1(W{selectedWord - 2})
                        </td>
                        <td>{expansion.sigma1.hex}</td>
                    </tr>

                    <tr>
                        <td>
                            W{selectedWord - 7}
                        </td>
                        <td>{expansion.wordMinus7.hex}</td>
                    </tr>

                    <tr>
                        <td>
                            σ0(W{selectedWord - 15})
                        </td>
                        <td>{expansion.sigma0.hex}</td>
                    </tr>

                    <tr>
                        <td>
                            W{selectedWord - 16}
                        </td>
                        <td>{expansion.wordMinus16.hex}</td>
                    </tr>

                    <tr>
                        <td>
                            <strong>W{selectedWord}</strong>
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
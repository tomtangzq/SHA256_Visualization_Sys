import { calculatePadding } from "../../utils/padding";
import { binaryString } from "../../utils/binary";
import { splitIntoWords } from "../../utils/messageSchedule";

type Props = {
    input: string;
};

function MessageScheduleStep({ input }: Props) {

    const binary = binaryString(input);

    const padding = calculatePadding(binary);

    const words = splitIntoWords(
        padding.finalBlock512
    );

    return (

        <>

            <h3>Step 5 - Message Schedule</h3>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >

                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Hex</th>
                        <th>Binary</th>
                    </tr>
                </thead>

                <tbody>
                    {words.map((word) => (
                        <tr key={word.index}>

                            <td>
                                W{word.index}
                            </td>

                            <td>
                                {word.hex}
                            </td>

                            <td
                                style={{
                                    fontFamily: "monospace",
                                    wordBreak: "break-all",
                                }}
                            >
                                {word.binary}
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </>

    );

}

export default MessageScheduleStep;
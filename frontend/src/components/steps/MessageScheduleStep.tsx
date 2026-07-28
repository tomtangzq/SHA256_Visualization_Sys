import type { Word } from "../../utils/messageSchedule";
import { formatBinary } from "../../utils/formatBinary";
import { getSigma0Steps, getSigma1Steps, } from "../../utils/sha256Functions";
import SigmaCalculation from "../common/SigmaCalculation";

type Props = {
    words: Word[];
    scheduleMode: "initial" | "expanded";
    selectedWord: number;
};

function MessageScheduleStep({
    words,
    scheduleMode,
    selectedWord,
}: Props) {

    const currentWord = words[selectedWord];
    const isExpanded = currentWord.index >= 16;

    const previousWords = isExpanded
        ? {
            wordMinus2: currentWord.index - 2,
            wordMinus7: currentWord.index - 7,
            wordMinus15: currentWord.index - 15,
            wordMinus16: currentWord.index - 16,
        }
        : null;

    const sigma0Steps =
        currentWord.index >= 16
            ? getSigma0Steps(words[currentWord.index - 15].binary)
            : null;

    const sigma1Steps =
        currentWord.index >= 16
            ? getSigma1Steps(words[currentWord.index - 2].binary)
            : null;


    if (!currentWord) {
        return <p>No word selected.</p>;
    }

    return (

        <>

            <h3>Step 5 - Message Schedule</h3>

            <h4>
                {scheduleMode === "initial"
                    ? "Initial Words"
                    : "Expanded Words"}
            </h4>

            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    marginTop: "16px",
                }}
            >
                <h3>W{currentWord.index}</h3>

                <p>
                    <strong>Hex</strong>
                </p>

                <pre>{currentWord.hex}</pre>

                <strong>Binary</strong>
                <pre
                    style={{
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {formatBinary(currentWord.binary)}
                </pre>

                <p>

                    {isExpanded && previousWords && (
                        <>
                            <h4 style={{ marginTop: "10px", }}>
                                Calculated From
                            </h4>

                            <ul
                                style={{
                                    paddingLeft: "20px",
                                    lineHeight: "1.8",
                                    marginBottom: "8px",
                                    marginTop: "0px",
                                }}
                            >
                                <li>σ₁(W{previousWords.wordMinus2})</li>
                                <li>W{previousWords.wordMinus7}</li>
                                <li>σ₀(W{previousWords.wordMinus15})</li>
                                <li>W{previousWords.wordMinus16}</li>
                            </ul>



                            {sigma0Steps && (
                                <SigmaCalculation
                                    title={`σ₀(W${currentWord.index - 15})`}
                                    inputBinary={sigma0Steps.original}
                                    rotate1={sigma0Steps.rotate1}
                                    rotate2={sigma0Steps.rotate2}
                                    shift={sigma0Steps.shift}
                                    result={sigma0Steps.result}
                                    rotate1Label="ROTR 7"
                                    rotate2Label="ROTR 18"
                                    shiftLabel="SHR 3"
                                />
                            )}

                            {sigma1Steps && (
                                <SigmaCalculation
                                    title={`σ₁(W${currentWord.index - 2})`}
                                    inputBinary={sigma1Steps.original}
                                    rotate1={sigma1Steps.rotate1}
                                    rotate2={sigma1Steps.rotate2}
                                    shift={sigma1Steps.shift}
                                    result={sigma1Steps.result}
                                    rotate1Label="ROTR 17"
                                    rotate2Label="ROTR 19"
                                    shiftLabel="SHR 10"
                                />
                            )}


                        </>
                    )}



                </p>


            </div>
        </>
    );
}

export default MessageScheduleStep;
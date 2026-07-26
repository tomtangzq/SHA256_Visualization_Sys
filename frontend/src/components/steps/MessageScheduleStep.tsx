import type { Word } from "../../utils/messageSchedule";
import { formatBinary } from "../../utils/formatBinary";

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

                <p>
                    <strong>Binary</strong>
                </p>

                <pre
                    style={{
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {formatBinary(currentWord.binary)}
                </pre>
            </div>
        </>
    );
}

export default MessageScheduleStep;
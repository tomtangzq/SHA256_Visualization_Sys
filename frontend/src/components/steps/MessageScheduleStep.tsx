import type { Word } from "../../utils/messageSchedule";
import { formatBinary } from "../../utils/formatBinary";
import { getSigma0Steps, getSigma1Steps, } from "../../utils/sha256Functions";
import SigmaCalculation from "../common/SigmaCalculation";
import FormulaBar from "../formula/FormulaBar";
import { useState } from "react";
import DetailViewer from "../detail/DetailViewer";
import type { FormulaItem } from "../formula/type";
import WordViewer from "../detail/WordViewer";
import { Import } from "lucide-react";
import SigmaViewer from "../detail/SigmaViewer";

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


    const formulaItems: FormulaItem[] = [
        {
            id: `word${currentWord.index - 16}`,
            type: "word",
            wordIndex: currentWord.index - 16,
            label: `W${currentWord.index - 16}`,
        },
        {
            id: `sigma0${currentWord.index - 15}`,
            type: "sigma0",
            wordIndex: currentWord.index - 15,
            label: `σ0(W${currentWord.index - 15})`,
        },
        {
            id: `word${currentWord.index - 7}`,
            type: "word",
            wordIndex: currentWord.index - 7,
            label: `W${currentWord.index - 7}`,
        },
        {
            id: `sigma1${currentWord.index - 2}`,
            type: "sigma1",
            wordIndex: currentWord.index - 2,
            label: `σ1(W${currentWord.index - 2})`,
        },
    ];

    const [selectedFormula, setSelectedFormula] = useState(formulaItems[1]);



    let detailContent;

    switch (selectedFormula.type) {

        case "word":

            detailContent = (
                <WordViewer
                    wordIndex={selectedFormula.wordIndex}
                    hex={words[selectedFormula.wordIndex].hex}
                    binary={words[selectedFormula.wordIndex].binary}
                    isExpanded={
                        selectedFormula.wordIndex >= 16
                    }
                />
            );
            break;

        case "sigma0":

            detailContent = (

                <SigmaViewer

                    sigmaType="sigma0"

                    word={

                        words[selectedFormula.wordIndex]

                    }

                />

            );

            break;

        case "sigma1":

            detailContent = (

                <SigmaViewer

                    sigmaType="sigma1"

                    word={

                        words[selectedFormula.wordIndex]

                    }

                />

            );

            break;

        default:

            detailContent = null;
    }



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

                            <FormulaBar

                                items={formulaItems}

                                selected={selectedFormula}

                                onSelect={setSelectedFormula}

                            />

                            <DetailViewer>

                                {detailContent}

                            </DetailViewer>

                        </>
                    )}



                </p>


            </div>
        </>
    );
}

export default MessageScheduleStep;
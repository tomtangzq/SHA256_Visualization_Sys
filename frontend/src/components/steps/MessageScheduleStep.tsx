import type { Word } from "../../utils/messageSchedule";
import { formatBinary } from "../../utils/formatBinary";

import FormulaBar from "../formula/FormulaBar";
import DetailViewer from "../detail/DetailViewer";
import type { FormulaItem } from "../formula/type";
import WordViewer from "../detail/WordViewer";

import SigmaViewer from "../detail/SigmaViewer";
import { useEffect, useState } from "react";

type Props = {
    words: Word[];
    scheduleMode: "initial" | "expanded";
    selectedWord: number;
};

function MessageScheduleStep({
    words,
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

    const [selectedFormula, setSelectedFormula] =
        useState<FormulaItem | null>(null);

    useEffect(() => {

        if (currentWord.index >= 16) {

            setSelectedFormula(formulaItems[1]);

        }

    }, [currentWord.index]);


    // useEffect(() => {
    //     setSelectedFormula(formulaItems[1]);
    // }, [selectedWord]);


    let detailContent = null;


    if (selectedFormula) {
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
    }



    if (!currentWord) {
        return <p>No word selected.</p>;
    }

    return (

        <>

            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    marginTop: "8px",
                }}
            >
                <h3>W{currentWord.index}</h3>

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

                            {selectedFormula && (

                                <FormulaBar

                                    currentWordIndex={currentWord.index}

                                    resultBinary={formatBinary(currentWord.binary)}

                                    items={formulaItems}

                                    selected={selectedFormula}

                                    onSelect={setSelectedFormula}

                                />
                            )}

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
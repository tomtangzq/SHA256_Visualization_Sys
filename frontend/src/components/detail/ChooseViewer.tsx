import { useEffect, useMemo, useState } from "react";

import type { RoundResult } from "../../utils/compressionRounds";


interface ChooseViewerProps {
    round: RoundResult;
}


export default function ChooseViewer({
    round,
}: ChooseViewerProps) {

    const eBits =
        round.workingVariables.e.replace(/\s/g, "");

    const fBits =
        round.workingVariables.f.replace(/\s/g, "");

    const gBits =
        round.workingVariables.g.replace(/\s/g, "");


    /*
     * Ch(e,f,g)
     *
     * e = 1 -> choose f
     * e = 0 -> choose g
     */

    const correctBits = useMemo(() => {

        return eBits
            .split("")
            .map((bit, index) => {

                return bit === "1"
                    ? fBits[index]
                    : gBits[index];

            });

    }, [eBits, fBits, gBits]);


    /*
     * First three bits are completed
     * by the user.
     *
     * 0 -> none
     * 1 -> first bit completed
     * 2 -> first two completed
     * 3 -> interactive section completed
     */

    const [
        revealedCount,
        setRevealedCount
    ] = useState(0);


    /*
     * After the first three bits,
     * reveal the remaining 29 bits
     * automatically.
     */

    const [
        autoRevealedCount,
        setAutoRevealedCount
    ] = useState(0);


    const [
        errorMessage,
        setErrorMessage
    ] = useState("");



    const currentIndex =
        revealedCount < 3
            ? revealedCount
            : 3 + autoRevealedCount;


    /*
     * Automatically reveal one bit at a time
     * after the first three user interactions.
     */

    useEffect(() => {

        if (revealedCount < 3) {
            return;
        }


        if (autoRevealedCount >= 29) {
            return;
        }


        const timer =
            window.setTimeout(() => {

                setAutoRevealedCount(
                    previous =>
                        previous + 1
                );

            }, 700);


        return () => {
            window.clearTimeout(timer);
        };

    }, [
        revealedCount,
        autoRevealedCount,
    ]);


    /*
     * Reset when a different round is used.
     */

    useEffect(() => {

        setRevealedCount(0);

        setAutoRevealedCount(0);

        setErrorMessage("");

    }, [round.round]);


    /*
     * User selects f or g.
     */

    function handleChoice(
        source: "f" | "g"
    ) {

        const index =
            revealedCount;


        if (index >= 3) {
            return;
        }


        const controlBit =
            eBits[index];


        const correctSource =
            controlBit === "1"
                ? "f"
                : "g";


        if (source !== correctSource) {

            setErrorMessage(

                controlBit === "1"

                    ? "Not quite. When e is 1, Choose selects the corresponding bit from f."

                    : "Not quite. When e is 0, Choose selects the corresponding bit from g."

            );

            return;
        }


        setErrorMessage("");


        setRevealedCount(
            previous =>
                previous + 1
        );
    }


    /*
     * Number of automatically revealed bits.
     */

    const automaticBitsVisible =
        revealedCount >= 3
            ? autoRevealedCount
            : 0;


    /*
     * Whether the whole result is visible.
     */

    const allBitsVisible =
        revealedCount >= 3 &&
        autoRevealedCount >= 29;


    return (

        <div>

            <h3 className="operation-title">
                Choose Function
            </h3>


            <p className="operation-description">
                The Choose function selects a bit
                from f or g according to the
                corresponding bit in e.
            </p>


            {/* =================================
                e
            ================================= */}

            <BitRow
                label="e"
                bits={eBits}
                type="control"
                currentIndex={currentIndex}
                interactive={
                    !allBitsVisible
                }
            />


            {/* =================================
                f
            ================================= */}

            <BitRow
                label="f"
                bits={fBits}
                type="source"
                controlBits={eBits}
                currentIndex={currentIndex}
                selectedSource="f"
                onBitClick={() =>
                    handleChoice("f")
                }
                interactive={
                    revealedCount < 3
                }
            />


            {/* =================================
                g
            ================================= */}

            <BitRow
                label="g"
                bits={gBits}
                type="source"
                controlBits={eBits}
                currentIndex={currentIndex}
                selectedSource="g"
                onBitClick={() =>
                    handleChoice("g")
                }
                interactive={
                    revealedCount < 3
                }
            />


            {/* =================================
                Instruction
            ================================= */}

            {revealedCount < 3 && (

                <div className="choose-instruction-card">

                    <strong>
                        Bit {revealedCount + 1}
                    </strong>


                    <p
                        style={{
                            margin:
                                "7px 0 0",
                            color: "#555",
                        }}
                    >

                        {eBits[revealedCount] === "1"

                            ? "e = 1 → choose the corresponding bit from f."

                            : "e = 0 → choose the corresponding bit from g."

                        }

                    </p>

                </div>

            )}


            {/* =================================
                Automatic progress information
            ================================= */}

            {revealedCount >= 3 &&
                !allBitsVisible && (

                    <div className="choose-progress-card">

                        Automatically
                        computing the remaining
                        bits...

                    </div>

                )}


            {/* =================================
                Error
            ================================= */}

            {errorMessage && (

                <div className="choose-error-card">
                    {errorMessage}
                </div>

            )}


            {/* =================================
                Output
            ================================= */}

            <div
                style={{
                    marginTop: "28px",
                }}
            >

                <h4>
                    Output
                </h4>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(32, minmax(0, 1fr))",
                        gap: "3px",
                        width: "100%",
                    }}
                >

                    {correctBits.map(
                        (bit, index) => {

                            const userRevealed =
                                index <
                                revealedCount;


                            const automaticRevealed =
                                revealedCount >= 3 &&
                                index >= 3 &&
                                index <
                                3 +
                                automaticBitsVisible;


                            const visible =
                                userRevealed ||
                                automaticRevealed;


                            const isCurrent =
                                !allBitsVisible &&
                                index ===
                                currentIndex;

                            const waitingForUser =
                                isCurrent && !automaticRevealed;

                            const waitingForReveal =
                                !visible && !waitingForUser;


                            return (

                                <div
                                    key={index}
                                    style={{
                                        minWidth: 0,
                                        height: "30px",

                                        display: "flex",

                                        alignItems: "center",

                                        justifyContent: "center",

                                        background:
                                            "#111516",

                                        animation:
                                            isCurrent && !userRevealed
                                                ? "choosePulse 1.3s ease-in-out infinite"
                                                : "none",

                                        outline: "none",
                                        boxShadow: "none",

                                        border:
                                            isCurrent
                                                ? "2px solid #d99000"
                                                : visible
                                                    ? "1px solid #d99000"
                                                    : "1px solid #333936",


                                        // background:
                                        //     isCurrent
                                        //         ? "#d99000"
                                        //         : visible
                                        //             ? "#171a1b"
                                        //             : "#111516",

                                        borderRadius:
                                            "4px",


                                        color:
                                            isCurrent
                                                ? "#111"
                                                : "#d5d3cb",

                                        fontFamily:
                                            "monospace",

                                        fontSize:
                                            "13px",

                                        transition:
                                            "all 0.2s ease",

                                        // animation:
                                        //     automaticRevealed &&
                                        //         index ===
                                        //         currentIndex
                                        //         ? "bitReveal 0.3s ease"
                                        //         : "none",
                                    }}
                                >

                                    {visible
                                        ? bit
                                        : ""
                                    }

                                </div>

                            );

                        }
                    )}

                </div>

            </div>


            {/* =================================
                Final result
            ================================= */}

            {allBitsVisible && (

                <div className="choose-result-card">

                    <h4>
                        Ch(e, f, g) Result
                    </h4>


                    <code>
                        {correctBits.join("")}
                    </code>

                </div>

            )}

        </div>

    );
}


/* =====================================================
   Bit Row
===================================================== */

interface BitRowProps {

    label: string;

    bits: string;

    type: "control" | "source";

    controlBits?: string;

    currentIndex?: number;

    selectedSource?: "f" | "g";

    onBitClick?: () => void;

    interactive?: boolean;
}


function BitRow({
    label,
    bits,
    type,
    controlBits,
    currentIndex = 0,
    selectedSource,
    onBitClick,
    interactive = false,
}: BitRowProps) {

    /*
     * Automatic demonstration starts
     * after the first three user-selected bits.
     */
    const isAutoDemo =
        currentIndex >= 3;


    return (

        <div
            style={{
                marginTop: "18px",
            }}
        >

            {/* Row label */}

            <div
                style={{
                    marginBottom: "7px",
                    fontFamily: "monospace",
                    fontSize: "15px",
                    fontWeight: 600,
                }}
            >
                {label}
            </div>


            {/* 32-bit row */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(32, minmax(0, 1fr))",
                    gap: "3px",
                    width: "100%",
                }}
            >

                {bits
                    .split("")
                    .map((bit, index) => {

                        /*
                         * Current bit during the
                         * automatic demonstration.
                         */
                        const isCurrent =
                            index === currentIndex;


                        /*
                         * Only e gets this highlight
                         * during automatic mode.
                         */
                        const isControlCurrent =
                            type === "control" &&
                            isCurrent;


                        /*
                         * Determine whether the
                         * current bit should come
                         * from f or g.
                         */
                        const selectedSourceForCurrentBit =
                            controlBits
                                ? controlBits[
                                    currentIndex
                                ] === "1"
                                    ? "f"
                                    : "g"
                                : null;


                        /*
                         * Highlight the selected
                         * f/g bit during automatic
                         * demonstration.
                         */
                        const shouldHighlight =
                            type === "source" &&
                            isAutoDemo &&
                            isCurrent &&
                            selectedSource ===
                            selectedSourceForCurrentBit;


                        /*
                         * =================================
                         * FIRST THREE INTERACTIVE BITS
                         * =================================
                         *
                         * Keep the existing button
                         * behaviour unchanged.
                         */
                        if (
                            type === "source" &&
                            index < 3
                        ) {

                            const isCurrentButton =
                                interactive &&
                                index ===
                                currentIndex;


                            const controlBit =
                                controlBits
                                    ? controlBits[index]
                                    : undefined;


                            const correctSource =
                                controlBit === "1"
                                    ? "f"
                                    : "g";


                            const shouldPulse =
                                isCurrentButton &&
                                selectedSource ===
                                correctSource;


                            return (

                                <button
                                    key={index}
                                    onClick={
                                        isCurrentButton
                                            ? onBitClick
                                            : undefined
                                    }
                                    disabled={
                                        !isCurrentButton
                                    }
                                    style={{
                                        width: "100%",
                                        height: "30px",
                                        padding: 0,

                                        display: "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "center",

                                        fontFamily:
                                            "monospace",
                                        fontSize: "13px",

                                        border:
                                            shouldPulse
                                                ? "2px solid #d99000"
                                                : "1px solid #333936",

                                        borderRadius:
                                            "4px",

                                        background:
                                            shouldPulse
                                                ? "#d99000"
                                                : "#111516",

                                        color:
                                            shouldPulse
                                                ? "#111"
                                                : "#d5d3cb",

                                        cursor:
                                            isCurrentButton
                                                ? "pointer"
                                                : "default",

                                        animation:
                                            shouldPulse
                                                ? "choosePulse 1.3s ease-in-out infinite"
                                                : "none",

                                        opacity:
                                            isCurrentButton ||
                                                index <
                                                currentIndex
                                                ? 1
                                                : 0.8,
                                    }}
                                >
                                    {bit}
                                </button>

                            );
                        }


                        /*
                         * =================================
                         * ALL OTHER BITS
                         * =================================
                         *
                         * These are not clickable.
                         *
                         * During automatic mode:
                         *
                         * e current bit
                         * +
                         * selected f/g current bit
                         *
                         * are highlighted together.
                         */

                        return (

                            <div
                                key={index}
                                style={{
                                    width: "100%",
                                    height: "30px",

                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",

                                    border:
                                        isControlCurrent ||
                                            shouldHighlight
                                            ? "2px solid #d99000"
                                            : "1px solid #333936",

                                    borderRadius:
                                        "4px",

                                    background:
                                        isControlCurrent || shouldHighlight
                                            ? "#d99000"
                                            : "#111516",

                                    color:
                                        isControlCurrent || shouldHighlight
                                            ? "#111"
                                            : "#d5d3cb",

                                    fontFamily:
                                        "monospace",

                                    fontSize:
                                        "13px",

                                    animation:
                                        isControlCurrent ||
                                            shouldHighlight
                                            ? "choosePulse 1.3s ease-in-out infinite"
                                            : "none",

                                    transition:
                                        "all 0.2s ease",
                                }}
                            >
                                {bit}
                            </div>

                        );

                    })}

            </div>

        </div>

    );
}
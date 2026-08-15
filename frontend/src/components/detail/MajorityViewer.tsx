import { useEffect, useMemo, useState } from "react";

import type { RoundResult } from "../../utils/compressionRounds";


interface MajorityViewerProps {
    round: RoundResult;
}


export default function MajorityViewer({
    round,
}: MajorityViewerProps) {

    const aBits =
        round.workingVariables.a.replace(/\s/g, "");

    const bBits =
        round.workingVariables.b.replace(/\s/g, "");

    const cBits =
        round.workingVariables.c.replace(/\s/g, "");


    /*
     * Calculate Majority result.
     *
     * At least two 1s -> 1
     * Otherwise -> 0
     */

    const correctBits = useMemo(() => {

        return aBits
            .split("")
            .map((_, index) => {

                const ones =
                    Number(aBits[index]) +
                    Number(bBits[index]) +
                    Number(cBits[index]);

                return ones >= 2
                    ? "1"
                    : "0";

            });

    }, [
        aBits,
        bBits,
        cBits,
    ]);


    /*
     * First three bits are completed
     * by the user.
     */

    const [
        revealedCount,
        setRevealedCount
    ] = useState(0);


    /*
     * Remaining 29 bits are automatically
     * revealed.
     */

    const [
        autoRevealedCount,
        setAutoRevealedCount
    ] = useState(0);


    const [
        errorMessage,
        setErrorMessage
    ] = useState("");


    /*
     * User input for current output bit.
     */

    const [
        userInput,
        setUserInput
    ] = useState("");


    /*
     * Current bit position.
     */

    const currentIndex =
        revealedCount < 3
            ? revealedCount
            : 3 + autoRevealedCount;


    /*
     * Calculate number of 1s in the
     * current a/b/c position.
     */

    const currentOnes =
        currentIndex < 32
            ? Number(aBits[currentIndex]) +
            Number(bBits[currentIndex]) +
            Number(cBits[currentIndex])
            : 0;


    /*
     * Majority value for current position.
     */

    const expectedValue =
        currentOnes >= 2
            ? "1"
            : "0";


    /*
     * Automatically reveal remaining bits.
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
     * Reset when round changes.
     */

    useEffect(() => {

        setRevealedCount(0);

        setAutoRevealedCount(0);

        setErrorMessage("");

        setUserInput("");

    }, [round.round]);


    /*
     * Whether all bits have been shown.
     */

    const allBitsVisible =
        revealedCount >= 3 &&
        autoRevealedCount >= 29;


    /*
     * Handle output input.
     */

    function handleInput(
        value: string
    ) {

        /*
         * Only allow 0 or 1.
         */

        if (
            value !== "" &&
            value !== "0" &&
            value !== "1"
        ) {
            return;
        }


        setUserInput(value);

        setErrorMessage("");


        /*
         * Empty input:
         * wait for user.
         */

        if (value === "") {
            return;
        }


        /*
         * Incorrect answer.
         */

        if (value !== expectedValue) {

            setErrorMessage(
                currentOnes >= 2
                    ? "Not quite. At least two of the three bits are 1, so the Majority result should be 1."
                    : "Not quite. Fewer than two of the three bits are 1, so the Majority result should be 0."
            );

            return;
        }


        /*
         * Correct answer.
         */

        setErrorMessage("");

        setRevealedCount(
            previous =>
                previous + 1
        );

        setUserInput("");

    }


    return (

        <div>

            <h3>
                Majority Function
            </h3>


            <p
                style={{
                    color: "#666",
                    lineHeight: 1.6,
                }}
            >
                The Majority function returns 1
                when at least two of the three
                input bits are 1. Otherwise, it
                returns 0.
            </p>


            {/* =================================
                a
            ================================= */}

            <MajorityBitRow
                label="a"
                bits={aBits}
                currentIndex={currentIndex}
                majorityValue={expectedValue}
                active={
                    !allBitsVisible
                }
            />


            {/* =================================
                b
            ================================= */}

            <MajorityBitRow
                label="b"
                bits={bBits}
                currentIndex={currentIndex}
                majorityValue={expectedValue}
                active={
                    !allBitsVisible
                }
            />


            {/* =================================
                c
            ================================= */}

            <MajorityBitRow
                label="c"
                bits={cBits}
                currentIndex={currentIndex}
                majorityValue={expectedValue}
                active={
                    !allBitsVisible
                }
            />


            {/* =================================
                Instruction
            ================================= */}

            {revealedCount < 3 && (

                <div className="choose-instruction-card">

                    <strong
                        style={{
                            color: "#d99100",
                            fontFamily: "monospace",
                        }}
                    >
                        Bit {revealedCount + 1}
                    </strong>


                    <p>

                        {currentOnes >= 2

                            ? "At least two bits are 1 → enter 1."

                            : "Fewer than two bits are 1 → enter 0."

                        }

                    </p>


                    <p>

                        {aBits[currentIndex]}
                        {"  "}
                        {bBits[currentIndex]}
                        {"  "}
                        {cBits[currentIndex]}

                    </p>

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
                                autoRevealedCount;


                            const visible =
                                userRevealed ||
                                automaticRevealed;


                            const isCurrent =
                                !allBitsVisible &&
                                index ===
                                currentIndex;


                            /*
                             * The current output bit
                             * becomes an input box.
                             */

                            if (
                                isCurrent &&
                                revealedCount < 3
                            ) {

                                return (

                                    <input
                                        key={index}
                                        value={userInput}
                                        onChange={(e) =>
                                            handleInput(
                                                e.target.value
                                            )
                                        }
                                        maxLength={1}
                                        inputMode="numeric"
                                        autoFocus
                                        aria-label={`Majority output bit ${index + 1}`}
                                        style={{
                                            width:
                                                "100%",
                                            height:
                                                "30px",

                                            minWidth: 0,

                                            padding: 0,

                                            boxSizing:
                                                "border-box",

                                            textAlign:
                                                "center",

                                            fontFamily:
                                                "monospace",

                                            fontSize:
                                                "13px",

                                            color: "#d5d3cb",

                                            border:
                                                errorMessage

                                                    ? "2px solid #d92d20"

                                                    : "2px solid #d99000",

                                            borderRadius:
                                                "4px",

                                            outline:
                                                "none",

                                            background:
                                                errorMessage
                                                    ? "#171a1b"
                                                    : "#111516",

                                            caretColor:
                                                errorMessage
                                                    ? "#d92d20"
                                                    : "#d99000",

                                            transition:
                                                "border 0.2s ease, background 0.2s ease",
                                        }}
                                    />

                                );

                            }


                            return (

                                <div
                                    key={index}
                                    style={{
                                        minWidth: 0,

                                        height:
                                            "30px",

                                        display:
                                            "flex",

                                        alignItems:
                                            "center",

                                        justifyContent:
                                            "center",

                                        border:
                                            isCurrent
                                                ? "2px solid #d99100"
                                                : userRevealed || automaticRevealed
                                                    ? "1px solid #d99100"
                                                    : "1px solid #3a3d3f",

                                        borderRadius:
                                            "4px",

                                        background:
                                            visible
                                                ? "#111516"
                                                : "#111516",

                                        color: "#d5d3cb",

                                        fontFamily:
                                            "monospace",

                                        fontSize:
                                            "13px",

                                        animation:
                                            automaticRevealed &&
                                                index ===
                                                currentIndex
                                                ? "bitReveal 0.3s ease"
                                                : "none",

                                        transition:
                                            "all 0.2s ease",
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
                Automatic calculation
            ================================= */}

            {revealedCount >= 3 &&
                !allBitsVisible && (

                    <div className="choose-progress-card">
                        Automatically computing
                        the remaining bits...
                    </div>

                )}


            {/* =================================
                Final result
            ================================= */}

            {allBitsVisible && (

                <div className="choose-result-card">

                    <h4>
                        Maj(a, b, c) Result
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
   Majority Bit Row
===================================================== */

interface MajorityBitRowProps {

    label: string;

    bits: string;

    currentIndex: number;

    majorityValue: string;

    active: boolean;

}


function MajorityBitRow({
    label,
    bits,
    currentIndex,
    majorityValue,
    active,
}: MajorityBitRowProps) {

    return (

        <div
            style={{
                marginTop: "18px",
            }}
        >

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

                        const isCurrent =
                            active &&
                            index ===
                            currentIndex;


                        /*
                         * Only bits that are equal
                         * to the Majority value are
                         * highlighted.
                         *
                         * Example:
                         *
                         * 1 1 0
                         *
                         * Majority = 1
                         *
                         * → first two bits highlight
                         */

                        const isMajorityBit =
                            isCurrent &&
                            bit ===
                            majorityValue;


                        return (

                            <div
                                key={index}
                                style={{
                                    width:
                                        "100%",

                                    height:
                                        "30px",

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    border:
                                        isMajorityBit

                                            ? "2px solid #d99100"

                                            : "1px solid #3a3d3f",

                                    borderRadius:
                                        "4px",

                                    background:
                                        "#111516",

                                    color:
                                        "#d5d3cb",

                                    fontFamily:
                                        "monospace",

                                    fontSize:
                                        "13px",

                                    animation:
                                        isMajorityBit

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
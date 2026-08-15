import type { Word } from "../../utils/messageSchedule";

import {
    INITIAL_HASH,
    ROUND_CONSTANTS_BINARY,
} from "../../utils/constants";

import {
    calculateCompressionRounds,
} from "../../utils/compressionRounds";

import type {
    RoundResult,
} from "../../utils/compressionRounds";

import { useState } from "react";

import CompressionSigmaViewer
    from "../detail/CompressionSigmaViewer";

import ChooseViewer from "../detail/ChooseViewer";
import MajorityViewer from "../detail/MajorityViewer";


type Props = {

    words: Word[];

    compressionView:
    | "overview"
    | "t1"
    | "t2"
    | "working";

};


export default function CompressionStep({
    words,
    compressionView,
}: Props) {

    const [selectedT1Item, setSelectedT1Item] =
        useState<
            "h" | "sigma1" | "choose" | "k" | "w0"
        >("h");

    const [selectedT2Item, setSelectedT2Item] =
        useState<"sigma0" | "majority">("sigma0");

    const compressionResult =
        calculateCompressionRounds(
            INITIAL_HASH,
            words
        );


    const round =
        compressionResult.rounds[0];


    if (!round) {

        return (
            <p>
                Compression data is not available.
            </p>
        );

    }


    return (

        <div
            style={{
                padding: "8px",
            }}
        >

            {compressionView === "overview" && (

                <div className="compression-overview">

                    <div className="overview-label">
            // COMPRESSION OVERVIEW
                    </div>

                    <h2>
                        SHA-256 Compression
                    </h2>

                    <p className="overview-description">
                        SHA-256 processes the message through 64 rounds.
                        Each round follows the same computational structure,
                        using different working values, message words,
                        and round constants.
                    </p>


                    <div className="overview-round">

                        <div className="overview-round-label">
                            REPRESENTATIVE ROUND
                        </div>

                        <div className="overview-round-number">
                            ROUND 01 / 64
                        </div>

                        <p>
                            To make the compression process easier to understand,
                            this module visualises the first round as a
                            representative example.
                        </p>

                    </div>


                    <div className="overview-code">

                        <div className="overview-code-label">
                // ROUND PSEUDOCODE
                        </div>

                        <pre>
                            {`for i from 0 to 63
        T1 := h + Σ1(e) + Ch(e,f,g) + k[i] + w[i]
        T2 := Σ0(a) + Maj(a,b,c)
 
        h := g
        g := f
        f := e
        e := d + T1
        d := c
        c := b
        b := a
        a := T1 + T2`}
                        </pre>

                    </div>


                    <div className="overview-hint">

                        Use the controls in Step Details to explore
                        the algorithm in more detail.

                    </div>

                </div>

            )}


            {compressionView === "t1" && (

                <T1Preview
                    round={round}
                    selectedItem={selectedT1Item}
                    onSelect={setSelectedT1Item}
                />

            )}


            {compressionView === "t2" && (

                <T2Preview
                    round={round}
                    selectedItem={selectedT2Item}
                    onSelect={setSelectedT2Item}
                />

            )}

            {compressionView === "working" && (

                <div>

                    <h3>
                        Working Values
                    </h3>

                    <p
                        style={{
                            color: "#777",
                            lineHeight: 1.6,
                        }}
                    >
                        The compression function updates
                        eight working variables in every round.
                    </p>

                    <h4>
                        Initial Working Variables
                    </h4>


                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "10px",
                            marginTop: "15px",
                        }}
                    >

                        {[
                            "a = h0 = 0x6a09e667",
                            "b = h1 = 0xbb67ae85",
                            "c = h2 = 0x3c6ef372",
                            "d = h3 = 0xa54ff53a",
                            "e = h4 = 0x510e527f",
                            "f = h5 = 0x9b05688c",
                            "g = h6 = 0x1f83d9ab",
                            "h = h7 = 0x5be0cd19",
                        ].map((variable) => (

                            <div
                                key={variable}
                                style={{
                                    padding: "15px",
                                    border:
                                        "1px solid #d99100",
                                    borderRadius: "4px",
                                    background: "#111516",
                                    color: "#d5d3cb",
                                    textAlign: "center",
                                    fontFamily: "monospace",
                                }}
                            >
                                {variable}
                            </div>

                        ))}

                    </div>


                    <h4
                        style={{
                            marginTop: "30px",
                        }}
                    >
                        Working Variable Update Functions
                    </h4>


                    <div className="choose-instruction-card" >

                        <div>
                            a = T1 + T2
                        </div>

                        <div>
                            b = a
                        </div>

                        <div>
                            c = b
                        </div>

                        <div>
                            d = c
                        </div>

                        <div>
                            e = d + T1
                        </div>

                        <div>
                            f = e
                        </div>

                        <div>
                            g = f
                        </div>

                        <div>
                            h = g
                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}

function T1Preview({
    round,
    selectedItem,
    onSelect,
}: {
    round: RoundResult;

    selectedItem:
    | "h"
    | "sigma1"
    | "choose"
    | "k"
    | "w0";

    onSelect: (
        item:
            | "h"
            | "sigma1"
            | "choose"
            | "k"
            | "w0"
    ) => void;
}) {

    return (

        <div>

            <h3>
                T1 Formula
            </h3>


            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "25px",
                }}
            >

                <FormulaButton
                    selected={
                        selectedItem === "h"
                    }
                    onClick={() =>
                        onSelect("h")
                    }
                >
                    h
                </FormulaButton>


                <span>+</span>


                <FormulaButton
                    selected={
                        selectedItem === "sigma1"
                    }
                    onClick={() =>
                        onSelect("sigma1")
                    }
                >
                    Σ₁(e)
                </FormulaButton>


                <span>+</span>


                <FormulaButton
                    selected={
                        selectedItem === "choose"
                    }
                    onClick={() =>
                        onSelect("choose")
                    }
                >
                    Ch(e,f,g)
                </FormulaButton>


                <span>+</span>


                <FormulaButton
                    selected={
                        selectedItem === "k"
                    }
                    onClick={() =>
                        onSelect("k")
                    }
                >
                    K₀
                </FormulaButton>


                <span>+</span>


                <FormulaButton
                    selected={
                        selectedItem === "w0"
                    }
                    onClick={() =>
                        onSelect("w0")
                    }
                >
                    W₀
                </FormulaButton>

            </div>


            <div
                style={{
                    marginTop: "30px",
                }}
            >

                {selectedItem === "h" && (

                    <HViewer
                        round={round}
                    />

                )}


                {selectedItem === "sigma1" && (

                    <CompressionSigmaViewer
                        round={round}
                        sigmaType="sigma1"
                    />

                )}


                {selectedItem === "choose" && (

                    <ChooseViewer
                        round={round}
                    />

                )}


                {selectedItem === "k" && (

                    <KViewer />

                )}


                {selectedItem === "w0" && (

                    <W0Viewer
                        word={round.word}
                    />

                )}

            </div>

        </div>

    );
}

function FormulaButton({
    children,
    selected,
    onClick,
}: {
    children: React.ReactNode;
    selected: boolean;
    onClick: () => void;
}) {

    return (
        <button
            onClick={onClick}
            className={`compression-formula-button ${selected ? "selected" : ""
                }`}
        >
            {children}
        </button>
    );
}




function T2Preview({
    round,
    selectedItem,
    onSelect,
}: {
    round: RoundResult;

    selectedItem:
    | "sigma0"
    | "majority";

    onSelect: (
        item:
            | "sigma0"
            | "majority"
    ) => void;
}) {

    return (

        <div>

            <h3>
                T2 Formula
            </h3>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    marginTop: "30px",
                }}
            >

                <FormulaButton
                    selected={
                        selectedItem === "sigma0"
                    }
                    onClick={() =>
                        onSelect("sigma0")
                    }
                >
                    Σ₀(a)
                </FormulaButton>


                <span>
                    +
                </span>


                <FormulaButton
                    selected={
                        selectedItem === "majority"
                    }
                    onClick={() =>
                        onSelect("majority")
                    }
                >
                    Maj(a,b,c)
                </FormulaButton>

            </div>


            <div
                style={{
                    marginTop: "30px",
                }}
            >

                {selectedItem === "sigma0" && (

                    <CompressionSigmaViewer
                        round={round}
                        sigmaType="sigma0"
                    />

                )}


                {selectedItem === "majority" && (

                    <MajorityViewer
                        round={round}
                    />

                )}

            </div>

        </div>

    );
}


function HViewer({
    round,
}: {
    round: RoundResult;
}) {

    return (

        <div
            className="compression-detail-card"
        >

            <h3>
                h
            </h3>


            <p>
                The current value of h is
                used directly in the T1
                calculation.
            </p>


            <div
                style={{
                    marginTop: "20px",
                    padding: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    background: "#0b0e0f",
                }}
            >

                <div
                    style={{
                        fontSize: "12px",
                        color: "#aaa",
                        marginBottom: "10px",
                        fontFamily: "monospace",
                        letterSpacing: "0.08em",
                    }}
                >
                    h
                </div>


                <pre
                    style={{
                        margin: 0,
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "#e6e1d8",
                        lineHeight: 1.7,
                        letterSpacing: "0.04em",
                    }}
                >
                    {round.workingVariables.h}
                </pre>

            </div>

        </div>

    );
}

function W0Viewer({
    word,
}: {
    word: Word;
}) {

    return (

        <div
            className="compression-detail-card"
        >

            <h3>
                W₀
            </h3>


            <p>
                W₀ is the first 32-bit word
                from the message schedule and
                is used directly in T1.
            </p>


            <div
                style={{
                    marginTop: "20px",
                    display: "grid",
                    gridTemplateColumns:
                        "1fr 1fr",
                    gap: "12px",
                }}
            >

                {/* =========================
                    Index
                ========================= */}

                <div
                    style={{
                        padding: "16px",
                        border: "1px solid #3a3d3f",
                        borderRadius: "6px",
                        background: "#0b0e0f",
                    }}
                >

                    <div
                        style={{
                            fontSize: "12px",
                            color: "#aaa",
                            marginBottom: "10px",
                            fontFamily: "monospace",
                            letterSpacing: "0.08em",
                        }}
                    >
                        Index
                    </div>

                    <strong
                        style={{
                            color: "#e6e1d8",
                            fontFamily: "monospace",
                            fontSize: "16px",
                        }}
                    >
                        W{word.index}
                    </strong>

                </div>


                {/* =========================
                    Hex
                ========================= */}

                <div
                    style={{
                        padding: "16px",
                        border: "1px solid #3a3d3f",
                        borderRadius: "6px",
                        background: "#0b0e0f",
                    }}
                >

                    <div
                        style={{
                            fontSize: "12px",
                            color: "#aaa",
                            marginBottom: "10px",
                            fontFamily: "monospace",
                            letterSpacing: "0.08em",
                        }}
                    >
                        Hex
                    </div>

                    <code
                        style={{
                            color: "#e6e1d8",
                            fontFamily: "monospace",
                            fontSize: "15px",
                        }}
                    >
                        {word.hex}
                    </code>

                </div>

            </div>


            {/* =========================
                Binary
            ========================= */}

            <div
                style={{
                    marginTop: "12px",
                    padding: "16px",
                    border: "1px solid #3a3d3f",
                    borderRadius: "6px",
                    background: "#0b0e0f",
                }}
            >

                <div
                    style={{
                        fontSize: "12px",
                        color: "#aaa",
                        marginBottom: "10px",
                        fontFamily: "monospace",
                        letterSpacing: "0.08em",
                    }}
                >
                    Binary
                </div>


                <pre
                    style={{
                        margin: 0,
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "#e6e1d8",
                        lineHeight: 1.7,
                        letterSpacing: "0.04em",
                    }}
                >
                    {word.binary}
                </pre>

            </div>

        </div>

    );
}


function KViewer() {

    return (

        <div
            className="compression-detail-card"
        >

            <h3>
                SHA-256 Round Constants
            </h3>


            <p>
                Each compression round uses
                one fixed 32-bit constant K.
                SHA-256 defines 64 constants
                in total.
            </p>


            <div
                style={{
                    marginTop: "20px",
                    maxHeight: "360px",
                    overflowY: "auto",
                    border: "1px solid #3a3d3f",
                    borderRadius: "6px",
                    background: "#0b0e0f",
                }}
            >

                {ROUND_CONSTANTS_BINARY.map(
                    (constant, index) => (

                        <div
                            key={index}
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "60px 1fr",
                                gap: "15px",
                                padding:
                                    "9px 14px",

                                borderBottom:
                                    index !==
                                        ROUND_CONSTANTS_BINARY.length - 1
                                        ? "1px solid #303335"
                                        : "none",

                                fontFamily:
                                    "monospace",

                                fontSize: "13px",

                                color: "#e6e1d8",

                                background:
                                    index === 0
                                        ? "#14181a"
                                        : "transparent",
                            }}
                        >

                            <strong
                                style={{
                                    color:
                                        index === 0
                                            ? "#d99100"
                                            : "#d6d0c7",
                                }}
                            >
                                K{index}
                            </strong>


                            <span
                                style={{
                                    wordBreak:
                                        "break-all",
                                    color: "#aaa",
                                    letterSpacing:
                                        "0.03em",
                                }}
                            >
                                {constant}
                            </span>

                        </div>

                    )
                )}

            </div>

        </div>

    );
}
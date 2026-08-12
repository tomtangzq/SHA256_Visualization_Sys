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
    "t1"
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

            <h2>
                Compression
            </h2>


            <p
                style={{
                    color: "#666",
                    lineHeight: 1.6,
                }}
            >
                SHA-256 processes the message
                through 64 rounds. This
                visualisation focuses on the
                first round.
            </p>


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
                            color: "#666",
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
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    background: "#fafafa",
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


                    <div
                        style={{
                            padding: "20px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            background: "#fafafa",
                            fontFamily: "monospace",
                            lineHeight: 2,
                        }}
                    >

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
            style={{
                padding: "12px 18px",

                borderRadius: "8px",

                border: selected
                    ? "2px solid #1976d2"
                    : "1px solid #ccc",

                background: selected
                    ? "#eaf2ff"
                    : "#ffffff",

                color: "#171717",

                fontFamily: "monospace",

                fontSize: "15px",

                fontWeight: selected
                    ? 600
                    : 400,

                cursor: "pointer",

                transition:
                    "all 0.15s ease",
            }}
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
                    borderRadius: "8px",
                    background: "#fafafa",
                }}
            >

                <div
                    style={{
                        fontSize: "13px",
                        color: "#777",
                        marginBottom: "8px",
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

                <div
                    style={{
                        padding: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        background: "#fafafa",
                    }}
                >

                    <div
                        style={{
                            fontSize: "12px",
                            color: "#777",
                            marginBottom: "8px",
                        }}
                    >
                        Index
                    </div>

                    <strong>
                        W{word.index}
                    </strong>

                </div>


                <div
                    style={{
                        padding: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        background: "#fafafa",
                    }}
                >

                    <div
                        style={{
                            fontSize: "12px",
                            color: "#777",
                            marginBottom: "8px",
                        }}
                    >
                        Hex
                    </div>

                    <code>
                        {word.hex}
                    </code>

                </div>

            </div>


            <div
                style={{
                    marginTop: "12px",
                    padding: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    background: "#fafafa",
                }}
            >

                <div
                    style={{
                        fontSize: "12px",
                        color: "#777",
                        marginBottom: "8px",
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
                    border: "1px solid #ddd",
                    borderRadius: "8px",
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
                                    "1px solid #eee",
                                fontFamily:
                                    "monospace",
                                fontSize: "13px",
                            }}
                        >

                            <strong>
                                K{index}
                            </strong>


                            <span
                                style={{
                                    wordBreak:
                                        "break-all",
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
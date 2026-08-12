import type { RoundResult } from "../../utils/compressionRounds";

import RotateAnimation from "../animation/RotateAnimation";

import { formatBinary } from "../../utils/formatBinary";


interface CompressionSigmaViewerProps {

    round: RoundResult;

    sigmaType: "sigma0" | "sigma1";

}


export default function CompressionSigmaViewer({
    round,
    sigmaType,
}: CompressionSigmaViewerProps) {

    const isSigma0 =
        sigmaType === "sigma0";


    /*
     * Compression Sigma parameters
     *
     * Σ0:
     * ROTR2  ⊕ ROTR13 ⊕ ROTR22
     *
     * Σ1:
     * ROTR6  ⊕ ROTR11 ⊕ ROTR25
     */

    const rotate1Bits =
        isSigma0 ? 2 : 6;

    const rotate2Bits =
        isSigma0 ? 13 : 11;

    const rotate3Bits =
        isSigma0 ? 22 : 25;


    /*
     * Input variable
     */

    const original =
        isSigma0
            ? round.workingVariables.a
            : round.workingVariables.e;


    /*
     * Calculated result from the
     * actual compression algorithm.
     */

    const sigmaResult =
        isSigma0
            ? round.sigma0.result
            : round.sigma.result;


    const title =
        isSigma0
            ? "Σ₀(a)"
            : "Σ₁(e)";


    return (

        <div>

            <h3
                style={{
                    marginBottom: "12px",
                }}
            >
                {title}
            </h3>


            <p
                style={{
                    color: "#666",
                    lineHeight: 1.6,
                }}
            >

                {isSigma0

                    ? "Σ₀ combines three right-rotated versions of a using XOR."

                    : "Σ₁ combines three right-rotated versions of e using XOR."

                }

            </p>


            {/* =================================
                Original value
            ================================= */}

            <div
                style={{
                    marginTop: "20px",
                    marginBottom: "25px",
                    padding: "15px",
                    border: "1px solid #ddd",
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
                    {isSigma0 ? "a" : "e"}
                </div>


                <pre
                    style={{
                        margin: 0,
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {formatBinary(original)}
                </pre>

            </div>


            {/* =================================
                ROTR 1
            ================================= */}

            <RotateAnimation
                title={`ROTR ${rotate1Bits}`}
                original={original}
                rotateBits={rotate1Bits}
            />


            {/* =================================
                ROTR 2
            ================================= */}

            <RotateAnimation
                title={`ROTR ${rotate2Bits}`}
                original={original}
                rotateBits={rotate2Bits}
            />


            {/* =================================
                ROTR 3
            ================================= */}

            <RotateAnimation
                title={`ROTR ${rotate3Bits}`}
                original={original}
                rotateBits={rotate3Bits}
            />


            {/* =================================
                XOR Result
            ================================= */}

            <div
                style={{
                    marginTop: "25px",
                    padding: "18px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#fafafa",
                }}
            >

                <h4
                    style={{
                        marginTop: 0,
                    }}
                >
                    XOR the three results
                </h4>


                <p
                    style={{
                        color: "#666",
                        fontSize: "14px",
                        lineHeight: 1.6,
                    }}
                >
                    The three rotated values are
                    combined bit by bit using XOR.
                </p>


                <div
                    style={{
                        marginTop: "15px",
                    }}
                >

                    <div
                        style={{
                            fontSize: "12px",
                            color: "#777",
                            marginBottom: "8px",
                        }}
                    >
                        {title}
                    </div>


                    <pre
                        style={{
                            margin: 0,
                            fontFamily: "monospace",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}
                    >
                        {formatBinary(sigmaResult)}
                    </pre>

                </div>

            </div>

        </div>

    );
}
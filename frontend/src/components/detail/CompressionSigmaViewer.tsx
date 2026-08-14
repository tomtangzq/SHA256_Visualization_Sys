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


    const original =
        isSigma0
            ? round.workingVariables.a
            : round.workingVariables.e;


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

            <div className="compression-original">

                <div className="compression-value-label">
                    {isSigma0 ? "a" : "e"}
                </div>


                <pre className="compression-binary">
                    {formatBinary(original)}
                </pre>

            </div>


            {/* =================================
                ROTR 1
            ================================= */}

            <div className="sigma-operation">

                <div className="sigma-operation-header">

                    <span>
                        ROTR
                    </span>

                    <strong>
                        {rotate1Bits}
                    </strong>

                </div>

                <RotateAnimation

                    original={original}
                    rotateBits={rotate1Bits}
                />
            </div>


            {/* =================================
                ROTR 2
            ================================= */}

            <div className="sigma-operation">

                <div className="sigma-operation-header">

                    <span>
                        ROTR
                    </span>

                    <strong>
                        {rotate2Bits}
                    </strong>

                </div>

                <RotateAnimation

                    original={original}
                    rotateBits={rotate2Bits}
                />

            </div>


            {/* =================================
                ROTR 3
            ================================= */}

            <div className="sigma-operation">

                <div className="sigma-operation-header">

                    <span>
                        ROTR
                    </span>

                    <strong>
                        {rotate3Bits}
                    </strong>

                </div>

                <RotateAnimation

                    original={original}
                    rotateBits={rotate3Bits}
                />
            </div>


            {/* =================================
                XOR Result
            ================================= */}

            <div className="compression-xor-result">

                <h4 className="compression-xor-title">
                    XOR the three results
                </h4>


                <p className="compression-xor-description">
                    The three rotated values are
                    combined bit by bit using XOR.
                </p>


                <div className="compression-xor-value">

                    <div className="compression-value-label">
                        {title}
                    </div>


                    <pre className="compression-binary">
                        {formatBinary(sigmaResult)}
                    </pre>

                </div>

            </div>

        </div>

    );
}
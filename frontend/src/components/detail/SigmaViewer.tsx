import type { Word } from "../../utils/messageSchedule";

import {

    getSigma0Steps,

    getSigma1Steps,

} from "../../utils/sha256Functions";

import RotateAnimation from "../animation/RotateAnimation";

import ShiftAnimation from "../animation/ShiftAnimation";

import { formatBinary } from "../../utils/formatBinary";

interface SigmaViewerProps {

    sigmaType: "sigma0" | "sigma1";

    word: Word;

}

export default function SigmaViewer({

    sigmaType,

    word,

}: SigmaViewerProps) {

    // 根据类型计算步骤
    const steps =
        sigmaType === "sigma0"
            ? getSigma0Steps(word.binary)
            : getSigma1Steps(word.binary);

    // 不同 sigma 的参数
    const rotate1Bits =
        sigmaType === "sigma0" ? 7 : 17;

    const rotate2Bits =
        sigmaType === "sigma0" ? 18 : 19;

    const shiftBits =
        sigmaType === "sigma0" ? 3 : 10;

    return (

        <div>

            {/* Title */}

            <h2>

                {
                    sigmaType === "sigma0"
                        ? `σ₀(W${word.index})`
                        : `σ₁(W${word.index})`
                }

            </h2>

            {/* Description */}

            <p>

                {
                    sigmaType === "sigma0"

                        ? "Small Sigma 0 is calculated by rotating right 7 bits, rotating right 18 bits, and shifting right 3 bits."

                        : "Small Sigma 1 is calculated by rotating right 17 bits, rotating right 19 bits, and shifting right 10 bits."

                }

            </p>

            <hr />

            {/* Formula */}

            <h3>Formula</h3>

            <pre>

                {
                    sigmaType === "sigma0"

                        ? "σ₀(x)=ROTR⁷(x) ⊕ ROTR¹⁸(x) ⊕ SHR³(x)"

                        : "σ₁(x)=ROTR¹⁷(x) ⊕ ROTR¹⁹(x) ⊕ SHR¹⁰(x)"

                }

            </pre>

            <hr />

            {/* Original */}

            <h3>Original</h3>

            <pre
                style={{
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                }}
            >
                {formatBinary(steps.original)}
            </pre>

            <hr />

            {/* ROTR 1 */}

            <RotateAnimation

                title={`ROTR ${rotate1Bits}`}

                original={steps.original}

                rotateBits={rotate1Bits}

            />

            <hr />

            {/* ROTR 2 */}

            <RotateAnimation

                title={`ROTR ${rotate2Bits}`}

                original={steps.original}

                rotateBits={rotate2Bits}

            />

            <hr />

            {/* SHR */}

            <ShiftAnimation

                title={`SHR ${shiftBits}`}

                original={steps.original}

                shiftBits={shiftBits}

            />

            <hr />

            {/* Final Result */}

            <h3>Result</h3>

            <pre
                style={{
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                }}
            >
                {formatBinary(steps.result)}
            </pre>

        </div>

    );

}
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

            <h2 style={{
                color: "#3b3b3b",
                marginBottom: "15px",
            }}>

                {
                    sigmaType === "sigma0"
                        ? `σ₀(W${word.index}) = ROTR7 (W${word.index}) ⊕ ROTR18 (W${word.index}) ⊕ SHR3 (W${word.index})`
                        : `σ₁(W${word.index}) = ROTR17 (W${word.index}) ⊕ ROTR19 (W${word.index}) ⊕ SHR10 (W${word.index})`
                }

            </h2>

            {/* ROTR 1 */}

            <RotateAnimation

                title={`ROTR ${rotate1Bits}`}

                original={steps.original}

                rotateBits={rotate1Bits}

            />



            {/* ROTR 2 */}

            <RotateAnimation

                title={`ROTR ${rotate2Bits}`}

                original={steps.original}

                rotateBits={rotate2Bits}

            />



            {/* SHR */}

            <ShiftAnimation

                title={`SHR ${shiftBits}`}

                original={steps.original}

                shiftBits={shiftBits}

            />


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
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

    const steps =
        sigmaType === "sigma0"
            ? getSigma0Steps(word.binary)
            : getSigma1Steps(word.binary);

    const rotate1Bits =
        sigmaType === "sigma0" ? 7 : 17;

    const rotate2Bits =
        sigmaType === "sigma0" ? 18 : 19;

    const shiftBits =
        sigmaType === "sigma0" ? 3 : 10;

    const sigmaLabel =
        sigmaType === "sigma0"
            ? "SIGMA₀"
            : "SIGMA₁";

    const formula =
        sigmaType === "sigma0"
            ? `σ₀(W${word.index}) = ROTR7(W${word.index}) ⊕ ROTR18(W${word.index}) ⊕ SHR3(W${word.index})`
            : `σ₁(W${word.index}) = ROTR17(W${word.index}) ⊕ ROTR19(W${word.index}) ⊕ SHR10(W${word.index})`;

    return (

        <div className="sigma-viewer">

            {/* Formula Header */}

            <div className="sigma-formula">

                <div className="sigma-formula-label">
                    {sigmaLabel} OPERATION
                </div>

                <div className="sigma-formula-value">
                    {formula}
                </div>

            </div>


            {/* ROTR 1 */}

            <div className="sigma-operation">

                <div className="sigma-operation-header">

                    <span>
                        Right Rotate
                    </span>

                    <strong>
                        {rotate1Bits}
                    </strong>

                </div>

                <RotateAnimation
                    // title={`ROTR ${rotate1Bits}`}
                    original={steps.original}
                    rotateBits={rotate1Bits}
                />

            </div>


            {/* ROTR 2 */}

            <div className="sigma-operation">

                <div className="sigma-operation-header">

                    <span>
                        Right Rotate
                    </span>

                    <strong>
                        {rotate2Bits}
                    </strong>

                </div>

                <RotateAnimation
                    // title={`ROTR ${rotate2Bits}`}
                    original={steps.original}
                    rotateBits={rotate2Bits}
                />

            </div>


            {/* SHR */}

            <div className="sigma-operation">

                <div className="sigma-operation-header">

                    <span>
                        Right Shift
                    </span>

                    <strong>
                        {shiftBits}
                    </strong>

                </div>

                <ShiftAnimation
                    original={steps.original}
                    shiftBits={shiftBits}
                />

            </div>


            {/* Final Result */}

            <div className="sigma-result">

                <div className="sigma-result-header">
                    RESULT
                </div>

                <pre className="sigma-result-value">
                    {formatBinary(steps.result)}
                </pre>

            </div>

        </div>
    );
}
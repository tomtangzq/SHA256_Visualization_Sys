type SigmaCalculationProps = {

    title: string;

    inputBinary: string;

    rotate1: string;

    rotate2: string;

    shift: string;

    result: string;

    rotate1Label: string;

    rotate2Label: string;

    shiftLabel: string;

};

export default function SigmaCalculation({
    title,
    inputBinary,
    rotate1,
    rotate2,
    shift,
    result,
    rotate1Label,
    rotate2Label,
    shiftLabel,
}: SigmaCalculationProps) {
    return (
        <div>

            <h3>{title}</h3>

            <p>Original</p>

            <pre>{inputBinary}</pre>

            <p>{rotate1Label}</p>

            <pre>{rotate1}</pre>

            <p>{rotate2Label}</p>

            <pre>{rotate2}</pre>

            <p>{shiftLabel}</p>

            <pre>{shift}</pre>

            <p>XOR Result</p>

            <pre>{result}</pre>

        </div>
    );
}
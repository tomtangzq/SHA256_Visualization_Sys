import { formatBinary } from "../../utils/formatBinary";

interface WordViewerProps {

    wordIndex: number;

    hex: string;

    binary: string;

    isExpanded?: boolean;

}

export default function WordViewer({

    wordIndex,

    hex,

    binary,

    isExpanded,

}: WordViewerProps) {

    return (

        <div>

            <h2>
                Word W{wordIndex}
            </h2>

            {/* <p>

                {isExpanded
                    ? "Expanded word generated during message schedule expansion."
                    : "Initial 32-bit word extracted from the padded message."
                }

            </p>

            <hr /> */}

            <h3>Binary</h3>

            <pre
                style={{
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                }}
            >
                {formatBinary(binary)}
            </pre>

        </div>

    );

}
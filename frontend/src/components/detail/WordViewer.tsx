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
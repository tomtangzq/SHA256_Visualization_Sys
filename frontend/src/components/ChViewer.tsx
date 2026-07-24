import OperationViewer from "./OperationViewer";
import type { ChResult } from "../utils/compressionFunctions";

type Props = {
    ch: ChResult;
};


function ChViewer({

    ch

}: Props) {
    const {
        x,
        y,
        z,
        notX,
        xAndY,
        notXAndZ,
        result
    } = ch;

    return (

        <OperationViewer

            title="Ch(e,f,g)"

            rows={[

                {

                    label: "NOT e",

                    value: notX,

                    compareValue: x

                },

                {

                    label: "e AND f",

                    value: xAndY

                },

                {

                    label: "NOT e AND g",

                    value: notXAndZ

                },

                {

                    label: "Ch",

                    value: result,

                    bold: true

                }

            ]}

        />

    );

}

export default ChViewer;
import OperationViewer from "./OperationViewer";
import type { SigmaResult } from "../utils/compressionFunctions";

type Props = {

    title: string;

    sigma: SigmaResult;

}

function SigmaViewer({

    title,

    sigma

}: Props) {
    const {
        original,
        rotate6,
        rotate11,
        rotate25,
        result
    } = sigma;

    return (

        <OperationViewer

            title={title}

            rows={[

                {

                    label: "ROTR 6",

                    value: rotate6,

                    compareValue: original

                },

                {

                    label: "ROTR 11",

                    value: rotate11,

                    compareValue: original

                },

                {

                    label: "ROTR 25",

                    value: rotate25,

                    compareValue: original

                },

                {

                    label: "Σ1",

                    value: result,

                    bold: true

                }

            ]}

        />

    );

}

export default SigmaViewer;
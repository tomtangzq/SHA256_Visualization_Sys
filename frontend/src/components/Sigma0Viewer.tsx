import OperationViewer from "./OperationViewer";
import { type Sigma0Result } from "../utils/compressionFunctions";

type Props = {
    title: string;
    sigma0: Sigma0Result;
};

function Sigma0Viewer({
    title,
    sigma0
}: Props) {

    const {
        original,
        rotate2,
        rotate13,
        rotate22,
        result
    } = sigma0;

    return (

        <OperationViewer

            title={title}

            rows={[

                {
                    label: "Original",
                    value: original
                },

                {
                    label: "ROTR 2",
                    value: rotate2,
                    compareValue: original
                },

                {
                    label: "ROTR 13",
                    value: rotate13,
                    compareValue: original
                },

                {
                    label: "ROTR 22",
                    value: rotate22,
                    compareValue: original
                },

                {
                    label: "Σ0",
                    value: result,
                    bold: true
                }

            ]}

        />

    );

}

export default Sigma0Viewer;
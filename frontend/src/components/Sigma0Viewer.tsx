import OperationViewer from "./OperationViewer";
import { type Sigma0Result } from "../utils/compressionFunctions";

type Props = {
    title: string;
    original: string;
    sigma0: Sigma0Result;
};

function Sigma0Viewer({
    title,
    original,
    sigma0
}: Props) {

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
                    value: sigma0.rotate2,
                    compareValue: original
                },

                {
                    label: "ROTR 13",
                    value: sigma0.rotate13,
                    compareValue: original
                },

                {
                    label: "ROTR 22",
                    value: sigma0.rotate22,
                    compareValue: original
                },

                {
                    label: "Σ0",
                    value: sigma0.result,
                    bold: true
                }

            ]}

        />

    );

}

export default Sigma0Viewer;
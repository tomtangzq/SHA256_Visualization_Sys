import OperationViewer from "./OperationViewer";
import { type T2Result } from "../utils/compressionFunctions";

type Props = {
    t2: T2Result;
};

function T2Viewer({ t2 }: Props) {

    return (

        <OperationViewer

            title="T2 Calculation"

            rows={[

                {
                    label: "Σ0(a)",
                    value: t2.sigma0
                },

                {
                    label: "Maj(a,b,c)",
                    value: t2.maj
                },

                {
                    label: "T2",
                    value: t2.result,
                    bold: true
                }

            ]}

        />

    );

}

export default T2Viewer;
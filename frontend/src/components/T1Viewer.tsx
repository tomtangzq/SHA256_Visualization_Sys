import OperationViewer from "./OperationViewer";
import { type T1Result } from "../utils/compressionFunctions";

type Props = {
    t1: T1Result;
};

function T1Viewer({ t1 }: Props) {

    return (

        <OperationViewer

            title="T1 Calculation"

            rows={[

                {
                    label: "h",
                    value: t1.h
                },

                {
                    label: "Σ1(e)",
                    value: t1.sigma1
                },

                {
                    label: "Sum 1",
                    value: t1.sum1
                },

                {
                    label: "Ch(e,f,g)",
                    value: t1.ch
                },

                {
                    label: "Sum 2",
                    value: t1.sum2
                },

                {
                    label: "K0",
                    value: t1.k
                },

                {
                    label: "Sum 3",
                    value: t1.sum3
                },

                {
                    label: "W0",
                    value: t1.w
                },

                {
                    label: "T1",
                    value: t1.result,
                    bold: true
                }

            ]}

        />

    );

}

export default T1Viewer;
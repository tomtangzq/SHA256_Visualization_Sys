import OperationViewer from "./OperationViewer";
import { type MajResult } from "../utils/compressionFunctions";

type Props = {

    originalA: string;

    originalB: string;

    originalC: string;

    maj: MajResult;

};

function MajViewer({

    originalA,

    originalB,

    originalC,

    maj

}: Props) {

    return (

        <OperationViewer

            title="Maj(a,b,c)"

            rows={[

                {
                    label: "a",
                    value: originalA
                },

                {
                    label: "b",
                    value: originalB
                },

                {
                    label: "c",
                    value: originalC
                },

                {
                    label: "a AND b",
                    value: maj.xAndY
                },

                {
                    label: "a AND c",
                    value: maj.xAndZ
                },

                {
                    label: "b AND c",
                    value: maj.yAndZ
                },

                {
                    label: "Maj",
                    value: maj.result,
                    bold: true
                }

            ]}

        />

    );

}

export default MajViewer;
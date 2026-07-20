import OperationViewer from "./OperationViewer";

type Props = {

    title: string;

    original: string;

    rotate6: string;

    rotate11: string;

    rotate25: string;

    result: string;

};

function SigmaViewer({

    title,

    original,

    rotate6,

    rotate11,

    rotate25,

    result

}: Props) {

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
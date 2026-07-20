import OperationViewer from "./OperationViewer";

type Props = {

    original: string;

    notX: string;

    xAndY: string;

    notXAndZ: string;

    result: string;

};

function ChViewer({

    original,

    notX,

    xAndY,

    notXAndZ,

    result

}: Props) {

    return (

        <OperationViewer

            title="Ch(e,f,g)"

            rows={[

                {

                    label: "NOT e",

                    value: notX,

                    compareValue: original

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
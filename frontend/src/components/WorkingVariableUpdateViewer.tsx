import type { UpdatedWorkingVariables } from "../utils/compressionFunctions";
import { binaryToHex } from "../utils/sha256Functions";

type Props = {

    oldVariables: {

        a: string;
        b: string;
        c: string;
        d: string;
        e: string;
        f: string;
        g: string;
        h: string;

    };

    updatedVariables: UpdatedWorkingVariables;

};

function WorkingVariableUpdateViewer({

    oldVariables,
    updatedVariables

}: Props) {

    const rows = [

        {
            variable: "a",
            oldBinary: oldVariables.a,
            newBinary: updatedVariables.a
        },

        {
            variable: "b",
            oldBinary: oldVariables.b,
            newBinary: updatedVariables.b
        },

        {
            variable: "c",
            oldBinary: oldVariables.c,
            newBinary: updatedVariables.c
        },

        {
            variable: "d",
            oldBinary: oldVariables.d,
            newBinary: updatedVariables.d
        },

        {
            variable: "e",
            oldBinary: oldVariables.e,
            newBinary: updatedVariables.e
        },

        {
            variable: "f",
            oldBinary: oldVariables.f,
            newBinary: updatedVariables.f
        },

        {
            variable: "g",
            oldBinary: oldVariables.g,
            newBinary: updatedVariables.g
        },

        {
            variable: "h",
            oldBinary: oldVariables.h,
            newBinary: updatedVariables.h
        }

    ];

    return (

        <div>

            <h2>Updated Working Variables</h2>

            <table
                style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    marginTop: "20px"
                }}
            >

                <thead>

                    <tr>

                        <th>Variable</th>

                        <th>Old (Hex)</th>

                        <th>New (Hex)</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        rows.map((row) => (

                            <tr key={row.variable}>

                                <td>{row.variable}</td>

                                <td>{binaryToHex(row.oldBinary)}</td>

                                <td>{binaryToHex(row.newBinary)}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default WorkingVariableUpdateViewer;
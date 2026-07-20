import BinaryDisplay from "./BinaryDisplay";

export interface OperationRow {

    label: string;

    value: string;

    compareValue?: string;

    bold?: boolean;

}

type Props = {

    title: string;

    rows: OperationRow[];

};

function OperationViewer({

    title,

    rows

}: Props) {

    return (

        <>

            <h3>{title}</h3>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <tbody>

                    {rows.map((row) => (

                        <tr key={row.label}>

                            <td>

                                {

                                    row.bold

                                        ?

                                        <strong>{row.label}</strong>

                                        :

                                        row.label

                                }

                            </td>

                            <td>

                                <BinaryDisplay

                                    binary={row.value}

                                    compareBinary={row.compareValue}

                                />

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </>

    );

}

export default OperationViewer;
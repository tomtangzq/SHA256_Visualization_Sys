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
    rows,
}: Props) {

    return (
        <div className="operation-viewer">

            {/* Operation title */}

            <div className="operation-title">
                {title}
            </div>


            {/* Operation rows */}

            <div className="operation-rows">

                {rows.map((row, index) => (

                    <div
                        className={`operation-row ${row.bold
                                ? "operation-row-result"
                                : ""
                            }`}
                        key={row.label}
                    >

                        <div
                            className="operation-label"
                        >
                            {row.bold ? (
                                <strong>
                                    {row.label}
                                </strong>
                            ) : (
                                row.label
                            )}
                        </div>


                        <div className="operation-value">

                            <BinaryDisplay
                                binary={row.value}
                                compareBinary={
                                    row.compareValue
                                }
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default OperationViewer;
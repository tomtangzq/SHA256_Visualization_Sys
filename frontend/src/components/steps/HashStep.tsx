import { INITIAL_HASH } from "../../utils/constants";
import {
    calculateCompressionRounds,
} from "../../utils/compressionRounds";
import {
    calculatePadding,
} from "../../utils/padding";
import {
    binaryString,
} from "../../utils/binary";
import {
    generateMessageSchedule,
} from "../../utils/messageSchedule";
import {
    calculateFinalHash,
} from "../../utils/finalHash";


type Props = {
    input: string;
};


export default function HashStep({
    input,
}: Props) {

    const binary =
        binaryString(input);

    const padding =
        calculatePadding(binary);

    const words =
        generateMessageSchedule(
            padding.finalBlock512
        );

    const compressionResult =
        calculateCompressionRounds(
            INITIAL_HASH,
            words
        );

    const finalWorkingVariables =
        compressionResult
            .finalWorkingVariables;


    const finalHash =
        calculateFinalHash(
            INITIAL_HASH,
            finalWorkingVariables
        );


    /*
     * Initial hash values
     */

    const initialValues = [
        INITIAL_HASH.a,
        INITIAL_HASH.b,
        INITIAL_HASH.c,
        INITIAL_HASH.d,
        INITIAL_HASH.e,
        INITIAL_HASH.f,
        INITIAL_HASH.g,
        INITIAL_HASH.h,
    ];


    /*
     * Final working values
     */

    const workingValues = [
        finalWorkingVariables.a,
        finalWorkingVariables.b,
        finalWorkingVariables.c,
        finalWorkingVariables.d,
        finalWorkingVariables.e,
        finalWorkingVariables.f,
        finalWorkingVariables.g,
        finalWorkingVariables.h,
    ];



    const updatedValues =
        initialValues.map(
            (initial, index) => {

                const working =
                    workingValues[index];

                return addBinary32(
                    initial,
                    working
                );

            }
        );


    return (

        <div>

            <h2>
                Hash
            </h2>


            <p
                style={{
                    color: "#666",
                    lineHeight: 1.6,
                }}
            >
                The final working values are
                added to the initial hash values
                to produce the updated hash values.
            </p>


            {/* =================================
                Updated Hash Values
            ================================= */}

            <section
                style={{
                    marginTop: "20px",
                    padding: "18px 20px",
                    border: "1px solid #3a3d3f",
                    borderRadius: "8px",
                    background: "#111516",
                }}
            >
                <h3
                    style={{
                        marginTop: 0,
                        marginBottom: "16px",
                    }}
                >
                    FinalUpdated Hash Values
                </h3>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(2, minmax(0, 1fr))",
                        gap: "10px",
                    }}
                >
                    {updatedValues.map((_, index) => {

                        const variable =
                            String.fromCharCode(
                                97 + index
                            );

                        return (
                            <div
                                key={index}
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: "15px",
                                    padding: "10px 14px",
                                    border: "1px solid #cf7d02d3",
                                    borderRadius: "6px",
                                    background: "#111516",
                                    color: "#d5d3cb",
                                }}
                            >
                                h{index}' = h{index} + {variable}
                            </div>
                        );

                    })}
                </div>
            </section>


            {/* =================================
                Merge
            ================================= */}

            <section
                style={{
                    marginTop: "20px",
                    padding: "20px 22px",
                    border: "1px solid #3a3d3f",
                    borderRadius: "8px",
                    background: "#111516",
                }}
            >
                <h3
                    style={{
                        marginTop: 0,
                        marginBottom: "20px",
                    }}
                >
                    Final Hash
                </h3>

                <div>

                    <div
                        style={{
                            fontSize: "14px",
                            color: "#777",
                            marginBottom: "10px",
                        }}
                    >
                        Merge
                    </div>

                    <div
                        style={{
                            padding: "14px 18px",
                            background: "#111516",
                            border: "1px solid #cf7d02d3",
                            color: "#d5d3cb",
                            borderRadius: "8px",
                            fontFamily: "monospace",
                            fontSize: "15px",
                            lineHeight: "1.8",
                        }}
                    >
                        <div>
                            h0' || h1' || h2' || h3' || h4' || h5' || h6' || h7'
                        </div>
                    </div>

                </div>


                {/* =========================
                    Final 256-bit Hash
                    ========================= */}

                <div
                    style={{
                        marginTop: "22px",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                        }}
                    >

                        <div
                            style={{
                                fontSize: "14px",
                                color: "#777",
                            }}
                        >
                            Final 256-bit Hash
                        </div>

                        <div
                            style={{
                                fontSize: "12px",
                                color: "#999",
                            }}
                        >
                            8 × 32 bits
                        </div>

                    </div>


                    <div
                        style={{
                            padding: "14px 18px",
                            background: "#111516",
                            border: "1px solid #3a3d3f",
                            borderRadius: "6px",
                        }}
                    >

                        {formatBinary256(finalHash.binary)
                            .split("\n")
                            .map((line, index) => (

                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",

                                        minHeight: "32px",

                                        fontFamily:
                                            "monospace",

                                        fontSize: "13px",

                                        borderBottom:
                                            index < 7
                                                ? "1px solid #3a3d3f"
                                                : "none",

                                        color: "#d5d3cb",
                                    }}
                                >

                                    <span
                                        style={{
                                            width: "42px",
                                            flexShrink: 0,

                                            color: "#d99100",

                                            fontSize: "12px",

                                            fontWeight: 600,
                                        }}
                                    >
                                        h{index}'
                                    </span>

                                    <span
                                        style={{
                                            letterSpacing:
                                                "0.5px",
                                        }}
                                    >
                                        {line}
                                    </span>

                                </div>

                            ))}

                    </div>

                </div>

            </section>

        </div>

    );
}


/* =====================================================
   32-bit Binary Addition
===================================================== */

function addBinary32(
    first: string,
    second: string
): string {

    const a =
        first.replace(/\s/g, "");

    const b =
        second.replace(/\s/g, "");


    let carry = 0;

    let result = "";


    for (
        let i = 31;
        i >= 0;
        i--
    ) {

        const sum =
            Number(a[i]) +
            Number(b[i]) +
            carry;


        result =
            (sum % 2) +
            result;


        carry =
            sum >= 2
                ? 1
                : 0;
    }


    return result;
}


/* =====================================================
   Format 256-bit binary
===================================================== */

function formatBinary256(
    binary: string
): string {

    const clean =
        binary.replace(/\s/g, "");


    const groups: string[] = [];


    for (
        let i = 0;
        i < clean.length;
        i += 32
    ) {

        groups.push(
            clean.slice(
                i,
                i + 32
            )
        );

    }


    return groups.join("\n");
}
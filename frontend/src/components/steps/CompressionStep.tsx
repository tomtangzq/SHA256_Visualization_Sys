import { INITIAL_HASH } from "../../utils/initialHash";
import { hexToBinary } from "../../utils/binary";
import { calculateSigma0, calculateSigma1, calculateT1, calculateCh, calculateMaj, calculateT2, calculateNextWorkingVariables } from "../../utils/compressionFunctions";
import SigmaViewer from "../SigmaViewer";
import BinaryDisplay from "../BinaryDisplay";
import T2Viewer from "../T2Viewer";
import ChViewer from "../ChViewer";
import type { Word } from "../../utils/messageSchedule";
import T1Viewer from "../T1Viewer";
import Sigma0Viewer from "../Sigma0Viewer";
import MajViewer from "../MajViewer";
import WorkingVariableUpdateViewer from "../WorkingVariableUpdateViewer";

type Props = {
    words: Word[];
};

function CompressionStep({ words }: Props) {

    // Find working variable e
    const e = INITIAL_HASH.find(
        (item) => item.name === "e"
    );

    if (!e) {
        return <p>Unable to find working variable e.</p>;
    }

    // Convert hexadecimal to binary
    const eBinary = hexToBinary(e.hex);

    // Calculate Σ1(e)
    const sigma = calculateSigma1(eBinary);

    const f = INITIAL_HASH.find((item) => item.name === "f");
    const g = INITIAL_HASH.find((item) => item.name === "g");

    if (!f || !g) {
        return <p>Unable to find working variables.</p>;
    }

    const fBinary = hexToBinary(f.hex);
    const gBinary = hexToBinary(g.hex);


    const ch = calculateCh(
        eBinary,
        fBinary,
        gBinary
    );

    const h = INITIAL_HASH.find(item => item.name === "h");

    if (!h) {
        return <p>Unable to find working variable h.</p>;
    }

    const hBinary = hexToBinary(h.hex);

    const kBinary = hexToBinary("428a2f98");

    const wBinary = words[0].binary;

    const t1 = calculateT1(
        hBinary,
        sigma.result,
        ch.result,
        kBinary,
        wBinary
    );

    // //test
    // console.log("W0 =", words[0]);

    // console.log("W0 Binary =", wBinary);

    // console.log("W0 Hex =", words[0].hex);


    const a = INITIAL_HASH.find(item => item.name === "a");
    const b = INITIAL_HASH.find(item => item.name === "b");
    const c = INITIAL_HASH.find(item => item.name === "c");
    const d = INITIAL_HASH.find(item => item.name === "d");

    if (!a || !b || !c || !d) {
        return <p>Unable to find working variables.</p>;
    }

    const aBinary = hexToBinary(a.hex);
    const bBinary = hexToBinary(b.hex);
    const cBinary = hexToBinary(c.hex);
    const dBinary = hexToBinary(d.hex);


    const sigma0 = calculateSigma0(aBinary);

    const maj = calculateMaj(

        aBinary,

        bBinary,

        cBinary

    );

    const t2 = calculateT2(
        sigma0.result,
        maj.result
    );


    const updatedVariables = calculateNextWorkingVariables(

        aBinary,

        bBinary,

        cBinary,

        dBinary,

        eBinary,

        fBinary,

        gBinary,

        hBinary,

        t1.result,

        t2.result

    );

    // // test
    // console.log(updatedVariables);


    return (
        <>

            <h2>Step 7 - Compression Function</h2>

            <h3>Initial Working Variables</h3>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>Variable</th>

                        <th>Hex</th>

                        <th>Decimal</th>

                    </tr>

                </thead>

                <tbody>

                    {INITIAL_HASH.map((item) => (

                        <tr key={item.name}>

                            <td>{item.name}</td>

                            <td>{item.hex}</td>

                            <td>{item.decimal}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <br />

            <h3>Selected Working Variable</h3>

            <p>

                <strong>e</strong>

            </p>

            <p>

                Hex:

                <br />

                {e.hex}

            </p>

            <h4>Binary</h4>

            <BinaryDisplay

                binary={eBinary}

            />

            <SigmaViewer

                title="Σ1(e)"

                original={eBinary}

                rotate6={sigma.rotate6}

                rotate11={sigma.rotate11}

                rotate25={sigma.rotate25}

                result={sigma.result}

            />

            <ChViewer

                original={eBinary}

                notX={ch.notX}

                xAndY={ch.xAndY}

                notXAndZ={ch.notXAndZ}

                result={ch.result}

            />

            <T1Viewer
                t1={t1}
            />

            <Sigma0Viewer

                title="Σ0(a)"

                original={aBinary}

                sigma0={sigma0}

            />

            <MajViewer

                originalA={aBinary}

                originalB={bBinary}

                originalC={cBinary}

                maj={maj}

            />

            <T2Viewer
                t2={t2}
            />

            <WorkingVariableUpdateViewer

                oldVariables={{

                    a: aBinary,
                    b: bBinary,
                    c: cBinary,
                    d: dBinary,
                    e: eBinary,
                    f: fBinary,
                    g: gBinary,
                    h: hBinary

                }}

                updatedVariables={updatedVariables}

            />

        </>
    );



}


export default CompressionStep;


